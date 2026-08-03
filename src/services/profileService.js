import api from "./api";

export async function getProfile() {
  const { data: profileRes } = await api.get("/auth/profile");
  const profile = profileRes.data ?? profileRes;

  let departmentName = profile.department ?? "";
  if (profile.departmentId) {
    try {
      const { data: deptRes } = await api.get("/departments");
      const depts = deptRes.data?.data ?? deptRes.data ?? [];
      const dept = (Array.isArray(depts) ? depts : []).find(
        (d) => d.id === profile.departmentId
      );
      if (dept) {
        departmentName = dept.name;
      }
    } catch {
      // Keep existing departmentName
    }
  }

  return {
    ...profile,
    department: departmentName || (profile.department ?? ""),
  };
}

export async function updateProfileData() {
  throw new Error("Profile update is not yet supported by the backend.");
}
