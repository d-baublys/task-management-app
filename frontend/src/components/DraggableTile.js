import { useContext, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { motion } from "motion/react";
import Tile from "./base/Tile";
import AppContext from "../context/AppContext";
import { processTaskSwap } from "../helpers/dndHelpers";
import useHandleClicks from "../hooks/useHandleClicks";

const DraggableTile = ({ id, status, description, dueDate }) => {
    const {
        setTasks,
        updateMultiTask,
        isDeleteMode,
        dragAllowed,
        setDragAllowed,
        activeTaskId,
        setActiveTaskId,
    } = useContext(AppContext);

    const { taskMouseDown } = useHandleClicks();

    const elementRef = useRef(null);

    const [, dragRef] = useDrag(
        () => ({
            type: "BOX",
            canDrag: () => dragAllowed,
            item: () => {
                return { id, status };
            },
            end: () => {
                setActiveTaskId(null);
                setDragAllowed(false);
            },
        }),
        [dragAllowed]
    );

    const [{ handlerId }, dropRef] = useDrop(
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
        >
            <Tile
                isDragging={dragAllowed && activeTaskId === id}
                description={description}
                dueDate={dueDate}
            />
        </motion.div>
    );
};

export default DraggableTile;
