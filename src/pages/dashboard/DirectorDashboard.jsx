import { useState, useEffect } from "react";
import StatCard from "@/components/common/StatCard";
import RecentActivity from "@/components/common/RecentActivity";
import { PageHeader } from "@/components/common";
import { getDashboardStats, getRecentActivity } from "@/services/dashboardService";
import { ROUTES } from "@/constants/routes";
import { ROLES } from "@/constants/roles";
import { HiClock, HiCheckCircle, HiExclamationTriangle, HiDocumentText } from "react-icons/hi2";

export default function DirectorDashboard() {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [statsData, activityData] = await Promise.all([
        getDashboardStats(ROLES.DIRECTOR),
        getRecentActivity(ROLES.DIRECTOR),
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
    { label: "Pending Director Approvals", value: stats.pendingDirectorApprovals, icon: HiClock, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
    { label: "Approved This Quarter", value: stats.approvedThisQuarter, icon: HiCheckCircle, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { label: "Escalated Requests", value: stats.escalatedRequests, icon: HiExclamationTriangle, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-500/10" },
    { label: "Total Requests", value: stats.totalRequests, icon: HiDocumentText, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Director Dashboard" description="High-level overview of leave requests and escalations." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <StatCard key={card.label} label={card.label} value={card.value} icon={card.icon} color={card.color} bg={card.bg} />
        ))}
      </div>

      <RecentActivity items={activity} viewAllPath={ROUTES.DIRECTOR_APPROVAL} />
    </div>
  );
}
