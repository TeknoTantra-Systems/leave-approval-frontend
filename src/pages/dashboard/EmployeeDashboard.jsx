import { useState, useEffect } from "react";
import StatCard from "@/components/common/StatCard";
import RecentActivity from "@/components/common/RecentActivity";
import { PageHeader } from "@/components/common";
import { getDashboardStats, getRecentActivity } from "@/services/dashboardService";
import { ROUTES } from "@/constants/routes";
import { ROLES } from "@/constants/roles";
import { HiClock, HiCheckCircle, HiXCircle, HiCalendarDays } from "react-icons/hi2";

const LEAVE_BALANCE_MOCK = [
  { type: "Annual Leave", total: 20, used: 8, pending: 3 },
  { type: "Sick Leave", total: 10, used: 2, pending: 0 },
  { type: "Personal Leave", total: 5, used: 1, pending: 0 },
];

export default function EmployeeDashboard() {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [statsData, activityData] = await Promise.all([
        getDashboardStats(ROLES.EMPLOYEE),
        getRecentActivity(ROLES.EMPLOYEE),
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
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600" />
      </div>
    );
  }

  const statCards = [
    { label: "Pending Requests", value: stats.pendingRequests, icon: HiClock, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
    { label: "Approved", value: stats.approved, icon: HiCheckCircle, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { label: "Rejected", value: stats.rejected, icon: HiXCircle, color: "text-red-500", bg: "bg-red-50 dark:bg-red-500/10" },
    { label: "Leave Balance", value: stats.leaveBalance, icon: HiCalendarDays, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Employee Dashboard" description="View and manage your leave requests and balances." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <StatCard key={card.label} label={card.label} value={card.value} icon={card.icon} color={card.color} bg={card.bg} />
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Leave Balance</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {LEAVE_BALANCE_MOCK.map((leave) => {
            const remaining = leave.total - leave.used - leave.pending;
            return (
              <div key={leave.type} className="rounded-lg border border-slate-100 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-700/50">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{leave.type}</p>
                <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">{remaining} <span className="text-sm font-normal text-slate-400">/ {leave.total} days</span></p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-600">
                  <div className="h-full rounded-full bg-blue-500" style={{ width: `${(leave.used / leave.total) * 100}%` }} />
                </div>
                <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">{leave.used} used, {leave.pending} pending</p>
              </div>
            );
          })}
        </div>
      </div>

      <RecentActivity items={activity} viewAllPath={ROUTES.LEAVE_HISTORY} />
    </div>
  );
}
