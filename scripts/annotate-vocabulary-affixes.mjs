import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const seedPath = resolve(projectRoot, 'src/data/seedVocabulary.json')
const sourcePath = resolve(projectRoot, 'gre_vocabulary_1000_zh_TW.json')

const prefixRules = [
  {
    form: 'a-/an-',
    meaning: 'not or without',
    words: ['anarchy', 'anomalous', 'anomaly', 'apathetic', 'apathy', 'amorphous'],
  },
  {
    form: 'ab-',
    meaning: 'away from',
    words: ['abdicate', 'aberrant', 'aberration', 'abjure', 'abscond', 'abstain'],
  },
  {
    form: 'anti-',
    meaning: 'against or opposite to',
    words: ['antipathy', 'antithetical'],
  },
  {
    form: 'auto-',
    meaning: 'self',
    words: ['autonomous', 'autonomously'],
  },
  {
    form: 'bene-',
    meaning: 'good or well',
    words: ['beneficent'],
  },
  {
    form: 'circum-',
    meaning: 'around',
    words: ['circumscribe', 'circumvent'],
  },
  {
    form: 'co-',
    meaning: 'together or with',
    words: ['coagulate', 'coalesce', 'cohesive'],
  },
  {
    form: 'col-',
    meaning: 'together or with',
    words: ['collusion'],
  },
  {
    form: 'com-',
    meaning: 'together or with',
    words: ['commensurate', 'complementary', 'compound'],
  },
  {
    form: 'con-',
    meaning: 'together or with',
    words: ['concur', 'consolidate', 'converge'],
  },
  {
    form: 'counter-',
    meaning: 'against or opposite',
    words: ['counterintuitive', 'counterpoint', 'counterproductive'],
  },
  {
    form: 'dicho-',
    meaning: 'two or divided',
    words: ['dichotomy'],
  },
  {
    form: 'de-',
    meaning: 'down, away, or remove',
    words: ['debase', 'debunk', 'deface', 'deflect', 'degrade', 'demean', 'desecrate', 'detached', 'devolve'],
  },
  {
    form: 'dis-',
    meaning: 'apart, not, or remove',
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
    meaning: 'in, into, or make',
    words: ['engender', 'entitlement', 'entrenched'],
  },
  {
    form: 'eu-',
    meaning: 'good or pleasant',
    words: ['eulogy', 'euphemism', 'euphoria', 'euphoric'],
  },
  {
    form: 'ex-',
    meaning: 'out of or free from',
    words: ['exculpate', 'exonerate'],
  },
  {
    form: 'extra-',
    meaning: 'outside or beyond',
    words: ['extraneous', 'extrapolate', 'extrapolation'],
  },
  {
    form: 'fore-',
    meaning: 'before or in front',
    words: ['foreshadow', 'forestall'],
  },
  {
    form: 'hetero-',
    meaning: 'different',
    words: ['heterogeneous'],
  },
  {
    form: 'homo-',
    meaning: 'same',
    words: ['homogeneous'],
  },
  {
    form: 'hyper-',
    meaning: 'over or excessive',
    words: ['hyperbole'],
  },
  {
    form: 'inter-',
    meaning: 'between or among',
    words: ['intermittent'],
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
    meaning: 'in or into',
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
    meaning: 'in or inward',
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
    meaning: 'bad or harmful',
    words: ['malevolent', 'malodorous'],
  },
  {
    form: 'meta-',
    meaning: 'change or beyond',
    words: ['metamorphosis'],
  },
  {
    form: 'mis-',
    meaning: 'wrongly or badly',
    words: ['misconstrue', 'miscreant'],
  },
  {
    form: 'miso-',
    meaning: 'hatred',
    words: ['misogynist'],
  },
  {
    form: 'mono-',
    meaning: 'one or single',
    words: ['monotony'],
  },
  {
    form: 'neo-',
    meaning: 'new',
    words: ['neophyte'],
  },
  {
    form: 'para-',
    meaning: 'beside, beyond, or against',
    words: ['paradoxical'],
  },
  {
    form: 'per-',
    meaning: 'through',
    words: ['permeable', 'pervasive'],
  },
  {
    form: 'phil-/philo-',
    meaning: 'love or liking',
    words: ['philanthropic'],
  },
  {
    form: 'pre-',
    meaning: 'before',
    words: ['preamble', 'precocious', 'preclude', 'preempt', 'precedent', 'precursor', 'prescience'],
  },
  {
    form: 'pro-',
    meaning: 'forward or in favor of',
    words: ['proponent'],
  },
  {
    form: 're-',
    meaning: 'again or back',
    words: ['recant', 'reconcile', 'redress', 'resurgent', 'retract'],
  },
  {
    form: 'sub-',
    meaning: 'under or below',
    words: ['subside', 'subsume', 'subversive'],
  },
  {
    form: 'super-',
    meaning: 'above or excessive',
    words: ['superfluous', 'supersede'],
  },
  {
    form: 'trans-',
    meaning: 'across or through',
    words: ['transgression', 'transient', 'transitory'],
  },
  {
    form: 'un-',
    meaning: 'not or the opposite of',
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
    meaning: 'below or not enough',
    words: ['undermine', 'underscore'],
  },
]

const suffixRules = [
  {
    form: '-able',
    meaning: 'able to be or suitable for',
    matches: (word) => word.endsWith('able') && !['affable', 'amiable', 'equitable'].includes(word),
  },
  {
    form: '-ible',
    meaning: 'able or likely to be',
    matches: (word) => word.endsWith('ible') && word !== 'foible',
  },
  {
    form: '-ful',
    meaning: 'full of or having',
    words: ['fanciful'],
  },
  {
    form: '-less',
    meaning: 'without',
    words: ['guileless'],
  },
  {
    form: '-ish',
    meaning: 'somewhat like or having the quality of',
    words: ['boorish', 'peevish', 'raffish'],
  },
  {
    form: '-wise',
    meaning: 'in the manner of or regarding',
    words: ['likewise'],
  },
  {
    form: '-ling',
    meaning: 'a young, small, or lesser person or thing',
    words: ['fledgling'],
  },
  {
    form: '-some',
    meaning: 'having or causing a quality',
    words: ['cumbersome', 'winsome'],
  },
  {
    form: '-archy',
    meaning: 'rule or an ordered system',
    words: ['anarchy', 'hierarchy'],
  },
  {
    form: '-cracy',
    meaning: 'rule or government',
    words: ['bureaucracy'],
  },
  {
    form: '-pathy',
    meaning: 'feeling or disease',
    words: ['apathy', 'antipathy'],
  },
  {
    form: '-ism',
    meaning: 'a belief, system, or practice',
    words: ['activism', 'altruism', 'chauvinism', 'jingoism'],
  },
  {
    form: '-ist',
    meaning: 'a person who follows or practices something',
    words: ['chauvinist', 'egotist', 'hedonist', 'misogynist'],
  },
  {
    form: '-ify',
    meaning: 'make or become',
    words: ['exemplify', 'fortify', 'mollify', 'qualify'],
  },
  {
    form: '-ize',
    meaning: 'make, become, or treat as',
    words: ['aggrandize', 'antagonize', 'galvanize', 'lionize', 'mesmerize', 'ostracize', 'patronize'],
  },
  {
    form: '-al',
    meaning: 'related to or having a quality',
    matches: (word) => word.endsWith('al') && !word.endsWith('ical') && !['banal', 'zeal'].includes(word),
  },
  {
    form: '-ary',
    meaning: 'related to or connected with',
    matches: (word) => word.endsWith('ary') && !['quandary', 'wary'].includes(word),
  },
  {
    form: '-ory',
    meaning: 'related to or used for',
    matches: (word) => word.endsWith('ory'),
  },
  {
    form: '-ance',
    meaning: 'a state, quality, or action',
    words: ['abeyance', 'dissonance', 'temperance', 'variance'],
  },
  {
    form: '-ence',
    meaning: 'a state, quality, or action',
    words: [
      'ambivalence',
      'credence',
      'deference',
      'diffidence',
      'indifference',
      'intransigence',
      'opulence',
      'prescience',
      'truculence',
    ],
  },
  {
    form: '-ancy',
    meaning: 'a state or quality',
    words: ['ascendancy', 'discrepancy'],
  },
  {
    form: '-ency',
    meaning: 'a state or quality',
    words: ['clemency', 'exigency'],
  },
  {
    form: '-ment',
    meaning: 'an action, result, or state',
    words: ['entitlement'],
  },
  {
    form: '-arian',
    meaning: 'a person connected with or supporting something',
    words: ['egalitarian'],
  },
  {
    form: '-tomy',
    meaning: 'cutting or division',
    words: ['dichotomy'],
  },
  {
    form: '-graphy',
    meaning: 'writing, recording, or describing',
    words: ['cartography'],
  },
  {
    form: '-ity',
    meaning: 'a state or quality',
    matches: (word) => word.endsWith('ity'),
  },
  {
    form: '-ous',
    meaning: 'having or full of',
    matches: (word) => word.endsWith('ous'),
  },
  {
    form: '-ive',
    meaning: 'having a quality or tendency',
    matches: (word) => word.endsWith('ive') && !['contrive', 'derive', 'naive'].includes(word),
  },
  {
    form: '-tion',
    meaning: 'an action, process, or result',
    matches: (word) => word.endsWith('tion'),
  },
  {
    form: '-sion',
    meaning: 'an action, process, or result',
    matches: (word) => word.endsWith('sion'),
  },
  {
    form: '-ic',
    meaning: 'related to or characterized by',
    matches: (word) => word.endsWith('ic'),
  },
  {
    form: '-ical',
    meaning: 'related to or characterized by',
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

const uncommonMeaningWords = ['asunder', 'doctrine', 'render', 'reversal', 'susceptible']
for (const item of annotatedSeed) {
  const seen = new Set()
  for (const affix of item.commonAffixes) {
    const key = `${affix.type}:${affix.form}`
    if (seen.has(key)) throw new Error(`${item.word} has duplicate affix clue ${key}.`)
    seen.add(key)
    if (affix.meaning.length > 65) throw new Error(`${item.word} has an overly long meaning for ${affix.form}.`)
    if (uncommonMeaningWords.some((word) => affix.meaning.toLocaleLowerCase().includes(word))) {
      throw new Error(`${item.word} uses uncommon wording in the meaning for ${affix.form}.`)
    }
    if (affix.type === 'prefix' && !affix.form.endsWith('-')) {
      throw new Error(`${item.word} has malformed prefix ${affix.form}.`)
    }
    if (affix.type === 'suffix' && !affix.form.startsWith('-')) {
      throw new Error(`${item.word} has malformed suffix ${affix.form}.`)
    }
  }
}

writeFileSync(seedPath, `${JSON.stringify(annotatedSeed, null, 2)}\n`, 'utf8')
writeFileSync(sourcePath, `${JSON.stringify(annotatedSource, null, 2)}\n`, 'utf8')

const annotatedWords = annotatedSeed.filter((item) => item.commonAffixes.length)
const totalAffixes = annotatedSeed.reduce((total, item) => total + item.commonAffixes.length, 0)
console.log(`Analyzed 1,000 words; annotated ${annotatedWords.length} words with ${totalAffixes} useful affix clues.`)
