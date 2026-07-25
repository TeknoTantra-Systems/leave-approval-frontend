import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { PageHeader } from "@/components/common";
import { Card, StatusBadge, Button, Loader } from "@/components/ui";
import { getUserById, toggleUserStatus, removeUser } from "@/services/adminService";
import { ROUTES } from "@/constants/routes";
import { ROLE_LABELS } from "@/constants/roles";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineArrowLeft } from "react-icons/hi2";

export default function UserDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getUserById(id);
      setUser(data);
      setLoading(false);
    }
    load();
  }, [id]);

  const handleDeactivate = async () => {
    try {
      await toggleUserStatus(id);
      toast.success("User status updated");
      setUser((prev) => ({ ...prev, status: prev.status === "active" ? "inactive" : "active" }));
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async () => {
    try {
      await removeUser(id);
      toast.success("User deleted");
      navigate(ROUTES.ADMIN_USERS);
    } catch {
      toast.error("Failed to delete user");
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <PageHeader title="User Not Found" description="The requested user does not exist." />
        <Button variant="secondary" icon={HiOutlineArrowLeft} onClick={() => navigate(ROUTES.ADMIN_USERS)}>
          Back to Users
        </Button>
      </div>
    );
  }

  const infoItems = [
    { label: "Employee ID", value: user.employeeId },
    { label: "Email", value: user.email },
    { label: "Role", value: ROLE_LABELS[user.role] ?? user.role },
    { label: "Department", value: typeof user.department === "object" ? user.department?.name : user.department },
    { label: "Manager", value: typeof user.manager === "object" ? user.manager?.name : (user.managerName || user.manager || "None") },
    { label: "Phone", value: user.phone || "—" },
    { label: "Join Date", value: user.joinDate },
    { label: "Status", value: user.status },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={user.name}
        description="User details and management."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="md"
              icon={HiOutlineArrowLeft}
              onClick={() => navigate(ROUTES.ADMIN_USERS)}
            >
              Back
            </Button>
            <Button
              variant="primary"
              size="md"
              icon={HiOutlinePencil}
              onClick={() => navigate(ROUTES.ADMIN_EDIT_USER.replace(":id", id))}
            >
              Edit
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={handleDeactivate}
            >
              {user.status === "active" ? "Deactivate" : "Activate"}
            </Button>
            <Button
              variant="destructive"
              size="md"
              icon={HiOutlineTrash}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        }
      />

      <Card>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {infoItems.map((item) => (
            <div key={item.label}>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {item.label}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                {item.label === "Status" ? (
                  <StatusBadge status={item.value === "active" ? "approved" : "rejected"} />
                ) : item.label === "Role" ? (
                  <StatusBadge status={user.role} type="role" />
                ) : (
                  item.value
                )}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
