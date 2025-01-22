import { useState, useEffect } from "react";
import { getApiTasks, createApiTask, updateApiTask, deleteApiTask } from "../services/api";

const useTasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getApiTasks()
            .then((response) => setTasks(response.data))
            .catch((error) => console.log(error.message));
    }, []);

    const addTask = (status) => {
        createApiTask(status)
            .then((response) => setTasks((prevTasks) => [...prevTasks, response.data]))
            .catch((error) => console.log(error.message));
    };

    const moveTask = (taskId, newStatus) => {
        updateApiTask(taskId, { status: newStatus })
            .then(() => {
                setTasks((prev) =>
                    prev.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
                );
            })
            .catch((error) => console.log(error.message));
    };

    const reorderTasks = (updatedTasks) => {
        Promise.all(updatedTasks.map((task, index) => updateApiTask(task.id, { position: index })))
            .then(() =>
                setTasks(() => updatedTasks.map((task, index) => ({ ...task, position: index })))
            )
            .catch((error) => console.log(error.message));
    };

    const deleteTask = (taskId) => {
        deleteApiTask(taskId)
            .then(() => setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId)))
            .catch((error) => console.log(error.message));
    };

    return { tasks, setTasks, addTask, moveTask, reorderTasks, deleteTask };
};

export default useTasks;
