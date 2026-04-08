import React from "react";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import "./ConfirmDialog.css";

function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  disabled = false,
}) {
  return (
    <Modal isOpen={isOpen} title={title} onClose={onCancel} size="small">
      <p className="confirm-dialog__message">{message}</p>
      <div className="confirm-dialog__actions">
        <Button variant="secondary" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={disabled}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
