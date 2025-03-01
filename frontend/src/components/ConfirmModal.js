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
            className="flex flex-col justify-center items-center w-modal-width h-confirm-height rounded-2xl bg-gray-100 drop-shadow-modal"
        >
            <p className="text-gray-600">Are you sure you want to delete this task?</p>
            <div className="flex justify-between h-1/4 gap-4 sm:gap-8 mt-8">
                <ModalButton onClick={handleConfirm}>Confirm</ModalButton>
                <ModalButton onClick={handleCancel}>Cancel</ModalButton>
            </div>
        </div>
    );
};

export default ConfirmModal;
