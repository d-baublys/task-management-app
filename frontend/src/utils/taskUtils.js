export const debounce = (func, delay = 500) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            return func(...args);
        }, delay);
    };
};

const debouncedUpdateTask = debounce((task, updateTask) => {
    updateTask(task);
});

const debouncedUpdateMultiTask = debounce((tasks, updateMultiTask) => {
    updateMultiTask(tasks);
});

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
    const inDropZone = clientOffset.y > excludeBounding.bottom;

    setTasks((prevTasks) => {
        const dragIndex = prevTasks.findIndex((task) => task.id === item.id);
        const reorderedTasks = [...prevTasks];

        if (item.status !== boardTitles[title]) {
            item.status = boardTitles[title];

            const movedTask = reorderedTasks[dragIndex];
            movedTask.status = boardTitles[title];

            debouncedUpdateTask(movedTask, updateTask);

            return reorderedTasks;
        }

        if (inDropZone) {
            if (dragIndex === prevTasks.length - 1) {
                return prevTasks;
            }

            const [movedTask] = reorderedTasks.splice(dragIndex, 1);

            reorderedTasks.push(movedTask);
            reorderedTasks.forEach((task, index) => (task.position = index));

            debouncedUpdateMultiTask(reorderedTasks, updateMultiTask);

            return reorderedTasks;
        }
        return prevTasks;
    });
};

export const processTaskSwap = (
    setTasks,
    updateMultiTask,
    item,
    monitor,
    id,
    ref,
    isDeleteMode
) => {
    if (!ref.current || isDeleteMode) {
        return;
    }

    const dragId = item.id;
    const hoverId = id;

    if (dragId === hoverId) {
        return;
    }

    const clientOffset = monitor.getClientOffset();

    if (!clientOffset) {
        return;
    }

    const refBounding = ref.current?.getBoundingClientRect();
    const halfHeight = (refBounding.bottom - refBounding.top) / 2;
    const relativeCursorY = clientOffset.y - refBounding.top;

    setTasks((prevTasks) => {
        const dragIndex = prevTasks.findIndex((task) => task.id === dragId);
        const hoverIndex = prevTasks.findIndex((task) => task.id === hoverId);

        if (dragIndex === -1 || hoverIndex === -1) return prevTasks;

        if (dragIndex < hoverIndex && relativeCursorY < halfHeight) {
            return prevTasks;
        }

        if (dragIndex > hoverIndex && relativeCursorY > halfHeight) {
            return prevTasks;
        }

        const reorderedTasks = [...prevTasks];
        const hoveredTask = reorderedTasks[hoverIndex];
        const [movedTask] = reorderedTasks.splice(dragIndex, 1);
        reorderedTasks.splice(hoverIndex, 0, movedTask);

        movedTask.position = hoverIndex;
        hoveredTask.position = dragIndex;

        debouncedUpdateMultiTask(reorderedTasks, updateMultiTask);

        return reorderedTasks;
    });
};
