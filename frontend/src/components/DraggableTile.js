import { useDrag } from "react-dnd";

const DraggableTile = ({ id }) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: "BOX",
        item: { id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            className="w-16 h-8 bg-red-500 rounded-lg cursor-move"
            ref={dragRef}
            style={{
                opacity: isDragging ? 0.5 : 1,
            }}
        ></div>
    );
};

export default DraggableTile;
