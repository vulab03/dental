import { Navigate, Outlet } from "react-router-dom";


function PrivateRoute() {
    const isAdmin = localStorage.getItem('isAdmin');
    return isAdmin ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;