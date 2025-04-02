import React, { useContext } from "react";
import Board from "./Board";
import AppContext from "../context/AppContext";
import { BoardTitlesType, TaskType } from "../types";

interface ContextType {
    tasks: TaskType[];
    boardTitles: BoardTitlesType;
}

const BoardContainer = () => {
    const { tasks, boardTitles }: ContextType = useContext(AppContext);

    return (
        <div className="flex justify-between w-full h-full gap-x-[2%]">
            {Object.keys(boardTitles).map((title, index) => (
                <Board
                    key={index}
                    title={title}
                    boardTasks={tasks.filter((task) => task.status === boardTitles[title])}
                />
            ))}
        </div>
    );
};

export default BoardContainer;
