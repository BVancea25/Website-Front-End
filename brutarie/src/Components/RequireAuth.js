import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = (allowedRole) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth.role === allowedRole.allowedRole) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
