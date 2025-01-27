import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Tile from "./Tile";
import { processTaskSwap } from "../utils/taskUtils";

const DraggableTile = ({ id, status, description, dueDate, setTasks, updateMultiTask, isDeleteMode }) => {
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
            processTaskSwap(setTasks, updateMultiTask, item, id, ref, isDeleteMode);
        },
    });

    dragRef(drop(ref));

    return (
        <div className="p-2 z-[600]" ref={ref} data-handler-id={collectedProps.handlerId}>
            <Tile isDragging={isDragging} description={description} dueDate={dueDate} />
        </div>
    );
};

export default DraggableTile;
