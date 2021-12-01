import React from "react";
import { StyledMain } from "./styled";
import { MainProps } from "./types";

export function Main(props: MainProps) {
    const { children, as = "main", ...rest } = props;
    return (
        <StyledMain forwardedAs={as} column {...rest}>
            {children}
        </StyledMain>
    );
}
