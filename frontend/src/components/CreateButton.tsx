import BoardButton from "./base/BoardButton";
import React from "react";
import { FaPlusSquare } from "react-icons/fa";
import { StateSetter } from "../lib/definitions";

const CreateButton = ({ addModeSetter }: { addModeSetter: StateSetter<boolean> }) => {
    return (
        <BoardButton
            onClick={() => addModeSetter((prev) => !prev)}
            IconComponent={FaPlusSquare}
            aria-label="Create task"
            title="Create task"
        />
    );
};

export default CreateButton;
