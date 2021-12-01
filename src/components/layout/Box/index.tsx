import React, { ForwardedRef } from "react";
import { BoxProps } from "./types";
import { StyledBox } from "./styled";

function InnerBox(props: BoxProps, ref: ForwardedRef<any>) {
    const {
        children,
        justifyContent,
        alignItems,
        padding,
        backgroundColor,
        gap,
        as = "div",
        column = false,
        width = "100%",
        height = "100%"
    } = props;

    return (
        <StyledBox
            ref={ref}
            as={as}
            column={column}
            justifyContent={justifyContent}
            alignItems={alignItems}
            $width={width}
            $height={height}
            padding={padding}
            backgroundColor={backgroundColor}
            gap={gap}
            className={(props as any).className}>
            {children}
        </StyledBox>
    );
}

export const Box = React.forwardRef(InnerBox);
export { BoxProps };
