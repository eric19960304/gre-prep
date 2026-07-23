import { AlertTriangle } from 'lucide-react'
import { Modal } from './Modal'

export function ConfirmationDialog({ word, onCancel, onConfirm }: { word: string; onCancel: () => void; onConfirm: () => void }) {
  return (
    <Modal title="Delete this word?" description="This action cannot be undone." onClose={onCancel} size="sm">
      <div className="p-5 md:p-7">
        <div className="flex gap-3 rounded-2xl bg-red-50 p-4 text-red-900 dark:bg-red-950/40 dark:text-red-100">
          <AlertTriangle className="mt-0.5 shrink-0" size={20} />
          <p className="text-sm">“<strong>{word}</strong>” and its review history will be permanently removed.</p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button type="button" className="button-secondary" onClick={onCancel}>Cancel</button>
          <button type="button" className="button-danger" onClick={onConfirm}>Delete word</button>
        </div>
      </div>
    </Modal>
  )
}
