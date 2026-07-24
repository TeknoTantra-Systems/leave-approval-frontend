const MOCK_SETTINGS = {
  "1": {
    userId: "1",
    notifications: {
      email: true,
      push: true,
      leaveUpdates: true,
      approvalUpdates: true,
      reminders: true,
    },
    language: "en",
  },
  "2": {
    userId: "2",
    notifications: {
      email: true,
      push: true,
      leaveUpdates: true,
      approvalUpdates: true,
      reminders: true,
    },
    language: "en",
  },
  "3": {
    userId: "3",
    notifications: {
      email: true,
      push: false,
      leaveUpdates: true,
      approvalUpdates: true,
      reminders: false,
    },
    language: "en",
  },
  "4": {
    userId: "4",
    notifications: {
      email: false,
      push: false,
      leaveUpdates: true,
      approvalUpdates: true,
      reminders: false,
    },
    language: "en",
  },
};

const MOCK_PASSWORDS = {
  "1": "password123",
  "2": "password123",
  "3": "password123",
  "4": "password123",
};

export async function fetchSettings(userId) {
  await new Promise((r) => setTimeout(r, 200));
  const settings = MOCK_SETTINGS[userId];
  if (!settings) {
    return {
      userId,
      notifications: { email: true, push: true, leaveUpdates: true, approvalUpdates: true, reminders: true },
      language: "en",
    };
  }
  return { ...settings, notifications: { ...settings.notifications } };
}

export async function updateSettings(userId, data) {
  await new Promise((r) => setTimeout(r, 300));
  MOCK_SETTINGS[userId] = { ...MOCK_SETTINGS[userId], ...data };
  return { ...MOCK_SETTINGS[userId] };
}

export async function changePassword(userId, currentPassword, newPassword) {
  await new Promise((r) => setTimeout(r, 400));
  if (MOCK_PASSWORDS[userId] !== currentPassword) {
    throw new Error("Current password is incorrect");
  }
  MOCK_PASSWORDS[userId] = newPassword;
  return true;
}
