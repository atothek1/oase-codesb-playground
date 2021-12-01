import { useService } from "../../../src/contexts";
import { fetchUsers } from "./fetchUsers";

export interface UseFetchUsersParameters {}
export interface ServiceOptions {
    readonly lazy?: boolean;
}

export function useFetchUsers(
    parameters?: UseFetchUsersParameters,
    options: ServiceOptions = { lazy: false }
) {
    const { lazy = false } = options;
    const request = {
        method: "GET",
        url: "/v1/users"
    };
    return useService(fetchUsers, request as any, lazy);
}
