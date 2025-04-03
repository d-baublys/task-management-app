import axios from "axios";
import { TaskPayloadType } from "../types";

const api = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/`,
});

export const getApiTasks = () => api.get("tasks/");
export const createApiTask = (status: string, description: string, dueDate: string) =>
    api.post("tasks/", { status: status, description: description, due_date: dueDate });
export const updateApiTask = (taskId: number, data: TaskPayloadType) =>
    api.patch(`tasks/${taskId}/`, data);
export const deleteApiTask = (taskId: number) => api.delete(`tasks/${taskId}/`);

export const verifyRecaptchaApi = (key: string | null) =>
    api.post("verify-recaptcha/", { "g-recaptcha-response": key }, { withCredentials: true });
export const loginApi = (username: string, password: string, rememberMe: boolean) =>
    api.post("login/", { username, password, remember_me: rememberMe }, { withCredentials: true });
export const logoutApi = () => api.post("logout/", {}, { withCredentials: true });
export const getTokenApi = () => api.post("token/", {}, { withCredentials: true });

export const toggleTokenHeader = (accessToken?: string) => {
    accessToken
        ? (api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`)
        : delete api.defaults.headers.common["Authorization"];
};
