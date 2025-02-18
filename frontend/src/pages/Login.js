import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import ModalButton from "../components/base/ModalButton";
import { useNavigate } from "react-router-dom";
import PageTemplate from "./base/PageTemplate";
import { IoAlertCircle } from "react-icons/io5";

const Login = () => {
    const { user, login, error, setError } = useContext(AppContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/main");
        }
    }, [navigate, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(username, password);
            setError("");
            navigate("/main");
        } catch (error) {
            console.error("Error logging in: ", error);
        }

        setUsername("");
        setPassword("");
    };

    return (
        <PageTemplate>
            <div className="w-1/2 max-w-[37.5rem]">
                <div
                    className={`relative flex flex-col w-full my-[5rem] rounded-md bg-white text-gray-600 drop-shadow-md transition-[height] origin-top ${
                        error ? "h-[22rem]" : "h-[18.75rem]"
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
                        <ModalButton type={"submit"} className="w-full mt-4">
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
