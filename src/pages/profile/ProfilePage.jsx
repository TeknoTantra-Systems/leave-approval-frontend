import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { PageHeader } from "@/components/common";
import { Card, Avatar, Loader, EmptyState } from "@/components/ui";
import { getProfile } from "@/services/profileService";
import { getLeaveBalance } from "@/services/leaveService";
import { formatDate } from "@/utils/dateHelpers";
import { LEAVE_TYPE_LABELS } from "@/constants/leaveTypes";
import { ROLE_LABELS } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";
import { HiOutlineCog6Tooth, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineMapPin, HiOutlineUser, HiOutlinePhone, HiOutlineEnvelope, HiOutlineBuildingOffice2, HiOutlineUserCircle } from "react-icons/hi2";

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700">
        <Icon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{value || "-"}</p>
      </div>
    </div>
  );
}

function LeaveBalanceBar({ label, total, used, pending }) {
  const available = total - used - pending;
  const usedPct = total > 0 ? (used / total) * 100 : 0;
  const pendingPct = total > 0 ? (pending / total) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700 dark:text-slate-200">{label}</span>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {available} available / {total} total
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
        <div className="flex h-full">
          <div
            className="bg-emerald-500 transition-all"
            style={{ width: `${usedPct}%` }}
          />
          <div
            className="bg-amber-400 transition-all"
            style={{ width: `${pendingPct}%` }}
          />
        </div>
      </div>
      <div className="flex gap-4 text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> Used ({used})
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-amber-400" /> Pending ({pending})
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-600" /> Available ({available})
        </span>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { user } = useUser();
  const [profile, setProfile] = useState(null);
  const [leaveBalance, setLeaveBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const [profileData, balanceData] = await Promise.all([
          getProfile(),
          getLeaveBalance(user?.id),
        ]);
        setProfile(profileData);
        setLeaveBalance(balanceData);
      } catch (err) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="My Profile"
          description="View your personal information and leave balance."
        />
        <Card>
          <EmptyState
            icon={HiOutlineUserCircle}
            title="Profile not available"
            description={error || "No profile data found for your account."}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Profile"
        description="View your personal information and leave balance."
        actions={
          <Link
            to={ROUTES.SETTINGS}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <HiOutlineCog6Tooth className="h-4 w-4" />
            Settings
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="flex flex-col items-center text-center lg:col-span-1">
          <Avatar name={profile?.name} src={profile?.avatar} size="lg" className="h-20 w-20 text-2xl" />
          <h2 className="mt-4 text-lg font-bold text-slate-800 dark:text-white">
            {profile?.name}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {profile?.designation || ROLE_LABELS[profile?.role] || profile?.role}
          </p>
          <span className="mt-2 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            {ROLE_LABELS[profile?.role] ?? profile?.role}
          </span>
          <div className="mt-4 w-full border-t border-slate-100 pt-4 dark:border-slate-700">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Employee ID
            </p>
            <p className="font-mono text-sm font-semibold text-slate-700 dark:text-slate-200">
              {profile?.employeeId || "-"}
            </p>
          </div>
        </Card>

        <div className="space-y-6 lg:col-span-2">
          <Card>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <InfoRow icon={HiOutlineUser} label="Full Name" value={profile?.name} />
              <InfoRow icon={HiOutlineEnvelope} label="Email" value={profile?.email} />
              <InfoRow icon={HiOutlinePhone} label="Phone" value={profile?.phone} />
              <InfoRow icon={HiOutlineBuildingOffice2} label="Department" value={profile?.department?.name || profile?.department} />
              <InfoRow icon={HiOutlineBriefcase} label="Designation" value={profile?.designation || ROLE_LABELS[profile?.role] || profile?.role} />
              <InfoRow icon={HiOutlineCalendarDays} label="Joining Date" value={formatDate(profile?.joiningDate)} />
              <InfoRow icon={HiOutlineUser} label="Reporting Manager" value={profile?.manager?.name || profile?.manager} />
              <InfoRow icon={HiOutlineMapPin} label="Location" value={profile?.location} />
            </div>
          </Card>

          {leaveBalance && (
            <Card>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Leave Balance Summary
              </h3>
              <div className="space-y-5">
                {Object.entries(leaveBalance).map(([key, bal]) => (
                  <LeaveBalanceBar
                    key={key}
                    label={LEAVE_TYPE_LABELS[key] ?? key}
                    total={bal.total}
                    used={bal.used}
                    pending={bal.pending}
                  />
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
