import React from "react";

export enum LayoutType {
    MAIN = "MAIN",
    BLANK_WITH_HEADER = "BLANK_WITH_HEADER",
    BLANK = "BLANK"
}

export interface LayoutConfig {
    readonly type: LayoutType;
    readonly component: React.ComponentType;
}

export type LayoutRegistry = Partial<Record<LayoutType, LayoutConfig>>;

export interface LayoutContextValue {
    getLayoutComponent(type: LayoutType): React.ComponentType;
    getDefaultLayoutType(): LayoutType;
}

export interface LayoutProviderProps {
    readonly children: React.ReactNode;
    readonly defaultLayout: LayoutType;
    readonly layouts: LayoutRegistry;
}
