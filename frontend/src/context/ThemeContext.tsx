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
        document.body.classList.add("no-transition");

        const savedTheme = localStorage.getItem("task-app-theme") as ThemeOptions | null;
        const systemDark = !savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches;
        const activeTheme = savedTheme ?? (systemDark ? "dark" : "light");

        document.body.classList.toggle("dark", activeTheme === "dark");
        localStorage.setItem("task-app-theme", activeTheme);
        setTheme(activeTheme);

        const timeout = setTimeout(() => {
            document.body.classList.remove("no-transition");
        }, 50);

        return () => clearTimeout(timeout);
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
