import React from "react";
import Modal from "./base/Modal";
import { TaskType } from "../types";
import useAppContext from "../context/AppContext";

const EditModal = () => {
    const { isEditOpen, setIsEditOpen, activeTaskId, tasks } = useAppContext();

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
