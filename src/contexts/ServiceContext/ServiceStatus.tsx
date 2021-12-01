import React from "react";
import { useServiceContext } from "./ServiceProvider";
import { StatusComponentProps } from "./types";

interface ServiceStatusProps {
    readonly children: React.ReactNode;
    readonly isFetching: boolean;
    readonly isError: boolean;
    readonly hasData: boolean;
    readonly error: Error | null;
    readonly Loader?: React.ComponentType;
    readonly Status?: React.ComponentType<StatusComponentProps>;
}

export function ServiceStatus(props: ServiceStatusProps) {
    const {
        children,
        isFetching,
        isError,
        hasData,
        error,
        Loader: LoaderProp,
        Status: StatusProp
    } = props;
    const serviceContext = useServiceContext();
    const Loader = LoaderProp ? LoaderProp : serviceContext.Loader;
    const Status = StatusProp ? StatusProp : serviceContext.Status;

    if (isFetching) {
        return <Loader />;
    }

    if (isError) {
        const errorDetails =
            error !== null ? (
                <>
                    <p>{error.message}</p>
                    <p>{error.stack}</p>
                </>
            ) : null;
        return (
            <Status type="error">
                <span>We are sorry, loading of the data has caused an error.</span>
                {errorDetails}
            </Status>
        );
    }

    if (!hasData) {
        return <Status type="info">No Data found.</Status>;
    }

    return <>{children}</>;
}
