import React from "react";
import useThemeContext from "../context/ThemeContext";
import { IoMoon, IoSunny } from "react-icons/io5";
import HeaderButton from "./base/HeaderButton";

export default function ModeButton() {
    const { theme, toggleTheme } = useThemeContext();

    return (
        <HeaderButton onClick={toggleTheme}>
            <div
                className={`flex justify-center items-center aspect-square border border-black [border-radius:50%] p-1 cursor-pointer ${
                    theme === "light" ? "bg-gray-mid" : "bg-bare-base"
                }`}
            >
                {theme === "light" ? (
                    <IoMoon className="h-full w-full text-bare-base" />
                ) : (
                    <IoSunny className="h-full w-full text-gray-mid" />
                )}
            </div>
        </HeaderButton>
    );
}
