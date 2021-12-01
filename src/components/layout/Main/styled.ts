import styled from "styled-components";
import { Box } from "../Box";
import { MainProps } from "./types";

interface StyledMainProps extends MainProps {
    readonly column: boolean;
}

export const StyledMain = styled(Box)<StyledMainProps>`
    ${(props) => (props.order !== undefined ? `order: ${props.order};` : "")}
    flex: 1;
    overflow: auto;
`;
