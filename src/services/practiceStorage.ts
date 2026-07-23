import type { StoredPracticeData } from '../types/practice'

export const PRACTICE_STORAGE_KEY = 'lexilo:practice:v1'

const emptyPracticeData = (): StoredPracticeData => ({ version: 1, attempts: [] })

export const practiceStorage = {
  load(): StoredPracticeData {
    const stored = localStorage.getItem(PRACTICE_STORAGE_KEY)
    if (!stored) return emptyPracticeData()
    try {
      const parsed = JSON.parse(stored) as StoredPracticeData
      if (parsed.version === 1 && Array.isArray(parsed.attempts)) return parsed
    } catch {
      // Return a safe empty history if device-local data is malformed.
    }
    return emptyPracticeData()
  },

  save(data: StoredPracticeData): void {
    localStorage.setItem(PRACTICE_STORAGE_KEY, JSON.stringify(data))
  },
}
