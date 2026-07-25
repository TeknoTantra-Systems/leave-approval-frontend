import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { PageHeader } from "@/components/common";
import { Card, StatusBadge, Pagination, SearchBar, EmptyState, Button, ConfirmDialog, Loader } from "@/components/ui";
import { getAllUsers, toggleUserStatus, removeUser } from "@/services/adminService";
import { ROUTES } from "@/constants/routes";
import { ROLE_LABELS } from "@/constants/roles";
import { HiOutlinePlus, HiOutlineUserGroup } from "react-icons/hi2";

const ITEMS_PER_PAGE = 8;

export default function UsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, action: null, user: null });

  useEffect(() => {
    async function load() {
      const data = await getAllUsers();
      setUsers(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const q = searchQuery.toLowerCase();
      const deptName = typeof u.department === "object" ? u.department?.name : u.department;
      return (
        !searchQuery ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.employeeId || "").toLowerCase().includes(q) ||
        (deptName || "").toLowerCase().includes(q) ||
        (ROLE_LABELS[u.role] ?? "").toLowerCase().includes(q)
      );
    });
  }, [users, searchQuery]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleDeactivate = async (user) => {
    try {
      await toggleUserStatus(user.id);
      toast.success(`User ${user.status === "active" ? "deactivated" : "activated"}`);
      const data = await getAllUsers();
      setUsers(data);
    } catch {
      toast.error("Failed to update user status");
    }
    setConfirmDialog({ open: false, action: null, user: null });
  };

  const handleDelete = async (user) => {
    try {
      await removeUser(user.id);
      toast.success("User deleted");
      const data = await getAllUsers();
      setUsers(data);
    } catch {
      toast.error("Failed to delete user");
    }
    setConfirmDialog({ open: false, action: null, user: null });
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description="Manage all system users and their roles."
        actions={
          <Button
            variant="primary"
            size="md"
            icon={HiOutlinePlus}
            onClick={() => navigate(ROUTES.ADMIN_CREATE_USER)}
          >
            Add User
          </Button>
        }
      />

      <SearchBar
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by name, email, ID, department, or role..."
        className="sm:w-96"
      />

      {filtered.length === 0 ? (
        <Card>
          <EmptyState
            icon={HiOutlineUserGroup}
            title="No users found"
            description="No users match your search criteria."
          />
        </Card>
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 lg:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs font-medium uppercase tracking-wider text-slate-500 dark:border-slate-700 dark:bg-slate-700/50 dark:text-slate-400">
                  <th className="px-5 py-3">Employee ID</th>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Department</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3">Manager</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {paginatedItems.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="px-5 py-3 font-medium text-slate-700 dark:text-slate-200">
                      {user.employeeId}
                    </td>
                    <td className="px-5 py-3">
                      <p className="font-medium text-slate-700 dark:text-slate-200">{user.name}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{user.email}</p>
                    </td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-400">
                      {typeof user.department === "object" ? user.department?.name : user.department}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={user.role} type="role" />
                    </td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-400">
                      {typeof user.manager === "object" ? user.manager?.name : (user.managerName || user.manager || "—")}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge
                        status={user.status === "active" ? "approved" : "rejected"}
                      />
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(ROUTES.ADMIN_USER_DETAILS.replace(":id", user.id))}
                          className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
                        >
                          View
                        </button>
                        <button
                          onClick={() => navigate(ROUTES.ADMIN_EDIT_USER.replace(":id", user.id))}
                          className="text-sm font-medium text-slate-600 hover:text-slate-700 dark:text-slate-400"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setConfirmDialog({ open: true, action: "deactivate", user })}
                          className="text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400"
                        >
                          {user.status === "active" ? "Deactivate" : "Activate"}
                        </button>
                        <button
                          onClick={() => setConfirmDialog({ open: true, action: "delete", user })}
                          className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 lg:hidden">
            {paginatedItems.map((user) => (
              <Card key={user.id} padding="p-4">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        {user.name}
                      </span>
                      <StatusBadge status={user.role} type="role" />
                    </div>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      {user.employeeId || ""} &middot; {typeof user.department === "object" ? user.department?.name : user.department}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-500">
                      {user.email}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <StatusBadge status={user.status === "active" ? "approved" : "rejected"} />
                      {(user.managerName || user.manager) && (
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          Mgr: {typeof user.manager === "object" ? user.manager?.name : (user.managerName || user.manager)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col gap-1">
                    <button
                      onClick={() => navigate(ROUTES.ADMIN_USER_DETAILS.replace(":id", user.id))}
                      className="rounded-lg px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(ROUTES.ADMIN_EDIT_USER.replace(":id", user.id))}
                      className="rounded-lg px-3 py-1 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}

      <ConfirmDialog
        isOpen={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, action: null, user: null })}
        onConfirm={() => {
          if (confirmDialog.action === "deactivate") handleDeactivate(confirmDialog.user);
          else handleDelete(confirmDialog.user);
        }}
        title={confirmDialog.action === "deactivate" ? "Change User Status" : "Delete User"}
        message={
          confirmDialog.action === "deactivate"
            ? `Are you sure you want to ${confirmDialog.user?.status === "active" ? "deactivate" : "activate"} ${confirmDialog.user?.name}?`
            : `Are you sure you want to permanently delete ${confirmDialog.user?.name}? This action cannot be undone.`
        }
        confirmLabel={confirmDialog.action === "deactivate" ? "Confirm" : "Delete"}
        variant={confirmDialog.action === "delete" ? "destructive" : "primary"}
      />
    </div>
  );
}
