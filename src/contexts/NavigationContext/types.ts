import { RouteConfig } from "../../components";
import { NavigationGroup, NavigationItem } from "../../components/app/Routes/types";
import { LayoutType } from "../LayoutContext/types";

export interface NavigationContextValue {
    getNavigationById<TId extends string = string>(
        ids: TId | TId[],
        params?: Record<string, string>
    ): Array<NavigationItem<TId>> | NavigationItem<TId> | null;
    getNavigationByGroup<TId extends string = string>(
        group: NavigationGroup,
        params?: Record<string, string>
    ): NavigationItem<TId>[];
}

export interface NavigationProviderProps<TId extends string> {
    readonly routes: RouteConfig<TId>[];
}

export interface SanitizedRoutesConfig<TId extends string> {
    readonly redirects: RouteConfig<TId>[];
    readonly routesLayoutMap: Partial<Record<LayoutType, RouteConfig<TId>[]>>;
    readonly routeConfigs: RouteConfig<TId>[];
}
