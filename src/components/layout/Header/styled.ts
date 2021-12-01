import styled from "styled-components";
import { Box } from "../Box";
import { HeaderProps } from "./types";
export const StyledHeader = styled(Box)<HeaderProps>`
    ${(props) => (props.order !== undefined ? `order: ${props.order};` : "")}
    ${(props) => {
        if (!props.fixed) {
            return "";
        }
        return `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        `;
    }}
`;
