import { Main } from "../../layout";
import { BlankLayoutProps } from "./types";

export function BlankLayout({ children }: BlankLayoutProps) {
    return <Main>{children}</Main>;
}
