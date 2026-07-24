import { HiClock, HiCheckCircle, HiXCircle, HiCalendarDays } from "react-icons/hi2";

const statCards = [
  {
    label: "Pending Requests",
    value: 3,
    icon: HiClock,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-500/10",
  },
  {
    label: "Approved",
    value: 12,
    icon: HiCheckCircle,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
  },
  {
    label: "Rejected",
    value: 1,
    icon: HiXCircle,
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-500/10",
  },
  {
    label: "Leave Balance",
    value: 18,
    icon: HiCalendarDays,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-500/10",
  },
];

export default function EmployeeDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Employee Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          View and manage your leave requests and balances.
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
