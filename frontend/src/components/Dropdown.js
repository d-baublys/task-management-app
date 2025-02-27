import { useContext } from "react";
import AppContext from "../context/AppContext";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Dropdown = () => {
    const { logout, isDropdownActive, setIsDropdownActive, showToast } = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            setIsDropdownActive(false);
            await logout();
            navigate("/login");
            showToast("success", "Log out successful!");
        } catch (error) {
            console.error("Error logging out: ", error);
            showToast("failure", "Error logging out!");
        }
    };

    return (
        <>
            <svg
                width="0"
                height="0"
                style={{ "--menu-width": "9rem", "--menu-height": "6rem", "--menu-radius": "1rem" }}
            >
                <defs>
                    <clipPath id="clipped">
                        <circle
                            cx="var(--menu-radius)"
                            cy="calc(var(--menu-radius) * 2)"
                            r="var(--menu-radius)"
                        ></circle>
                        <circle
                            cx="var(--menu-radius)"
                            cy="calc(var(--menu-height) - var(--menu-radius))"
                            r="var(--menu-radius)"
                        ></circle>
                        <circle
                            cx="calc(var(--menu-width) - var(--menu-radius))"
                            cy="calc(var(--menu-height) - var(--menu-radius))"
                            r="var(--menu-radius)"
                        ></circle>
                        <rect
                            y="calc(var(--menu-radius) * 2)"
                            width="var(--menu-width)"
                            height="calc(var(--menu-height) - (3 * var(--menu-radius)))"
                        ></rect>
                        <rect
                            x="var(--menu-radius)"
                            y="var(--menu-radius)"
                            width="calc(var(--menu-width) - (2 * var(--menu-radius)))"
                            height="calc(var(--menu-height) - var(--menu-radius))"
                        ></rect>
                        <rect
                            x="calc(var(--menu-width) / 3 * 2)"
                            width="calc(var(--menu-width) / 3)"
                            height="calc(var(--menu-height) - var(--menu-radius))"
                        ></rect>
                    </clipPath>
                </defs>
            </svg>
            <div className="absolute top-1/2 right-0 drop-shadow-lg z-10">
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
                                    Log Out
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
