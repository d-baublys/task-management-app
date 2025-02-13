import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import ModalButton from "./base/ModalButton";

const ConfirmModal = () => {
    const { modalPromise, isConfirmOpen, setIsConfirmOpen } = useContext(AppContext);

    useEffect(() => {
        isConfirmOpen
            ? (document.body.style.overflow = "hidden")
            : document.body.removeAttribute("style");

        return () => {
            document.body.removeAttribute("style");
        };
    }, [isConfirmOpen]);

    const handleConfirm = () => {
        modalPromise(true);
        setIsConfirmOpen(false);
    };

    const handleCancel = () => {
        modalPromise(false);
        setIsConfirmOpen(false);
    };

    return (
        <div
            id="confirm-modal"
            className="flex flex-col justify-center items-center w-modal-width h-confirm-height rounded-2xl bg-gray-500 drop-shadow-modal"
        >
            <p className="mb-8 text-white">Are you sure you want to delete this task?</p>
            <div className="flex justify-between w-1/2 h-1/4 gap-8">
                <ModalButton onClick={handleConfirm}>Confirm</ModalButton>
                <ModalButton onClick={handleCancel}>Cancel</ModalButton>
            </div>
        </div>
    );
};

export default ConfirmModal;
