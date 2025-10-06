import React, { useState, createContext, useContext } from "react";
import useTasks from "../hooks/useTasks";
import {
    AddTaskParams,
    AddUpdateMultiResponse,
    AddUpdateResponse,
    GeneralApiResponse,
    SaveTaskParams,
    StateSetter,
    TaskType,
    UpdateTaskParams,
} from "../lib/definitions";

interface TasksContextType {
    tasks: TaskType[];
    setTasks: StateSetter<TaskType[]>;
    taskActions: {
        getTasks: () => Promise<void>;
        addTask: (param: AddTaskParams) => AddUpdateResponse;
        updateTask: (param: UpdateTaskParams) => AddUpdateResponse;
        saveTask: (param: SaveTaskParams) => AddUpdateResponse;
        updateMultiTask: (updatedTasks: TaskType[]) => AddUpdateMultiResponse;
        deleteTask: (taskId: number) => GeneralApiResponse<{ id: number }>;
    };
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({
    children,
    overrides,
}: {
    children: React.ReactNode;
    overrides?: Partial<TasksContextType>;
}) => {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const taskActions = useTasks(setTasks);

    return (
        <TasksContext.Provider
            value={{
                tasks,
                setTasks,
                taskActions,
                ...overrides,
            }}
        >
            {children}
        </TasksContext.Provider>
    );
};

const useTasksContext = () => {
    const context = useContext(TasksContext);

    if (!context) {
        throw new Error("No context in tasks provider.");
    }

    return context;
};

export default useTasksContext;
