import { RouteConfig } from "../../components";
import { useAuth } from "../AuthContext";
import { useLayout } from "../LayoutContext";
import { hasOwn } from "../../utils";
import { SanitizedRoutesConfig } from "./types";
import {
    NavigationConfig,
    NavigationGroup,
    NavigationItem
} from "../../components/app/Routes/types";
import { generatePath, useLocation } from "react-router";
import { AuthContextValue } from "../AuthContext/types";

export function isRedirect<TId extends string>(route: RouteConfig<TId>) {
    return hasOwn(route, "to");
}

export function isProtected<TId extends string>(route: RouteConfig<TId>) {
    return hasOwn(route, "roles") && route.roles && route.roles.length > 0;
}

function getNavigationItem<TId extends string>(
    auth: AuthContextValue,
    route: RouteConfig<TId>,
    config: NavigationConfig,
    params?: Record<string, string>
): NavigationItem<TId> {
    const path = generatePath(
        route.path as string,
        params
            ? params
            : typeof config.params === "function"
            ? config.params(auth.getSession(), route.path as string) || undefined
            : config.params
    );
    return {
        id: route.id,
        label: config.label,
        icon: config.icon,
        path
    };
}

export function getNavigationById<TId extends string>(
    auth: AuthContextValue,
    routes: RouteConfig<TId>[],
    idOrIds: TId | TId[],
    params?: Record<string, string>
): Array<NavigationItem<TId>> | NavigationItem<TId> | null {
    const items: Array<NavigationItem<TId>> = [];
    if (Array.isArray(idOrIds)) {
        idOrIds.forEach((id) => {
            for (const routeConfig of routes) {
                if (routeConfig.id === id && routeConfig.navigation !== undefined) {
                    items.push(
                        getNavigationItem<TId>(auth, routeConfig, routeConfig.navigation[0], params)
                    );
                }
            }
        });
        return items;
    }

    for (const routeConfig of routes) {
        if (routeConfig.id === idOrIds && routeConfig.navigation !== undefined) {
            items.push(
                getNavigationItem<TId>(auth, routeConfig, routeConfig.navigation[0], params)
            );
        }
    }
    return items.length ? items[0] : null;
}

export function getNavigationByGroup<TId extends string>(
    auth: AuthContextValue,
    routes: RouteConfig<TId>[],
    group: NavigationGroup,
    params?: Record<string, string>
): NavigationItem<TId>[] {
    const configs: NavigationItem<TId>[] = [];

    routes.forEach((routeConfig) => {
        return (
            routeConfig.navigation !== undefined &&
            routeConfig.navigation.forEach((navConfig) => {
                if ((navConfig.groups & group) === group) {
                    configs.push(getNavigationItem(auth, routeConfig, navConfig, params));
                }
            })
        );
    });
    return configs;
}
export function useSanitizeRouteConfig<TId extends string>(
    routeConfigs: RouteConfig<TId>[]
): SanitizedRoutesConfig<TId> {
    const { isLoggedIn, isAuthorized } = useAuth();
    const { getDefaultLayoutType } = useLayout();
    const defaultLayoutType = getDefaultLayoutType();

    const sanitized: SanitizedRoutesConfig<TId> = {
        redirects: [],
        routesLayoutMap: {},
        routeConfigs: []
    };
    const loggedIn = isLoggedIn();

    for (const config of routeConfigs) {
        let route = config;
        const authorized = route.roles !== undefined ? isAuthorized(route.roles) : true;

        console.log(
            "path:",
            route.path,
            "authorized:",
            authorized,
            "isProtected",
            isProtected(route)
        );
        // if route is protected validate if current user is logged in
        // and has sufficient priviliges
        // otherwise convert to a redirect
        if (isProtected(route) && (!loggedIn || !authorized)) {
            route = {
                id: route.id,
                push: false, // enforce replace in history
                from: route.path as string,
                to: !loggedIn ? "/401" : !authorized ? "/403" : "/404"
            };
        }

        // filter redirects
        if (isRedirect(route)) {
            console.log("redirect", route);
            sanitized.redirects.push(route);
            continue;
        }

        sanitized.routeConfigs.push(route);
        const { layout: layoutType = defaultLayoutType } = route;

        if (sanitized.routesLayoutMap[layoutType] !== undefined) {
            sanitized.routesLayoutMap[layoutType]!.push(route);
            continue;
        }

        sanitized.routesLayoutMap[layoutType] = [route];
    }
    return sanitized;
}
