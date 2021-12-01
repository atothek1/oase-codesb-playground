import React from "react";

export interface ServiceResponse<TResponse> {
    readonly isError: boolean;
    readonly data: TResponse | null;
    readonly error: Error | null;
    readonly url: string;
    readonly request: Request;
    readonly response: Response | Error;
    readonly serviceName: string;
}

export interface ServiceFactory<TResponse> {
    readonly name: string;
    abort(): void;
    execute(request?: Request): Promise<ServiceResponse<TResponse>>;
}

export interface ServiceResult<TData> {
    readonly data: TData | null;
    readonly error: Error | null;
    readonly isError: boolean;
    readonly isFetching: boolean;
    readonly request?: Request;
    refetch(): void;
}

export type StatusType = "info" | "success" | "error" | "warning";

export interface StatusComponentProps {
    readonly children: React.ReactNode;
    readonly type: StatusType;
}

export interface ServiceContextValue<TServices> {
    readonly services: TServices;
    readonly Loader: React.ComponentType;
    readonly Status: React.ComponentType<StatusComponentProps>;
}

export interface ServiceOptions<TResponse>
    extends Partial<
        Omit<Request, "clone" | "arrayBuffer" | "blob" | "formData" | "json" | "text">
    > {
    readonly lazy?: boolean;
    transform?(response: Response): Promise<TResponse>;
}

export interface ServiceConsumerComponentProps<TData> {
    readonly result: ServiceResult<TData>;
}
