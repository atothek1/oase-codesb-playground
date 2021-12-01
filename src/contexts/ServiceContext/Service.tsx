import React from "react";
import { ServiceFactory, ServiceResult } from "./types";
import { useService } from "./useService";
import { ServiceStatus } from "./ServiceStatus";
import { useServiceContext } from "./ServiceProvider";

interface ServiceConsumerRenderer<TResult> {
    (result: ServiceResult<TResult>): React.ReactNode;
}
interface ServiceConsumerComponent<TResult> {
    readonly result: ServiceResult<TResult>;
}

type ServiceNameOrFactory<TResponse> = string | ServiceFactory<TResponse>;
interface ServiceProps<TResult> {
    readonly service: ServiceNameOrFactory<TResult>;
    readonly request?: Request;
    readonly component?: React.ComponentType<ServiceConsumerComponent<TResult>>;
    readonly children?: ServiceConsumerRenderer<TResult>;
}

export function Service<TResult>(props: React.PropsWithChildren<ServiceProps<TResult>>) {
    const {
        component: Comp,
        children: childRenderer,
        service: serviceNameOrFactory,
        request
    } = props;
    const { service, Loader, Status } = useServiceContext(serviceNameOrFactory);
    const result = useService<TResult>(service, request);

    if (Comp && childRenderer) {
        console.warn(
            `You have provided a component and a children renderer function.
            The provided component is ignored. Please provide one or the other not both.`
        );
    }
    const hasData =
        (result.data !== null &&
            Array.isArray(result.data) &&
            (result.data as any[]).length === 0) ||
        result.data !== null;

    const children =
        typeof childRenderer === "function" ? (
            childRenderer(result)
        ) : hasData && Comp !== undefined ? (
            <Comp result={result} />
        ) : null;

    return (
        <ServiceStatus
            isFetching={result.isFetching}
            isError={result.isError}
            hasData={hasData}
            error={result.error}
            Loader={Loader}
            Status={Status}>
            {children}
        </ServiceStatus>
    );
}
