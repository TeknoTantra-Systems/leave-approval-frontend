import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <nav
      className={`flex items-center justify-center gap-1 overflow-x-auto ${className}`}
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-700"
        aria-label="Previous page"
      >
        <FiChevronLeft className="h-4 w-4" />
      </button>

      {getVisiblePages().map((page, index) =>
        page === "..." ? (
          <span
            key={`dots-${index}`}
            className="px-2 text-sm text-slate-400 dark:text-slate-500"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`min-w-[36px] rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
            }`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-700"
        aria-label="Next page"
      >
        <FiChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
