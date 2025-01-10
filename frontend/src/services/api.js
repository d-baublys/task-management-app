import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
});

export const getApiBoards = () => api.get("boards/");
export const getApiTasks = () => api.get("tasks/");
export const createApiTask = (board) => api.post("tasks/", { board: board });
export const moveApiTask = (id, newBoard) => api.put(`tasks/${id}`, { board: newBoard });
export const deleteApiTask = (id) => api.delete(`tasks/${id}/`);
