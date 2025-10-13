import React, { useState } from "react";
import useThemeContext from "../context/ThemeContext";
import { IoMoon, IoSunny } from "react-icons/io5";
import HeaderButton from "./base/HeaderButton";
import { ThemeOptions } from "../lib/definitions";

export default function ThemeButton() {
    const { theme, toggleTheme } = useThemeContext();
    const [isAnimated, setIsAnimated] = useState<boolean>(false);

    const durationVar = window
        .getComputedStyle(document.body)
        .getPropertyValue("--duration-colors");

    if (!durationVar)
        throw new Error("Theme button: Color transition duration CSS variable not found.");

    const duration = parseInt(durationVar);

    const handleClick = () => {
        if (isAnimated) return;

        setIsAnimated(true);
        toggleTheme();

        setTimeout(() => {
            setIsAnimated(false);
        }, duration);
    };

    const generateIconClasses = (iconTheme: ThemeOptions) =>
        `absolute transition-opacity duration-[var(--duration-extended)] ease-in-out ${
            theme === iconTheme ? "opacity-100" : "opacity-0"
        } ${iconTheme === "dark" ? "text-gray-mid" : "text-bare-base"}`;

    return (
        <HeaderButton onClick={handleClick}>
            <div
                className={`relative flex h-full justify-center items-center aspect-square border border-black [border-radius:50%] p-1 cursor-pointer theme-transition ${
                    theme === "light" ? "bg-gray-mid" : "bg-bare-base"
                } ${isAnimated ? "animate-[spin_var(--duration-colors)_ease-in-out_1]" : ""}`}
            >
                <IoMoon className={generateIconClasses("light")} />
                <IoSunny className={generateIconClasses("dark")} />
            </div>
        </HeaderButton>
    );
}
