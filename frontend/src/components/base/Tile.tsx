import { format } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";
import React from "react";
import useUiContext from "../../context/UiContext";

interface Props {
    isDragging: boolean;
    description: string;
    dueDate: string;
    width?: number;
}

const Tile = ({ isDragging, description, dueDate, width }: Props) => {
    const { isDeleteMode } = useUiContext();

    return (
        <div
            className={`tile bg-light-theme-dark dark:bg-dark-theme-light theme-transition p-2 drop-shadow-md select-none touch-none ${
                isDragging ? "opacity-50" : "hover:opacity-80"
            } ${isDragging || isDeleteMode ? "cursor-move" : "cursor-pointer"}`}
            style={{ width: width ? `${width}px` : "100%" }}
        >
            <div className={`task-description w full px-2 py-1 bg-bare-base dark:bg-gray-mid dark:text-gray-light theme-transition`}>{description}</div>
            <div className="mt-2 text-gray-lighter">
                <div className="flex items-center">
                    <FaCalendarAlt className="inline pr-2 text-xl md:text-[1.33rem]" />
                    <span className="task-due-date">{format(new Date(dueDate), "LLL d")}</span>
                </div>
            </div>
        </div>
    );
};

export default Tile;
