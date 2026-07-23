import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { vocabularyStorage } from '../services/storage'
import type {
  ReviewRating,
  StoredVocabularyData,
  VocabularyDraft,
  VocabularyWord,
} from '../types/vocabulary'
import { createId } from '../utils/id'
import { calculateReviewUpdate } from '../utils/review'
import { isDuplicateWord } from '../utils/vocabulary'

type ImportSummary = { imported: number; skipped: number; errors: string[] }

type VocabularyContextValue = {
  words: VocabularyWord[]
  reviewHistory: StoredVocabularyData['reviewHistory']
  addWord: (draft: VocabularyDraft) => VocabularyWord
  updateWord: (id: string, draft: VocabularyDraft) => void
  deleteWord: (id: string) => void
  toggleMastered: (id: string) => void
  markWordViewed: (id: string) => void
  reviewWord: (id: string, rating: ReviewRating, now?: Date) => void
  importWords: (text: string) => ImportSummary
  exportWords: () => void
  isDuplicate: (word: string, excludedId?: string) => boolean
}

const VocabularyContext = createContext<VocabularyContextValue | null>(null)

export function VocabularyProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<StoredVocabularyData>(() => vocabularyStorage.load())

  useEffect(() => {
    vocabularyStorage.save(data)
  }, [data])

  const value = useMemo<VocabularyContextValue>(() => ({
    words: data.words,
    reviewHistory: data.reviewHistory,
    addWord(draft) {
      if (isDuplicateWord(data.words, draft.word)) throw new Error('That word is already in your collection.')
      const timestamp = new Date().toISOString()
      const word: VocabularyWord = {
        ...draft,
        id: createId(),
        word: draft.word.trim(),
        definition: draft.definition.trim(),
        tags: draft.tags.map((tag) => tag.trim()).filter(Boolean),
        createdAt: timestamp,
        updatedAt: timestamp,
        reviewLevel: 0,
        nextReviewAt: timestamp,
        correctCount: 0,
        incorrectCount: 0,
        isMastered: false,
      }
      setData((current) => ({ ...current, words: [word, ...current.words] }))
      return word
    },
    updateWord(id, draft) {
      if (isDuplicateWord(data.words, draft.word, id)) throw new Error('That word is already in your collection.')
      setData((current) => ({
        ...current,
        words: current.words.map((word) => word.id === id ? {
          ...word,
          ...draft,
          word: draft.word.trim(),
          definition: draft.definition.trim(),
          tags: draft.tags.map((tag) => tag.trim()).filter(Boolean),
          updatedAt: new Date().toISOString(),
        } : word),
      }))
    },
    deleteWord(id) {
      setData((current) => ({
        ...current,
        words: current.words.filter((word) => word.id !== id),
        reviewHistory: current.reviewHistory.filter((review) => review.wordId !== id),
      }))
    },
    toggleMastered(id) {
      setData((current) => ({
        ...current,
        words: current.words.map((word) => word.id === id ? {
          ...word,
          isMastered: !word.isMastered,
          updatedAt: new Date().toISOString(),
        } : word),
      }))
    },
    markWordViewed(id) {
      setData((current) => {
        let changed = false
        const viewedAt = new Date().toISOString()
        const words = current.words.map((word) => {
          if (word.id !== id || word.viewedAt) return word
          changed = true
          return { ...word, viewedAt }
        })
        return changed ? { ...current, words } : current
      })
    },
    reviewWord(id, rating, now = new Date()) {
      setData((current) => ({
        ...current,
        words: current.words.map((word) => word.id === id ? calculateReviewUpdate(word, rating, now) : word),
        reviewHistory: [...current.reviewHistory, {
          id: createId(),
          wordId: id,
          rating,
          reviewedAt: now.toISOString(),
        }],
      }))
    },
    importWords(text) {
      const result = vocabularyStorage.parseImport(text)
      const existing = new Set(data.words.map((word) => word.word.trim().toLocaleLowerCase()))
      const imported = result.valid.filter((word) => {
        const normalized = word.word.trim().toLocaleLowerCase()
        if (existing.has(normalized)) return false
        existing.add(normalized)
        return true
      })
      const skipped = result.valid.length - imported.length
      if (imported.length) setData((current) => ({ ...current, words: [...imported, ...current.words] }))
      return { imported: imported.length, skipped, errors: result.errors }
    },
    exportWords() {
      vocabularyStorage.export(data.words)
    },
    isDuplicate(word, excludedId) {
      return isDuplicateWord(data.words, word, excludedId)
    },
  }), [data])

  return <VocabularyContext.Provider value={value}>{children}</VocabularyContext.Provider>
}

export function useVocabulary() {
  const value = useContext(VocabularyContext)
  if (!value) throw new Error('useVocabulary must be used inside VocabularyProvider')
  return value
}
