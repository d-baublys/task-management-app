export const offMenuClick = (e, showAddPrompt, setShowAddPrompt) => {
    if (showAddPrompt && !document.querySelector(".add-menu").contains(e.target)) {
        setShowAddPrompt(false);
    }
};
