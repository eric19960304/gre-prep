import type { VocabularyWord } from '../types/vocabulary'
import { createId } from './id'

export type ImportResult = {
  valid: VocabularyWord[]
  errors: string[]
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function optionalString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

export function validateVocabularyImport(input: unknown, now = new Date()): ImportResult {
  if (!Array.isArray(input)) return { valid: [], errors: ['Import must be a JSON array.'] }
  const valid: VocabularyWord[] = []
  const errors: string[] = []
  const seen = new Set<string>()

  input.forEach((raw, index) => {
    if (!isRecord(raw)) {
      errors.push(`Item ${index + 1}: expected an object.`)
      return
    }
    const word = typeof raw.word === 'string' ? raw.word.trim() : ''
    const definition = typeof raw.definition === 'string' ? raw.definition.trim() : ''
    if (!word || !definition) {
      errors.push(`Item ${index + 1}: word and definition are required.`)
      return
    }
    const normalized = word.toLocaleLowerCase()
    if (seen.has(normalized)) {
      errors.push(`Item ${index + 1}: duplicate word “${word}”.`)
      return
    }
    seen.add(normalized)
    const timestamp = now.toISOString()
    const reviewLevel = typeof raw.reviewLevel === 'number' ? Math.max(0, Math.min(7, Math.floor(raw.reviewLevel))) : 0
    valid.push({
      id: typeof raw.id === 'string' && raw.id ? raw.id : createId(),
      word,
      definition,
      chineseMeaning: optionalString(raw.chineseMeaning),
      exampleSentence: optionalString(raw.exampleSentence),
      notes: optionalString(raw.notes),
      tags: Array.isArray(raw.tags) ? raw.tags.filter((tag): tag is string => typeof tag === 'string') : [],
      priorityRank: typeof raw.priorityRank === 'number' && raw.priorityRank > 0 ? Math.floor(raw.priorityRank) : undefined,
      createdAt: typeof raw.createdAt === 'string' ? raw.createdAt : timestamp,
      updatedAt: typeof raw.updatedAt === 'string' ? raw.updatedAt : timestamp,
      reviewLevel,
      nextReviewAt: typeof raw.nextReviewAt === 'string' ? raw.nextReviewAt : timestamp,
      viewedAt: optionalString(raw.viewedAt),
      lastReviewedAt: optionalString(raw.lastReviewedAt),
      correctCount: typeof raw.correctCount === 'number' ? Math.max(0, raw.correctCount) : 0,
      incorrectCount: typeof raw.incorrectCount === 'number' ? Math.max(0, raw.incorrectCount) : 0,
      isMastered: raw.isMastered === true || reviewLevel === 7,
    })
  })
  return { valid, errors }
}
