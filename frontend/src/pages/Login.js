import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import ModalButton from "../components/base/ModalButton";
import { useNavigate } from "react-router-dom";
import PageTemplate from "./base/PageTemplate";
import { IoAlertCircle } from "react-icons/io5";

const Login = () => {
    const { isAuthenticated, login, error, setError, showToast } = useContext(AppContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        isAuthenticated && navigate("/main");
    }, [navigate, isAuthenticated]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(username, password, rememberMe);
            setError("");
            navigate("/main");
            showToast("success", "Log in successful!");
        } catch (error) {
            console.error("Error logging in: ", error);
            error.response.status !== 401 && showToast("failure", "Error logging in!");
        }

        setUsername("");
        setPassword("");
        setRememberMe(false);
    };

    return (
        <PageTemplate>
            <div className="w-1/2 max-w-[37.5rem]">
                <div
                    className={`relative flex flex-col w-full my-[5rem] rounded-md bg-white text-gray-600 drop-shadow-md transition-[height] origin-top ${
                        error ? "h-[23rem]" : "h-[20rem]"
                    }`}
                >
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col items-center mx-4 mt-10 gap-4 min-w-min"
                    >
                        <fieldset className="w-full">
                            <legend className="mb-1">Username</legend>
                            <input
                                className="bg-gray-300 w-full h-8 px-2"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </fieldset>
                        <fieldset className="w-full">
                            <legend className="mb-1">Password</legend>
                            <input
                                className="bg-gray-300 w-full h-8 px-2"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </fieldset>
                        <span className="flex w-full gap-2 text-xs">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={() => setRememberMe((prev) => !prev)}
                            />
                            Remember Me
                        </span>
                        <ModalButton type={"submit"} className="w-full">
                            Log In
                        </ModalButton>
                    </form>
                    <div
                        className={`flex flex-col justify-center h-full mx-4 transition ${
                            error ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        {error && (
                            <span
                                className={`flex justify-center items-start text-red-500 text-xs gap-1`}
                            >
                                <IoAlertCircle className="min-w-fit min-h-fit text-base" />
                                {error}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </PageTemplate>
    );
};

export default Login;
