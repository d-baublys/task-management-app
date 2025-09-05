import { NavigateFunction } from "react-router-dom";
import { GeneralApiResponse, LoginParams, SignUpParams, StateSetter } from "../types";
import { AxiosError } from "axios";

interface AuthGroupType {
    login: (param: LoginParams) => GeneralApiResponse<{ message: string; username: string }>;
    rememberMe: boolean;
    setRememberMe: StateSetter<boolean>;
    verifyRecaptcha: (key: string | null) => GeneralApiResponse<{ [key: string]: string }>;
}

interface UserGroupType {
    username: string;
    setUsername: StateSetter<string>;
    password: string;
    setPassword: StateSetter<string>;
}

interface UiGroupType {
    setError: StateSetter<string>;
    navigate: NavigateFunction;
    showToast: (icon: "success" | "failure", message: string) => void;
    setIsRecaptchaOpen: StateSetter<boolean>;
    isRecaptchaPassed: boolean;
    setIsRecaptchaPassed: StateSetter<boolean>;
}

interface SignUpGroupType {
    signUp: (params: SignUpParams) => GeneralApiResponse<{ username: string; password: string }>;
    username: string;
    password: string;
    passwordConfirm: string;
}

interface ToastHelperArgs {
    setNotification: React.Dispatch<
        React.SetStateAction<{ icon: "success" | "failure"; message: string } | null>
    >;
    setIsToastOpen: StateSetter<boolean>;
}

interface HandleRecaptchaArgs {
    key: string | null;
    authGroup: AuthGroupType;
    userGroup: UserGroupType;
    uiGroup: UiGroupType;
}

interface HandleLogInArgs {
    authGroup: AuthGroupType;
    userGroup: UserGroupType;
    uiGroup: UiGroupType;
}

interface SignUpArgs {
    signUpGroup: SignUpGroupType;
    uiGroup: UiGroupType;
}

export const toastHelper = ({ setNotification, setIsToastOpen }: ToastHelperArgs) => {
    const showToast = (icon: "success" | "failure", message: string) => {
        setTimeout(() => {
            setNotification({ icon, message });
            setIsToastOpen(true);
        }, 100);
    };

    return showToast;
};

export const handleRecaptcha = async ({
    key,
    authGroup,
    userGroup,
    uiGroup,
}: HandleRecaptchaArgs) => {
    const { verifyRecaptcha } = authGroup;
    const { setError, showToast, setIsRecaptchaOpen, setIsRecaptchaPassed } = uiGroup;

    try {
        await verifyRecaptcha(key);
        setIsRecaptchaPassed(true);
        setIsRecaptchaOpen(false);
        await executeLogIn({ authGroup, userGroup, uiGroup });
    } catch (error: unknown) {
        console.error("reCAPTCHA error: ", error);

        if (error instanceof AxiosError) {
            if (error.response?.status === 403) {
                setError(error.response.data.detail);
            } else {
                showToast("failure", "reCAPTCHA error!");
            }
        }
    }
};

export const handleLogIn = async ({ authGroup, userGroup, uiGroup }: HandleLogInArgs) => {
    const { username, password } = userGroup;
    const { setIsRecaptchaOpen, isRecaptchaPassed } = uiGroup;

    if (username && password) {
        if (isRecaptchaPassed) {
            await executeLogIn({ authGroup, userGroup, uiGroup });
        } else {
            setIsRecaptchaOpen(true);
        }
    }
};

export const executeLogIn = async ({ authGroup, userGroup, uiGroup }: HandleLogInArgs) => {
    const { login, rememberMe, setRememberMe } = authGroup;
    const { username, setUsername, password, setPassword } = userGroup;
    const { setError, navigate, showToast } = uiGroup;

    try {
        setError("");
        await login({ username, password, rememberMe });
        navigate("/main");
        showToast("success", "Log in successful!");
    } catch (error: unknown) {
        console.error("Error logging in: ", error);

        if (error instanceof AxiosError) {
            if (error.response?.status === 401) {
                setError(error.response.data.detail);
            } else if ([403, 429].includes(error.response?.status ?? -1)) {
                setError("Too many failed login attempts! Please try again later.");
            } else {
                showToast("failure", "Error logging in!");
            }
        }

        setUsername("");
        setPassword("");
        setRememberMe(false);
    }
};

export const handleSignUp = async ({ signUpGroup, uiGroup }: SignUpArgs) => {
    const { signUp, username, password, passwordConfirm } = signUpGroup;
    const { setError, navigate, showToast } = uiGroup;

    if (username && password && passwordConfirm) {
        try {
            await signUp({ username, password, passwordConfirm });
            navigate("/login");
            showToast("success", "Account created successfully!");
        } catch (error: unknown) {
            console.error(error);

            if (error instanceof AxiosError) {
                setError((Object.values(error.response?.data.detail)[0] as Array<string>)[0]);
            } else {
                showToast("failure", "Error creating account. Please try again later.");
            }
        }
    }
};
