import React, { useEffect, useState } from "react";
import { Text } from "../../components";
import { UserList } from "../../components/app/UserList";
import { Service } from "../../contexts";
import { useFetchUsers } from "../../services/useFetchUsers";

export function Users() {
    // const result = useFetchUsers();
    return (
        <>
            <Text as="h2">Userlist</Text>
            <Service service="fetchUsers" component={UserList} />
        </>
    );
}
