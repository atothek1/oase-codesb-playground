import { useEffect, useMemo, useRef, useState } from "react";
import { ServiceFactory, ServiceResult } from "./types";

interface RequestProxy<TResponse> {
    readonly result: ServiceResult<TResponse>;
    setResult(result: ServiceResult<TResponse>): void;
    execute(skipAbort: boolean): void;
    dispose(): void;
}

export function useService<TResponse = any>(
    serviceFactory: () => ServiceFactory<TResponse>,
    request?: Request,
    lazy: boolean = false
): ServiceResult<TResponse> {
    const requestRef = useRef<RequestProxy<TResponse> | null>(null);
    const service = useMemo(() => serviceFactory(), [serviceFactory]);

    const [result, setResult] = useState<ServiceResult<TResponse>>({
        isFetching: !lazy,
        isError: false,
        error: null,
        data: null,
        refetch: () => {}
    });

    function createRequestProxy() {
        if (requestRef.current === null) {
            requestRef.current = {
                result,
                setResult,
                execute: async (shouldAbort = true) => {
                    if (shouldAbort) {
                        service.abort();
                    }
                    const result = await service.execute(request);
                    if (result.isError && result.error && result.error.name === "AbortError") {
                        // this is triggered by the unmount or refetch, no further setState needed
                        // as this would result in a memory leak
                        return;
                    }
                    requestRef.current?.setResult({
                        isFetching: false,
                        isError: result.isError,
                        error: result.error,
                        data: result.data,
                        request: result.request,
                        abort() {
                            service.abort();
                        },
                        refetch: () => requestRef.current?.execute(true)
                    });
                },
                dispose: () => {
                    service.abort();
                    requestRef.current = null;
                }
            };
        }
        return requestRef.current;
    }

    // pass service and request as deps to recreate the proxy that is using the deps
    const requestProxy = useMemo(() => createRequestProxy(), [service, request]);

    useEffect(() => {
        if (!lazy) {
            requestProxy?.execute(false);
        }
        return requestProxy?.dispose;
    }, [lazy, requestProxy]);

    return result;
}

/*
function getRequestProxy() {
        if (requestRef.current === null) {
            requestRef.current = {
                result,
                setResult,
                execute: async (shouldAbort = true) => {
                    if (shouldAbort) {
                        service.abort();
                    }
                    const result = await service.execute(request);
                    if (
                        result.isError &&
                        result.error &&
                        result.error.error.name === "AbortError"
                    ) {
                        // this is triggered by the unmount or refetch, no further setState needed
                        // as this would result in a memory leak
                        return;
                    }
                    await delay(2000);
                    requestRef.current?.setResult({
                        isFetching: false,
                        isError: result.isError,
                        error: result.error,
                        data: result.data,
                        refetch: () => requestRef.current?.execute(true)
                    });
                },
                dispose: () => service.abort()
            };
        }
        return requestRef.current;
    }
    const requestProxy = getRequestProxy();
*/
