import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeOptions } from "../lib/definitions";

type ThemeContextType = {
    theme: ThemeOptions;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<ThemeOptions>("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("task-app-theme") as ThemeOptions;

        if (savedTheme) {
            setTheme(savedTheme);

            if (savedTheme === "dark") {
                document.body.classList.add("dark");
            }
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.body.classList.toggle("dark");
        localStorage.setItem("task-app-theme", newTheme);
    };

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

const useThemeContext = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw Error("No context in theme provider.");
    }

    return context;
};

export default useThemeContext;
