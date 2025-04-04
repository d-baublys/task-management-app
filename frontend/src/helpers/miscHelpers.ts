import { NavigateFunction } from "react-router-dom";
import { GeneralApiResponse, StateSetter } from "../types";
import { AxiosError } from "axios";

type ToastHelperArgs = [
    setNotification: React.Dispatch<
        React.SetStateAction<{ icon: "success" | "failure"; message: string } | null>
    >,
    setIsToastOpen: StateSetter<boolean>
];

export const toastHelper = (...args: ToastHelperArgs) => {
    const [setNotification, setIsToastOpen] = args;

    const showToast = (icon: "success" | "failure", message: string) => {
        setTimeout(() => {
            setNotification({ icon, message });
            setIsToastOpen(true);
        }, 100);
    };

    return showToast;
};

interface AuthGroupType {
    login: (username: string, password: string, rememberMe: boolean) => GeneralApiResponse;
    rememberMe: boolean;
    setRememberMe: StateSetter<boolean>;
    verifyRecaptcha: (key: string | null) => GeneralApiResponse;
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

type HandleRecaptchaArgs = [
    key: string | null,
    authGroup: AuthGroupType,
    userGroup: UserGroupType,
    uiGroup: UiGroupType
];

type HandleSubmitArgs = [
    e: React.FormEvent<HTMLFormElement>,
    authGroup: AuthGroupType,
    userGroup: UserGroupType,
    uiGroup: UiGroupType
];

type ExecuteSubmitArgs = [authGroup: AuthGroupType, userGroup: UserGroupType, uiGroup: UiGroupType];

export const handleRecaptcha = async (...args: HandleRecaptchaArgs) => {
    const [key, authGroup, userGroup, uiGroup] = args;
    const { verifyRecaptcha } = authGroup;
    const { setError, showToast, setIsRecaptchaOpen, setIsRecaptchaPassed } = uiGroup;

    try {
        await verifyRecaptcha(key);
        setIsRecaptchaPassed(true);
        setIsRecaptchaOpen(false);
        await executeSubmit(authGroup, userGroup, uiGroup);
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

export const handleSubmit = async (...args: HandleSubmitArgs) => {
    const [e, authGroup, userGroup, uiGroup] = args;

    e.preventDefault();

    const { username, password } = userGroup;
    const { setIsRecaptchaOpen, isRecaptchaPassed } = uiGroup;

    if (username && password) {
        if (isRecaptchaPassed) {
            await executeSubmit(authGroup, userGroup, uiGroup);
        } else {
            setIsRecaptchaOpen(true);
        }
    }
};

export const executeSubmit = async (...args: ExecuteSubmitArgs) => {
    const [authGroup, userGroup, uiGroup] = args;
    const { login, rememberMe, setRememberMe } = authGroup;
    const { username, setUsername, password, setPassword } = userGroup;
    const { setError, navigate, showToast } = uiGroup;

    try {
        setError("");
        await login(username, password, rememberMe);
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
