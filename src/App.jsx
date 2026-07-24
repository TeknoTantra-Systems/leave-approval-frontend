import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { ROLES } from "@/constants/roles";
import { MainLayout } from "@/components/layout";
import { PublicRoutes, PrivateRoutes, RoleBasedRoutes } from "@/routes";

const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const EmployeeDashboard = lazy(() => import("@/pages/dashboard/EmployeeDashboard"));
const ManagerDashboard = lazy(() => import("@/pages/dashboard/ManagerDashboard"));
const HRDashboard = lazy(() => import("@/pages/dashboard/HRDashboard"));
const DirectorDashboard = lazy(() => import("@/pages/dashboard/DirectorDashboard"));
const ApplyLeavePage = lazy(() => import("@/pages/leave/ApplyLeavePage"));
const LeaveHistoryPage = lazy(() => import("@/pages/leave/LeaveHistoryPage"));
const LeaveDetailsPage = lazy(() => import("@/pages/leave/LeaveDetailsPage"));
const ManagerApprovalPage = lazy(() => import("@/pages/approval/ManagerApprovalPage"));
const HRApprovalPage = lazy(() => import("@/pages/approval/HRApprovalPage"));
const DirectorApprovalPage = lazy(() => import("@/pages/approval/DirectorApprovalPage"));
const NotificationsPage = lazy(() => import("@/pages/notifications/NotificationsPage"));
const ProfilePage = lazy(() => import("@/pages/profile/ProfilePage"));
const NotFoundPage = lazy(() => import("@/pages/error/NotFoundPage"));
const UnauthorizedPage = lazy(() => import("@/pages/error/UnauthorizedPage"));

function PageLoader() {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.EMPLOYEE_DASHBOARD} element={<EmployeeDashboard />} />
            <Route path={ROUTES.MANAGER_DASHBOARD} element={<ManagerDashboard />} />
            <Route path={ROUTES.HR_DASHBOARD} element={<HRDashboard />} />
            <Route path={ROUTES.DIRECTOR_DASHBOARD} element={<DirectorDashboard />} />

            <Route element={<RoleBasedRoutes allowedRoles={[ROLES.EMPLOYEE, ROLES.MANAGER, ROLES.HR, ROLES.DIRECTOR]} />}>
              <Route path={ROUTES.APPLY_LEAVE} element={<ApplyLeavePage />} />
              <Route path={ROUTES.LEAVE_HISTORY} element={<LeaveHistoryPage />} />
              <Route path={ROUTES.LEAVE_DETAILS} element={<LeaveDetailsPage />} />
              <Route path={ROUTES.NOTIFICATIONS} element={<NotificationsPage />} />
              <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            </Route>

            <Route element={<RoleBasedRoutes allowedRoles={[ROLES.MANAGER]} />}>
              <Route path={ROUTES.MANAGER_APPROVAL} element={<ManagerApprovalPage />} />
            </Route>

            <Route element={<RoleBasedRoutes allowedRoles={[ROLES.HR]} />}>
              <Route path={ROUTES.HR_APPROVAL} element={<HRApprovalPage />} />
            </Route>

            <Route element={<RoleBasedRoutes allowedRoles={[ROLES.DIRECTOR]} />}>
              <Route path={ROUTES.DIRECTOR_APPROVAL} element={<DirectorApprovalPage />} />
            </Route>
          </Route>
        </Route>

        <Route path={ROUTES.UNAUTHORIZED} element={<UnauthorizedPage />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
