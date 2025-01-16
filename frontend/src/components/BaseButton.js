import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BaseButton = ({ onClick, dropRef, icon }) => {
    return (
        <button
            onClick={onClick}
            ref={dropRef}
            className={`sticky flex justify-center items-center w-full rounded-2xl bg-slate-400`}
            style={{ top: "var(--board-btn-top)", height: "var(--board-btn-spacing)" }}
        >
            <FontAwesomeIcon className="m-2 text-white size-8" icon={icon} />
        </button>
    );
};

export default BaseButton;
