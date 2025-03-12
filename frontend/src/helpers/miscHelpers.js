export const toastHelper = (setNotification, setIsToastOpen) => {
    const showToast = (icon, message) => {
        setTimeout(() => {
            setNotification({ icon, message });
            setIsToastOpen(true);
        }, 100);
    };

    return showToast;
};

export const handleSubmit = async (
    e,
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
    e.preventDefault();

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
