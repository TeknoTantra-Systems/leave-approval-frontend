import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";
import { useTheme } from "@/context/ThemeContext";
import { ROLE_LABELS } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";
import { HiOutlineBell, HiOutlineCog6Tooth } from "react-icons/hi2";
import { FiSun, FiMoon, FiLogOut, FiMenu, FiUser } from "react-icons/fi";
import { NotificationBadge } from "@/components/notifications";
import { getNotifications } from "@/services/notificationService";

export default function Header({ onToggleSidebar }) {
  const { logout } = useAuth();
  const { user } = useUser();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    async function load() {
      if (!user?.id) return;
      const data = await getNotifications(user.id);
      setUnreadCount(data.filter((n) => !n.isRead).length);
    }
    load();
  }, [user?.id]);

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6 dark:border-slate-700 dark:bg-slate-800">
      <div className="flex flex-1 items-center">
        <button
          onClick={onToggleSidebar}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden dark:text-slate-400 dark:hover:bg-slate-700"
          aria-label="Toggle sidebar"
        >
          <FiMenu className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2">
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
          aria-label="Toggle theme"
        >
          {isDark ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
        </button>

        <Link
          to={ROUTES.NOTIFICATIONS}
          className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
          aria-label="Notifications"
        >
          <HiOutlineBell className="h-5 w-5" />
          <NotificationBadge count={unreadCount} />
        </Link>

        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
              {user?.name?.charAt(0) ?? "U"}
            </div>
            <div className="hidden text-left md:block">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {user?.name ?? "User"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {ROLE_LABELS[user?.role] ?? "Role"}
              </p>
            </div>
          </button>

          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-800">
                <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-700">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {user?.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {user?.email}
                  </p>
                </div>
                <Link
                  to={ROUTES.PROFILE}
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  <FiUser className="h-4 w-4" />
                  My Profile
                </Link>
                <Link
                  to={ROUTES.SETTINGS}
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  <HiOutlineCog6Tooth className="h-4 w-4" />
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <FiLogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
