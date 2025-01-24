import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Tile from "./Tile";
import { handleReorderTasks } from "../utils/taskUtils";

const DraggableTile = ({ id, status, setTasks, updateTask }) => {
    const ref = useRef(null);

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: "BOX",
        item: { id, status },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const [collectedProps, drop] = useDrop({
        accept: "BOX",
        collect: (monitor) => ({
            handlerId: monitor.getHandlerId(),
        }),
        hover: (item) => {
            handleReorderTasks(setTasks, updateTask, item, id, ref);
        },
    });

    dragRef(drop(ref));

    return (
        <div ref={ref} data-handler-id={collectedProps.handlerId}>
            <Tile isDragging={isDragging} content={id} />
        </div>
    );
};

export default DraggableTile;
