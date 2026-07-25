import api from "./api";

export async function getProfile() {
  const { data } = await api.get("/auth/profile");
  return data.data;
}

export async function updateProfileData(profileData) {
  const { data } = await api.put("/auth/profile", profileData);
  return data.data;
}
