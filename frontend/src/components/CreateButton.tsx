import BoardButton from "./base/BoardButton";
import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import { FaPlusSquare } from "react-icons/fa";

interface ContextType {
    setIsAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateButton = () => {
    const { setIsAddOpen }: ContextType = useContext(AppContext);
    return (
        <BoardButton onClick={() => setIsAddOpen((prev) => !prev)} IconComponent={FaPlusSquare} />
    );
};

export default CreateButton;
