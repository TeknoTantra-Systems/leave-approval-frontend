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
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const ApplyLeavePage = lazy(() => import("@/pages/leave/ApplyLeavePage"));
const LeaveHistoryPage = lazy(() => import("@/pages/leave/LeaveHistoryPage"));
const LeaveDetailsPage = lazy(() => import("@/pages/leave/LeaveDetailsPage"));
const ManagerApprovalPage = lazy(() => import("@/pages/approval/ManagerApprovalPage"));
const HRApprovalPage = lazy(() => import("@/pages/approval/HRApprovalPage"));
const DirectorApprovalPage = lazy(() => import("@/pages/approval/DirectorApprovalPage"));
const UsersPage = lazy(() => import("@/pages/admin/users/UsersPage"));
const UserDetailsPage = lazy(() => import("@/pages/admin/users/UserDetailsPage"));
const CreateUserPage = lazy(() => import("@/pages/admin/users/CreateUserPage"));
const EditUserPage = lazy(() => import("@/pages/admin/users/EditUserPage"));
const DepartmentPage = lazy(() => import("@/pages/admin/departments/DepartmentPage"));
const LeaveTypesPage = lazy(() => import("@/pages/admin/leave-types/LeaveTypesPage"));
const ApprovalMatrixPage = lazy(() => import("@/pages/admin/approval/ApprovalMatrixPage"));
const AdminLeaveRequestsPage = lazy(() => import("@/pages/admin/leave-requests/LeaveRequestsPage"));
const ReportsPage = lazy(() => import("@/pages/admin/reports/ReportsPage"));
const NotificationsPage = lazy(() => import("@/pages/notifications/NotificationsPage"));
const ProfilePage = lazy(() => import("@/pages/profile/ProfilePage"));
const SettingsPage = lazy(() => import("@/pages/settings/SettingsPage"));
const NotFoundPage = lazy(() => import("@/pages/error/NotFoundPage"));
const UnauthorizedPage = lazy(() => import("@/pages/error/UnauthorizedPage"));
const DashboardRedirect = lazy(() => import("@/components/common/DashboardRedirect"));

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
            <Route path="/" element={<DashboardRedirect />} />
            <Route path={ROUTES.EMPLOYEE_DASHBOARD} element={<EmployeeDashboard />} />

            <Route element={<RoleBasedRoutes allowedRoles={[ROLES.MANAGER]} />}>
              <Route path={ROUTES.MANAGER_DASHBOARD} element={<ManagerDashboard />} />
            </Route>

            <Route element={<RoleBasedRoutes allowedRoles={[ROLES.HR]} />}>
              <Route path={ROUTES.HR_DASHBOARD} element={<HRDashboard />} />
            </Route>

            <Route element={<RoleBasedRoutes allowedRoles={[ROLES.DIRECTOR]} />}>
              <Route path={ROUTES.DIRECTOR_DASHBOARD} element={<DirectorDashboard />} />
            </Route>

            <Route element={<RoleBasedRoutes allowedRoles={[ROLES.APP_ADMIN]} />}>
              <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
              <Route path={ROUTES.ADMIN_USERS} element={<UsersPage />} />
              <Route path={ROUTES.ADMIN_USER_DETAILS} element={<UserDetailsPage />} />
              <Route path={ROUTES.ADMIN_CREATE_USER} element={<CreateUserPage />} />
              <Route path={ROUTES.ADMIN_EDIT_USER} element={<EditUserPage />} />
              <Route path={ROUTES.ADMIN_DEPARTMENTS} element={<DepartmentPage />} />
              <Route path={ROUTES.ADMIN_LEAVE_TYPES} element={<LeaveTypesPage />} />
              <Route path={ROUTES.ADMIN_APPROVAL_MATRIX} element={<ApprovalMatrixPage />} />
              <Route path={ROUTES.ADMIN_LEAVE_REQUESTS} element={<AdminLeaveRequestsPage />} />
              <Route path={ROUTES.ADMIN_REPORTS} element={<ReportsPage />} />
            </Route>

            <Route element={<RoleBasedRoutes allowedRoles={[ROLES.EMPLOYEE, ROLES.MANAGER, ROLES.HR, ROLES.DIRECTOR, ROLES.APP_ADMIN]} />}>
              <Route path={ROUTES.NOTIFICATIONS} element={<NotificationsPage />} />
              <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
              <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
            </Route>

            <Route element={<RoleBasedRoutes allowedRoles={[ROLES.EMPLOYEE, ROLES.MANAGER, ROLES.HR, ROLES.DIRECTOR]} />}>
              <Route path={ROUTES.APPLY_LEAVE} element={<ApplyLeavePage />} />
              <Route path={ROUTES.LEAVE_HISTORY} element={<LeaveHistoryPage />} />
              <Route path={ROUTES.LEAVE_DETAILS} element={<LeaveDetailsPage />} />
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
