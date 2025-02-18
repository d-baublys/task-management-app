import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";

const ToastNotification = () => {
    const { notification, setNotification } = useContext(AppContext);

    useEffect(() => {
        const timeout = setTimeout(() => setNotification(""), 3000);

        return () => clearTimeout(timeout);
    }, [notification]);

    return (
        <div
            className={`toast overflow-hidden before:absolute before:inset-0 before:blur-sm before:bg-theme-lighter fixed top-10 right-10 w-56 h-24 bg-theme-medium rounded-lg before:z-[-1] z-[1000] ${
                notification ? "visible opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
        >
            <div className="flex flex-col justify-center items-center w-full h-full">
                {notification}
            </div>
        </div>
    );
};

export default ToastNotification;
