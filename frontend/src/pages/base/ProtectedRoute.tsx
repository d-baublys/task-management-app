import React from "react";
import { Navigate, Outlet } from "react-router";
import useAppContext from "../../context/AppContext";

const ProtectedRoute = () => {
    const { isAuthenticated } = useAppContext();
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
