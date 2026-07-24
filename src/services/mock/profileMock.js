export const MOCK_PROFILES = {
  "1": {
    id: "1",
    name: "Rahul Sharma",
    email: "employee@company.com",
    phone: "+91 98765 43210",
    department: "Engineering",
    role: "employee",
    employeeId: "EMP001",
    designation: "Senior Software Engineer",
    joiningDate: "2022-03-15",
    manager: "Priya Patel",
    location: "Bangalore, India",
    avatar: null,
  },
  "2": {
    id: "2",
    name: "Priya Patel",
    email: "manager@company.com",
    phone: "+91 98765 43211",
    department: "Engineering",
    role: "manager",
    employeeId: "MGR001",
    designation: "Engineering Manager",
    joiningDate: "2019-06-10",
    manager: "Anjali Gupta",
    location: "Bangalore, India",
    avatar: null,
  },
  "3": {
    id: "3",
    name: "Anjali Gupta",
    email: "hr@company.com",
    phone: "+91 98765 43212",
    department: "Human Resources",
    role: "hr",
    employeeId: "HR001",
    designation: "HR Director",
    joiningDate: "2018-01-20",
    manager: "Vikram Singh",
    location: "Mumbai, India",
    avatar: null,
  },
  "4": {
    id: "4",
    name: "Vikram Singh",
    email: "director@company.com",
    phone: "+91 98765 43213",
    department: "Executive",
    role: "director",
    employeeId: "DIR001",
    designation: "Chief Operating Officer",
    joiningDate: "2015-09-01",
    manager: null,
    location: "Mumbai, India",
    avatar: null,
  },
};

export async function fetchProfile(userId) {
  await new Promise((r) => setTimeout(r, 300));
  const profile = MOCK_PROFILES[userId];
  if (!profile) throw new Error("Profile not found");
  return { ...profile };
}

export async function updateProfile(userId, data) {
  await new Promise((r) => setTimeout(r, 400));
  const profile = MOCK_PROFILES[userId];
  if (!profile) throw new Error("Profile not found");
  Object.assign(profile, data);
  return { ...profile };
}
