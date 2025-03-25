export const toastHelper = (setNotification, setIsToastOpen) => {
    const showToast = (icon, message) => {
        setTimeout(() => {
            setNotification({ icon, message });
            setIsToastOpen(true);
        }, 100);
    };

    return showToast;
};

export const handleRecaptcha = async (
    key,
    verifyRecaptcha,
    setIsRecaptchaOpen,
    setIsRecaptchaPassed,
    setError,
    showToast,
    login,
    navigate,
    username,
    setUsername,
    password,
    setPassword,
    rememberMe,
    setRememberMe
) => {
    try {
        await verifyRecaptcha(key);
        setIsRecaptchaPassed(true);
        setIsRecaptchaOpen(false);
        await executeSubmit(
            login,
            navigate,
            setError,
            username,
            setUsername,
            password,
            setPassword,
            rememberMe,
            setRememberMe,
            showToast
        );
    } catch (error) {
        console.error("reCAPTCHA error: ", error);

        if (error.response.status === 403) {
            setError(error.response.data.detail);
        } else {
            showToast("failure", "reCAPTCHA error!");
        }
    }
};

export const handleSubmit = async (
    e,
    setError,
    login,
    navigate,
    username,
    setUsername,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    showToast,
    setIsRecaptchaOpen,
    isRecaptchaPassed
) => {
    e.preventDefault();

    if (isRecaptchaPassed) {
        await executeSubmit(
            login,
            navigate,
            setError,
            username,
            setUsername,
            password,
            setPassword,
            rememberMe,
            setRememberMe,
            showToast
        );
    } else {
        setIsRecaptchaOpen(true);
    }
};

export const executeSubmit = async (
    login,
    navigate,
    setError,
    username,
    setUsername,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    showToast
) => {
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
