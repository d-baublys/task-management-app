import { useDragLayer } from "react-dnd";
import Tile from "./base/Tile";
import { useContext } from "react";
import AppContext from "../context/AppContext";

const DragLayer = () => {
    const { dragAllowed } = useContext(AppContext);
    const { item, currentOffset } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        currentOffset: monitor.getSourceClientOffset(),
    }));

    if (!dragAllowed || !currentOffset) {
        return null;
    }

    const transform = `translate(${currentOffset.x}px, ${currentOffset.y}px)`;

    return (
        <div className="fixed pointer-events-none top-0 left-0 z-[9999]">
            <div style={{ transform }}>
                <Tile
                    isDragging={dragAllowed}
                    description={item.description}
                    dueDate={item.dueDate}
                />
            </div>
        </div>
    );
};

export default DragLayer;
