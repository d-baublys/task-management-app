import { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import AppContext from "../context/AppContext";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Dropdown = () => {
    const { logout, isDropdownActive, showToast } = useContext(AppContext);
    const navigate = useNavigate();

    const isDesktop = useMediaQuery({ minWidth: 768 });

    const handleLogOut = async () => {
        try {
            await logout();
            navigate("/login");
            showToast("success", "Log out successful!");
        } catch (error) {
            console.error("Error logging out: ", error);
            showToast("failure", "Error logging out!");
        }
    };

    const menuWidth = 16 * 9;
    const menuHeight = 16 * 6;
    const menuRadius = 16 * (isDesktop ? 1 : 30 / 32);

    return (
        <>
            <svg width="0" height="0">
                <defs>
                    <clipPath id="clipped">
                        <circle cx={menuRadius} cy={menuRadius * 2} r={menuRadius}></circle>
                        <circle
                            cx={menuRadius}
                            cy={menuHeight - menuRadius}
                            r={menuRadius}
                        ></circle>
                        <circle
                            cx={menuWidth - menuRadius}
                            cy={menuHeight - menuRadius}
                            r={menuRadius}
                        ></circle>
                        <rect
                            y={menuRadius * 2}
                            width={menuWidth}
                            height={menuHeight - 3 * menuRadius}
                        ></rect>
                        <rect
                            x={menuRadius}
                            y={menuRadius}
                            width={menuWidth - 2 * menuRadius}
                            height={menuHeight - menuRadius}
                        ></rect>
                        <rect
                            x={(menuWidth / 3) * 2}
                            width={menuWidth / 3}
                            height={menuHeight - menuRadius}
                        ></rect>
                    </clipPath>
                </defs>
            </svg>
            <div className="absolute top-1/2 right-0 drop-shadow-dropdown will-change-[filter] z-10">
                <div
                    className={`clipped flex flex-col justify-end w-36 min-h-24 bg-theme-light text-sm transition duration-200 ease-in-out origin-[right_15%] ${
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
                                    <span>Log Out</span>
                                </div>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
};

export default Dropdown;
