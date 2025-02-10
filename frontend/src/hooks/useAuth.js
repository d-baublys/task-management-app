import { useState } from "react";
import { loginApi, logoutApi } from "../services/api";

const useAuth = () => {
    const [user, setUser] = useState(null);

    const login = (username, password) => {
        loginApi(username, password)
            .then((response) => setUser(response.data))
            .catch((error) => console.log(error.message));
    };

    const logout = () => {
        logoutApi().then(() => setUser(null));
    };

    return { user, login, logout };
};

export default useAuth;
