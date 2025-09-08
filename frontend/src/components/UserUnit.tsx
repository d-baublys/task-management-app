import { useNavigate } from "react-router";
import { IoPerson, IoPersonOutline, IoCaretUp } from "react-icons/io5";
import React from "react";
import Dropdown from "./Dropdown";
import useAppContext from "../context/AppContext";

const UserUnit = () => {
    const { isAuthenticated, isDropdownActive, setIsDropdownActive, user } = useAppContext();
    const navigate = useNavigate();

    const handleClick = () => {
        if (isAuthenticated) {
            setIsDropdownActive((prev) => !prev);
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="relative">
            <button
                data-testid="nav-action-button"
                onClick={handleClick}
                className="relative flex items-center px-2 py-1 bg-gray-300 group hover:bg-gray-400 hover:drop-shadow-md rounded-3xl transition cursor-pointer z-20"
            >
                <div className="rounded-full mr-1 p-1 bg-white -translate-x-[4px]">
                    {isAuthenticated ? <IoPerson /> : <IoPersonOutline />}
                </div>
                <span
                    className={`group-hover:text-white whitespace-nowrap ${
                        !isAuthenticated && "pr-1"
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
            <Dropdown />
        </div>
    );
};

export default UserUnit;
