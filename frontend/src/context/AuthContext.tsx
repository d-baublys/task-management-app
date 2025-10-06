import React, { useState, createContext, useContext } from "react";
import useAuth from "../hooks/useAuth";
import { GeneralApiResponse, LoginParams, SignUpParams, StateSetter } from "../lib/definitions";

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: StateSetter<boolean>;
    user: string | null;
    setUser: StateSetter<string | null>;
    auth: {
        login: (param: LoginParams) => GeneralApiResponse<{ message: string; email: string }>;
        logout: () => Promise<void>;
        signUp: (params: SignUpParams) => GeneralApiResponse<{ email: string }>;
        verifyRecaptcha: (key: string | null) => GeneralApiResponse<{ [key: string]: string }>;
    };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
    children,
    overrides,
}: {
    children: React.ReactNode;
    overrides?: Partial<AuthContextType>;
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<string | null>(null);

    const auth = useAuth({
        isAuthenticated,
        setIsAuthenticated,
        setUser,
    });

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                user,
                setUser,
                auth,
                ...overrides,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("No context in auth provider.");
    }

    return context;
};

export default useAuthContext;
