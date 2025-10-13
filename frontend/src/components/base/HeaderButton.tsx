import React from "react";

interface HeaderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function HeaderButton({ children, ...props }: HeaderButtonProps) {
    return (
        <button
            type="button"
            className="relative flex shrink-0 items-center p-1 max-w-full h-full bg-gray-300 dark:bg-gray-600 group hover:bg-gray-400 dark:hover:bg-gray-400 dark:text-gray-light hover:drop-shadow-md rounded-3xl theme-transition-all cursor-pointer z-20"
            {...props}
        >
            {children}
        </button>
    );
}
