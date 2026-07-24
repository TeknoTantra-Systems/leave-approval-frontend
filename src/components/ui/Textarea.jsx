import { forwardRef } from "react";

const Textarea = forwardRef(function Textarea(
  {
    label,
    error,
    rows = 4,
    placeholder,
    className = "",
    id,
    ...props
  },
  ref
) {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={textareaId}
          className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        placeholder={placeholder}
        className={`
          w-full rounded-lg border bg-slate-50 px-4 py-2.5 text-sm text-slate-700
          placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
          dark:bg-slate-700 dark:text-slate-200 dark:placeholder-slate-500 dark:focus:border-blue-400
          ${error ? "border-red-300 dark:border-red-700" : "border-slate-200 dark:border-slate-600"}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
});

export default Textarea;
