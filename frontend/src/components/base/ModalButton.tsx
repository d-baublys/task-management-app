import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    customDimensions?: string;
}

const ModalButton = ({
    children,
    type = "button",
    onClick,
    disabled,
    customDimensions,
    ...props
}: Props) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`rounded-md bg-gray-500 hover:opacity-80 active:opacity-80 font-medium text-base md:text-lg text-gray-lighter dark:text-gray-light theme-transition ${
                customDimensions ? customDimensions : "w-36 md:w-40 h-12 md:h-16"
            }`}
            {...props}
        >
            {children}
        </button>
    );
};

export default ModalButton;
