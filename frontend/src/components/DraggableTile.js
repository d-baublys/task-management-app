import { useContext, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { motion } from "motion/react";
import Tile from "./Tile";
import AppContext from "../context/AppContext";
import { processTaskSwap } from "../utils/taskUtils";
import { taskMouseDown } from "../utils/helpers";

const DraggableTile = ({ id, status, description, dueDate }) => {
    const {
        setTasks,
        updateMultiTask,
        isDeleteMode,
        draggable,
        setDraggable,
        activeTaskId,
        setActiveTaskId,
    } = useContext(AppContext);

    const elementRef = useRef(null);

    const [, dragRef] = useDrag(
        () => ({
            type: "BOX",
            canDrag: () => draggable,
            item: () => {
                return { id, status };
            },
            end: () => {
                setActiveTaskId(null);
                setDraggable(false);
            },
        }),
        [draggable]
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
            className="p-2 z-[600]"
            ref={elementRef}
            data-handler-id={handlerId}
            onMouseDown={() => taskMouseDown(id, isDeleteMode, setActiveTaskId, setDraggable)}
        >
            <Tile
                isDragging={draggable && activeTaskId === id}
                description={description}
                dueDate={dueDate}
            />
        </motion.div>
    );
};

export default DraggableTile;
