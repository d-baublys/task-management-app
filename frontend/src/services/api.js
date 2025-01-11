import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
});

export const getApiTasks = () => api.get("tasks/");
export const createApiTask = (status) => api.post("tasks/", { status: status });
export const moveApiTask = (taskId, newStatus) => api.patch(`tasks/${taskId}/`, { status: newStatus });
export const deleteApiTask = (taskId) => api.delete(`tasks/${taskId}/`);
