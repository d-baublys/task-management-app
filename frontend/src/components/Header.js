import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="flex justify-evenly items-center w-full h-32 bg-green-600 shrink-0">
            <div className="h-full flex-1"></div>
            <div className="flex justify-center items-center w-2/3 h-full text-3xl">
                DB's Task Management App
            </div>
            <div className="flex justify-end items-center flex-1 h-full">
                <span className="text-lg">
                    <FontAwesomeIcon icon={faUser} className="px-2"></FontAwesomeIcon>
                    <span onClick={handleLogOut} className="cursor-pointer">
                        Log Out
                    </span>
                </span>
            </div>
        </div>
    );
};

export default Header;
