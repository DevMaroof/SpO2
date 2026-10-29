import Modal from './Modal';

export default function ConfirmDialog({
  isOpen,
  onConfirm,
  onCancel,
  title = 'Are you sure?',
  message = '',
  confirmLabel = 'Confirm',
  danger = false,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title} size="sm">
      <div className="space-y-4">
        {message && (
          <p className="text-sm text-gray-600 dark:text-gray-400">{message}</p>
        )}

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            className="btn-secondary"
            aria-label="Cancel"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={danger ? 'btn-danger' : 'btn-primary'}
            aria-label={confirmLabel}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}
