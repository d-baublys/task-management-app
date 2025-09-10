import React, { useState, createContext, useContext } from "react";
import useTasks from "../hooks/useTasks";
import useAuth from "../hooks/useAuth";
import { toastHelper } from "../lib/misc-helpers";
import {
    AddTaskParams,
    AddUpdateMultiResponse,
    AddUpdateResponse,
    BoardTitlesType,
    GeneralApiResponse,
    LoginParams,
    SaveTaskParams,
    SignUpParams,
    StateSetter,
    TaskType,
    UpdateTaskParams,
} from "../lib/definitions";

export interface ContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: StateSetter<boolean>;
    user: string | null;
    setUser: StateSetter<string | null>;
    login: (param: LoginParams) => GeneralApiResponse<{ message: string; email: string }>;
    logout: () => Promise<void>;
    signUp: (params: SignUpParams) => GeneralApiResponse<{ email: string }>;
    loading: boolean;
    setLoading: StateSetter<boolean>;
    error: string;
    setError: StateSetter<string | "">;
    tasks: TaskType[];
    setTasks: StateSetter<TaskType[]>;
    getTasks: () => Promise<void>;
    addTask: (param: AddTaskParams) => AddUpdateResponse;
    updateTask: (param: UpdateTaskParams) => AddUpdateResponse;
    saveTask: (param: SaveTaskParams) => AddUpdateResponse;
    updateMultiTask: (updatedTasks: TaskType[]) => AddUpdateMultiResponse;
    deleteTask: (taskId: number) => GeneralApiResponse<{ id: number }>;
    boardTitles: BoardTitlesType;
    isAddOpen: boolean;
    setIsAddOpen: StateSetter<boolean>;
    isDeleteMode: boolean;
    setIsDeleteMode: StateSetter<boolean>;
    dragAllowed: boolean;
    setDragAllowed: StateSetter<boolean>;
    isConfirmOpen: boolean;
    setIsConfirmOpen: StateSetter<boolean>;
    modalPromise: ((value: boolean) => void) | null;
    setModalPromise: StateSetter<((value: boolean) => void) | null>;
    isEditOpen: boolean;
    setIsEditOpen: StateSetter<boolean>;
    isDropdownActive: boolean;
    setIsDropdownActive: StateSetter<boolean>;
    activeTaskId: number | null;
    setActiveTaskId: StateSetter<number | null>;
    notification: { icon: "success" | "failure"; message: string } | null;
    setNotification: StateSetter<{ icon: "success" | "failure"; message: string } | null>;
    isToastOpen: boolean;
    setIsToastOpen: StateSetter<boolean>;
    showToast: (icon: "success" | "failure", message: string) => void;
    isRecaptchaOpen: boolean;
    setIsRecaptchaOpen: StateSetter<boolean>;
    verifyRecaptcha: (key: string | null) => GeneralApiResponse<{ [key: string]: string }>;
    isRecaptchaPassed: boolean;
    setIsRecaptchaPassed: StateSetter<boolean>;
}

const AppContext = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({
    children,
    overrides,
}: {
    children: React.ReactNode;
    overrides?: Partial<ContextType>;
}) => {
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

    const showToast = toastHelper({ setNotification, setIsToastOpen });
    const { verifyRecaptcha, login, logout, signUp } = useAuth({
        isAuthenticated,
        setIsAuthenticated,
        setUser,
        setIsDropdownActive,
        setLoading,
        showToast,
    });
    const { getTasks, addTask, updateTask, saveTask, updateMultiTask, deleteTask } = useTasks(
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
                signUp,
                loading,
                setLoading,
                error,
                setError,
                tasks,
                setTasks,
                getTasks,
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
                ...overrides,
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
