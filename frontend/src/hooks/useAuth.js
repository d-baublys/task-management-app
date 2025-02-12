import { useEffect, useState } from "react";
import { loginApi, logoutApi } from "../services/api";
import { checkApiAuth } from "../services/api";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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

    const login = async (username, password) => {
        try {
            const response = await loginApi(username, password);
            setUser(response.data.username);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => logoutApi().then(() => setUser(null));

    return { user, setUser, login, logout, loading, setLoading };
};

export default useAuth;
