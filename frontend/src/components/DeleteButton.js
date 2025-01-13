import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const DeleteButton = () => {
    return (
        <button className="sticky flex top-[20%] p-2 rounded-2xl bg-slate-400">
            <FontAwesomeIcon className="m-2 text-white size-8" icon={faTrashAlt}/>
        </button>
    )
};

export default DeleteButton;
