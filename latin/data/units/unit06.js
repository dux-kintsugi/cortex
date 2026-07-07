registerUnit({
  id: 6,
  stage: 1,
  title: "Dōna",
  tagline: "The dative case: giving, showing, telling",

  grammar: [
    {
      heading: "Giving takes three: giver, gift, receiver",
      body: "<p>Say <em>give</em> and you already expect three players: someone gives <em>something</em> to <em>someone</em>. English marks the receiver with <strong>to</strong> or by word order (<em>give the dog a bone</em>). Latin marks it with an ending — a whole case, the <strong>dative</strong>.</p><p><span class=\"la\">Titus puerō dōnum dat.</span> — Titus gives the boy a gift. <span class=\"la\">dōnum</span> is accusative: the thing given. <span class=\"la\">puerō</span> is dative: the receiver.</p><p>So here is this unit’s reading habit: when you meet a giving, showing, or telling verb — <span class=\"la\">dat</span>, <span class=\"la\">dōnat</span>, <span class=\"la\">mōnstrat</span>, <span class=\"la\">nārrat</span> — expect <strong>two</strong> nouns near it: an accusative thing and a dative person.</p>",
      tip: "Reading tip: the dative answers «to whom? for whom?». If the verb hands something over, hunt for the dative before you translate anything else."
    },
    {
      heading: "The dative endings (1st and 2nd declension)",
      body: "<p>Only two new endings today — and the plural is the same for both declensions.</p><p>Singular: 1st declension takes <strong>‑ae</strong> (<span class=\"la\">puellae</span> — to the girl); 2nd declension takes <strong>‑ō</strong> (<span class=\"la\">puerō</span> — to the boy, <span class=\"la\">dōnō</span> — to the gift). Plural: both share <strong>‑īs</strong> (<span class=\"la\">puellīs</span> — to the girls, <span class=\"la\">puerīs</span> — to the boys).</p>",
      table: {
        caption: "Dative endings, 1st and 2nd declension",
        headers: ["Declension", "Dative singular", "Dative plural"],
        rows: [
          ["1st (puella, fābula)", "‑ae → puellae", "‑īs → puellīs"],
          ["2nd (puer, dōnum)", "‑ō → puerō", "‑īs → dōnīs"]
        ]
      },
      tip: "Sneak preview: nouns like «māter» and «soror» — and «Ferōx»! — belong to a family you will meet properly in Unit 9. Their dative ends in ‑ī: «mātrī», «sorōrī», «Ferōcī». We gloss these whenever they appear."
    },
    {
      heading: "placeō and friends: verbs that live on the dative",
      body: "<p>Some verbs take the person in the dative even when nothing changes hands. The star is <span class=\"la\">placeō</span>: <span class=\"la\">Dōnum puellae placet</span> — the gift is pleasing <em>to the girl</em>, i.e. the girl likes the gift. Latin makes the gift the subject and the person the dative — the mirror image of English <em>like</em>.</p><p><span class=\"la\">respondeō</span> works the same way: <span class=\"la\">Quīntus avunculō respondet</span> — Quintus answers (gives an answer <em>to</em>) his uncle. The adjective <span class=\"la\">grātus</span> takes a dative too: <span class=\"la\">arca puerīs grāta est</span> — the chest is welcome to the children.</p><p>Contrast <span class=\"la\">dēlectō</span>, which means nearly the same as <span class=\"la\">placeō</span> but takes a plain accusative: <span class=\"la\">fābulae puerōs dēlectant</span> — the stories delight the boys. Same idea, different plumbing.</p>",
      tip: "One handy idiom: «grātiam habēre» + dative = to feel gratitude toward someone. «Līvia Titō grātiam habet» — Livia is grateful to Titus."
    },
    {
      heading: "But ‑ae already means three things!",
      body: "<p>True — and sorting it out is what makes you a real reader. <span class=\"la\">puellae</span> can be genitive singular (of the girl), dative singular (to the girl), or nominative plural (the girls). The ending is a signpost, not a verdict; the sentence decides.</p><p>Three quick checks. <strong>1.</strong> Is the verb a give-show-tell verb, or <span class=\"la\">placet</span>? Bet on the dative: <span class=\"la\">Titus puellae dōnum dat</span>. <strong>2.</strong> Is the ‑ae word glued to another noun? Think genitive: <span class=\"la\">pūpa puellae</span> — the girl’s doll. <strong>3.</strong> Is the verb plural, with no other subject in sight? Nominative plural: <span class=\"la\">puellae cantant</span> — the girls sing.</p>",
      tip: "The same trick covers ‑īs: next to a giving verb, «servīs» means ‘to the slaves’. Let the verb tell you what the ending is doing."
    }
  ],

  vocab: [
    {
      latin: "dōnum",
      forms: "dōnī, n.",
      pos: "noun (2nd decl.)",
      gloss: "gift",
      example: "Titus puerō dōnum dat.",
      exampleGloss: "Titus gives the boy a gift."
    },
    {
      latin: "fābula",
      forms: "fābulae, f.",
      pos: "noun (1st decl.)",
      gloss: "story, tale",
      example: "Nauta puellīs fābulam nārrat.",
      exampleGloss: "The sailor tells the girls a story."
    },
    {
      latin: "gemma",
      forms: "gemmae, f.",
      pos: "noun (1st decl.)",
      gloss: "gem, jewel",
      example: "Gemma est pretiōsa.",
      exampleGloss: "The gem is precious."
    },
    {
      latin: "ānulus",
      forms: "ānulī, m.",
      pos: "noun (2nd decl.)",
      gloss: "ring",
      example: "Mārcus Līviae ānulum dōnat.",
      exampleGloss: "Marcus presents Livia with a ring."
    },
    {
      latin: "pūpa",
      forms: "pūpae, f.",
      pos: "noun (1st decl.)",
      gloss: "doll",
      example: "Pūpa nova Paullae placet.",
      exampleGloss: "The new doll pleases Paulla."
    },
    {
      latin: "nāvicula",
      forms: "nāviculae, f.",
      pos: "noun (1st decl.)",
      gloss: "little ship, boat",
      example: "Quīntus nāviculam parvam habet.",
      exampleGloss: "Quintus has a little boat."
    },
    {
      latin: "tunica",
      forms: "tunicae, f.",
      pos: "noun (1st decl.)",
      gloss: "tunic",
      example: "Tunica nova ancillae placet.",
      exampleGloss: "The new tunic pleases the maidservant."
    },
    {
      latin: "toga",
      forms: "togae, f.",
      pos: "noun (1st decl.)",
      gloss: "toga",
      example: "Toga Mārcī magna est.",
      exampleGloss: "Marcus’s toga is big."
    },
    {
      latin: "concha",
      forms: "conchae, f.",
      pos: "noun (1st decl.)",
      gloss: "seashell",
      example: "Paulla conchās pulchrās habet.",
      exampleGloss: "Paulla has pretty seashells."
    },
    {
      latin: "pīrāta",
      forms: "pīrātae, m.",
      pos: "noun (1st decl., m.)",
      gloss: "pirate",
      example: "Pīrātae sunt malī.",
      exampleGloss: "Pirates are wicked."
    },
    {
      latin: "mōnstrum",
      forms: "mōnstrī, n.",
      pos: "noun (2nd decl.)",
      gloss: "monster",
      example: "Mōnstrum est magnum, sed Paulla nōn clāmat.",
      exampleGloss: "The monster is big, but Paulla does not cry out."
    },
    {
      latin: "perīculum",
      forms: "perīculī, n.",
      pos: "noun (2nd decl.)",
      gloss: "danger",
      example: "Perīcula nautīs grāta nōn sunt.",
      exampleGloss: "Dangers are not welcome to sailors."
    },
    {
      latin: "gaudium",
      forms: "gaudiī, n.",
      pos: "noun (2nd decl.)",
      gloss: "joy",
      example: "Dōna puerīs gaudium dant.",
      exampleGloss: "Gifts give children joy."
    },
    {
      latin: "grātia",
      forms: "grātiae, f.",
      pos: "noun (1st decl.)",
      gloss: "thanks, favor",
      example: "Puella avunculō grātiam habet.",
      exampleGloss: "The girl is grateful to her uncle."
    },
    {
      latin: "dō",
      forms: "dare, dedī, datum",
      pos: "verb (1st conj.)",
      gloss: "give",
      example: "Māter fīliae aquam dat.",
      exampleGloss: "The mother gives her daughter water."
    },
    {
      latin: "dōnō",
      forms: "dōnāre, dōnāvī, dōnātum",
      pos: "verb (1st conj.)",
      gloss: "present, give as a gift",
      example: "Avunculus Quīntō nāviculam dōnat.",
      exampleGloss: "The uncle presents Quintus with a little ship."
    },
    {
      latin: "mōnstrō",
      forms: "mōnstrāre, mōnstrāvī, mōnstrātum",
      pos: "verb (1st conj.)",
      gloss: "show, point out",
      example: "Titus puerīs gemmās mōnstrat.",
      exampleGloss: "Titus shows the children the gems."
    },
    {
      latin: "nārrō",
      forms: "nārrāre, nārrāvī, nārrātum",
      pos: "verb (1st conj.)",
      gloss: "tell, relate",
      example: "Avunculus familiae fābulās nārrat.",
      exampleGloss: "The uncle tells the family stories."
    },
    {
      latin: "respondeō",
      forms: "respondēre, respondī, respōnsum (+ dat.)",
      pos: "verb (2nd conj.)",
      gloss: "answer, reply",
      example: "Quīntus avunculō respondet.",
      exampleGloss: "Quintus answers his uncle."
    },
    {
      latin: "dēlectō",
      forms: "dēlectāre, dēlectāvī, dēlectātum",
      pos: "verb (1st conj.)",
      gloss: "delight, please",
      example: "Fābulae puerōs dēlectant.",
      exampleGloss: "The stories delight the boys."
    },
    {
      latin: "placeō",
      forms: "placēre, placuī, placitum (+ dat.)",
      pos: "verb (2nd conj.)",
      gloss: "please, be pleasing to",
      example: "Dōnum puellae placet.",
      exampleGloss: "The gift pleases the girl."
    },
    {
      latin: "grātus",
      forms: "‑a, ‑um (+ dat.)",
      pos: "adjective (1st/2nd decl.)",
      gloss: "pleasing, welcome",
      example: "Dōna avunculī puerīs grāta sunt.",
      exampleGloss: "The uncle’s gifts are welcome to the children."
    },
    {
      latin: "pretiōsus",
      forms: "‑a, ‑um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "precious, costly",
      example: "Ānulus est pretiōsus.",
      exampleGloss: "The ring is precious."
    },
    {
      latin: "prīmum",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "first, at first",
      example: "Titus prīmum puellae dōnum dat.",
      exampleGloss: "First, Titus gives the girl a gift."
    },
    {
      latin: "etiam",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "also, even",
      example: "Etiam Ferōx dōnum optat!",
      exampleGloss: "Even Ferox wants a gift!"
    }
  ],

  readings: [
    {
      title: "Arca avunculī",
      intro: "Uncle Titus arrives from the harbor with a mysterious chest — and the whole household comes running.",
      paragraphs: [
        "Familia Fabia laeta est, quod Titus domum intrat. Titus, avunculus Quīntī Paullaeque, est nauta et magister nāvis. Magnam arcam portat. Mārcus Līviaque avunculum salūtant, puerī clāmant, etiam Ferōx lātrat.",
        "«Ecce arca!» inquit Titus. «Arca plēna dōnōrum est.» Quīntus et Paulla arcam spectant; arca puerīs grāta est.",
        "Titus prīmum puellae dōnum dat: pūpa nova est! Pūpa Paullae placet; puella laeta pūpam tenet. Deinde avunculus Quīntō nāviculam dōnat. Nāvicula puerō placet, quod Quīntus vītam nautārum amat."
      ],
      glosses: {
        "familia": "family, household",
        "fabia": "Fabian — the family’s name («familia Fabia» = the Fabius household)",
        "laeta": "happy (describing «familia»)",
        "est": "is",
        "quod": "because",
        "titus": "Titus (Livia’s brother, a ship’s captain)",
        "domum": "the house (acc. — object of «intrat»)",
        "intrat": "(he) enters, is coming into",
        "avunculus": "uncle (a mother’s brother)",
        "quīntī": "of Quintus (gen.)",
        "paullaeque": "and of Paulla (gen. + ‑que)",
        "nauta": "a sailor",
        "et": "and",
        "magister": "master, captain",
        "nāvis": "of a ship (gen. sg. — «magister nāvis» = ship’s captain)",
        "magnam": "big (acc., describing «arcam»)",
        "arcam": "chest, strongbox (acc.)",
        "portat": "(he) carries",
        "mārcus": "Marcus (the father)",
        "līviaque": "and Livia (the mother)",
        "avunculum": "the uncle (acc.)",
        "puerī": "the children (nom. pl.)",
        "salūtant": "(they) greet",
        "clāmant": "(they) shout",
        "etiam": "even, also",
        "ferōx": "Ferox (the dog)",
        "lātrat": "(he) barks — a new word for the occasion",
        "ecce": "look! behold!",
        "arca": "the chest (nom.)",
        "inquit": "says (used with quoted speech)",
        "plēna": "full (+ gen.)",
        "dōnōrum": "of gifts (gen. pl.)",
        "quīntus": "Quintus (the son, 12)",
        "paulla": "Paulla (the daughter, 8)",
        "spectant": "(they) look at, stare at",
        "puerīs": "to the children (dat. pl. — welcome *to* them)",
        "grāta": "welcome, pleasing (+ dat.)",
        "prīmum": "first (adverb)",
        "puellae": "to the girl (dat. sg.)",
        "dōnum": "a gift (acc.)",
        "dat": "(he) gives",
        "pūpa": "a doll (nom.)",
        "nova": "new",
        "paullae": "to Paulla (dat. — the doll pleases *Paulla*)",
        "placet": "is pleasing (to) — takes the dative",
        "puella": "the girl (nom.)",
        "pūpam": "the doll (acc.)",
        "tenet": "(she) holds",
        "deinde": "then, next",
        "quīntō": "to Quintus (dat.)",
        "nāviculam": "a little ship, toy boat (acc.)",
        "dōnat": "(he) presents, gives as a gift",
        "nāvicula": "the little ship (nom.)",
        "puerō": "to the boy (dat.)",
        "vītam": "the life (acc.)",
        "nautārum": "of sailors (gen. pl.)",
        "amat": "(he) loves"
      },
      translation: [
        "The Fabius family is happy, because Titus is coming into the house. Titus, the uncle of Quintus and Paulla, is a sailor and a ship’s captain. He is carrying a big chest. Marcus and Livia greet the uncle, the children shout, even Ferox barks.",
        "«Look — a chest!» says Titus. «The chest is full of gifts.» Quintus and Paulla stare at the chest; the chest is welcome to the children.",
        "First Titus gives the girl a gift: it is a new doll! The doll pleases Paulla; the happy girl holds her doll. Then the uncle presents Quintus with a little ship. The little ship pleases the boy, because Quintus loves the life of sailors."
      ],
      questions: [
        {
          q: "Why is the family happy at the start of the reading?",
          options: ["Ferox has finally stopped barking", "Uncle Titus is coming into the house", "Marcus has sold all his grain", "The children are leaving for school"],
          answer: 1,
          explain: "«laeta est, quod Titus domum intrat» — «quod» gives the reason: Titus is arriving."
        },
        {
          q: "In «arca puerīs grāta est», what does «puerīs» tell you?",
          options: ["The children own the chest", "The chest is welcome to the children", "The children are carrying the chest", "The chest is full of children"],
          answer: 1,
          explain: "«puerīs» is dative plural — «grātus» takes a dative: pleasing or welcome *to* someone."
        },
        {
          q: "Who receives the new doll?",
          options: ["Līvia", "Quīntus", "Paulla", "Ferōx"],
          answer: 2,
          explain: "«puellae dōnum dat … pūpa Paullae placet» — the girl, Paulla, gets the doll, and it pleases her."
        },
        {
          q: "Why does the little ship please Quintus?",
          options: ["Because it is full of gems", "Because he loves the life of sailors", "Because Paulla wants it too", "Because it once belonged to Titus"],
          answer: 1,
          explain: "«quod Quīntus vītam nautārum amat» — because Quintus loves the life of sailors."
        }
      ]
    },
    {
      title: "Dōna et fābula",
      intro: "The grown-ups get their gifts, Titus tells a pirate story, and Ferox receives a present of his own.",
      paragraphs: [
        "Deinde Titus Mārcō togam novam dat; toga virō placet. Līviae gemmam pretiōsam ānulumque dōnat. Gemma ānulusque dominae placent; Līvia laeta Titō grātiam habet. Etiam servīs ancillīsque Titus tunicās novās dat. Servī laetī sunt et nautae grātiam habent.",
        "Mox puerī clāmant: «Fābulam! Fābulam!» Titus puerīs fābulam pīrātārum nārrat: pīrāta malus gemmās mercātōris rapit, sed subitō mōnstrum magnum nāviculam pīrātae dēvorat! Paulla clāmat; fābula tamen puellae placet. «Mōnstra nōn sunt!» inquit Līvia. Sed Titus sorōrī respondet: «Mōnstra sunt — et magna sunt!»",
        "Etiam Ferōx dōnum exspectat! Titus Ferōcī botulum magnum dat. Canis botulum nōn spectat — subitō dēvorat. Familia rīdet. Dōna fābulaeque familiam dēlectant; puerī avunculō bonō grātiam habent, et domus Fabia plēna gaudiī est."
      ],
      glosses: {
        "deinde": "then, next",
        "titus": "Titus (the uncle)",
        "mārcō": "to Marcus (dat.)",
        "togam": "a toga (acc.)",
        "novam": "new (acc.)",
        "dat": "(he) gives",
        "toga": "the toga (nom.)",
        "virō": "the man (dat. — pleasing *to the man*)",
        "placet": "is pleasing (to) — takes the dative",
        "līviae": "to Livia (dat.)",
        "gemmam": "a gem (acc.)",
        "pretiōsam": "precious (acc.)",
        "ānulumque": "and a ring (acc. + ‑que)",
        "dōnat": "(he) presents, gives as a gift",
        "gemma": "the gem (nom.)",
        "ānulusque": "and the ring (nom. + ‑que)",
        "dominae": "to the lady of the house (dat.)",
        "placent": "are pleasing (to) — plural of «placet»",
        "līvia": "Livia (the mother)",
        "laeta": "happy, delighted",
        "titō": "toward Titus (dat. — with «grātiam habet»)",
        "grātiam": "gratitude, thanks (acc. — «grātiam habēre» = to be grateful)",
        "habet": "(she) has, feels",
        "etiam": "even, also",
        "servīs": "to the slaves (dat. pl.)",
        "ancillīsque": "and to the maidservants (dat. pl. + ‑que)",
        "tunicās": "tunics (acc. pl.)",
        "novās": "new (acc. pl.)",
        "servī": "the slaves (nom. pl.)",
        "laetī": "happy (nom. pl.)",
        "sunt": "are",
        "et": "and",
        "nautae": "toward the sailor (dat. sg. — they are grateful *to* Titus)",
        "habent": "(they) have, feel",
        "mox": "soon",
        "puerī": "the children (nom. pl.)",
        "clāmant": "(they) shout",
        "fābulam": "a story! (acc.)",
        "puerīs": "to the children (dat. pl.)",
        "pīrātārum": "of pirates (gen. pl.)",
        "nārrat": "(he) tells, relates",
        "pīrāta": "a pirate (nom.)",
        "malus": "wicked",
        "gemmās": "gems (acc. pl.)",
        "mercātōris": "of a merchant (gen. sg. — a 3rd-declension noun, like «nāvis»)",
        "rapit": "(he) seizes, snatches",
        "sed": "but",
        "subitō": "suddenly",
        "mōnstrum": "a monster (nom.)",
        "magnum": "big, huge (nom. with «mōnstrum»; later acc. with «botulum»)",
        "nāviculam": "the little ship, boat (acc.)",
        "pīrātae": "of the pirate (gen. sg.)",
        "dēvorat": "(he/it) devours, gulps down",
        "paulla": "Paulla (the daughter, 8)",
        "clāmat": "(she) screams, cries out",
        "fābula": "the story (nom.)",
        "tamen": "nevertheless, still",
        "puellae": "to the girl (dat. sg.)",
        "mōnstra": "monsters (nom. pl.)",
        "nōn": "not — «mōnstra nōn sunt» = monsters do not exist",
        "inquit": "says (used with quoted speech)",
        "sorōrī": "to his sister (dat. — 3rd-declension nouns like «soror» mark the dative with ‑ī)",
        "respondet": "(he) answers, replies (+ dat.)",
        "magna": "big (nom. pl., with «mōnstra»)",
        "ferōx": "Ferox (the dog)",
        "dōnum": "a gift (acc.)",
        "exspectat": "(he) awaits, is waiting for",
        "ferōcī": "to Ferox (dat. — another 3rd-declension dative in ‑ī)",
        "botulum": "a sausage (acc.)",
        "canis": "the dog (nom.)",
        "spectat": "(he) looks at",
        "familia": "the family",
        "rīdet": "(it) laughs",
        "dōna": "the gifts (nom. pl.)",
        "fābulaeque": "and the stories (nom. pl. + ‑que)",
        "familiam": "the family (acc.)",
        "dēlectant": "(they) delight",
        "avunculō": "toward their uncle (dat.)",
        "bonō": "good (dat., with «avunculō»)",
        "domus": "the house, household (nom.)",
        "fabia": "Fabian, of the Fabius family",
        "plēna": "full (+ gen.)",
        "gaudiī": "of joy (gen.)",
        "est": "is"
      },
      translation: [
        "Then Titus gives Marcus a new toga; the toga pleases the man. To Livia he presents a precious gem and a ring. The gem and the ring please the lady of the house; Livia, delighted, is grateful to Titus. Titus even gives the slaves and the maidservants new tunics. The slaves are happy and are grateful to the sailor.",
        "Soon the children are shouting: «A story! A story!» Titus tells the children a story of pirates: a wicked pirate seizes a merchant’s gems, but suddenly a huge monster devours the pirate’s boat! Paulla screams — yet the story pleases the girl. «Monsters do not exist!» says Livia. But Titus answers his sister: «Monsters do exist — and they are big!»",
        "Even Ferox is waiting for a gift! Titus gives Ferox a big sausage. The dog does not look at the sausage — he devours it on the spot. The family laughs. The gifts and the stories delight the family; the children are grateful to their good uncle, and the Fabius house is full of joy."
      ],
      questions: [
        {
          q: "What does Titus present to Livia?",
          options: ["A new toga", "A precious gem and a ring", "A little ship", "New tunics"],
          answer: 1,
          explain: "«Līviae gemmam pretiōsam ānulumque dōnat» — to Livia (dative) he gives a precious gem and a ring."
        },
        {
          q: "In «toga virō placet», which word names the person who is pleased?",
          options: ["toga", "virō", "placet", "None — no person is mentioned"],
          answer: 1,
          explain: "«virō» is dative: the toga is pleasing *to the man*, Marcus. With «placeō», the person pleased always sits in the dative."
        },
        {
          q: "In Titus’s story, what does the monster do?",
          options: ["It steals the merchant’s gems", "It rescues the wicked pirate", "It devours the pirate’s boat", "It frightens Livia away"],
          answer: 2,
          explain: "«mōnstrum magnum nāviculam pīrātae dēvorat» — the huge monster devours the pirate’s little ship."
        },
        {
          q: "How does Ferox handle his present?",
          options: ["He devours the sausage on the spot", "He buries it in the garden", "He shows it to the children", "He refuses to touch it"],
          answer: 0,
          explain: "«botulum nōn spectat — subitō dēvorat» — he does not even look at it; he devours it immediately."
        }
      ]
    }
  ],

  quiz: [
    {
      prompt: "In «Titus puellae dōnum dat», who receives the gift?",
      options: ["Titus", "The girl", "The gift", "No one — nothing is received"],
      answer: 1,
      explain: "«puellae» is dative — the receiving case. Titus gives the gift *to the girl*."
    },
    {
      prompt: "You read «Māter fīliō fābulam nārrat». What is «fīliō» doing in the sentence?",
      options: ["It is the subject — the son tells the story", "It shows possession — the son’s story", "It names the hearer — she tells the story to her son", "It is the direct object — she tells the son himself"],
      answer: 2,
      explain: "«fīliō» ends in ‑ō: 2nd-declension dative. With a telling verb, the dative names the person told; the thing told, «fābulam», is accusative."
    },
    {
      prompt: "In «Dominus servīs cibum dat», what does «servīs» mean?",
      options: ["Of the slave", "The slaves, as subject", "The slave, as direct object", "To the slaves"],
      answer: 3,
      explain: "‑īs is the dative plural. It cannot be the subject: «dat» is singular, and its subject is «dominus». The master gives food *to the slaves*."
    },
    {
      prompt: "Which verb takes its person in the dative — X is pleasing *to* Y?",
      options: ["dēlectō", "placeō", "portō", "dēvorō"],
      answer: 1,
      explain: "«Dōnum puellae placet» — the gift is pleasing to the girl. «dēlectō» says nearly the same thing but takes a plain accusative: «dōnum puellam dēlectat»."
    },
    {
      prompt: "What is a «pūpa»?",
      options: ["A doll", "A little boat", "A seashell", "A ring"],
      answer: 0,
      explain: "«pūpa» is a doll — Paulla’s new treasure. The little boat is «nāvicula», the seashell «concha», the ring «ānulus»."
    },
    {
      prompt: "In «Līvia Titō grātiam habet», what is Livia doing?",
      options: ["Giving Titus a present", "Telling Titus a story", "Feeling grateful to Titus", "Asking Titus for money"],
      answer: 2,
      explain: "«grātiam habēre» + dative is an idiom: to feel gratitude toward someone. Livia is grateful to Titus."
    },
    {
      prompt: "In «Mārcus fīliae gemmam mōnstrat», which word is the thing being shown?",
      options: ["Mārcus", "fīliae", "gemmam", "mōnstrat"],
      answer: 2,
      explain: "«gemmam» (‑am, accusative) is the thing shown; «fīliae» (dative) is the person it is shown to."
    },
    {
      prompt: "What does «Fābulae puerīs placent» mean?",
      options: ["The boys’ stories are pleasing", "The stories please the boys", "The boys please the stories", "The boys are telling stories"],
      answer: 1,
      explain: "«puerīs» is dative plural — the ones pleased. ‘The boys’ stories’ would need the genitive plural, «puerōrum»."
    }
  ]
});
