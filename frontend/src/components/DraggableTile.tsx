import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { motion } from "motion/react";
import Tile from "./base/Tile";
import { processTaskSwap } from "../helpers/dndHelpers";
import useHandleClicks from "../hooks/useHandleClicks";
import { TileType, TileItemType } from "../types";
import useAppContext from "../context/AppContext";

const DraggableTile = ({ id, status, description, dueDate }: TileType) => {
    const {
        setTasks,
        updateMultiTask,
        isDeleteMode,
        dragAllowed,
        setDragAllowed,
        activeTaskId,
        setActiveTaskId,
    } = useAppContext();

    const { taskMouseDown } = useHandleClicks();

    const elementRef = useRef<HTMLDivElement>(null);
    const widthRef = useRef<HTMLDivElement>(null);
    const [tileWidth, setTileWidth] = useState(0);

    const [, dragRef, preview] = useDrag(
        () => ({
            type: "BOX",
            canDrag: () => dragAllowed,
            item: () => {
                return { id, status, description, dueDate, tileWidth };
            },
            end: () => {
                setActiveTaskId(null);
                setDragAllowed(false);
            },
        }),
        [dragAllowed]
    );

    useEffect(() => {
        const img = new Image();
        img.src = "";
        preview(img);
    }, [preview]);

    const updateTileWidth = () => {
        if (widthRef.current) {
            setTileWidth(widthRef.current.getBoundingClientRect().width);
        }
    };

    useLayoutEffect(() => {
        updateTileWidth();
        window.addEventListener("resize", updateTileWidth);

        return () => window.removeEventListener("resize", updateTileWidth);
    }, []);

    interface CollectedInterface {
        handlerId: (string | symbol) | null
    }

    const [{ handlerId }, dropRef] = useDrop<TileItemType, unknown, CollectedInterface>(
        {
            accept: "BOX",
            canDrop: () => !isDeleteMode,
            collect: (monitor) => ({
                handlerId: monitor.getHandlerId(),
            }),
            hover: (item, monitor) => {
                processTaskSwap(
                    setTasks,
                    updateMultiTask,
                    item,
                    monitor,
                    id,
                    elementRef,
                    isDeleteMode
                );
            },
        },
        [isDeleteMode]
    );

    dragRef(dropRef(elementRef));

    return (
        <motion.div
            layout
            initial={{ scale: 1 }}
            animate={{ scale: activeTaskId === id ? 1.1 : 1 }}
            className={`p-2 ${dragAllowed || isDeleteMode ? "z-[600]" : "z-0"}`}
            ref={elementRef}
            data-handler-id={handlerId}
            onMouseDown={() => taskMouseDown(id)}
            onTouchStart={() => taskMouseDown(id)}
        >
            <div ref={widthRef}>
                <Tile
                    isDragging={dragAllowed && activeTaskId === id}
                    description={description}
                    dueDate={dueDate}
                />
            </div>
        </motion.div>
    );
};

export default DraggableTile;
