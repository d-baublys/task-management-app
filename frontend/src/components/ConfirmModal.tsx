import React, { useEffect } from "react";
import ModalButton from "./base/ModalButton";
import DarkBackdrop from "./base/DarkBackdrop";
import { BaseModalProps } from "./base/Modal";
import useUiContext from "../context/UiContext";

const ConfirmModal = ({ modalState, modalSetter }: BaseModalProps) => {
    const { modalPromise } = useUiContext();

    useEffect(() => {
        modalState
            ? (document.body.style.overflow = "hidden")
            : document.body.removeAttribute("style");

        return () => {
            document.body.removeAttribute("style");
        };
    }, [modalState]);

    const handleConfirm = () => {
        modalPromise?.(true);
        modalSetter(false);
    };

    const handleCancel = () => {
        modalPromise?.(false);
        modalSetter(false);
    };

    const elementId = "confirm-modal";

    return (
        <DarkBackdrop handleClick={handleCancel} foregroundElementId={elementId}>
            <div
                id={elementId}
                className="flex flex-col justify-center items-center w-modal-spacing-sm md:w-modal-spacing h-confirm-height-sm md:h-confirm-height rounded-2xl bg-gray-100 drop-shadow-modal"
            >
                <p>Are you sure you want to delete this task?</p>
                <div className="flex justify-between h-1/4 gap-6 md:gap-12 mt-8">
                    <ModalButton onClick={handleConfirm}>Confirm</ModalButton>
                    <ModalButton onClick={handleCancel}>Cancel</ModalButton>
                </div>
            </div>
        </DarkBackdrop>
    );
};

export default ConfirmModal;
