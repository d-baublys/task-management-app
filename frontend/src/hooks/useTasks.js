import { useState, useEffect } from "react";
import { getApiTasks, createApiTask, updateApiTask, deleteApiTask } from "../services/api";

const useTasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getApiTasks()
            .then((response) => setTasks(response.data))
            .catch((error) => console.log(error.message));
    }, []);

    const addTask = ({ status, description, dueDate }) => {
        createApiTask(status, description, dueDate)
            .then((response) => setTasks((prevTasks) => [...prevTasks, response.data]))
            .catch((error) => console.log(error.message));
    };

    const updateTask = ({ task, status, description, dueDate, index }) =>
        updateApiTask(task.id, {
            status: status || task.status,
            description: description || task.description,
            due_date: dueDate || task.due_date,
            position: index !== undefined ? index : task.position,
        }).catch((error) => console.log(error.message));

    const saveTask = ({ currentTask, status, description, dueDate }) => {
        if (currentTask) {
            updateTask({ task: currentTask, status, description, dueDate }).then(() =>
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === currentTask.id
                            ? { ...task, status, description, due_date: dueDate }
                            : task
                    )
                )
            );
        } else {
            addTask({ status, description, dueDate });
        }
    };

    const updateMultiTask = (updatedTasks) => {
        updatedTasks.map((task, index) => updateTask({ task, index }));
    };

    const deleteTask = (taskId) => {
        deleteApiTask(taskId)
            .then(() => setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId)))
            .catch((error) => console.log(error.message));
    };

    return { tasks, setTasks, addTask, updateTask, saveTask, updateMultiTask, deleteTask };
};

export default useTasks;
