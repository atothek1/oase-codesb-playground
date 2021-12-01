import styled from "styled-components";
import { Box } from "../Box";
import { SidebarProps } from "./types";

export const StyledSidebar = styled(Box)<SidebarProps>`
    ${(props) => (props.order !== undefined ? `order: ${props.order};` : "")}
`;
