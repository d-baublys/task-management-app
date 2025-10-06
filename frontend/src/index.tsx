import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UiProvider } from "./context/UiContext";
import { AuthProvider } from "./context/AuthContext";
import { TasksProvider } from "./context/TasksContext";

const container = document.getElementById("root");

if (!container) {
    throw new Error("No root element found");
}

const root = ReactDOM.createRoot(container);
root.render(
    <React.StrictMode>
        <UiProvider>
            <AuthProvider>
                <TasksProvider>
                    <App />
                </TasksProvider>
            </AuthProvider>
        </UiProvider>
    </React.StrictMode>
);
