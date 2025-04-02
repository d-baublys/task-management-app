import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import Modal from "./base/Modal";

interface ContextType {
    isAddOpen: boolean;
    setIsAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddModal = () => {
    const { isAddOpen, setIsAddOpen }: ContextType = useContext(AppContext);

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
