import React from "react";
import useThemeContext from "../context/ThemeContext";
import { IoMoon, IoSunny } from "react-icons/io5";

export default function ModeButton() {
    const { theme, toggleTheme } = useThemeContext();

    return (
        <button
            onClick={toggleTheme}
            className={`flex h-5/6 justify-center items-center aspect-square border border-black [border-radius:50%] p-1 cursor-pointer ${
                theme === "light" ? "bg-gray-700" : "bg-white text-gray-700"
            }`}
        >
            {theme === "light" ? (
                <IoMoon className="h-full w-full text-white" />
            ) : (
                <IoSunny className="h-full w-full" />
            )}
        </button>
    );
}
