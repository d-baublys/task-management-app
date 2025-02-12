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
        <div className="flex flex-col items-end h-8 text-lg">
            <div className="flex items-center min-h-full">
                {user ? <IoPerson className="mr-2" /> : <IoPersonOutline className="mr-2" />}
                <span onClick={handleClick} className="cursor-pointer">
                    {user ? user : "Log In"}
                </span>
                {user &&
                    (isDropdownActive ? (
                        <IoCaretDown className={"ml-1 translate-y-[3px]"} />
                    ) : (
                        <IoCaretUp className={"ml-1 translate-y-[3px]"} />
                    ))}
            </div>
            {isDropdownActive && (
                <div className="mt-4 bg-yellow-400 z-50 rounded-sm">
                    <ul className="block w-32 h-12 px-2 py-1">
                        <li onClick={handleLogOut} className="cursor-pointer">
                            Log Out
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserUnit;
