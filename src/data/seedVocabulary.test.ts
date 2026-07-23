import { describe, expect, it } from 'vitest'
import seedVocabulary from './seedVocabulary.json'

describe('ranked seed vocabulary', () => {
  it('contains 1,000 unique words with continuous ranks', () => {
    expect(seedVocabulary).toHaveLength(1_000)
    expect(new Set(seedVocabulary.map((item) => item.word.toLocaleLowerCase())).size).toBe(1_000)
    expect(seedVocabulary.map((item) => item.rank)).toEqual(
      Array.from({ length: 1_000 }, (_, index) => index + 1),
    )
  })

  it('starts with the audited high-priority words instead of alphabetical source order', () => {
    expect(seedVocabulary.slice(0, 10).map((item) => item.word)).toEqual([
      'capricious',
      'corroborate',
      'esoteric',
      'ephemeral',
      'erudite',
      'loquacious',
      'pragmatic',
      'enervate',
      'soporific',
      'sanguine',
    ])

    const firstTwentyInitials = new Set(
      seedVocabulary.slice(0, 20).map((item) => item.word[0].toLocaleLowerCase()),
    )
    expect(firstTwentyInitials.size).toBeGreaterThan(5)
  })
})
