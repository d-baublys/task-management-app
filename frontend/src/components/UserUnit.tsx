import { useNavigate } from "react-router";
import { IoPerson, IoPersonOutline, IoCaretUp } from "react-icons/io5";
import React, { useState } from "react";
import Dropdown from "./Dropdown";
import useAuthContext from "../context/AuthContext";

const UserUnit = () => {
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
            <button
                data-testid="nav-action-button"
                onClick={handleClick}
                className="relative flex items-center px-2 py-1 max-w-full bg-gray-300 group hover:bg-gray-400 hover:drop-shadow-md rounded-3xl transition cursor-pointer z-20"
            >
                <div className="rounded-full mr-1 p-1 bg-white -translate-x-[4px]">
                    {isAuthenticated ? <IoPerson /> : <IoPersonOutline />}
                </div>
                <span
                    className={`group-hover:text-white overflow-ellipsis whitespace-nowrap overflow-hidden ${
                        !isAuthenticated ? "pr-1" : ""
                    }`}
                >
                    {isAuthenticated ? user : "Log In"}
                </span>
                {isAuthenticated && (
                    <div
                        className={`ml-1 translate-y-[1px] group-hover:text-white transition ${
                            isDropdownActive ? "rotate-0" : "rotate-180"
                        }`}
                    >
                        <IoCaretUp />
                    </div>
                )}
            </button>
            <Dropdown dropdownState={isDropdownActive} dropdownSetter={setIsDropdownActive} />
        </div>
    );
};

export default UserUnit;
