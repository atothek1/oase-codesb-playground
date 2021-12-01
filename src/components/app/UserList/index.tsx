import React from "react";
import { ServiceResult } from "../../../contexts";
import { UserItem } from "../../../types";
import { Map } from "../../data";
import { UserListElement } from "../UserListElement";

interface UserListProps {
    readonly result: ServiceResult<UserItem[]>;
}
export function UserList(props: UserListProps) {
    const {
        result: { data }
    } = props;

    return <Map data={data} component={UserListElement} />;
}
