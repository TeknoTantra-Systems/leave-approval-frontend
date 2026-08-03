import api from "./api";
import { mapBackendNotification } from "@/utils/transformers";

function unwrapData(response) {
  const body = response.data;
  if (body?.data?.data) return body.data.data;
  if (body?.data && Array.isArray(body.data)) return body.data;
  if (Array.isArray(body)) return body;
  return body?.data ?? body ?? [];
}

export async function getNotifications() {
  const { data: response } = await api.get("/notifications");
  const raw = unwrapData(response);
  return (Array.isArray(raw) ? raw : []).map(mapBackendNotification);
}

export async function markAsRead(id) {
  const { data: response } = await api.patch(`/notifications/${id}/read`);
  return response.data ?? response;
}

export async function markAllAsRead() {
  try {
    const notifications = await getNotifications();
    const unread = notifications.filter((n) => !n.isRead);
    await Promise.all(
      unread.map((n) => api.patch(`/notifications/${n.id}/read`))
    );
  } catch {
    // Best-effort: ignore individual failures
  }
  return true;
}

export async function removeNotification() {
  // No backend endpoint; client-side only (pages handle this in state)
  return true;
}

export async function addNotification() {
  // Notifications are server-created; no-op on frontend
  return null;
}
