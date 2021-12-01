import { useService } from "../../contexts";
import { fetchUsers } from "../fetchUsers";

export interface UseFetchUsersParameters {}
export interface ServiceOptions {
    readonly lazy?: boolean;
}
export function _useFetchUsers(parameters: UseFetchUsersParameters, options: ServiceOptions = {}) {
    const { lazy = false } = options;
    const request: RequestInit = {
        method: "GET",
        url: "/v1/users"
    };
    return useService(fetchUsers, request, lazy);
}
