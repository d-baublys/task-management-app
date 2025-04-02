import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import Modal from "./base/Modal";
import { TaskType } from "../types";

interface ContextType {
    isEditOpen: boolean;
    setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
    activeTaskId: number;
    tasks: TaskType[];
}

const EditModal = () => {
    const { isEditOpen, setIsEditOpen, activeTaskId, tasks }: ContextType = useContext(AppContext);

    const [currentTask] = tasks.filter((task: TaskType) => task.id === activeTaskId);

    return (
        <Modal
            modalId={"edit-modal"}
            modalAction={"Save"}
            modalState={isEditOpen}
            modalSetter={setIsEditOpen}
            currentTask={currentTask}
        />
    );
};

export default EditModal;
