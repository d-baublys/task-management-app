import { useDrop } from "react-dnd";
import DraggableTile from "./DraggableTile";
import { useCallback, useRef } from "react";

const Board = ({ title, titles, setTasks, boardTasks, updateTask, updateTasks }) => {
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

            if (item.status === titles[title] && inDropZone) {
                setTasks((prevTasks) => {
                    const dragIndex = prevTasks.findIndex((task) => task.id === item.id);
                    let updatedTasks = [...prevTasks];
                    const [movedTask] = updatedTasks.splice(dragIndex, 1);

                    updatedTasks.push(movedTask);

                    updatedTasks = updatedTasks.map((task, index) => ({ ...task, position: index }));
                    console.log("hover end board");
                    updateTasks(updatedTasks);

                    return updatedTasks;
                });
            }
        },
        hover: (item) => {
            if (item.status !== titles[title]) {
                item.status = titles[title];
                setTasks((prevTasks) => {
                    const dragIndex = prevTasks.findIndex((task) => task.id === item.id);
                    const updatedTasks = [...prevTasks];
                    const movedTask = updatedTasks[dragIndex];
                    movedTask.status = titles[title];
                    console.log("hover move board");
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

            const updatedTasks = [...prevTasks];
            const hoveredTask = updatedTasks[hoverIndex];
            const [movedTask] = updatedTasks.splice(dragIndex, 1);
            updatedTasks.splice(hoverIndex, 0, movedTask);

            movedTask.position = hoverIndex;
            hoveredTask.position = dragIndex;

            [movedTask, hoveredTask].forEach((task) => {
                updateTask(task);
            });

            console.log("reorder hit");

            return updatedTasks;
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
