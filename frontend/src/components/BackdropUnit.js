import { useContext } from "react";
import AppContext from "../context/AppContext";

import AddModal from "./AddModal";
import ConfirmModal from "./ConfirmModal";
import EditModal from "./EditModal";
import DarkBackdrop from "./DarkBackdrop";

const BackdropUnit = () => {
    const { isAddOpen, isDeleteMode, isConfirmOpen, isEditOpen } = useContext(AppContext);

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
