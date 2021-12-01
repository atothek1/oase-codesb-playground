import { TextProps } from "../Text/types";

export type HeadingAllowedAsValues = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps extends Omit<TextProps, "as"> {
    readonly as?: HeadingAllowedAsValues;
    readonly order?: number;
    readonly fixed?: boolean;
}
