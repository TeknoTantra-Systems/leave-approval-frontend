import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { PageHeader } from "@/components/common";
import { Card, Input, Button, Loader, ConfirmDialog } from "@/components/ui";
import { getSettings, updateSettingsData, changeUserPassword } from "@/services/settingsService";
import { ROUTES } from "@/constants/routes";
import { HiOutlineSun, HiOutlineMoon, HiOutlineBell, HiOutlineLockClosed, HiOutlineArrowRightOnRectangle, HiOutlineCheckCircle, HiOutlineGlobeAlt } from "react-icons/hi2";

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "kn", label: "Kannada" },
  { value: "ta", label: "Tamil" },
  { value: "te", label: "Telugu" },
];

function ToggleSwitch({ enabled, onChange, disabled = false }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      disabled={disabled}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
        enabled ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function SettingRow({ icon: Icon, label, description, children }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700">
          <Icon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</p>
          {description && (
            <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
          )}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    async function load() {
      const data = await getSettings(user?.id);
      setSettings(data);
      setLoading(false);
    }
    load();
  }, [user?.id]);

  const handleNotificationToggle = async (key) => {
    const updated = {
      ...settings,
      notifications: { ...settings.notifications, [key]: !settings.notifications[key] },
    };
    setSettings(updated);
    try {
      await updateSettingsData(user?.id, { notifications: updated.notifications });
      toast.success("Preference saved");
    } catch {
      setSettings(settings);
      toast.error("Failed to save preference");
    }
  };

  const handleLanguageChange = async (e) => {
    const newLang = e.target.value;
    const updated = { ...settings, language: newLang };
    setSettings(updated);
    try {
      await updateSettingsData(user?.id, { language: newLang });
      toast.success("Language preference saved");
    } catch {
      setSettings(settings);
      toast.error("Failed to save language preference");
    }
  };

  const onPasswordSubmit = async (data) => {
    setPasswordSuccess(false);
    setSaving(true);
    try {
      await changeUserPassword(user?.id, data.currentPassword, data.newPassword);
      reset();
      setPasswordSuccess(true);
      toast.success("Password changed successfully");
    } catch (err) {
      toast.error(err.message || "Failed to change password");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

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
        title="Settings"
        description="Manage your preferences and account settings."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Appearance
            </h3>
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              <SettingRow
                icon={isDark ? HiOutlineMoon : HiOutlineSun}
                label="Dark Mode"
                description={isDark ? "Dark theme is active" : "Light theme is active"}
              >
                <ToggleSwitch enabled={isDark} onChange={toggleTheme} />
              </SettingRow>
            </div>
          </Card>

          <Card>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Notification Preferences
            </h3>
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              <SettingRow
                icon={HiOutlineBell}
                label="Email Notifications"
                description="Receive notifications via email"
              >
                <ToggleSwitch
                  enabled={settings?.notifications?.email}
                  onChange={() => handleNotificationToggle("email")}
                />
              </SettingRow>
              <SettingRow
                icon={HiOutlineBell}
                label="Push Notifications"
                description="Receive push notifications in browser"
              >
                <ToggleSwitch
                  enabled={settings?.notifications?.push}
                  onChange={() => handleNotificationToggle("push")}
                />
              </SettingRow>
              <SettingRow
                icon={HiOutlineBell}
                label="Leave Updates"
                description="Get notified about leave status changes"
              >
                <ToggleSwitch
                  enabled={settings?.notifications?.leaveUpdates}
                  onChange={() => handleNotificationToggle("leaveUpdates")}
                />
              </SettingRow>
              <SettingRow
                icon={HiOutlineBell}
                label="Approval Updates"
                description="Get notified about approval decisions"
              >
                <ToggleSwitch
                  enabled={settings?.notifications?.approvalUpdates}
                  onChange={() => handleNotificationToggle("approvalUpdates")}
                />
              </SettingRow>
              <SettingRow
                icon={HiOutlineBell}
                label="Reminders"
                description="Receive leave and task reminders"
              >
                <ToggleSwitch
                  enabled={settings?.notifications?.reminders}
                  onChange={() => handleNotificationToggle("reminders")}
                />
              </SettingRow>
            </div>
          </Card>

          <Card>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Change Password
            </h3>
            <form onSubmit={handleSubmit(onPasswordSubmit)} className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                placeholder="Enter current password"
                error={errors.currentPassword?.message}
                {...register("currentPassword")}
              />
              <Input
                label="New Password"
                type="password"
                placeholder="Enter new password"
                error={errors.newPassword?.message}
                {...register("newPassword")}
              />
              <Input
                label="Confirm New Password"
                type="password"
                placeholder="Confirm new password"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />
              <div className="flex items-center gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  icon={HiOutlineLockClosed}
                  isLoading={isSubmitting || saving}
                >
                  Update Password
                </Button>
                {passwordSuccess && (
                  <span className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400">
                    <HiOutlineCheckCircle className="h-4 w-4" />
                    Updated
                  </span>
                )}
              </div>
            </form>
          </Card>

          <Card>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Language
            </h3>
            <SettingRow
              icon={HiOutlineGlobeAlt}
              label="Display Language"
              description="Select your preferred language for the interface"
            >
              <select
                value={settings?.language ?? "en"}
                onChange={handleLanguageChange}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
                aria-label="Select language"
              >
                {LANGUAGE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </SettingRow>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Account
            </h3>
            <div className="space-y-3">
              <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-700/50">
                <p className="text-xs text-slate-500 dark:text-slate-400">Signed in as</p>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{user?.email}</p>
              </div>
              <Button
                variant="destructive"
                size="md"
                icon={HiOutlineArrowRightOnRectangle}
                fullWidth
                onClick={() => setShowLogoutConfirm(true)}
              >
                Sign Out
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
        title="Sign Out"
        message="Are you sure you want to sign out? You will need to log in again."
        confirmLabel="Sign Out"
        variant="destructive"
      />
    </div>
  );
}
