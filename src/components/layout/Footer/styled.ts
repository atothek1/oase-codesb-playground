import styled from "styled-components";
import { Box } from "../Box";
import { FooterProps } from "./types";

export const StyledFooter = styled(Box)<FooterProps>`
    ${(props) => (props.order !== undefined ? `order: ${props.order};` : "")}
    ${(props) => {
        if (!props.fixed) {
            return "";
        }
        return `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        `;
    }}
`;
