import { useNavigate } from "react-router-dom";
import { IoPerson, IoPersonOutline, IoCaretUp } from "react-icons/io5";
import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import Dropdown from "./Dropdown";

const UserUnit = () => {
    const [isDropdownActive, setIsDropdownActive] = useState(false);

    const { user } = useContext(AppContext);
    const navigate = useNavigate();

    const handleClick = () => {
        if (user) {
            setIsDropdownActive((prev) => !prev);
        } else {
            navigate("/login");
        }
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
            <Dropdown
                navigate={navigate}
                isDropdownActive={isDropdownActive}
                setIsDropdownActive={setIsDropdownActive}
            />
        </div>
    );
};

export default UserUnit;
