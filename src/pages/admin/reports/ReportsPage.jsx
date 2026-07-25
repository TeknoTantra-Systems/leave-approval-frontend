import { Card } from "@/components/ui";
import { PageHeader } from "@/components/common";
import { HiOutlineDocumentArrowDown, HiOutlineDocumentText, HiOutlineBuildingOffice2, HiOutlineUsers, HiOutlineCalendarDays } from "react-icons/hi2";

const REPORT_CARDS = [
  {
    title: "Monthly Report",
    description: "Leave summary for the current month across all departments.",
    icon: HiOutlineDocumentText,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-500/10",
  },
  {
    title: "Department Report",
    description: "Breakdown of leave usage and balances by department.",
    icon: HiOutlineBuildingOffice2,
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-500/10",
  },
  {
    title: "Employee Report",
    description: "Individual leave history and balance for all employees.",
    icon: HiOutlineUsers,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
  },
  {
    title: "Leave Balance Report",
    description: "Current leave balances and utilization across the organization.",
    icon: HiOutlineCalendarDays,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-500/10",
  },
];

const EXPORT_OPTIONS = [
  { label: "Export PDF", format: "pdf" },
  { label: "Export CSV", format: "csv" },
  { label: "Export Excel", format: "excel" },
];

export default function ReportsPage() {
  const handleExport = (format) => {
    void format;
    alert(`Export as ${format} would be triggered here. This is a mock implementation.`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Generate and export organizational reports."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {REPORT_CARDS.map((report) => (
          <Card key={report.title}>
            <div className="flex items-start gap-4">
              <span className={`rounded-lg p-2.5 ${report.bg}`}>
                <report.icon className={`h-5 w-5 ${report.color}`} />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {report.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {report.description}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              {EXPORT_OPTIONS.map((opt) => (
                <button
                  key={opt.format}
                  onClick={() => handleExport(opt.format)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                >
                  <HiOutlineDocumentArrowDown className="h-3.5 w-3.5" />
                  {opt.label}
                </button>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
