import { useEffect } from "react";
import { getTokenApi, loginApi, logoutApi, toggleTokenHeader } from "../services/api";
// import { getTokenApi, loginApi, logoutApi, getTokenApiFail, loginApiAuthFail, loginApiServerFail, logoutApiFail } from "../services/api.mock";

const useAuth = (
    isAuthenticated,
    setIsAuthenticated,
    setUser,
    setIsDropdownActive,
    setLoading,
    showToast
) => {
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

    const login = async (username, password, rememberMe) => {
        try {
            const response = await loginApi(username, password, rememberMe);
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

    return { login, logout };
};

export default useAuth;
