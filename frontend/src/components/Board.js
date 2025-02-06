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
            className={`w-full rounded-xl py-2 ${isOver ? "bg-green-500" : "bg-blue-500"}`}
            ref={dropRef}
        >
            <h2 className="py-2 text-center text-white text-xl font-bold">{title}</h2>
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
