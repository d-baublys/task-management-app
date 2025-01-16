import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import BaseButton from "./BaseButton";

const CreateButton = ({ setShowAddPrompt }) => {
    return <BaseButton onClick={() => setShowAddPrompt((prev) => !prev)} icon={faPlusSquare} />;
};

export default CreateButton;
