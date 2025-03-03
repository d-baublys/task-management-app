import useHandleClicks from "../../hooks/useHandleClicks";

const DarkBackdrop = ({ children, zIndex }) => {
    const { backdropClick } = useHandleClicks();

    return (
        <div
            onClick={(e) => backdropClick(e)}
            className="backdrop absolute sm-500:fixed flex justify-center items-center top-0 left-0 w-full min-h-screen bg-black bg-opacity-50"
            style={{ zIndex: zIndex }}
        >
            {children}
        </div>
    );
};

export default DarkBackdrop;
