import { format } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";
import { useContext } from "react";
import AppContext from "../../context/AppContext";

const Tile = ({ isDragging, description, dueDate, width }) => {
    const { isDeleteMode } = useContext(AppContext);

    return (
        <div
            className={`tile bg-theme-dark p-2 drop-shadow-md select-none touch-none ${
                isDragging ? "opacity-50" : "hover:opacity-80"
            } ${isDragging || isDeleteMode ? "cursor-move" : "cursor-pointer"}`}
            style={{ width: width ? `${width}px` : "100%" }}
        >
            <div className={`w full px-2 py-1 bg-white`}>{description}</div>
            <div className="mt-2 text-white">
                <div className="flex items-center">
                    <FaCalendarAlt className="inline pr-2 text-xl md:text-[1.33rem]" />
                    <span>{format(new Date(dueDate), "LLL d")}</span>
                </div>
            </div>
        </div>
    );
};

export default Tile;
