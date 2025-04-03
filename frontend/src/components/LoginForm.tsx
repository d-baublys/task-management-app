import ModalButton from "./base/ModalButton";
import { IoAlertCircle } from "react-icons/io5";
import { handleSubmit, handleRecaptcha } from "../helpers/miscHelpers";
import React, { useState } from "react";
import ReCaptcha from "react-google-recaptcha";
import { NavigateFunction } from "react-router-dom";
import useAppContext from "../context/AppContext";

interface Props {
    navigate: NavigateFunction;
}

const LoginForm = ({ navigate }: Props) => {
    const {
        verifyRecaptcha,
        login,
        isRecaptchaOpen,
        setIsRecaptchaOpen,
        isRecaptchaPassed,
        setIsRecaptchaPassed,
        error,
        setError,
        showToast,
    } = useAppContext();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const authGroup = { login, rememberMe, setRememberMe, verifyRecaptcha };
    const userGroup = { username, setUsername, password, setPassword };
    const uiGroup = {
        setError,
        navigate,
        showToast,
        setIsRecaptchaOpen,
        isRecaptchaPassed,
        setIsRecaptchaPassed,
    };

    return (
        <>
            <form
                onSubmit={(e) => handleSubmit(e, authGroup, userGroup, uiGroup)}
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
                    error || (isRecaptchaOpen && !isRecaptchaPassed) ? "opacity-100" : "opacity-0"
                }`}
            >
                {isRecaptchaOpen && !isRecaptchaPassed && (
                    <div className="flex justify-center w-full">
                        <div className="w-[264px] md:w-[304px]">
                            <div className="w-min scale-[86.84%] md:scale-100 origin-left">
                                <ReCaptcha
                                    onChange={(key: string | null) =>
                                        handleRecaptcha(key, authGroup, userGroup, uiGroup)
                                    }
                                    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY || ""}
                                ></ReCaptcha>
                            </div>
                        </div>
                    </div>
                )}
                {error && (
                    <span
                        className={`flex justify-center items-start text-red-500 text-xs md:text-[0.8rem] gap-1`}
                    >
                        <IoAlertCircle className="min-w-fit min-h-fit text-base" />
                        <span>{error}</span>
                    </span>
                )}
            </div>
        </>
    );
};

export default LoginForm;
