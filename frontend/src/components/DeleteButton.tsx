import React from "react";
import { useDrop } from "react-dnd";
import BoardButton from "./base/BoardButton";
import { FaTrashAlt } from "react-icons/fa";
import { DndTileData, StateSetter } from "../lib/definitions";
import useUiContext from "../context/UiContext";
import useTasksContext from "../context/TasksContext";

const DeleteButton = ({ confirmModeSetter }: { confirmModeSetter: StateSetter<boolean> }) => {
    const { isDeleteMode, setIsDeleteMode, setModalPromise } = useUiContext();
    const { taskActions } = useTasksContext();
    const { deleteTask } = taskActions;

    const showModal = () => {
        return new Promise((resolve) => {
            setIsDeleteMode(false);
            confirmModeSetter(true);
            setModalPromise(() => resolve);
        });
    };

    const handleDrop = async (item: DndTileData) => {
        if (!isDeleteMode) return;
        const result = await showModal();
        if (result) {
            await deleteTask(item.id);
        }
    };

    const [{ isOver }, dropRef] = useDrop(
        () => ({
            accept: "BOX",
            canDrop: () => isDeleteMode,
            drop: (item: DndTileData) => handleDrop(item),
            collect: (monitor) => ({
                isOver: monitor.isOver(),
            }),
        }),
        [isDeleteMode]
    );

    return (
        <BoardButton
            onClick={() => setIsDeleteMode((prev) => !prev)}
            dropRef={dropRef}
            isOver={isOver && isDeleteMode}
            IconComponent={FaTrashAlt}
            zIndex={550}
            aria-label="Delete task"
            title="Delete task"
        />
    );
};

export default DeleteButton;
