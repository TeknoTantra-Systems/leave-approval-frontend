import { useState, useEffect } from "react";
import StatCard from "@/components/common/StatCard";
import RecentActivity from "@/components/common/RecentActivity";
import { PageHeader } from "@/components/common";
import { getDashboardStats, getRecentActivity } from "@/services/dashboardService";
import { ROUTES } from "@/constants/routes";
import { ROLES } from "@/constants/roles";
import { HiClock, HiCheckCircle, HiXCircle, HiArrowUpRight } from "react-icons/hi2";

export default function ManagerDashboard() {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [statsData, activityData] = await Promise.all([
        getDashboardStats(ROLES.MANAGER),
        getRecentActivity(ROLES.MANAGER),
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
    { label: "Pending Approvals", value: stats.pendingApprovals, icon: HiClock, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
    { label: "Approved This Month", value: stats.approvedThisMonth, icon: HiCheckCircle, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { label: "Rejected", value: stats.rejected, icon: HiXCircle, color: "text-red-500", bg: "bg-red-50 dark:bg-red-500/10" },
    { label: "Escalations", value: stats.escalations, icon: HiArrowUpRight, color: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-500/10" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Manager Dashboard" description="Review and approve leave requests from your team members." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <StatCard key={card.label} label={card.label} value={card.value} icon={card.icon} color={card.color} bg={card.bg} />
        ))}
      </div>

      <RecentActivity items={activity} viewAllPath={ROUTES.MANAGER_APPROVAL} />
    </div>
  );
}
