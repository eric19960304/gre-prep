import { describe, expect, it } from 'vitest'
import practiceBankJson from '../data/verbalPracticeQuestions.json'
import type { PracticeBank } from '../types/practice'
import {
  evaluatePracticeAnswer,
  formatPracticeResponse,
  isPracticeAnswerComplete,
} from './practice'

const bank = practiceBankJson as unknown as PracticeBank

describe('practice answer evaluation', () => {
  it('scores a single-answer Reading Comprehension question', () => {
    const question = bank.questions.find((item) => item.id === 'rc-001')!
    expect(isPracticeAnswerComplete(question, { main: ['C'] })).toBe(true)
    expect(evaluatePracticeAnswer(question, { main: ['C'] })).toBe(true)
    expect(evaluatePracticeAnswer(question, { main: ['A'] })).toBe(false)
  })

  it('requires every Text Completion blank and gives no partial credit', () => {
    const question = bank.questions.find((item) => item.id === 'tc-011')!
    expect(isPracticeAnswerComplete(question, { blank1: ['A'] })).toBe(false)
    expect(evaluatePracticeAnswer(question, { blank1: ['A'], blank2: ['A'] })).toBe(true)
    expect(evaluatePracticeAnswer(question, { blank1: ['A'], blank2: ['B'] })).toBe(false)
  })

  it('scores Sentence Equivalence pairs regardless of selection order', () => {
    const question = bank.questions.find((item) => item.id === 'se-001')!
    expect(isPracticeAnswerComplete(question, { main: ['C'] })).toBe(false)
    expect(evaluatePracticeAnswer(question, { main: ['C', 'A'] })).toBe(true)
    expect(evaluatePracticeAnswer(question, { main: ['A', 'B'] })).toBe(false)
    expect(formatPracticeResponse(question, { main: ['A', 'C'] })).toContain('A. intelligible')
  })
})
