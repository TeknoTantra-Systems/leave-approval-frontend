import { forwardRef } from "react";

const Select = forwardRef(function Select(
  {
    label,
    error,
    options = [],
    placeholder = "Select an option",
    className = "",
    id,
    ...props
  },
  ref
) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={selectId}
          className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={`
          w-full appearance-none rounded-lg border bg-slate-50 py-2.5 pl-4 pr-10 text-sm text-slate-700
          focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
          dark:bg-slate-700 dark:text-slate-200 dark:focus:border-blue-400
          ${error ? "border-red-300 dark:border-red-700" : "border-slate-200 dark:border-slate-600"}
        `}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
});

export default Select;
