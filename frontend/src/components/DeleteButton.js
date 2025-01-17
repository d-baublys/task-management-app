import { useDrop } from "react-dnd";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import BaseButton from "./BaseButton";

const DeleteButton = ({ setIsConfirmOpen, setModalPromise, deleteTask }) => {
    const showModal = () => {
        return new Promise((resolve) => {
            setIsConfirmOpen(true);
            setModalPromise(() => resolve);
        });
    };

    const handleDrop = async (item) => {
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
    return <BaseButton dropRef={dropRef} isOver={isOver} icon={faTrashAlt} />;
};

export default DeleteButton;
