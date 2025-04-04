import React, { useEffect } from "react";
import ModalButton from "./base/ModalButton";
import useAppContext from "../context/AppContext";

const ConfirmModal = () => {
    const { modalPromise, isConfirmOpen, setIsConfirmOpen } = useAppContext();

    useEffect(() => {
        isConfirmOpen
            ? (document.body.style.overflow = "hidden")
            : document.body.removeAttribute("style");

        return () => {
            document.body.removeAttribute("style");
        };
    }, [isConfirmOpen]);

    const handleConfirm = () => {
        modalPromise?.(true);
        setIsConfirmOpen(false);
    };

    const handleCancel = () => {
        modalPromise?.(false);
        setIsConfirmOpen(false);
    };

    return (
        <div
            id="confirm-modal"
            className="flex flex-col justify-center items-center w-modal-spacing-sm md:w-modal-spacing h-confirm-height-sm md:h-confirm-height rounded-2xl bg-gray-100 drop-shadow-modal"
        >
            <p>Are you sure you want to delete this task?</p>
            <div className="flex justify-between h-1/4 gap-6 md:gap-12 mt-8">
                <ModalButton onClick={handleConfirm}>Confirm</ModalButton>
                <ModalButton onClick={handleCancel}>Cancel</ModalButton>
            </div>
        </div>
    );
};

export default ConfirmModal;
