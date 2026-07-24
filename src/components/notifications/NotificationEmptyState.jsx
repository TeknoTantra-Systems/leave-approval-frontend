import EmptyState from "@/components/ui/EmptyState";
import { HiOutlineBell } from "react-icons/hi2";

export default function NotificationEmptyState({ hasFilters = false }) {
  return (
    <EmptyState
      icon={HiOutlineBell}
      title={hasFilters ? "No matching notifications" : "No notifications yet"}
      description={
        hasFilters
          ? "Try adjusting your search or filter criteria."
          : "You'll see notifications about leave requests, approvals, and updates here."
      }
    />
  );
}
