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

    const updateTasks = (updatedTasks) => {
        Promise.all(
            updatedTasks.map((task, index) =>
                updateApiTask(task.id, { status: task.status, position: index })
            )
        )
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

    return { tasks, setTasks, addTask, updateTasks, deleteTask };
};

export default useTasks;
