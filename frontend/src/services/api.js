import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/`,
});

export const getApiTasks = () => api.get("tasks/");
export const createApiTask = (status) => api.post("tasks/", { status: status });
export const moveApiTask = (taskId, newStatus) => api.patch(`tasks/${taskId}/`, { status: newStatus });
export const reorderApiTasks = (tasks) => api.patch("reorder/", { tasks });
export const deleteApiTask = (taskId) => api.delete(`tasks/${taskId}/`);
