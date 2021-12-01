import styled from "styled-components";
import { StatusType } from "../../../contexts/ServiceContext/types";
import { capatalize, ColorKeys } from "../../../utils";
import { Box, BoxProps } from "../../layout";
import { Text, TextProps } from "../Text";

interface StyledStatusProps extends Omit<BoxProps, "width"> {
    readonly $width: string;
    readonly type: StatusType;
}
export const StyledStatus = styled(Box)<StyledStatusProps>`
    padding: 1.6rem;
    width: ${(props) => props.$width};
    height: fit-content;
    border-radius: 0.8rem;
    ${(props) => {
        const name = `color${capatalize(props.type)}` as ColorKeys;
        const bgName = `backgroundColor${capatalize(props.type)}` as ColorKeys;
        return `
        background-color: ${props.theme.colors[bgName]};
        border: 1px solid ${props.theme.colors[name]}`;
    }};
`;

interface StatusTextProps extends TextProps {
    readonly type: StatusType;
}
export const StatusText = styled(Text)<StatusTextProps>`
    font-weight: 900;
    text-shadow: rgba(255, 255, 255, 0.5) 1px 1px;
    ${(props) => {
        const name = `color${capatalize(props.type)}` as ColorKeys;
        return `color: ${props.theme.colors[name]}`;
    }};
`;
