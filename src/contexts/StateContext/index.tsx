import React, { createContext, Reducer, useContext, useMemo, useReducer } from "react";
import { Action, ContextValue, ActionCreator, Selector, Store } from "./types";

const storeContext = createContext({
    actions: {},
    selectors: {},
    getState() {
        return {};
    }
});
const { Provider } = storeContext;

export function useActions() {
    const ctx = useContext(storeContext);
    return ctx.actions;
}

export function useSelectors() {
    const ctx = useContext(storeContext);
    return ctx.selectors;
}

interface StateProviderProps {
    readonly children: React.ReactNode;
    readonly reducers: ReadonlyDictionary<Reducer<Store, Action<any>>>;
    readonly actions: ReadonlyDictionary<ActionCreator<any>>;
    readonly selectors: ReadonlyDictionary<Selector>;
}

export function StateProvider(props: StateProviderProps) {
    const { children, reducers, actions, selectors } = props;

    const [state, dispatch] = useReducer((store: Store, action: Action<any>) => {
        if (reducers[action.type] && typeof reducers[action.type] === "function") {
            const reducer = reducers[action.type] as Reducer<Store, Action<any>>;
            return reducer(store, action);
        }
        return store;
    }, {});

    const contextValue: ContextValue = useMemo(
        () => ({
            actions: Object.entries(actions as Dictionary<ActionCreator<any>>).reduce(
                (acc: Dictionary<(...args: any[]) => void>, [key, actionCreator]) => {
                    acc[key] = (...args: any[]) => {
                        console.log("dispatch", args);
                        dispatch(actionCreator(...args));
                    };
                    return acc;
                },
                {}
            ),
            selectors: Object.entries(selectors as Dictionary<Selector>).reduce(
                (acc: Dictionary<(...args: any[]) => any>, [key, selector]) => {
                    acc[key] = (...args: any[]) => selector(state, ...args);
                    return acc;
                },
                {}
            ),
            getState() {
                return state;
            }
        }),
        [state, dispatch, actions, selectors]
    );

    return <Provider value={contextValue}>{children}</Provider>;
}
