import React from "react";
import Board from "./Board";
import useAppContext from "../context/AppContext";
import { BoardLabels, boardsData } from "../lib/definitions";

const BoardContainer = () => {
    const { tasks } = useAppContext();

    return (
        <div className="flex justify-between w-full h-full gap-x-[2%]">
            {Object.entries(boardsData).map(([label, boardCode], index) => (
                <Board
                    key={index}
                    boardLabel={label as BoardLabels}
                    boardCode={boardCode}
                    boardTasks={tasks.filter((task) => task.status === boardCode)}
                />
            ))}
        </div>
    );
};

export default BoardContainer;
