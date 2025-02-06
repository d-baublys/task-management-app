const ModalButton = ({ children, type, onClick }) => {
    return (
        <button type={type} onClick={onClick} className="rounded-md w-36 h-8 bg-white">
            {children}
        </button>
    );
};

export default ModalButton;
