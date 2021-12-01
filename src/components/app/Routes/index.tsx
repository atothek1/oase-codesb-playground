import { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router";
import { LayoutType, useLayout } from "../../../contexts";
import { map } from "../../../utils";
import { RoutesProps } from "./types";

export function Routes<TId extends string>({ config }: RoutesProps<TId>) {
    const { getLayoutComponent } = useLayout();
    // extract logic into utils
    const layoutElements = map(config.routesLayoutMap, (routes, layoutType) => {
        if (routes === undefined) {
            return null;
        }
        const Layout = getLayoutComponent(layoutType as LayoutType);
        const paths: string[] = [];
        const routeElements = routes.map(({ id, layout, path, roles, ...rest }) => {
            paths.push(path as string);
            return <Route key={id} path={path} {...rest} />;
        });

        return (
            <Route key={"layout:" + layoutType} exact path={paths}>
                <Layout>{routeElements}</Layout>
            </Route>
        );
    });

    // extract logic into utils
    const redirectElements = config.redirects.map(({ id, from, to }, index) => {
        const props = from ? { from } : {};
        return <Redirect key={id} to={to!} {...props} />;
    });

    const elements = layoutElements.concat(redirectElements);

    return <Switch>{elements}</Switch>;
}
