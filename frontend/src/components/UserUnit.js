import { useNavigate } from "react-router-dom";
import { IoPerson, IoPersonOutline, IoCaretDown, IoCaretUp } from "react-icons/io5";
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
        <div className="relative">
            <div onClick={handleClick} className="relative flex items-center px-2 py-1 bg-white hover:text-white hover:bg-gray-400 hover:border-gray-400 hover:drop-shadow-md border-[1px] rounded-3xl border-black cursor-pointer z-20">
                {user ? (
                    <IoPerson className="mr-1 p-1 rounded-full bg-gray-300 text-[1.5rem] -translate-x-[4px]" />
                ) : (
                    <IoPersonOutline className="mr-1 p-1 rounded-full bg-gray-300 text-[1.5rem] -translate-x-[4px]" />
                )}
                <span>
                    {user ? user : "Log In"}
                </span>
                {user &&
                    (isDropdownActive ? (
                        <IoCaretUp className={"ml-1 translate-y-[2px]"} />
                    ) : (
                        <IoCaretDown className={"ml-1 translate-y-[2px]"} />
                    ))}
            </div>
            {isDropdownActive && (
                <div className="absolute flex flex-col justify-end top-1/2 left-0 w-full bg-gray-200 rounded-bl-2xl rounded-br-2xl text-sm drop-shadow-lg z-10">
                    <ul className="block w-full p-2 mt-12">
                        <li
                            onClick={handleLogOut}
                            className="cursor-pointer border-t-[1px] border-black"
                        >
                            Log Out
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserUnit;
