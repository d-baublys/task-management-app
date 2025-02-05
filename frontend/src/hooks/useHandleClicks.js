import { useContext } from "react";
import AppContext from "../context/AppContext";

let timer = null;

const useHandleClicks = () => {
    const {
        draggable,
        setDraggable,
        activeTaskId,
        setActiveTaskId,
        setIsEditOpen,
        showAddPrompt,
        setShowAddPrompt,
        isDeleteMode,
        setIsDeleteMode,
        setIsConfirmOpen,
    } = useContext(AppContext);

    const taskMouseDown = (id) => {
        setActiveTaskId(id);
        isDeleteMode ? setDraggable(true) : (timer = setTimeout(() => setDraggable(true), 100));
    };

    const taskMouseUp = () => {
        if (!draggable && activeTaskId !== null && timer) {
            setIsEditOpen(true);
        } else if (draggable) {
            setActiveTaskId(null);
        }
        clearTimeout(timer);
        setDraggable(false);
    };

    const containsClick = (e, clsName) => {
        const element = document.querySelector(clsName);
        return element ? element.contains(e.target) : false;
    };

    const offMenuClick = (e) => {
        if (showAddPrompt && !containsClick(e, ".add-menu")) {
            setShowAddPrompt(false);
        }
    };

    const backdropClick = (e) => {
        if (!containsClick(e, ".confirm-modal") && !containsClick(e, ".edit-modal")) {
            setIsDeleteMode(false);
            setIsEditOpen(false);
            setIsConfirmOpen(false);
        }
    };
    return { taskMouseDown, taskMouseUp, containsClick, offMenuClick, backdropClick };
};

export default useHandleClicks;
