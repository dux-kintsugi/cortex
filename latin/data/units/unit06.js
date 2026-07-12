registerUnit({
  id: 6,
  stage: 1,
  title: "Dōna",
  tagline: "The dative case: giving, showing, telling",

  grammar: [
    {
      heading: "Giving takes three: giver, gift, receiver",
      body: "<p>Say <em>give</em> and you already expect three players: someone gives <em>something</em> to <em>someone</em>. English marks the receiver with <strong>to</strong> or by word order (<em>give the dog a bone</em>). Latin marks it with an ending — a whole case, the <strong>dative</strong>.</p><p><span class=\"la\">Ted puerō dōnum dat.</span> — Ted gives the boy a gift. <span class=\"la\">dōnum</span> is accusative: the thing given. <span class=\"la\">puerō</span> is dative: the receiver.</p><p>So here is this unit’s reading habit: when you meet a giving, showing, or telling verb — <span class=\"la\">dat</span>, <span class=\"la\">dōnat</span>, <span class=\"la\">mōnstrat</span>, <span class=\"la\">nārrat</span> — expect <strong>two</strong> nouns near it: an accusative thing and a dative person.</p>",
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
      tip: "Sneak preview: nouns like «māter», «soror», and «canis» belong to a family you will meet properly in Unit 9. Their dative ends in ‑ī: «mātrī», «sorōrī», «canī». We gloss these whenever they appear."
    },
    {
      heading: "placeō and friends: verbs that live on the dative",
      body: "<p>Some verbs take the person in the dative even when nothing changes hands. The star is <span class=\"la\">placeō</span>: <span class=\"la\">Dōnum puellae placet</span> — the gift is pleasing <em>to the girl</em>, i.e. the girl likes the gift. Latin makes the gift the subject and the person the dative — the mirror image of English <em>like</em>.</p><p><span class=\"la\">respondeō</span> works the same way: <span class=\"la\">Quinn avunculō respondet</span> — Quinn answers (gives an answer <em>to</em>) his uncle. The adjective <span class=\"la\">grātus</span> takes a dative too: <span class=\"la\">arca puerīs grāta est</span> — the chest is welcome to the children.</p><p>Contrast <span class=\"la\">dēlectō</span>, which means nearly the same as <span class=\"la\">placeō</span> but takes a plain accusative: <span class=\"la\">fābulae puerōs dēlectant</span> — the stories delight the boys. Same idea, different plumbing.</p>",
      tip: "One handy idiom: «grātiam habēre» + dative = to feel gratitude toward someone. «Paula avunculō grātiam habet» — Paula is grateful to her uncle."
    },
    {
      heading: "But ‑ae already means three things!",
      body: "<p>True — and sorting it out is what makes you a real reader. <span class=\"la\">puellae</span> can be genitive singular (of the girl), dative singular (to the girl), or nominative plural (the girls). The ending is a signpost, not a verdict; the sentence decides.</p><p>Three quick checks. <strong>1.</strong> Is the verb a give-show-tell verb, or <span class=\"la\">placet</span>? Bet on the dative: <span class=\"la\">Ted puellae dōnum dat</span>. <strong>2.</strong> Is the ‑ae word glued to another noun? Think genitive: <span class=\"la\">pūpa puellae</span> — the girl’s doll. <strong>3.</strong> Is the verb plural, with no other subject in sight? Nominative plural: <span class=\"la\">puellae cantant</span> — the girls sing.</p>",
      tip: "The same trick covers ‑īs: next to a giving verb, «servīs» means ‘to the slaves’. Let the verb tell you what the ending is doing."
    }
  ],

  vocab: [
    {
      latin: "dōnum",
      forms: "dōnī, n.",
      pos: "noun (2nd decl.)",
      gloss: "gift",
      example: "Ted puerō dōnum dat.",
      exampleGloss: "Ted gives the boy a gift."
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
      example: "Mark Juliae ānulum dōnat.",
      exampleGloss: "Mark presents Julia with a ring."
    },
    {
      latin: "pūpa",
      forms: "pūpae, f.",
      pos: "noun (1st decl.)",
      gloss: "doll",
      example: "Pūpa nova Paulae placet.",
      exampleGloss: "The new doll pleases Paula."
    },
    {
      latin: "nāvicula",
      forms: "nāviculae, f.",
      pos: "noun (1st decl.)",
      gloss: "little ship, boat",
      example: "Quinn nāviculam parvam habet.",
      exampleGloss: "Quinn has a little boat."
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
      example: "Toga dominī magna est.",
      exampleGloss: "The master’s toga is big."
    },
    {
      latin: "concha",
      forms: "conchae, f.",
      pos: "noun (1st decl.)",
      gloss: "seashell",
      example: "Paula conchās pulchrās habet.",
      exampleGloss: "Paula has pretty seashells."
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
      example: "Mōnstrum est magnum, sed Paula nōn clāmat.",
      exampleGloss: "The monster is big, but Paula does not cry out."
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
      example: "Avunculus puerō nāviculam dōnat.",
      exampleGloss: "The uncle presents the boy with a little ship."
    },
    {
      latin: "mōnstrō",
      forms: "mōnstrāre, mōnstrāvī, mōnstrātum",
      pos: "verb (1st conj.)",
      gloss: "show, point out",
      example: "Ted puerīs gemmās mōnstrat.",
      exampleGloss: "Ted shows the children the gems."
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
      example: "Quinn avunculō respondet.",
      exampleGloss: "Quinn answers his uncle."
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
      example: "Ted prīmum puellae dōnum dat.",
      exampleGloss: "First, Ted gives the girl a gift."
    },
    {
      latin: "etiam",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "also, even",
      example: "Etiam Lupo dōnum optat!",
      exampleGloss: "Even Lupo wants a gift!"
    }
  ],

  readings: [
    {
      title: "Arca avunculī",
      intro: "Uncle Ted arrives from the harbor with a mysterious chest — and the whole household comes running.",
      paragraphs: [
        "Familia Fabia laeta est, quod Ted domum intrat. Ted, avunculus puerōrum, est nauta et magister nāvis. Magnam arcam portat. Mark Juliaque avunculum salūtant, puerī clāmant, etiam Lupo lātrat.",
        "«Ecce arca!» inquit Ted. «Arca plēna dōnōrum est.» Quinn et Paula arcam spectant; arca puerīs grāta est.",
        "Ted prīmum puellae dōnum dat: pūpa nova est! Pūpa Paulae placet; puella laeta pūpam tenet. Deinde avunculus fīliō nāviculam dōnat. Nāvicula puerō placet, quod Quinn vītam nautārum amat."
      ],
      glosses: {
        "familia": "family, household",
        "fabia": "Fabian — the family’s name («familia Fabia» = the Fabius household)",
        "laeta": "happy (describing «familia»)",
        "est": "is",
        "quod": "because",
        "ted": "Ted (Julia’s brother, a ship’s captain — his name never changes form)",
        "domum": "the house (acc. — object of «intrat»)",
        "intrat": "(he) enters, is coming into",
        "avunculus": "uncle (a mother’s brother)",
        "puerōrum": "of the children (gen. pl. — «avunculus puerōrum» = the children’s uncle)",
        "nauta": "a sailor",
        "et": "and",
        "magister": "master, captain",
        "nāvis": "of a ship (gen. sg. — «magister nāvis» = ship’s captain)",
        "magnam": "big (acc., describing «arcam»)",
        "arcam": "chest, strongbox (acc.)",
        "portat": "(he) carries",
        "mark": "Mark (the father — his name never changes form)",
        "juliaque": "and Julia (the mother — her name declines like «puella»; + ‑que)",
        "avunculum": "the uncle (acc.)",
        "puerī": "the children (nom. pl.)",
        "salūtant": "(they) greet",
        "clāmant": "(they) shout",
        "etiam": "even, also",
        "lupo": "Lupo (the dog — «quasi lupus»! his name never changes form)",
        "lātrat": "(he) barks — a new word for the occasion",
        "ecce": "look! behold!",
        "arca": "the chest (nom.)",
        "inquit": "says (used with quoted speech)",
        "plēna": "full (+ gen.)",
        "dōnōrum": "of gifts (gen. pl.)",
        "quinn": "Quinn (the son, 12 — his name never changes form)",
        "paula": "Paula (the daughter, 8 — her name declines like «puella»)",
        "spectant": "(they) look at, stare at",
        "puerīs": "to the children (dat. pl. — welcome *to* them)",
        "grāta": "welcome, pleasing (+ dat.)",
        "prīmum": "first (adverb)",
        "puellae": "to the girl (dat. sg.)",
        "dōnum": "a gift (acc.)",
        "dat": "(he) gives",
        "pūpa": "a doll (nom.)",
        "nova": "new",
        "paulae": "to Paula (dat. — the doll pleases *Paula*)",
        "placet": "is pleasing (to) — takes the dative",
        "puella": "the girl (nom.)",
        "pūpam": "the doll (acc.)",
        "tenet": "(she) holds",
        "deinde": "then, next",
        "fīliō": "to the son (dat. — the family’s boy, Quinn)",
        "nāviculam": "a little ship, toy boat (acc.)",
        "dōnat": "(he) presents, gives as a gift",
        "nāvicula": "the little ship (nom.)",
        "puerō": "to the boy (dat.)",
        "vītam": "the life (acc.)",
        "nautārum": "of sailors (gen. pl.)",
        "amat": "(he) loves"
      },
      translation: [
        "The Fabius family is happy, because Ted is coming into the house. Ted, the children’s uncle, is a sailor and a ship’s captain. He is carrying a big chest. Mark and Julia greet the uncle, the children shout, even Lupo barks.",
        "«Look — a chest!» says Ted. «The chest is full of gifts.» Quinn and Paula stare at the chest; the chest is welcome to the children.",
        "First Ted gives the girl a gift: it is a new doll! The doll pleases Paula; the happy girl holds her doll. Then the uncle presents the son with a little ship. The little ship pleases the boy, because Quinn loves the life of sailors."
      ],
      questions: [
        {
          q: "Why is the family happy at the start of the reading?",
          options: ["Lupo has finally stopped barking", "Uncle Ted is coming into the house", "Mark has sold all his grain", "The children are leaving for school"],
          answer: 1,
          explain: "«laeta est, quod Ted domum intrat» — «quod» gives the reason: Ted is arriving."
        },
        {
          q: "In «arca puerīs grāta est», what does «puerīs» tell you?",
          options: ["The children own the chest", "The chest is welcome to the children", "The children are carrying the chest", "The chest is full of children"],
          answer: 1,
          explain: "«puerīs» is dative plural — «grātus» takes a dative: pleasing or welcome *to* someone."
        },
        {
          q: "Who receives the new doll?",
          options: ["Julia", "Quinn", "Paula", "Lupo"],
          answer: 2,
          explain: "«puellae dōnum dat … pūpa Paulae placet» — the girl, Paula, gets the doll, and it pleases her."
        },
        {
          q: "Why does the little ship please Quinn?",
          options: ["Because it is full of gems", "Because he loves the life of sailors", "Because Paula wants it too", "Because it once belonged to Ted"],
          answer: 1,
          explain: "«quod Quinn vītam nautārum amat» — because Quinn loves the life of sailors."
        }
      ]
    },
    {
      title: "Dōna et fābula",
      intro: "The grown-ups get their gifts, Ted tells a pirate story, and Lupo receives a present of his own.",
      paragraphs: [
        "Deinde Ted patrī togam novam dat; toga virō placet. Juliae gemmam pretiōsam ānulumque dōnat. Gemma ānulusque dominae placent; Julia laeta frātrī grātiam habet. Etiam servīs ancillīsque Ted tunicās novās dat. Servī laetī sunt et nautae grātiam habent.",
        "Mox puerī clāmant: «Fābulam! Fābulam!» Ted puerīs fābulam pīrātārum nārrat: pīrāta malus gemmās mercātōris rapit, sed subitō mōnstrum magnum nāviculam pīrātae dēvorat! Paula clāmat; fābula tamen puellae placet. «Mōnstra nōn sunt!» inquit Julia. Sed Ted sorōrī respondet: «Mōnstra sunt — et magna sunt!»",
        "Etiam Lupo dōnum exspectat! Ted canī botulum magnum dat. Canis botulum nōn spectat — subitō dēvorat. Familia rīdet. Dōna fābulaeque familiam dēlectant; puerī avunculō bonō grātiam habent, et domus Fabia plēna gaudiī est."
      ],
      glosses: {
        "deinde": "then, next",
        "ted": "Ted (the uncle)",
        "patrī": "to the father (dat. — «pater», like «soror», is a 3rd-declension noun: its dative ends in ‑ī)",
        "togam": "a toga (acc.)",
        "novam": "new (acc.)",
        "dat": "(he) gives",
        "toga": "the toga (nom.)",
        "virō": "the man (dat. — pleasing *to the man*)",
        "placet": "is pleasing (to) — takes the dative",
        "juliae": "to Julia (dat. — her name declines like «puella»)",
        "gemmam": "a gem (acc.)",
        "pretiōsam": "precious (acc.)",
        "ānulumque": "and a ring (acc. + ‑que)",
        "dōnat": "(he) presents, gives as a gift",
        "gemma": "the gem (nom.)",
        "ānulusque": "and the ring (nom. + ‑que)",
        "dominae": "to the lady of the house (dat.)",
        "placent": "are pleasing (to) — plural of «placet»",
        "julia": "Julia (the mother)",
        "laeta": "happy, delighted",
        "frātrī": "toward her brother (dat. — another 3rd-declension ‑ī dative; with «grātiam habet»)",
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
        "nautae": "toward the sailor (dat. sg. — they are grateful *to* Ted)",
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
        "paula": "Paula (the daughter, 8)",
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
        "lupo": "Lupo (the dog — quasi lupus, but not the wolf of the fables!)",
        "dōnum": "a gift (acc.)",
        "exspectat": "(he) awaits, is waiting for",
        "canī": "to the dog (dat. — «canis» also marks its dative with ‑ī)",
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
        "Then Ted gives the father a new toga; the toga pleases the man. To Julia he presents a precious gem and a ring. The gem and the ring please the lady of the house; Julia, delighted, is grateful to her brother. Ted even gives the slaves and the maidservants new tunics. The slaves are happy and are grateful to the sailor.",
        "Soon the children are shouting: «A story! A story!» Ted tells the children a story of pirates: a wicked pirate seizes a merchant’s gems, but suddenly a huge monster devours the pirate’s boat! Paula screams — yet the story pleases the girl. «Monsters do not exist!» says Julia. But Ted answers his sister: «Monsters do exist — and they are big!»",
        "Even Lupo is waiting for a gift! Ted gives the dog a big sausage. The dog does not look at the sausage — he devours it on the spot. The family laughs. The gifts and the stories delight the family; the children are grateful to their good uncle, and the Fabius house is full of joy."
      ],
      questions: [
        {
          q: "What does Ted present to Julia?",
          options: ["A new toga", "A precious gem and a ring", "A little ship", "New tunics"],
          answer: 1,
          explain: "«Juliae gemmam pretiōsam ānulumque dōnat» — to Julia (dative) he gives a precious gem and a ring."
        },
        {
          q: "In «toga virō placet», which word names the person who is pleased?",
          options: ["toga", "virō", "placet", "None — no person is mentioned"],
          answer: 1,
          explain: "«virō» is dative: the toga is pleasing *to the man*, Mark. With «placeō», the person pleased always sits in the dative."
        },
        {
          q: "In Ted’s story, what does the monster do?",
          options: ["It steals the merchant’s gems", "It rescues the wicked pirate", "It devours the pirate’s boat", "It frightens Julia away"],
          answer: 2,
          explain: "«mōnstrum magnum nāviculam pīrātae dēvorat» — the huge monster devours the pirate’s little ship."
        },
        {
          q: "How does Lupo handle his present?",
          options: ["He devours the sausage on the spot", "He buries it in the garden", "He shows it to the children", "He refuses to touch it"],
          answer: 0,
          explain: "«botulum nōn spectat — subitō dēvorat» — he does not even look at it; he devours it immediately."
        }
      ]
    }
  ],

  quiz: [
    {
      prompt: "In «Ted puellae dōnum dat», who receives the gift?",
      options: ["Ted", "The girl", "The gift", "No one — nothing is received"],
      answer: 1,
      explain: "«puellae» is dative — the receiving case. Ted gives the gift *to the girl*."
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
      explain: "«pūpa» is a doll — Paula’s new treasure. The little boat is «nāvicula», the seashell «concha», the ring «ānulus»."
    },
    {
      prompt: "In «Julia nautae grātiam habet», what is Julia doing?",
      options: ["Giving the sailor a present", "Telling the sailor a story", "Feeling grateful to the sailor", "Asking the sailor for money"],
      answer: 2,
      explain: "«grātiam habēre» + dative is an idiom: to feel gratitude toward someone. Julia is grateful to the sailor — her brother Ted. And «nautae» here is dative, not genitive: the verb decides."
    },
    {
      prompt: "In «Mark fīliae gemmam mōnstrat», which word is the thing being shown?",
      options: ["Mark", "fīliae", "gemmam", "mōnstrat"],
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
