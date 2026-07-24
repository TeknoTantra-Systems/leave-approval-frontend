import { useState, useEffect, useMemo, useCallback } from "react";
import toast from "react-hot-toast";
import { PageHeader } from "@/components/common";
import StatCard from "@/components/common/StatCard";
import ApprovalDetailModal from "@/components/common/ApprovalDetailModal";
import RemarksDialog from "@/components/common/RemarksDialog";
import { Card, StatusBadge, Pagination, SearchBar, EmptyState, Loader } from "@/components/ui";
import { getPendingApprovalsForRole, approveLeaveRequest, rejectLeaveRequest, requestClarificationOnLeave } from "@/services/leaveService";
import { LEAVE_TYPE_LABELS } from "@/constants/leaveTypes";
import { formatDate } from "@/utils/dateHelpers";
import { HiOutlineBriefcase, HiOutlineClock, HiOutlineCheckCircle } from "react-icons/hi2";

const ITEMS_PER_PAGE = 5;

export default function DirectorApprovalPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [remarksDialog, setRemarksDialog] = useState({ open: false, action: null, request: null });
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getPendingApprovalsForRole("director");
      setRequests(data);
      setLoading(false);
    }
    load();
  }, []);

  const refresh = useCallback(async () => {
    const data = await getPendingApprovalsForRole("director");
    setRequests(data);
  }, []);

  const stats = useMemo(() => {
    return { escalated: requests.length, total: requests.length };
  }, [requests]);

  const filtered = useMemo(() => {
    return requests.filter((r) => {
      return (
        !searchQuery ||
        r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.department.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [requests, searchQuery]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const openModal = (req) => {
    setSelectedRequest(req);
    setModalOpen(true);
  };

  const handleApprove = async (req) => {
    setActionLoading(true);
    try {
      const updated = await approveLeaveRequest(req.id, "director", "Approved by Director");
      toast.success(`Leave ${updated.id} approved`);
      setModalOpen(false);
      refresh();
    } catch {
      toast.error("Failed to approve leave");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = (req) => {
    setRemarksDialog({ open: true, action: "reject", request: req });
  };

  const handleClarify = (req) => {
    setRemarksDialog({ open: true, action: "clarify", request: req });
  };

  const handleRemarksConfirm = async (remarks) => {
    const { action, request: req } = remarksDialog;
    setActionLoading(true);
    try {
      if (action === "reject") {
        const updated = await rejectLeaveRequest(req.id, "director", remarks);
        toast.success(`Leave ${updated.id} rejected`);
      } else {
        const updated = await requestClarificationOnLeave(req.id, "director", remarks);
        toast.success(`Clarification requested for ${updated.id}`);
      }
      setModalOpen(false);
      setRemarksDialog({ open: false, action: null, request: null });
      refresh();
    } catch {
      toast.error("Action failed");
    } finally {
      setActionLoading(false);
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
        title="Director Approvals"
        description="Review escalated leave requests requiring executive approval."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard
          label="Escalated Requests"
          value={stats.escalated}
          icon={HiOutlineClock}
          color="text-rose-600 dark:text-rose-400"
          bg="bg-rose-50 dark:bg-rose-900/30"
        />
        <StatCard
          label="Total Queue"
          value={stats.total}
          icon={HiOutlineBriefcase}
          color="text-blue-600 dark:text-blue-400"
          bg="bg-blue-50 dark:bg-blue-900/30"
        />
      </div>

      <SearchBar
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by ID, name, or department..."
        className="sm:w-72"
      />

      {filtered.length === 0 ? (
        <Card>
          <EmptyState
            icon={HiOutlineCheckCircle}
            title="All clear!"
            description="No escalated leave requests requiring your approval."
          />
        </Card>
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 lg:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs font-medium uppercase tracking-wider text-slate-500 dark:border-slate-700 dark:bg-slate-700/50 dark:text-slate-400">
                  <th className="px-5 py-3">Employee</th>
                  <th className="px-5 py-3">Leave Type</th>
                  <th className="px-5 py-3">Dates</th>
                  <th className="px-5 py-3 text-center">Days</th>
                  <th className="px-5 py-3">HR Decision</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {paginatedItems.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="px-5 py-3">
                      <p className="font-medium text-slate-700 dark:text-slate-200">{req.employeeName}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{req.department}</p>
                    </td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-400">
                      {LEAVE_TYPE_LABELS[req.leaveType] ?? req.leaveType}
                    </td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-400">
                      {formatDate(req.startDate)} - {formatDate(req.endDate)}
                    </td>
                    <td className="px-5 py-3 text-center font-medium text-slate-700 dark:text-slate-200">
                      {req.totalDays}
                    </td>
                    <td className="px-5 py-3">
                      {req.hrDecision && (
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                          <HiOutlineCheckCircle className="h-4 w-4" />
                          Approved
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => openModal(req)}
                        className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 lg:hidden">
            {paginatedItems.map((req) => (
              <Card key={req.id} padding="p-4">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        {req.employeeName}
                      </span>
                      <StatusBadge status={req.status} />
                    </div>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      {LEAVE_TYPE_LABELS[req.leaveType] ?? req.leaveType} &middot; {req.department}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-500">
                      {formatDate(req.startDate)} - {formatDate(req.endDate)} ({req.totalDays}d)
                    </p>
                  </div>
                  <button
                    onClick={() => openModal(req)}
                    className="shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                  >
                    Review
                  </button>
                </div>
              </Card>
            ))}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}

      <ApprovalDetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        request={selectedRequest}
        role="director"
        onApprove={handleApprove}
        onReject={handleReject}
        onClarify={handleClarify}
        isLoading={actionLoading}
      />

      <RemarksDialog
        isOpen={remarksDialog.open}
        onClose={() => setRemarksDialog({ open: false, action: null, request: null })}
        onConfirm={handleRemarksConfirm}
        title={remarksDialog.action === "reject" ? "Reject Leave" : "Request Clarification"}
        actionLabel={remarksDialog.action === "reject" ? "Reject" : "Request"}
        variant={remarksDialog.action === "reject" ? "destructive" : "primary"}
        isLoading={actionLoading}
      />
    </div>
  );
}
