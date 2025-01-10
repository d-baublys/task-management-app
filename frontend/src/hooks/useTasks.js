import { useState, useEffect } from "react";
import { getApiBoards, getApiTasks, moveApiTask } from "../services/api";

const useTasks = () => {
    const [boards, setBoards] = useState();
    const [tasks, setTasks] = useState();

    useEffect(() => {
        getApiBoards()
            .then((response) => setBoards(response.data))
            .catch((error) => console.log(error.data));
    }, []);

    return { boards, tasks };
};

export default useTasks;
