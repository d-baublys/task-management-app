const DarkBackdrop = ({ children, zIndex }) => {
    return (
        <div className="fixed flex justify-center items-center top-0 left-0 w-full h-full bg-black bg-opacity-50" style={{ zIndex: zIndex }}>
            {children}
        </div>
    );
};

export default DarkBackdrop;
