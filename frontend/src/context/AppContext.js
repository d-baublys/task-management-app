import { useState, createContext } from "react";
import useTasks from "../hooks/useTasks";

const AppContext = createContext();

export const ContextProvider = ({ children }) => {
    const { tasks, setTasks, addTask, updateTask, updateMultiTask, deleteTask } = useTasks();
    const [showAddPrompt, setShowAddPrompt] = useState(false);
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [modalPromise, setModalPromise] = useState(null);
    const [draggable, setDraggable] = useState(false);
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
                updateMultiTask,
                deleteTask,
                boardTitles,
                showAddPrompt,
                setShowAddPrompt,
                isDeleteMode,
                draggable,
                setDraggable,
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
