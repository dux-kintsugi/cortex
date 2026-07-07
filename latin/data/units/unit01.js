registerUnit({
  id: 1,
  stage: 1,
  title: "Salvē!",
  tagline: "Meet the family: sentences with «est» and «sunt»",

  grammar: [
    {
      heading: "Sound it out: five rules and you’re fluent(-ish)",
      body: "<p>Latin spelling is gloriously honest: every letter is pronounced, the same way, every time. No silent letters, no surprises. Learn a handful of sounds now and you can pronounce everything in this course out loud — which you should, always.</p><p>The little bars over some vowels (<span class=\"la\">ā ē ī ō ū</span>) are called <strong>macrons</strong>. They mark <em>long</em> vowels: you literally hold the sound longer. <span class=\"la\">māter</span> is <em>MAH-ter</em>, not <em>matter</em>. The Romans didn’t write macrons, but learners’ texts do, because length can tell two words apart — so learn each word <em>with</em> its macrons.</p><p>Stress is friendly too: in a two-syllable word, stress the first syllable — <span class=\"la\">PA-ter</span>, <span class=\"la\">CA-nis</span>, <span class=\"la\">MĀ-ter</span>.</p>",
      table: {
        caption: "The sounds that trip up English speakers",
        headers: ["Letter(s)", "Sound", "Hear it in"],
        rows: [
          ["c", "always hard, as in «cat» — never soft as in «city»", "canis → KAH-nis"],
          ["g", "always hard, as in «get»", "magnus → MAHG-nus"],
          ["v", "like English w", "vir → weer"],
          ["ae", "like the y in «sky»", "laetus → LYE-tus"],
          ["ā ē ī ō ū", "long vowels — hold them longer", "māter, fīlia, Ferōx"]
        ]
      },
      tip: "Read every Latin sentence in this course out loud. Your ears will learn endings faster than your eyes."
    },
    {
      heading: "No «a», no «the» — Latin travels light",
      body: "<p>Latin has no articles: there is no word for <em>a</em> and no word for <em>the</em>. <span class=\"la\">puella</span> is <em>girl</em>, <em>a girl</em>, or <em>the girl</em> — the story decides which fits. So <span class=\"la\">Ferōx canis est</span> can be <em>Ferox is a dog</em> or, if we already know him (we soon will), <em>Ferox is the dog</em>.</p><p>This feels like something is missing. It isn’t. When you read, supply <em>a</em> or <em>the</em> from context and move on — the Romans managed without them for about a thousand years.</p>",
      tip: "When you meet a bare noun like «familia», don’t agonize over «a family or THE family?» — the Latin doesn’t care, and the story will tell you."
    },
    {
      heading: "«est» and «sunt»: the two little verbs that run this unit",
      body: "<p>Nearly every sentence in Unit 1 is built on one pattern: <strong>somebody <span class=\"la\">est</span> something</strong>. <span class=\"la\">est</span> means <em>is</em>; <span class=\"la\">sunt</span> means <em>are</em>. One person or thing → <span class=\"la\">est</span>; two or more → <span class=\"la\">sunt</span>. So: <span class=\"la\">Mārcus laetus est</span>, but <span class=\"la\">Mārcus et Līvia laetī sunt</span>.</p><p>The person or thing the sentence is about — the <strong>subject</strong> — appears in its plain dictionary form, called the <strong>nominative</strong>. In <span class=\"la\">Līvia māter est</span>, <span class=\"la\">Līvia</span> is the subject and <span class=\"la\">māter</span> completes the thought: <em>Livia is the mother</em>.</p><p>Word order is flexible. <span class=\"la\">est</span> is fond of the end of the sentence, but it wanders: <span class=\"la\">Ostia magna est</span> and <span class=\"la\">Magna est Ostia</span> both mean <em>Ostia is big</em>. Don’t read left-to-right expecting English order — find the pieces, then assemble the thought.</p><p>One more trick: <span class=\"la\">est</span> on its own can mean <em>there is</em>, and <span class=\"la\">nōn est</span> <em>there is no…</em>. When Ferox looks very pleased and <span class=\"la\">cēna nōn est</span>, there is no dinner. Draw your own conclusions.</p>",
      table: {
        caption: "The Unit 1 sentence machine",
        headers: ["Latin", "English", "Why"],
        rows: [
          ["Mārcus pater est.", "Marcus is the father.", "one subject → est"],
          ["Quīntus et Paulla laetī sunt.", "Quintus and Paulla are happy.", "two subjects joined by et → sunt"],
          ["Domus parva est.", "The house is small.", "an adjective after est describes the subject"],
          ["Cēna nōn est!", "There is no dinner!", "est = «there is»; nōn est = «there is no…»"]
        ]
      },
      tip: "When you see «est» or «sunt», ask two questions: who or what is the subject, and what is being said about it? That’s the whole sentence."
    },
    {
      heading: "«nōn», «et», and friends: small words, heavy lifting",
      body: "<p><span class=\"la\">nōn</span> means <em>not</em> and stands right in front of the thing it denies: <span class=\"la\">Ferōx bonus nōn est</span> — <em>Ferox is not good</em>. It can also deny a single word, setting up a contrast: <span class=\"la\">Vir nōn Mārcus est: Titus est!</span> — <em>the man is not Marcus: it’s Titus!</em></p><p><span class=\"la\">et</span> means <em>and</em>; it glues together words (<span class=\"la\">pater et māter</span>) or whole sentences. <span class=\"la\">sed</span> is <em>but</em>, the pivot word: <span class=\"la\">Domus parva est, sed bona est</span>. And <span class=\"la\">quoque</span> means <em>too</em> — it stands right <em>after</em> the word it spotlights: <span class=\"la\">Ferōx quoque laetus est</span>, <em>Ferox too is happy</em>.</p>",
      tip: "Position is meaning: «nōn» points forward at what it denies; «quoque» points backward at what it includes. Watch where the small words stand."
    }
  ],

  vocab: [
    {
      latin: "salvē",
      forms: "salvēte (to more than one person)",
      pos: "interjection",
      gloss: "hello!",
      example: "«Salvē, Līvia!» inquit Titus.",
      exampleGloss: "«Hello, Livia!» says Titus."
    },
    {
      latin: "familia",
      forms: "gen. familiae, f.",
      pos: "noun",
      gloss: "family, household",
      example: "Familia laeta est.",
      exampleGloss: "The family is happy."
    },
    {
      latin: "pater",
      forms: "gen. patris, m.",
      pos: "noun",
      gloss: "father",
      example: "Mārcus pater est.",
      exampleGloss: "Marcus is the father."
    },
    {
      latin: "māter",
      forms: "gen. mātris, f.",
      pos: "noun",
      gloss: "mother",
      example: "Līvia māter est.",
      exampleGloss: "Livia is the mother."
    },
    {
      latin: "fīlius",
      forms: "gen. fīliī, m.",
      pos: "noun",
      gloss: "son",
      example: "Quīntus fīlius est.",
      exampleGloss: "Quintus is the son."
    },
    {
      latin: "fīlia",
      forms: "gen. fīliae, f.",
      pos: "noun",
      gloss: "daughter",
      example: "Paulla fīlia est.",
      exampleGloss: "Paulla is the daughter."
    },
    {
      latin: "puer",
      forms: "gen. puerī, m.",
      pos: "noun",
      gloss: "boy",
      example: "Quīntus puer est, nōn vir.",
      exampleGloss: "Quintus is a boy, not a man."
    },
    {
      latin: "puella",
      forms: "gen. puellae, f.",
      pos: "noun",
      gloss: "girl",
      example: "Paulla puella parva est.",
      exampleGloss: "Paulla is a small girl."
    },
    {
      latin: "vir",
      forms: "gen. virī, m.",
      pos: "noun",
      gloss: "man",
      example: "Mārcus vir bonus est.",
      exampleGloss: "Marcus is a good man."
    },
    {
      latin: "fēmina",
      forms: "gen. fēminae, f.",
      pos: "noun",
      gloss: "woman",
      example: "Līvia fēmina bona est.",
      exampleGloss: "Livia is a good woman."
    },
    {
      latin: "frāter",
      forms: "gen. frātris, m.",
      pos: "noun",
      gloss: "brother",
      example: "Quīntus frāter est.",
      exampleGloss: "Quintus is the brother."
    },
    {
      latin: "soror",
      forms: "gen. sorōris, f.",
      pos: "noun",
      gloss: "sister",
      example: "Paulla soror est.",
      exampleGloss: "Paulla is the sister."
    },
    {
      latin: "avunculus",
      forms: "gen. avunculī, m.",
      pos: "noun",
      gloss: "uncle (mother’s brother)",
      example: "Titus avunculus est.",
      exampleGloss: "Titus is the uncle."
    },
    {
      latin: "canis",
      forms: "gen. canis, m./f.",
      pos: "noun",
      gloss: "dog",
      example: "Ferōx canis est.",
      exampleGloss: "Ferox is a dog."
    },
    {
      latin: "domus",
      forms: "gen. domūs, f.",
      pos: "noun",
      gloss: "house, home",
      example: "Domus parva, sed bona est.",
      exampleGloss: "The house is small, but good."
    },
    {
      latin: "est",
      forms: "from «sum, esse», to be — est: one thing, sunt: more than one",
      pos: "verb",
      gloss: "is, there is",
      example: "Ostia magna est.",
      exampleGloss: "Ostia is big."
    },
    {
      latin: "sunt",
      forms: "from «sum, esse», to be — sunt: more than one, est: one thing",
      pos: "verb",
      gloss: "are, there are",
      example: "Mārcus et Līvia laetī sunt.",
      exampleGloss: "Marcus and Livia are happy."
    },
    {
      latin: "nōn",
      forms: "(never changes shape)",
      pos: "adverb",
      gloss: "not",
      example: "Ferōx canis bonus nōn est.",
      exampleGloss: "Ferox is not a good dog."
    },
    {
      latin: "et",
      forms: "(never changes shape)",
      pos: "conjunction",
      gloss: "and",
      example: "Pater et māter laetī sunt.",
      exampleGloss: "Father and mother are happy."
    },
    {
      latin: "sed",
      forms: "(never changes shape)",
      pos: "conjunction",
      gloss: "but",
      example: "Puer parvus est, sed bonus.",
      exampleGloss: "The boy is small, but good."
    },
    {
      latin: "quoque",
      forms: "(never changes shape; follows the word it stresses)",
      pos: "adverb",
      gloss: "also, too",
      example: "Ferōx quoque laetus est.",
      exampleGloss: "Ferox too is happy."
    },
    {
      latin: "laetus",
      forms: "laeta, laetum",
      pos: "adjective",
      gloss: "happy, glad",
      example: "Puella laeta est.",
      exampleGloss: "The girl is happy."
    },
    {
      latin: "bonus",
      forms: "bona, bonum",
      pos: "adjective",
      gloss: "good",
      example: "Titus avunculus bonus est.",
      exampleGloss: "Titus is a good uncle."
    },
    {
      latin: "magnus",
      forms: "magna, magnum",
      pos: "adjective",
      gloss: "big, great",
      example: "Familia magna est.",
      exampleGloss: "The family is big."
    },
    {
      latin: "parvus",
      forms: "parva, parvum",
      pos: "adjective",
      gloss: "small, little",
      example: "Domus parva est.",
      exampleGloss: "The house is small."
    }
  ],

  readings: [
    {
      title: "Familia Fabia",
      intro: "Meet the Fabius family of Ostia — father, mother, two children, and one dog with an agenda.",
      paragraphs: [
        "Salvē! Ecce familia Fabia. Familia in Ostiā est. Magna familia est: pater, māter, fīlius, fīlia — et canis!",
        "Mārcus pater est. Mārcus vir bonus est. Līvia māter est. Līvia fēmina bona est. Mārcus et Līvia laetī sunt.",
        "Quīntus fīlius est. Quīntus puer bonus est. Paulla fīlia est. Paulla puella parva est, sed nōn timida! Quīntus et Paulla frāter et soror sunt.",
        "Ecce canis! Canis Ferōx est. Ferōx canis bonus nōn est — sed laetus est! Familia laeta est, et Ferōx quoque laetus est."
      ],
      glosses: {
        "salvē": "hello!",
        "ecce": "look! here is… (points at what comes next)",
        "familia": "family, household",
        "fabia": "Fabian — the family’s name (the family of the Fabiī)",
        "in": "in (take «in Ostiā» together as one chunk: in Ostia)",
        "ostiā": "Ostia, the port town of Rome (the form used after «in»)",
        "est": "is; (on its own) there is",
        "magna": "big, great",
        "pater": "father",
        "māter": "mother",
        "fīlius": "son",
        "fīlia": "daughter",
        "et": "and",
        "canis": "dog",
        "mārcus": "Marcus, the father — a grain merchant",
        "vir": "man",
        "bonus": "good",
        "līvia": "Livia, the mother",
        "fēmina": "woman",
        "bona": "good (matching a feminine word)",
        "laetī": "happy (plural — describing more than one person)",
        "sunt": "(they) are",
        "quīntus": "Quintus, the son (twelve years old)",
        "puer": "boy",
        "paulla": "Paulla, the daughter (eight years old)",
        "puella": "girl",
        "parva": "small, little",
        "sed": "but",
        "nōn": "not",
        "timida": "timid, easily scared",
        "frāter": "brother",
        "soror": "sister",
        "ferōx": "Ferox, the dog (his name means «fierce»!)",
        "laetus": "happy, glad",
        "laeta": "happy (matching a feminine word)",
        "quoque": "also, too"
      },
      translation: [
        "Hello! Here is the Fabius family. The family is in Ostia. It is a big family: a father, a mother, a son, a daughter — and a dog!",
        "Marcus is the father. Marcus is a good man. Livia is the mother. Livia is a good woman. Marcus and Livia are happy.",
        "Quintus is the son. Quintus is a good boy. Paulla is the daughter. Paulla is a small girl, but not a timid one! Quintus and Paulla are brother and sister.",
        "Look at the dog! The dog is Ferox. Ferox is not a good dog — but he is a happy one! The family is happy, and Ferox is happy too."
      ],
      questions: [
        {
          q: "Who is the mother of the family?",
          options: ["Paulla", "Līvia", "Ostia", "Fabia"],
          answer: 1,
          explain: "«Līvia māter est» — Livia is the mother. Ostia is the town, and Fabia is the family’s name."
        },
        {
          q: "What does the passage tell us about Paulla?",
          options: [
            "She is a small girl, but not timid",
            "She is a big girl and very timid",
            "She is Quintus’s mother",
            "She is not happy"
          ],
          answer: 0,
          explain: "«Paulla puella parva est, sed nōn timida!» — small, but fearless."
        },
        {
          q: "In «Mārcus et Līvia laetī sunt», why is the verb «sunt» rather than «est»?",
          options: [
            "The subject is two people, so the verb is plural",
            "Because the sentence is about a man",
            "Because «et» always turns «est» into «sunt», even for one person",
            "Because happiness is always plural in Latin"
          ],
          answer: 0,
          explain: "Two subjects joined by «et» make a plural subject: plural subject → «sunt», and the adjective goes plural too («laetī»)."
        },
        {
          q: "Which of these is TRUE according to the passage?",
          options: [
            "Ferōx is a good dog",
            "Ferōx is not happy",
            "Ferōx is not a good dog, but he is happy",
            "There is no dog in the family"
          ],
          answer: 2,
          explain: "«Ferōx canis bonus nōn est — sed laetus est!» Not good, very happy. Remember this combination; it explains everything later."
        }
      ]
    },
    {
      title: "Domus et Avunculus",
      intro: "A look at the family’s little house — and a surprise visit from Uncle Titus. Ferox, meanwhile, discovers dinner.",
      paragraphs: [
        "Ecce domus! Domus in Ostiā est. Ostia magna est, sed domus magna nōn est: domus parva est. Domus parva, sed bona est.",
        "Ecce vir! Vir nōn Mārcus est: Titus est. Titus avunculus est — Līvia et Titus soror et frāter sunt. «Salvē, Līvia!» inquit Titus. «Salvē, frāter!» inquit Līvia. Titus et Līvia laetī sunt.",
        "Quīntus et Paulla quoque laetī sunt: «Salvē! Salvē!» Titus nauta est — magister nāvis! Quīntus nauta nōn est; puer est. Sed laetus est: avunculus bonus est.",
        "Sed ecce — Ferōx! Ferōx laetus est… et cēna nōn est! «Ō Ferōx!» inquit Līvia. «Canis bonus nōn est! Canis nōn est — bēlua est!»",
        "Sed familia laeta est: pater et māter, fīlius et fīlia, avunculus et canis. Domus parva est, sed familia magna est. Et Ferōx? Ferōx semper Ferōx est."
      ],
      glosses: {
        "ecce": "look! here is…",
        "domus": "house, home",
        "in": "in (take «in Ostiā» together as one chunk: in Ostia)",
        "ostiā": "Ostia (the form used after «in»)",
        "ostia": "Ostia, the port town of Rome",
        "est": "is; (on its own) there is",
        "magna": "big, great",
        "sed": "but",
        "nōn": "not",
        "parva": "small, little",
        "bona": "good (matching a feminine word)",
        "vir": "man",
        "mārcus": "Marcus, the father",
        "titus": "Titus, Livia’s brother — a ship’s captain",
        "avunculus": "uncle (your mother’s brother)",
        "līvia": "Livia, the mother",
        "et": "and",
        "soror": "sister",
        "frāter": "brother (here also used to greet him: «hello, brother!»)",
        "sunt": "(they) are",
        "salvē": "hello!",
        "inquit": "says, said (used with quoted speech)",
        "laetī": "happy (plural — describing more than one person)",
        "quīntus": "Quintus, the son",
        "paulla": "Paulla, the daughter",
        "quoque": "also, too",
        "nauta": "a sailor, a seaman",
        "magister": "master, captain (take «magister nāvis» as one chunk: a ship’s captain)",
        "nāvis": "of a ship (the second half of the chunk «magister nāvis»)",
        "puer": "boy",
        "laetus": "happy, glad",
        "bonus": "good",
        "ferōx": "Ferox, the dog",
        "cēna": "dinner (it was on the table a moment ago…)",
        "ō": "oh! (a cry of dismay)",
        "canis": "dog",
        "bēlua": "a beast, a monster",
        "familia": "family, household",
        "laeta": "happy (matching a feminine word)",
        "pater": "father",
        "māter": "mother",
        "fīlius": "son",
        "fīlia": "daughter",
        "semper": "always"
      },
      translation: [
        "Look at the house! The house is in Ostia. Ostia is big, but the house is not big: the house is small. The house is small, but good.",
        "Look — a man! The man is not Marcus: it is Titus. Titus is the uncle — Livia and Titus are sister and brother. «Hello, Livia!» says Titus. «Hello, brother!» says Livia. Titus and Livia are happy.",
        "Quintus and Paulla are happy too: «Hello! Hello!» Titus is a sailor — a ship’s captain! Quintus is not a sailor; he is a boy. But he is happy: his uncle is a good one.",
        "But look — Ferox! Ferox is happy… and there is no dinner! «Oh, Ferox!» says Livia. «He is not a good dog! He is not a dog at all — he is a monster!»",
        "But the family is happy: father and mother, son and daughter, uncle and dog. The house is small, but the family is big. And Ferox? Ferox is always Ferox."
      ],
      questions: [
        {
          q: "Who is Titus?",
          options: [
            "Līvia’s brother — the children’s uncle, a ship’s captain",
            "Mārcus’s father",
            "A merchant visiting from Rome",
            "Quīntus’s brother"
          ],
          answer: 0,
          explain: "«Titus avunculus est — Līvia et Titus soror et frāter sunt», and he is «magister nāvis», a ship’s captain."
        },
        {
          q: "What do we learn about the house?",
          options: [
            "It is big, like Ostia",
            "It is small but good",
            "It is big but not good",
            "It is not in Ostia"
          ],
          answer: 1,
          explain: "«domus magna nōn est: domus parva est. Domus parva, sed bona est.»"
        },
        {
          q: "«Ferōx laetus est… et cēna nōn est!» What has happened?",
          options: [
            "The dinner does not taste good",
            "There is no dinner any more — and Ferōx looks suspiciously pleased",
            "The family has decided not to eat",
            "Līvia has not cooked because Titus arrived"
          ],
          answer: 1,
          explain: "«est» can mean «there is», so «cēna nōn est» = «there is no dinner». Ferox being «laetus» at that exact moment is not a coincidence."
        },
        {
          q: "The passage says «Titus et Līvia laetī sunt». Why «sunt» and not «est»?",
          options: [
            "The subject is two people, so Latin uses the plural verb",
            "«sunt» is required after proper names",
            "«laetī» turns any sentence into a question",
            "Because the sentence is negative"
          ],
          answer: 0,
          explain: "Two subjects joined by «et» take the plural «sunt»; the adjective matches in the plural: «laetī»."
        }
      ]
    }
  ],

  quiz: [
    {
      prompt: "Latin has no word for «a» or «the». So «Puella laeta est» means…",
      options: [
        "Only «the girl is happy»",
        "Only «a girl is happy»",
        "«The girl is happy» or «A girl is happy» — context decides",
        "«The happy girl» — the sentence has no verb"
      ],
      answer: 2,
      explain: "Latin never marks «a/the»; you supply it from context. And the sentence does have a verb: «est»."
    },
    {
      prompt: "Which sentence needs «sunt», not «est»?",
      options: [
        "Mārcus pater ___",
        "Ostia magna ___",
        "Quīntus et Paulla laetī ___",
        "Ferōx canis ___"
      ],
      answer: 2,
      explain: "«Quīntus et Paulla» is two people — a plural subject takes the plural verb «sunt». The others each have a single subject."
    },
    {
      prompt: "What does «Ferōx canis bonus nōn est» say about Ferox?",
      options: [
        "He is a good dog",
        "He is not a good dog",
        "He is not a dog",
        "There is no dog here"
      ],
      answer: 1,
      explain: "«nōn» denies «bonus … est»: Ferox is certainly a dog — just not a good one."
    },
    {
      prompt: "In «Titus quoque laetus est», the word «quoque» tells you that…",
      options: [
        "Titus is extremely happy",
        "Titus, too, is happy — like the others already mentioned",
        "Only Titus is happy",
        "Titus was happy before, but is not now"
      ],
      answer: 1,
      explain: "«quoque» means «also, too» and stands right after the word it spotlights — here «Titus»."
    },
    {
      prompt: "How do you pronounce the «c» in «canis»?",
      options: [
        "Soft, like the c in «city»",
        "Hard, like the c in «cat» — always",
        "Like the ch in «church»",
        "It is silent"
      ],
      answer: 1,
      explain: "Latin «c» is always hard, everywhere, no exceptions: «canis» sounds like KAH-nis."
    },
    {
      prompt: "What does the macron in «māter» (the bar over the «ā») tell you?",
      options: [
        "Hold the vowel longer",
        "Stress the last syllable",
        "The word is a proper name",
        "The vowel is silent"
      ],
      answer: 0,
      explain: "Macrons mark long vowels — you hold the sound longer. Length can tell words apart, so learn it as part of the word."
    },
    {
      prompt: "In «Līvia māter est», which word is the subject — the person the sentence is about?",
      options: ["Līvia", "māter", "est", "There is no subject"],
      answer: 0,
      explain: "«Līvia» is the subject, in the nominative; «māter» completes the thought after «est»: Livia is the mother."
    },
    {
      prompt: "Ferox looks very pleased with himself, and Livia cries: «Cēna nōn est!» What does she mean?",
      options: [
        "The dinner is not tasty",
        "There is no dinner (any more)",
        "Dinner is not ready yet",
        "The dinner is small"
      ],
      answer: 1,
      explain: "«est» by itself can mean «there is», so «cēna nōn est» = «there is no dinner». Ferox is «laetus» for a reason."
    }
  ]
});
