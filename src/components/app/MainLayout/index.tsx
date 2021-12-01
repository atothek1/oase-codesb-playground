import { Footer, Header, Main, Sidebar } from "../../layout";
import { MainLayoutProps } from "./types";
import { AppBar } from "../AppBar";
import { useTheme } from "styled-components";

export function MainLayout({ children }: MainLayoutProps) {
    const { size, spacing } = useTheme();

    return (
        <>
            <Header order={0} backgroundColor="red" height={size.minHeightHeader}>
                <AppBar />
            </Header>
            <Main order={2} padding={spacing.s2}>
                {children}
            </Main>
            <Sidebar
                as="nav"
                order={1}
                width={size.widthSidebarLeft}
                padding={spacing.s1}
                backgroundColor="yellow">
                Left Sidebar
            </Sidebar>
            <Sidebar
                order={2}
                width={size.widthSidebarRight}
                padding={spacing.s1}
                backgroundColor="lime">
                RightSidebar
            </Sidebar>
            <Footer order={4} backgroundColor="blue" height={size.minHeightFooter}>
                Footer
            </Footer>
        </>
    );
}
