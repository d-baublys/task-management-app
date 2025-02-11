import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import AppContext from "../context/AppContext";

const UserUnit = () => {
    const [isDropdownActive, setIsDropdownActive] = useState(false);

    const { user, setUser, logout } = useContext(AppContext);
    const navigate = useNavigate();

    const handleClick = () => {
        if (user) {
            setIsDropdownActive((prev) => !prev);
        } else {
            navigate("/login");
        }
    };

    const handleLogOut = () => {
        logout();
        navigate("/login");
        setUser(null);
    };

    return (
        <div className="flex flex-col items-end h-8 text-lg">
            <span>
                <FontAwesomeIcon icon={faUser} className="px-2"></FontAwesomeIcon>
                <span onClick={handleClick} className="cursor-pointer">
                    {user ? user : "Log In"}
                </span>
            </span>
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
