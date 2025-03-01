import { useContext } from "react";
import { useDrop } from "react-dnd";
import BoardButton from "./base/BoardButton";
import AppContext from "../context/AppContext";

const DeleteButton = () => {
    const { deleteTask, isDeleteMode, setIsConfirmOpen, setModalPromise, setIsDeleteMode } =
        useContext(AppContext);

    const showModal = () => {
        return new Promise((resolve) => {
            setIsDeleteMode(false);
            setIsConfirmOpen(true);
            setModalPromise(() => resolve);
        });
    };

    const handleDrop = async (item) => {
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
            drop: (item) => handleDrop(item),
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
            iconName={"FaTrashAlt"}
            zIndex={550}
        />
    );
};

export default DeleteButton;
