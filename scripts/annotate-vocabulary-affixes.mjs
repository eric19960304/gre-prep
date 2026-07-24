import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const seedPath = resolve(projectRoot, 'src/data/seedVocabulary.json')
const sourcePath = resolve(projectRoot, 'gre_vocabulary_1000_zh_TW.json')

const prefixRules = [
  {
    form: 'a-/an-',
    meaning: 'not; without',
    words: ['anarchy', 'anomalous', 'anomaly', 'apathetic', 'apathy', 'amorphous'],
  },
  {
    form: 'ab-',
    meaning: 'away from',
    words: ['abdicate', 'aberrant', 'aberration', 'abjure', 'abscond', 'abstain'],
  },
  {
    form: 'anti-',
    meaning: 'against; opposite to',
    words: ['antipathy', 'antithetical'],
  },
  {
    form: 'auto-',
    meaning: 'self',
    words: ['autonomous', 'autonomously'],
  },
  {
    form: 'bene-',
    meaning: 'good; well',
    words: ['beneficent'],
  },
  {
    form: 'circum-',
    meaning: 'around',
    words: ['circumscribe', 'circumvent'],
  },
  {
    form: 'co-',
    meaning: 'together; with',
    words: ['coagulate', 'coalesce', 'cohesive'],
  },
  {
    form: 'col-',
    meaning: 'together; with',
    words: ['collusion'],
  },
  {
    form: 'com-',
    meaning: 'together; with',
    words: ['commensurate', 'complementary', 'compound'],
  },
  {
    form: 'con-',
    meaning: 'together; with',
    words: ['concur', 'consolidate', 'converge'],
  },
  {
    form: 'counter-',
    meaning: 'against; opposite',
    words: ['counterintuitive', 'counterpoint', 'counterproductive'],
  },
  {
    form: 'dicho-',
    meaning: 'two; divided',
    words: ['dichotomy'],
  },
  {
    form: 'de-',
    meaning: 'down; away; remove',
    words: ['debase', 'debunk', 'deface', 'deflect', 'degrade', 'demean', 'desecrate', 'detached', 'devolve'],
  },
  {
    form: 'dis-',
    meaning: 'apart; not; remove',
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
    meaning: 'in; into; make',
    words: ['engender', 'entitlement', 'entrenched'],
  },
  {
    form: 'eu-',
    meaning: 'good; pleasant',
    words: ['eulogy', 'euphemism', 'euphoria', 'euphoric'],
  },
  {
    form: 'ex-',
    meaning: 'out of; free from',
    words: ['exculpate', 'exonerate'],
  },
  {
    form: 'extra-',
    meaning: 'outside; beyond',
    words: ['extraneous', 'extrapolate', 'extrapolation'],
  },
  {
    form: 'fore-',
    meaning: 'before; in front',
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
    meaning: 'over; excessive',
    words: ['hyperbole'],
  },
  {
    form: 'inter-',
    meaning: 'between; among',
    words: ['intermittent'],
  },
  {
    form: 'in-',
    meaning: 'not; without',
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
    meaning: 'in; into',
    words: ['incorporate', 'ingrained'],
  },
  {
    form: 'im-',
    meaning: 'not; without',
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
    meaning: 'in; inward',
    words: ['implode'],
  },
  {
    form: 'il-',
    meaning: 'not; without',
    words: ['illicit'],
  },
  {
    form: 'ir-',
    meaning: 'not; without',
    words: ['irresolute', 'irrevocable'],
  },
  {
    form: 'mal-',
    meaning: 'bad; harmful',
    words: ['malevolent', 'malodorous'],
  },
  {
    form: 'meta-',
    meaning: 'change; beyond',
    words: ['metamorphosis'],
  },
  {
    form: 'mis-',
    meaning: 'wrongly; badly',
    words: ['misconstrue', 'miscreant'],
  },
  {
    form: 'miso-',
    meaning: 'hatred',
    words: ['misogynist'],
  },
  {
    form: 'mono-',
    meaning: 'one; single',
    words: ['monotony'],
  },
  {
    form: 'neo-',
    meaning: 'new',
    words: ['neophyte'],
  },
  {
    form: 'para-',
    meaning: 'beside; beyond; against',
    words: ['paradoxical'],
  },
  {
    form: 'per-',
    meaning: 'through',
    words: ['permeable', 'pervasive'],
  },
  {
    form: 'phil-/philo-',
    meaning: 'love; liking',
    words: ['philanthropic'],
  },
  {
    form: 'pre-',
    meaning: 'before',
    words: ['preamble', 'precocious', 'preclude', 'preempt', 'precedent', 'precursor', 'prescience'],
  },
  {
    form: 'pro-',
    meaning: 'forward; in favor of',
    words: ['proponent'],
  },
  {
    form: 're-',
    meaning: 'again; back',
    words: ['recant', 'reconcile', 'redress', 'resurgent', 'retract'],
  },
  {
    form: 'sub-',
    meaning: 'under; below',
    words: ['subside', 'subsume', 'subversive'],
  },
  {
    form: 'super-',
    meaning: 'above; excessive',
    words: ['superfluous', 'supersede'],
  },
  {
    form: 'trans-',
    meaning: 'across; through',
    words: ['transgression', 'transient', 'transitory'],
  },
  {
    form: 'un-',
    meaning: 'not; the opposite of',
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
    meaning: 'below; not enough',
    words: ['undermine', 'underscore'],
  },
]

const suffixRules = [
  {
    form: '-able',
    meaning: 'able to be; suitable for',
    matches: (word) => word.endsWith('able') && !['affable', 'amiable', 'equitable'].includes(word),
  },
  {
    form: '-ible',
    meaning: 'able to be; likely to be',
    matches: (word) => word.endsWith('ible') && word !== 'foible',
  },
  {
    form: '-ful',
    meaning: 'full of; having',
    words: ['fanciful'],
  },
  {
    form: '-less',
    meaning: 'without',
    words: ['guileless'],
  },
  {
    form: '-ish',
    meaning: 'somewhat like; having the quality of',
    words: ['boorish', 'peevish', 'raffish'],
  },
  {
    form: '-wise',
    meaning: 'in the manner of; regarding',
    words: ['likewise'],
  },
  {
    form: '-ling',
    meaning: 'young; small; lesser',
    words: ['fledgling'],
  },
  {
    form: '-some',
    meaning: 'having a quality; causing a quality',
    words: ['cumbersome', 'winsome'],
  },
  {
    form: '-archy',
    meaning: 'rule; an ordered system',
    words: ['anarchy', 'hierarchy'],
  },
  {
    form: '-cracy',
    meaning: 'rule; government',
    words: ['bureaucracy'],
  },
  {
    form: '-pathy',
    meaning: 'feeling; disease',
    words: ['apathy', 'antipathy'],
  },
  {
    form: '-ism',
    meaning: 'a belief; system; practice',
    words: ['activism', 'altruism', 'chauvinism', 'jingoism'],
  },
  {
    form: '-ist',
    meaning: 'a follower; someone who practices something',
    words: ['chauvinist', 'egotist', 'hedonist', 'misogynist'],
  },
  {
    form: '-ify',
    meaning: 'make; become',
    words: ['exemplify', 'fortify', 'mollify', 'qualify'],
  },
  {
    form: '-ize',
    meaning: 'make; become; treat as',
    words: ['aggrandize', 'antagonize', 'galvanize', 'lionize', 'mesmerize', 'ostracize', 'patronize'],
  },
  {
    form: '-al',
    meaning: 'related to; having a quality',
    matches: (word) => word.endsWith('al') && !word.endsWith('ical') && !['banal', 'zeal'].includes(word),
  },
  {
    form: '-ary',
    meaning: 'related to; connected with',
    matches: (word) => word.endsWith('ary') && !['quandary', 'wary'].includes(word),
  },
  {
    form: '-ory',
    meaning: 'related to; used for',
    matches: (word) => word.endsWith('ory'),
  },
  {
    form: '-ance',
    meaning: 'a state; quality; action',
    words: ['abeyance', 'dissonance', 'temperance', 'variance'],
  },
  {
    form: '-ence',
    meaning: 'a state; quality; action',
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
    meaning: 'a state; quality',
    words: ['ascendancy', 'discrepancy'],
  },
  {
    form: '-ency',
    meaning: 'a state; quality',
    words: ['clemency', 'exigency'],
  },
  {
    form: '-ment',
    meaning: 'an action; result; state',
    words: ['entitlement'],
  },
  {
    form: '-arian',
    meaning: 'a person connected with something; a supporter',
    words: ['egalitarian'],
  },
  {
    form: '-tomy',
    meaning: 'cutting; division',
    words: ['dichotomy'],
  },
  {
    form: '-graphy',
    meaning: 'writing; recording; describing',
    words: ['cartography'],
  },
  {
    form: '-ity',
    meaning: 'a state; quality',
    matches: (word) => word.endsWith('ity'),
  },
  {
    form: '-ous',
    meaning: 'having; full of',
    matches: (word) => word.endsWith('ous'),
  },
  {
    form: '-ive',
    meaning: 'having a quality; having a tendency',
    matches: (word) => word.endsWith('ive') && !['contrive', 'derive', 'naive'].includes(word),
  },
  {
    form: '-tion',
    meaning: 'an action; process; result',
    matches: (word) => word.endsWith('tion'),
  },
  {
    form: '-sion',
    meaning: 'an action; process; result',
    matches: (word) => word.endsWith('sion'),
  },
  {
    form: '-ic',
    meaning: 'related to; characterized by',
    matches: (word) => word.endsWith('ic'),
  },
  {
    form: '-ical',
    meaning: 'related to; characterized by',
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
    if (/\bor\b/i.test(affix.meaning)) {
      throw new Error(`${item.word} uses "or" instead of semicolons in the meaning for ${affix.form}.`)
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
