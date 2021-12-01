import styled from "styled-components";
import { TextProps } from "./types";

export const Text = styled.span<TextProps>`
    ${(props) => (props.fontFamily ? `font-family: ${props.fontFamily};` : "")}
    ${(props) => (props.fontSize ? `font-size: ${props.fontSize};` : "")}
    ${(props) => (props.fontWeight ? `font-weight: ${props.fontWeight};` : "")}
    ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
    ${(props) => (props.color ? `color: ${props.color};` : "")}
    ${(props) => (props.backgroundColor ? `background-color: ${props.backgroundColor};` : "")}
    ${(props) => (props.noWrap ? "white-space: noWrap" : "")}
`;

export { TextProps };
