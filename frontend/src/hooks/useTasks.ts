import { getApiTasks, createApiTask, updateApiTask, deleteApiTask } from "../lib/api-services";
import {
    AddTaskParams,
    SaveTaskParams,
    StateSetter,
    TaskType,
    UpdateTaskParams,
} from "../lib/definitions";

const useTasks = (
    setTasks: StateSetter<TaskType[]>,
    showToast: (icon: "success" | "failure", message: string) => void
) => {
    const getTasks = async () => {
        try {
            const response = await getApiTasks();
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching task data: ", error);
            showToast("failure", "Error fetching task data!");
        }
    };

    const addTask = async ({ status, description, dueDate }: AddTaskParams) => {
        try {
            const response = await createApiTask({ status, description, dueDate });
            setTasks((prevTasks) => [...prevTasks, response!.data]);
            showToast("success", "Task added!");

            return response;
        } catch (error) {
            console.error("Error saving new task: ", error);
            showToast("failure", "Error adding task!");
        }
    };

    const updateTask = async ({ task, status, description, dueDate, index }: UpdateTaskParams) => {
        try {
            const response = await updateApiTask(task.id, {
                status: status || task.status,
                description: description || task.description,
                due_date: dueDate || task.due_date,
                position: index !== undefined ? index : task.position,
            });

            return response;
        } catch (error) {
            console.error("Error updating task: ", error);
            showToast("failure", "Error updating task!");
            throw error;
        }
    };

    const saveTask = async ({
        task: currentTask,
        status,
        description,
        dueDate,
    }: SaveTaskParams) => {
        if (currentTask) {
            try {
                const response = await updateTask({
                    task: currentTask,
                    status,
                    description,
                    dueDate,
                });
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === currentTask.id
                            ? { ...task, status, description, due_date: dueDate }
                            : task
                    )
                );
                showToast("success", "Task saved!");

                return response;
            } catch (error) {
                console.error("Error updating task from edit mode: ", error);
            }
        } else {
            return await addTask({ status, description, dueDate });
        }
    };

    const updateMultiTask = async (updatedTasks: TaskType[]) => {
        try {
            const response = await Promise.all(
                updatedTasks.map((task, index) => updateTask({ task, index }))
            );
            return response;
        } catch (error) {
            console.error("Error updating tasks: ", error);
        }
    };

    const deleteTask = async (taskId: number) => {
        try {
            const response = await deleteApiTask(taskId);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
            showToast("success", "Task deleted!");

            return response;
        } catch (error) {
            console.error("Error deleting task: ", error);
            showToast("failure", "Error deleting task!");
        }
    };

    return { getTasks, addTask, updateTask, saveTask, updateMultiTask, deleteTask };
};

export default useTasks;
