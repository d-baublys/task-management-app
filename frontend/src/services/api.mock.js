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
