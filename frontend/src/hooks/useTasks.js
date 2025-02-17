import { useState, useEffect } from "react";
import { getApiTasks, createApiTask, updateApiTask, deleteApiTask } from "../services/api";

const useTasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const response = await getApiTasks();
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching task data: ", error);
            }
        };
        getTasks();
    }, []);

    const addTask = async ({ status, description, dueDate }) => {
        try {
            const response = await createApiTask(status, description, dueDate);
            setTasks((prevTasks) => [...prevTasks, response.data]);

            return response;
        } catch (error) {
            console.error("Error saving new task: ", error);
        }
    };

    const updateTask = async ({ task, status, description, dueDate, index }) => {
        try {
            const response = await updateApiTask(task.id, {
                status: status || task.status,
                description: description || task.description,
                due_date: dueDate || task.due_date,
                position: index !== undefined ? index : task.position,
            });

            return response;
        } catch (error) {
            console.error("Error updating task: ", error);
        }
    };

    const saveTask = async ({ currentTask, status, description, dueDate }) => {
        if (currentTask) {
            const response = await updateTask({ task: currentTask, status, description, dueDate });
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === currentTask.id
                        ? { ...task, status, description, due_date: dueDate }
                        : task
                )
            );

            return response;
        } else {
            return await addTask({ status, description, dueDate });
        }
    };

    const updateMultiTask = async (updatedTasks) => {
        try {
            await Promise.all(updatedTasks.map((task, index) => updateTask({ task, index })));
        } catch (error) {
            console.error("Error updating tasks: ", error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            const response = await deleteApiTask(taskId);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

            return response;
        } catch (error) {
            console.error("Error deleting task: ", error);
        }
    };

    return { tasks, setTasks, addTask, updateTask, saveTask, updateMultiTask, deleteTask };
};

export default useTasks;
