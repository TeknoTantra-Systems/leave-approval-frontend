import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

export default function RemarksDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Add Remarks",
  actionLabel = "Submit",
  variant = "primary",
  isLoading = false,
}) {
  const [remarks, setRemarks] = useState("");

  const handleConfirm = () => {
    onConfirm(remarks);
    setRemarks("");
  };

  const handleClose = () => {
    setRemarks("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title} maxWidth="max-w-md">
      <Textarea
        label="Remarks"
        rows={4}
        placeholder="Enter your remarks..."
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
      />
      <div className="mt-4 flex justify-end gap-3">
        <Button variant="ghost" size="md" onClick={handleClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          variant={variant}
          size="md"
          onClick={handleConfirm}
          isLoading={isLoading}
          disabled={!remarks.trim()}
        >
          {actionLabel}
        </Button>
      </div>
    </Modal>
  );
}
