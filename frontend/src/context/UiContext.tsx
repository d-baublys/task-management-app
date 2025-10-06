import React, { useState, createContext, useContext } from "react";
import { toastHelper } from "../lib/misc-helpers";
import { StateSetter } from "../lib/definitions";

interface UiContextType {
    dragAllowed: boolean;
    setDragAllowed: StateSetter<boolean>;
    isDeleteMode: boolean;
    setIsDeleteMode: StateSetter<boolean>;
    modalPromise: ((value: boolean) => void) | null;
    setModalPromise: StateSetter<((value: boolean) => void) | null>;
    activeTaskId: number | null;
    setActiveTaskId: StateSetter<number | null>;
    notification: { icon: "success" | "failure"; message: string } | null;
    setNotification: StateSetter<{ icon: "success" | "failure"; message: string } | null>;
    isToastOpen: boolean;
    setIsToastOpen: StateSetter<boolean>;
    showToast: (icon: "success" | "failure", message: string) => void;
    loading: boolean;
    setLoading: StateSetter<boolean>;
}

const UiContext = createContext<UiContextType | undefined>(undefined);

export const UiProvider = ({
    children,
    overrides,
}: {
    children: React.ReactNode;
    overrides?: Partial<UiContextType>;
}) => {
    const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);
    const [modalPromise, setModalPromise] = useState<((value: boolean) => void) | null>(null);
    const [notification, setNotification] = useState<{
        icon: "success" | "failure";
        message: string;
    } | null>(null);
    const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
    const [dragAllowed, setDragAllowed] = useState<boolean>(false);
    const [activeTaskId, setActiveTaskId] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const showToast = toastHelper({ setNotification, setIsToastOpen });

    return (
        <UiContext.Provider
            value={{
                dragAllowed,
                setDragAllowed,
                modalPromise,
                setModalPromise,
                isDeleteMode,
                setIsDeleteMode,
                activeTaskId,
                setActiveTaskId,
                notification,
                setNotification,
                isToastOpen,
                setIsToastOpen,
                showToast,
                loading,
                setLoading,
                ...overrides,
            }}
        >
            {children}
        </UiContext.Provider>
    );
};

const useUiContext = () => {
    const context = useContext(UiContext);

    if (!context) {
        throw new Error("No context in UI provider.");
    }

    return context;
};

export default useUiContext;
