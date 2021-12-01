import { ServiceFactory, ServiceResponse, ServiceOptions, ServiceError } from "./types";

function defaultTransform<TResponse>(response: Response): Promise<TResponse> {
    return response.json();
}
function getDefaultOptions<TResponse>(): ServiceOptions<TResponse> {
    return {
        lazy: false,
        transform: defaultTransform
    };
}

function getAbortError(): Error {
    return {
        name: "AbortError",
        message: "Aborted after request was done. Catching during processing"
    };
}

export function createService<TResponse>(
    url: string,
    serviceName: string,
    serviceOptions: ServiceOptions<TResponse> = getDefaultOptions()
): ServiceFactory<TResponse> {
    const { transform = defaultTransform, ...requestOptions } = serviceOptions;
    const constroller = new AbortController();
    return {
        name: serviceName,
        abort: () => {
            constroller.abort();
        },
        execute: async (request?: Request): Promise<ServiceResponse<TResponse>> => {
            const mergedRequest = {
                url,
                ...(requestOptions ?? {}),
                ...(request ?? {}),
                signal: constroller.signal
            } as Request;
            return fetch(url, mergedRequest)
                .then(async (response) => {
                    if (constroller.signal.aborted) {
                        return {
                            isError: true,
                            data: null,
                            error: getAbortError(),
                            url,
                            request: mergedRequest,
                            response,
                            serviceName
                        };
                    }

                    const data = await transform(response);
                    return {
                        isError: false,
                        data,
                        error: null,
                        url,
                        request: mergedRequest,
                        response,
                        serviceName
                    };
                })
                .catch((error) => {
                    return {
                        isError: true,
                        data: null,
                        error,
                        url,
                        request: mergedRequest,
                        response: error,
                        serviceName
                    };
                });
        }
    };
}
