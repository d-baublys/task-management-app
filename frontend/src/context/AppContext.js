import { useState, createContext } from "react";
import useTasks from "../hooks/useTasks";

const AppContext = createContext();

export const ContextProvider = ({ children }) => {
    const { tasks, setTasks, addTask, updateTask, saveTask, updateMultiTask, deleteTask } = useTasks();
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [modalPromise, setModalPromise] = useState(null);
    const [dragAllowed, setDragAllowed] = useState(false);
    const [activeTaskId, setActiveTaskId] = useState(null);

    const boardTitles = {
        "To Do": "to_do",
        "In Progress": "in_progress",
        "Done": "done",
    };

    return (
        <AppContext.Provider
            value={{
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
                dragAllowed,
                setDragAllowed,
                isConfirmOpen,
                setIsConfirmOpen,
                setIsDeleteMode,
                modalPromise,
                setModalPromise,
                isEditOpen,
                setIsEditOpen,
                activeTaskId,
                setActiveTaskId,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
