import { useContext } from "react";
import AppContext from "../context/AppContext";
import { backdropClick } from "../utils/helpers";

const DarkBackdrop = ({ children, zIndex }) => {
    const { setIsDeleteMode, setIsConfirmOpen, setIsEditOpen } = useContext(AppContext);

    return (
        <div
            onClick={(e) => backdropClick(e, setIsDeleteMode, setIsConfirmOpen, setIsEditOpen)}
            className="backdrop fixed flex justify-center items-center top-0 left-0 w-full h-full bg-black bg-opacity-50"
            style={{ zIndex: zIndex }}
        >
            {children}
        </div>
    );
};

export default DarkBackdrop;
