import React from "react";
import { useNavigate } from "react-router";
import LogInSignUpPage from "./base/LogInSignUpPage";
import useAppContext from "../context/AppContext";

export default function SignUpPage() {
    const navigate = useNavigate();
    const { error } = useAppContext();

    return (
        <LogInSignUpPage
            variant="signUp"
            navigate={navigate}
            overrides={`${error ? "h-[26rem]" : "h-[22.75em]"}`}
        />
    );
}
