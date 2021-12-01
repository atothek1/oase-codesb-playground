import { useEffect, useMemo, useRef } from "react";
const SET_CONFIG = "SET_CONFIG";

function getActions() {
    return {
        setConfig(payload: any) {
            return { type: SET_CONFIG, payload };
        }
    };
}
function getReducers() {
    return {
        [SET_CONFIG]: (state, action) => {
            console.log(action);
            return { ...state, config: action.payload };
        }
    };
}
function getSelectors() {
    return {
        getConfig(state) {
            return state.config;
        }
    };
}

function setupStateContext() {
    return { actions: getActions(), reducers: getReducers(), selectors: getSelectors() };
}

export function useSetupStateContext() {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current === null) {
            ref.current = setupStateContext();
        }
    });
    return ref.current;
}
