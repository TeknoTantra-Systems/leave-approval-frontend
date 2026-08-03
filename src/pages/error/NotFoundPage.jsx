import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { HiOutlineHome } from "react-icons/hi2";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-900">
      <div className="text-center">
        <p className="text-6xl font-bold text-blue-600 sm:text-8xl">404</p>
        <h1 className="mt-4 text-2xl font-bold text-slate-800 dark:text-white">
          Page Not Found
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to={ROUTES.EMPLOYEE_DASHBOARD}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          <HiOutlineHome className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
