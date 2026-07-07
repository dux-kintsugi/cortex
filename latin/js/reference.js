'use strict';
// Legō — reference: pronunciation, paradigm tables, reading strategy.

(function () {
  const L = window.Lego;
  const T = (caption, headers, rows) => ({ caption, headers, rows });
  const CASES = ['Nominative', 'Genitive', 'Dative', 'Accusative', 'Ablative'];

  function decl(caption, sg, pl) {
    return T(caption, ['Case', 'Singular', 'Plural'], CASES.map((c, i) => [c, sg[i], pl[i]]));
  }
  function conj(caption, forms) {
    const P = ['1st sg. (I)', '2nd sg. (you)', '3rd sg. (he/she/it)', '1st pl. (we)', '2nd pl. (you pl.)', '3rd pl. (they)'];
    return T(caption, ['Person', 'Form'], P.map((p, i) => [p, forms[i]]));
  }

  L.REF = [
    {
      id: 'pronounce', title: 'Pronunciation',
      html: `
        <p>Restored classical pronunciation, in brief. Latin spelling is phonetic — every letter is
        pronounced, always the same way.</p>
        <p><strong>Vowels.</strong> Short: <span class="la">a</span> as in <em>about</em>, <span class="la">e</span> as in <em>pet</em>,
        <span class="la">i</span> as in <em>pit</em>, <span class="la">o</span> as in <em>off</em>, <span class="la">u</span> as in <em>put</em>.
        Long (marked with a macron, <span class="la">ā ē ī ō ū</span>): the same sounds held twice as long —
        <span class="la">ā</span> as in <em>father</em>, <span class="la">ē</span> as in <em>they</em>, <span class="la">ī</span> as in <em>machine</em>,
        <span class="la">ō</span> as in <em>hope</em>, <span class="la">ū</span> as in <em>rude</em>.</p>
        <p><strong>Diphthongs.</strong> <span class="la">ae</span> = <em>eye</em>; <span class="la">au</span> = <em>how</em>;
        <span class="la">oe</span> = <em>boy</em>; <span class="la">ei</span> = <em>eight</em>; <span class="la">ui</span> ≈ <em>gooey</em>, quickly.</p>
        <p><strong>Consonants.</strong> <span class="la">c</span> always hard (<em>cat</em>, never <em>city</em>);
        <span class="la">g</span> always as in <em>go</em>; <span class="la">v</span> = English <em>w</em>;
        consonantal <span class="la">i</span> = English <em>y</em> (<span class="la">iam</span> = "yam");
        <span class="la">r</span> lightly trilled; <span class="la">s</span> always as in <em>sing</em>;
        <span class="la">t</span> always as in <em>top</em> (never "sh"); <span class="la">ch, ph, th</span> =
        aspirated c/p/t; <span class="la">qu</span> = <em>kw</em>; <span class="la">gn</span> ≈ "ngn" (<span class="la">magnus</span> ≈ "mahng-nus").</p>
        <p><strong>Accent.</strong> Two-syllable words stress the first syllable. Longer words stress the
        second-to-last syllable if it is long, otherwise the third-from-last:
        <span class="la">a·MĪ·cus</span>, <span class="la">DO·mi·nus</span>.</p>`,
    },
    {
      id: 'cases', title: 'What the cases do',
      html: `<p>Latin marks a noun's job with its ending. Reading Latin is mostly the art of noticing
        these endings before anything else.</p>`,
      tables: [
        T('The five cases you will read constantly', ['Case', 'Core job', 'When you see it, think…'], [
          ['Nominative', 'subject', '"this is who acts (or is)"'],
          ['Genitive', 'possession, "of"', '"of ___" — attaches to a nearby noun'],
          ['Dative', 'indirect object, "to/for"', '"to/for ___" — someone receives or benefits'],
          ['Accusative', 'direct object; goal of motion', '"the verb lands on this" / after ad, per, in (into)'],
          ['Ablative', '"with / by / from / in"', 'partner of most prepositions; means, manner, place, time'],
        ]),
        T('Bonus: two minor cases', ['Case', 'Job', 'Example'], [
          ['Vocative', 'direct address', '«Mārce!» — "Marcus!"'],
          ['Locative', 'place, for cities/small islands', '«Rōmae» — "at Rome"'],
        ]),
      ],
    },
    {
      id: 'decl', title: 'Noun declensions I–V',
      html: `<p>The five families of nouns. You never need to produce these — you need to recognize a form
        when you meet it, and these tables are the map. The genitive singular (always given in vocabulary)
        tells you the family: <span class="la">-ae</span> I, <span class="la">-ī</span> II,
        <span class="la">-is</span> III, <span class="la">-ūs</span> IV, <span class="la">-eī/-ēī</span> V.</p>`,
      tables: [
        decl('I — puella, puellae, f. (girl)', ['puella', 'puellae', 'puellae', 'puellam', 'puellā'], ['puellae', 'puellārum', 'puellīs', 'puellās', 'puellīs']),
        decl('II — servus, servī, m. (slave)', ['servus', 'servī', 'servō', 'servum', 'servō'], ['servī', 'servōrum', 'servīs', 'servōs', 'servīs']),
        decl('II neuter — dōnum, dōnī, n. (gift)', ['dōnum', 'dōnī', 'dōnō', 'dōnum', 'dōnō'], ['dōna', 'dōnōrum', 'dōnīs', 'dōna', 'dōnīs']),
        decl('III — rēx, rēgis, m. (king)', ['rēx', 'rēgis', 'rēgī', 'rēgem', 'rēge'], ['rēgēs', 'rēgum', 'rēgibus', 'rēgēs', 'rēgibus']),
        decl('III neuter — corpus, corporis, n. (body)', ['corpus', 'corporis', 'corporī', 'corpus', 'corpore'], ['corpora', 'corporum', 'corporibus', 'corpora', 'corporibus']),
        decl('IV — manus, manūs, f. (hand)', ['manus', 'manūs', 'manuī', 'manum', 'manū'], ['manūs', 'manuum', 'manibus', 'manūs', 'manibus']),
        decl('V — rēs, reī, f. (thing, matter)', ['rēs', 'reī', 'reī', 'rem', 'rē'], ['rēs', 'rērum', 'rēbus', 'rēs', 'rēbus']),
      ],
      after: `<p class="tip">💡 Third-declension <em>i-stems</em> (most nouns in <span class="la">-is</span>, and city/nature
        words like <span class="la">urbs, nāvis, mare</span>) show genitive plural <span class="la">-ium</span>
        and neuter plural <span class="la">-ia</span>. Recognize and move on.</p>`,
    },
    {
      id: 'adj', title: 'Adjectives & comparison',
      html: `<p>Adjectives agree with their noun in case, number, and gender — even across word-order
        distance. Endings match the noun's <em>job</em>, not necessarily its letters:
        <span class="la">nauta bonus</span> is fine (nauta is masculine).</p>`,
      tables: [
        T('1st/2nd declension: bonus, -a, -um (good)', ['', 'Masculine', 'Feminine', 'Neuter'], [
          ['declines like…', 'servus', 'puella', 'dōnum'],
        ]),
        T('3rd declension: fortis, forte (brave)', ['Case', 'M/F sing.', 'Neut. sing.', 'M/F pl.', 'Neut. pl.'], [
          ['Nominative', 'fortis', 'forte', 'fortēs', 'fortia'],
          ['Genitive', 'fortis', 'fortis', 'fortium', 'fortium'],
          ['Dative', 'fortī', 'fortī', 'fortibus', 'fortibus'],
          ['Accusative', 'fortem', 'forte', 'fortēs', 'fortia'],
          ['Ablative', 'fortī', 'fortī', 'fortibus', 'fortibus'],
        ]),
        T('Comparison', ['Degree', 'Marker', 'Example'], [
          ['Comparative ("more, -er")', '-ior (neut. -ius), declines like a 3rd-decl. noun', 'fortior — braver'],
          ['Superlative ("most, -est")', '-issimus, -a, -um (-errimus, -illimus)', 'fortissimus — bravest'],
          ['"than"', 'quam + same case, or plain ablative', 'fortior quam leō / fortior leōne'],
        ]),
        T('Irregular comparison worth memorizing', ['Positive', 'Comparative', 'Superlative'], [
          ['bonus (good)', 'melior', 'optimus'],
          ['malus (bad)', 'peior', 'pessimus'],
          ['magnus (big)', 'maior', 'maximus'],
          ['parvus (small)', 'minor', 'minimus'],
          ['multus (much/many)', 'plūs', 'plūrimus'],
        ]),
      ],
    },
    {
      id: 'pron', title: 'Pronouns',
      html: `<p>Small, frequent, irregular — pronouns reward raw familiarity. Skim these tables often.</p>`,
      tables: [
        T('Personal pronouns', ['Case', 'ego (I)', 'tū (you)', 'nōs (we)', 'vōs (you pl.)'], [
          ['Nominative', 'ego', 'tū', 'nōs', 'vōs'],
          ['Genitive', 'meī', 'tuī', 'nostrum/nostrī', 'vestrum/vestrī'],
          ['Dative', 'mihi', 'tibi', 'nōbīs', 'vōbīs'],
          ['Accusative', 'mē', 'tē', 'nōs', 'vōs'],
          ['Ablative', 'mē', 'tē', 'nōbīs', 'vōbīs'],
        ]),
        T('is, ea, id — he, she, it; that', ['Case', 'M sg.', 'F sg.', 'N sg.', 'M pl.', 'F pl.', 'N pl.'], [
          ['Nominative', 'is', 'ea', 'id', 'eī', 'eae', 'ea'],
          ['Genitive', 'eius', 'eius', 'eius', 'eōrum', 'eārum', 'eōrum'],
          ['Dative', 'eī', 'eī', 'eī', 'eīs', 'eīs', 'eīs'],
          ['Accusative', 'eum', 'eam', 'id', 'eōs', 'eās', 'ea'],
          ['Ablative', 'eō', 'eā', 'eō', 'eīs', 'eīs', 'eīs'],
        ]),
        T('hic (this) & ille (that) — nominative/accusative sketch', ['', 'M', 'F', 'N'], [
          ['hic: nom. sg.', 'hic', 'haec', 'hoc'],
          ['hic: acc. sg.', 'hunc', 'hanc', 'hoc'],
          ['ille: nom. sg.', 'ille', 'illa', 'illud'],
          ['ille: acc. sg.', 'illum', 'illam', 'illud'],
        ]),
        T('quī, quae, quod — who, which (relative)', ['Case', 'M sg.', 'F sg.', 'N sg.', 'M pl.', 'F pl.', 'N pl.'], [
          ['Nominative', 'quī', 'quae', 'quod', 'quī', 'quae', 'quae'],
          ['Genitive', 'cuius', 'cuius', 'cuius', 'quōrum', 'quārum', 'quōrum'],
          ['Dative', 'cui', 'cui', 'cui', 'quibus', 'quibus', 'quibus'],
          ['Accusative', 'quem', 'quam', 'quod', 'quōs', 'quās', 'quae'],
          ['Ablative', 'quō', 'quā', 'quō', 'quibus', 'quibus', 'quibus'],
        ]),
      ],
      after: `<p class="tip">💡 «sē» (himself/herself/themselves) points back at the subject; «suus» means
        "his/her/their own". «ipse» adds emphasis — "the man himself".</p>`,
    },
    {
      id: 'verbs1', title: 'Verbs: present system (active)',
      html: `<p>The present, imperfect, and future are built on the present stem. Person endings are the
        same everywhere: <span class="la">-ō/-m, -s, -t, -mus, -tis, -nt</span>. Find the ending → you know
        who; find the tense sign → you know when.</p>`,
      tables: [
        T('Present tense across the conjugations', ['Person', 'I amō (love)', 'II moneō (warn)', 'III regō (rule)', 'III-iō capiō (take)', 'IV audiō (hear)'], [
          ['1 sg.', 'amō', 'moneō', 'regō', 'capiō', 'audiō'],
          ['2 sg.', 'amās', 'monēs', 'regis', 'capis', 'audīs'],
          ['3 sg.', 'amat', 'monet', 'regit', 'capit', 'audit'],
          ['1 pl.', 'amāmus', 'monēmus', 'regimus', 'capimus', 'audīmus'],
          ['2 pl.', 'amātis', 'monētis', 'regitis', 'capitis', 'audītis'],
          ['3 pl.', 'amant', 'monent', 'regunt', 'capiunt', 'audiunt'],
        ]),
        T('Tense signs on the present stem', ['Tense', 'Sign', 'Example', 'Reads as'], [
          ['Imperfect', '-bā-', 'amābat, regēbat', '"was loving, used to love"'],
          ['Future (I–II)', '-bi-', 'amābit, monēbit', '"will love"'],
          ['Future (III–IV)', '-ē- (1 sg. -am)', 'reget, capiet, audiet', '"will rule"'],
        ]),
      ],
      after: `<p class="tip">💡 Trap: «amābit» (he will love, future) vs «amāvit» (he loved, perfect).
        One letter, one tense apart — b is future, v is past.</p>`,
    },
    {
      id: 'verbs2', title: 'Verbs: perfect system & passive',
      html: `<p>The perfect system is built on the third principal part (<span class="la">amāvī</span>).
        The passive swaps in its own endings: <span class="la">-or, -ris, -tur, -mur, -minī, -ntur</span>.</p>`,
      tables: [
        T('Perfect system (active) — one set of endings for every verb', ['Tense', 'Endings on the perfect stem', 'amāre example', 'Reads as'], [
          ['Perfect', '-ī, -istī, -it, -imus, -istis, -ērunt', 'amāvit', '"loved, has loved"'],
          ['Pluperfect', '-eram, -erās, -erat…', 'amāverat', '"had loved"'],
          ['Future perfect', '-erō, -eris, -erit…', 'amāverit', '"will have loved"'],
        ]),
        T('Passive, present system', ['Person', 'Present', 'Imperfect', 'Future (I–II)'], [
          ['1 sg.', 'amor', 'amābar', 'amābor'],
          ['2 sg.', 'amāris', 'amābāris', 'amāberis'],
          ['3 sg.', 'amātur', 'amābātur', 'amābitur'],
          ['1 pl.', 'amāmur', 'amābāmur', 'amābimur'],
          ['2 pl.', 'amāminī', 'amābāminī', 'amābiminī'],
          ['3 pl.', 'amantur', 'amābantur', 'amābuntur'],
        ]),
        T('Passive, perfect system = participle + esse', ['Tense', 'Form', 'Reads as'], [
          ['Perfect passive', 'amātus est', '"he was loved / has been loved"'],
          ['Pluperfect passive', 'amātus erat', '"he had been loved"'],
          ['Agent', 'ā/ab + ablative', 'ā Mārcō — "by Marcus"'],
        ]),
      ],
      after: `<p class="tip">💡 Deponent verbs (loquor, sequor, cōnor, moritur…) wear passive endings with
        active meaning: «loquitur» = "he speaks", not "he is spoken".</p>`,
    },
    {
      id: 'irreg', title: 'Irregular verbs',
      html: `<p>A handful of ancient, over-used verbs refuse the patterns. They are so frequent that they
        become familiar fast.</p>`,
      tables: [
        conj('sum, esse, fuī — to be (present)', ['sum', 'es', 'est', 'sumus', 'estis', 'sunt']),
        T('sum: other tenses', ['Tense', '3 sg.', 'Reads as'], [
          ['Imperfect', 'erat', 'was'],
          ['Future', 'erit', 'will be'],
          ['Perfect', 'fuit', 'was, has been'],
        ]),
        conj('possum, posse, potuī — to be able (present)', ['possum', 'potes', 'potest', 'possumus', 'potestis', 'possunt']),
        conj('ferō, ferre, tulī, lātum — to carry, bear', ['ferō', 'fers', 'fert', 'ferimus', 'fertis', 'ferunt']),
        conj('eō, īre, iī, itum — to go', ['eō', 'īs', 'it', 'īmus', 'ītis', 'eunt']),
        conj('volō, velle, voluī — to want', ['volō', 'vīs', 'vult', 'volumus', 'vultis', 'volunt']),
      ],
      after: `<p class="tip">💡 «nōlō» = not-want (nōn vult → nōn vult…), «mālō» = want-more (māvult).
        And «fīō, fierī» ("become, be made") serves as the passive of faciō.</p>`,
    },
    {
      id: 'nonfinite', title: 'Participles & infinitives',
      html: `<p>Participles are verb-adjectives; Latin leans on them where English uses whole clauses.
        Spot them, translate them as little clauses, and long sentences fall apart into pieces.</p>`,
      tables: [
        T('The participles of amāre', ['Participle', 'Form', 'Reads as'], [
          ['Present active', 'amāns, amantis', '"loving, while loving"'],
          ['Perfect passive', 'amātus, -a, -um', '"(having been) loved"'],
          ['Future active', 'amātūrus, -a, -um', '"about to love"'],
          ['Gerundive', 'amandus, -a, -um', '"to be loved, must be loved"'],
        ]),
        T('The infinitives of amāre', ['Infinitive', 'Active', 'Passive'], [
          ['Present', 'amāre', 'amārī'],
          ['Perfect', 'amāvisse', 'amātus esse'],
          ['Future', 'amātūrus esse', '—'],
        ]),
        T('Ablative absolute — a sentence in a pocket', ['Latin', 'Literal', 'Natural'], [
          ['nāve āmissā', 'the ship having been lost', 'after the ship was lost / with the ship lost'],
          ['Titō loquente', 'Titus speaking', 'while Titus was speaking'],
        ]),
      ],
      after: `<p class="tip">💡 Accusative + infinitive = reported speech: «dīcit Titum vīvere» —
        "he says that Titus is alive". No word for "that"; the accusative is the subject of the infinitive.</p>`,
    },
    {
      id: 'subj', title: 'The subjunctive (for readers)',
      html: `<p>The subjunctive is the mood of purpose, possibility, and framed thought. For reading you
        need to (1) recognize the forms and (2) know what the introducing word signals.</p>`,
      tables: [
        T('Subjunctive forms at a glance (3 sg.)', ['Tense', 'I amō', 'III regō', 'sum', 'Field mark'], [
          ['Present', 'amet', 'regat', 'sit', 'vowel swap: "let/may…"'],
          ['Imperfect', 'amāret', 'regeret', 'esset', 'infinitive + t'],
          ['Perfect', 'amāverit', 'rēxerit', 'fuerit', 'perfect stem + eri'],
          ['Pluperfect', 'amāvisset', 'rēxisset', 'fuisset', 'perfect infinitive + t'],
        ]),
        T('What the signal words mean', ['Signal', 'Clause type', 'Read it as'], [
          ['ut + subj.', 'purpose / result', '"so that, in order to / with the result that"'],
          ['nē + subj.', 'negative purpose', '"so that…not, lest"'],
          ['cum + subj.', 'circumstance / cause', '"when, since, although"'],
          ['quis/quid/cūr… + subj.', 'indirect question', '"…asks why he came"'],
          ['sī/nisi + subj.', 'unreal condition', '"if he were… / if he had…"'],
        ]),
      ],
      after: `<p class="tip">💡 Reading shortcut: subjunctives in subordinate clauses usually translate as
        plain English — the mood colors the logic, not the dictionary meaning.</p>`,
    },
    {
      id: 'numbers', title: 'Numbers',
      tables: [
        T('Cardinals & numerals', ['Arabic', 'Roman', 'Latin'], [
          ['1', 'I', 'ūnus, -a, -um'], ['2', 'II', 'duo, duae, duo'], ['3', 'III', 'trēs, tria'],
          ['4', 'IV', 'quattuor'], ['5', 'V', 'quīnque'], ['6', 'VI', 'sex'],
          ['7', 'VII', 'septem'], ['8', 'VIII', 'octō'], ['9', 'IX', 'novem'], ['10', 'X', 'decem'],
          ['20', 'XX', 'vīgintī'], ['50', 'L', 'quīnquāgintā'], ['100', 'C', 'centum'],
          ['500', 'D', 'quīngentī'], ['1000', 'M', 'mīlle'],
        ]),
        T('Time expressions', ['Pattern', 'Example', 'Meaning'], [
          ['Ablative = time when', 'tertiā hōrā', 'at the third hour'],
          ['Accusative = duration', 'trēs hōrās', 'for three hours'],
        ]),
      ],
      html: `<p>Most numbers don't decline (4–100 are frozen). Only ūnus, duo, trēs, and the hundreds flex.</p>`,
    },
    {
      id: 'strategy', title: 'How to attack a Latin sentence',
      html: `
        <p>Real Latin word order is freer than English but not random — it is <em>suspenseful</em>. The
        verb tends to come last; everything before it is stage-setting. A reliable routine:</p>
        <p><strong>1. Read to the end of the clause first.</strong> Don't translate word-by-word from the
        left; Latin makes you wait for the verb, so go get it.</p>
        <p><strong>2. Find the verb.</strong> Its ending gives you person, number, tense, and voice — half
        the sentence's meaning lives here.</p>
        <p><strong>3. Find the subject.</strong> A nominative that agrees with the verb — or hiding inside
        the verb ending itself.</p>
        <p><strong>4. Let the cases claim their jobs.</strong> Accusative → object of the verb (or of ad/per/in).
        Genitive → glue it to the nearest noun. Dative → someone receives. Ablative → with/by/from/in.</p>
        <p><strong>5. Bracket the subordinate bits.</strong> quī/quae/quod, cum, ut, sī, participles,
        ablative absolutes — mentally set them in parentheses, read the core sentence, then unpack.</p>
        <p><strong>6. Re-read the whole sentence aloud, in order.</strong> This is how it becomes reading
        rather than decoding — the goal is to feel the meaning arrive in Latin order.</p>
        <p class="tip">💡 When stuck: it is almost always a form you misread, not a word you don't know.
        Check the ending again before reaching for the gloss.</p>`,
    },
  ];

  L.renderReference = function (app, topicId) {
    const topic = L.REF.find(t => t.id === topicId) || L.REF[0];
    app.innerHTML = `
      <div class="refwrap">
        <nav class="refnav">
          <h2>Reference</h2>
          ${L.REF.map(t => `<button class="refitem ${t.id === topic.id ? 'on' : ''}" data-go="reference|${t.id}">${L.esc(t.title)}</button>`).join('')}
        </nav>
        <article class="prose refbody">
          <h1>${L.esc(topic.title)}</h1>
          ${topic.html || ''}
          ${(topic.tables || []).map(L.tableHTML).join('')}
          ${topic.after || ''}
        </article>
      </div>`;
  };
})();
