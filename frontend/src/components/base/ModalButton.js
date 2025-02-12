const ModalButton = ({ children, type = "button", onClick, className }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`rounded-md w-40 h-16 bg-white hover:opacity-80 active:opacity-80 font-medium text-lg text-gray-500 ${className}`}
        >
            {children}
        </button>
    );
};

export default ModalButton;
