import { useState, useEffect } from "react";
import { getApiTasks, moveApiTask } from "../services/api";

const useTasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getApiTasks()
            .then((response) => setTasks(response.data))
            .catch((error) => console.log(error.data));
    }, []);

    const moveTask = (taskId, newStatus) => {
        moveApiTask(taskId, newStatus).then((response) => {
            console.log(taskId, newStatus);
            setTasks((prev) =>
                prev.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
            );
        });
    };

    console.log(tasks)

    return { tasks, moveTask };
};

export default useTasks;
