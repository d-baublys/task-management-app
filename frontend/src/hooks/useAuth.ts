import { useEffect } from "react";
import {
    getTokenApi,
    verifyRecaptchaApi,
    loginApi,
    logoutApi,
    toggleTokenHeader,
} from "../services/api";
import { LoginParams, StateSetter } from "../types";
// import { getTokenApi, loginApi, logoutApi, getTokenApiFail, loginApiAuthFail, loginApiServerFail, logoutApiFail } from "../services/api.mock";

interface UseAuthParams {
    isAuthenticated: boolean;
    setIsAuthenticated: StateSetter<boolean>;
    setUser: StateSetter<string | null>;
    setIsDropdownActive: StateSetter<boolean>;
    setLoading: StateSetter<boolean>;
    showToast: (icon: "success" | "failure", message: string) => void;
}

const useAuth = ({
    isAuthenticated,
    setIsAuthenticated,
    setUser,
    setIsDropdownActive,
    setLoading,
    showToast,
}: UseAuthParams) => {
    const getToken = async () => {
        try {
            const response = await getTokenApi();
            toggleTokenHeader(response.data.access_token);
            setIsAuthenticated(true);
            setUser(response.data.username);

            return response;
        } catch (error) {
            console.error("Authentication error: ", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const checkAuthOnLoad = async () => {
        try {
            await getToken();
        } catch (error) {}
    };

    const monitorAccess = async () => {
        if (isAuthenticated) {
            try {
                await getToken();
            } catch {
                try {
                    await logout();
                    showToast("failure", "You have been logged out!");
                } catch (error) {
                    console.error("Authentication error: ", error);
                }
            }
        }
    };

    const verifyRecaptcha = async (key: string | null) => {
        try {
            const response = await verifyRecaptchaApi(key);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const login = async ({ username, password, rememberMe }: LoginParams) => {
        try {
            const response = await loginApi({ username, password, rememberMe });
            await getToken();

            return response;
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await logoutApi();
            toggleTokenHeader();
            setIsAuthenticated(false);
            setIsDropdownActive(false);
            setUser(null);
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        checkAuthOnLoad();
    }, []);

    useEffect(() => {
        const monitorInterval = setInterval(() => monitorAccess(), 60 * 5 * 1000);

        return () => clearInterval(monitorInterval);
    }, [isAuthenticated]);

    return { verifyRecaptcha, login, logout };
};

export default useAuth;
