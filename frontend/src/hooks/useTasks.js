import { useState, useEffect } from "react";
import { getApiTasks, createApiTask, moveApiTask, deleteApiTask } from "../services/api";

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
        moveApiTask(taskId, newStatus)
            .then(() => {
                setTasks((prev) =>
                    prev.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
                );
            })
            .catch((error) => console.log(error.message));
    };

    const deleteTask = (taskId) => {
        deleteApiTask(taskId)
            .then(() => setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId)))
            .catch((error) => console.log(error.message));
    };

    return { tasks, setTasks, addTask, moveTask, deleteTask };
};

export default useTasks;
