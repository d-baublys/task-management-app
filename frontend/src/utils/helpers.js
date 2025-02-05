let timer = null;

export const taskMouseDown = (id, isDeleteMode, setActiveTaskId, setDraggable) => {
    clearTimeout(timer);
    setActiveTaskId(id);
    isDeleteMode ? setDraggable(true) : (timer = setTimeout(() => setDraggable(true), 100));
};

export const taskMouseUp = (
    draggable,
    setDraggable,
    activeTaskId,
    setActiveTaskId,
    setIsEditOpen
) => {
    if (!draggable && activeTaskId) {
        setIsEditOpen(true);
    } else if (draggable) {
        setActiveTaskId(null);
    }
    clearTimeout(timer);
    setDraggable(false);
};

export const containsClick = (e, clsName) => {
    const element = document.querySelector(clsName);
    return element ? element.contains(e.target) : false;
};

export const offMenuClick = (e, showAddPrompt, setShowAddPrompt) => {
    if (showAddPrompt && !containsClick(e, ".add-menu")) {
        setShowAddPrompt(false);
    }
};

export const backdropClick = (e, setIsDeleteMode, setIsConfirmOpen, setIsEditOpen) => {
    if (!containsClick(e, ".confirm-modal") && !containsClick(e, ".edit-modal")) {
        setIsDeleteMode(false);
        setIsEditOpen(false);
        setIsConfirmOpen(false);
    }
};
