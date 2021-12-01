import { BoxProps } from "../Box/types";

export interface SidebarProps extends Omit<BoxProps, "column"> {
    readonly order?: number;
}
