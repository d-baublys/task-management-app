export const processTaskMove = (
    setTasks,
    updateTask,
    updateMultiTask,
    boardTitles,
    title,
    item,
    monitor,
    excludeRef
) => {
    const clientOffset = monitor.getClientOffset();

    if (!clientOffset) return;

    const excludeBounding = excludeRef.current?.getBoundingClientRect();

    const inDropZone =
        clientOffset.y < excludeBounding.top || clientOffset.y > excludeBounding.bottom;

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

    if (inDropZone) {
        setTasks((prevTasks) => {
            const dragIndex = prevTasks.findIndex((task) => task.id === item.id);

            if (dragIndex === prevTasks.length - 1) {
                return prevTasks;
            }

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
};

export const processTaskSwap = (setTasks, updateTask, item, id, ref) => {
    if (!ref.current) {
        return;
    }

    const dragId = item.id;
    const hoverId = id;

    if (dragId === hoverId) {
        return;
    }

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
};
