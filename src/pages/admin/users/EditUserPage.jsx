import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { PageHeader } from "@/components/common";
import { Card, Input, Button, Loader } from "@/components/ui";
import { getUserById, updateExistingUser, getDepartments } from "@/services/adminService";
import { ROUTES } from "@/constants/routes";
import { ROLES, ROLE_LABELS } from "@/constants/roles";
import { HiOutlineArrowLeft } from "react-icons/hi2";

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  employeeId: z.string().min(1, "Employee ID is required"),
  role: z.string().min(1, "Role is required"),
  department: z.string().min(1, "Department is required"),
  phone: z.string().optional(),
  managerName: z.string().optional(),
});

const ROLE_OPTIONS = [
  { value: ROLES.EMPLOYEE, label: ROLE_LABELS[ROLES.EMPLOYEE] },
  { value: ROLES.MANAGER, label: ROLE_LABELS[ROLES.MANAGER] },
  { value: ROLES.HR, label: ROLE_LABELS[ROLES.HR] },
  { value: ROLES.DIRECTOR, label: ROLE_LABELS[ROLES.DIRECTOR] },
];

export default function EditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      employeeId: "",
      role: "",
      department: "",
      phone: "",
      managerName: "",
    },
  });

  useEffect(() => {
    async function load() {
      const [user, depts] = await Promise.all([getUserById(id), getDepartments()]);
      setDepartments(depts);
      if (user) {
        reset({
          name: user.name,
          email: user.email,
          employeeId: user.employeeId,
          role: user.role,
          department: user.department,
          phone: user.phone || "",
          managerName: user.managerName || "",
        });
      }
      setLoading(false);
    }
    load();
  }, [id, reset]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      await updateExistingUser(id, data);
      toast.success("User updated successfully");
      navigate(ROUTES.ADMIN_USERS);
    } catch {
      toast.error("Failed to update user");
    } finally {
      setSaving(false);
    }
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
        title="Edit User"
        description="Update user information and role."
        actions={
          <Button variant="secondary" size="md" icon={HiOutlineArrowLeft} onClick={() => navigate(ROUTES.ADMIN_USERS)}>
            Back
          </Button>
        }
      />

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Full Name" placeholder="Enter full name" error={errors.name?.message} {...register("name")} />
            <Input label="Email" type="email" placeholder="Enter email" error={errors.email?.message} {...register("email")} />
            <Input label="Employee ID" placeholder="e.g. EMP011" error={errors.employeeId?.message} {...register("employeeId")} />
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Role</label>
              <select
                {...register("role")}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
              >
                <option value="">Select role</option>
                {ROLE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Department</label>
              <select
                {...register("department")}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
              >
                <option value="">Select department</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
              {errors.department && <p className="mt-1 text-xs text-red-500">{errors.department.message}</p>}
            </div>
            <Input label="Phone" placeholder="Optional" {...register("phone")} />
            <Input label="Manager Name" placeholder="Optional" {...register("managerName")} />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" variant="primary" size="md" isLoading={saving}>
              Save Changes
            </Button>
            <Button type="button" variant="secondary" size="md" onClick={() => navigate(ROUTES.ADMIN_USERS)}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
