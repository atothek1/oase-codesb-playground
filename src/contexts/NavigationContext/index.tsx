import { createContext, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "../../components";
import { NavigationGroup } from "../../components/app/Routes/types";
import { useAuth } from "../AuthContext";
import { NavigationContextValue, NavigationProviderProps } from "./types";
import { getNavigationByGroup, getNavigationById, useSanitizeRouteConfig } from "./utils";

const initialValue: NavigationContextValue = {
    getNavigationById<TId extends string>(id: TId | TId[], params?: Record<string, string>) {
        return null;
    },
    getNavigationByGroup(group: NavigationGroup, params?: Record<string, string>) {
        return [];
    }
};
const NavigationContext = createContext<NavigationContextValue>(initialValue);

export function useNavigation() {
    return useContext(NavigationContext);
}

export function NavigationProvider<TId extends string>({ routes }: NavigationProviderProps<TId>) {
    const auth = useAuth();
    const config = useSanitizeRouteConfig(routes);
    console.log("NavigationProvider", routes, config);
    const contextValue: any = {
        getNavigationById(idOrIds: TId | TId[], params?: Record<string, string>) {
            return getNavigationById(auth, config.routeConfigs, idOrIds, params);
        },
        getNavigationByGroup(group: NavigationGroup, params?: Record<string, string>) {
            return getNavigationByGroup(auth, config.routeConfigs, group, params);
        }
    };
    return (
        <NavigationContext.Provider value={contextValue}>
            <BrowserRouter>
                <Routes config={config} />
            </BrowserRouter>
        </NavigationContext.Provider>
    );
}
