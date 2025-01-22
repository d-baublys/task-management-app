import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/`,
});

export const getApiTasks = () => api.get("tasks/");
export const createApiTask = (status) => api.post("tasks/", { status: status });
export const updateApiTask = (taskId, data) => api.patch(`tasks/${taskId}/`, data);
export const deleteApiTask = (taskId) => api.delete(`tasks/${taskId}/`);
