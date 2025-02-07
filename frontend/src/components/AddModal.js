import { useContext } from "react";
import AppContext from "../context/AppContext";
import Modal from "./base/Modal";

const AddModal = () => {
    const { setIsAddOpen } = useContext(AppContext);

    return <Modal modalId={"add-modal"} modalAction={"Add Task"} modalSetter={setIsAddOpen} />;
};

export default AddModal;
