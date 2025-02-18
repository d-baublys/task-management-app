import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import { IoCloseSharp, IoCheckmarkCircleSharp, IoWarningSharp } from "react-icons/io5";

const ToastNotification = () => {
    const { notification, setNotification, isToastOpen, setIsToastOpen } = useContext(AppContext);
    const iconOptions = { success: IoCheckmarkCircleSharp, failure: IoWarningSharp };
    const Icon = iconOptions[notification?.icon];

    useEffect(() => {
        const visibilityTimeout = setTimeout(() => setIsToastOpen(false), 3000);
        const dataTimeout = setTimeout(() => setNotification(null), 4000);

        return () => {
            clearTimeout(visibilityTimeout);
            clearTimeout(dataTimeout);
        };
    }, [notification, setIsToastOpen, setNotification]);

    return (
        <div
            className={`toast fixed top-10 right-10 w-[22rem] h-24 bg-gray-300 overflow-hidden z-[1000] before:absolute before:inset-0 before:blur-sm before:bg-white before:z-[-1] ${
                notification && isToastOpen
                    ? "gradual-on opacity-100 scale-100"
                    : notification
                    ? "gradual-off opacity-0 scale-0"
                    : "instant-off opacity-0 scale-0"
            }`}
        >
            {notification && (
                <div className="flex flex-col justify-center items-center w-full h-full text-gray-500">
                    <div className="flex w-full h-1/2">
                        <div className="flex justify-end items-center w-20">
                            {notification?.icon && <Icon className="text-2xl mr-2" />}
                        </div>
                        <div className="flex items-center w-full">{notification?.message}</div>
                        <div className="flex justify-center items-center w-24">
                            <IoCloseSharp
                                className="text-2xl cursor-pointer"
                                onClick={() => {
                                    setIsToastOpen(false);
                                    setNotification(null);
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ToastNotification;
