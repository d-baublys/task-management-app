import BoardButton from "./base/BoardButton";
import React from "react";
import { FaPlusSquare } from "react-icons/fa";
import useAppContext from "../context/AppContext";

const CreateButton = () => {
    const { setIsAddOpen } = useAppContext();
    return (
        <BoardButton
            onClick={() => setIsAddOpen((prev) => !prev)}
            IconComponent={FaPlusSquare}
            aria-label="Create task"
            title="Create task"
        />
    );
};

export default CreateButton;
