import React, { useState, createContext, useContext } from "react";
import useTasks from "../hooks/useTasks";
import useAuth from "../hooks/useAuth";
import { toastHelper } from "../helpers/miscHelpers";
import {
    AddTaskParams,
    AddUpdateMultiResponse,
    AddUpdateResponse,
    BoardTitlesType,
    GenericResponse,
    SaveTaskParams,
    TaskType,
    UpdateTaskParams,
} from "../types";

interface ContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    user: string | null;
    setUser: React.Dispatch<React.SetStateAction<string | null>>;
    login: (username: string, password: string, rememberMe: boolean) => GenericResponse;
    logout: () => Promise<void>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    error: string;
    setError: React.Dispatch<React.SetStateAction<string | "">>;
    tasks: TaskType[];
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
    addTask: (param: AddTaskParams) => AddUpdateResponse;
    updateTask: (param: UpdateTaskParams) => AddUpdateResponse;
    saveTask: (param: SaveTaskParams) => AddUpdateResponse;
    updateMultiTask: (updatedTasks: TaskType[]) => AddUpdateMultiResponse;
    deleteTask: (taskId: number) => GenericResponse;
    boardTitles: BoardTitlesType;
    isAddOpen: boolean;
    setIsAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isDeleteMode: boolean;
    setIsDeleteMode: React.Dispatch<React.SetStateAction<boolean>>;
    dragAllowed: boolean;
    setDragAllowed: React.Dispatch<React.SetStateAction<boolean>>;
    isConfirmOpen: boolean;
    setIsConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalPromise: ((value: boolean) => void) | null;
    setModalPromise: React.Dispatch<React.SetStateAction<((value: boolean) => void) | null>>;
    isEditOpen: boolean;
    setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isDropdownActive: boolean;
    setIsDropdownActive: React.Dispatch<React.SetStateAction<boolean>>;
    activeTaskId: number | null;
    setActiveTaskId: React.Dispatch<React.SetStateAction<number | null>>;
    notification: { icon: "success" | "failure"; message: string } | null;
    setNotification: React.Dispatch<
        React.SetStateAction<{ icon: "success" | "failure"; message: string } | null>
    >;
    isToastOpen: boolean;
    setIsToastOpen: React.Dispatch<React.SetStateAction<boolean>>;
    showToast: (icon: "success" | "failure", message: string) => void;
    isRecaptchaOpen: boolean;
    setIsRecaptchaOpen: React.Dispatch<React.SetStateAction<boolean>>;
    verifyRecaptcha: (key: string | null) => GenericResponse;
    isRecaptchaPassed: boolean;
    setIsRecaptchaPassed: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDropdownActive, setIsDropdownActive] = useState(false);
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [modalPromise, setModalPromise] = useState<((value: boolean) => void) | null>(null);
    const [dragAllowed, setDragAllowed] = useState(false);
    const [activeTaskId, setActiveTaskId] = useState<number | null>(null);
    const [notification, setNotification] = useState<{
        icon: "success" | "failure";
        message: string;
    } | null>(null);
    const [isRecaptchaOpen, setIsRecaptchaOpen] = useState(false);
    const [isRecaptchaPassed, setIsRecaptchaPassed] = useState(false);

    const showToast = toastHelper(setNotification, setIsToastOpen);
    const { verifyRecaptcha, login, logout } = useAuth(
        isAuthenticated,
        setIsAuthenticated,
        setUser,
        setIsDropdownActive,
        setLoading,
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
        Done: "done",
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

const useAppContext = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("No context in provider.");
    }

    return context;
};

export default useAppContext;
