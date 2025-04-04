import { NavigateFunction } from "react-router-dom";
import { GeneralApiResponse, LoginParams, StateSetter } from "../types";
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

interface HandleSubmitArgs {
    e: React.FormEvent<HTMLFormElement>;
    authGroup: AuthGroupType;
    userGroup: UserGroupType;
    uiGroup: UiGroupType;
}

interface ExecuteSubmitArgs {
    authGroup: AuthGroupType;
    userGroup: UserGroupType;
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
        await executeSubmit({ authGroup, userGroup, uiGroup });
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

export const handleSubmit = async ({ e, authGroup, userGroup, uiGroup }: HandleSubmitArgs) => {
    e.preventDefault();

    const { username, password } = userGroup;
    const { setIsRecaptchaOpen, isRecaptchaPassed } = uiGroup;

    if (username && password) {
        if (isRecaptchaPassed) {
            await executeSubmit({ authGroup, userGroup, uiGroup });
        } else {
            setIsRecaptchaOpen(true);
        }
    }
};

export const executeSubmit = async ({ authGroup, userGroup, uiGroup }: ExecuteSubmitArgs) => {
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
