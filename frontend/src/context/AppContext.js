import { useState, createContext } from "react";
import useTasks from "../hooks/useTasks";
import useAuth from "../hooks/useAuth";
import { toastHelper } from "../helpers/miscHelpers";

const AppContext = createContext();

export const ContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [tasks, setTasks] = useState([]);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDropdownActive, setIsDropdownActive] = useState(false);
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [modalPromise, setModalPromise] = useState(null);
    const [dragAllowed, setDragAllowed] = useState(false);
    const [activeTaskId, setActiveTaskId] = useState(null);
    const [notification, setNotification] = useState(null);
    const [isRecaptchaOpen, setIsRecaptchaOpen] = useState(false);
    const [isRecaptchaPassed, setIsRecaptchaPassed] = useState(false);

    const showToast = toastHelper(setNotification, setIsToastOpen);
    const { verifyRecaptcha, login, logout } = useAuth(
        isAuthenticated,
        setIsAuthenticated,
        setUser,
        setIsDropdownActive,
        setLoading,
        setError,
        showToast
    );
    const { addTask, updateTask, saveTask, updateMultiTask, deleteTask } = useTasks(
        isAuthenticated,
        setTasks,
        showToast
    );

    const boardTitles = {
        "To Do": "to_do",
        "In Progress": "in_progress",
        "Done": "done",
    };

    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                user,
                setUser,
                login,
                logout,
                loading,
                setLoading,
                error,
                setError,
                tasks,
                setTasks,
                addTask,
                updateTask,
                saveTask,
                updateMultiTask,
                deleteTask,
                boardTitles,
                isAddOpen,
                setIsAddOpen,
                isDeleteMode,
                setIsDeleteMode,
                dragAllowed,
                setDragAllowed,
                isConfirmOpen,
                setIsConfirmOpen,
                modalPromise,
                setModalPromise,
                isEditOpen,
                setIsEditOpen,
                isDropdownActive,
                setIsDropdownActive,
                activeTaskId,
                setActiveTaskId,
                notification,
                setNotification,
                isToastOpen,
                setIsToastOpen,
                showToast,
                isRecaptchaOpen,
                setIsRecaptchaOpen,
                verifyRecaptcha,
                isRecaptchaPassed,
                setIsRecaptchaPassed,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
