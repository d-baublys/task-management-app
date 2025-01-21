import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Tile from "./Tile";

const DraggableTile = ({ id, status, position, moveRow }) => {
    const ref = useRef(null);

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: "BOX",
        item: { id, status, position },
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

            const dragPosition = item.position;
            const hoverPosition = position;

            if (dragPosition === hoverPosition) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragPosition < hoverPosition && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragPosition > hoverPosition && hoverClientY > hoverMiddleY) {
                return;
            }

            moveRow(dragPosition, hoverPosition);
            item.position = hoverPosition;
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
