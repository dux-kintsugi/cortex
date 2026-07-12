registerUnit({
  id: 2,
  stage: 1,
  title: "Domus et Hortus",
  tagline: "First and second declension plurals, matching adjectives, and the clip-on «-que»",

  grammar: [
    {
      heading: "Noun families: two declensions",
      body: "<p>Latin nouns come in families called <strong>declensions</strong>. You have already met the first family without knowing it: words like <span class=\"la\">puella</span>, <span class=\"la\">familia</span>, and this unit's <span class=\"la\">rosa</span> and <span class=\"la\">porta</span> end in <span class=\"la\">-a</span>. That is the <strong>first declension</strong>, and its nouns are mostly feminine.</p><p>The <strong>second declension</strong> has two looks. Masculine nouns end in <span class=\"la\">-us</span> — <span class=\"la\">hortus</span>, <span class=\"la\">mūrus</span>, <span class=\"la\">amīcus</span>, <span class=\"la\">dominus</span>. Neuter nouns end in <span class=\"la\">-um</span> — <span class=\"la\">ātrium</span>, <span class=\"la\">cubiculum</span>. The payoff for a reader is simple: the ending on a new noun files it into a family, and the family tells you what every other form of that noun will look like.</p><p>One more idea before the tour begins: Latin sorts every noun — even things — into <strong>masculine</strong>, <strong>feminine</strong>, or <strong>neuter</strong> (Latin for ‘neither’). This is grammar bookkeeping, not biology: a table is feminine, a garden masculine, a war neuter. Vocabulary entries mark this with <em>m.</em>, <em>f.</em>, or <em>n.</em>, and it will matter soon, because adjectives dress to match the gender of their noun.</p>",
      table: {
        caption: "Nominative singular: the three shapes",
        headers: ["Family", "Ending", "Examples"],
        rows: [
          ["1st declension (mostly fem.)", "-a", "rosa, mēnsa, fenestra"],
          ["2nd declension (masc.)", "-us", "hortus, lectus, amīcus"],
          ["2nd declension (neut.)", "-um", "ātrium, cubiculum"]
        ]
      },
      tip: "Reading tip: when a new noun walks in, glance at its ending — -a, -us, or -um tells you which family it belongs to, and each family behaves predictably."
    },
    {
      heading: "One rose, many roses",
      body: "<p>To say <em>more than one</em>, Latin changes the noun's ending — no extra word needed. First declension <span class=\"la\">-a</span> becomes <span class=\"la\">-ae</span>: <span class=\"la\">rosa</span> → <span class=\"la\">rosae</span>. Second declension <span class=\"la\">-us</span> becomes <span class=\"la\">-ī</span>: <span class=\"la\">hortus</span> → <span class=\"la\">hortī</span>. And neuter <span class=\"la\">-um</span> becomes <span class=\"la\">-a</span>: <span class=\"la\">cubiculum</span> → <span class=\"la\">cubicula</span>.</p><p>That last one is the classic trap: a neuter plural like <span class=\"la\">cubicula</span> ends in <span class=\"la\">-a</span>, exactly like a first-declension singular such as <span class=\"la\">terra</span>. Don't panic — the verb referees the match. <span class=\"la\">Terra bona est</span>: one thing, so <span class=\"la\">est</span>. <span class=\"la\">Cubicula parva sunt</span>: several things, so <span class=\"la\">sunt</span>.</p><p>One housekeeping note: the little <em>gen.</em> form on the vocabulary cards — <span class=\"la\">hortus, gen. hortī</span> — is a <strong>different</strong> thing from these plurals. It is the dictionary's fingerprint for the noun, and we will explain it properly in Unit V. For now, plurals are the story.</p>",
      table: {
        caption: "Nominative singular → plural",
        headers: ["Singular", "Plural", "Meaning"],
        rows: [
          ["rosa", "rosae", "rose → roses"],
          ["hortus", "hortī", "garden → gardens"],
          ["cubiculum", "cubicula", "bedroom → bedrooms"]
        ]
      },
      tip: "«est» means one, «sunt» means more than one. When an -a word confuses you, let the verb settle it."
    },
    {
      heading: "Adjectives dress to match",
      body: "<p>You met describing words in unit 1: <span class=\"la\">Paula laeta est</span>. Here is the family secret: an adjective copies the ending style of its noun. <span class=\"la\">Hortus magnus est</span>. <span class=\"la\">Rosa pulchra est</span>. <span class=\"la\">Ātrium magnum est</span>. In the plural, the adjective goes plural too: <span class=\"la\">lectī novī sunt</span>, <span class=\"la\">rosae pulchrae sunt</span>, <span class=\"la\">cubicula parva sunt</span>.</p><p>One wardrobe note: <span class=\"la\">pulcher</span> (beautiful) hides its <span class=\"la\">-us</span>, but its other forms are perfectly regular — <span class=\"la\">pulchra</span>, <span class=\"la\">pulchrum</span>. And remember: you never have to build these forms yourself. Your only job as a reader is to notice the rhyme — matching endings mean the words belong together.</p>",
      tip: "When «est» or «sunt» links a noun to a matching adjective, the sentence is describing something: X est Y — ‘X is Y’."
    },
    {
      heading: "«-que»: the clip-on ‘and’",
      body: "<p>Latin has a second way to say ‘and’. Instead of putting <span class=\"la\">et</span> between two words, it can clip <span class=\"la\">-que</span> onto the <strong>end of the second word</strong>: <span class=\"la\">Quinn Paulaque</span> = <span class=\"la\">Quinn et Paula</span>, ‘Quinn and Paula’. Likewise <span class=\"la\">māter paterque</span>, ‘mother and father’.</p><p>Rome loved this little clip. The state's own name-stamp was <span class=\"la\">SPQR</span> — <span class=\"la\">Senātus Populusque Rōmānus</span>, ‘the Senate and People of Rome’. While we are collecting small words, meet <span class=\"la\">ecce</span>: it means ‘look!’ — the storyteller's finger pointing at whatever comes next.</p>",
      tip: "See a word ending in -que? Snip the -que off, say ‘and’ in front of what's left, and keep reading."
    }
  ],

  vocab: [
    {
      latin: "hortus",
      forms: "gen. hortī, m.",
      pos: "noun (2nd decl.)",
      gloss: "garden",
      example: "Hortus magnus est.",
      exampleGloss: "The garden is big."
    },
    {
      latin: "rosa",
      forms: "gen. rosae, f.",
      pos: "noun (1st decl.)",
      gloss: "rose",
      example: "Rosae pulchrae sunt.",
      exampleGloss: "The roses are beautiful."
    },
    {
      latin: "herba",
      forms: "gen. herbae, f.",
      pos: "noun (1st decl.)",
      gloss: "grass, plant",
      example: "Herbae multae sunt.",
      exampleGloss: "There are many plants."
    },
    {
      latin: "mēnsa",
      forms: "gen. mēnsae, f.",
      pos: "noun (1st decl.)",
      gloss: "table",
      example: "Mēnsa nova est.",
      exampleGloss: "The table is new."
    },
    {
      latin: "sella",
      forms: "gen. sellae, f.",
      pos: "noun (1st decl.)",
      gloss: "chair, seat",
      example: "Sellae parvae sunt.",
      exampleGloss: "The chairs are small."
    },
    {
      latin: "lectus",
      forms: "gen. lectī, m.",
      pos: "noun (2nd decl.)",
      gloss: "bed, couch",
      example: "Lectus novus est.",
      exampleGloss: "The bed is new."
    },
    {
      latin: "mūrus",
      forms: "gen. mūrī, m.",
      pos: "noun (2nd decl.)",
      gloss: "wall",
      example: "Mūrus magnus est.",
      exampleGloss: "The wall is big."
    },
    {
      latin: "porta",
      forms: "gen. portae, f.",
      pos: "noun (1st decl.)",
      gloss: "gate, door",
      example: "Porta magna nōn est.",
      exampleGloss: "The gate is not big."
    },
    {
      latin: "fenestra",
      forms: "gen. fenestrae, f.",
      pos: "noun (1st decl.)",
      gloss: "window",
      example: "Fenestrae parvae sunt.",
      exampleGloss: "The windows are small."
    },
    {
      latin: "culīna",
      forms: "gen. culīnae, f.",
      pos: "noun (1st decl.)",
      gloss: "kitchen",
      example: "Culīna plēna est.",
      exampleGloss: "The kitchen is full."
    },
    {
      latin: "ātrium",
      forms: "gen. ātriī, n.",
      pos: "noun (2nd decl., neut.)",
      gloss: "atrium, main hall",
      example: "Ātrium magnum est.",
      exampleGloss: "The atrium is large."
    },
    {
      latin: "cubiculum",
      forms: "gen. cubiculī, n.",
      pos: "noun (2nd decl., neut.)",
      gloss: "bedroom",
      example: "Cubicula parva sunt.",
      exampleGloss: "The bedrooms are small."
    },
    {
      latin: "aqua",
      forms: "gen. aquae, f.",
      pos: "noun (1st decl.)",
      gloss: "water",
      example: "Aqua bona est.",
      exampleGloss: "The water is good."
    },
    {
      latin: "terra",
      forms: "gen. terrae, f.",
      pos: "noun (1st decl.)",
      gloss: "earth, ground",
      example: "Terra bona est.",
      exampleGloss: "The soil is good."
    },
    {
      latin: "amīcus",
      forms: "gen. amīcī, m.",
      pos: "noun (2nd decl.)",
      gloss: "friend",
      example: "Amīcī laetī sunt.",
      exampleGloss: "The friends are happy."
    },
    {
      latin: "dominus",
      forms: "gen. dominī, m.",
      pos: "noun (2nd decl.)",
      gloss: "master of the house",
      example: "Mark dominus est.",
      exampleGloss: "Mark is the master of the house."
    },
    {
      latin: "domina",
      forms: "gen. dominae, f.",
      pos: "noun (1st decl.)",
      gloss: "mistress of the house",
      example: "Julia domina est.",
      exampleGloss: "Julia is the mistress of the house."
    },
    {
      latin: "-que",
      forms: "(enclitic)",
      pos: "conj. (enclitic)",
      gloss: "and (attached to word)",
      example: "Māter paterque laetī sunt.",
      exampleGloss: "Mother and father are happy."
    },
    {
      latin: "ecce",
      forms: "(indēcl.)",
      pos: "interjection",
      gloss: "look! behold!",
      example: "Ecce domus!",
      exampleGloss: "Look — the house!"
    },
    {
      latin: "pulcher",
      forms: "pulchra, pulchrum",
      pos: "adj. (1st/2nd decl.)",
      gloss: "beautiful, handsome",
      example: "Rosa pulchra est.",
      exampleGloss: "The rose is beautiful."
    },
    {
      latin: "novus",
      forms: "-a, -um",
      pos: "adj. (1st/2nd decl.)",
      gloss: "new",
      example: "Lectī novī sunt.",
      exampleGloss: "The beds are new."
    },
    {
      latin: "plēnus",
      forms: "-a, -um",
      pos: "adj. (1st/2nd decl.)",
      gloss: "full",
      example: "Culīna plēna est.",
      exampleGloss: "The kitchen is full."
    },
    {
      latin: "multī",
      forms: "multae, multa (pl.)",
      pos: "adj. (1st/2nd decl., pl.)",
      gloss: "many",
      example: "Multae fenestrae sunt.",
      exampleGloss: "There are many windows."
    },
    {
      latin: "fessus",
      forms: "-a, -um",
      pos: "adj. (1st/2nd decl.)",
      gloss: "tired",
      example: "Paula fessa est.",
      exampleGloss: "Paula is tired."
    },
    {
      latin: "īrātus",
      forms: "-a, -um",
      pos: "adj. (1st/2nd decl.)",
      gloss: "angry",
      example: "Domina īrāta est.",
      exampleGloss: "The mistress of the house is angry."
    }
  ],

  readings: [
    {
      title: "Domus Fabia",
      intro: "Quinn and Paula give you a tour of the family's house in Ostia.",
      paragraphs: [
        "Salvē! Ecce domus! Domus magna nōn est, sed bona pulchraque est. Hīc est familia Fabia: Mark et Julia, Quinn Paulaque, et Lupo canis. Mark dominus est, Julia domina est; Lupo nōn dominus, sed canis est.",
        "Ecce ātrium! Ātrium magnum pulchrumque est. Hīc sunt mēnsa sellaeque; mēnsa nova nōn est, sed magna. Fenestrae quoque multae sunt.",
        "Ecce culīna! Culīna parva sed plēna est. Lupo laetus est, nam culīna plēna est!",
        "Ecce cubicula! Cubicula parva sunt, sed lectī novī sunt. Ecce — lectus et Lupo! Ēheu! Canis fessus est: lectus iam plēnus est."
      ],
      glosses: {
        "salvē": "hello!",
        "ecce": "look! behold!",
        "domus": "the house",
        "magna": "big, large",
        "nōn": "not",
        "est": "is",
        "sed": "but",
        "bona": "good",
        "pulchraque": "and beautiful («pulchra» + -que)",
        "hīc": "here (adverb)",
        "familia": "family, household",
        "fabia": "Fabian — the family’s name",
        "mark": "Mark, the father — his name never changes form",
        "et": "and",
        "julia": "Julia, the mother — her name declines like «puella»",
        "quinn": "Quinn, the son (age 12)",
        "paulaque": "and Paula («Paula», the daughter, + -que)",
        "lupo": "Lupo, the family dog — his name plays on «lupus», ‘wolf’, but it never changes form",
        "canis": "dog",
        "dominus": "master of the house",
        "domina": "mistress of the house",
        "ātrium": "the atrium, the main hall",
        "magnum": "large (matching «ātrium»)",
        "pulchrumque": "and beautiful («pulchrum» + -que)",
        "sunt": "(they) are / there are",
        "mēnsa": "table",
        "sellaeque": "and chairs («sellae» + -que)",
        "nova": "new",
        "fenestrae": "windows (plural of «fenestra»)",
        "quoque": "also, too",
        "multae": "many",
        "culīna": "kitchen",
        "parva": "small",
        "plēna": "full",
        "laetus": "happy",
        "nam": "for, because",
        "cubicula": "bedrooms (plural of «cubiculum»)",
        "lectī": "beds (plural of «lectus»)",
        "novī": "new (plural, matching «lectī»)",
        "lectus": "bed",
        "ēheu": "oh no! alas!",
        "fessus": "tired",
        "iam": "now, already",
        "plēnus": "full (matching «lectus»)"
      },
      translation: [
        "Hello! Look — the house! The house is not big, but it is good and beautiful. Here is the Fabian family: Mark and Julia, Quinn and Paula, and the dog Lupo. Mark is the master of the house, Julia is the mistress; Lupo is not the master — he is the dog.",
        "Look — the atrium! The atrium is large and beautiful. Here are a table and chairs; the table is not new, but it is big. There are also many windows.",
        "Look — the kitchen! The kitchen is small but full. Lupo is happy, because the kitchen is full!",
        "Look — the bedrooms! The bedrooms are small, but the beds are new. Look — a bed, and Lupo! Oh no! The dog is tired: the bed is already full."
      ],
      questions: [
        {
          q: "Who is the master of the house?",
          options: ["Quinn", "Lupo", "Mark", "Paula"],
          answer: 2,
          explain: "«Mark dominus est» — Mark is the dominus, and Julia is the domina. Lupo, the text insists, is only the dog."
        },
        {
          q: "In «Hīc sunt mēnsa sellaeque», what does «sellaeque» mean?",
          options: ["and chairs", "of the chairs", "the chair (just one)", "little chairs"],
          answer: 0,
          explain: "Snip off the -que and say ‘and’: «sellaeque» = «et sellae», ‘and chairs’. The -ae ending shows it is plural."
        },
        {
          q: "Why is Lupo happy in the kitchen?",
          options: ["The kitchen is full", "The kitchen is new", "Julia is there", "The windows are big"],
          answer: 0,
          explain: "«Lupo laetus est, nam culīna plēna est» — the kitchen is full, and a full kitchen is Lupo's favorite kind."
        },
        {
          q: "At the end of the tour, why is the bed «plēnus» (full)?",
          options: ["It is piled with gifts", "Quinn is asleep in it", "Lupo is lying on it", "It is covered with roses"],
          answer: 2,
          explain: "«Ecce — lectus et Lupo! … lectus iam plēnus est» — the tired dog has already claimed the new bed."
        }
      ]
    },
    {
      title: "Hortus et Lupo",
      intro: "The tour ends in Julia's pride and joy, the garden — where Lupo has been busy.",
      paragraphs: [
        "Ecce hortus! Hortus parvus est, sed pulcher. Hīc mūrus magnus est, et porta nova. Hīc sunt herbae multae, aqua bona terraque bona. Sed ecce — rosae! Rosae pulchrae sunt. Julia laeta est: rosae novae sunt, et hortus plēnus est.",
        "Familia laeta est: Quinn Paulaque laetī sunt, Mark Juliaque quoque laetī sunt. Sed ubi est Lupo? Lupo hīc nōn est.",
        "Ecce Lupo! Et ecce — fossa! Fossa magna est. Terra hīc est, terra ibi est… et rosae? Ēheu! Rosae novae iam perditae sunt! Herbae quoque perditae sunt. Hortus pulcher iam fossa magna est!",
        "«Lupo! Lupo!» inquit Julia. Domina valdē īrāta est. Lupo iam laetus nōn est — canis fessus est. Sed Quinn Paulaque laetī sunt: fossa magna est, et Lupo amīcus bonus est! Māter īrāta est; pater quoque īrātus est… sed nōn valdē."
      ],
      glosses: {
        "ecce": "look! behold!",
        "hortus": "the garden",
        "parvus": "small",
        "est": "is",
        "sed": "but",
        "pulcher": "beautiful",
        "hīc": "here (adverb)",
        "mūrus": "wall",
        "magnus": "big, great",
        "et": "and",
        "porta": "gate",
        "nova": "new",
        "sunt": "(they) are / there are",
        "herbae": "plants (plural of «herba»)",
        "multae": "many",
        "aqua": "water",
        "bona": "good",
        "terraque": "and earth («terra» + -que)",
        "rosae": "roses (plural of «rosa»)",
        "pulchrae": "beautiful (plural, matching «rosae»)",
        "julia": "Julia, the mother",
        "laeta": "happy",
        "novae": "new (plural)",
        "plēnus": "full",
        "familia": "family, household",
        "quinn": "Quinn, the son",
        "paulaque": "and Paula («Paula» + -que)",
        "laetī": "happy (plural)",
        "mark": "Mark, the father",
        "juliaque": "and Julia («Julia» + -que)",
        "quoque": "also, too",
        "ubi": "where…? (part of the set phrase «ubi est …?», ‘where is …?’)",
        "lupo": "Lupo, the family dog",
        "nōn": "not",
        "fossa": "a hole, a pit",
        "magna": "big",
        "terra": "earth, soil",
        "ibi": "there (adverb)",
        "ēheu": "oh no! alas!",
        "iam": "now, already; «iam nōn» = no longer",
        "perditae": "ruined, destroyed (describing the roses and plants)",
        "inquit": "says (used with quoted speech)",
        "domina": "the mistress of the house",
        "valdē": "very, very much",
        "īrāta": "angry",
        "laetus": "happy",
        "canis": "dog",
        "fessus": "tired",
        "amīcus": "friend",
        "bonus": "good",
        "māter": "mother",
        "pater": "father",
        "īrātus": "angry (matching «pater»)"
      },
      translation: [
        "Look — the garden! The garden is small, but beautiful. Here there is a great wall, and a new gate. Here are many plants, good water, and good earth. But look — the roses! The roses are beautiful. Julia is happy: the roses are new, and the garden is full.",
        "The family is happy: Quinn and Paula are happy, and Mark and Julia are happy too. But where is Lupo? Lupo is not here.",
        "There is Lupo! And look — a hole! The hole is big. There is earth here, there is earth there… and the roses? Oh no! The new roses are already ruined! The plants are ruined too. The beautiful garden is now one big hole!",
        "«Lupo! Lupo!» says Julia. The mistress of the house is very angry. Lupo is no longer happy — the dog is tired. But Quinn and Paula are delighted: the hole is big, and Lupo is a good friend! Mother is angry; father is angry too… but not very."
      ],
      questions: [
        {
          q: "What is in the garden before Lupo gets to work?",
          options: ["Many plants, good water, and roses", "A fountain and statues", "Trees and birds", "A table and chairs"],
          answer: 0,
          explain: "«Hīc sunt herbae multae, aqua bona terraque bona. Sed ecce — rosae!» — plants, water, good earth, and Julia's new roses."
        },
        {
          q: "What has happened to Julia's new roses?",
          options: ["They are blooming beautifully", "They have been ruined", "Paula picked them", "They were moved inside"],
          answer: 1,
          explain: "«Rosae novae iam perditae sunt» — the new roses are now ruined, along with the plants, thanks to one very big hole."
        },
        {
          q: "In «Quinn Paulaque laetī sunt», why does the adjective end in -ī?",
          options: ["It agrees with the plural subject", "It shows possession", "It marks a question", "It is a spelling mistake"],
          answer: 0,
          explain: "«laetī» is nominative plural, matching the two-person subject «Quinn Paulaque» — and «sunt» confirms the plural."
        },
        {
          q: "How does the family react to the hole?",
          options: ["Everyone is furious", "Everyone laughs", "Julia is very angry, but the children are delighted", "Only Lupo is upset"],
          answer: 2,
          explain: "«Domina valdē īrāta est … sed Quinn Paulaque laetī sunt». Mark is angry too — «sed nōn valdē», but not very."
        }
      ]
    }
  ],

  quiz: [
    {
      prompt: "Which of these nouns is plural?",
      options: ["porta", "mēnsa", "rosae", "hortus"],
      answer: 2,
      explain: "«rosae» carries the first-declension plural ending -ae. The others are all nominative singulars."
    },
    {
      prompt: "«Cubicula parva sunt.» How many bedrooms are there?",
      options: ["Exactly one", "More than one", "None", "The sentence doesn’t say"],
      answer: 1,
      explain: "«cubicula» is the plural of «cubiculum» (-um → -a), and the verb «sunt» confirms a plural subject."
    },
    {
      prompt: "Which pair follows the singular → plural pattern correctly?",
      options: ["hortus → hortae", "fenestra → fenestrī", "lectus → lectī", "ātrium → ātriī"],
      answer: 2,
      explain: "Second-declension -us nouns go to -ī: «lectus → lectī». «fenestra» becomes «fenestrae», «hortus» becomes «hortī», and «ātrium» becomes «ātria»."
    },
    {
      prompt: "The ending -a can trick you. Which of these -a words is actually a plural?",
      options: ["domina", "cubicula", "terra", "aqua"],
      answer: 1,
      explain: "«cubicula» is the plural of the neuter «cubiculum». First-declension singulars like «terra» end in -a too — when in doubt, check the verb: «terra est», «cubicula sunt»."
    },
    {
      prompt: "In «Puella laeta est, puerī laetī sunt», why does the adjective change from «laeta» to «laetī»?",
      options: ["The adjective agrees with each noun", "Latin adjectives change at random", "«laetī» is a different word meaning ‘sad’", "The second sentence is a question"],
      answer: 0,
      explain: "Adjectives dress to match: «laeta» matches the singular «puella», «laetī» matches the plural «puerī»."
    },
    {
      prompt: "What does «māter paterque» mean?",
      options: ["mother or father", "and the mother’s father", "mother and father", "the father’s mother"],
      answer: 2,
      explain: "-que clips onto the second word and means ‘and’: «māter paterque» = «māter et pater», ‘mother and father’."
    },
    {
      prompt: "In «Fenestrae multae sunt, sed parvae», what do we learn about the windows?",
      options: ["There are many small windows", "There is one big window", "There are few windows", "The windows are new"],
      answer: 0,
      explain: "«multae» = many and «parvae» = small, both plural to match «fenestrae»: many windows, but small ones."
    },
    {
      prompt: "Which sentence means ‘The gates are new’?",
      options: ["Porta nova est.", "Portae novae sunt.", "Porta novae est.", "Portae nova sunt."],
      answer: 1,
      explain: "Plural subject «portae» needs the plural adjective «novae» and the plural verb «sunt». The other versions break the agreement."
    }
  ]
});
