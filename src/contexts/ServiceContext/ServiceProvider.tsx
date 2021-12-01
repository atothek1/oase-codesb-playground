import React, { createContext, useContext, useMemo } from "react";
import { ServiceContextValue, ServiceFactory, StatusComponentProps } from "./types";

const initalValue: ServiceContextValue<any> = {
    services: {},
    Loader: () => {
        return null;
    },
    Status: () => {
        return null;
    }
};
const ServiceContext = createContext(initalValue);

interface ServiceProviderProps<TServices> {
    readonly children: React.ReactNode;
    readonly services: TServices;
    readonly Loader: React.ComponentType;
    readonly Status: React.ComponentType<StatusComponentProps>;
}

export function useServiceContext<TServiceName extends string>(
    service?: TServiceName | ServiceFactory<any>
) {
    const { services, Loader, Status } = useContext(ServiceContext);
    const factory = typeof service === "function" ? service : services[service];

    return { service: factory, Loader, Status };
}

export function ServiceProvider<TServices extends Record<string, Function>>(
    props: ServiceProviderProps<TServices>
) {
    const { children, services, Loader, Status } = props;
    const contextValue: ServiceContextValue<TServices> = useMemo(() => {
        return {
            services,
            Loader,
            Status
        };
    }, [services, Loader, Status]);
    return <ServiceContext.Provider value={contextValue}>{children}</ServiceContext.Provider>;
}
