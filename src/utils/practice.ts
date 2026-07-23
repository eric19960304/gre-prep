import type {
  PracticeQuestion,
  PracticeQuestionType,
  PracticeResponse,
} from '../types/practice'

export const practiceTypeLabels: Record<PracticeQuestionType, string> = {
  'reading-comprehension': 'Reading Comprehension',
  'text-completion': 'Text Completion',
  'sentence-equivalence': 'Sentence Equivalence',
}

export const practiceTypeShortLabels: Record<PracticeQuestionType, string> = {
  'reading-comprehension': 'RC',
  'text-completion': 'TC',
  'sentence-equivalence': 'SE',
}

function sameAnswer(left: string[] = [], right: string[] = []): boolean {
  return left.length === right.length
    && [...left].sort().every((answer, index) => answer === [...right].sort()[index])
}

export function isPracticeAnswerComplete(
  question: PracticeQuestion,
  response: PracticeResponse,
): boolean {
  return question.responseGroups.every((group) => {
    const selected = response[group.id] ?? []
    return group.requiredSelections === null
      ? selected.length > 0
      : selected.length === group.requiredSelections
  })
}

export function evaluatePracticeAnswer(
  question: PracticeQuestion,
  response: PracticeResponse,
): boolean {
  return isPracticeAnswerComplete(question, response)
    && question.responseGroups.every((group) => (
      sameAnswer(response[group.id], question.correctAnswer[group.id])
    ))
}

export function getChoiceText(
  question: PracticeQuestion,
  groupId: string,
  choiceId: string,
): string {
  return question.responseGroups
    .find((group) => group.id === groupId)
    ?.choices.find((choice) => choice.id === choiceId)
    ?.text ?? choiceId
}

export function formatPracticeResponse(
  question: PracticeQuestion,
  response: PracticeResponse,
): string {
  return question.responseGroups.map((group) => {
    const answers = (response[group.id] ?? [])
      .map((choiceId) => `${choiceId}. ${getChoiceText(question, group.id, choiceId)}`)
      .join(' / ')
    return question.responseGroups.length > 1 ? `${group.label}: ${answers}` : answers
  }).join(' · ')
}
