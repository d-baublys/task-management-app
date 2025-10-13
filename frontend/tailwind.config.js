/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors";

const customColors = {
    "light-theme-lighter": "rgb(234, 245, 255)",
    "light-theme-light": "rgb(219, 234, 247)",
    "light-theme-medium": "rgb(122, 186, 242)",
    "light-theme-dark": "rgb(102, 169, 229)",
    "dark-theme-lighter": "rgb(24 107 180)",
    "dark-theme-light": "rgb(21 94 157)",
    "dark-theme-medium": "rgb(14 53 88)",
    "dark-theme-dark": "rgb(6 27 45)",
};

module.exports = {
    content: ["./src/**/*.{html,js,ts,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                ...customColors,
                "gray-lighter": colors.gray[50],
                "gray-light": colors.gray[200],
                "gray-mid": colors.gray[700],
                "gray-dark": colors.gray[900],
                "bare-base": colors.white,
            },
            spacing: {
                "board-btn-spacing-xl": "5rem",
                "board-btn-spacing-lg": "4rem",
                "board-btn-spacing-sm": "3rem",
                "board-btn-top": "33%",
                "modal-spacing": "500px",
                "modal-spacing-sm": "400px",
            },
            height: {
                "confirm-height": "250px",
                "confirm-height-sm": "200px",
            },
            screens: {
                xs: "480px",
                "sm-500": {
                    raw: "(min-height: 500px)",
                },
            },
            dropShadow: {
                modal: "0 0 25px rgba(0,0,0,0.33)",
                board: "0 0 5px rgba(0,0,0,0.25)",
                dropdown: "0 5px 5px rgba(0,0,0,0.05)",
            },
            backgroundImage: {
                "light-board-gradient": `linear-gradient(to right, ${customColors["light-theme-light"]} 0, ${customColors["light-theme-lighter"]} 40% 60%, ${customColors["light-theme-light"]} 100%)`,
                "dark-board-gradient": `linear-gradient(to right, ${customColors["dark-theme-light"]} 0, ${customColors["dark-theme-lighter"]} 40% 60%, ${customColors["dark-theme-light"]} 100%)`,
                "light-button-gradient": `radial-gradient(${customColors["light-theme-medium"]} 50%, ${customColors["light-theme-dark"]} 80%)`,
                "dark-button-gradient": `radial-gradient(${customColors["dark-theme-light"]} 50%, ${customColors["dark-theme-medium"]} 80%)`,
            },
            transitionDuration: {
                colors: "var(--duration-colors)",
                others: "var(--duration-others)",
            },
        },
    },
    plugins: [],
};
