import styled from "styled-components";
import { BoxProps } from "./types";

// redefine transient props to not be consumed by styled-components
interface StyledBoxProps extends Omit<BoxProps, "width" | "height"> {
    readonly $width?: string;
    readonly $height?: string;
}
export const StyledBox = styled.div<StyledBoxProps>`
    display: flex;
    ${(props) => (props.column ? `flex-direction: column;` : "")}
    ${(props) => (props.justifyContent ? `justify-content: ${props.justifyContent};` : "")}
    ${(props) => (props.alignItems ? `align-items: ${props.alignItems};` : "")}
    ${(props) => (props.$width ? `width: ${props.$width};` : "")}
    ${(props) => (props.$height ? `height: ${props.$height};` : "")}
    ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
    ${(props) => (props.backgroundColor ? `background-color: ${props.backgroundColor};` : "")}
    ${(props) => {
        if (!props.gap) {
            return "";
        }
        return `
        & > *:not(:last-child) {
            ${props.column ? "margin-bottom: " + props.gap : "margin-right: " + props.gap};
        }
        `;
    }}
`;
