import { ThemeProvider } from "styled-components";
import { RouteId } from "../../../../res/ids";
import { RouteConfig } from "../index";
import {
    AuthProvider,
    LayoutProvider,
    LayoutRegistry,
    LayoutType,
    NavigationProvider,
    ServiceProvider
} from "../../../contexts";
import { GlobalStyle, Theme, theme } from "../../../utils";
import { Loader, Status } from "../../common";
import { fetchUsers } from "../../../services";

const services: Record<string, Function> = {
    fetchUsers
};

interface AppProps {
    readonly routes: RouteConfig<RouteId>[];
    readonly layouts: LayoutRegistry;
}

export function App({ routes, layouts }: AppProps) {
    console.log("App");
    return (
        <ThemeProvider theme={theme as Theme}>
            <GlobalStyle />
            <ServiceProvider services={services} Status={Status} Loader={Loader}>
                <AuthProvider>
                    <LayoutProvider layouts={layouts} defaultLayout={LayoutType.BLANK}>
                        <NavigationProvider<RouteId> routes={routes} />
                    </LayoutProvider>
                </AuthProvider>
            </ServiceProvider>
        </ThemeProvider>
    );
}
