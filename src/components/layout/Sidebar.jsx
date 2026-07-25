import { NavLink, Link } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { NAV_ITEMS } from "@/constants/navigation";
import { HiOutlineXMark } from "react-icons/hi2";

export default function Sidebar({ isOpen, onClose }) {
  const { user } = useUser();
  const navItems = NAV_ITEMS[user?.role] ?? [];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white
          transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          dark:border-slate-700 dark:bg-slate-800
        `}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-700">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
              LT
            </div>
            <span className="text-lg font-bold text-slate-800 dark:text-white">
              LeaveTrack
            </span>
          </Link>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-700"
            aria-label="Close sidebar"
          >
            <HiOutlineXMark className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700/50 dark:hover:text-slate-200"
                    }`
                  }
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-slate-200 px-5 py-4 dark:border-slate-700">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            LeaveTrack v1.0
          </p>
        </div>
      </aside>
    </>
  );
}
