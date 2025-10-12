import React from "react";
import UserButton from "./UserButton";
import ModeButton from "./ModeButton";

const Header = () => {
    return (
        <div className="flex justify-between items-center w-full h-32 shrink-0">
            <div className="flex justify-center items-center h-full text-base xs:text-xl md:!text-2xl lg:!text-3xl font-medium">
                DB's Task Management App
            </div>
            <div className="flex items-center flex-1 h-full">
                <div className="flex w-full h-[30px] md:h-8 justify-end items-center gap-4">
                    <ModeButton />
                    <UserButton />
                </div>
            </div>
        </div>
    );
};

export default Header;
