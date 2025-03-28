import { useContext } from "react";
import AppContext from "../context/AppContext";
import Modal from "./base/Modal";

const EditModal = () => {
    const { isEditOpen, setIsEditOpen, activeTaskId, tasks } = useContext(AppContext);

    const [currentTask] = tasks.filter((task) => task.id === activeTaskId);

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
