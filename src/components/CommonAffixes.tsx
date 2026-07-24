import type { CommonAffix } from '../types/vocabulary'

export function CommonAffixes({ affixes, compact = false }: {
  affixes?: CommonAffix[]
  compact?: boolean
}) {
  if (!affixes?.length) return null

  return (
    <section>
      <p className="detail-label">Common prefix and suffix</p>
      <div className={`mt-2 ${compact ? 'grid gap-2 sm:grid-cols-2' : 'space-y-2'}`}>
        {affixes.map((affix) => (
          <div key={`${affix.type}-${affix.form}`} className="rounded-2xl border border-ink/8 bg-ink/[.025] p-3.5 dark:border-white/8 dark:bg-white/[.035]">
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-bold text-accent-deep dark:text-accent-light">{affix.form}</span>
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-accent-deep dark:text-accent-light">{affix.type}</span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted dark:text-stone-300">
              <span className="font-semibold text-ink dark:text-stone-100">Meaning:</span> {affix.meaning}.
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
