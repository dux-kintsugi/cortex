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
          ["ā ē ī ō ū", "long vowels — hold them longer", "māter, fīlia, salvē"]
        ]
      },
      tip: "Read every Latin sentence in this course out loud. Your ears will learn endings faster than your eyes."
    },
    {
      heading: "No «a», no «the» — Latin travels light",
      body: "<p>Latin has no articles: there is no word for <em>a</em> and no word for <em>the</em>. <span class=\"la\">puella</span> is <em>girl</em>, <em>a girl</em>, or <em>the girl</em> — the story decides which fits. So <span class=\"la\">Lupo canis est</span> can be <em>Lupo is a dog</em> or, if we already know him (we soon will), <em>Lupo is the dog</em>.</p><p>This feels like something is missing. It isn’t. When you read, supply <em>a</em> or <em>the</em> from context and move on — the Romans managed without them for about a thousand years.</p>",
      tip: "When you meet a bare noun like «familia», don’t agonize over «a family or THE family?» — the Latin doesn’t care, and the story will tell you."
    },
    {
      heading: "«est» and «sunt»: the two little verbs that run this unit",
      body: "<p>Nearly every sentence in Unit 1 is built on one pattern: <strong>somebody <span class=\"la\">est</span> something</strong>. <span class=\"la\">est</span> means <em>is</em>; <span class=\"la\">sunt</span> means <em>are</em>. One person or thing → <span class=\"la\">est</span>; two or more → <span class=\"la\">sunt</span>. So: <span class=\"la\">Mark laetus est</span>, but <span class=\"la\">Mark et Julia laetī sunt</span>.</p><p>The person or thing the sentence is about — the <strong>subject</strong> — appears in its plain dictionary form, called the <strong>nominative</strong>. In <span class=\"la\">Julia māter est</span>, <span class=\"la\">Julia</span> is the subject and <span class=\"la\">māter</span> completes the thought: <em>Julia is the mother</em>. (By the way: our family’s names Mark, Quinn, Ted, and Lupo are foreign names, and Latin leaves foreign names alone — they keep the same shape everywhere, just as Hebrew names do in the Latin Bible. Julia and Paula, though, are good Latin names and will take Latin endings.)</p><p>Word order is flexible. <span class=\"la\">est</span> is fond of the end of the sentence, but it wanders: <span class=\"la\">Ostia magna est</span> and <span class=\"la\">Magna est Ostia</span> both mean <em>Ostia is big</em>. Don’t read left-to-right expecting English order — find the pieces, then assemble the thought.</p><p>One more trick: <span class=\"la\">est</span> on its own can mean <em>there is</em>, and <span class=\"la\">nōn est</span> <em>there is no…</em>. When Lupo looks very pleased and <span class=\"la\">cēna nōn est</span>, there is no dinner. Draw your own conclusions.</p>",
      table: {
        caption: "The Unit 1 sentence machine",
        headers: ["Latin", "English", "Why"],
        rows: [
          ["Mark pater est.", "Mark is the father.", "one subject → est"],
          ["Quinn et Paula laetī sunt.", "Quinn and Paula are happy.", "two subjects joined by et → sunt"],
          ["Domus parva est.", "The house is small.", "an adjective after est describes the subject"],
          ["Cēna nōn est!", "There is no dinner!", "est = «there is»; nōn est = «there is no…»"]
        ]
      },
      tip: "When you see «est» or «sunt», ask two questions: who or what is the subject, and what is being said about it? That’s the whole sentence."
    },
    {
      heading: "«nōn», «et», and friends: small words, heavy lifting",
      body: "<p><span class=\"la\">nōn</span> means <em>not</em> and stands right in front of the thing it denies: <span class=\"la\">Lupo bonus nōn est</span> — <em>Lupo is not good</em>. It can also deny a single word, setting up a contrast: <span class=\"la\">Vir nōn Mark est: Ted est!</span> — <em>the man is not Mark: it’s Ted!</em></p><p><span class=\"la\">et</span> means <em>and</em>; it glues together words (<span class=\"la\">pater et māter</span>) or whole sentences. <span class=\"la\">sed</span> is <em>but</em>, the pivot word: <span class=\"la\">Domus parva est, sed bona est</span>. And <span class=\"la\">quoque</span> means <em>too</em> — it stands right <em>after</em> the word it spotlights: <span class=\"la\">Lupo quoque laetus est</span>, <em>Lupo too is happy</em>.</p>",
      tip: "Position is meaning: «nōn» points forward at what it denies; «quoque» points backward at what it includes. Watch where the small words stand."
    }
  ],

  vocab: [
    {
      latin: "salvē",
      forms: "salvēte (to more than one person)",
      pos: "interjection",
      gloss: "hello!",
      example: "«Salvē, Julia!» inquit Ted.",
      exampleGloss: "«Hello, Julia!» says Ted."
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
      example: "Mark pater est.",
      exampleGloss: "Mark is the father."
    },
    {
      latin: "māter",
      forms: "gen. mātris, f.",
      pos: "noun",
      gloss: "mother",
      example: "Julia māter est.",
      exampleGloss: "Julia is the mother."
    },
    {
      latin: "fīlius",
      forms: "gen. fīliī, m.",
      pos: "noun",
      gloss: "son",
      example: "Quinn fīlius est.",
      exampleGloss: "Quinn is the son."
    },
    {
      latin: "fīlia",
      forms: "gen. fīliae, f.",
      pos: "noun",
      gloss: "daughter",
      example: "Paula fīlia est.",
      exampleGloss: "Paula is the daughter."
    },
    {
      latin: "puer",
      forms: "gen. puerī, m.",
      pos: "noun",
      gloss: "boy",
      example: "Quinn puer est, nōn vir.",
      exampleGloss: "Quinn is a boy, not a man."
    },
    {
      latin: "puella",
      forms: "gen. puellae, f.",
      pos: "noun",
      gloss: "girl",
      example: "Paula puella parva est.",
      exampleGloss: "Paula is a small girl."
    },
    {
      latin: "vir",
      forms: "gen. virī, m.",
      pos: "noun",
      gloss: "man",
      example: "Mark vir bonus est.",
      exampleGloss: "Mark is a good man."
    },
    {
      latin: "fēmina",
      forms: "gen. fēminae, f.",
      pos: "noun",
      gloss: "woman",
      example: "Julia fēmina bona est.",
      exampleGloss: "Julia is a good woman."
    },
    {
      latin: "frāter",
      forms: "gen. frātris, m.",
      pos: "noun",
      gloss: "brother",
      example: "Quinn frāter est.",
      exampleGloss: "Quinn is the brother."
    },
    {
      latin: "soror",
      forms: "gen. sorōris, f.",
      pos: "noun",
      gloss: "sister",
      example: "Paula soror est.",
      exampleGloss: "Paula is the sister."
    },
    {
      latin: "avunculus",
      forms: "gen. avunculī, m.",
      pos: "noun",
      gloss: "uncle (mother’s brother)",
      example: "Ted avunculus est.",
      exampleGloss: "Ted is the uncle."
    },
    {
      latin: "canis",
      forms: "gen. canis, m./f.",
      pos: "noun",
      gloss: "dog",
      example: "Lupo canis est.",
      exampleGloss: "Lupo is a dog."
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
      example: "Mark et Julia laetī sunt.",
      exampleGloss: "Mark and Julia are happy."
    },
    {
      latin: "nōn",
      forms: "(never changes shape)",
      pos: "adverb",
      gloss: "not",
      example: "Lupo canis bonus nōn est.",
      exampleGloss: "Lupo is not a good dog."
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
      example: "Lupo quoque laetus est.",
      exampleGloss: "Lupo too is happy."
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
      example: "Ted avunculus bonus est.",
      exampleGloss: "Ted is a good uncle."
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
        "Mark pater est. Mark vir bonus est. Julia māter est. Julia fēmina bona est. Mark et Julia laetī sunt.",
        "Quinn fīlius est. Quinn puer bonus est. Paula fīlia est. Paula puella parva est, sed nōn timida! Quinn et Paula frāter et soror sunt.",
        "Ecce canis! Canis Lupo est. Lupo canis bonus nōn est — sed laetus est! Familia laeta est, et Lupo quoque laetus est."
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
        "mark": "Mark, the father — a grain merchant (a foreign name: it never changes form)",
        "vir": "man",
        "bonus": "good",
        "julia": "Julia, the mother",
        "fēmina": "woman",
        "bona": "good (matching a feminine word)",
        "laetī": "happy (plural — describing more than one person)",
        "sunt": "(they) are",
        "quinn": "Quinn, the son (twelve years old)",
        "puer": "boy",
        "paula": "Paula, the daughter (eight years old)",
        "puella": "girl",
        "parva": "small, little",
        "sed": "but",
        "nōn": "not",
        "timida": "timid, easily scared",
        "frāter": "brother",
        "soror": "sister",
        "lupo": "Lupo, the dog — canis Lupo, quasi lupus: «like a wolf»! (his name never changes form)",
        "laetus": "happy, glad",
        "laeta": "happy (matching a feminine word)",
        "quoque": "also, too"
      },
      translation: [
        "Hello! Here is the Fabius family. The family is in Ostia. It is a big family: a father, a mother, a son, a daughter — and a dog!",
        "Mark is the father. Mark is a good man. Julia is the mother. Julia is a good woman. Mark and Julia are happy.",
        "Quinn is the son. Quinn is a good boy. Paula is the daughter. Paula is a small girl, but not a timid one! Quinn and Paula are brother and sister.",
        "Look at the dog! The dog is Lupo. Lupo is not a good dog — but he is a happy one! The family is happy, and Lupo is happy too."
      ],
      questions: [
        {
          q: "Who is the mother of the family?",
          options: ["Paula", "Julia", "Ostia", "Fabia"],
          answer: 1,
          explain: "«Julia māter est» — Julia is the mother. Ostia is the town, and Fabia is the family’s name."
        },
        {
          q: "What does the passage tell us about Paula?",
          options: [
            "She is a small girl, but not timid",
            "She is a big girl and very timid",
            "She is Quinn’s mother",
            "She is not happy"
          ],
          answer: 0,
          explain: "«Paula puella parva est, sed nōn timida!» — small, but fearless."
        },
        {
          q: "In «Mark et Julia laetī sunt», why is the verb «sunt» rather than «est»?",
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
            "Lupo is a good dog",
            "Lupo is not happy",
            "Lupo is not a good dog, but he is happy",
            "There is no dog in the family"
          ],
          answer: 2,
          explain: "«Lupo canis bonus nōn est — sed laetus est!» Not good, very happy. Remember this combination; it explains everything later."
        }
      ]
    },
    {
      title: "Domus et Avunculus",
      intro: "A look at the family’s little house — and a surprise visit from Uncle Ted. Lupo, meanwhile, discovers dinner.",
      paragraphs: [
        "Ecce domus! Domus in Ostiā est. Ostia magna est, sed domus magna nōn est: domus parva est. Domus parva, sed bona est.",
        "Ecce vir! Vir nōn Mark est: Ted est. Ted avunculus est — Julia et Ted soror et frāter sunt. «Salvē, Julia!» inquit Ted. «Salvē, frāter!» inquit Julia. Ted et Julia laetī sunt.",
        "Quinn et Paula quoque laetī sunt: «Salvē! Salvē!» Ted nauta est — magister nāvis! Quinn nauta nōn est; puer est. Sed laetus est: avunculus bonus est.",
        "Sed ecce — Lupo! Lupo laetus est… et cēna nōn est! «Ō Lupo!» inquit Julia. «Canis bonus nōn est! Canis nōn est — bēlua est!»",
        "Sed familia laeta est: pater et māter, fīlius et fīlia, avunculus et canis. Domus parva est, sed familia magna est. Et Lupo? Lupo semper Lupo est."
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
        "mark": "Mark, the father",
        "ted": "Ted, Julia’s brother — a ship’s captain",
        "avunculus": "uncle (your mother’s brother)",
        "julia": "Julia, the mother",
        "et": "and",
        "soror": "sister",
        "frāter": "brother (here also used to greet him: «hello, brother!»)",
        "sunt": "(they) are",
        "salvē": "hello!",
        "inquit": "says, said (used with quoted speech)",
        "laetī": "happy (plural — describing more than one person)",
        "quinn": "Quinn, the son",
        "paula": "Paula, the daughter",
        "quoque": "also, too",
        "nauta": "a sailor, a seaman",
        "magister": "master, captain (take «magister nāvis» as one chunk: a ship’s captain)",
        "nāvis": "of a ship (the second half of the chunk «magister nāvis»)",
        "puer": "boy",
        "laetus": "happy, glad",
        "bonus": "good",
        "lupo": "Lupo, the dog",
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
        "Look — a man! The man is not Mark: it is Ted. Ted is the uncle — Julia and Ted are sister and brother. «Hello, Julia!» says Ted. «Hello, brother!» says Julia. Ted and Julia are happy.",
        "Quinn and Paula are happy too: «Hello! Hello!» Ted is a sailor — a ship’s captain! Quinn is not a sailor; he is a boy. But he is happy: his uncle is a good one.",
        "But look — Lupo! Lupo is happy… and there is no dinner! «Oh, Lupo!» says Julia. «He is not a good dog! He is not a dog at all — he is a monster!»",
        "But the family is happy: father and mother, son and daughter, uncle and dog. The house is small, but the family is big. And Lupo? Lupo is always Lupo."
      ],
      questions: [
        {
          q: "Who is Ted?",
          options: [
            "Julia’s brother — the children’s uncle, a ship’s captain",
            "Mark’s father",
            "A merchant visiting from Rome",
            "Quinn’s brother"
          ],
          answer: 0,
          explain: "«Ted avunculus est — Julia et Ted soror et frāter sunt», and he is «magister nāvis», a ship’s captain."
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
          q: "«Lupo laetus est… et cēna nōn est!» What has happened?",
          options: [
            "The dinner does not taste good",
            "There is no dinner any more — and Lupo looks suspiciously pleased",
            "The family has decided not to eat",
            "Julia has not cooked because Ted arrived"
          ],
          answer: 1,
          explain: "«est» can mean «there is», so «cēna nōn est» = «there is no dinner». Lupo being «laetus» at that exact moment is not a coincidence."
        },
        {
          q: "The passage says «Ted et Julia laetī sunt». Why «sunt» and not «est»?",
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
        "Mark pater ___",
        "Ostia magna ___",
        "Quinn et Paula laetī ___",
        "Lupo canis ___"
      ],
      answer: 2,
      explain: "«Quinn et Paula» is two people — a plural subject takes the plural verb «sunt». The others each have a single subject."
    },
    {
      prompt: "What does «Lupo canis bonus nōn est» say about Lupo?",
      options: [
        "He is a good dog",
        "He is not a good dog",
        "He is not a dog",
        "There is no dog here"
      ],
      answer: 1,
      explain: "«nōn» denies «bonus … est»: Lupo is certainly a dog — just not a good one."
    },
    {
      prompt: "In «Ted quoque laetus est», the word «quoque» tells you that…",
      options: [
        "Ted is extremely happy",
        "Ted, too, is happy — like the others already mentioned",
        "Only Ted is happy",
        "Ted was happy before, but is not now"
      ],
      answer: 1,
      explain: "«quoque» means «also, too» and stands right after the word it spotlights — here «Ted»."
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
      prompt: "In «Julia māter est», which word is the subject — the person the sentence is about?",
      options: ["Julia", "māter", "est", "There is no subject"],
      answer: 0,
      explain: "«Julia» is the subject, in the nominative; «māter» completes the thought after «est»: Julia is the mother."
    },
    {
      prompt: "Lupo looks very pleased with himself, and Julia cries: «Cēna nōn est!» What does she mean?",
      options: [
        "The dinner is not tasty",
        "There is no dinner (any more)",
        "Dinner is not ready yet",
        "The dinner is small"
      ],
      answer: 1,
      explain: "«est» by itself can mean «there is», so «cēna nōn est» = «there is no dinner». Lupo is «laetus» for a reason."
    }
  ]
});
