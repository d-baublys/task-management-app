import React from "react";
import { useDrop } from "react-dnd";
import BoardButton from "./base/BoardButton";
import { FaTrashAlt } from "react-icons/fa";
import { DndTileData } from "../lib/definitions";
import useAppContext from "../context/AppContext";

const DeleteButton = () => {
    const { deleteTask, isDeleteMode, setIsConfirmOpen, setModalPromise, setIsDeleteMode } =
        useAppContext();

    const showModal = () => {
        return new Promise((resolve) => {
            setIsDeleteMode(false);
            setIsConfirmOpen(true);
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
        />
    );
};

export default DeleteButton;
