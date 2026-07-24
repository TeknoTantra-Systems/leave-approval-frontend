import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useUser } from "@/context/UserContext";
import { PageHeader } from "@/components/common";
import { Card, Input, Select, Textarea, Button, ConfirmDialog } from "@/components/ui";
import { LEAVE_TYPE_OPTIONS } from "@/constants/leaveTypes";
import { ROUTES } from "@/constants/routes";
import { calculateLeaveDays } from "@/utils/dateHelpers";
import { submitNewLeaveRequest } from "@/services/leaveService";

const leaveSchema = z.object({
  leaveType: z.string().min(1, "Please select a leave type"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  reason: z.string().min(10, "Reason must be at least 10 characters"),
}).refine((data) => {
  if (data.startDate && data.endDate) {
    return new Date(data.endDate) >= new Date(data.startDate);
  }
  return true;
}, {
  message: "End date must be on or after start date",
  path: ["endDate"],
});

export default function ApplyLeavePage() {
  const { name, employeeId, department } = useUser();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingData, setPendingData] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(leaveSchema),
    defaultValues: {
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
    },
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const totalDays = calculateLeaveDays(startDate, endDate);

  const onValidSubmit = (data) => {
    setPendingData({ ...data, totalDays });
    setShowConfirm(true);
  };

  const confirmSubmit = async () => {
    setShowConfirm(false);
    setIsSubmitting(true);
    try {
      await submitNewLeaveRequest({
        ...pendingData,
        employeeName: name,
        employeeId,
        department,
      });
      toast.success("Leave request submitted successfully!");
      navigate(ROUTES.LEAVE_HISTORY);
    } catch {
      toast.error("Failed to submit leave request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Apply for Leave"
        description="Submit a new leave request for approval."
      />

      <Card padding="p-6 sm:p-8">
        <form onSubmit={handleSubmit(onValidSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Employee Name" value={name} disabled />
            <Input label="Employee ID" value={employeeId} disabled />
          </div>

          <Input label="Department" value={department} disabled />

          <Select
            label="Leave Type"
            options={LEAVE_TYPE_OPTIONS}
            placeholder="Select leave type"
            error={errors.leaveType?.message}
            {...register("leaveType")}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Start Date"
              type="date"
              error={errors.startDate?.message}
              {...register("startDate")}
            />
            <Input
              label="End Date"
              type="date"
              error={errors.endDate?.message}
              {...register("endDate")}
            />
          </div>

          {totalDays > 0 && (
            <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
              Total leave days: <span className="font-semibold">{totalDays}</span>
              {totalDays > 10 && (
                <span className="ml-2 text-xs text-blue-600 dark:text-blue-300">
                  (Requires Director approval)
                </span>
              )}
              {totalDays > 3 && totalDays <= 10 && (
                <span className="ml-2 text-xs text-blue-600 dark:text-blue-300">
                  (Requires HR approval)
                </span>
              )}
            </div>
          )}

          <Textarea
            label="Reason"
            rows={4}
            placeholder="Please provide a reason for your leave request..."
            error={errors.reason?.message}
            {...register("reason")}
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate(ROUTES.LEAVE_HISTORY)}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              Submit Request
            </Button>
          </div>
        </form>
      </Card>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmSubmit}
        title="Confirm Leave Request"
        message={`Submit ${pendingData?.leaveType} request for ${totalDays} day(s) from ${pendingData?.startDate} to ${pendingData?.endDate}?`}
        confirmLabel="Submit"
        isLoading={isSubmitting}
      />
    </div>
  );
}
