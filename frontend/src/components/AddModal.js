import { useContext } from "react";
import AppContext from "../context/AppContext";
import Modal from "./base/Modal";

const AddModal = () => {
    const { isAddOpen, setIsAddOpen } = useContext(AppContext);

    return (
        <Modal
            modalId={"add-modal"}
            modalAction={"Add"}
            modalState={isAddOpen}
            modalSetter={setIsAddOpen}
        />
    );
};

export default AddModal;
