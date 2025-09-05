import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAppContext from "../context/AppContext";
import LogInSignUpPage from "./base/LogInSignUpPage";

export default function LogInPage() {
    const { error, isAuthenticated, isRecaptchaOpen, isRecaptchaPassed } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        isAuthenticated && navigate("/main");
    }, [navigate, isAuthenticated]);

    return (
        <LogInSignUpPage
            variant="logIn"
            navigate={navigate}
            overrides={`${
                isRecaptchaOpen && !isRecaptchaPassed && error
                    ? "h-[31rem]"
                    : isRecaptchaOpen && !isRecaptchaPassed
                    ? "h-[28rem]"
                    : error
                    ? "h-[26rem]"
                    : "h-[21.5rem]"
            }`}
        />
    );
}
