import { useDrag } from "react-dnd";
import Tile from "./Tile";

const DraggableTile = ({ id }) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: "BOX",
        item: { id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div ref={dragRef}>
            <Tile isDragging={isDragging} content={id}/>
        </div>
    );
};

export default DraggableTile;
