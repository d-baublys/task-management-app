import { useDrop } from "react-dnd";
import DraggableTile from "./DraggableTile";
import { useCallback } from "react";

const Board = ({ title, titles, setTasks, boardTasks, onDrop }) => {
    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: "BOX",
        drop: (item) => onDrop(item.id, titles[title]),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    const moveRow = useCallback((dragIndex, hoverIndex) => {
        setTasks((prevTasks) => {
            const updatedTasks = [...prevTasks];
            const [movedItem] = updatedTasks.splice(dragIndex, 1);

            updatedTasks.splice(hoverIndex, 0, movedItem);

            return updatedTasks;
        });
    }, []);

    return (
        <div
            className={`w-1/4 h-full rounded-xl ${isOver ? "bg-green-500" : "bg-blue-500"}`}
            ref={dropRef}
        >
            <h2 className="py-2 text-center text-white text-xl font-bold">{title}</h2>
            <div className="flex flex-col gap-2 p-2">
                {boardTasks.map((tile, index) => (
                    <DraggableTile key={tile.id} id={tile.id} index={index} moveRow={moveRow} />
                ))}
            </div>
        </div>
    );
};

export default Board;
