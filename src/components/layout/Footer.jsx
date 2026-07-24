export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-4 dark:border-slate-700 dark:bg-slate-800">
      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          &copy; {new Date().getFullYear()} LeaveTrack. All rights reserved.
        </p>
        <div className="flex gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Support</span>
        </div>
      </div>
    </footer>
  );
}
