import { fetchSettings, updateSettings, changePassword } from "./mock/settingsMock";

export async function getSettings(userId) {
  return fetchSettings(userId);
}

export async function updateSettingsData(userId, data) {
  return updateSettings(userId, data);
}

export async function changeUserPassword(userId, currentPassword, newPassword) {
  return changePassword(userId, currentPassword, newPassword);
}
