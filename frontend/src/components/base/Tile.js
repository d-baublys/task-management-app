import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import AppContext from "../../context/AppContext";

const Tile = ({ isDragging, description, dueDate }) => {
    const { isDeleteMode } = useContext(AppContext);

    return (
        <div
            className={`w-full bg-red-500 p-2 rounded-lg break-all ${
                isDragging ? "opacity-50" : ""
            } ${isDragging || isDeleteMode ? "cursor-move" : "cursor-pointer"}`}
        >
            <div className={`w full px-2 py-1 rounded-md bg-white`}>{description}</div>
            <div className="mt-2 text-white">
                <span>
                    <FontAwesomeIcon className="pr-2" icon={faCalendarAlt}></FontAwesomeIcon>
                    {format(new Date(dueDate), "LLLL do")}
                </span>
            </div>
        </div>
    );
};

export default Tile;
