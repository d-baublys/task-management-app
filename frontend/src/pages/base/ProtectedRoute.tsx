import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { isAuthenticated }: { isAuthenticated: boolean } = useContext(AppContext);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
