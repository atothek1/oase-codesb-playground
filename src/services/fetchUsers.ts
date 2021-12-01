import { UserItem } from "../types";
import { createService, ServiceFactory } from "../contexts";

export function fetchUsers(): ServiceFactory<UserItem[]> {
    return createService("./data/users.json", "fetchUsers");
}
