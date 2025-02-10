import { useContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";
import AppContext from "../context/AppContext";
import useHandleClicks from "../hooks/useHandleClicks";

import Header from "../components/Header";
import BoardContainer from "../components/BoardContainer";
import CreateButton from "../components/CreateButton";
import DeleteButton from "../components/DeleteButton";
import AddModal from "../components/AddModal";
import ConfirmModal from "../components/ConfirmModal";
import EditModal from "../components/EditModal";
import DarkBackdrop from "../components/DarkBackdrop";
import DragLayer from "../components/DragLayer";

function Main() {
    const test_mobile = false;

    const { isAddOpen, isDeleteMode, isConfirmOpen, isEditOpen } = useContext(AppContext);
    const { taskMouseUp } = useHandleClicks();

    return (
        <div
            onMouseUp={() => taskMouseUp()}
            className="flex w-full min-h-full"
            style={{
                "--board-btn-spacing": "4rem",
                "--board-btn-top": "20%",
                "--modal-width": "600px",
                "--modal-height": "600px",
                "--modal-drop-shadow": "0 0 50px rgba(0,0,0,0.25)",
            }}
        >
            <DndProvider
                backend={test_mobile ? TouchBackend : HTML5Backend}
                options={{ enableMouseEvents: true }}
            >
                {test_mobile && <DragLayer />}
                <div className="flex flex-grow justify-center min-h-full">
                    <div className="flex flex-col h-full">
                        <DeleteButton />
                    </div>
                </div>
                <div className="flex flex-col w-3/4 h-auto pb-32">
                    <Header />
                    <BoardContainer />
                </div>
                <div className="flex flex-grow justify-center min-h-full">
                    <div className="flex flex-col h-full">
                        <CreateButton />
                    </div>
                </div>
            </DndProvider>
            {(isAddOpen || isDeleteMode || isConfirmOpen || isEditOpen) && (
                <DarkBackdrop zIndex={isDeleteMode ? 500 : 1000}>
                    {isAddOpen && <AddModal />}
                    {isConfirmOpen && <ConfirmModal />}
                    {isEditOpen && <EditModal />}
                </DarkBackdrop>
            )}
        </div>
    );
}

export default Main;
