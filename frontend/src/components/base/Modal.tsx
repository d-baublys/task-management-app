import React, { useEffect, useState } from "react";
import ModalButton from "./ModalButton";
import { StateSetter, TaskType } from "../../lib/definitions";
import useAppContext from "../../context/AppContext";

interface Props {
    modalId: string;
    modalAction: string;
    modalState: boolean;
    modalSetter: StateSetter<boolean>;
    currentTask?: TaskType;
}

const Modal = ({ modalId, modalAction, modalState, modalSetter, currentTask }: Props) => {
    const { boardTitles, setActiveTaskId, saveTask, showToast } = useAppContext();

    const [status, setStatus] = useState(currentTask?.status || "");
    const [description, setDescription] = useState(currentTask?.description || "");
    const [dueDate, setDueDate] = useState(currentTask?.due_date || "");

    useEffect(() => {
        modalState
            ? (document.body.style.overflow = "hidden")
            : document.body.removeAttribute("style");

        !currentTask && modalState && setDueDate(new Date().toISOString().split("T")[0]);

        return () => {
            document.body.removeAttribute("style");
        };
    }, [modalState]);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!status || !description || !dueDate) {
            showToast("failure", "Please fill in all fields");
            return;
        }

        await saveTask({ task: currentTask, status, description, dueDate });
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
            className="flex flex-col justify-center my-2 items-center w-modal-spacing-sm md:w-modal-spacing h-modal-spacing-sm md:h-modal-spacing rounded-2xl bg-gray-100 drop-shadow-modal"
        >
            <div className="w-[85%] sm:w-[80%] md:w-3/4 h-[85%] md:h-4/5">
                <form
                    className="flex flex-col justify-between items-center h-full"
                    onSubmit={handleSave}
                >
                    <fieldset className="w-full">
                        <legend className="mb-1 font-semibold">Task Status</legend>
                        <select
                            aria-label="Task status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full h-8 px-2 rounded-md bg-gray-300"
                        >
                            <option value="" disabled hidden>
                                Select status...
                            </option>
                            {Object.keys(boardTitles).map((key: string) => (
                                <option key={boardTitles[key]} value={boardTitles[key]}>
                                    {key}
                                </option>
                            ))}
                        </select>
                    </fieldset>
                    <fieldset className="w-full">
                        <legend className="mb-1 font-semibold">Task Description</legend>
                        <textarea
                            aria-label="Task description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-2 rounded-md bg-gray-300 resize-none"
                            rows={5}
                            placeholder="Enter description..."
                            maxLength={Number(process.env.REACT_APP_DESC_CHAR_LIMIT)}
                        />
                    </fieldset>
                    <fieldset className="w-full">
                        <legend className="mb-1 font-semibold">Due By</legend>
                        <input
                            aria-label="Task due date"
                            type="date"
                            value={dueDate}
                            className="w-full h-8 px-2 rounded-md bg-gray-300"
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </fieldset>
                    <div className="flex justify-between w-full mt-5">
                        <ModalButton type={"submit"}>{modalAction}</ModalButton>
                        <ModalButton onClick={handleCancel}>Cancel</ModalButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
