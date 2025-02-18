const miscHelpers = (setNotification, setIsToastOpen) => {
    const showToast = (icon, message) => {
        setTimeout(() => {
            setNotification({ icon, message });
            setIsToastOpen(true);
        }, 100);
    };

    return showToast;
};

export default miscHelpers;
