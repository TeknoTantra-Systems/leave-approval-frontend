import { getInitials } from "@/utils/formatters";

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
};

export default function Avatar({
  name = "",
  src,
  size = "md",
  className = "",
}) {
  const initials = getInitials(name);

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`rounded-full object-cover ${sizeClasses[size] ?? sizeClasses.md} ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-blue-600 font-semibold text-white ${sizeClasses[size] ?? sizeClasses.md} ${className}`}
    >
      {initials || "?"}
    </div>
  );
}
