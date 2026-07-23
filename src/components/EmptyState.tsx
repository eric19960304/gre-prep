import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

export function EmptyState({ icon: Icon, title, description, action }: { icon: LucideIcon; title: string; description: string; action?: ReactNode }) {
  return (
    <div className="surface-card flex flex-col items-center px-6 py-14 text-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-accent/10 text-accent"><Icon size={26} /></span>
      <h2 className="mt-5 font-display text-2xl font-bold text-ink dark:text-white">{title}</h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted dark:text-stone-400">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
