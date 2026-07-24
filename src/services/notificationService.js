import {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  createNotification,
} from "./mock/notificationMock";

export async function getNotifications(userId) {
  return fetchNotifications(userId);
}

export async function markAsRead(id) {
  return markNotificationAsRead(id);
}

export async function markAllAsRead(userId) {
  return markAllNotificationsAsRead(userId);
}

export async function removeNotification(id) {
  return deleteNotification(id);
}

export async function addNotification(data) {
  return createNotification(data);
}
