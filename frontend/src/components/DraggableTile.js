import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Tile from "./Tile";

const DraggableTile = ({ id, index, moveRow }) => {
    const ref = useRef(null);

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: "BOX",
        item: { id, index },
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

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveRow(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    dragRef(drop(ref));

    return (
        <div ref={dragRef}>
            <Tile isDragging={isDragging} content={id} />
        </div>
    );
};

export default DraggableTile;
