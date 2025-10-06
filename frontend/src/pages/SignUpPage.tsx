import React from "react";
import { useNavigate } from "react-router";
import LogInSignUpPage from "./base/LogInSignUpPage";

export default function SignUpPage() {
    const navigate = useNavigate();

    return <LogInSignUpPage variant="signUp" navigate={navigate} />;
}
