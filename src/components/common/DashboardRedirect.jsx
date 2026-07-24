import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/constants/routes";
import { ROLES } from "@/constants/roles";

const ROLE_DASHBOARD_MAP = {
  [ROLES.EMPLOYEE]: ROUTES.EMPLOYEE_DASHBOARD,
  [ROLES.MANAGER]: ROUTES.MANAGER_DASHBOARD,
  [ROLES.HR]: ROUTES.HR_DASHBOARD,
  [ROLES.DIRECTOR]: ROUTES.DIRECTOR_DASHBOARD,
};

export default function DashboardRedirect() {
  const { user } = useAuth();
  const target = ROLE_DASHBOARD_MAP[user?.role] ?? ROUTES.EMPLOYEE_DASHBOARD;
  return <Navigate to={target} replace />;
}
