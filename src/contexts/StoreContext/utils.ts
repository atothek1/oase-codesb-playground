import { Dispatch } from "react";
import {
    ActionCreatorFn,
    ActionReducerMap,
    ActionReducerPair,
    ExtractMeta,
    ExtractPayload,
    ExtractType,
    FSA,
    Middleware,
    MiddlewareAPI,
    MiddlewareExecuteFn,
    Reducer,
    Selector,
    StoreConfig
} from "./types";

export function createAction<TAction extends FSA<ExtractType<TAction>>>(
    type: ExtractType<TAction>
): ActionCreatorFn<ExtractType<TAction>, ExtractPayload<TAction>, ExtractMeta<TAction>> {
    return (((...args: unknown[]): TAction => {
        const [payload, meta, error = false] = args;
        return ({
            type,
            payload,
            meta,
            error
        } as unknown) as TAction;
    }) as unknown) as ActionCreatorFn<
        ExtractType<TAction>,
        ExtractPayload<TAction>,
        ExtractMeta<TAction>
    >;
}

export function createMiddleware<TState, TAction extends FSA<ExtractType<TAction>>>(
    execute: MiddlewareExecuteFn<TState, TAction>,
    types: string[] = []
): Middleware {
    return (api: MiddlewareAPI<Dispatch<TAction>, TState>) => (next: Dispatch<TAction>) => (
        action: TAction
    ): TAction => {
        // check filters, only if present, otherwise execute always the executer
        if (types.length > 0 && types.indexOf(action.type as string) < 0) {
            next(action);
            return;
        }
        return execute(action, next, api, types);
    };
}

export function filter(...types: string[]): string[] {
    return types;
}

export function createReducer<TState, TAction extends FSA<ExtractType<TAction>>>(
    initState: TState,
    ...actionReducerPairs: ActionReducerPair<ExtractType<TAction>, TState, TAction>[]
): Reducer<TState, TAction> {
    const actionReducerMap: Record<string, Reducer<TState, TAction>> = actionReducerPairs.reduce(
        (acc, pair): Record<string, Reducer<TState, TAction>> => {
            acc[pair.type] = pair.reducer;
            return acc;
        },
        {} as Record<string, Reducer<TState, TAction>>
    );

    return (state: TState = initState, action: TAction): TState => {
        const reducer = actionReducerMap[action.type];
        return reducer ? reducer(state, action) : state;
    };
}

export function on<TType extends string, TState, TAction extends FSA<ExtractType<TAction>>>(
    type: TType,
    reducer: Reducer<TState, TAction>
): ActionReducerPair<TType, TState, TAction> {
    return {
        type,
        reducer
    };
}

function createRootState<TState>(
    actionReducerMap: ActionReducerMap<TState>,
    selectors: Record<string, Selector<TState>>
): StoreConfig<TState, FSA<string>> {
    const actionTypes = Object.keys(actionReducerMap);
    return {
        name: "root",
        actions: {},
        reducers: {},
        selectors: {}
    };
}
function createSubState<TState>(
    name: string,
    initState: TState,
    actionReducerMap: ActionReducerMap<TState>,
    selectors: Record<string, Selector<TState>>
): StoreConfig<TState, FSA<string>> {
    const actionTypes = Object.keys(actionReducerMap);
    const actions: Record<
        string,
        ActionCreatorFn<keyof typeof actionReducerMap>
    > = actionTypes.reduce((acc, type) => {
        acc[type] = createAction<FSA>(type);
        return acc;
    }, {});
    const actionReducerPairs = actionTypes.map((type) => on(type, actionReducerMap[type]));
    const reducer = createReducer(initState, ...(actionReducerPairs as any));

    return {
        name,
        reducer,
        actions,
        selectors: {}
    };
}

export function createState<TState>(
    actionReducerMap: ActionReducerMap<TState>,
    selectors: Record<string, Selector<TState>>
): StoreConfig<TState, FSA<string>>;
export function createState<TState>(
    name: string,
    initState: TState,
    actionReducerMap: ActionReducerMap<TState>,
    selectors: Record<string, Selector<TState>>
): StoreConfig<TState, FSA<string>>;

export function createState<TState>(...args: unknown[]): StoreConfig<TState, FSA<string>> {
    if (args.length === 2) {
        return createRootState(
            args[0] as ActionReducerMap<TState>,
            args[1] as Record<string, Selector<TState>>
        );
    }
    return createSubState(
        args[0] as string,
        args[1] as TState,
        args[2] as ActionReducerMap<TState>,
        args[3] as Record<string, Selector<TState>>
    );
}

/**
export function createState<TState, TAction extends FSA<ExtractType<TAction>>>(
    name: string,
    initState: TState,
    actionReducerMap: ActionReducerMap<TState>
): Record<typeof name, Reducer<TState, FSA<keyof TState>>> {
    store[name] = initState as TState;
    const actionTypes = Object.keys(actionReducerMap);
    const actionReducerPairs = actionTypes.map((type) => on(type, actionReducerMap[type]));
    const reducer = createReducer(store[name] as TState, ...(actionReducerPairs as any));

    return { [name]: reducer };
}

 */
