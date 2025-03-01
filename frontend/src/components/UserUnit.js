import { useNavigate } from "react-router-dom";
import { IoPerson, IoPersonOutline, IoCaretUp } from "react-icons/io5";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import Dropdown from "./Dropdown";

const UserUnit = () => {
    const { isAuthenticated, isDropdownActive, setIsDropdownActive, user } = useContext(AppContext);
    const navigate = useNavigate();

    const handleClick = () => {
        if (isAuthenticated) {
            setIsDropdownActive((prev) => !prev);
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="relative text-gray-600">
            <div
                onClick={handleClick}
                className="relative flex items-center px-2 py-1 bg-gray-300 group hover:bg-gray-400 hover:drop-shadow-md rounded-3xl text-base transition cursor-pointer z-20"
            >
                <div className="rounded-full mr-1 p-1 bg-white -translate-x-[4px]">
                    {isAuthenticated ? <IoPerson /> : <IoPersonOutline />}
                </div>
                <span className="group-hover:text-white">{isAuthenticated ? user : "Log In"}</span>
                {isAuthenticated && (
                    <div
                        className={`ml-1 translate-y-[1px] group-hover:text-white transition ${
                            isDropdownActive ? "rotate-0" : "rotate-180"
                        }`}
                    >
                        <IoCaretUp />
                    </div>
                )}
            </div>
            <Dropdown />
        </div>
    );
};

export default UserUnit;
