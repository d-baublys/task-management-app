import { useState } from "react";
import Board from "./Board";

const BoardContainer = ({
    tasks,
    setTasks,
    updateTask,
    updateMultiTask,
    boardTitles,
    isDeleteMode,
    isEditOpen,
    setIsEditOpen,
    activeTaskId,
    setActiveTaskId,
}) => {
    const [draggable, setDraggable] = useState(false);

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
                    activeTaskId={activeTaskId}
                    setActiveTaskId={setActiveTaskId}
                    draggable={draggable}
                    setDraggable={setDraggable}
                    isEditOpen={isEditOpen}
                    setIsEditOpen={setIsEditOpen}
                />
            ))}
        </div>
    );
};

export default BoardContainer;
