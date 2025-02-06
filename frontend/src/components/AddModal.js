import { useContext } from "react";
import AppContext from "../context/AppContext";
import Modal from "./base/Modal";

const AddModal = () => {
    const { addTask, setIsAddOpen } = useContext(AppContext);

    return (
        <Modal
            modalId={"add-modal"}
            modalAction={"Add Task"}
            taskFunc={addTask}
            modalSetter={setIsAddOpen}
        />
    );
};

export default AddModal;
