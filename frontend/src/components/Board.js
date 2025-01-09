import { useDrop } from "react-dnd";
import DraggableTile from "./DraggableTile";

const Board = ({ title, tiles, onDrop }) => {
    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: "BOX",
        drop: (item) => onDrop(item.id, title),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div
            className="w-1/4 h-full rounded-xl"
            ref={dropRef}
            style={{ backgroundColor: isOver ? "green" : "skyblue" }}
        >
            <h2 className="py-2 text-center text-white text-xl font-bold">{title}</h2>
            <div className="flex flex-col gap-2 p-2">
                {tiles.map((tile) => (
                    <DraggableTile key={tile.id} id={tile.id} />
                ))}
            </div>
        </div>
    );
};

export default Board;
