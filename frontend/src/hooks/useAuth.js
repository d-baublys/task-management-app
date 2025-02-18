import { useEffect } from "react";
import { loginApi, logoutApi } from "../services/api";
import { checkApiAuth } from "../services/api";

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
            error.response.data.error && setError(error.response.data.error);
            throw error;
        }
    };

    const logout = () => logoutApi().then(() => setUser(null));

    return { login, logout };
};

export default useAuth;
