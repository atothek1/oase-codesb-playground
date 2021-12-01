import { RedirectProps, RouteProps } from "react-router";
import { LayoutType } from "../../../contexts";
import { SanitizedRoutesConfig } from "../../../contexts/NavigationContext/types";
import { Session } from "../../../types";

export enum NavigationGroup {
    ALL = 0,
    HEAD = 1,
    MAIN = 2,
    FOOTER = 4
}

export type ParamsFactoryFn = (
    session: Session | null,
    path: string
) => Record<string, string> | null;

export interface NavigationItem<TId extends string> {
    readonly id: TId;
    readonly label: string;
    readonly icon?: string;
    readonly path: string;
}

export interface NavigationConfig {
    readonly label: string;
    readonly groups: NavigationGroup;
    readonly icon?: string;
    readonly params?: Record<string, string> | ParamsFactoryFn;
}

export interface RouteConfig<TId extends string>
    extends Omit<RouteProps, "render" | "location">,
        Partial<Pick<RedirectProps, "to" | "from" | "push">> {
    readonly id: TId;
    readonly layout?: LayoutType;
    readonly roles?: string[];
    readonly routes?: RouteConfig<TId>[];
    readonly navigation?: NavigationConfig[];
}

export interface RoutesProps<TId extends string> {
    readonly config: SanitizedRoutesConfig<TId>;
}
