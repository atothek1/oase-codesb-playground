import styled from "styled-components";

export const StyledAppBar = styled.div``;

export const Navigation = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    > li:not(li:last-child) {
        padding-right: 8px;
    }
`;
export const NavigationElement = styled.li`
    list-style: none;
    display: flex;
`;
