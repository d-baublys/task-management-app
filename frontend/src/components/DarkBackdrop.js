import useHandleClicks from "../hooks/useHandleClicks";

const DarkBackdrop = ({ children, zIndex }) => {
    const { backdropClick } = useHandleClicks();

    return (
        <div
            onClick={(e) => backdropClick(e)}
            className="backdrop fixed flex justify-center items-center top-0 left-0 w-full h-full bg-black bg-opacity-50"
            style={{ zIndex: zIndex }}
        >
            {children}
        </div>
    );
};

export default DarkBackdrop;
