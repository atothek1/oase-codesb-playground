import { UserList } from "./components/UserList";
import { ServiceStatus } from "../../src/contexts/ServiceContext/ServiceStatus";
import { useFetchUsers } from "./services/useFetchUsers";

interface UserMgmtProps {}
export function UserMgmt(props: UserMgmtProps) {
    const { isFetching, isError, data, error } = useFetchUsers();
    const hasData = !isFetching && data !== null;

    return (
        <ServiceStatus isFetching={isFetching} isError={isError} error={error} hasData={hasData}>
            <h1>User Management</h1>
            <UserList data={data!} />
        </ServiceStatus>
    );
}
