# Lexilo — GRE Vocabulary & Verbal Practice

Lexilo is a mobile-first, browser-based GRE preparation tool. It ships with a prepared list of 1,000 GRE words ranked by study priority and 100 original Verbal Reasoning practice questions. It stores learning progress locally, schedules vocabulary reviews, records question attempts, and works without a backend or account.

## Run it locally

Requirements:

- Node.js 20 or newer
- npm 10 or newer

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Vite runs at **http://localhost:5173** by default. If that port is occupied, Vite automatically selects the next available port and prints the actual URL in the terminal.

To require a specific port:

```bash
npm run dev -- --port 4173 --strictPort
```

Then open **http://localhost:4173**.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server (default port 5173) |
| `npm run generate:practice` | Validate and regenerate both copies of the 100-question practice bank |
| `npm run typecheck` | Run strict TypeScript checking without emitting files |
| `npm test` | Run all Vitest tests once |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run build` | Type-check and create an optimized production build in `dist/` |
| `npm run preview` | Preview the production build locally (default port 4173) |

Preview the generated production build with:

```bash
npm run preview
```

Vite preview uses **http://localhost:4173** by default.

## Technical architecture

- **React + TypeScript:** component UI and strict application types.
- **Vite:** development server, module bundling, and production builds.
- **Tailwind CSS:** mobile-first layout and a custom warm editorial design system. Tailwind is connected with the official Vite plugin.
- **React Context + custom hooks:** a vocabulary context owns learning state, while a focused practice-history hook records Verbal Reasoning attempts. No external state-management library is needed for this dataset size.
- **localStorage:** dedicated service modules handle vocabulary data and practice history. Components do not access persistence directly.
- **Vitest:** tests vocabulary scheduling and validation as well as all question-bank structures, GRE answer rules, history persistence, and the end-to-end submit/reveal flow.

The main source layout is:

```text
src/
  components/     Reusable navigation, forms, cards, dialogs, flashcards, and toasts
  constants/      Review interval constants
  data/           Bundled vocabulary and Verbal Reasoning datasets
  hooks/          Vocabulary, practice-history, and theme state
  pages/          Words, Review, Practice, and Progress screens
  services/       Device-local persistence and import/export boundaries
  test/           Shared test setup and fixtures
  types/          Vocabulary and review TypeScript models
  utils/          Pure date, filtering, validation, ID, and scheduling functions
```

### Why localStorage instead of SQLite?

The app is intentionally client-only and holds a small personal study dataset. localStorage keeps startup immediate after the first load, needs no database server, and satisfies offline personal use. History is tied to the current browser and device rather than an account. All storage access is isolated, so persistence can be replaced later if multi-device synchronization is required.

## First-run data and persistence

`src/data/seedVocabulary.json` contains the app-ready 1,000-word list with rank, part of speech, English definition, Traditional Chinese meaning, and available example sentence. The source dataset, including evidence signals used during ranking, is `gre_vocabulary_1000_zh_TW.json` in the project root.

On the first visit, the storage service:

1. Converts each seed record to the complete `VocabularyWord` model.
2. Adds IDs, timestamps, review counters, and useful starter tags.
3. Saves the result under the versioned `lexilo:vocabulary:v1` localStorage key.

Every later visit loads that saved snapshot instead of rebuilding the seed. Edits, review results, mastery state, imports, and deletions persist across refreshes. When the bundled ranking is revised, the storage migration updates seed-word priority ranks and `Top 100`/`Top 300` tags while preserving the learner's review history and edits. Clearing site data in the browser resets the app to the bundled seed on the next launch.

The light/dark preference is stored separately under `lexilo:theme`.

## What the vocabulary rank means

`rank` is an evidence-weighted **study-priority rank**: rank 1 should be studied before rank 2. It is not an official count of appearances on live GRE tests. ETS does not publish a complete 1,000-word frequency table for operational test questions, so an exact claim of that kind would not be supportable.

The ranking combines these signals, from strongest to weakest:

1. Inclusion in Magoosh's current top-20 most-tested list.
2. Agreement across three independently published high-frequency shortlists: Magoosh Top 20, Kaplan Top 100 (Top 52 plus the next 48), and CrunchPrep 101.
3. Conservatively cleaned matches reported for public ETS Official Guide material. Very short words and obvious substring-count outliers are not treated as reliable counts.
4. Agreement across the broader Magoosh 1,000, Manhattan 500, and Barron's 333 study lists.
5. Source-list position and general English corpus frequency only as tie-breakers.

Sources used for the audit:

- [Magoosh: Best GRE Word Lists and Top 20 Most Tested Words](https://magoosh.com/gre/best-and-worst-gre-word-lists/)
- [Kaplan: Top 52 GRE Vocabulary Words](https://www.kaptest.com/study/gre/top-52-gre-vocabulary-words/)
- [Kaplan: The Next 48 GRE Vocabulary Words](https://www.kaptest.com/study/gre/top-48-gre-vocabulary-words/)
- [CrunchPrep: 101 High-Frequency GRE Words](https://crunchprep.com/assets/uploads/2015/10/101-High-Frequency-GRE-words-CrunchPrepGRE.pdf)
- [GRE Prep Club: vocabulary frequency in public ETS material](https://gre.myprepclub.com/forum/gre-prep-club-official-vocabulary-lists-for-the-gre-20466.html)

Each source record has a `rank_signals` object showing its publisher-shortlist memberships, broader-list overlap count, and usable ETS-guide match count. Exact ordering among words with similar evidence remains approximate, but alphabetical source order is never used as a ranking signal. In the website, the Words page defaults to **Study priority** and shows the rank on each card.

## GRE Verbal Reasoning practice bank

`gre_verbal_practice_100.json` is the readable source artifact. The app bundles an identical copy at `src/data/verbalPracticeQuestions.json`. Running `npm run generate:practice` validates the answer keys and regenerates both files from `scripts/build-verbal-practice.mjs`.

The bank contains:

| Type | Questions | Supported interaction |
| --- | ---: | --- |
| Reading Comprehension | 40 | Five-choice single selection and three-choice “select all that apply” |
| Text Completion | 30 | One to three independent blanks; one selection per blank |
| Sentence Equivalence | 30 | Exactly two selections from six choices |

Every question contains a stable ID, sequence number, difficulty, directions, response groups, correct answer, explanation, skills, and source disclosure. Reading Comprehension questions reference one of 20 reusable passages. The generic `responseGroups` representation lets the scoring utility handle single answers, multiple answers, and independent blanks without type-specific answer hacks.

The format follows the structures described in the [official ETS Verbal Reasoning overview](https://www.ets.org/gre/test-takers/general-test/prepare/content/verbal-reasoning.html). All question wording, passages, distractors, answer keys, and explanations in this repository are original GRE-style practice created for Lexilo. They are not official ETS questions, copied commercial questions, or recalled live-test content.

On the Practice page, the user can:

1. Filter by question type and by unanswered, answered, or incorrect status.
2. Select answers with accessible single- or multiple-selection buttons.
3. Submit only after every required answer is present.
4. See the correct choices and explanation immediately.
5. Retry a question or move between questions.
6. Open History to review every saved attempt and its original response.

Attempts are stored under `lexilo:practice:v1`. Each history record contains the question ID, selected response, correctness, and answer time. History survives refreshes on the same browser and device. Clearing site data removes it.

## Spaced-repetition behavior

Opening a word from the Words page marks it as viewed and adds it to the learner's personal review pool. Untouched words in the bundled 1,000-word library are excluded. Review sessions include only viewed, unmastered words whose `nextReviewAt` is now or earlier, and shuffle that queue once when the session starts. Previously reviewed words from an older saved dataset remain eligible so existing progress is preserved.

| Rating | Level change | Next review | Counter |
| --- | --- | --- | --- |
| Again | Decrease by 1, minimum 0 | 10 minutes | Incorrect +1 |
| Hard | No change | 1 day | No graded counter change |
| Good | Increase by 1 | Interval for the new level | Correct +1 |
| Easy | Increase by 2 | Interval for the new level | Correct +1 |

Good and Easy use these level intervals in days:

```text
[0, 1, 3, 7, 14, 30, 60, 120]
```

The level is capped at 7. Reaching level 7 automatically marks the word as mastered.

## Import and export

The Words page accepts a UTF-8 `.json` file containing an array. A minimal record is:

```json
[
  {
    "word": "laconic",
    "definition": "Using very few words.",
    "chineseMeaning": "簡潔的；寡言的",
    "exampleSentence": "Her laconic reply ended the conversation.",
    "notes": "Think: concise",
    "tags": ["adjective", "difficult"]
  }
]
```

Only `word` and `definition` are required. Missing IDs, timestamps, and review fields receive safe defaults. Invalid records are skipped, and duplicates are detected case-insensitively both within the import and against existing words.

Export downloads the complete `VocabularyWord[]` collection, including review progress. That exported file can be imported into another Lexilo installation.

## Production deployment

Run:

```bash
npm run build
```

Deploy the generated `dist/` directory to any static host such as Cloudflare Pages, GitHub Pages, Netlify, or Vercel. No server environment variables, database, or API routes are required.
