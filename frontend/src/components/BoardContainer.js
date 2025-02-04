import { useContext } from "react";
import Board from "./Board";
import AppContext from "../context/AppContext";

const BoardContainer = () => {
    const { tasks, boardTitles } = useContext(AppContext);

    return (
        <div className="flex w-3/4 h-2/3 gap-x-[2%] justify-between">
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
