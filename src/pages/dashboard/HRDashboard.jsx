import { HiClock, HiCheckBadge, HiArrowPath, HiUserGroup } from "react-icons/hi2";

const statCards = [
  {
    label: "Pending HR Approvals",
    value: 5,
    icon: HiClock,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-500/10",
  },
  {
    label: "Processed Today",
    value: 11,
    icon: HiCheckBadge,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
  },
  {
    label: "Leave Balance Updates",
    value: 8,
    icon: HiArrowPath,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-500/10",
  },
  {
    label: "Pending Manager Approvals",
    value: 14,
    icon: HiUserGroup,
    color: "text-violet-500",
    bg: "bg-violet-50 dark:bg-violet-500/10",
  },
];

export default function HRDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          HR Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage organisation-wide leave policies and approvals.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {card.label}
              </span>
              <span className={`rounded-lg p-2 ${card.bg}`}>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </span>
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
