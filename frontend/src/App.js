import AppContext from "./context/AppContext";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/base/ProtectedRoute";
import Main from "./pages/Main";
import { useContext } from "react";

function App() {
    const { isAuthenticated, loading } = useContext(AppContext);

    if (loading) return;

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate to={isAuthenticated ? "/main" : "/login"} replace />}
                />
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/main" element={<Main />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
