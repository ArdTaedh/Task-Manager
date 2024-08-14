import { createContext, ReactNode, useContext, useState } from "react";
import { UserType } from "src/types/user.types";

interface AuthContextTypes {
    user: UserType | null;
    userId: string | null;
    token: string;
    signOut: () => void;
    setUser: (user: UserType) => void;
    setUserIdHandler: (id: string) => void;
    setTokenHandler: (token: string) => void;
}

export const AuthContext = createContext<AuthContextTypes | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [userId, setUserId] = useState(localStorage.getItem("token") || "");

    const setTokenHandler = (token: string) => {
        setToken(token);
        localStorage.setItem("token", token);
        return;
    };

    const setUserIdHandler = (id: string) => {
        setUserId(id);
        localStorage.setItem("userId", id);
        return;
    };

    const signOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        window.location.href = "/auth/sign-in";
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                userId,
                user,
                signOut,
                setTokenHandler,
                setUserIdHandler,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }

    return context;
};
