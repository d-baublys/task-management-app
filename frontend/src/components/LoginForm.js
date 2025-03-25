import ModalButton from "../components/base/ModalButton";
import { IoAlertCircle } from "react-icons/io5";
import { handleSubmit, handleRecaptcha } from "../helpers/miscHelpers";
import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import ReCaptcha from "react-google-recaptcha";

const LoginForm = ({ navigate }) => {
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
    } = useContext(AppContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <>
            <form
                onSubmit={(e) =>
                    handleSubmit(
                        e,
                        setError,
                        login,
                        navigate,
                        username,
                        setUsername,
                        password,
                        setPassword,
                        rememberMe,
                        setRememberMe,
                        showToast,
                        setIsRecaptchaOpen,
                        isRecaptchaPassed
                    )
                }
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
            {isRecaptchaOpen && !isRecaptchaPassed && (
                <div className="flex justify-center w-full p-4">
                    <ReCaptcha
                        onChange={(key) =>
                            handleRecaptcha(
                                key,
                                verifyRecaptcha,
                                setIsRecaptchaOpen,
                                setIsRecaptchaPassed,
                                setError,
                                showToast,
                                login,
                                navigate,
                                username,
                                setUsername,
                                password,
                                setPassword,
                                rememberMe,
                                setRememberMe
                            )
                        }
                        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                    ></ReCaptcha>
                </div>
            )}
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
        </>
    );
};

export default LoginForm;
