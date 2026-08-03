const SETTINGS_KEY_PREFIX = "user_settings_";
const DEFAULT_SETTINGS = {
  notifications: {
    email: true,
    push: true,
    leaveUpdates: true,
    approvalUpdates: true,
    reminders: true,
  },
  language: "en",
};

export async function getSettings(userId) {
  const stored = localStorage.getItem(`${SETTINGS_KEY_PREFIX}${userId}`);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return {
        ...DEFAULT_SETTINGS,
        ...parsed,
        notifications: { ...DEFAULT_SETTINGS.notifications, ...parsed.notifications },
      };
    } catch {
      // Fall through to defaults
    }
  }
  return { userId, ...DEFAULT_SETTINGS };
}

export async function updateSettingsData(userId, data) {
  const current = await getSettings(userId);
  const updated = {
    ...current,
    ...data,
    notifications: data.notifications
      ? { ...current.notifications, ...data.notifications }
      : current.notifications,
  };
  localStorage.setItem(`${SETTINGS_KEY_PREFIX}${userId}`, JSON.stringify(updated));
  return updated;
}

export async function changeUserPassword() {
  throw new Error("Password change is not yet supported by the backend.");
}
