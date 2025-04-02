import React, { useContext } from "react";
import AppContext from "../context/AppContext";

import AddModal from "./AddModal";
import ConfirmModal from "./ConfirmModal";
import EditModal from "./EditModal";
import DarkBackdrop from "./base/DarkBackdrop";

interface ContextType {
    isAddOpen: boolean;
    isDeleteMode: boolean;
    isConfirmOpen: boolean;
    isEditOpen: boolean;
}

const BackdropUnit = () => {
    const { isAddOpen, isDeleteMode, isConfirmOpen, isEditOpen }: ContextType =
        useContext(AppContext);

    return (
        <>
            {(isAddOpen || isDeleteMode || isConfirmOpen || isEditOpen) && (
                <DarkBackdrop zIndex={isDeleteMode ? 500 : 1000}>
                    {isAddOpen && <AddModal />}
                    {isConfirmOpen && <ConfirmModal />}
                    {isEditOpen && <EditModal />}
                </DarkBackdrop>
            )}
        </>
    );
};

export default BackdropUnit;
