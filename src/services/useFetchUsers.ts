import {
    ServiceOptions,
    _useFetchUsers,
    UseFetchUsersParameters
} from "./generated/_useFetchUsers";

export function useFetchUsers(
    parameters?: UseFetchUsersParameters,
    options: ServiceOptions = { lazy: false }
) {
    return _useFetchUsers(parameters, null, options);
}
