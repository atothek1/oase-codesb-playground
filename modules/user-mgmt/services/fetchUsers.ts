import { User } from "./types";
import { createService, ServiceFactory } from "../../../src/contexts";

export function fetchUsers(): ServiceFactory<User[]> {
    return createService("./data/users.json", "fetchUsers");
}
