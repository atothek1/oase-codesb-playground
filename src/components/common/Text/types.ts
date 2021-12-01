import React from "react";

export type TextAllowedAsValues = "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface TextProps {
    readonly children: React.ReactNode;
    readonly as?: TextAllowedAsValues;
    readonly fontFamily?: string;
    readonly fontSize?: string;
    readonly fontWeight?: string;
    readonly padding?: string;
    readonly color?: string;
    readonly backgroundColor?: string;
    readonly noWrap?: boolean;
}
