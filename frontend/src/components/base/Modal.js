import { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import ModalButton from "./ModalButton";

const Modal = ({ modalId, modalAction, taskFunc, modalSetter, currentTask }) => {
    const { boardTitles, setActiveTaskId, setTasks } = useContext(AppContext);

    const [status, setStatus] = useState(currentTask ? currentTask.status : "");
    const [description, setDescription] = useState(currentTask ? currentTask.description : "");
    const [dueDate, setDueDate] = useState(currentTask ? currentTask.due_date : "");

    const handleAction = (e) => {
        e.preventDefault();
        if (!status || !description || !dueDate) return;

        if (modalAction === "Add Task") {
            taskFunc(boardTitles[status], description, dueDate);
        } else {
            taskFunc(currentTask, null, status, description, dueDate);
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === currentTask.id
                        ? { ...task, status, description, due_date: dueDate }
                        : task
                )
            );
        }

        setStatus("");
        setDescription("");
        setDueDate(null);
        setActiveTaskId(null);
        modalSetter(false);
    };

    const handleCancel = () => {
        setActiveTaskId(null);
        modalSetter(false);
        return;
    };

    return (
        <div
            id={modalId}
            className="flex flex-col justify-center items-center rounded-2xl bg-gray-500"
            style={{
                width: "var(--modal-width)",
                height: "var(--modal-height)",
            }}
        >
            <div className="w-3/4 h-2/3">
                <form
                    className="flex flex-col justify-between items-center h-full"
                    onSubmit={handleAction}
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
                            <option key={boardTitles[key]} value={boardTitles[key]}>
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
                        className="h-8 rounded-md"
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                    <div className="flex gap-2">
                        <ModalButton type={"submit"}>{modalAction}</ModalButton>
                        <ModalButton type={"reset"} onClick={handleCancel}>
                            Cancel
                        </ModalButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
