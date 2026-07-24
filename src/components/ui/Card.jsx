export default function Card({ children, className = "", padding = "p-5", ...props }) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
