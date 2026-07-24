import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { makeWord } from '../test/fixtures'
import { Flashcard } from './Flashcard'

const word = makeWord({
  word: 'fanciful',
  commonAffixes: [{
    type: 'suffix',
    form: '-ful',
    meaning: 'full of or having',
  }],
})

describe('Flashcard', () => {
  afterEach(cleanup)

  it('shows affix clues after the answer is revealed', () => {
    render(<Flashcard word={word} revealed onReveal={vi.fn()} onRate={vi.fn()} />)

    expect(screen.getByText('Common prefix and suffix')).toBeInTheDocument()
    expect(screen.getByText('-ful')).toBeInTheDocument()
    expect(screen.getByText('Meaning:').closest('p')).toHaveTextContent('Meaning: full of or having.')
  })

  it('keeps affix clues hidden before reveal', () => {
    render(<Flashcard word={word} revealed={false} onReveal={vi.fn()} onRate={vi.fn()} />)

    expect(screen.queryByText('Common prefix and suffix')).not.toBeInTheDocument()
  })
})
