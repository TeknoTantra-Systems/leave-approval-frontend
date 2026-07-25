import { useState, useEffect, useMemo } from "react";
import { PageHeader } from "@/components/common";
import StatCard from "@/components/common/StatCard";
import { Card, StatusBadge, Pagination, SearchBar, EmptyState, Loader } from "@/components/ui";
import { getAdminLeaveRequests } from "@/services/adminService";
import { LEAVE_TYPE_LABELS } from "@/constants/leaveTypes";
import { formatDate } from "@/utils/dateHelpers";
import { HiOutlineDocumentDuplicate, HiOutlineClock, HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineExclamationTriangle } from "react-icons/hi2";

const ITEMS_PER_PAGE = 8;

export default function LeaveRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterLeaveType, setFilterLeaveType] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getAdminLeaveRequests();
      setRequests(data);
      setLoading(false);
    }
    load();
  }, []);

  const departments = useMemo(() => {
    const set = new Set(requests.map((r) => r.department));
    return [...set];
  }, [requests]);

  const stats = useMemo(() => ({
    total: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    approved: requests.filter((r) => r.status === "approved").length,
    rejected: requests.filter((r) => r.status === "rejected").length,
  }), [requests]);

  const filtered = useMemo(() => {
    return requests.filter((r) => {
      const matchesSearch = !searchQuery ||
        r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = !filterDepartment || r.department === filterDepartment;
      const matchesStatus = !filterStatus || r.status === filterStatus;
      const matchesType = !filterLeaveType || r.leaveType === filterLeaveType;
      return matchesSearch && matchesDept && matchesStatus && matchesType;
    });
  }, [requests, searchQuery, filterDepartment, filterStatus, filterLeaveType]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterChange = (setter) => (value) => {
    setter(value);
    setCurrentPage(1);
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
        title="Leave Requests"
        description="View and manage all leave requests across the organization."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total" value={stats.total} icon={HiOutlineDocumentDuplicate} color="text-blue-500" bg="bg-blue-50 dark:bg-blue-500/10" />
        <StatCard label="Pending" value={stats.pending} icon={HiOutlineClock} color="text-amber-500" bg="bg-amber-50 dark:bg-amber-500/10" />
        <StatCard label="Approved" value={stats.approved} icon={HiOutlineCheckCircle} color="text-emerald-500" bg="bg-emerald-50 dark:bg-emerald-500/10" />
        <StatCard label="Rejected" value={stats.rejected} icon={HiOutlineXCircle} color="text-red-500" bg="bg-red-50 dark:bg-red-500/10" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <SearchBar
          value={searchQuery}
          onChange={handleFilterChange(setSearchQuery)}
          placeholder="Search by ID, name, or employee ID..."
          className="sm:w-72"
        />
        <select
          value={filterDepartment}
          onChange={(e) => handleFilterChange(setFilterDepartment)(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
        >
          <option value="">All Departments</option>
          {departments.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select
          value={filterLeaveType}
          onChange={(e) => handleFilterChange(setFilterLeaveType)(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
        >
          <option value="">All Leave Types</option>
          {Object.values(LEAVE_TYPE_LABELS).map((label) => (
            <option key={label} value={Object.keys(LEAVE_TYPE_LABELS).find((k) => LEAVE_TYPE_LABELS[k] === label)}>
              {label}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => handleFilterChange(setFilterStatus)(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="escalated">Escalated</option>
          <option value="clarification">Clarification</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <Card>
          <EmptyState
            icon={HiOutlineExclamationTriangle}
            title="No leave requests found"
            description="No leave requests match your filters."
          />
        </Card>
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 lg:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs font-medium uppercase tracking-wider text-slate-500 dark:border-slate-700 dark:bg-slate-700/50 dark:text-slate-400">
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">Employee</th>
                  <th className="px-5 py-3">Department</th>
                  <th className="px-5 py-3">Leave Type</th>
                  <th className="px-5 py-3">Dates</th>
                  <th className="px-5 py-3 text-center">Days</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {paginatedItems.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="px-5 py-3 font-medium text-slate-700 dark:text-slate-200">{req.id}</td>
                    <td className="px-5 py-3">
                      <p className="font-medium text-slate-700 dark:text-slate-200">{req.employeeName}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{req.employeeId}</p>
                    </td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-400">{req.department}</td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-400">{LEAVE_TYPE_LABELS[req.leaveType] ?? req.leaveType}</td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-400">
                      {formatDate(req.startDate)} - {formatDate(req.endDate)}
                    </td>
                    <td className="px-5 py-3 text-center font-medium text-slate-700 dark:text-slate-200">{req.totalDays}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={req.status} />
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
                    <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                      {req.id} &middot; {req.employeeId}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}
    </div>
  );
}
