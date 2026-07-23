import { useCallback, useEffect, useState } from 'react'
import { practiceStorage } from '../services/practiceStorage'
import type { PracticeAttempt, PracticeQuestion, PracticeResponse } from '../types/practice'
import { createId } from '../utils/id'
import { evaluatePracticeAnswer } from '../utils/practice'

export function usePracticeHistory() {
  const [attempts, setAttempts] = useState<PracticeAttempt[]>(
    () => practiceStorage.load().attempts,
  )

  useEffect(() => {
    practiceStorage.save({ version: 1, attempts })
  }, [attempts])

  const recordAttempt = useCallback((
    question: PracticeQuestion,
    response: PracticeResponse,
    now = new Date(),
  ): PracticeAttempt => {
    const attempt: PracticeAttempt = {
      id: createId(),
      questionId: question.id,
      response,
      isCorrect: evaluatePracticeAnswer(question, response),
      answeredAt: now.toISOString(),
    }
    setAttempts((current) => [...current, attempt])
    return attempt
  }, [])

  return { attempts, recordAttempt }
}
