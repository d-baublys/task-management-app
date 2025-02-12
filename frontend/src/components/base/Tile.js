import { format } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";
import { useContext } from "react";
import AppContext from "../../context/AppContext";

const Tile = ({ isDragging, description, dueDate }) => {
    const { isDeleteMode } = useContext(AppContext);

    return (
        <div
            className={`w-full bg-[--theme-dark] p-2 break-all ${
                isDragging ? "opacity-50" : "hover:opacity-80"
            } ${isDragging || isDeleteMode ? "cursor-move" : "cursor-pointer"}`}
        >
            <div className={`w full px-2 py-1 bg-white`}>{description}</div>
            <div className="mt-2 text-white">
                <div className="flex items-center">
                    <FaCalendarAlt className="inline pr-2 text-[1.33rem]" />
                    <span>{format(new Date(dueDate), "LLLL do")}</span>
                </div>
            </div>
        </div>
    );
};

export default Tile;
