import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { PRACTICE_STORAGE_KEY } from '../services/practiceStorage'
import { PracticePage } from './PracticePage'

describe('PracticePage', () => {
  beforeEach(() => localStorage.clear())

  it('submits an answer, reveals the explanation, and saves it in history', async () => {
    render(<PracticePage />)

    expect(screen.queryByLabelText('Practice progress')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /Question 2, Reading Comprehension/ })).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('radio', { name: /Tree-planting plans should account/ }))
    fireEvent.click(screen.getByRole('button', { name: /Submit answer/ }))

    expect(screen.getByText('Correct.')).toBeInTheDocument()
    expect(screen.getByText(/planners should consider when and where cooling occurs/)).toBeInTheDocument()

    await waitFor(() => {
      expect(localStorage.getItem(PRACTICE_STORAGE_KEY)).toContain('"questionId":"rc-001"')
    })

    fireEvent.click(screen.getByRole('button', { name: /^History/ }))
    expect(screen.getByLabelText('Practice progress')).toBeInTheDocument()
    expect(screen.getByText('Question 1 · RC')).toBeInTheDocument()
  })
})
