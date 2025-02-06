import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BoardButton = ({ onClick, dropRef, isOver, icon, zIndex = 10 }) => {
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
            <FontAwesomeIcon className="m-2 text-white size-8" icon={icon} />
        </button>
    );
};

export default BoardButton;
