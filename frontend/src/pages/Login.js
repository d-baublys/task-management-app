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
            setError("");
            await login(username, password, rememberMe);
            navigate("/main");
            showToast("success", "Log in successful!");
        } catch (error) {
            console.error("Error logging in: ", error);

            if (error.response.status === 401) {
                setError(error.response.data.detail);
            } else if ([403, 429].includes(error.response.status)) {
                setError("Too many failed login attempts! Please try again later.");
            } else {
                showToast("failure", "Error logging in!");
            }
        }

        setUsername("");
        setPassword("");
        setRememberMe(false);
    };

    return (
        <PageTemplate
            wrapperDimensions={"min-w-[360px]"}
            columnDimensions={"sm:min-w-board-btn-spacing-sm"}
        >
            <div className="flex-grow xs:mx-[3rem] md:!mx-[5rem] max-w-[37.5rem]">
                <div
                    className={`relative flex flex-col w-full my-[5rem] rounded-md bg-white drop-shadow-md transition-[height] origin-top ${
                        error ? "h-[23rem]" : "h-[20rem]"
                    }`}
                >
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col items-center mx-4 mt-10 gap-5 md:gap-[1.125rem] min-w-min"
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
                        <span className="flex w-full gap-2 text-xs md:text-[0.8rem]">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={() => setRememberMe((prev) => !prev)}
                            />
                            Remember Me
                        </span>
                        <ModalButton type={"submit"} customDimensions="w-full h-16">
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
                                className={`flex justify-center items-start text-red-500 text-xs md:text-[0.8rem] gap-1`}
                            >
                                <IoAlertCircle className="min-w-fit min-h-fit text-base" />
                                <span>{error}</span>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </PageTemplate>
    );
};

export default Login;
