import useAppContext from "./context/AppContext";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router";
import ProtectedRoute from "./pages/base/ProtectedRoute";
import Main from "./pages/Main";
import React from "react";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";

function App() {
    const { isAuthenticated, loading } = useAppContext();

    if (loading) return null;

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate to={isAuthenticated ? "/main" : "/login"} replace />}
                />
                <Route path="/login" element={<LogInPage />} />
                <Route path="/create-account" element={<SignUpPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/main" element={<Main />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
