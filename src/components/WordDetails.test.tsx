import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { makeWord } from '../test/fixtures'
import { WordDetails } from './WordDetails'

const callbacks = {
  onClose: vi.fn(),
  onEdit: vi.fn(),
  onDelete: vi.fn(),
  onToggleMastered: vi.fn(),
}

describe('WordDetails', () => {
  afterEach(cleanup)

  it('shows learner-useful common prefix and suffix clues', () => {
    render(
      <WordDetails
        word={makeWord({
          word: 'antipathy',
          commonAffixes: [
            {
              type: 'prefix',
              form: 'anti-',
              meaning: 'against, opposed to, or the opposite of',
            },
            {
              type: 'suffix',
              form: '-pathy',
              meaning: 'feeling, emotion, suffering, or disease',
            },
          ],
        })}
        {...callbacks}
      />,
    )

    const section = screen.getByText('Common prefix and suffix').closest('section')
    expect(section).toHaveTextContent('anti- means against, opposed to, or the opposite of.')
    expect(section).toHaveTextContent('-pathy means feeling, emotion, suffering, or disease.')
  })

  it('hides the section when a word has no reliable affix clue', () => {
    render(<WordDetails word={makeWord({ commonAffixes: [] })} {...callbacks} />)

    expect(screen.queryByText('Common prefix and suffix')).not.toBeInTheDocument()
  })
})
