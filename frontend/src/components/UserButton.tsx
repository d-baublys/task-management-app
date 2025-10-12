import { useNavigate } from "react-router";
import { IoPerson, IoPersonOutline, IoCaretUp } from "react-icons/io5";
import React, { useState } from "react";
import Dropdown from "./Dropdown";
import useAuthContext from "../context/AuthContext";
import HeaderButton from "./base/HeaderButton";

const UserButton = () => {
    const [isDropdownActive, setIsDropdownActive] = useState<boolean>(false);

    const { isAuthenticated, user } = useAuthContext();
    const navigate = useNavigate();

    const handleClick = () => {
        if (isAuthenticated) {
            setIsDropdownActive((prev) => !prev);
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="relative max-w-[11.25rem] lg:max-w-[16rem] xl:max-w-[20rem]">
            <HeaderButton data-testid="nav-action-button" onClick={handleClick}>
                <div className="rounded-full p-1 bg-bare-base fixed-text-color">
                    {isAuthenticated ? <IoPerson /> : <IoPersonOutline />}
                </div>
                <span
                    className={`hidden xs:block pl-2 group-hover:text-white dark:group-hover:text-gray-mid theme-transition-all overflow-ellipsis whitespace-nowrap overflow-hidden ${
                        !isAuthenticated ? "pr-2" : ""
                    }`}
                >
                    {isAuthenticated ? user : "Log In"}
                </span>
                {isAuthenticated && (
                    <div className="px-1">
                        <div
                            className={`translate-y-[1px] group-hover:text-white dark:group-hover:text-gray-mid theme-transition-all ${
                                isDropdownActive ? "rotate-0" : "rotate-180"
                            }`}
                        >
                            <IoCaretUp />
                        </div>
                    </div>
                )}
            </HeaderButton>
            <Dropdown dropdownState={isDropdownActive} dropdownSetter={setIsDropdownActive} />
        </div>
    );
};

export default UserButton;
