import ModalButton from "./base/ModalButton";
import { IoAlertCircle } from "react-icons/io5";
import { handleLogIn, handleRecaptcha, handleSignUp } from "../helpers/miscHelpers";
import React, { useEffect, useState } from "react";
import ReCaptcha from "react-google-recaptcha";
import { Link, NavigateFunction, useLocation } from "react-router-dom";
import useAppContext from "../context/AppContext";
import { FormVariants } from "../types";
import FormInput from "./FormInput";

interface Props {
    variant: FormVariants;
    navigate: NavigateFunction;
}

export default function LoginSignUpForm({ variant, navigate }: Props) {
    const {
        verifyRecaptcha,
        login,
        signUp,
        isRecaptchaOpen,
        setIsRecaptchaOpen,
        isRecaptchaPassed,
        setIsRecaptchaPassed,
        error,
        setError,
        showToast,
    } = useAppContext();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState(false);

    const pathname = useLocation();

    const authGroup = { login, rememberMe, setRememberMe, verifyRecaptcha };
    const userGroup = { email, setEmail, password, setPassword };
    const signUpGroup = { signUp, email, password, passwordConfirm };
    const uiGroup = {
        setError,
        navigate,
        showToast,
        setIsRecaptchaOpen,
        isRecaptchaPassed,
        setIsRecaptchaPassed,
    };

    useEffect(() => {
        setEmail("");
        setPassword("");
        setError("");
    }, [pathname]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement | null;

        if (form) {
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            variant === "logIn"
                ? handleLogIn({ authGroup, userGroup, uiGroup })
                : handleSignUp({ signUpGroup, uiGroup });
        }
    };

    return (
        <>
            <form
                className="flex flex-col items-center mx-4 mt-10 gap-5 md:gap-[1.125rem] min-w-min"
                onSubmit={handleSubmit}
            >
                <FormInput
                    type="email"
                    legendText="Email Address"
                    value={email}
                    valueSetter={setEmail}
                />
                <FormInput
                    type="password"
                    legendText="Password"
                    value={password}
                    valueSetter={setPassword}
                    passwordVisiblityBoolean={showPassword}
                    passwordVisibilitySetter={setShowPassword}
                />
                {variant === "signUp" && (
                    <FormInput
                        type="password"
                        legendText="Confirm Password"
                        value={passwordConfirm}
                        valueSetter={setPasswordConfirm}
                        passwordVisiblityBoolean={showPasswordConfirm}
                        passwordVisibilitySetter={setShowPasswordConfirm}
                    />
                )}
                {variant === "logIn" && (
                    <div className="flex w-full gap-2 text-xs md:text-[0.8rem]">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={() => setRememberMe((prev) => !prev)}
                        />
                        <span>Remember Me</span>
                    </div>
                )}
                <ModalButton type="submit" customDimensions="w-full h-16">
                    {variant === "logIn" ? "Log In" : "Create Account"}
                </ModalButton>
                {variant === "logIn" && (
                    <div className="text-xs md:text-[0.8rem]">
                        <span>Don't have an account? </span>
                        <Link to={"/create-account"} className="font-semibold">
                            Click here to create one.
                        </Link>
                    </div>
                )}
            </form>
            <div
                className={`flex flex-col justify-center h-full mx-4 transition ${
                    error || (isRecaptchaOpen && !isRecaptchaPassed) ? "opacity-100" : "opacity-0"
                }`}
            >
                {variant === "logIn" && isRecaptchaOpen && !isRecaptchaPassed && (
                    <div className="flex justify-center w-full">
                        <div className="w-[264px] md:w-[304px]">
                            <div className="w-min scale-[86.84%] md:scale-100 origin-left">
                                <ReCaptcha
                                    onChange={(key: string | null) =>
                                        handleRecaptcha({ key, authGroup, userGroup, uiGroup })
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
}
