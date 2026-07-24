import { useState, useEffect } from "react";
import StatCard from "@/components/common/StatCard";
import RecentActivity from "@/components/common/RecentActivity";
import { PageHeader } from "@/components/common";
import { getDashboardStats, getRecentActivity } from "@/services/dashboardService";
import { ROUTES } from "@/constants/routes";
import { ROLES } from "@/constants/roles";
import { HiClock, HiCheckBadge, HiArrowPath, HiUserGroup } from "react-icons/hi2";

export default function HRDashboard() {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [statsData, activityData] = await Promise.all([
        getDashboardStats(ROLES.HR),
        getRecentActivity(ROLES.HR),
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
    { label: "Pending HR Approvals", value: stats.pendingHRApprovals, icon: HiClock, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
    { label: "Processed Today", value: stats.processedToday, icon: HiCheckBadge, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { label: "Leave Balance Updates", value: stats.leaveBalanceUpdates, icon: HiArrowPath, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
    { label: "Pending Manager Approvals", value: stats.pendingManagerApprovals, icon: HiUserGroup, color: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-500/10" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="HR Dashboard" description="Manage organisation-wide leave policies and approvals." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <StatCard key={card.label} label={card.label} value={card.value} icon={card.icon} color={card.color} bg={card.bg} />
        ))}
      </div>

      <RecentActivity items={activity} viewAllPath={ROUTES.HR_APPROVAL} />
    </div>
  );
}
