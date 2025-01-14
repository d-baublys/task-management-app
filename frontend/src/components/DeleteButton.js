import { useDrop } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import useTasks from "../hooks/useTasks";

const DeleteButton = () => {
    const { deleteTask } = useTasks();
    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: "BOX",
        drop: (item) => deleteTask(item.id),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));
    return (
        <button
            ref={dropRef}
            className={`sticky flex top-[20%] p-2 rounded-2xl ${
                isOver ? "bg-slate-300" : "bg-slate-400"
            }`}
        >
            <FontAwesomeIcon className="m-2 text-white size-8" icon={faTrashAlt} />
        </button>
    );
};

export default DeleteButton;
