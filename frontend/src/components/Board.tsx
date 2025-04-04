import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import DraggableTile from "./DraggableTile";
import { processTaskMove } from "../helpers/dndHelpers";
import { TaskType, DndTileData } from "../types";
import useAppContext from "../context/AppContext";

interface Props {
    title: string;
    boardTasks: TaskType[];
}

const Board = ({ title, boardTasks }: Props) => {
    const { setTasks, updateTask, updateMultiTask, boardTitles, isDeleteMode } = useAppContext();

    const excludeRef = useRef(null);

    const [{ isOver }, dropRef] = useDrop(
        () => ({
            accept: "BOX",
            canDrop: () => !isDeleteMode,
            hover: (item: DndTileData, monitor) => {
                processTaskMove({
                    setTasks,
                    updateTask,
                    updateMultiTask,
                    boardTitles,
                    title,
                    item,
                    monitor,
                    excludeRef,
                    isDeleteMode,
                });
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
            ref={(el) => {
                dropRef(el);
            }}
        >
            <h2 className="py-2 text-center text-lg md:text-xl font-semibold">{title}</h2>
            <div ref={excludeRef} className="flex flex-col w-full">
                {boardTasks.map((tile: TaskType) => (
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
