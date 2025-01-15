import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

const CreateButton = ({ setShowAddPrompt }) => {
    return (
        <button onClick={() => setShowAddPrompt((prev) => !prev)} className="sticky flex justify-center items-center top-[20%] w-full h-btnBoard rounded-2xl bg-slate-400">
            <FontAwesomeIcon className="m-2 text-white size-8" icon={faPlusSquare} />
        </button>
    );
};

export default CreateButton;
