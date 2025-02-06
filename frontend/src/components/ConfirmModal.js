import { useContext } from "react";
import AppContext from "../context/AppContext";
import ModalButton from "./base/ModalButton";

const ConfirmModal = () => {
    const { modalPromise, setIsConfirmOpen } = useContext(AppContext);

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
            className="flex flex-col justify-center items-center rounded-2xl bg-gray-500"
            style={{ width: "var(--modal-width)", height: "calc(var(--modal-height) / 2)" }}
        >
            <p className="mb-8 text-white">Are you sure you want to delete this task?</p>
            <div className="flex justify-between w-1/2 h-1/4 gap-8">
                <ModalButton onClick={handleConfirm}>Confirm</ModalButton>
                <ModalButton type={"reset"} onClick={handleCancel}>
                    Cancel
                </ModalButton>
            </div>
        </div>
    );
};

export default ConfirmModal;
