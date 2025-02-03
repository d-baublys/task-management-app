import { useState, useEffect } from "react";
import { getApiTasks, createApiTask, updateApiTask, deleteApiTask } from "../services/api";

const useTasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getApiTasks()
            .then((response) => setTasks(response.data))
            .catch((error) => console.log(error.message));
    }, []);

    const addTask = (status, description, dueDate) => {
        createApiTask(status, description, dueDate)
            .then((response) => setTasks((prevTasks) => [...prevTasks, response.data]))
            .catch((error) => console.log(error.message));
    };

    const updateTask = (task, index, status, description, dueDate) => {
        updateApiTask(task.id, {
            status: status ? status : task.status,
            description: description ? description : task.description,
            due_date: dueDate ? dueDate : task.due_date,
            position: index ? index : task.position,
        }).catch((error) => console.log(error.message));
    };

    const updateMultiTask = (updatedTasks) => {
        Promise.all(updatedTasks.map((task, index) => updateTask(task, index))).catch((error) =>
            console.log(error.message)
        );
    };

    const deleteTask = (taskId) => {
        deleteApiTask(taskId)
            .then(() => setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId)))
            .catch((error) => console.log(error.message));
    };

    return { tasks, setTasks, addTask, updateTask, updateMultiTask, deleteTask };
};

export default useTasks;
