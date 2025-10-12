/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,ts,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "light-theme-lighter": "rgb(234, 245, 255)",
                "light-theme-light": "rgb(219, 234, 247)",
                "light-theme-medium": "rgb(122, 186, 242)",
                "light-theme-dark": "rgb(102, 169, 229)",
                "dark-theme-lighter": "rgb(102, 169, 229)",
                "dark-theme-light": "rgb(21 94 157)",
                "dark-theme-medium": "rgb(14 53 88)",
                "dark-theme-dark": "rgb(6 27 45)",
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
                "light-board-gradient":
                    "linear-gradient(to right, rgb(219, 234, 247) 0, rgb(234, 245, 255) 40% 60%, rgb(219, 234, 247) 100%)",
                "dark-board-gradient":
                    "linear-gradient(to right, rgb(21 94 157) 0, rgb(102, 169, 229) 40% 60%, rgb(21 94 157) 100%)",
                "light-button-gradient":
                    "radial-gradient(rgb(122, 186, 242) 50%, rgb(102, 169, 229) 80%)",
                "dark-button-gradient": "radial-gradient(rgb(21 94 157) 50%, rgb(14 53 88) 80%)",
            },
        },
    },
    plugins: [],
};
