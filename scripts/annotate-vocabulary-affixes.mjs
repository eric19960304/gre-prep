import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const seedPath = resolve(projectRoot, 'src/data/seedVocabulary.json')
const sourcePath = resolve(projectRoot, 'gre_vocabulary_1000_zh_TW.json')

const prefixRules = [
  {
    form: 'a-/an-',
    meaning: 'not, without, or lacking',
    words: ['anarchy', 'anomalous', 'anomaly', 'apathetic', 'apathy', 'amorphous'],
  },
  {
    form: 'ab-',
    meaning: 'away from or off',
    words: ['abdicate', 'aberrant', 'aberration', 'abjure', 'abscond', 'abstain'],
  },
  {
    form: 'anti-',
    meaning: 'against, opposed to, or the opposite of',
    words: ['antipathy', 'antithetical'],
  },
  {
    form: 'auto-',
    meaning: 'self or by oneself',
    words: ['autonomous', 'autonomously'],
  },
  {
    form: 'bene-',
    meaning: 'good or well',
    words: ['beneficent'],
  },
  {
    form: 'circum-',
    meaning: 'around or surrounding',
    words: ['circumscribe', 'circumvent'],
  },
  {
    form: 'co-',
    meaning: 'together, jointly, or with',
    words: ['coagulate', 'coalesce', 'cohesive'],
  },
  {
    form: 'counter-',
    meaning: 'against, opposite, or in response to',
    words: ['counterintuitive', 'counterpoint', 'counterproductive'],
  },
  {
    form: 'de-',
    meaning: 'down, away, off, or removal',
    words: ['debase', 'debunk', 'deface', 'deflect', 'degrade', 'demean', 'desecrate', 'detached', 'devolve'],
  },
  {
    form: 'dis-',
    meaning: 'apart, asunder, in two, not, or reversal',
    words: [
      'disabuse',
      'disaffected',
      'discredit',
      'disenfranchise',
      'disheartened',
      'disingenuous',
      'disinterested',
      'disjointed',
      'dismiss',
      'dispassionate',
      'disperse',
      'disquieting',
      'dissent',
      'dissolution',
    ],
  },
  {
    form: 'en-',
    meaning: 'in, into, or cause to become',
    words: ['engender', 'entitlement', 'entrenched'],
  },
  {
    form: 'eu-',
    meaning: 'good, pleasant, or well',
    words: ['eulogy', 'euphemism', 'euphoria', 'euphoric'],
  },
  {
    form: 'ex-',
    meaning: 'out of, away from, or free from',
    words: ['exculpate', 'exonerate'],
  },
  {
    form: 'extra-',
    meaning: 'outside or beyond',
    words: ['extraneous', 'extrapolate', 'extrapolation'],
  },
  {
    form: 'fore-',
    meaning: 'before, earlier, or in front',
    words: ['foreshadow', 'forestall'],
  },
  {
    form: 'hetero-',
    meaning: 'different or other',
    words: ['heterogeneous'],
  },
  {
    form: 'homo-',
    meaning: 'same or alike',
    words: ['homogeneous'],
  },
  {
    form: 'hyper-',
    meaning: 'over, beyond, or excessive',
    words: ['hyperbole'],
  },
  {
    form: 'in-',
    meaning: 'not or without',
    words: [
      'inarticulate',
      'incessant',
      'incongruity',
      'incongruous',
      'inconsequential',
      'incorrigible',
      'indeterminate',
      'indifferent',
      'inexorable',
      'inimical',
      'innocuous',
      'inscrutable',
      'insensible',
      'insolvent',
      'intractable',
      'intransigence',
      'intransigent',
    ],
  },
  {
    form: 'in-',
    meaning: 'in, into, or within',
    words: ['incorporate', 'ingrained'],
  },
  {
    form: 'im-',
    meaning: 'not or without',
    words: [
      'immaterial',
      'immutable',
      'impartial',
      'impassive',
      'impeccable',
      'impermeable',
      'impertinent',
      'imperturbable',
      'impervious',
      'implacable',
      'implausible',
      'imponderable',
      'impregnable',
      'imprudent',
    ],
  },
  {
    form: 'im-',
    meaning: 'in, into, or inward',
    words: ['implode'],
  },
  {
    form: 'il-',
    meaning: 'not or without',
    words: ['illicit'],
  },
  {
    form: 'ir-',
    meaning: 'not or without',
    words: ['irresolute', 'irrevocable'],
  },
  {
    form: 'mal-',
    meaning: 'bad, badly, or harmful',
    words: ['malevolent', 'malodorous'],
  },
  {
    form: 'meta-',
    meaning: 'change, transformation, or beyond',
    words: ['metamorphosis'],
  },
  {
    form: 'mis-',
    meaning: 'wrongly, badly, or incorrectly',
    words: ['misconstrue', 'miscreant'],
  },
  {
    form: 'miso-',
    meaning: 'hatred or dislike',
    words: ['misogynist'],
  },
  {
    form: 'mono-',
    meaning: 'one, single, or the same',
    words: ['monotony'],
  },
  {
    form: 'neo-',
    meaning: 'new or recent',
    words: ['neophyte'],
  },
  {
    form: 'para-',
    meaning: 'beside, beyond, or contrary to',
    words: ['paradoxical'],
  },
  {
    form: 'pre-',
    meaning: 'before or in advance',
    words: ['preamble', 'precocious', 'preclude', 'preempt', 'precedent', 'precursor', 'prescience'],
  },
  {
    form: 'pro-',
    meaning: 'forward, in front of, or in favor of',
    words: ['proponent'],
  },
  {
    form: 're-',
    meaning: 'again or back',
    words: ['recant', 'reconcile', 'redress', 'resurgent', 'retract'],
  },
  {
    form: 'sub-',
    meaning: 'under, below, or beneath',
    words: ['subside', 'subsume', 'subversive'],
  },
  {
    form: 'super-',
    meaning: 'above, beyond, or excessive',
    words: ['superfluous', 'supersede'],
  },
  {
    form: 'trans-',
    meaning: 'across, through, or beyond',
    words: ['transgression', 'transient', 'transitory'],
  },
  {
    form: 'un-',
    meaning: 'not, lacking, or reversal',
    words: [
      'uncanny',
      'uncompromising',
      'unconscionable',
      'unequivocal',
      'unnerve',
      'unprecedented',
      'unruly',
      'unscrupulous',
      'unseemly',
    ],
  },
  {
    form: 'under-',
    meaning: 'below, beneath, or insufficiently',
    words: ['undermine', 'underscore', 'underwrite'],
  },
]

const suffixRules = [
  {
    form: '-able',
    meaning: 'capable of, fit for, or worthy of',
    matches: (word) => word.endsWith('able'),
  },
  {
    form: '-ible',
    meaning: 'capable of, fit for, or susceptible to',
    matches: (word) => word.endsWith('ible'),
  },
  {
    form: '-ful',
    meaning: 'full of, having, or characterized by',
    words: ['fanciful'],
  },
  {
    form: '-less',
    meaning: 'without or lacking',
    words: ['guileless'],
  },
  {
    form: '-ish',
    meaning: 'somewhat, resembling, or characterized by',
    words: ['boorish', 'peevish', 'raffish'],
  },
  {
    form: '-wise',
    meaning: 'in the manner of, direction of, or with regard to',
    words: ['likewise'],
  },
  {
    form: '-archy',
    meaning: 'rule, government, or an ordered system',
    words: ['anarchy', 'hierarchy'],
  },
  {
    form: '-cracy',
    meaning: 'rule, government, or a governing system',
    words: ['bureaucracy'],
  },
  {
    form: '-pathy',
    meaning: 'feeling, emotion, suffering, or disease',
    words: ['apathy', 'antipathy'],
  },
  {
    form: '-ism',
    meaning: 'a doctrine, belief, system, or practice',
    words: ['activism', 'altruism', 'chauvinism', 'jingoism'],
  },
  {
    form: '-ist',
    meaning: 'a person who practices, supports, or believes in something',
    words: ['chauvinist', 'egotist', 'hedonist', 'misogynist'],
  },
  {
    form: '-ify',
    meaning: 'to make, cause to become, or render',
    words: ['exemplify', 'fortify', 'mollify', 'qualify'],
  },
  {
    form: '-ize',
    meaning: 'to make, cause to become, or treat as',
    words: ['aggrandize', 'antagonize', 'galvanize', 'lionize', 'mesmerize', 'ostracize', 'patronize'],
  },
  {
    form: '-ity',
    meaning: 'the state, condition, or quality of',
    matches: (word) => word.endsWith('ity'),
  },
  {
    form: '-ous',
    meaning: 'full of, having, or characterized by',
    matches: (word) => word.endsWith('ous'),
  },
  {
    form: '-ive',
    meaning: 'having the nature or tendency of; performing an action',
    matches: (word) => word.endsWith('ive') && word !== 'contrive',
  },
  {
    form: '-tion',
    meaning: 'an action, process, state, or result',
    matches: (word) => word.endsWith('tion'),
  },
  {
    form: '-sion',
    meaning: 'an action, process, state, or result',
    matches: (word) => word.endsWith('sion'),
  },
  {
    form: '-ic',
    meaning: 'related to, characterized by, or having the nature of',
    matches: (word) => word.endsWith('ic'),
  },
  {
    form: '-ical',
    meaning: 'related to, characterized by, or having the nature of',
    matches: (word) => word.endsWith('ical'),
  },
]

const seed = JSON.parse(readFileSync(seedPath, 'utf8'))
const source = JSON.parse(readFileSync(sourcePath, 'utf8'))

if (seed.length !== 1_000 || source.length !== 1_000) {
  throw new Error(`Expected 1,000 words in both files; found ${seed.length} and ${source.length}.`)
}

const seedWords = new Set(seed.map((item) => item.word.toLocaleLowerCase()))
const sourceWords = new Set(source.map((item) => item.vocab.toLocaleLowerCase()))
if (seedWords.size !== 1_000 || sourceWords.size !== 1_000) {
  throw new Error('Vocabulary files must each contain 1,000 unique words.')
}
if ([...seedWords].some((word) => !sourceWords.has(word))) {
  throw new Error('The source and app-ready vocabulary files do not contain the same words.')
}

for (const rule of [...prefixRules, ...suffixRules]) {
  for (const word of rule.words ?? []) {
    if (!seedWords.has(word)) throw new Error(`Affix rule ${rule.form} references unknown word "${word}".`)
  }
}

function affixesFor(word) {
  const normalized = word.toLocaleLowerCase()
  const affixes = []

  for (const rule of prefixRules) {
    if (rule.words.includes(normalized)) {
      affixes.push({ type: 'prefix', form: rule.form, meaning: rule.meaning })
    }
  }
  for (const rule of suffixRules) {
    if (rule.words?.includes(normalized) || rule.matches?.(normalized)) {
      affixes.push({ type: 'suffix', form: rule.form, meaning: rule.meaning })
    }
  }

  return affixes
}

const annotatedSeed = seed.map((item) => ({
  ...item,
  commonAffixes: affixesFor(item.word),
}))
const annotatedSource = source.map((item) => ({
  ...item,
  common_affixes: affixesFor(item.vocab),
}))

writeFileSync(seedPath, `${JSON.stringify(annotatedSeed, null, 2)}\n`, 'utf8')
writeFileSync(sourcePath, `${JSON.stringify(annotatedSource, null, 2)}\n`, 'utf8')

const annotatedWords = annotatedSeed.filter((item) => item.commonAffixes.length)
const totalAffixes = annotatedSeed.reduce((total, item) => total + item.commonAffixes.length, 0)
console.log(`Analyzed 1,000 words; annotated ${annotatedWords.length} words with ${totalAffixes} useful affix clues.`)
