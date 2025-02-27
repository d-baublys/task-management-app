import { useEffect } from "react";
import { checkApiAuth, loginApi, logoutApi, toggleTokenHeader } from "../services/api";
// import { checkApiAuth, loginApi, logoutApi, checkApiAuthFail, loginApiAuthFail, loginApiServerFail, logoutApiFail } from "../services/api.mock";

const useAuth = (isAuthenticated, setIsAuthenticated, setUser, setLoading, setError, showToast) => {
    const checkAuth = async () => {
        try {
            const response = await checkApiAuth();
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
            await checkAuth();
        } catch (error) {
            console.log("Ignore - unauthenticated on page load...");
        }
    };

    const monitorAccess = async () => {
        if (isAuthenticated) {
            try {
                await checkAuth();
            } catch {
                await logout();
                showToast("failure", "You have been logged out!");
            }
        }
    };

    const login = async (username, password, rememberMe) => {
        try {
            const response = await loginApi(username, password, rememberMe);
            await checkAuth();

            return response;
        } catch (error) {
            error.response.status === 401 && setError(error.response.data.error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await logoutApi();
            toggleTokenHeader();
            setIsAuthenticated(false);
            setUser(null);
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        checkAuthOnLoad();
        const monitorInterval = setInterval(() => monitorAccess(), 60 * 5 * 1000);

        return () => clearInterval(monitorInterval);
    }, []);

    return { login, logout };
};

export default useAuth;
