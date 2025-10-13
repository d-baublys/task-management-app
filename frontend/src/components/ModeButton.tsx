import React, { useState } from "react";
import useThemeContext from "../context/ThemeContext";
import { IoMoon, IoSunny } from "react-icons/io5";
import HeaderButton from "./base/HeaderButton";
import { ThemeOptions } from "../lib/definitions";

export default function ModeButton() {
    const { theme, toggleTheme } = useThemeContext();
    const [isAnimated, setIsAnimated] = useState<boolean>(false);

    const duration = 300;

    const handleClick = () => {
        if (isAnimated) return;

        setIsAnimated(true);
        toggleTheme();

        setTimeout(() => {
            setIsAnimated(false);
        }, duration);
    };

    const animations = {
        buttonBackground: `transition-colors duration-300 ease-in-out`,
        iconOpacity: `transition-opacity duration-[450ms] ease-in-out`,
        iconSpin: `animate-[spin_300ms_ease-in-out_1]`,
    };

    const generateIconClasses = (iconTheme: ThemeOptions) =>
        `absolute ${animations["iconOpacity"]} ${
            theme === iconTheme ? "opacity-100" : "opacity-0"
        } ${iconTheme === "dark" ? "text-gray-mid" : "text-bare-base"}`;

    return (
        <HeaderButton onClick={handleClick}>
            <div
                className={`relative flex h-full justify-center items-center aspect-square border border-black [border-radius:50%] p-1 cursor-pointer ${
                    animations["buttonBackground"]
                } ${theme === "light" ? "bg-gray-mid" : "bg-bare-base"} ${
                    isAnimated ? animations["iconSpin"] : ""
                }`}
            >
                <IoMoon className={generateIconClasses("light")} />
                <IoSunny className={generateIconClasses("dark")} />
            </div>
        </HeaderButton>
    );
}
