Build a simple mobile-first GRE vocabulary learning website.

## Goal

Create a clean and practical web app that helps me:

1. Save GRE vocabulary words.
2. Review words using spaced repetition.
3. Track which words I know or do not know.
4. Search, filter, edit, and delete words.
5. Use the website comfortably on a mobile phone.

This is a personal tool, so prioritize simplicity, speed, and usability over complex architecture.

## Tech stack

Use:

* React
* TypeScript
* Vite
* Tailwind CSS
* localStorage for persistence
* No backend
* No authentication
* No external database, use serverless DB like SQLite

Keep the code modular and easy to understand.

## Mobile-first design

The primary target is a mobile browser.

Requirements:

* Responsive layout.
* Large touch-friendly buttons.
* No horizontal scrolling.
* Important actions should be reachable with one hand.
* Use a clean and minimal visual style.
* Support both light mode and dark mode.
* Use a bottom navigation bar on mobile.

Bottom navigation tabs:

* 1. Words
* 2. Review
* 3. Progress

## Core data model

Each vocabulary item should contain:

```ts
type VocabularyWord = {
  id: string;
  word: string;
  definition: string;
  chineseMeaning?: string;
  exampleSentence?: string;
  notes?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;

  reviewLevel: number;
  nextReviewAt: string;
  lastReviewedAt?: string;

  correctCount: number;
  incorrectCount: number;
  isMastered: boolean;
};
```

## Main features


### 1. Word list

Display all saved words.

Each list item should show:

* Word
* Chinese meaning or short definition
* Tags
* Review status
* Next review date
* Mastered indicator

Include:

* Search by word, definition, Chinese meaning, example, or notes.
* Filter by tag.
* Filter by:

  * Due for review
  * New
  * Learning
  * Mastered
* Sort by:

  * Alphabetical
  * Recently added
  * Next review date
  * Most incorrect answers

Allow users to:

* Open word details.
* Edit a word.
* Delete a word.
* Mark or unmark a word as mastered.

Ask for confirmation before deletion.

### 2. Review mode

The Review page should show words whose `nextReviewAt` is now or earlier.

Display one flashcard at a time.

Front of card:

* Word only

The user can tap a button to reveal the answer.

Back of card:

* English definition
* Chinese meaning
* Example sentence
* Notes
* Tags

After revealing the answer, show four response buttons:

* Again
* Hard
* Good
* Easy

Use this simple spaced-repetition logic:

* Again:

  * Set `reviewLevel` to max(current level - 1, 0)
  * Review again in 10 minutes
  * Increase `incorrectCount`

* Hard:

  * Keep the current level
  * Review again in 1 day

* Good:

  * Increase `reviewLevel` by 1
  * Increase `correctCount`

* Easy:

  * Increase `reviewLevel` by 2
  * Increase `correctCount`

Use these review intervals for Good and Easy:

```ts
const reviewIntervalsInDays = [
  0,
  1,
  3,
  7,
  14,
  30,
  60,
  120
];
```

Cap the review level at the highest available interval.

Set `isMastered` to true when the review level reaches the final interval.

Shuffle due words when a review session starts.

During a session, display:

* Current card number
* Total due cards
* Progress bar
* Correct count
* Incorrect count

At the end of the session, display a summary.

### 3. Progress dashboard

Display:

* Total words
* New words
* Learning words
* Mastered words
* Words due today
* Total correct answers
* Total incorrect answers
* Accuracy percentage
* Words added in the last 7 days
* Reviews completed today

Use simple cards and progress bars.

Do not add a heavy charting library unless necessary.

## Vocab Data and Database

Load the 1000 vocab you prepared when the website start for the first time.
First time loading can be slow, but the 2nd, 3rd, ... startup it should be fast.
You can consider Serverless DB like SQLite to optimize the vocab querying, review, progress, etc.

## UX details

* Show empty states when there are no words.
* Show a clear message when there are no words due for review.
* Use toast messages for save, update, import, and delete actions.
* Preserve all data after page refresh.
* Use accessible labels for form fields and buttons.
* Support keyboard navigation where practical.
* Ensure sufficient color contrast.
* Do not rely only on color to communicate review status.

## Project structure

Use a clear structure similar to:

```text
src/
  components/
  pages/
  hooks/
  types/
  utils/
  services/
  constants/
```

Create reusable components for:

* Bottom navigation
* Word form
* Word card
* Flashcard
* Confirmation dialog
* Filter controls
* Progress cards
* Toast notifications

Create a dedicated localStorage service rather than accessing localStorage throughout the application.

## Testing

Add basic tests for:

* Duplicate-word detection.
* Spaced-repetition interval calculation.
* Import validation.
* Search and filtering logic.

Use Vitest.

## Deliverables

Please:

1. Create the complete working project.
2. Include all source files.
3. Add a README with:

   * Setup instructions
   * Development commands
   * Build commands
   * Explanation of the spaced-repetition logic
   * Data import/export format
4. Run:

   * TypeScript checking
   * Tests
   * Production build
5. Fix all errors before finishing.

## Implementation approach

Before writing code:

1. Briefly summarize the architecture.
2. List the main pages and components.
3. Then implement the app step by step.

Do not overengineer the project. Avoid unnecessary state-management libraries. React Context or custom hooks are sufficient.

## Additional Requirements

Use port 3010 to run the website.