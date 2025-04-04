import { AxiosError, AxiosResponse } from "axios";
import {
    AddTaskParams,
    TaskPayloadType,
    TaskType,
    AddUpdateResponse,
    GeneralApiResponse,
    LoginParams,
} from "../types";

const createAxiosResponse = <T>(data: T, status = 200): AxiosResponse<T> => {
    return {
        data,
        status,
        statusText: "OK",
        headers: {},
        config: {} as any,
        request: {},
    };
};

const createAxiosError = <T = { detail: string }>(
    data: T,
    status: number,
    message: string = ""
): AxiosError<T> => {
    return new AxiosError(message, undefined, undefined, undefined, {
        status,
        data,
        headers: {},
        config: {} as any,
        statusText: "",
    });
};

export const getApiTasks = (): Promise<AxiosResponse<TaskType[]>> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                createAxiosResponse([
                    {
                        id: 3,
                        status: "to_do",
                        description: "First mocked task",
                        due_date: "2025-02-03",
                        position: 0,
                        user: 1,
                    },
                    {
                        id: 1,
                        status: "in_progress",
                        description: "Second mocked task",
                        due_date: "2025-02-01",
                        position: 1,
                        user: 1,
                    },
                    {
                        id: 5,
                        status: "done",
                        description: "Third mocked task",
                        due_date: "2025-02-05",
                        position: 2,
                        user: 1,
                    },
                ])
            );
        }, 500);
    });
};

export const createApiTask = ({
    status,
    description,
    dueDate,
}: AddTaskParams): AddUpdateResponse => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                createAxiosResponse({
                    id: Math.floor(Math.random() * 100),
                    status,
                    description,
                    due_date: dueDate,
                    position: Math.floor(Math.random() * 100),
                    user: 1,
                })
            );
        }, 500);
    });
};

export const updateApiTask = (taskId: number, data: TaskPayloadType): AddUpdateResponse => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                createAxiosResponse({
                    id: taskId,
                    ...data,
                })
            );
        }, 500);
    });
};

export const deleteApiTask = (taskId: number): GeneralApiResponse<{ id: number }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(createAxiosResponse({ id: taskId }));
        }, 500);
    });
};

export const getApiTasksFail = (): Promise<AxiosResponse<TaskType[]>> => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(
                createAxiosError(
                    {
                        detail: "Error fetching task data!",
                    },
                    500
                )
            );
        }, 500);
    });
};

export const createApiTaskFail = ({
    status,
    description,
    dueDate,
}: AddTaskParams): AddUpdateResponse => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(
                createAxiosError(
                    {
                        detail: "Error adding task!",
                    },
                    500
                )
            );
        }, 500);
    });
};

export const updateApiTaskFail = (taskId: number, data: TaskPayloadType): AddUpdateResponse => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(
                createAxiosError(
                    {
                        detail: "Error updating task!",
                    },
                    500
                )
            );
        }, 500);
    });
};

export const deleteApiTaskFail = (taskId: number): GeneralApiResponse<any> => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(
                createAxiosError(
                    {
                        detail: "Error deleting task!",
                    },
                    500
                )
            );
        }, 500);
    });
};

export const getTokenApi = (): GeneralApiResponse<{
    username: string;
    access_token: string;
}> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                createAxiosResponse({
                    username: "mock_username",
                    access_token: "MOCK_ACCESS_TOKEN",
                })
            );
        }, 500);
    });
};

export const verifyRecaptchaApi = (
    key: string | null
): GeneralApiResponse<{
    message: string;
}> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                createAxiosResponse({
                    message: "Verification successful",
                })
            );
        }, 500);
    });
};

export const loginApi = ({
    username,
    password,
    rememberMe,
}: LoginParams): GeneralApiResponse<{ message: string; username: string }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                createAxiosResponse({
                    message: "Log in successful...",
                    username: "mock_username",
                })
            );
        }, 500);
    });
};

export const logoutApi = (): GeneralApiResponse<{ message: string }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                createAxiosResponse({
                    message: "Log out successful",
                })
            );
        }, 500);
    });
};

export const getTokenApiFail = (): GeneralApiResponse<{
    username: string;
    access_token: string;
}> => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(
                createAxiosError(
                    {
                        detail: "No refresh token. Check you have third-party cookies enabled in your browser.",
                    },
                    401
                )
            );
        }, 500);
    });
};

export const loginApiAuthFail = ({
    username,
    password,
    rememberMe,
}: LoginParams): GeneralApiResponse<{ message: string; username: string }> => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(
                createAxiosError(
                    {
                        detail: "Incorrect username or password. Please check your credentials and try again.",
                    },
                    401
                )
            );
        }, 500);
    });
};

export const loginApiServerFail = ({
    username,
    password,
    rememberMe,
}: LoginParams): GeneralApiResponse<{ message: string; username: string }> => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(
                createAxiosError(
                    {
                        detail: "Server error.",
                    },
                    500
                )
            );
        }, 500);
    });
};

export const logoutApiFail = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(
                createAxiosError(
                    {
                        detail: "Server error.",
                    },
                    500
                )
            );
        }, 500);
    });
};
