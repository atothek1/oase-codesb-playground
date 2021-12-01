import React from "react";
import { User } from "../services/types";
import { Map } from "../../../src/components/data";
import { UserListElement } from "./UserListElement";

interface UserListProps {
    readonly data: User[];
}
export function UserList(props: UserListProps) {
    const { data } = props;

    return <Map data={data} component={UserListElement} />;
}
