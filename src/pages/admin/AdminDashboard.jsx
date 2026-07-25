import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StatCard from "@/components/common/StatCard";
import RecentActivity from "@/components/common/RecentActivity";
import { PageHeader } from "@/components/common";
import { Card, Loader, StatusBadge } from "@/components/ui";
import { getDashboardStats, getRecentActivity } from "@/services/dashboardService";
import { ROUTES } from "@/constants/routes";
import { ROLES } from "@/constants/roles";
import {
  HiOutlineUsers,
  HiOutlineUserGroup,
  HiOutlineUserMinus,
  HiOutlineBriefcase,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineShieldCheck,
} from "react-icons/hi2";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [statsData, activityData] = await Promise.all([
        getDashboardStats(ROLES.APP_ADMIN),
        getRecentActivity(ROLES.APP_ADMIN),
      ]);
      setStats(statsData);
      setActivity(activityData);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  const statCards = [
    { label: "Total Employees", value: stats.totalEmployees, icon: HiOutlineUsers, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
    { label: "Total Managers", value: stats.totalManagers, icon: HiOutlineUserGroup, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10" },
    { label: "Total HR", value: stats.totalHR, icon: HiOutlineBriefcase, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
    { label: "Total Directors", value: stats.totalDirectors, icon: HiOutlineShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
  ];

  const secondaryStats = [
    { label: "Pending Leave Requests", value: stats.pendingLeaveRequests, icon: HiOutlineClock, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
    { label: "Approved Requests", value: stats.approvedRequests, icon: HiOutlineCheckCircle, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { label: "Rejected Requests", value: stats.rejectedRequests, icon: HiOutlineXCircle, color: "text-red-500", bg: "bg-red-50 dark:bg-red-500/10" },
    { label: "Active Users", value: stats.activeUsers, icon: HiOutlineUserMinus, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
  ];

  const departmentSummary = [
    { name: "Engineering", employees: 12, pendingLeaves: 3 },
    { name: "Marketing", employees: 8, pendingLeaves: 2 },
    { name: "Finance", employees: 6, pendingLeaves: 1 },
    { name: "Human Resources", employees: 5, pendingLeaves: 1 },
    { name: "Design", employees: 4, pendingLeaves: 0 },
    { name: "Product", employees: 5, pendingLeaves: 2 },
  ];

  const recentUsers = [
    { id: "1", name: "Ravi Kumar", department: "Engineering", role: "Employee", date: "2025-12-20" },
    { id: "2", name: "Priya Kapoor", department: "HR", role: "Employee", date: "2025-12-18" },
    { id: "3", name: "Sanjay Mehta", department: "Product", role: "Employee", date: "2025-12-15" },
  ];

  const approvalMatrix = [
    { range: "<= 3 Days", approvers: "Manager" },
    { range: "4-10 Days", approvers: "Manager + HR" },
    { range: "> 10 Days", approvers: "Manager + HR + Director" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Dashboard"
        description="System overview and management console."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <StatCard key={card.label} label={card.label} value={card.value} icon={card.icon} color={card.color} bg={card.bg} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {secondaryStats.map((card) => (
          <StatCard key={card.label} label={card.label} value={card.value} icon={card.icon} color={card.color} bg={card.bg} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentActivity items={activity} viewAllPath={ROUTES.ADMIN_LEAVE_REQUESTS} />

        <Card>
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Recent Notifications
            </h3>
            <Link
              to={ROUTES.NOTIFICATIONS}
              className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              View All
            </Link>
          </div>
          <ul className="divide-y divide-slate-100 dark:divide-slate-700/50">
            <li className="px-5 py-3">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">System Alert</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">5 new leave requests pending</p>
            </li>
            <li className="px-5 py-3">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">User Registration</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">New employee added to system</p>
            </li>
            <li className="px-5 py-3">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Backup Complete</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Weekly system backup successful</p>
            </li>
          </ul>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-200">
            Recent User Registrations
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-medium uppercase tracking-wider text-slate-500 dark:border-slate-700 dark:text-slate-400">
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Department</th>
                  <th className="pb-2">Role</th>
                  <th className="pb-2">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {recentUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="py-2 font-medium text-slate-700 dark:text-slate-200">{user.name}</td>
                    <td className="py-2 text-slate-600 dark:text-slate-400">{user.department}</td>
                    <td className="py-2"><StatusBadge status={user.role.toLowerCase()} type="role" /></td>
                    <td className="py-2 text-slate-500 dark:text-slate-400">{user.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-200">
            Department Summary
          </h3>
          <div className="space-y-3">
            {departmentSummary.map((dept) => (
              <div key={dept.name} className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-2.5 dark:bg-slate-700/50">
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{dept.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{dept.employees} employees</p>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">{dept.pendingLeaves} pending</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-200">
            Approval Matrix Summary
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-medium uppercase tracking-wider text-slate-500 dark:border-slate-700 dark:text-slate-400">
                  <th className="pb-2">Leave Duration</th>
                  <th className="pb-2">Required Approvers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {approvalMatrix.map((row) => (
                  <tr key={row.range}>
                    <td className="py-2 font-medium text-slate-700 dark:text-slate-200">{row.range}</td>
                    <td className="py-2 text-slate-600 dark:text-slate-400">{row.approvers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-200">
            Leave Status Chart
          </h3>
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="mx-auto mb-3 h-32 w-32 rounded-full border-8 border-slate-200 dark:border-slate-600" />
              <p className="text-sm text-slate-500 dark:text-slate-400">Chart placeholder</p>
              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">Integrate with a chart library</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
