/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                "theme-lighter": "rgb(234, 245, 255)",
                "theme-light": "rgb(219, 234, 247)",
                "theme-medium": "rgb(122, 186, 242)",
                "theme-dark": "rgb(102, 169, 229)",
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
                "board-gradient":
                    "linear-gradient(to right, rgb(219, 234, 247) 0, rgb(234, 245, 255) 40% 60%, rgb(219, 234, 247) 100%)",
                "button-gradient":
                    "radial-gradient(rgb(122, 186, 242) 50%, rgb(102, 169, 229) 80%)",
            },
        },
    },
    plugins: [],
};
