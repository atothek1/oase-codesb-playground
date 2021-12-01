import React, { createContext } from "react";
import { FSA } from "./types";

const StoreContext = createContext({
    actions: {},
    selectors: {},
    getState() {
        return {};
    }
});

interface StoreProviderProps {
    readonly children: React.ReactNode;
    readonly actions: Record<string, FSA<string>>;
    readonly reducers: Record<string, Reducer>;
}

export function StoreProvider(props: StoreProviderProps) {
    const { children } = props;

    const contextValue = {};
    return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
}
