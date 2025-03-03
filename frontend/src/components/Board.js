import { useContext, useRef } from "react";
import { useDrop } from "react-dnd";
import DraggableTile from "./DraggableTile";
import AppContext from "../context/AppContext";
import { processTaskMove } from "../helpers/dndHelpers";

const Board = ({ title, boardTasks }) => {
    const { setTasks, updateTask, updateMultiTask, boardTitles, isDeleteMode } =
        useContext(AppContext);

    const excludeRef = useRef(null);

    const [{ isOver }, dropRef] = useDrop(
        () => ({
            accept: "BOX",
            canDrop: () => !isDeleteMode,
            hover: (item, monitor) => {
                processTaskMove(
                    setTasks,
                    updateTask,
                    updateMultiTask,
                    boardTitles,
                    title,
                    item,
                    monitor,
                    excludeRef,
                    isDeleteMode
                );
            },
            collect: (monitor) => ({
                isOver: monitor.isOver(),
            }),
        }),
        [isDeleteMode]
    );

    return (
        <div
            className={`relative before:content-[""] before:absolute before:inset-0 w-full rounded-xl before:rounded-xl min-h-full py-2 before:bg-board-gradient before:drop-shadow-board before:pointer-events-none before:z-[-1] ${
                isOver && !isDeleteMode ? "before:opacity-80" : "before:opacity-50"
            }`}
            ref={dropRef}
        >
            <h2 className="py-2 text-center text-lg md:text-xl font-semibold">{title}</h2>
            <div ref={excludeRef} className="flex flex-col w-full">
                {boardTasks.map((tile) => (
                    <DraggableTile
                        key={tile.id}
                        id={tile.id}
                        status={tile.status}
                        description={tile.description}
                        dueDate={tile.due_date}
                    />
                ))}
            </div>
        </div>
    );
};

export default Board;
