import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { motion } from "motion/react";
import Tile from "./Tile";
import { processTaskSwap } from "../utils/taskUtils";

const DraggableTile = ({
    id,
    status,
    description,
    dueDate,
    setTasks,
    updateMultiTask,
    isDeleteMode,
    activeTaskId,
    setActiveTaskId,
    draggable,
    setDraggable,
    setIsEditOpen,
}) => {
    const ref = useRef(null);
    let timerRef = useRef(null);

    const [, dragRef] = useDrag(
        () => ({
            type: "BOX",
            canDrag: () => draggable,
            item: () => {
                setActiveTaskId(id);
                return { id, status };
            },
            end: () => setActiveTaskId(null),
        }),
        [draggable]
    );

    const [{ handlerId }, drop] = useDrop({
        accept: "BOX",
        collect: (monitor) => ({
            handlerId: monitor.getHandlerId(),
        }),
        hover: (item, monitor) => {
            processTaskSwap(setTasks, updateMultiTask, item, monitor, id, ref, isDeleteMode);
        },
    });
    const handleMouseDown = () => {
        setActiveTaskId(id);
        timerRef.current = setTimeout(() => setDraggable(true), 100);
    };

    const handleMouseUp = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            setIsEditOpen(true);
        }
        setDraggable(false);
    };

    dragRef(drop(ref));

    return (
        <motion.div
            layout
            initial={{ scale: 1 }}
            animate={{ scale: activeTaskId === id ? 1.1 : 1 }}
            className="p-2 z-[600]"
            ref={ref}
            data-handler-id={handlerId}
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
        >
            <Tile isDragging={activeTaskId === id} description={description} dueDate={dueDate} />
        </motion.div>
    );
};

export default DraggableTile;
