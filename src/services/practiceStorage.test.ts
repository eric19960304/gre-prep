import { beforeEach, describe, expect, it } from 'vitest'
import type { StoredPracticeData } from '../types/practice'
import { PRACTICE_STORAGE_KEY, practiceStorage } from './practiceStorage'

describe('practiceStorage', () => {
  beforeEach(() => localStorage.clear())

  it('starts with an empty attempt history', () => {
    expect(practiceStorage.load()).toEqual({ version: 1, attempts: [] })
  })

  it('persists and restores attempt history', () => {
    const data: StoredPracticeData = {
      version: 1,
      attempts: [{
        id: 'attempt-1',
        questionId: 'rc-001',
        response: { main: ['C'] },
        isCorrect: true,
        answeredAt: '2026-07-24T12:00:00.000Z',
      }],
    }
    practiceStorage.save(data)

    expect(practiceStorage.load()).toEqual(data)
    expect(localStorage.getItem(PRACTICE_STORAGE_KEY)).toContain('rc-001')
  })

  it('recovers safely from malformed device data', () => {
    localStorage.setItem(PRACTICE_STORAGE_KEY, '{not valid json')
    expect(practiceStorage.load()).toEqual({ version: 1, attempts: [] })
  })
})
