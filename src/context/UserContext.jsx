import { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const { user } = useAuth();

  const value = {
    user,
    name: user?.name ?? "",
    role: user?.role ?? null,
    department: user?.department ?? "",
    departmentId: user?.departmentId ?? null,
    employeeId: user?.employeeId ?? "",
    id: user?.id ?? null,
    managerId: user?.managerId ?? null,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export default UserContext;
