const sizes = {
  sm: "h-5 w-5 border-2",
  md: "h-8 w-8 border-[3px]",
  lg: "h-12 w-12 border-4",
};

export default function Loader({ size = "md", className = "" }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-blue-600 border-t-transparent ${sizes[size] ?? sizes.md}`}
      />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex h-64 items-center justify-center">
      <Loader size="lg" />
    </div>
  );
}

export function InlineLoader({ text = "Loading..." }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
      <Loader size="sm" className="flex-none" />
      {text}
    </div>
  );
}
