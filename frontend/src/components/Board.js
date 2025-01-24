import { useRef } from "react";
import { useDrop } from "react-dnd";
import DraggableTile from "./DraggableTile";
import { processTaskMove } from "../utils/taskUtils";

const Board = ({ setTasks, updateTask, updateMultiTask, boardTitles, title, boardTasks }) => {
    const excludeRef = useRef(null);

    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: "BOX",
        hover: (item, monitor) => {
            processTaskMove(
                setTasks,
                updateTask,
                updateMultiTask,
                boardTitles,
                title,
                item,
                monitor,
                excludeRef
            );
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div
            className={`w-1/4 h-full rounded-xl ${isOver ? "bg-green-500" : "bg-blue-500"}`}
            ref={dropRef}
        >
            <h2 className="py-2 text-center text-white text-xl font-bold">{title}</h2>
            <div ref={excludeRef} className="flex flex-col w-full gap-2 px-2">
                {boardTasks.map((tile, index) => (
                    <DraggableTile
                        key={tile.id}
                        id={tile.id}
                        status={tile.status}
                        setTasks={setTasks}
                        updateTask={updateTask}
                        position={tile.position}
                    />
                ))}
            </div>
        </div>
    );
};

export default Board;
