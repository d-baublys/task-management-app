import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BaseButton = ({ onClick, dropRef, isOver, icon, zIndex = 10}) => {
    return (
        <button
            onClick={onClick}
            ref={dropRef}
            className={`sticky flex justify-center items-center w-full rounded-2xl  hover:bg-slate-300 ${
                isOver ? "bg-slate-300" : "bg-slate-400"
            }`}
            style={{ top: "var(--board-btn-top)", height: "var(--board-btn-spacing)", zIndex: zIndex}}
        >
            <FontAwesomeIcon className="m-2 text-white size-8" icon={icon} />
        </button>
    );
};

export default BaseButton;
