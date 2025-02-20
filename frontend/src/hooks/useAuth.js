import { useEffect } from "react";
import { checkApiAuth, loginApi, logoutApi } from "../services/api";
// import { checkApiAuth, loginApi, logoutApi, checkApiAuthFail, loginApiAuthFail, loginApiServerFail, logoutApiFail } from "../services/api.mock";

const useAuth = (setUser, setLoading, setError) => {
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await checkApiAuth();
                setUser(response.data.username);
            } catch (error) {
                console.error("Authentication error: ", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (username, password, rememberMe) => {
        try {
            const response = await loginApi(username, password, rememberMe);
            setUser(response.data.username);
            return response;
        } catch (error) {
            error.response.status === 401 && setError(error.response.data.error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await logoutApi();
            setUser(null);
        } catch (error) {
            throw error;
        }
    };

    return { login, logout };
};

export default useAuth;
