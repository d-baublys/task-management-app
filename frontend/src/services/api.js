import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/`,
});

export const getApiTasks = () => api.get("tasks/");
export const createApiTask = (status, description) => api.post("tasks/", { status: status, description: description });
export const updateApiTask = (taskId, data) => api.patch(`tasks/${taskId}/`, data);
export const deleteApiTask = (taskId) => api.delete(`tasks/${taskId}/`);
