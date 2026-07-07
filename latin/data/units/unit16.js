registerUnit({
  id: 16,
  stage: 2,
  title: "Quō Īs?",
  tagline: "Question words, commands, and the vocative — asking your way home",

  grammar: [
    {
      heading: "The question words: Latin’s interview kit",
      body: "<p>Until now, most questions you have met wore the little tag <span class=\"la\">‑ne</span>, which asks only ‘yes or no?’. Today Quintus needs real information — who? where? how? — and Latin has a crisp little word for each. Like their English cousins, they stand at the front of the sentence and announce: a question is coming.</p><p><span class=\"la\">Quis</span> (who?) and <span class=\"la\">quid</span> (what?) decline: expect <span class=\"la\">quem</span> for ‘whom?’ and your old friend <span class=\"la\">cuius</span> (whose?) from Unit 5. The rest — <span class=\"la\">cūr, ubi, quō, unde, quandō, quōmodo</span> — never change shape at all. <span class=\"la\">Quantus, quanta, quantum</span> (how big?) is an ordinary adjective and agrees with its noun: <span class=\"la\">quanta urbs!</span></p>",
      table: {
        caption: "The question words",
        headers: ["Latin", "It asks…", "Example"],
        rows: [
          ["quis? quid?", "who? what?", "Quis clāmat? — Quid vidēs?"],
          ["cūr?", "why?", "Cūr lacrimās?"],
          ["ubi?", "where (at)?", "Ubi est pater?"],
          ["quō?", "where to?", "Quō īs?"],
          ["unde?", "where from?", "Unde venīs?"],
          ["quandō?", "when?", "Quandō domum redīmus?"],
          ["quōmodo?", "how?", "Quōmodo viam inveniō?"],
          ["quantus, -a, -um?", "how big? how great?", "Quanta est haec urbs!"]
        ]
      },
      tip: "Reading tip: a q-word at the head of a sentence flips it into a question — no «‑ne» needed. Spot the q-word first and you know exactly what information the sentence is fishing for."
    },
    {
      heading: "«Quō īs?» — the littlest verb, eō",
      body: "<p>The verb <span class=\"la\">eō, īre</span> (go) is tiny, irregular, and everywhere — a lost boy does a great deal of going. Learn to recognize its present forms on sight; <span class=\"la\">redeō</span> (go back, return) simply adds <span class=\"la\">red‑</span> in front and behaves exactly the same way.</p><p>Watch the two-letter forms: <span class=\"la\">īs</span> is ‘you go’ and <span class=\"la\">it</span> is ‘he or she goes’ — Latin <span class=\"la\">it</span> has nothing to do with English ‘it’.</p><p>And where to? Latin answers with direction words: <span class=\"la\">rēctā</span> (straight ahead), <span class=\"la\">ad dextram</span> (to the right), <span class=\"la\">ad sinistram</span> (to the left) — and one special accusative, <span class=\"la\">domum</span> (‘home, homeward’), which needs no preposition at all: <span class=\"la\">domum eō</span> — I am going home.</p>",
      table: {
        caption: "Present tense of eō and redeō",
        headers: ["Person", "eō — go", "redeō — go back"],
        rows: [
          ["I", "eō", "redeō"],
          ["you (sg.)", "īs", "redīs"],
          ["he / she", "it", "redit"],
          ["we", "īmus", "redīmus"],
          ["you (pl.)", "ītis", "redītis"],
          ["they", "eunt", "redeunt"]
        ]
      },
      tip: "Reading tip: meet a stray «it» or «īs» in a Latin sentence and think ‘going’, not English ‘it’ or ‘is’. The tiniest words are the easiest to misread."
    },
    {
      heading: "Orders: the imperative",
      body: "<p>To tell someone to do something, Latin uses the shortest form a verb owns: the <strong>imperative</strong>. For one person it is essentially the bare stem — <span class=\"la\">ambulā!</span> <span class=\"la\">respondē!</span> <span class=\"la\">curre!</span> <span class=\"la\">audī!</span> For more than one person, add <span class=\"la\">‑te</span>: <span class=\"la\">currite, puerī!</span></p><p>A few everyday verbs clip the singular even shorter: <span class=\"la\">dīc!</span> (say!), <span class=\"la\">dūc!</span> (lead!), <span class=\"la\">fac!</span> (do!). And <span class=\"la\">ī!</span> — from <span class=\"la\">īre</span> — may be the shortest complete sentence in Latin: ‘Go!’ Finally, <span class=\"la\">age</span>, an old imperative of <span class=\"la\">agō</span>, has softened into an interjection: ‘come on! well then!’ — Romans said it the way we say ‘right, let’s go’.</p>",
      table: {
        caption: "Imperatives by conjugation",
        headers: ["Verb", "To one person", "To several"],
        rows: [
          ["ambulāre (walk)", "ambulā!", "ambulāte!"],
          ["respondēre (answer)", "respondē!", "respondēte!"],
          ["currere (run)", "curre!", "currite!"],
          ["audīre (listen)", "audī!", "audīte!"],
          ["īre (go)", "ī!", "īte!"],
          ["dīcere (say)", "dīc!", "dīcite!"]
        ]
      },
      tip: "Reading tip: a verb standing first in its sentence with no ‑t or ‑nt on the end is usually a command — in dialogue, expect imperatives everywhere."
    },
    {
      heading: "Calling names: the vocative",
      body: "<p>When Romans call out to someone, the name slips into the <strong>vocative</strong> case — the calling case. The rule is friendly: for almost every word in the language, the vocative looks exactly like the nominative — <span class=\"la\">Paulla!</span> <span class=\"la\">māter!</span> <span class=\"la\">Ferōx!</span></p><p>The one exception is the 2nd declension. Names and nouns in <span class=\"la\">‑us</span> switch to <span class=\"la\">‑e</span>: <span class=\"la\">Quīntus → Quīnte!</span> Those in <span class=\"la\">‑ius</span> end in plain <span class=\"la\">‑ī</span>: <span class=\"la\">fīlius → fīlī!</span> Even the adjective <span class=\"la\">meus</span> has a special vocative, <span class=\"la\">mī</span>: <span class=\"la\">fīlī mī!</span> — ‘my son!’</p>",
      table: {
        caption: "Vocative: the calling case",
        headers: ["Nominative", "Vocative", "Meaning"],
        rows: [
          ["Quīntus", "Quīnte!", "Quintus!"],
          ["bonus canis", "bone canis!", "good dog!"],
          ["fīlius meus", "fīlī mī!", "my son!"],
          ["Paulla, māter, Ferōx", "Paulla! māter! Ferōx!", "unchanged — same as the nominative"]
        ]
      },
      tip: "Reading tip: an ‑e ending on a familiar ‑us name is not a new word — somebody is being spoken to. «Quīnte!» means someone wants Quintus’s attention, usually loudly."
    }
  ],

  vocab: [
    {
      latin: "quis",
      forms: "quid (n.); acc. quem",
      pos: "pronoun (interrogative)",
      gloss: "who?",
      example: "Quis es? Ego Quīntus sum.",
      exampleGloss: "Who are you? I am Quintus."
    },
    {
      latin: "quid",
      forms: "(neut. of quis)",
      pos: "pronoun (interrogative)",
      gloss: "what?",
      example: "Quid Ferōx in culīnā facit?",
      exampleGloss: "What is Ferox doing in the kitchen?"
    },
    {
      latin: "cūr",
      forms: "(indēcl.)",
      pos: "adverb (interrogative)",
      gloss: "why?",
      example: "Cūr lacrimās, Paulla?",
      exampleGloss: "Why are you crying, Paulla?"
    },
    {
      latin: "ubi",
      forms: "(indēcl.)",
      pos: "adverb (interrogative)",
      gloss: "where? where at?",
      example: "Ubi est canis noster?",
      exampleGloss: "Where is our dog?"
    },
    {
      latin: "quō",
      forms: "(indēcl.)",
      pos: "adverb (interrogative)",
      gloss: "where to?",
      example: "Quō īs, Quīnte?",
      exampleGloss: "Where are you going, Quintus?"
    },
    {
      latin: "unde",
      forms: "(indēcl.)",
      pos: "adverb (interrogative)",
      gloss: "from where?",
      example: "Unde venīs, viātor?",
      exampleGloss: "Where do you come from, traveler?"
    },
    {
      latin: "quandō",
      forms: "(indēcl.)",
      pos: "adverb (interrogative)",
      gloss: "when?",
      example: "Quandō domum redīmus?",
      exampleGloss: "When are we going back home?"
    },
    {
      latin: "quōmodo",
      forms: "(indēcl.)",
      pos: "adverb (interrogative)",
      gloss: "how?",
      example: "Quōmodo viam invenīre possum?",
      exampleGloss: "How can I find the way?"
    },
    {
      latin: "quantus",
      forms: "quanta, quantum",
      pos: "adjective (1st/2nd decl.)",
      gloss: "how great? how big?",
      example: "Quanta est haec urbs!",
      exampleGloss: "How big this city is!"
    },
    {
      latin: "eō",
      forms: "īre, iī, itum",
      pos: "verb (irregular)",
      gloss: "go",
      example: "Ad forum eō; Paulla quoque it.",
      exampleGloss: "I am going to the forum; Paulla is going too."
    },
    {
      latin: "redeō",
      forms: "redīre, rediī, reditum",
      pos: "verb (irregular)",
      gloss: "go back, return",
      example: "Familia ad caupōnam redit.",
      exampleGloss: "The family returns to the inn."
    },
    {
      latin: "nesciō",
      forms: "nescīre, nescīvī, nescītum",
      pos: "verb (4th conj.)",
      gloss: "not know",
      example: "Viam nesciō, sed interrogāre possum.",
      exampleGloss: "I do not know the way, but I can ask."
    },
    {
      latin: "interrogō",
      forms: "interrogāre, interrogāvī, interrogātum",
      pos: "verb (1st conj.)",
      gloss: "question, ask",
      example: "Puer mercātōrem interrogat.",
      exampleGloss: "The boy questions the merchant."
    },
    {
      latin: "timeō",
      forms: "timēre, timuī",
      pos: "verb (2nd conj.)",
      gloss: "fear, be afraid",
      example: "Quīntus turbam magnam timet.",
      exampleGloss: "Quintus is afraid of the big crowd."
    },
    {
      latin: "dexter",
      forms: "dextra, dextrum",
      pos: "adjective (1st/2nd decl.)",
      gloss: "right, on the right",
      example: "Templum ad dextram est.",
      exampleGloss: "The temple is on the right."
    },
    {
      latin: "sinister",
      forms: "sinistra, sinistrum",
      pos: "adjective (1st/2nd decl.)",
      gloss: "left, on the left",
      example: "Taberna ad sinistram stat.",
      exampleGloss: "The shop stands on the left."
    },
    {
      latin: "rēctā",
      forms: "(indēcl.; from «rēctā viā»)",
      pos: "adverb",
      gloss: "straight ahead",
      example: "Ī rēctā ad portam!",
      exampleGloss: "Go straight ahead to the gate!"
    },
    {
      latin: "domum",
      forms: "(acc. of domus)",
      pos: "adverb (acc. of direction)",
      gloss: "home, homeward",
      example: "Fessī sumus: domum īmus.",
      exampleGloss: "We are tired: we are going home."
    },
    {
      latin: "longē",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "far, far away",
      example: "Ostia nōn longē ab urbe est.",
      exampleGloss: "Ostia is not far from the city."
    },
    {
      latin: "auxilium",
      forms: "auxiliī, n.",
      pos: "noun (2nd decl.)",
      gloss: "help, aid",
      example: "Puer perterritus auxilium petit.",
      exampleGloss: "The terrified boy seeks help."
    },
    {
      latin: "vīcus",
      forms: "vīcī, m.",
      pos: "noun (2nd decl.)",
      gloss: "street, neighborhood",
      example: "In hōc vīcō tabernae multae sunt.",
      exampleGloss: "In this street there are many shops."
    },
    {
      latin: "viātor",
      forms: "viātōris, m.",
      pos: "noun (3rd decl.)",
      gloss: "traveler, passer-by",
      example: "Viātor viam bene scit.",
      exampleGloss: "The traveler knows the way well."
    },
    {
      latin: "perterritus",
      forms: "perterrita, perterritum",
      pos: "adjective (1st/2nd decl.)",
      gloss: "terrified",
      example: "Puella perterrita clāmat.",
      exampleGloss: "The terrified girl shouts."
    },
    {
      latin: "salvus",
      forms: "salva, salvum",
      pos: "adjective (1st/2nd decl.)",
      gloss: "safe",
      example: "Salvusne es? Ita, salvus sum!",
      exampleGloss: "Are you safe? Yes, I am safe!"
    },
    {
      latin: "age",
      forms: "(interj.; pl. agite)",
      pos: "interjection",
      gloss: "come on! well then!",
      example: "Age, Quīnte, domum īmus!",
      exampleGloss: "Come on, Quintus, we are going home!"
    }
  ],

  readings: [
    {
      title: "Ubi est familia mea?",
      intro: "One beautiful statue too many: Quintus stops to look, and the family walks on without him.",
      paragraphs: [
        "Hodiē familia Fabia per viās urbis ambulat; ubīque turba magna est. Quīntus statuam pulchram spectat et stat. Familia autem nōn stat, sed ambulat. Subitō puer circumspectat: «Ubi est pater? Ubi est māter? Ubi es, Paulla?» Nēmō respondet. Familia iam longē est: Quīntus sōlus in mediā urbe stat.",
        "Quīntus perterritus est. «Quid faciō? Quō eō? Viam ad caupōnam nesciō. Quanta est haec urbs!» Puer timet. Tandem clāmat: «Age, Quīnte! Puerī Rōmānī nōn lacrimant. Viātōrēs interrogāre possum.»",
        "Puer ad tabernam it; ibi mercātor māla vēndit. «Dīc mihi,» inquit Quīntus, «ubi est caupōna prope forum?» Mercātor respondet: «Nesciō. Caupōnae enim multae in hāc urbe sunt. Quis es, puer? Unde venīs?» «Quīntus sum; Ostiā venīmus. Sed quōmodo domum eō? Familiam meam nusquam videō!»"
      ],
      glosses: {
        "hodiē": "today",
        "familia": "the family",
        "fabia": "Fabian — the family’s name (agreeing with «familia»)",
        "per": "through, along (+ acc.)",
        "viās": "streets (acc. pl. after «per»)",
        "urbis": "of the city (gen.)",
        "ambulat": "(it) walks — the family walks",
        "ubīque": "everywhere",
        "turba": "crowd",
        "magna": "big, great",
        "est": "is",
        "quīntus": "Quintus, the son, 12 years old",
        "statuam": "statue (acc. — object)",
        "pulchram": "beautiful (with «statuam»)",
        "spectat": "(he) looks at, watches",
        "et": "and",
        "stat": "(he) stands, stands still",
        "autem": "however (second word)",
        "nōn": "not",
        "sed": "but",
        "subitō": "suddenly",
        "puer": "the boy; (in address) boy!",
        "circumspectat": "(he) looks around («circum» + «spectat»)",
        "ubi": "where?",
        "pater": "father",
        "māter": "mother",
        "es": "(you) are",
        "paulla": "Paulla, the sister, 8 years old",
        "nēmō": "no one",
        "respondet": "(he/she) answers",
        "iam": "already, by now",
        "longē": "far away",
        "sōlus": "alone",
        "in": "in (+ abl.)",
        "mediā": "the middle of (with «urbe»)",
        "urbe": "city (abl. after «in»)",
        "perterritus": "terrified",
        "quid": "what?",
        "faciō": "(I) do — ‘what do I do?’",
        "quō": "where to?",
        "eō": "(I) go",
        "viam": "the way, road (acc.)",
        "ad": "to, toward (+ acc.)",
        "caupōnam": "the inn (acc.) — where the family is staying in Rome",
        "nesciō": "(I) do not know",
        "quanta": "how big! (with «urbs»)",
        "haec": "this (fem., with «urbs»)",
        "urbs": "city",
        "timet": "(he) is afraid",
        "tandem": "at last",
        "clāmat": "(he) shouts",
        "age": "come on! (a fossilized command)",
        "quīnte": "Quintus! (vocative — he is talking to himself)",
        "puerī": "boys",
        "rōmānī": "Roman (with «puerī»)",
        "lacrimant": "(they) cry",
        "viātōrēs": "travelers, passers-by (acc. pl. — object)",
        "interrogāre": "to question (infinitive after «possum»)",
        "possum": "(I) can, am able",
        "tabernam": "shop, stall (acc. after «ad»)",
        "it": "(he) goes",
        "ibi": "there",
        "mercātor": "a merchant",
        "māla": "apples (acc. pl.)",
        "vēndit": "(he) sells",
        "dīc": "say! tell! (imperative of «dīcere»)",
        "mihi": "to me (a form of «ego»)",
        "inquit": "says (with quoted speech)",
        "caupōna": "inn",
        "prope": "near (+ acc.)",
        "forum": "the forum (acc. after «prope») — the great public square",
        "caupōnae": "inns",
        "enim": "for, you see (second word — gives the reason)",
        "multae": "many",
        "hāc": "this (abl., with «urbe»)",
        "sunt": "(there) are",
        "quis": "who?",
        "unde": "from where?",
        "venīs": "(you) come",
        "sum": "(I) am",
        "ostiā": "from Ostia (with town names Latin drops the ‘from’ preposition)",
        "venīmus": "(we) come, have come",
        "quōmodo": "how?",
        "domum": "home, homeward (special accusative — no preposition needed)",
        "familiam": "family (acc. — object)",
        "meam": "my (with «familiam»)",
        "nusquam": "nowhere",
        "videō": "(I) see"
      },
      translation: [
        "Today the Fabian family is walking through the streets of the city; everywhere there is a great crowd. Quintus looks at a beautiful statue and stands still. The family, however, does not stand still, but walks on. Suddenly the boy looks around: ‘Where is father? Where is mother? Where are you, Paulla?’ No one answers. The family is already far away: Quintus stands alone in the middle of the city.",
        "Quintus is terrified. ‘What do I do? Where do I go? I don’t know the way to the inn. How big this city is!’ The boy is afraid. At last he shouts: ‘Come on, Quintus! Roman boys don’t cry. I can question the passers-by.’",
        "The boy goes to a shop; there a merchant is selling apples. ‘Tell me,’ says Quintus, ‘where is the inn near the forum?’ The merchant answers: ‘I don’t know. There are many inns in this city, you see. Who are you, boy? Where do you come from?’ ‘I am Quintus; we have come from Ostia. But how do I get home? I see my family nowhere!’"
      ],
      questions: [
        {
          q: "How does Quintus come to be separated from his family?",
          options: [
            "He stops to look at a statue while the family walks on",
            "Ferox drags him away through the crowd",
            "He runs ahead to the harbor",
            "He falls asleep in the forum"
          ],
          answer: 0,
          explain: "«Quīntus statuam pulchram spectat et stat. Familia autem nōn stat, sed ambulat» — he stands still, they keep walking."
        },
        {
          q: "In «Quō eō?», what exactly is Quintus asking himself?",
          options: [
            "‘Where am I (standing)?’",
            "‘Where do I go (to)?’",
            "‘Where do I come from?’",
            "‘When do I leave?’"
          ],
          answer: 1,
          explain: "«quō» asks about the destination — where TO. Place where is «ubi», place from which is «unde»."
        },
        {
          q: "What answer does the apple merchant give?",
          options: [
            "Exact directions to the inn",
            "He does not know — there are many inns in the city",
            "That Quintus should sail back to Ostia",
            "That the inn burned down"
          ],
          answer: 1,
          explain: "«Nesciō. Caupōnae enim multae in hāc urbe sunt» — no luck: too many inns to guess."
        },
        {
          q: "Quintus tells himself «Age, Quīnte!». Why «Quīnte» and not «Quīntus»?",
          options: [
            "It is the vocative — the calling form of names in ‑us",
            "It is the accusative — Quintus is the object",
            "It is a spelling mistake",
            "It is the plural form"
          ],
          answer: 0,
          explain: "2nd-declension names in ‑us take ‑e when addressed: Quīntus → Quīnte. He is giving himself a pep talk."
        }
      ]
    },
    {
      title: "Ī rēctā, deinde ad dextram",
      intro: "A kind traveler gives directions, the streets tangle them up — and the best nose in the family gets to work.",
      paragraphs: [
        "Tum viātor appropinquat. «Quid quaeris, puer? Cūr perterritus es?» Quīntus fābulam suam nārrat: «Auxilium petō. Quōmodo domum redīre possum?» «Age,» inquit viātor, «caupōnam illam sciō. Audī: ī rēctā per hunc vīcum, deinde ad dextram. Tum per viam longam ambulā et ad sinistram ī: ibi forum est. Properā!»",
        "Quīntus per vīcum currit — sed vīcī multī sunt, et puer mox errat. «Quōmodo viam inveniō? Ad dextram eō an ad sinistram?» Fēminam interrogat; fēmina respondet: «Rēctā ī, puer: mox forum vidēs.»",
        "Intereā familia Quīntum quaerit. «Quīnte! Quīnte!» clāmat Līvia. «Ubi es, fīlī mī?» Nēmō respondet. Subitō Ferōx lātrat et per turbam currit. «Ecce!» clāmat Paulla. «Canis noster viam scit! Age, currite!» Ferōx currit; familia quoque currit.",
        "Prope forum Ferōx Quīntum invenit. «Ferōx! Bone canis!» clāmat puer. Mox tōta familia ibi est. Līvia fīlium tenet: «Quīnte! Salvusne es?» «Salvus sum, māter. Nōn lacrimāvī: viātōrēs interrogāvī!» «Bene fēcistī,» inquit Mārcus. «Age, domum īmus! Et tū, bone canis, botulum accipis.» «Age!» clāmat Paulla. «Quandō cēnāmus?» Laeta familia ad caupōnam redit; Ferōx laetus botulum suum portat."
      ],
      glosses: {
        "tum": "then",
        "viātor": "a traveler, passer-by",
        "appropinquat": "(he) approaches, comes up",
        "quid": "what?",
        "quaeris": "(you) are looking for",
        "puer": "boy (here vocative — ‘boy!’); the boy",
        "cūr": "why?",
        "perterritus": "terrified",
        "es": "(you) are",
        "quīntus": "Quintus, the son",
        "fābulam": "story (acc.)",
        "suam": "his own (with «fābulam»)",
        "nārrat": "(he) tells",
        "auxilium": "help (acc. — object of «petō»)",
        "petō": "(I) seek, ask for",
        "quōmodo": "how?",
        "domum": "home(ward) — special accusative, no preposition needed",
        "redīre": "to return, get back (infinitive after «possum»)",
        "possum": "(I) can, am able",
        "age": "come on! well then!",
        "inquit": "says (with quoted speech)",
        "caupōnam": "the inn (acc.)",
        "illam": "that (acc., with «caupōnam»)",
        "sciō": "(I) know",
        "audī": "listen! (imperative of «audīre»)",
        "ī": "go! (imperative of «īre» — the shortest command in Latin)",
        "rēctā": "straight ahead",
        "per": "through, along (+ acc.)",
        "hunc": "this (acc., with «vīcum»)",
        "vīcum": "street (acc. after «per»)",
        "deinde": "then, next",
        "ad": "to, toward (+ acc.); «ad dextram / ad sinistram» = to the right / left",
        "dextram": "the right(-hand side) — «ad dextram» = to the right",
        "viam": "street, way (acc.)",
        "longam": "long (with «viam»)",
        "ambulā": "walk! (imperative of «ambulāre»)",
        "et": "and",
        "sinistram": "the left(-hand side) — «ad sinistram» = to the left",
        "ibi": "there",
        "forum": "the forum, the great public square (same form as subject and as object)",
        "est": "is",
        "properā": "hurry! (imperative of «properāre»)",
        "currit": "(he) runs",
        "sed": "but",
        "vīcī": "streets",
        "multī": "many",
        "sunt": "(there) are",
        "mox": "soon",
        "errat": "(he) wanders, goes astray",
        "inveniō": "(I) find",
        "eō": "(I) go",
        "an": "or (between two choices in a question)",
        "fēminam": "a woman (acc. — object)",
        "interrogat": "(he) questions",
        "fēmina": "the woman",
        "respondet": "(she) answers",
        "vidēs": "(you) see",
        "intereā": "meanwhile",
        "familia": "the family",
        "quīntum": "Quintus (acc. — object)",
        "quaerit": "(it) searches for — the family searches",
        "quīnte": "Quintus! (vocative)",
        "clāmat": "(she/he) shouts",
        "līvia": "Livia, the mother",
        "ubi": "where?",
        "fīlī": "son! (vocative of «fīlius»)",
        "mī": "my! (vocative of «meus» — «fīlī mī», my son!)",
        "nēmō": "no one",
        "subitō": "suddenly",
        "ferōx": "Ferox, the family dog — a menace, but a useful one",
        "lātrat": "(he) barks",
        "turbam": "crowd (acc. after «per»)",
        "ecce": "look!",
        "paulla": "Paulla, the daughter, 8 years old",
        "canis": "dog; (in address) dog!",
        "noster": "our (with «canis»)",
        "scit": "(he) knows",
        "currite": "run! (imperative — to more than one person)",
        "quoque": "also, too",
        "prope": "near (+ acc.)",
        "invenit": "(he) finds",
        "bone": "good (vocative of «bonus» — ‘good dog!’)",
        "tōta": "the whole (with «familia»)",
        "fīlium": "son (acc. — object)",
        "tenet": "(she) holds, hugs",
        "salvusne": "safe…? («salvus» + question ‑ne — ‘are you safe?’)",
        "salvus": "safe",
        "sum": "(I) am",
        "māter": "mother",
        "nōn": "not",
        "lacrimāvī": "(I) cried (perfect)",
        "viātōrēs": "passers-by (acc. pl. — object)",
        "interrogāvī": "(I) questioned (perfect)",
        "bene": "well",
        "fēcistī": "(you) did (perfect of «faciō» — ‘well done!’)",
        "mārcus": "Marcus, the father",
        "īmus": "(we) go",
        "tū": "you (emphatic)",
        "botulum": "a sausage (acc.)",
        "accipis": "(you) receive, get",
        "quandō": "when?",
        "cēnāmus": "(we) have dinner («cēnāre», to dine)",
        "laeta": "happy (with «familia»)",
        "redit": "(it) returns — the family returns",
        "laetus": "happy (with «Ferōx»)",
        "suum": "his own (with «botulum» — earned, not stolen!)",
        "portat": "(he) carries"
      },
      translation: [
        "Then a traveler comes up. ‘What are you looking for, boy? Why are you terrified?’ Quintus tells his story: ‘I’m asking for help. How can I get back home?’ ‘Well then,’ says the traveler, ‘I know that inn. Listen: go straight along this street, then to the right. Then walk along a long street and go to the left: the forum is there. Hurry!’",
        "Quintus runs along the street — but there are many streets, and the boy soon goes astray. ‘How do I find the way? Do I go to the right or to the left?’ He questions a woman; the woman answers: ‘Go straight ahead, boy: soon you’ll see the forum.’",
        "Meanwhile the family is searching for Quintus. ‘Quintus! Quintus!’ shouts Livia. ‘Where are you, my son?’ No one answers. Suddenly Ferox barks and runs through the crowd. ‘Look!’ shouts Paulla. ‘Our dog knows the way! Come on, run!’ Ferox runs; the family runs too.",
        "Near the forum Ferox finds Quintus. ‘Ferox! Good dog!’ shouts the boy. Soon the whole family is there. Livia hugs her son: ‘Quintus! Are you safe?’ ‘I am safe, mother. I didn’t cry: I questioned the passers-by!’ ‘Well done,’ says Marcus. ‘Come on, we’re going home! And you, good dog, get a sausage.’ ‘Come on!’ shouts Paulla. ‘When do we eat?’ Happily the family returns to the inn; Ferox, delighted, carries his very own sausage."
      ],
      questions: [
        {
          q: "What directions does the traveler give Quintus?",
          options: [
            "Straight along the street, then right, then along a long street, and finally left",
            "Left at the temple, then right at the harbor",
            "Across the river and past the amphitheater",
            "Wait by the statue until the family returns"
          ],
          answer: 0,
          explain: "«ī rēctā per hunc vīcum, deinde ad dextram. Tum per viam longam ambulā et ad sinistram ī» — straight, right, long street, left."
        },
        {
          q: "In «Audī!», «ambulā!», and «properā!», what is the traveler doing grammatically?",
          options: [
            "Asking questions",
            "Giving commands — these are singular imperatives",
            "Describing what he did yesterday",
            "Naming the streets of Rome"
          ],
          answer: 1,
          explain: "Each is a bare-stem imperative addressed to one person: listen! walk! hurry! Directions are wall-to-wall commands."
        },
        {
          q: "Who actually finds Quintus in the end?",
          options: [
            "The apple merchant",
            "The kind traveler",
            "Ferox, the family dog",
            "A Roman soldier"
          ],
          answer: 2,
          explain: "«Prope forum Ferōx Quīntum invenit» — the dog’s nose beats everyone’s directions."
        },
        {
          q: "How is Ferox rewarded?",
          options: [
            "He is scolded for barking at the crowd",
            "He receives a sausage — honestly earned, for once",
            "He gets nothing at all",
            "He is made to carry the family’s luggage"
          ],
          answer: 1,
          explain: "«Et tū, bone canis, botulum accipis» — and note «botulum suum»: his OWN sausage, earned this time instead of stolen."
        }
      ]
    }
  ],

  quiz: [
    {
      prompt: "Which question word asks ‘where to?’",
      options: ["ubi", "quō", "unde", "quandō"],
      answer: 1,
      explain: "«ubi» = where (at), «quō» = where to, «unde» = where from, «quandō» = when. Three different wheres — Latin keeps them apart."
    },
    {
      prompt: "«Unde venīs?» asks…",
      options: [
        "‘Where are you going?’",
        "‘Where do you come from?’",
        "‘Why are you coming?’",
        "‘When are you coming?’"
      ],
      answer: 1,
      explain: "«unde» asks about the starting point: from where? For the destination you would hear «quō»."
    },
    {
      prompt: "In «Ī rēctā, deinde ad sinistram!», what is «ī»?",
      options: [
        "The pronoun ‘he’",
        "The imperative of «īre» — ‘go!’",
        "The verb form ‘he goes’",
        "A question word"
      ],
      answer: 1,
      explain: "«ī!» is the one-letter command of «īre»: go! (‘He goes’ would be «it».) Possibly the shortest complete sentence in Latin."
    },
    {
      prompt: "A friend shouts «Quīnte, venī!». Why «Quīnte» and not «Quīntus»?",
      options: [
        "It is the vocative — the calling form for names in ‑us",
        "It is the accusative — Quintus is the object",
        "It is the genitive — ‘of Quintus’",
        "It is an affectionate nickname"
      ],
      answer: 0,
      explain: "2nd-declension names in ‑us switch to ‑e when someone is addressed: Quīntus → Quīnte! Everything else in the shout — «venī!» — is an imperative."
    },
    {
      prompt: "«Currite, puerī!» is addressed to…",
      options: [
        "one boy",
        "more than one boy — the ‑te ending marks the plural imperative",
        "nobody — it is a plain statement",
        "one girl"
      ],
      answer: 1,
      explain: "Singular «curre!» orders one person; «currite!» orders several. The vocative «puerī» (boys!) confirms the crowd."
    },
    {
      prompt: "What does «nesciō» mean in «Viam nesciō»?",
      options: [
        "‘I know the way well’",
        "‘I do not know the way’",
        "‘I am asking the way’",
        "‘I am showing the way’"
      ],
      answer: 1,
      explain: "«nesciō» is «ne» + «sciō» — the built-in opposite of knowing: I do NOT know."
    },
    {
      prompt: "In «Domum eō», why is there no Latin word for ‘to’?",
      options: [
        "Latin never expresses ‘to’",
        "«domum» is a special accusative of direction — ‘homeward’ needs no preposition",
        "The preposition was dropped by a careless scribe",
        "«domum» is nominative, so none is needed"
      ],
      answer: 1,
      explain: "With «domum» (and with town names), Latin drops the preposition: «domum eō» = I am going (to) home."
    },
    {
      prompt: "«Quanta est haec urbs!» means…",
      options: [
        "‘How big this city is!’",
        "‘How many cities there are!’",
        "‘Where is this city?’",
        "‘This city is small.’"
      ],
      answer: 0,
      explain: "«quantus, ‑a, ‑um» asks (or exclaims) about size; «quanta» agrees with «urbs» — how big this city is!"
    }
  ]
});
