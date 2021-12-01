import React from "react";
import { StyledFooter } from "./styled";
import { FooterProps } from "./types";

export function Footer(props: FooterProps) {
    const { children, as = "footer", ...rest } = props;
    return (
        <StyledFooter forwardedAs={as} {...rest}>
            {children}
        </StyledFooter>
    );
}
