import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import ModalButton from "./ModalButton";

const Modal = ({ modalId, modalAction, modalState, modalSetter, currentTask }) => {
    const { boardTitles, setActiveTaskId, saveTask } = useContext(AppContext);

    const [status, setStatus] = useState(currentTask?.status || "");
    const [description, setDescription] = useState(currentTask?.description || "");
    const [dueDate, setDueDate] = useState(currentTask?.due_date || "");

    useEffect(() => {
        modalState
            ? (document.body.style.overflow = "hidden")
            : document.body.removeAttribute("style");

        return () => {
            document.body.removeAttribute("style");
        };
    }, [modalState]);

    const handleSave = (e) => {
        e.preventDefault();
        if (!status || !description || !dueDate) return;

        saveTask({ currentTask, status, description, dueDate });
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
            className="flex flex-col justify-center items-center rounded-2xl bg-gray-500 drop-shadow-[--modal-drop-shadow]"
            style={{
                width: "var(--modal-width)",
                height: "var(--modal-height)",
            }}
        >
            <div className="w-3/4 h-3/4">
                <form
                    className="flex flex-col justify-between items-center h-full"
                    onSubmit={handleSave}
                >
                    <fieldset className="w-full pb-2 pl-2 pr-2 border-2 rounded-xl">
                        <legend className="text-white mx-1 px-1">Task Status</legend>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full h-8 px-2 rounded-md"
                        >
                            <option value="" disabled hidden>
                                Select status...
                            </option>
                            {Object.keys(boardTitles).map((key) => (
                                <option key={boardTitles[key]} value={boardTitles[key]}>
                                    {key}
                                </option>
                            ))}
                        </select>
                    </fieldset>
                    <fieldset className="w-full pb-2 pl-2 pr-2 border-2 rounded-xl">
                        <legend className="text-white mx-1 px-1">Task Description</legend>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-2 rounded-md resize-none"
                            rows={5}
                            placeholder="Enter description..."
                            maxLength={255}
                        />
                    </fieldset>
                    <fieldset className="pb-2 pl-2 pr-2 border-2 rounded-xl">
                        <legend className="text-white mx-1 px-1">Due By</legend>
                        <input
                            type="date"
                            value={dueDate}
                            className="h-8 px-1 rounded-md"
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </fieldset>
                    <div className="flex gap-8 mt-8">
                        <ModalButton type={"submit"}>{modalAction}</ModalButton>
                        <ModalButton onClick={handleCancel}>Cancel</ModalButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
