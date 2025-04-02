import React, { useContext } from "react";
import { useDrop } from "react-dnd";
import BoardButton from "./base/BoardButton";
import AppContext from "../context/AppContext";
import { FaTrashAlt } from "react-icons/fa";
import { GenericResponseType, TileItemType } from "../types";
import { AxiosResponse } from "axios";

interface ContextType {
    deleteTask: (taskId: number) => Promise<AxiosResponse<GenericResponseType>>;
    isDeleteMode: boolean;
    setIsConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setModalPromise: React.Dispatch<React.SetStateAction<(value: boolean) => void>>;
    setIsDeleteMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteButton = () => {
    const {
        deleteTask,
        isDeleteMode,
        setIsConfirmOpen,
        setModalPromise,
        setIsDeleteMode,
    }: ContextType = useContext(AppContext);

    const showModal = () => {
        return new Promise((resolve) => {
            setIsDeleteMode(false);
            setIsConfirmOpen(true);
            setModalPromise(() => resolve);
        });
    };

    const handleDrop = async (item: TileItemType) => {
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
            drop: (item: TileItemType) => handleDrop(item),
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
