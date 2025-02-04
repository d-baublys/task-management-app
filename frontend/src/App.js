import { useContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";
import AppContext from "./context/AppContext";
import { offMenuClick } from "./utils/helpers";

import BoardContainer from "./components/BoardContainer";
import CreateButton from "./components/CreateButton";
import DeleteButton from "./components/DeleteButton";
import AddTaskMenu from "./components/AddTaskMenu";
import ConfirmModal from "./components/ConfirmModal";
import EditModal from "./components/EditModal";
import DarkBackdrop from "./components/DarkBackdrop";
import DragLayer from "./components/DragLayer";

function App() {
    const test_mobile = false;

    const { showAddPrompt, setShowAddPrompt, isDeleteMode, isConfirmOpen, isEditOpen } =
        useContext(AppContext);

    return (
        <div
            onClick={(e) => offMenuClick(e, showAddPrompt, setShowAddPrompt)}
            className="flex justify-center items-center w-full h-lvh"
            style={{
                "--board-btn-spacing": "4rem",
                "--board-btn-top": "20%",
                "--add-menu-width": "500px",
                "--add-menu-height": "250px",
            }}
        >
            <DndProvider
                backend={test_mobile ? TouchBackend : HTML5Backend}
                options={{ enableMouseEvents: true }}
            >
                {test_mobile && <DragLayer />}
                <div className="flex flex-grow justify-center">
                    <div
                        className="flex flex-col items-end h-lvh"
                        style={{ width: "var(--board-btn-spacing)" }}
                    >
                        <DeleteButton />
                    </div>
                </div>
                <BoardContainer />
                <div className="flex flex-grow justify-center">
                    <div
                        className="flex flex-col items-end h-lvh"
                        style={{ width: "var(--board-btn-spacing)" }}
                    >
                        <CreateButton />
                        {showAddPrompt && <AddTaskMenu />}
                    </div>
                </div>
                <div className="h-[1500px]"></div>
            </DndProvider>
            {(isDeleteMode || isConfirmOpen || isEditOpen) && (
                <DarkBackdrop zIndex={isDeleteMode ? 500 : 1000}>
                    {isConfirmOpen && <ConfirmModal />}
                    {isEditOpen && <EditModal />}
                </DarkBackdrop>
            )}
        </div>
    );
}

export default App;
