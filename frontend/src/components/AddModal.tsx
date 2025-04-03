import React, { useContext } from "react";
import Modal from "./base/Modal";
import useAppContext from "../context/AppContext";

const AddModal = () => {
    const { isAddOpen, setIsAddOpen } = useAppContext();

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
