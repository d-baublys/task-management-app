import React from "react";
import { ConnectDropTarget } from "react-dnd";
import { IconType } from "react-icons";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    IconComponent: IconType;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    dropRef?: ConnectDropTarget;
    isOver?: boolean;
    zIndex?: number;
}

const BoardButton = ({ onClick, dropRef, isOver, IconComponent, zIndex = 10, ...props }: Props) => {
    return (
        <button
            onClick={onClick}
            ref={(el) => {
                dropRef?.(el);
            }}
            className={`sticky flex justify-center items-center top-board-btn-top w-board-btn-spacing-sm h-board-btn-spacing-sm lg:w-board-btn-spacing-lg lg:h-board-btn-spacing-lg xl:w-board-btn-spacing-xl xl:h-board-btn-spacing-xl rounded-full bg-button-gradient hover:scale-110 hover:opacity-80 hover:drop-shadow-md active:drop-shadow-md transition ${
                isOver && "opacity-80 drop-shadow-md scale-110"
            }`}
            style={{
                zIndex: zIndex,
            }}
            {...props}
        >
            <IconComponent className="m-2 text-white text-2xl lg:text-[2rem] xl:text-[2.5rem]" />
        </button>
    );
};

export default BoardButton;
