import { useContext, useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import BaseButton from "./BaseButton";
import AppContext from "../context/AppContext";

const DeleteButton = () => {
    const { deleteTask, isDeleteMode, setIsConfirmOpen, setModalPromise, setIsDeleteMode } =
        useContext(AppContext);

    const isDeleteModeRef = useRef(isDeleteMode);

    useEffect(() => {
        isDeleteModeRef.current = isDeleteMode;
    }, [isDeleteMode]);

    const showModal = () => {
        return new Promise((resolve) => {
            setIsDeleteMode(false);
            setIsConfirmOpen(true);
            setModalPromise(() => resolve);
        });
    };

    const handleDrop = async (item) => {
        if (!isDeleteModeRef.current) return;
        const result = await showModal();
        if (result) {
            deleteTask(item.id);
        }
    };

    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: "BOX",
        drop: (item) => handleDrop(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));
    return (
        <BaseButton
            onClick={() => setIsDeleteMode((prev) => !prev)}
            dropRef={dropRef}
            isOver={isOver && isDeleteMode}
            icon={faTrashAlt}
            zIndex={550}
        />
    );
};

export default DeleteButton;
