import { useDrop } from "react-dnd";

const Board = ({ title }) => {
    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: "BOX",
        drop: () => console.log("Dropped"),
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
        </div>
    );
};

export default Board;
