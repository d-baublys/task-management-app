import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Tile from "./Tile";

const DraggableTile = ({ id, status, moveRow }) => {
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
        hover: (item, monitor) => {
            if (!ref.current) {
                return;
            }

            const dragId = item.id;
            const hoverId = id;

            if (dragId === hoverId) {
                return;
            }

            moveRow(dragId, hoverId);
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
