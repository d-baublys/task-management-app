import { DropTargetMonitor } from "react-dnd";
import {
    TaskType,
    AddUpdateResponse,
    AddUpdateMultiResponse,
    UpdateTaskParams,
    BoardTitlesType,
    DndTileData,
    StateSetter,
} from "../types";

interface ProcessTaskMoveArgs {
    setTasks: StateSetter<TaskType[]>;
    updateTask: (param: UpdateTaskParams) => AddUpdateResponse;
    updateMultiTask: (updatedTasks: TaskType[]) => AddUpdateMultiResponse;
    boardTitles: BoardTitlesType;
    title: string;
    item: DndTileData;
    monitor: DropTargetMonitor;
    excludeRef: React.RefObject<HTMLDivElement | null>;
    isDeleteMode: boolean;
}

interface ProcessTaskSwapArgs {
    setTasks: StateSetter<TaskType[]>;
    updateMultiTask: (updatedTasks: TaskType[]) => AddUpdateMultiResponse;
    item: DndTileData;
    monitor: DropTargetMonitor;
    id: number;
    elementRef: React.RefObject<HTMLDivElement | null>;
    isDeleteMode: boolean;
}

export const debounce = <T, U, V>(
    func: (arg0: T, arg1: (param: U) => V) => Promise<void>,
    delay = 300
) => {
    let timer: ReturnType<typeof setTimeout> | undefined = undefined;

    return (...args: Parameters<typeof func>) => {
        clearTimeout(timer);
        timer = setTimeout(async () => {
            await func(...args);
        }, delay);
    };
};

const debouncedUpdateTask = debounce<TaskType, UpdateTaskParams, AddUpdateResponse>(
    async (task, updateTask) => {
        try {
            await updateTask({ task });
        } catch (error) {
            console.error("Error saving moved task: ", error);
        }
    }
);

const debouncedUpdateMultiTask = debounce<TaskType[], TaskType[], AddUpdateMultiResponse>(
    async (tasks, updateMultiTask) => {
        try {
            await updateMultiTask(tasks);
        } catch (error) {
            console.error("Error saving reordered tasks: ", error);
        }
    }
);

export const processTaskMove = ({
    setTasks,
    updateTask,
    updateMultiTask,
    boardTitles,
    title,
    item,
    monitor,
    excludeRef,
    isDeleteMode,
}: ProcessTaskMoveArgs) => {
    const clientOffset = monitor.getClientOffset();

    if (!clientOffset || isDeleteMode) return;

    const excludeBounding = excludeRef.current?.getBoundingClientRect();
    const inDropZone = excludeBounding ? clientOffset.y > excludeBounding.bottom : false;

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
            if (dragIndex === prevTasks.length - 1) return prevTasks;

            const [movedTask] = reorderedTasks.splice(dragIndex, 1);

            reorderedTasks.push(movedTask);
            reorderedTasks.forEach((task, index) => (task.position = index));

            debouncedUpdateMultiTask(reorderedTasks, updateMultiTask);

            return reorderedTasks;
        }
        return prevTasks;
    });
};

export const processTaskSwap = ({
    setTasks,
    updateMultiTask,
    item,
    monitor,
    id,
    elementRef: ref,
    isDeleteMode,
}: ProcessTaskSwapArgs) => {
    if (!ref.current || isDeleteMode) return;

    const dragId = item.id;
    const hoverId = id;

    if (dragId === hoverId) return;

    const clientOffset = monitor.getClientOffset();

    if (!clientOffset) return;

    const refBounding = ref.current?.getBoundingClientRect();
    const halfHeight = (refBounding.bottom - refBounding.top) / 2;
    const relativeCursorY = clientOffset.y - refBounding.top;

    setTasks((prevTasks) => {
        const dragIndex = prevTasks.findIndex((task) => task.id === dragId);
        const hoverIndex = prevTasks.findIndex((task) => task.id === hoverId);

        if (dragIndex === -1 || hoverIndex === -1) return prevTasks;

        if (dragIndex < hoverIndex && relativeCursorY < halfHeight) return prevTasks;
        if (dragIndex > hoverIndex && relativeCursorY > halfHeight) return prevTasks;

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
