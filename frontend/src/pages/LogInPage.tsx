import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import LogInSignUpPage from "./base/LogInSignUpPage";
import useAuthContext from "../context/AuthContext";

export default function LogInPage({
    recaptchaRenderOverride,
}: {
    recaptchaRenderOverride?: boolean;
}) {
    const { isAuthenticated } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        isAuthenticated && navigate("/main");
    }, [navigate, isAuthenticated]);

    return (
        <LogInSignUpPage
            variant="logIn"
            navigate={navigate}
            recaptchaRenderOverride={recaptchaRenderOverride}
        />
    );
}
