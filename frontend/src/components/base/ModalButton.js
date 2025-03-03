const ModalButton = ({ children, type = "button", onClick, customDimensions }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`rounded-md bg-gray-500 hover:opacity-80 active:opacity-80 font-medium text-base md:text-lg text-gray-100 ${
                customDimensions ? customDimensions : "w-36 md:w-40 h-12 md:h-16"
            }`}
        >
            {children}
        </button>
    );
};

export default ModalButton;
