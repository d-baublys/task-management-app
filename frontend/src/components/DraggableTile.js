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
    dragging,
    setDragging,
}) => {
    const ref = useRef(null);

    const [, dragRef] = useDrag(() => ({
        type: "BOX",
        item: () => {
            setDragging(id);
            return { id, status };
        },
        end: () => setDragging(null),
    }));

    const [{ handlerId }, drop] = useDrop({
        accept: "BOX",
        collect: (monitor) => ({
            handlerId: monitor.getHandlerId(),
        }),
        hover: (item, monitor) => {
            processTaskSwap(setTasks, updateMultiTask, item, monitor, id, ref, isDeleteMode);
        },
    });

    dragRef(drop(ref));

    return (
        <motion.div
            layout
            initial={{ scale: 1 }}
            animate={{ scale: dragging === id ? 1.1 : 1 }}
            className="p-2 z-[600]"
            ref={ref}
            data-handler-id={handlerId}
        >
            <Tile
                isDragging={dragging === id ? true : false}
                description={description}
                dueDate={dueDate}
            />
        </motion.div>
    );
};

export default DraggableTile;
