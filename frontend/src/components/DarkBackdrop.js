import { useContext } from "react";
import AppContext from "../context/AppContext";

const DarkBackdrop = ({ children, zIndex }) => {
    const { setIsDeleteMode, setIsConfirmOpen, setIsEditOpen } = useContext(AppContext);

    const handleClick = () => {
        setIsDeleteMode(false);
        setIsConfirmOpen(false);
        // setIsEditOpen(false);
    };
    return (
        <div
            onClick={handleClick}
            className="fixed flex justify-center items-center top-0 left-0 w-full h-full bg-black bg-opacity-50"
            style={{ zIndex: zIndex }}
        >
            {children}
        </div>
    );
};

export default DarkBackdrop;
