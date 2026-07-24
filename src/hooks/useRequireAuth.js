import { useAuth } from "@/context/AuthContext";

export function useRequireAuth() {
  const auth = useAuth();

  if (!auth.isAuthenticated) {
    return { ...auth, shouldRedirect: true };
  }

  return { ...auth, shouldRedirect: false };
}

export default useRequireAuth;
