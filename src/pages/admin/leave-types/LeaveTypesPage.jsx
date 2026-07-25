import { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { PageHeader } from "@/components/common";
import { Card, StatusBadge, Pagination, SearchBar, EmptyState, Button, Modal, ConfirmDialog, Loader } from "@/components/ui";
import { getLeaveTypes, createNewLeaveType, updateExistingLeaveType, removeLeaveType } from "@/services/adminService";
import { LEAVE_TYPES, LEAVE_TYPE_LABELS } from "@/constants/leaveTypes";
import { HiOutlinePlus, HiOutlineClipboardDocumentList } from "react-icons/hi2";

const ITEMS_PER_PAGE = 8;

const LEAVE_TYPE_OPTIONS = Object.values(LEAVE_TYPES).map((t) => ({
  value: t,
  label: LEAVE_TYPE_LABELS[t],
}));

export default function LeaveTypesPage() {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [formData, setFormData] = useState({ type: "", name: "", maxDays: "", isPaid: true, carryForward: false });
  const [saving, setSaving] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, lt: null });

  useEffect(() => {
    async function load() {
      const data = await getLeaveTypes();
      setLeaveTypes(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    return leaveTypes.filter((lt) => {
      return (
        !searchQuery ||
        lt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lt.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [leaveTypes, searchQuery]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const openCreateModal = () => {
    setEditingType(null);
    setFormData({ type: "", name: "", maxDays: "", isPaid: true, carryForward: false });
    setModalOpen(true);
  };

  const openEditModal = (lt) => {
    setEditingType(lt);
    setFormData({ type: lt.type, name: lt.name, maxDays: lt.maxDays, isPaid: lt.isPaid, carryForward: lt.carryForward });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.type) {
      toast.error("Name and type are required");
      return;
    }
    setSaving(true);
    try {
      const payload = { ...formData, maxDays: Number(formData.maxDays) || 0 };
      if (editingType) {
        await updateExistingLeaveType(editingType.id, payload);
        toast.success("Leave type updated");
      } else {
        await createNewLeaveType(payload);
        toast.success("Leave type created");
      }
      setModalOpen(false);
      const data = await getLeaveTypes();
      setLeaveTypes(data);
    } catch {
      toast.error("Failed to save leave type");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (lt) => {
    try {
      await removeLeaveType(lt.id);
      toast.success("Leave type deleted");
      const data = await getLeaveTypes();
      setLeaveTypes(data);
    } catch {
      toast.error("Failed to delete leave type");
    }
    setConfirmDialog({ open: false, lt: null });
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
        title="Leave Types"
        description="Manage leave types and their configurations."
        actions={
          <Button variant="primary" size="md" icon={HiOutlinePlus} onClick={openCreateModal}>
            Add Leave Type
          </Button>
        }
      />

      <SearchBar
        value={searchQuery}
        onChange={(v) => { setSearchQuery(v); setCurrentPage(1); }}
        placeholder="Search leave types..."
        className="sm:w-72"
      />

      {filtered.length === 0 ? (
        <Card>
          <EmptyState icon={HiOutlineClipboardDocumentList} title="No leave types found" description="Create your first leave type to get started." />
        </Card>
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 lg:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs font-medium uppercase tracking-wider text-slate-500 dark:border-slate-700 dark:bg-slate-700/50 dark:text-slate-400">
                  <th className="px-5 py-3">Leave Type</th>
                  <th className="px-5 py-3 text-center">Max Days</th>
                  <th className="px-5 py-3 text-center">Paid</th>
                  <th className="px-5 py-3 text-center">Carry Forward</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {paginatedItems.map((lt) => (
                  <tr key={lt.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="px-5 py-3 font-medium text-slate-700 dark:text-slate-200">{lt.name}</td>
                    <td className="px-5 py-3 text-center text-slate-600 dark:text-slate-400">{lt.maxDays}</td>
                    <td className="px-5 py-3 text-center">
                      {lt.isPaid ? (
                        <span className="text-emerald-600 dark:text-emerald-400">Yes</span>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500">No</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-center">
                      {lt.carryForward ? (
                        <span className="text-emerald-600 dark:text-emerald-400">Yes</span>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500">No</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={lt.status === "active" ? "approved" : "rejected"} />
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEditModal(lt)} className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">Edit</button>
                        <button onClick={() => setConfirmDialog({ open: true, lt })} className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 lg:hidden">
            {paginatedItems.map((lt) => (
              <Card key={lt.id} padding="p-4">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{lt.name}</p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      Max: {lt.maxDays} days &middot; {lt.isPaid ? "Paid" : "Unpaid"} &middot; {lt.carryForward ? "Carry Forward" : "No Carry Forward"}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button onClick={() => openEditModal(lt)} className="rounded-lg px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400">Edit</button>
                    <button onClick={() => setConfirmDialog({ open: true, lt })} className="rounded-lg px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400">Delete</button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingType ? "Edit Leave Type" : "Create Leave Type"}>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Leave Type</label>
            <select
              value={formData.type}
              onChange={(e) => {
                const val = e.target.value;
                const label = LEAVE_TYPE_LABELS[val] || "";
                setFormData({ ...formData, type: val, name: formData.name || label });
              }}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
            >
              <option value="">Select type</option>
              {LEAVE_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Display Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Annual Leave"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Max Days</label>
            <input
              type="number"
              value={formData.maxDays}
              onChange={(e) => setFormData({ ...formData, maxDays: e.target.value })}
              placeholder="e.g. 20"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
            />
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <input type="checkbox" checked={formData.isPaid} onChange={(e) => setFormData({ ...formData, isPaid: e.target.checked })} className="rounded border-slate-300" />
              Paid
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <input type="checkbox" checked={formData.carryForward} onChange={(e) => setFormData({ ...formData, carryForward: e.target.checked })} className="rounded border-slate-300" />
              Carry Forward
            </label>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Button variant="primary" size="md" onClick={handleSave} isLoading={saving}>
              {editingType ? "Save Changes" : "Create"}
            </Button>
            <Button variant="secondary" size="md" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, lt: null })}
        onConfirm={() => handleDelete(confirmDialog.lt)}
        title="Delete Leave Type"
        message={`Are you sure you want to delete "${confirmDialog.lt?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
      />
    </div>
  );
}
