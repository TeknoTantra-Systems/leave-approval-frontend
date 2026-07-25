import { createContext, useContext, useState, useCallback } from "react";
import { ROLES } from "@/constants";

const AuthContext = createContext(null);

const MOCK_USERS = [
  {
    id: "1",
    email: "employee@company.com",
    password: "password123",
    name: "Rahul Sharma",
    role: ROLES.EMPLOYEE,
    department: "Engineering",
    employeeId: "EMP001",
  },
  {
    id: "2",
    email: "manager@company.com",
    password: "password123",
    name: "Priya Patel",
    role: ROLES.MANAGER,
    department: "Engineering",
    employeeId: "MGR001",
  },
  {
    id: "3",
    email: "hr@company.com",
    password: "password123",
    name: "Anjali Gupta",
    role: ROLES.HR,
    department: "Human Resources",
    employeeId: "HR001",
  },
  {
    id: "4",
    email: "director@company.com",
    password: "password123",
    name: "Vikram Singh",
    role: ROLES.DIRECTOR,
    department: "Executive",
    employeeId: "DIR001",
  },
  {
    id: "5",
    email: "admin@company.com",
    password: "password123",
    name: "System Admin",
    role: ROLES.APP_ADMIN,
    department: "IT",
    employeeId: "ADM001",
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("auth_user");
    return stored ? JSON.parse(stored) : null;
  });

  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      setIsLoading(false);
      throw new Error("Invalid email or password");
    }

    // eslint-disable-next-line no-unused-vars
    const { password: _pw, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem("auth_user", JSON.stringify(safeUser));
    setIsLoading(false);
    return safeUser;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("auth_user");
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
