import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";
import useHandleClicks from "../hooks/useHandleClicks";

import BoardContainer from "../components/BoardContainer";
import DragLayer from "../components/DragLayer";
import PageTemplate from "./base/PageTemplate";
import DeleteButton from "../components/DeleteButton";
import CreateButton from "../components/CreateButton";
import React, { useEffect, useState } from "react";
import useAppContext from "../context/AppContext";
import ConfirmModal from "../components/ConfirmModal";
import DarkBackdrop from "../components/base/DarkBackdrop";
import Modal from "../components/base/Modal";
import { TaskType } from "../lib/definitions";

function Main() {
    const { tasks, isAuthenticated, activeTaskId, isDeleteMode, setIsDeleteMode, tasksHookObj } =
        useAppContext();
    const { getTasks } = tasksHookObj;

    const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

    const [currentTask] = tasks.filter((task: TaskType) => task.id === activeTaskId);

    useEffect(() => {
        isAuthenticated && getTasks();
    }, [isAuthenticated]);

    const { taskMouseUp } = useHandleClicks(setIsEditOpen);

    return (
        <DndProvider
            backend={isMobile ? TouchBackend : HTML5Backend}
            options={isMobile ? { enableMouseEvents: true } : undefined}
        >
            <DragLayer />
            <PageTemplate
                leftContent={<DeleteButton confirmModeSetter={setIsConfirmOpen} />}
                rightContent={<CreateButton addModeSetter={setIsAddOpen} />}
                onMouseUp={() => taskMouseUp()}
            >
                <BoardContainer />
            </PageTemplate>
            {isAddOpen && <Modal variant="add" modalState={isAddOpen} modalSetter={setIsAddOpen} />}
            {isEditOpen && (
                <Modal
                    variant="edit"
                    modalState={isEditOpen}
                    modalSetter={setIsEditOpen}
                    currentTask={currentTask}
                />
            )}
            {isConfirmOpen && (
                <ConfirmModal modalState={isConfirmOpen} modalSetter={setIsConfirmOpen} />
            )}
            {isDeleteMode && (
                <DarkBackdrop handleClick={() => setIsDeleteMode(false)} zIndex={500} />
            )}
        </DndProvider>
    );
}

export default Main;
