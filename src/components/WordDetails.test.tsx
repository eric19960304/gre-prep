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
              meaning: 'against or opposite to',
            },
            {
              type: 'suffix',
              form: '-pathy',
              meaning: 'feeling or disease',
            },
          ],
        })}
        {...callbacks}
      />,
    )

    const section = screen.getByText('Common prefix and suffix').closest('section')
    expect(section).toHaveTextContent('anti-')
    expect(section).toHaveTextContent('Meaning: against or opposite to.')
    expect(section).toHaveTextContent('-pathy')
    expect(section).toHaveTextContent('Meaning: feeling or disease.')
  })

  it('hides the section when a word has no reliable affix clue', () => {
    render(<WordDetails word={makeWord({ commonAffixes: [] })} {...callbacks} />)

    expect(screen.queryByText('Common prefix and suffix')).not.toBeInTheDocument()
  })
})
