import { createContext, useContext, useMemo, useState } from "react";
import { useLocalStorage } from "../../hooks";
import { Session } from "../../types";
import { intersect } from "../../utils";
import { AuthContextValue, AuthProviderProps, AuthState } from "./types";

const initialValue: AuthContextValue = {
    isLoggedIn() {
        return false;
    },
    isAuthorized(requiredRoles: string[]) {
        return false;
    },
    isMe(username: string) {
        return false;
    },
    getRoles() {
        return [];
    },
    getSession() {
        return null;
    },
    login(session: Session) {},
    logout() {}
};
const AuthContext = createContext<AuthContextValue>(initialValue);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [auth, setAuth] = useLocalStorage("auth");
    const [state, setState] = useState<AuthState>(() => {
        return auth !== undefined ? auth : { status: false, session: null };
    });

    const contextValue = useMemo<AuthContextValue>(
        () => ({
            isLoggedIn() {
                return state.status;
            },
            isAuthorized(requiredRoles: string[]) {
                return (
                    state.status &&
                    state.session !== null &&
                    intersect(state.session.roles, requiredRoles).length >= 1
                );
            },
            isMe(username: string) {
                return state.session?.username === username;
            },
            getRoles() {
                return state.session !== null ? state.session.roles : [];
            },
            getSession() {
                return state.session;
            },
            login(session: Session) {
                setAuth({ status: true, session });
                setState({ status: true, session });
            },
            logout() {
                setAuth({ status: false, session: null });
                setState({ status: false, session: null });
            }
        }),
        [state, setAuth, setState]
    );
    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
