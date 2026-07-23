import { BarChart3, BookOpen, FileQuestion, Layers3 } from 'lucide-react'

export type AppPage = 'words' | 'review' | 'practice' | 'progress'

const items = [
  { id: 'words' as const, label: 'Words', icon: BookOpen },
  { id: 'review' as const, label: 'Review', icon: Layers3 },
  { id: 'practice' as const, label: 'Practice', icon: FileQuestion },
  { id: 'progress' as const, label: 'Progress', icon: BarChart3 },
]

export function Navigation({ page, onChange, dueCount, variant }: { page: AppPage; onChange: (page: AppPage) => void; dueCount: number; variant: 'mobile' | 'desktop' }) {
  return (
    <>
      {variant === 'mobile' && <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-paper/95 px-3 pb-[max(.65rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl dark:border-white/10 dark:bg-charcoal/95 md:hidden" aria-label="Main navigation">
        <div className="mx-auto grid max-w-md grid-cols-4">
          {items.map(({ id, label, icon: Icon }) => (
            <button key={id} type="button" onClick={() => onChange(id)} aria-current={page === id ? 'page' : undefined} className={`relative flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-xs font-bold transition ${page === id ? 'bg-accent/12 text-accent-deep dark:bg-accent/15 dark:text-accent-light' : 'text-muted hover:text-ink dark:text-stone-400 dark:hover:text-white'}`}>
              <span className="relative"><Icon size={21} strokeWidth={page === id ? 2.5 : 2} />{id === 'review' && dueCount > 0 && <span className="absolute -right-3 -top-2 min-w-4 rounded-full bg-accent px-1 text-[9px] leading-4 text-white">{dueCount > 99 ? '99+' : dueCount}</span>}</span>
              {label}
            </button>
          ))}
        </div>
      </nav>}

      {variant === 'desktop' && <nav className="hidden items-center gap-1 rounded-2xl bg-white/70 p-1.5 shadow-sm ring-1 ring-ink/5 dark:bg-white/5 dark:ring-white/10 md:flex" aria-label="Main navigation">
        {items.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" onClick={() => onChange(id)} aria-current={page === id ? 'page' : undefined} className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${page === id ? 'bg-ink text-white dark:bg-white dark:text-ink' : 'text-muted hover:bg-white hover:text-ink dark:text-stone-400 dark:hover:bg-white/10 dark:hover:text-white'}`}>
            <Icon size={18} />{label}
            {id === 'review' && dueCount > 0 && <span className="rounded-full bg-accent px-1.5 text-[10px] leading-4 text-white">{dueCount > 99 ? '99+' : dueCount}</span>}
          </button>
        ))}
      </nav>}
    </>
  )
}
