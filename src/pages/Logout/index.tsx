import { useEffect } from "react";
import { Redirect } from "react-router";
import { useAuth } from "../../contexts";

export function Logout() {
    const auth = useAuth();
    useEffect(() => {
        auth.logout();
    });
    return <Redirect to="/login" push={false} />;
}
