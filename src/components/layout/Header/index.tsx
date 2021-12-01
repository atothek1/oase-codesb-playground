import React from "react";
import { StyledHeader } from "./styled";
import { HeaderProps } from "./types";

export function Header(props: HeaderProps) {
    const { children, as = "header", ...rest } = props;
    return (
        <StyledHeader forwardedAs={as} {...rest}>
            {children}
        </StyledHeader>
    );
}
