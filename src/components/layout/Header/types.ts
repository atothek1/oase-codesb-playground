import { BoxProps } from "../Box/types";

export interface HeaderProps extends Omit<BoxProps, "column"> {
    readonly order?: number;
    readonly fixed?: boolean;
}
