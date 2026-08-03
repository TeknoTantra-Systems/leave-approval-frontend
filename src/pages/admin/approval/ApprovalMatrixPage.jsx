import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { PageHeader } from "@/components/common";
import { Card, Button, Loader } from "@/components/ui";
import { getApprovalMatrix, updateMatrix } from "@/services/adminService";
import { HiOutlineShieldCheck } from "react-icons/hi2";

const APPROVER_OPTIONS = ["manager", "hr", "director"];

const APPROVER_LABELS = {
  manager: "Manager",
  hr: "HR",
  director: "Director",
};

export default function ApprovalMatrixPage() {
  const [matrix, setMatrix] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editMatrix, setEditMatrix] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getApprovalMatrix();
      setMatrix(data);
      setEditMatrix(data.map((m) => ({ ...m, approvers: [...m.approvers] })));
      setLoading(false);
    }
    load();
  }, []);

  const handleApproverToggle = (idx, approver) => {
    setEditMatrix((prev) => {
      const updated = [...prev];
      const row = { ...updated[idx], approvers: [...updated[idx].approvers] };
      if (row.approvers.includes(approver)) {
        row.approvers = row.approvers.filter((a) => a !== approver);
      } else {
        row.approvers.push(approver);
      }
      row.approvers.sort((a, b) => APPROVER_OPTIONS.indexOf(a) - APPROVER_OPTIONS.indexOf(b));
      updated[idx] = row;
      return updated;
    });
  };

  const handleMaxDaysChange = (idx, value) => {
    setEditMatrix((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], maxDays: value === "" ? null : Number(value) };
      return updated;
    });
  };

  const handleDescriptionChange = (idx, value) => {
    setEditMatrix((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], description: value };
      return updated;
    });
  };

  const addRow = () => {
    setEditMatrix((prev) => [
      ...prev,
      { id: null, maxDays: null, approvers: [], description: "" },
    ]);
  };

  const removeRow = (idx) => {
    setEditMatrix((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await updateMatrix(editMatrix);
      setMatrix(updated);
      setEditMatrix(updated.map((m) => ({ ...m, approvers: [...m.approvers] })));
      setEditMode(false);
      toast.success("Approval matrix updated");
    } catch {
      toast.error("Failed to update approval matrix");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditMatrix(matrix.map((m) => ({ ...m, approvers: [...m.approvers] })));
    setEditMode(false);
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
        title="Approval Matrix"
        description="Configure who approves leave requests based on duration."
      />

      <Card>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Define approval requirements based on the number of leave days requested.
          </p>
          {!editMode ? (
            <Button variant="primary" size="sm" icon={HiOutlineShieldCheck} onClick={() => setEditMode(true)}>
              Edit Matrix
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="primary" size="sm" onClick={handleSave} isLoading={saving}>
                Save
              </Button>
              <Button variant="secondary" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          )}
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-medium uppercase tracking-wider text-slate-500 dark:border-slate-700 dark:bg-slate-700/50 dark:text-slate-400">
                <th className="px-5 py-3">Max Days</th>
                <th className="px-5 py-3">Description</th>
                <th className="px-5 py-3">Approvers</th>
                {editMode && <th className="px-5 py-3 text-right">Remove</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {(editMode ? editMatrix : matrix).map((row, idx) => (
                <tr key={row.id || idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <td className="px-5 py-3">
                    {editMode ? (
                      <input
                        type="number"
                        value={row.maxDays ?? ""}
                        onChange={(e) => handleMaxDaysChange(idx, e.target.value)}
                        placeholder="No limit"
                        className="w-24 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
                      />
                    ) : (
                      <span className="font-medium text-slate-700 dark:text-slate-200">
                        {row.maxDays ? `<= ${row.maxDays}` : "No limit"}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    {editMode ? (
                      <input
                        type="text"
                        value={row.description}
                        onChange={(e) => handleDescriptionChange(idx, e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
                      />
                    ) : (
                      <span className="text-slate-600 dark:text-slate-400">{row.description}</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    {editMode ? (
                      <div className="flex flex-wrap gap-2">
                        {APPROVER_OPTIONS.map((a) => (
                          <label key={a} className="flex items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300">
                            <input
                              type="checkbox"
                              checked={row.approvers.includes(a)}
                              onChange={() => handleApproverToggle(idx, a)}
                              className="rounded border-slate-300"
                            />
                            {APPROVER_LABELS[a]}
                          </label>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {row.approvers.map((a) => (
                          <span
                            key={a}
                            className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                          >
                            {APPROVER_LABELS[a]}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  {editMode && (
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => removeRow(idx)}
                        className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400"
                      >
                        Remove
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile card view */}
        <div className="space-y-3 lg:hidden">
          {(editMode ? editMatrix : matrix).map((row, idx) => (
            <div key={row.id || idx} className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-700/50">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  {editMode ? (
                    <input
                      type="number"
                      value={row.maxDays ?? ""}
                      onChange={(e) => handleMaxDaysChange(idx, e.target.value)}
                      placeholder="No limit"
                      className="w-24 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
                    />
                  ) : (
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      {row.maxDays ? `<= ${row.maxDays} days` : "No limit"}
                    </p>
                  )}
                  {editMode ? (
                    <input
                      type="text"
                      value={row.description}
                      onChange={(e) => handleDescriptionChange(idx, e.target.value)}
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
                    />
                  ) : (
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{row.description}</p>
                  )}
                </div>
                {editMode && (
                  <button
                    onClick={() => removeRow(idx)}
                    className="ml-2 shrink-0 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="mt-3">
                {editMode ? (
                  <div className="flex flex-wrap gap-2">
                    {APPROVER_OPTIONS.map((a) => (
                      <label key={a} className="flex items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300">
                        <input
                          type="checkbox"
                          checked={row.approvers.includes(a)}
                          onChange={() => handleApproverToggle(idx, a)}
                          className="rounded border-slate-300"
                        />
                        {APPROVER_LABELS[a]}
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {row.approvers.map((a) => (
                      <span
                        key={a}
                        className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                      >
                        {APPROVER_LABELS[a]}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {editMode && (
          <div className="mt-4">
            <Button variant="secondary" size="sm" onClick={addRow}>
              + Add Row
            </Button>
          </div>
        )}
      </Card>

      <Card>
        <h3 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
          How It Works
        </h3>
        <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <p><strong className="text-slate-700 dark:text-slate-200">Manager:</strong> First level approver for all leave requests.</p>
          <p><strong className="text-slate-700 dark:text-slate-200">HR:</strong> Second level approver for leaves exceeding the manager-only threshold.</p>
          <p><strong className="text-slate-700 dark:text-slate-200">Director:</strong> Final approver for extended leaves exceeding the HR threshold.</p>
          <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
            Changes to the approval matrix will apply to new leave requests. Existing requests in the pipeline will follow their original approval chain.
          </p>
        </div>
      </Card>
    </div>
  );
}
