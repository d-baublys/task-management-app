import { useContext } from "react";
import AppContext from "../context/AppContext";

interface AppContextType {
    dragAllowed: boolean;
    setDragAllowed: React.Dispatch<React.SetStateAction<boolean>>;
    activeTaskId: number | null;
    setActiveTaskId: React.Dispatch<React.SetStateAction<number | null>>;
    setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isDeleteMode: boolean;
    setIsDeleteMode: React.Dispatch<React.SetStateAction<boolean>>;
    setIsConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalPromise: ((value: boolean) => void) | null;
}

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
    }: AppContextType = useContext(AppContext);

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

    const containsClick = (e: React.MouseEvent<HTMLElement>, elementId: string) => {
        const element = document.getElementById(elementId);
        return element ? element.contains(e.currentTarget) : false;
    };

    const backdropClick = (e: React.MouseEvent<HTMLElement>) => {
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
