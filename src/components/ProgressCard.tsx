import type { LucideIcon } from 'lucide-react'

export function ProgressCard({ label, value, detail, icon: Icon, tone = 'neutral', progress }: {
  label: string
  value: string | number
  detail?: string
  icon: LucideIcon
  tone?: 'neutral' | 'orange' | 'green' | 'blue'
  progress?: number
}) {
  return (
    <article className={`progress-card tone-${tone}`}>
      <div className="flex items-start justify-between gap-4">
        <div><p className="text-xs font-bold uppercase tracking-[.12em] text-muted dark:text-stone-400">{label}</p><p className="mt-2 font-display text-3xl font-black tracking-tight text-ink dark:text-white">{value}</p>{detail && <p className="mt-1 text-xs text-muted dark:text-stone-400">{detail}</p>}</div>
        <span className="progress-icon"><Icon size={20} /></span>
      </div>
      {progress !== undefined && <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-ink/8 dark:bg-white/10" role="progressbar" aria-label={label} aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}><div className="h-full rounded-full bg-current transition-all" style={{ width: `${Math.min(100, Math.max(0, progress))}%` }} /></div>}
    </article>
  )
}
