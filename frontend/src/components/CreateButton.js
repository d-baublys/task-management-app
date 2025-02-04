import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import BaseButton from "./BaseButton";
import { useContext } from "react";
import AppContext from "../context/AppContext";

const CreateButton = () => {
    const { setShowAddPrompt } = useContext(AppContext);
    return <BaseButton onClick={() => setShowAddPrompt((prev) => !prev)} icon={faPlusSquare} />;
};

export default CreateButton;
