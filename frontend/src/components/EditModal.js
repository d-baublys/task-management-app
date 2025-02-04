import { useContext, useState } from "react";
import AppContext from "../context/AppContext";

const EditModal = () => {
    const {
        boardTitles,
        setIsEditOpen,
        updateTask,
        activeTaskId,
        setActiveTaskId,
        tasks,
        setTasks,
    } = useContext(AppContext);

    const [currentTask] = tasks.filter((task) => task.id === activeTaskId);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!status || !description || !dueDate) return;

        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === currentTask.id
                    ? { ...task, status, description, due_date: dueDate }
                    : task
            )
        );

        updateTask(currentTask, null, status, description, dueDate);
        // setStatus("");
        // setDescription("");
        // setDueDate(null);
        setActiveTaskId(null);
        setIsEditOpen((prev) => !prev);
    };

    const handleCancel = () => {
        setActiveTaskId(null);
        setIsEditOpen((prev) => !prev);
        return;
    };

    const [status, setStatus] = useState(currentTask.status);
    const [description, setDescription] = useState(currentTask.description);
    const [dueDate, setDueDate] = useState(currentTask.due_date);

    return (
        <div
            className="flex flex-col justify-center items-center rounded-2xl bg-gray-500"
            style={{ width: "var(--add-menu-width)", height: "var(--add-menu-height)" }}
        >
            <div className="w-3/4 h-2/3">
                <form
                    className="flex flex-col justify-between items-center h-full"
                    onSubmit={handleSubmit}
                >
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full h-8 px-2 rounded-md"
                    >
                        <option value="" disabled hidden>
                            Select task status...
                        </option>
                        {Object.keys(boardTitles).map((key) => (
                            <option key={key} value={boardTitles[key]}>
                                {key}
                            </option>
                        ))}
                    </select>
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full h-8 px-2 rounded-md"
                        placeholder="Enter task description..."
                    />
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                    <button type="submit" className="rounded-xl w-1/3 h-8 bg-white">
                        Save Changes
                    </button>
                    <button
                        type="reset"
                        onClick={handleCancel}
                        className="rounded-xl w-1/3 h-8 bg-white"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
