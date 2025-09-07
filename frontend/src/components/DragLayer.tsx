import { useDragLayer, XYCoord } from "react-dnd";
import Tile from "./base/Tile";
import React from "react";
import { DndTileData } from "../lib/definitions";
import useAppContext from "../context/AppContext";

interface DragType {
    item: DndTileData;
    currentOffset: XYCoord | null;
}

const DragLayer = () => {
    const { dragAllowed } = useAppContext();
    const { item, currentOffset }: DragType = useDragLayer((monitor) => ({
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
                    width={item.tileWidth}
                />
            </div>
        </div>
    );
};

export default DragLayer;
