import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";

import BoardContainer from "./components/BoardContainer";
import CreateButton from "./components/CreateButton";
import DeleteButton from "./components/DeleteButton";
import AddTaskMenu from "./components/AddTaskMenu";
import ConfirmModal from "./components/ConfirmModal";
import DarkBackdrop from "./components/DarkBackdrop";
import DragLayer from "./components/DragLayer";
import useTasks from "./hooks/useTasks";

function App() {
    const test_mobile = false;

    const { tasks, setTasks, addTask, updateTask, updateMultiTask, deleteTask } = useTasks();
    const [showAddPrompt, setShowAddPrompt] = useState(false);
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [modalPromise, setModalPromise] = useState(null);

    const boardTitles = {
        "To Do": "to_do",
        "In Progress": "in_progress",
        "Done": "done",
    };

    return (
        <DndProvider
            backend={test_mobile ? TouchBackend : HTML5Backend}
            options={{ enableMouseEvents: true }}
        >
            {test_mobile && <DragLayer />}
            <div
                className="flex justify-center items-center w-full h-lvh"
                style={{
                    "--board-btn-spacing": "4rem",
                    "--board-btn-top": "20%",
                    "--add-menu-width": "500px",
                    "--add-menu-height": "250px",
                }}
            >
                <div className="flex flex-grow justify-center">
                    <div
                        className="flex flex-col items-end h-lvh"
                        style={{ width: "var(--board-btn-spacing)" }}
                    >
                        <DeleteButton
                            isDeleteMode={isDeleteMode}
                            setIsDeleteMode={setIsDeleteMode}
                            setIsConfirmOpen={setIsConfirmOpen}
                            setModalPromise={setModalPromise}
                            deleteTask={deleteTask}
                        />
                    </div>
                </div>
                <BoardContainer
                    tasks={tasks}
                    setTasks={setTasks}
                    updateTask={updateTask}
                    updateMultiTask={updateMultiTask}
                    boardTitles={boardTitles}
                    isDeleteMode={isDeleteMode}
                />
                <div className="flex flex-grow justify-center">
                    <div
                        className="flex flex-col items-end h-lvh"
                        style={{ width: "var(--board-btn-spacing)" }}
                    >
                        <CreateButton setShowAddPrompt={setShowAddPrompt} />
                        {showAddPrompt && (
                            <AddTaskMenu
                                onAdd={addTask}
                                boardTitles={boardTitles}
                                setShowAddPrompt={setShowAddPrompt}
                            />
                        )}
                    </div>
                </div>
                {isDeleteMode && <DarkBackdrop zIndex={500}/>}
                {isConfirmOpen && (
                    <ConfirmModal
                        modalPromise={modalPromise}
                        setIsConfirmOpen={setIsConfirmOpen}
                    />
                )}
            </div>
            <div className="h-[1500px]"></div>
        </DndProvider>
    );
}

export default App;
