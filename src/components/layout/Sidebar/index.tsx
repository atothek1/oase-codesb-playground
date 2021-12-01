import React from "react";
import { StyledSidebar } from "./styled";
import { SidebarProps } from "./types";

export function Sidebar(props: SidebarProps) {
    const { children, order = 0, as = "aside", ...rest } = props;
    return (
        <StyledSidebar forwardedAs={as} order={order} column {...rest}>
            {children}
        </StyledSidebar>
    );
}
