import { lazy, Suspense } from "react";
import { RouteConfig } from "../src/components";
import { NavigationGroup } from "../src/components/app/Routes/types";
import { LayoutType } from "../src/contexts";
import { Roles } from "../src/contexts/AuthContext/types";
import {
    Components,
    Forbidden403,
    Home,
    Login,
    Logout,
    NotFound404,
    Unauthorized401,
    User,
    Users
} from "../src/pages";
import { Session } from "../src/types";
import { RouteId } from "./ids";

const UserMgmt = lazy(() =>
    import("../modules/user-mgmt").then(({ UserMgmt }) => ({ default: UserMgmt }))
);

const UserMgmtWrapper = () => (
    <Suspense fallback={<p>...loading Module</p>}>
        <UserMgmt />
    </Suspense>
);

export function getRoutes(url = ""): RouteConfig<RouteId>[] {
    return [
        {
            id: RouteId.HOME,
            path: `${url}/`,
            exact: true,
            component: Home,
            layout: LayoutType.BLANK_WITH_HEADER,
            navigation: [
                {
                    label: "Home",
                    groups: NavigationGroup.ALL | NavigationGroup.HEAD
                }
            ]
        },
        {
            id: RouteId.USER_MGMT,
            path: `${url}/user-mgmt`,
            exact: true,
            component: UserMgmtWrapper,
            layout: LayoutType.BLANK_WITH_HEADER,
            navigation: [
                {
                    label: "User Management",
                    groups: NavigationGroup.ALL | NavigationGroup.HEAD
                }
            ]
        },
        {
            id: RouteId.LOGIN,
            path: `${url}/login`,
            exact: true,
            component: Login,
            layout: LayoutType.BLANK_WITH_HEADER,
            navigation: [
                {
                    label: "Login",
                    groups: NavigationGroup.ALL
                }
            ]
        },
        {
            id: RouteId.COMPONENTS,
            path: `${url}/components`,
            exact: true,
            component: Components,
            layout: LayoutType.MAIN,
            navigation: [
                {
                    label: "Components",
                    groups: NavigationGroup.ALL | NavigationGroup.HEAD
                }
            ]
        },
        {
            id: RouteId.USERS,
            path: `${url}/users`,
            exact: true,
            component: Users,
            roles: [Roles.ADMIN, Roles.USER],
            layout: LayoutType.MAIN,
            navigation: [
                {
                    label: "Users",
                    groups: NavigationGroup.ALL | NavigationGroup.HEAD
                }
            ]
        },
        {
            id: RouteId.USER,
            path: `${url}/users/:username`,
            exact: true,
            component: User,
            layout: LayoutType.MAIN,
            navigation: [
                {
                    label: "User",
                    groups: NavigationGroup.ALL
                }
            ]
        },
        {
            id: RouteId.USERS_PROFILE,
            path: `${url}/users/:username/profile`,
            exact: true,
            component: User,
            layout: LayoutType.MAIN,
            roles: [Roles.ADMIN, Roles.ME],
            navigation: [
                {
                    label: "Profile",
                    groups: NavigationGroup.ALL | NavigationGroup.HEAD,
                    params: (session: Session | null, path: string) => {
                        return session ? { username: session.username } : null;
                    }
                }
            ]
        },
        {
            id: RouteId.LOGOUT,
            path: `${url}/logout`,
            exact: true,
            component: Logout,
            roles: [Roles.ME],
            navigation: [
                {
                    label: "Logout",
                    groups: NavigationGroup.ALL | NavigationGroup.HEAD
                }
            ]
        },
        {
            id: RouteId.STATUS_401,
            path: `${url}/401`,
            exact: true,
            component: Unauthorized401,
            layout: LayoutType.BLANK
        },
        {
            id: RouteId.STATUS_403,
            path: `${url}/403`,
            exact: true,
            component: Forbidden403,
            layout: LayoutType.BLANK
        },
        {
            id: RouteId.STATUS_404,
            path: `${url}/404`,
            exact: true,
            component: NotFound404,
            layout: LayoutType.BLANK
        },
        // fallback 404 for non matching routes, redirects to the /404 path
        {
            id: RouteId.FALLBACK,
            to: `${url}/404`
        }
    ];
}
