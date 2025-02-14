import { useNavigate } from "react-router-dom";
import { IoPerson, IoPersonOutline, IoCaretUp, IoLogOut } from "react-icons/io5";
import { useContext, useState } from "react";
import AppContext from "../context/AppContext";

const UserUnit = () => {
    const [isDropdownActive, setIsDropdownActive] = useState(false);

    const { user, logout } = useContext(AppContext);
    const navigate = useNavigate();

    const handleClick = () => {
        if (user) {
            setIsDropdownActive((prev) => !prev);
        } else {
            navigate("/login");
        }
    };

    const handleLogOut = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div className="relative text-gray-600">
            <div
                onClick={handleClick}
                className="relative flex items-center px-2 py-1 bg-gray-300 group hover:bg-gray-400 hover:drop-shadow-md rounded-3xl text-sm transition cursor-pointer z-20"
            >
                <div className="rounded-full mr-1 p-1 bg-white -translate-x-[4px]">
                    {user ? <IoPerson /> : <IoPersonOutline />}
                </div>
                <span className="group-hover:text-white">{user ? user : "Log In"}</span>
                {user && (
                    <div
                        className={`ml-1 translate-y-[1px] group-hover:text-white transition ${
                            isDropdownActive ? "rotate-0" : "rotate-180"
                        }`}
                    >
                        <IoCaretUp />
                    </div>
                )}
            </div>
            <div
                className={`absolute flex flex-col justify-end top-1/2 right-0 w-36 min-h-24 bg-theme-light rounded-tl-2xl rounded-bl-2xl rounded-br-2xl text-sm transition duration-200 ease-in-out origin-top drop-shadow-lg z-10 ${
                    isDropdownActive ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                }`}
            >
                {isDropdownActive && (
                    <ul className="block w-full p-2">
                        <li
                            onClick={handleLogOut}
                            className="cursor-pointer border-t-[1px] border-gray-600"
                        >
                            <div className="flex items-center mt-1 hover:bg-theme-lighter">
                                <IoLogOut className="text-lg mr-2" />
                                Log Out
                            </div>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default UserUnit;
