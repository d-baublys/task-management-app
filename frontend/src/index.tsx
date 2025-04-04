import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./context/AppContext";

const container = document.getElementById("root");

if (!container) {
    throw new Error("No root element found");
}

const root = ReactDOM.createRoot(container);
root.render(
    <React.StrictMode>
        <ContextProvider>
            <App />
        </ContextProvider>
    </React.StrictMode>
);
