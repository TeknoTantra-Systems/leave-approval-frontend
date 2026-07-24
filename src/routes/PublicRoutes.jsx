import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/constants/routes";

export default function PublicRoutes() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.EMPLOYEE_DASHBOARD} replace />;
  }

  return <Outlet />;
}
