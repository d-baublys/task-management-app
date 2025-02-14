import * as FaIcons from "react-icons/fa";

const BoardButton = ({ onClick, dropRef, isOver, iconName, zIndex = 10 }) => {
    const Icon = FaIcons[iconName];

    return (
        <button
            onClick={onClick}
            ref={dropRef}
            className={`sticky flex justify-center items-center top-board-btn-top w-board-btn-spacing-sm h-board-btn-spacing-sm md:w-board-btn-spacing md:h-board-btn-spacing rounded-full mx-3 bg-button-gradient hover:scale-110 hover:opacity-80 hover:drop-shadow-md active:drop-shadow-md transition ${
                isOver && "opacity-80 drop-shadow-md scale-110"
            }`}
            style={{
                zIndex: zIndex,
            }}
        >
            <Icon className="m-2 text-white text-2xl md:text-[2rem]" />
        </button>
    );
};

export default BoardButton;
