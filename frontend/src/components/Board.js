import { useDrop } from "react-dnd";
import DraggableTile from "./DraggableTile";
import { useCallback, useRef } from "react";

const Board = ({ setTasks, updateTask, updateMultiTask, boardTitles, title, boardTasks }) => {
    const excludeRef = useRef(null);

    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: "BOX",
        drop: (item, monitor) => {
            const clientOffset = monitor.getClientOffset();
            if (!clientOffset) return;

            const excludeBounding = excludeRef.current?.getBoundingClientRect();

            const inDropZone =
                clientOffset.x < excludeBounding.left ||
                clientOffset.x > excludeBounding.right ||
                clientOffset.y < excludeBounding.top ||
                clientOffset.y > excludeBounding.bottom;

            if (item.status === boardTitles[title] && inDropZone) {
                setTasks((prevTasks) => {
                    const dragIndex = prevTasks.findIndex((task) => task.id === item.id);
                    let reorderedTasks = [...prevTasks];
                    const [movedTask] = reorderedTasks.splice(dragIndex, 1);

                    reorderedTasks.push(movedTask);

                    reorderedTasks = reorderedTasks.map((task, index) => ({
                        ...task,
                        position: index,
                    }));

                    updateMultiTask(reorderedTasks);

                    return reorderedTasks;
                });
            }
        },
        hover: (item) => {
            if (item.status !== boardTitles[title]) {
                item.status = boardTitles[title];
                setTasks((prevTasks) => {
                    const dragIndex = prevTasks.findIndex((task) => task.id === item.id);
                    const updatedTasks = [...prevTasks];
                    const movedTask = updatedTasks[dragIndex];
                    movedTask.status = boardTitles[title];

                    updateTask(movedTask);

                    return updatedTasks;
                });
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    const moveRow = useCallback((dragId, hoverId) => {
        setTasks((prevTasks) => {
            const dragIndex = prevTasks.findIndex((task) => task.id === dragId);
            const hoverIndex = prevTasks.findIndex((task) => task.id === hoverId);

            if (dragIndex === -1 || hoverIndex === -1) return prevTasks;

            const reorderedTasks = [...prevTasks];
            const hoveredTask = reorderedTasks[hoverIndex];
            const [movedTask] = reorderedTasks.splice(dragIndex, 1);
            reorderedTasks.splice(hoverIndex, 0, movedTask);

            movedTask.position = hoverIndex;
            hoveredTask.position = dragIndex;

            [movedTask, hoveredTask].forEach((task) => {
                updateTask(task);
            });

            return reorderedTasks;
        });
    }, []);

    return (
        <div
            className={`w-1/4 h-full rounded-xl ${isOver ? "bg-green-500" : "bg-blue-500"}`}
            ref={dropRef}
        >
            <h2 className="py-2 text-center text-white text-xl font-bold">{title}</h2>
            <div ref={excludeRef} className="flex flex-col gap-2 px-2">
                {boardTasks.map((tile, index) => (
                    <DraggableTile
                        key={tile.id}
                        id={tile.id}
                        status={tile.status}
                        position={tile.position}
                        moveRow={moveRow}
                    />
                ))}
            </div>
        </div>
    );
};

export default Board;
