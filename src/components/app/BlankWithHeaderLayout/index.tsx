import { Footer, Header, Main } from "../../layout";
import { BlankWithHeaderLayoutProps } from "./types";
import { AppBar } from "../AppBar";
import { useTheme } from "styled-components";

export function BlankWithHeaderLayout({ children }: BlankWithHeaderLayoutProps) {
    const { size, spacing } = useTheme();
    return (
        <>
            <>
                <Header order={0} backgroundColor="red" height={size.minHeightHeader}>
                    <AppBar />
                </Header>
                <Main order={2} padding={spacing.s2}>
                    {children}
                </Main>
                <Footer order={4} backgroundColor="blue" height={size.minHeightFooter}>
                    Footer
                </Footer>
            </>
        </>
    );
}
