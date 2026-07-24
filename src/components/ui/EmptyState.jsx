export default function EmptyState({
  icon: Icon,
  title = "No data found",
  description = "There are no items to display at this time.",
  action,
  className = "",
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 text-center ${className}`}
    >
      {Icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30">
          <Icon className="h-8 w-8 text-blue-500 dark:text-blue-400" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
        {title}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
        {description}
      </p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
