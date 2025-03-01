import { useContext } from "react";
import useHandleClicks from "../../hooks/useHandleClicks";
import AppContext from "../../context/AppContext";

const DarkBackdrop = ({ children, zIndex }) => {
    const { isAddOpen, isEditOpen } = useContext(AppContext);
    const { backdropClick } = useHandleClicks();

    return (
        <div
            onClick={(e) => backdropClick(e)}
            className="backdrop absolute sm-500:fixed flex justify-center items-center top-0 left-0 w-full h-screen bg-black bg-opacity-50"
            style={{ zIndex: zIndex, minHeight: (isEditOpen || isAddOpen) && "500px" }}
        >
            {children}
        </div>
    );
};

export default DarkBackdrop;
