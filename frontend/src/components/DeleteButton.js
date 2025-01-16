import { useDrop } from "react-dnd";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import BaseButton from "./BaseButton";

const DeleteButton = ({ deleteTask }) => {
    const askConfirm = (item) => {
        if (!window.confirm(`Are you sure you want to delete task "${item.id}"?`)) {
            return;
        }

        deleteTask(item.id);
    };

    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: "BOX",
        drop: (item) => askConfirm(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));
    return <BaseButton dropRef={dropRef} isOver={isOver} icon={faTrashAlt} />;
};

export default DeleteButton;
