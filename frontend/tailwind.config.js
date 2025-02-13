/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            colors: {
                "theme-lightest": "rgb(219 234 254 / 1)",
                "theme-lighter": "rgb(173, 201, 239)",
                "theme-light": "rgb(131, 195, 232)",
                "theme-medium": "rgb(118, 191, 234)",
                "theme-dark": "rgb(85, 176, 230)",
            },
            spacing: {
                "board-btn-spacing": "4rem",
                "board-btn-top": "20%",
            },
            width: {
                "modal-width": "600px",
            },
            height: {
                "modal-height": "600px",
                "confirm-height": "300px",
            },
            dropShadow: {
                modal: "0 0 50px rgba(0,0,0,0.25)",
                board: "0 0 5px rgba(0,0,0,0.25)",
            },
        },
    },
    plugins: [],
};
