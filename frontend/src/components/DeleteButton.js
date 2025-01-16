import { useDrop } from "react-dnd";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import BaseButton from "./BaseButton";

const DeleteButton = ({ deleteTask }) => {
    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: "BOX",
        drop: (item) => deleteTask(item.id),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));
    return <BaseButton dropRef={dropRef} icon={faTrashAlt} />;
};

export default DeleteButton;
