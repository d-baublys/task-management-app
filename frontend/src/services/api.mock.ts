export const getApiTasks = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: [
                    {
                        id: 0,
                        status: "to_do",
                        description: "A mocked task",
                        due_date: "2025-02-01",
                    },
                ],
            });
        }, 500);
    });
};

export const createApiTask = (status, description, dueDate) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: {
                    id: Math.floor(Math.random() * 100),
                    status,
                    description,
                    due_date: dueDate,
                },
            });
        }, 500);
    });
};

export const updateApiTask = (taskId, data) => {
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

export const deleteApiTask = (taskId) => {
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
                    username: "mock_user",
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
                    username: "mock_user",
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
