import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/`,
});

export const getApiTasks = () => api.get("tasks/");
export const createApiTask = (status, description, dueDate) =>
    api.post("tasks/", { status: status, description: description, due_date: dueDate });
export const updateApiTask = (taskId, data) => api.patch(`tasks/${taskId}/`, data);
export const deleteApiTask = (taskId) => api.delete(`tasks/${taskId}/`);

export const loginApi = (username, password, rememberMe) =>
    api.post("login/", { username, password, remember_me: rememberMe }, { withCredentials: true });
export const logoutApi = () => api.post("logout/", {}, { withCredentials: true });
export const checkApiAuth = () => api.get("check-auth/", { withCredentials: true });

export const toggleTokenHeader = (accessToken) => {
    accessToken
        ? (api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`)
        : delete api.defaults.headers.common["Authorization"];
};
