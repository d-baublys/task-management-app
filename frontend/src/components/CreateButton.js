import BoardButton from "./base/BoardButton";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import { FaPlusSquare } from "react-icons/fa";

const CreateButton = () => {
    const { setIsAddOpen } = useContext(AppContext);
    return (
        <BoardButton onClick={() => setIsAddOpen((prev) => !prev)} IconComponent={FaPlusSquare} />
    );
};

export default CreateButton;
