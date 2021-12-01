import { BoxProps } from "../Box/types";

export interface MainProps extends Omit<BoxProps, "column"> {
    readonly order?: number;
}
