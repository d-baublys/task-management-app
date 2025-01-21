import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Tile from "./Tile";

const DraggableTile = ({ id, moveRow }) => {
    const ref = useRef(null);

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: "BOX",
        item: { id },
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

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragId < hoverId && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragId > hoverId && hoverClientY > hoverMiddleY) {
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
