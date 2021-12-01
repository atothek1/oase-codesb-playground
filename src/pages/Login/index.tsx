import { useCallback } from "react";
import { Redirect } from "react-router";
import { Heading } from "../../components";
import { useAuth } from "../../contexts";
import { Box } from "../../components";
import { Roles } from "../../contexts/AuthContext/types";

export function Login() {
    const auth = useAuth();
    const handleLoginClickRoleUser = useCallback(
        (e) => {
            e.preventDefault();
            const session = {
                id: "some-id",
                token: "some-token-user",
                expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
                roles: [Roles.USER],
                username: "atothek (User)"
            };
            auth.login(session);
        },
        [auth]
    );
    const handleLoginClickRoleAdmin = useCallback(
        (e) => {
            e.preventDefault();
            const session = {
                id: "some-id",
                token: "some-token-admin",
                expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
                roles: [Roles.ADMIN],
                username: "atothek (Admin)"
            };
            auth.login(session);
        },
        [auth]
    );
    if (auth.isLoggedIn()) {
        return <Redirect to="/" push={false} />;
    }
    return (
        <>
            <Heading> Login Page</Heading>
            <Box width="100%">
                <button onClick={handleLoginClickRoleUser}>Login with role user</button>
                <button onClick={handleLoginClickRoleAdmin}>Login with role admin</button>
            </Box>
        </>
    );
}
