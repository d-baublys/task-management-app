import useAppContext from "../context/AppContext";

let timer: ReturnType<typeof setTimeout> | undefined = undefined;

const useHandleClicks = () => {
    const {
        dragAllowed,
        setDragAllowed,
        activeTaskId,
        setActiveTaskId,
        setIsEditOpen,
        setIsAddOpen,
        isDeleteMode,
        setIsDeleteMode,
        setIsConfirmOpen,
        modalPromise,
    } = useAppContext();

    const taskMouseDown = (id: number) => {
        setActiveTaskId(id);
        isDeleteMode ? setDragAllowed(true) : (timer = setTimeout(() => setDragAllowed(true), 100));
    };

    const taskMouseUp = () => {
        if (!dragAllowed && activeTaskId !== null && timer) {
            setIsEditOpen(true);
        } else if (dragAllowed) {
            setActiveTaskId(null);
        }
        clearTimeout(timer);
        timer = undefined;
        setDragAllowed(false);
    };

    const containsClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, elementId: string) => {
        const element = document.getElementById(elementId);
        return element ? element.contains(e.target as Node) : false;
    };

    const backdropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (
            !containsClick(e, "add-modal") &&
            !containsClick(e, "edit-modal") &&
            !containsClick(e, "confirm-modal")
        ) {
            modalPromise && modalPromise(false);
            setActiveTaskId(null);
            setIsAddOpen(false);
            setIsEditOpen(false);
            setIsConfirmOpen(false);
            setIsDeleteMode(false);
        }
    };
    return { taskMouseDown, taskMouseUp, containsClick, backdropClick };
};

export default useHandleClicks;
