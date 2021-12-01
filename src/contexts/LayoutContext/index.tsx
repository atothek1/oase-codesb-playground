import { createContext, useContext, useMemo } from "react";
import { LayoutContextValue, LayoutProviderProps, LayoutType } from "./types";

const initialValue: LayoutContextValue = {
    getLayoutComponent(type: LayoutType) {
        return () => null;
    },
    getDefaultLayoutType() {
        return LayoutType.BLANK;
    }
};
const LayoutContext = createContext<LayoutContextValue>(initialValue);

export function useLayout() {
    return useContext(LayoutContext);
}

export function LayoutProvider({ children, layouts, defaultLayout }: LayoutProviderProps) {
    const contextValue = useMemo<LayoutContextValue>(
        () => ({
            getLayoutComponent(type: LayoutType) {
                return layouts[type]?.component!;
            },
            getDefaultLayoutType() {
                return defaultLayout;
            }
        }),
        [layouts, defaultLayout]
    );
    return <LayoutContext.Provider value={contextValue}>{children}</LayoutContext.Provider>;
}
