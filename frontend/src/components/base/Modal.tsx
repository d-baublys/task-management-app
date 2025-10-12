import React, { useEffect, useState } from "react";
import ModalButton from "./ModalButton";
import { boardsData, StateSetter, TaskType } from "../../lib/definitions";
import DarkBackdrop from "./DarkBackdrop";
import useUiContext from "../../context/UiContext";
import useTasksContext from "../../context/TasksContext";

export interface BaseModalProps {
    modalState: boolean;
    modalSetter: StateSetter<boolean>;
}

interface Props extends BaseModalProps {
    variant: "add" | "edit";
    currentTask?: TaskType;
}

const Modal = ({ variant, modalState, modalSetter, currentTask }: Props) => {
    const { activeTaskId, setActiveTaskId, showToast } = useUiContext();
    const { taskActions } = useTasksContext();
    const { saveTask } = taskActions;

    const [status, setStatus] = useState(currentTask?.status || "");
    const [description, setDescription] = useState(currentTask?.description || "");
    const [dueDate, setDueDate] = useState(currentTask?.due_date || "");

    const elementId = variant === "add" ? "add-modal" : "edit-modal";

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
    };

    if (currentTask && !activeTaskId) return;

    return (
        <DarkBackdrop handleClick={handleCancel} foregroundElementId={elementId}>
            <div
                id={elementId}
                className="flex flex-col justify-center my-2 items-center w-modal-spacing-sm md:w-modal-spacing h-modal-spacing-sm md:h-modal-spacing rounded-2xl bg-gray-100 dark:bg-gray-700 theme-transition drop-shadow-modal"
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
                                className="w-full h-8 px-2 rounded-md bg-gray-300 dark:dark-theme-dark-text theme-transition"
                            >
                                <option value="" disabled hidden>
                                    Select status...
                                </option>
                                {Object.entries(boardsData).map(([label, boardCode]) => (
                                    <option key={boardCode} value={boardCode}>
                                        {label}
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
                                className="w-full px-2 rounded-md bg-gray-300 resize-none dark:dark-theme-dark-text theme-transition"
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
                                className="w-full h-8 px-2 rounded-md bg-gray-300 dark:dark-theme-dark-text theme-transition"
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </fieldset>
                        <div className="flex justify-between w-full mt-5">
                            <ModalButton type={"submit"}>
                                {variant === "add" ? "Add" : "Save"}
                            </ModalButton>
                            <ModalButton onClick={handleCancel}>Cancel</ModalButton>
                        </div>
                    </form>
                </div>
            </div>
        </DarkBackdrop>
    );
};

export default Modal;
