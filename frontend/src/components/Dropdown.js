import { useContext } from "react";
import AppContext from "../context/AppContext";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Dropdown = () => {
    const { logout, isDropdownActive, setIsDropdownActive } = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogOut = async () => {
        await logout();
        setIsDropdownActive(false);
        navigate("/login");
    };

    return (
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
    );
};

export default Dropdown;
