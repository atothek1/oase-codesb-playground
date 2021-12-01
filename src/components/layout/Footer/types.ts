import { BoxProps } from "../Box/types";

export interface FooterProps extends Omit<BoxProps, "column"> {
    readonly order?: number;
    readonly fixed?: boolean;
}
