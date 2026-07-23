export type PracticeQuestionType =
  | 'reading-comprehension'
  | 'text-completion'
  | 'sentence-equivalence'

export type PracticeDifficulty = 'easy' | 'medium' | 'hard'
export type PracticeSelectionMode = 'single' | 'multiple'

export type PracticeChoice = {
  id: string
  text: string
}

export type PracticeResponseGroup = {
  id: string
  label: string
  selectionMode: PracticeSelectionMode
  requiredSelections: number | null
  choices: PracticeChoice[]
}

export type PracticeQuestion = {
  id: string
  number: number
  type: PracticeQuestionType
  difficulty: PracticeDifficulty
  passageId?: string
  stem?: string
  text?: string
  directions: string
  responseGroups: PracticeResponseGroup[]
  correctAnswer: PracticeResponse
  explanation: string
  skills: string[]
  source: string
}

export type PracticePassage = {
  id: string
  title: string
  text: string
}

export type PracticeBank = {
  version: 1
  title: string
  disclosure: string
  formatReference: string
  counts: {
    total: number
    readingComprehension: number
    textCompletion: number
    sentenceEquivalence: number
  }
  passages: PracticePassage[]
  questions: PracticeQuestion[]
}

export type PracticeResponse = Record<string, string[]>

export type PracticeAttempt = {
  id: string
  questionId: string
  response: PracticeResponse
  isCorrect: boolean
  answeredAt: string
}

export type StoredPracticeData = {
  version: 1
  attempts: PracticeAttempt[]
}

export type PracticeTypeFilter = 'all' | PracticeQuestionType
export type PracticeStatusFilter = 'all' | 'unanswered' | 'answered' | 'incorrect'
