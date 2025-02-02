import { useState } from "react";
import Board from "./Board";

const BoardContainer = ({
    tasks,
    setTasks,
    updateTask,
    updateMultiTask,
    boardTitles,
    isDeleteMode,
}) => {
    const [dragging, setDragging] = useState(null);
    return (
        <div className="flex w-3/4 h-2/3 gap-x-[2%] justify-between">
            {Object.keys(boardTitles).map((title, index) => (
                <Board
                    key={index}
                    setTasks={setTasks}
                    updateTask={updateTask}
                    updateMultiTask={updateMultiTask}
                    boardTitles={boardTitles}
                    title={title}
                    boardTasks={tasks.filter((task) => task.status === boardTitles[title])}
                    isDeleteMode={isDeleteMode}
                    dragging={dragging}
                    setDragging={setDragging}
                />
            ))}
        </div>
    );
};

export default BoardContainer;
