import { useDragLayer } from "react-dnd";
import Tile from "./Tile";

const DragLayer = () => {
    const { itemType, isDragging, item, currentOffset } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        isDragging: monitor.isDragging(),
        currentOffset: monitor.getSourceClientOffset(),
    }));

    if (!isDragging || !currentOffset) {
        return null;
    }

    const transform = `translate(${currentOffset.x}px, ${currentOffset.y}px)`;

    return (
        <div className="fixed pointer-events-none top-0 left-0 z-[9999]">
            <div style={{ transform }}>
                <Tile isDragging={isDragging} content={"this"}/>
            </div>
        </div>
    );
};

export default DragLayer;
