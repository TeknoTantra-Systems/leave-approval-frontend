import { forwardRef, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Input = forwardRef(function Input(
  {
    label,
    error,
    icon: Icon,
    type = "text",
    placeholder,
    className = "",
    id,
    ...props
  },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        )}
        <input
          ref={ref}
          id={inputId}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          className={`
            w-full rounded-lg border bg-slate-50 py-2.5 text-sm text-slate-700
            placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
            dark:bg-slate-700 dark:text-slate-200 dark:placeholder-slate-500 dark:focus:border-blue-400
            ${error ? "border-red-300 dark:border-red-700" : "border-slate-200 dark:border-slate-600"}
            ${Icon ? "pl-10" : "pl-4"}
            ${isPassword ? "pr-10" : "pr-4"}
          `}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            tabIndex={-1}
          >
            {showPassword ? (
              <FiEyeOff className="h-4 w-4" />
            ) : (
              <FiEye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
});

export default Input;
