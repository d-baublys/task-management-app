const ModalButton = ({ children, type, onClick }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className="rounded-md w-40 h-16 bg-white hover:opacity-80 active:opacity-80 font-semibold text-lg text-gray-500"
        >
            {children}
        </button>
    );
};

export default ModalButton;
