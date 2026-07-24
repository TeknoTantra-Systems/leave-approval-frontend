import { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { PageHeader } from "@/components/common";
import { Card, Pagination, SearchBar, Button, Loader } from "@/components/ui";
import { NotificationItem, NotificationCard, NotificationFilter, NotificationEmptyState } from "@/components/notifications";
import { getNotifications, markAsRead, markAllAsRead, removeNotification } from "@/services/notificationService";
import { HiOutlineCheckCircle } from "react-icons/hi2";

const ITEMS_PER_PAGE = 8;

export default function NotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [readFilter, setReadFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getNotifications(user?.id);
      setNotifications(data);
      setLoading(false);
    }
    load();
  }, [user?.id]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  const filtered = useMemo(() => {
    return notifications.filter((n) => {
      const matchesSearch =
        !searchQuery ||
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.message.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = !typeFilter || n.type === typeFilter;
      const matchesRead =
        !readFilter ||
        (readFilter === "unread" && !n.isRead) ||
        (readFilter === "read" && n.isRead);
      return matchesSearch && matchesType && matchesRead;
    });
  }, [notifications, searchQuery, typeFilter, readFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleTypeFilterChange = (value) => {
    setTypeFilter(value);
    setCurrentPage(1);
  };

  const handleReadFilterChange = (value) => {
    setReadFilter(value);
    setCurrentPage(1);
  };

  const handleMarkRead = async (id) => {
    setActionLoading(true);
    try {
      await markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch {
      toast.error("Failed to mark as read");
    } finally {
      setActionLoading(false);
    }
  };

  const handleMarkAllRead = async () => {
    setActionLoading(true);
    try {
      await markAllAsRead(user?.id);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      toast.success("All notifications marked as read");
    } catch {
      toast.error("Failed to mark all as read");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setActionLoading(true);
    try {
      await removeNotification(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      toast.success("Notification deleted");
    } catch {
      toast.error("Failed to delete notification");
    } finally {
      setActionLoading(false);
    }
  };

  const hasFilters = !!(searchQuery || typeFilter || readFilter);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description={unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}` : "You're all caught up!"}
        actions={
          unreadCount > 0 ? (
            <Button
              variant="outline"
              size="sm"
              icon={HiOutlineCheckCircle}
              onClick={handleMarkAllRead}
              isLoading={actionLoading}
            >
              Mark All Read
            </Button>
          ) : null
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search notifications..."
          className="sm:w-72"
        />
        <NotificationFilter
          typeFilter={typeFilter}
          onTypeFilterChange={handleTypeFilterChange}
          readFilter={readFilter}
          onReadFilterChange={handleReadFilterChange}
        />
      </div>

      {filtered.length === 0 ? (
        <Card>
          <NotificationEmptyState hasFilters={hasFilters} />
        </Card>
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 lg:block">
            {paginatedItems.map((n) => (
              <NotificationItem
                key={n.id}
                notification={n}
                isRead={n.isRead}
                onMarkRead={handleMarkRead}
                onDelete={handleDelete}
              />
            ))}
          </div>

          <div className="space-y-3 lg:hidden">
            {paginatedItems.map((n) => (
              <NotificationCard
                key={n.id}
                notification={n}
                isRead={n.isRead}
                onMarkRead={handleMarkRead}
                onDelete={handleDelete}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
