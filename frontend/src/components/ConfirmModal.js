import { useContext } from "react";
import AppContext from "../context/AppContext";

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
            className="flex flex-col justify-center items-center rounded-2xl bg-white"
            style={{ width: "var(--modal-width)", height: "var(--modal-height)" }}
        >
            <p className="mb-8">Are you sure you want to delete this task?</p>
            <div className="flex justify-between w-1/2 h-1/4">
                <button
                    onClick={handleConfirm}
                    className="w-24 rounded-xl bg-slate-400 hover:bg-slate-300"
                >
                    Confirm
                </button>
                <button
                    onClick={handleCancel}
                    className="w-24 rounded-xl bg-slate-400 hover:bg-slate-300"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ConfirmModal;
