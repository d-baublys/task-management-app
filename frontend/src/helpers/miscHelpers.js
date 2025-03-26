export const toastHelper = (setNotification, setIsToastOpen) => {
    const showToast = (icon, message) => {
        setTimeout(() => {
            setNotification({ icon, message });
            setIsToastOpen(true);
        }, 100);
    };

    return showToast;
};

export const handleRecaptcha = async (key, authGroup, userGroup, uiGroup) => {
    const { verifyRecaptcha } = authGroup;
    const { setError, showToast, setIsRecaptchaOpen, setIsRecaptchaPassed } = uiGroup;

    try {
        await verifyRecaptcha(key);
        setIsRecaptchaPassed(true);
        setIsRecaptchaOpen(false);
        await executeSubmit(authGroup, userGroup, uiGroup);
    } catch (error) {
        console.error("reCAPTCHA error: ", error);

        if (error.response.status === 403) {
            setError(error.response.data.detail);
        } else {
            showToast("failure", "reCAPTCHA error!");
        }
    }
};

export const handleSubmit = async (e, authGroup, userGroup, uiGroup) => {
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

export const executeSubmit = async (authGroup, userGroup, uiGroup) => {
    const { login, rememberMe, setRememberMe } = authGroup;
    const { username, setUsername, password, setPassword } = userGroup;
    const { setError, navigate, showToast } = uiGroup;

    try {
        setError("");
        await login(username, password, rememberMe);
        navigate("/main");
        showToast("success", "Log in successful!");
    } catch (error) {
        console.error("Error logging in: ", error);

        if (error.response.status === 401) {
            setError(error.response.data.detail);
        } else if ([403, 429].includes(error.response.status)) {
            setError("Too many failed login attempts! Please try again later.");
        } else {
            showToast("failure", "Error logging in!");
        }
    }

    setUsername("");
    setPassword("");
    setRememberMe(false);
};
