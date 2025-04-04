import { AddTaskParams, TaskPayloadType } from "../types";

export const getApiTasks = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: [
                    {
                        id: 3,
                        status: "to_do",
                        description: "First mocked task",
                        due_date: "2025-02-01",
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
                        due_date: "2025-02-01",
                        position: 2,
                        user: 1,
                    },
                ],
            });
        }, 500);
    });
};

export const createApiTask = ({ status, description, dueDate }: AddTaskParams) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: {
                    id: Math.floor(Math.random() * 100),
                    status,
                    description,
                    due_date: dueDate,
                    position: Math.floor(Math.random() * 100),
                    user: 1,
                },
            });
        }, 500);
    });
};

export const updateApiTask = (taskId: number, data: TaskPayloadType) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: {
                    id: taskId,
                    ...data,
                },
            });
        }, 500);
    });
};

export const deleteApiTask = (taskId: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: { id: taskId },
            });
        }, 500);
    });
};

export const getApiTasksFail = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("Mocked task fetching error"));
        }, 500);
    });
};

export const createApiTaskFail = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("Mocked task creation error"));
        }, 500);
    });
};

export const updateApiTaskFail = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("Mocked task update error"));
        }, 500);
    });
};

export const deleteApiTaskFail = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("Mocked task deletion error"));
        }, 500);
    });
};

export const getTokenApi = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: {
                    username: "mock_username",
                    access_token: "MOCK_ACCESS_TOKEN",
                },
            });
        }, 500);
    });
};

export const loginApi = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: {
                    message: "Log in successful",
                    username: "mock_username",
                },
            });
        }, 500);
    });
};

export const logoutApi = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: {
                    message: "Log out successful",
                },
            });
        }, 500);
    });
};

export const getTokenApiFail = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("Mocked authentication error"));
        }, 500);
    });
};

export const loginApiAuthFail = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject({
                response: {
                    status: 401,
                    data: {
                        error: "Incorrect username or password. Please check your credentials and try again.",
                    },
                },
            });
        }, 500);
    });
};

export const loginApiServerFail = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject({
                response: {
                    status: 500,
                },
            });
        }, 500);
    });
};

export const logoutApiFail = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("Mocked logout error"));
        }, 500);
    });
};
