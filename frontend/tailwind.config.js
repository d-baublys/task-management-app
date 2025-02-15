/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
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
            },
            width: {
                "modal-width": "500px",
            },
            height: {
                "modal-height": "500px",
                "confirm-height": "250px",
            },
            dropShadow: {
                modal: "0 0 50px rgba(0,0,0,0.25)",
                board: "0 0 5px rgba(0,0,0,0.25)",
            },
            backgroundImage: {
                "board-gradient": "linear-gradient(to right, rgb(219, 234, 247) 0, rgb(234, 245, 255) 40% 60%, rgb(219, 234, 247) 100%)",
                "button-gradient": "radial-gradient(rgb(122, 186, 242) 50%, rgb(102, 169, 229) 80%)"
            }
        },
    },
    plugins: [],
};
