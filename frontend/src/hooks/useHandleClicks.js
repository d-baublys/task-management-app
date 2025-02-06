import { useContext } from "react";
import AppContext from "../context/AppContext";

let timer = null;

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
    } = useContext(AppContext);

    const taskMouseDown = (id) => {
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
        timer = null;
        setDragAllowed(false);
    };

    const containsClick = (e, elementId) => {
        const element = document.getElementById(elementId);
        return element ? element.contains(e.target) : false;
    };

    const backdropClick = (e) => {
        if (
            !containsClick(e, "add-modal") &&
            !containsClick(e, "edit-modal") &&
            !containsClick(e, "confirm-modal")
        ) {
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
