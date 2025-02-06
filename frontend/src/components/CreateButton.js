import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import BoardButton from "./base/BoardButton";
import { useContext } from "react";
import AppContext from "../context/AppContext";

const CreateButton = () => {
    const { setIsAddOpen } = useContext(AppContext);
    return <BoardButton onClick={() => setIsAddOpen((prev) => !prev)} icon={faPlusSquare} />;
};

export default CreateButton;
