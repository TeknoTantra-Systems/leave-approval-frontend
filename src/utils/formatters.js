export function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncate(str, maxLength = 50) {
  if (!str || str.length <= maxLength) return str ?? "";
  return str.slice(0, maxLength) + "...";
}

export function getInitials(name) {
  if (!name) return "";
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function pluralize(count, singular, plural) {
  return count === 1 ? singular : (plural ?? `${singular}s`);
}

export function formatNumber(num) {
  if (num === null || num === undefined) return "0";
  return num.toLocaleString("en-US");
}
