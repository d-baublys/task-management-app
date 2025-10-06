import React from "react";
import { containsClick } from "../../lib/misc-helpers";

interface Props {
    handleClick: () => void;
    children?: React.ReactNode;
    zIndex?: number;
    foregroundElementId?: string;
}

const DarkBackdrop = ({ handleClick, children, zIndex = 1000, foregroundElementId }: Props) => {
    const cascadeOffStates = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (foregroundElementId) {
            if (!containsClick(e, foregroundElementId)) {
                handleClick();
            }
        } else {
            handleClick();
        }
    };

    return (
        <div
            onClick={cascadeOffStates}
            className="backdrop absolute sm-500:fixed flex justify-center items-center top-0 left-0 w-full min-h-screen bg-black bg-opacity-50"
            style={{ zIndex: zIndex }}
        >
            {children}
        </div>
    );
};

export default DarkBackdrop;
