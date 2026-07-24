import { fetchProfile, updateProfile } from "./mock/profileMock";

export async function getProfile(userId) {
  return fetchProfile(userId);
}

export async function updateProfileData(userId, data) {
  return updateProfile(userId, data);
}
