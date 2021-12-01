import React from "react";
import { AlignItems, JustifyContent } from "../../../utils";

export type BoxAllowedAsValues =
    | "div"
    | "header"
    | "main"
    | "footer"
    | "aside"
    | "section"
    | "article"
    | "nav"
    | "form";

export interface BoxProps {
    readonly children: React.ReactNode;
    readonly as?: BoxAllowedAsValues;
    readonly column?: boolean;
    readonly justifyContent?: JustifyContent;
    readonly alignItems?: AlignItems;
    readonly width?: string;
    readonly height?: string;
    readonly padding?: string;
    readonly backgroundColor?: string;
    readonly gap?: string;
}
