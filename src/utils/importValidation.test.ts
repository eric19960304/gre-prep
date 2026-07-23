import { describe, expect, it } from 'vitest'
import { validateVocabularyImport } from './importValidation'

describe('validateVocabularyImport', () => {
  it('normalizes a minimal valid import', () => {
    const result = validateVocabularyImport([{ word: 'laconic', definition: 'Using few words.', tags: ['brief'] }], new Date('2026-01-01T00:00:00.000Z'))
    expect(result.errors).toEqual([])
    expect(result.valid).toHaveLength(1)
    expect(result.valid[0]).toMatchObject({ word: 'laconic', reviewLevel: 0, tags: ['brief'] })
  })

  it('rejects malformed items and duplicates within a file', () => {
    const result = validateVocabularyImport([
      { word: 'laconic', definition: 'Brief.' },
      { word: 'LACONIC', definition: 'Brief.' },
      { word: '', definition: 'Missing word.' },
    ])
    expect(result.valid).toHaveLength(1)
    expect(result.errors).toHaveLength(2)
  })

  it('rejects a non-array payload', () => {
    expect(validateVocabularyImport({ word: 'laconic' }).errors[0]).toContain('JSON array')
  })
})
