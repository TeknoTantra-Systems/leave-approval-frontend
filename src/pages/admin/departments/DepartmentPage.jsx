import { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { PageHeader } from "@/components/common";
import { Card, StatusBadge, Pagination, SearchBar, EmptyState, Button, Modal, ConfirmDialog, Loader } from "@/components/ui";
import { getDepartments, createNewDepartment, updateExistingDepartment, removeDepartment } from "@/services/adminService";
import { HiOutlinePlus, HiOutlineBuildingOffice2 } from "react-icons/hi2";

const ITEMS_PER_PAGE = 8;

export default function DepartmentPage() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState(null);
  const [formData, setFormData] = useState({ name: "", head: "" });
  const [saving, setSaving] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, dept: null });

  useEffect(() => {
    async function load() {
      const data = await getDepartments();
      setDepartments(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    return departments.filter((d) => {
      return (
        !searchQuery ||
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (d.head && d.head.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  }, [departments, searchQuery]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const openCreateModal = () => {
    setEditingDept(null);
    setFormData({ name: "", head: "" });
    setModalOpen(true);
  };

  const openEditModal = (dept) => {
    setEditingDept(dept);
    setFormData({ name: dept.name, head: dept.head || "" });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error("Department name is required");
      return;
    }
    setSaving(true);
    try {
      if (editingDept) {
        await updateExistingDepartment(editingDept.id, formData);
        toast.success("Department updated");
      } else {
        await createNewDepartment(formData);
        toast.success("Department created");
      }
      setModalOpen(false);
      const data = await getDepartments();
      setDepartments(data);
    } catch {
      toast.error("Failed to save department");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (dept) => {
    try {
      await removeDepartment(dept.id);
      toast.success("Department deleted");
      const data = await getDepartments();
      setDepartments(data);
    } catch {
      toast.error("Failed to delete department");
    }
    setConfirmDialog({ open: false, dept: null });
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
        title="Departments"
        description="Manage organizational departments."
        actions={
          <Button variant="primary" size="md" icon={HiOutlinePlus} onClick={openCreateModal}>
            Add Department
          </Button>
        }
      />

      <SearchBar
        value={searchQuery}
        onChange={(v) => { setSearchQuery(v); setCurrentPage(1); }}
        placeholder="Search departments..."
        className="sm:w-72"
      />

      {filtered.length === 0 ? (
        <Card>
          <EmptyState icon={HiOutlineBuildingOffice2} title="No departments found" description="Create your first department to get started." />
        </Card>
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 lg:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs font-medium uppercase tracking-wider text-slate-500 dark:border-slate-700 dark:bg-slate-700/50 dark:text-slate-400">
                  <th className="px-5 py-3">Department</th>
                  <th className="px-5 py-3">Head</th>
                  <th className="px-5 py-3 text-center">Employees</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {paginatedItems.map((dept) => (
                  <tr key={dept.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="px-5 py-3 font-medium text-slate-700 dark:text-slate-200">{dept.name}</td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-400">{dept.head || "—"}</td>
                    <td className="px-5 py-3 text-center font-medium text-slate-700 dark:text-slate-200">{dept.employeeCount}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={dept.status === "active" ? "approved" : "rejected"} />
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEditModal(dept)} className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">Edit</button>
                        <button onClick={() => setConfirmDialog({ open: true, dept })} className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 lg:hidden">
            {paginatedItems.map((dept) => (
              <Card key={dept.id} padding="p-4">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{dept.name}</p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Head: {dept.head || "—"}</p>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-500">{dept.employeeCount} employees</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button onClick={() => openEditModal(dept)} className="rounded-lg px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400">Edit</button>
                    <button onClick={() => setConfirmDialog({ open: true, dept })} className="rounded-lg px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400">Delete</button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingDept ? "Edit Department" : "Create Department"}>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Department Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter department name"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Department Head</label>
            <input
              type="text"
              value={formData.head}
              onChange={(e) => setFormData({ ...formData, head: e.target.value })}
              placeholder="Optional"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
            />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Button variant="primary" size="md" onClick={handleSave} isLoading={saving}>
              {editingDept ? "Save Changes" : "Create"}
            </Button>
            <Button variant="secondary" size="md" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, dept: null })}
        onConfirm={() => handleDelete(confirmDialog.dept)}
        title="Delete Department"
        message={`Are you sure you want to delete "${confirmDialog.dept?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
      />
    </div>
  );
}
