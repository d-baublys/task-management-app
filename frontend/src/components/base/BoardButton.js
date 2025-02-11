import * as FaIcons from "react-icons/fa";

const BoardButton = ({ onClick, dropRef, isOver, iconName, zIndex = 10 }) => {
    const Icon = FaIcons[iconName];

    return (
        <button
            onClick={onClick}
            ref={dropRef}
            className={`sticky flex justify-center items-center rounded-full hover:drop-shadow-md active:drop-shadow-md hover:bg-slate-300 ${
                isOver ? "bg-slate-300 drop-shadow-md" : "bg-slate-400"
            }`}
            style={{
                top: "var(--board-btn-top)",
                width: "var(--board-btn-spacing)",
                height: "var(--board-btn-spacing)",
                zIndex: zIndex,
            }}
        >
            <Icon className="m-2 text-white size-8" />
        </button>
    );
};

export default BoardButton;
