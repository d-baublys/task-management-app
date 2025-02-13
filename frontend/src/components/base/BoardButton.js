import * as FaIcons from "react-icons/fa";

const BoardButton = ({ onClick, dropRef, isOver, iconName, zIndex = 10 }) => {
    const Icon = FaIcons[iconName];

    return (
        <button
            onClick={onClick}
            ref={dropRef}
            className={`sticky flex justify-center items-center top-board-btn-top w-board-btn-spacing h-board-btn-spacing rounded-full hover:drop-shadow-md active:drop-shadow-md hover:bg-theme-lighter ${
                isOver ? "bg-theme-lighter drop-shadow-md" : "bg-theme-light"
            }`}
            style={{
                zIndex: zIndex,
            }}
        >
            <Icon className="m-2 text-white size-8" />
        </button>
    );
};

export default BoardButton;
