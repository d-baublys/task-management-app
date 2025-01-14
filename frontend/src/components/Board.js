import { useDrop } from "react-dnd";
import DraggableTile from "./DraggableTile";

const Board = ({ title, titles, tasks, onDrop }) => {
    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: "BOX",
        drop: (item) => onDrop(item.id, titles[title]),
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
            <div className="flex flex-col gap-2 p-2">
                {tasks.map((tile) => (
                    <DraggableTile key={tile.id} id={tile.id} />
                ))}
            </div>
        </div>
    );
};

export default Board;
