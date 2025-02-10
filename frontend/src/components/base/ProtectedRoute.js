import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { user } = useContext(AppContext);
    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
