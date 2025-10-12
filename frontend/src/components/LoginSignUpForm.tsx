import ModalButton from "./base/ModalButton";
import { IoAlertCircle } from "react-icons/io5";
import { handleLogIn, handleRecaptcha, handleSignUp } from "../lib/misc-helpers";
import React, { useEffect, useState } from "react";
import ReCaptcha from "react-google-recaptcha";
import { Link, NavigateFunction, useLocation } from "react-router";
import { FormVariants, StateSetter } from "../lib/definitions";
import FormInput from "./FormInput";
import useUiContext from "../context/UiContext";
import useAuthContext from "../context/AuthContext";
import useThemeContext from "../context/ThemeContext";

interface Props {
    variant: FormVariants;
    navigate: NavigateFunction;
    isRecaptchaOpen: boolean;
    setIsRecaptchaOpen: StateSetter<boolean>;
    isRecaptchaPassed: boolean;
    setIsRecaptchaPassed: StateSetter<boolean>;
    errorMessage: string;
    errorSetter: StateSetter<string>;
}

export default function LoginSignUpForm({
    variant,
    navigate,
    isRecaptchaOpen,
    setIsRecaptchaOpen,
    isRecaptchaPassed,
    setIsRecaptchaPassed,
    errorMessage,
    errorSetter,
}: Props) {
    const { showToast } = useUiContext();
    const { auth } = useAuthContext();
    const { theme } = useThemeContext();
    const { verifyRecaptcha, login, signUp } = auth;

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
        errorSetter,
        navigate,
        showToast,
        setIsRecaptchaOpen,
        isRecaptchaPassed,
        setIsRecaptchaPassed,
    };

    useEffect(() => {
        setEmail("");
        setPassword("");
        errorSetter("");
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
                    aria-label="Email"
                    type="email"
                    legendText="Email Address"
                    value={email}
                    valueSetter={setEmail}
                />
                <FormInput
                    aria-label="Password"
                    type="password"
                    legendText="Password"
                    value={password}
                    valueSetter={setPassword}
                    passwordVisiblityBoolean={showPassword}
                    passwordVisibilitySetter={setShowPassword}
                />
                {variant === "signUp" && (
                    <div className="w-full mb-2">
                        <FormInput
                            aria-label="Confirm password"
                            type="password"
                            legendText="Confirm Password"
                            value={passwordConfirm}
                            valueSetter={setPasswordConfirm}
                            passwordVisiblityBoolean={showPasswordConfirm}
                            passwordVisibilitySetter={setShowPasswordConfirm}
                        />
                    </div>
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
                <ModalButton
                    data-testid="form-submit-button"
                    type="submit"
                    customDimensions="w-full h-16"
                >
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
                    errorMessage || (isRecaptchaOpen && !isRecaptchaPassed)
                        ? "opacity-100"
                        : "opacity-0"
                }`}
            >
                {variant === "logIn" && isRecaptchaOpen && !isRecaptchaPassed && (
                    <div className="flex justify-center w-full">
                        <div className="w-[264px] md:w-[304px]">
                            <div className="w-min scale-[86.84%] md:scale-100 origin-left">
                                <ReCaptcha
                                    key={theme}
                                    theme={theme}
                                    onChange={(key: string | null) =>
                                        handleRecaptcha({ key, authGroup, userGroup, uiGroup })
                                    }
                                    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY || ""}
                                ></ReCaptcha>
                            </div>
                        </div>
                    </div>
                )}
                {errorMessage && (
                    <span
                        className={`flex justify-center items-start text-red-500 text-xs md:text-[0.8rem] gap-1`}
                    >
                        <IoAlertCircle className="min-w-fit min-h-fit text-base" />
                        <span>{errorMessage}</span>
                    </span>
                )}
            </div>
        </>
    );
}
