import React from "react";
import useAppContext from "../context/AppContext";

import AddModal from "./AddModal";
import ConfirmModal from "./ConfirmModal";
import EditModal from "./EditModal";
import DarkBackdrop from "./base/DarkBackdrop";

const BackdropUnit = () => {
    const { isAddOpen, isDeleteMode, isConfirmOpen, isEditOpen } = useAppContext();

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
