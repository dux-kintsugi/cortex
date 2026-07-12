registerUnit({
  id: 18,
  stage: 2,
  title: "Quot?",
  tagline: "Numbers, Roman numerals, and the grammar of time",

  grammar: [
    {
      heading: "Counting to ten (and who declines)",
      body: "<p>Paula counts everything in this unit, so you will be counting too. The good news: most Latin numbers never change their endings. From <span class=\"la\">quattuor</span> to <span class=\"la\">decem</span> they are frozen — <span class=\"la\">quattuor saccī</span>, <span class=\"la\">quattuor saccōs</span>, <span class=\"la\">quattuor saccōrum</span>: the same four every time. The noun beside the number carries all the case information, so read the noun’s ending exactly as you always have.</p><p>Only the first three numbers dress to match their nouns. <span class=\"la\">ūnus, ūna, ūnum</span> behaves like an ordinary adjective; <span class=\"la\">duo</span> and <span class=\"la\">trēs</span> have a few forms of their own: <span class=\"la\">duo puerī</span> but <span class=\"la\">duae puellae</span>; <span class=\"la\">trēs hōrae</span> but <span class=\"la\">tria templa</span>. When you meet <span class=\"la\">duās</span> or <span class=\"la\">tria</span>, don’t reach for the dictionary — it is just two or three, dressed to agree with its noun.</p>",
      table: {
        caption: "The cardinal numbers 1–10",
        headers: ["Arabic", "Roman", "Latin"],
        rows: [
          ["1", "I", "ūnus, ūna, ūnum"],
          ["2", "II", "duo, duae, duo"],
          ["3", "III", "trēs, tria"],
          ["4", "IV", "quattuor"],
          ["5", "V", "quīnque"],
          ["6", "VI", "sex"],
          ["7", "VII", "septem"],
          ["8", "VIII", "octō"],
          ["9", "IX", "novem"],
          ["10", "X", "decem"]
        ]
      },
      tip: "Reading tip: from «quattuor» all the way to «centum», numbers never decline — let the noun next door tell you the case."
    },
    {
      heading: "Tens, hundreds, and how Romans wrote them",
      body: "<p>The tens are easy to spot: after <span class=\"la\">vīgintī</span> (20) they all end in <span class=\"la\">-gintā</span> — <span class=\"la\">trīgintā</span> 30, <span class=\"la\">quadrāgintā</span> 40, <span class=\"la\">quīnquāgintā</span> 50, <span class=\"la\">sexāgintā</span> 60, <span class=\"la\">septuāgintā</span> 70, <span class=\"la\">octōgintā</span> 80, <span class=\"la\">nōnāgintā</span> 90. Then come <span class=\"la\">centum</span> (100) and <span class=\"la\">mīlle</span> (1,000), both frozen solid. In-between numbers simply line up: <span class=\"la\">vīgintī quīnque</span>, twenty-five.</p><p>Written numbers use seven letters. Read them left to right, adding as you go: <span class=\"la\">XVII</span> is 10 + 5 + 1 + 1 = 17. One twist: a smaller value placed <em>before</em> a larger one subtracts. <span class=\"la\">IV</span> is 4, <span class=\"la\">IX</span> is 9, <span class=\"la\">XL</span> is 40, <span class=\"la\">XC</span> is 90. So when a merchant scratches <span class=\"la\">XC</span> onto a wax tablet, he is promising ninety sesterces — check the arithmetic before you shake hands.</p>",
      table: {
        caption: "The seven Roman numeral letters",
        headers: ["Symbol", "Value"],
        rows: [
          ["I", "1"],
          ["V", "5"],
          ["X", "10"],
          ["L", "50"],
          ["C", "100"],
          ["D", "500"],
          ["M", "1,000"]
        ]
      },
      tip: "Smaller-before-larger means subtract: IX = 9, XL = 40, XC = 90. Everything else just adds up, left to right."
    },
    {
      heading: "When? The ablative tells the time",
      body: "<p>Latin marks the time <em>at which</em> something happens with a bare ablative — no preposition at all. <span class=\"la\">prīmā hōrā</span>, at the first hour; <span class=\"la\">mediā nocte</span>, in the middle of the night; <span class=\"la\">hōc annō</span>, this year. When a time word (<span class=\"la\">hōra</span>, <span class=\"la\">nox</span>, <span class=\"la\">annus</span>, <span class=\"la\">mēnsis</span>, <span class=\"la\">tempus</span>) turns up in the ablative with nothing in front of it, read it as the answer to <em>when?</em></p><p>Hours take ordinal numbers — first, second, third: <span class=\"la\">prīmus</span>, <span class=\"la\">secundus</span>, <span class=\"la\">tertius</span>, <span class=\"la\">quārtus</span>… The Romans divided daylight into twelve hours starting at sunrise, so <span class=\"la\">prīmā hōrā</span> means early morning and <span class=\"la\">hōrā duodecimā</span> means sunset. A summer hour was longer than a winter hour: an hour was whatever the sun said it was, and nobody argued with the sun.</p>",
      table: {
        caption: "Time when — the bare ablative",
        headers: ["Latin", "English"],
        rows: [
          ["prīmā hōrā", "at the first hour (dawn)"],
          ["tertiā hōrā", "at the third hour (mid-morning)"],
          ["mediā nocte", "in the middle of the night"],
          ["hōc annō", "this year"],
          ["illō mēnse", "in that month"]
        ]
      },
      tip: "Reading tip: time word + ablative + no preposition = ‘when?’. It is a time-stamp on the sentence, not a prepositional phrase."
    },
    {
      heading: "How long? The accusative measures the stretch",
      body: "<p>Where the ablative pins an event to a point (<em>at</em> the first hour), the accusative measures a <em>stretch</em>: <span class=\"la\">duās hōrās clāmant</span> — they shout <em>for two hours</em>; <span class=\"la\">vīgintī annōs frūmentum vēndō</span> — I sell grain <em>for twenty years</em>. Again no preposition; the accusative alone does the work. And with <span class=\"la\">iam</span> plus a present tense, Latin says what English says with ‘have been …ing’: <span class=\"la\">iam decem annōs in urbe habitō</span> — I have been living in the city for ten years now.</p><p>Don’t confuse this bare accusative with <span class=\"la\">post</span> and <span class=\"la\">ante</span>, which also take the accusative but mean <em>after</em> and <em>before</em>: <span class=\"la\">post duās hōrās</span>, after two hours; <span class=\"la\">ante cēnam</span>, before dinner. Finally, meet the question-and-answer pair <span class=\"la\">quot?</span> (how many?) and <span class=\"la\">tot</span> (so many) — both frozen, both standing right next to a plain noun: <span class=\"la\">quot saccōs habēs?</span></p>",
      table: {
        caption: "Point, stretch, or preposition?",
        headers: ["Latin", "Construction", "English"],
        rows: [
          ["tertiā hōrā", "ablative — a point", "at the third hour"],
          ["trēs hōrās", "accusative — a stretch", "for three hours"],
          ["iam trēs annōs habitō", "iam + acc. + present", "I have been living (there) for three years now"],
          ["post trēs hōrās", "post + acc.", "after three hours"],
          ["ante prīmam hōram", "ante + acc.", "before the first hour"]
        ]
      },
      tip: "Ablative = a dot on the timeline; bare accusative = a line segment; post/ante tell you which side of the dot you are on."
    }
  ],

  vocab: [
    {
      latin: "ūnus",
      forms: "ūna, ūnum",
      pos: "numeral (adj.)",
      gloss: "one",
      example: "Ūnus canis in hortō dormit.",
      exampleGloss: "One dog is sleeping in the garden."
    },
    {
      latin: "duo",
      forms: "duae, duo",
      pos: "numeral (adj.)",
      gloss: "two",
      example: "Duae puellae in viā cantant.",
      exampleGloss: "Two girls are singing in the street."
    },
    {
      latin: "trēs",
      forms: "tria",
      pos: "numeral (adj.)",
      gloss: "three",
      example: "Tria māla in mēnsā sunt.",
      exampleGloss: "There are three apples on the table."
    },
    {
      latin: "quattuor",
      forms: "(indēcl.)",
      pos: "numeral",
      gloss: "four",
      example: "Equus quattuor pedēs habet.",
      exampleGloss: "A horse has four feet."
    },
    {
      latin: "quīnque",
      forms: "(indēcl.)",
      pos: "numeral",
      gloss: "five",
      example: "Paula quīnque sēstertiōs habet.",
      exampleGloss: "Paula has five sesterces."
    },
    {
      latin: "sex",
      forms: "(indēcl.)",
      pos: "numeral",
      gloss: "six",
      example: "In caupōnā sex sellae sunt.",
      exampleGloss: "There are six chairs in the inn."
    },
    {
      latin: "septem",
      forms: "(indēcl.)",
      pos: "numeral",
      gloss: "seven",
      example: "Rōma septem montēs habet.",
      exampleGloss: "Rome has seven hills."
    },
    {
      latin: "octō",
      forms: "(indēcl.)",
      pos: "numeral",
      gloss: "eight",
      example: "Templum octō columnās habet.",
      exampleGloss: "The temple has eight columns."
    },
    {
      latin: "novem",
      forms: "(indēcl.)",
      pos: "numeral",
      gloss: "nine",
      example: "Novem nautae in nāve labōrant.",
      exampleGloss: "Nine sailors are working on the ship."
    },
    {
      latin: "decem",
      forms: "(indēcl.)",
      pos: "numeral",
      gloss: "ten",
      example: "Decem hominēs in tabernā sedent.",
      exampleGloss: "Ten people are sitting in the shop."
    },
    {
      latin: "vīgintī",
      forms: "(indēcl.)",
      pos: "numeral",
      gloss: "twenty",
      example: "Iam vīgintī annōs Mark mercātor est.",
      exampleGloss: "Mark has been a merchant for twenty years now."
    },
    {
      latin: "centum",
      forms: "(indēcl.)",
      pos: "numeral",
      gloss: "one hundred",
      example: "In nāve centum amphorae sunt.",
      exampleGloss: "There are a hundred amphorae on the ship."
    },
    {
      latin: "mīlle",
      forms: "(indēcl. in sg.)",
      pos: "numeral",
      gloss: "one thousand",
      example: "In urbe Rōmā mīlle viae sunt!",
      exampleGloss: "In the city of Rome there are a thousand streets!"
    },
    {
      latin: "prīmus",
      forms: "-a, -um",
      pos: "numeral (ordinal adj.)",
      gloss: "first",
      example: "Prīmā hōrā familia iam labōrat.",
      exampleGloss: "At the first hour the family is already at work."
    },
    {
      latin: "quot",
      forms: "(indēcl.)",
      pos: "adjective (interrogative)",
      gloss: "how many?",
      example: "Quot asinōs in viā vidēs?",
      exampleGloss: "How many donkeys do you see in the street?"
    },
    {
      latin: "tot",
      forms: "(indēcl.)",
      pos: "adjective",
      gloss: "so many",
      example: "Tot hominēs numerāre nōn possum!",
      exampleGloss: "I cannot count so many people!"
    },
    {
      latin: "hōra",
      forms: "hōrae, f.",
      pos: "noun (1st decl.)",
      gloss: "hour",
      example: "Quinn trēs hōrās in lūdō sedet.",
      exampleGloss: "Quinn sits in school for three hours."
    },
    {
      latin: "annus",
      forms: "annī, m.",
      pos: "noun (2nd decl.)",
      gloss: "year",
      example: "Hōc annō familia in urbe Rōmā est.",
      exampleGloss: "This year the family is in the city of Rome."
    },
    {
      latin: "mēnsis",
      forms: "mēnsis, m.",
      pos: "noun (3rd decl.)",
      gloss: "month",
      example: "Post ūnum mēnsem familia domum venit.",
      exampleGloss: "After one month the family comes home."
    },
    {
      latin: "tempus",
      forms: "temporis, n.",
      pos: "noun (3rd decl., neuter)",
      gloss: "time",
      example: "Tempus fugit!",
      exampleGloss: "Time flies!"
    },
    {
      latin: "pretium",
      forms: "pretiī, n.",
      pos: "noun (2nd decl., neuter)",
      gloss: "price",
      example: "Pretium frūmentī magnum nōn est.",
      exampleGloss: "The price of the grain is not high."
    },
    {
      latin: "sēstertius",
      forms: "sēstertiī, m.",
      pos: "noun (2nd decl.)",
      gloss: "sesterce (coin)",
      example: "Mercātor Paulae ūnum sēstertium dat.",
      exampleGloss: "The merchant gives Paula one sesterce."
    },
    {
      latin: "numerō",
      forms: "numerāre, numerāvī, numerātum",
      pos: "verb (1st conj.)",
      gloss: "count",
      example: "Paula nāvēs in portū numerat.",
      exampleGloss: "Paula counts the ships in the harbor."
    },
    {
      latin: "post",
      forms: "(+ acc.)",
      pos: "preposition",
      gloss: "after, behind",
      example: "Post cēnam canis Lupo statim dormit.",
      exampleGloss: "After dinner the dog Lupo immediately goes to sleep."
    },
    {
      latin: "ante",
      forms: "(+ acc.)",
      pos: "preposition",
      gloss: "before, in front of",
      example: "Ante portam asinus stat.",
      exampleGloss: "A donkey is standing in front of the gate."
    }
  ],

  readings: [
    {
      title: "Paula omnia numerat",
      intro: "Mark has grain to sell in Rome — and Paula, who counts everything she sees, insists on coming along.",
      paragraphs: [
        "Prīmā hōrā Mark et Paula per viās urbis ambulant. Mark hodiē frūmentum suum vēndere cupit; mercātor enim Rōmānus centum saccōs frūmentī emere optat. Paula cum patre ambulat, quod numerāre amat. Puella omnia numerat!",
        "«Ecce, pater!» inquit Paula. «In hāc viā decem tabernās videō et vīgintī asinōs!» Deinde puella columnās templī numerat: «Ūna, duae, trēs, quattuor, quīnque, sex, septem, octō — octō columnae!» Mark rīdet et rogat: «Quot hominēs in forō sunt?» «Tot hominēs numerāre nōn possum, pater! Fortasse mīlle sunt!»",
        "Post duās hōrās ad forum veniunt. Ibi mercātor Rōmānus, vir magnus, iam patrem exspectat. «Salvē, Mark!» inquit. «Quot saccōs frūmentī habēs?» «Centum saccōs habeō,» respondet Mark. «Frūmentum meum optimum est: melius frūmentum in urbe nōn est!»"
      ],
      glosses: {
        "prīmā": "first (abl. — «prīmā hōrā», at the first hour: dawn)",
        "hōrā": "hour (abl. of time when — answers ‘when?’)",
        "mark": "Mark (the father, a grain merchant — his name never changes form)",
        "et": "and",
        "paula": "Paula (his daughter, eight years old)",
        "per": "through (+ acc.)",
        "viās": "the streets (acc. pl. after «per»)",
        "urbis": "of the city (gen.)",
        "ambulant": "(they) walk",
        "hodiē": "today",
        "frūmentum": "grain (neuter — the same form serves as subject and object)",
        "suum": "his own (agreeing with «frūmentum»)",
        "vēndere": "to sell (infinitive after «cupit»)",
        "cupit": "wants, desires",
        "mercātor": "a merchant (nom. — subject)",
        "enim": "for, you see (always second word in its sentence)",
        "rōmānus": "Roman",
        "centum": "one hundred (indeclinable)",
        "saccōs": "sacks (acc. pl. — object)",
        "frūmentī": "of grain (gen.)",
        "emere": "to buy (infinitive after «optat»)",
        "optat": "wishes, wants",
        "cum": "with (+ abl.)",
        "patre": "(her) father (abl. after «cum»)",
        "ambulat": "walks",
        "quod": "because",
        "numerāre": "to count (infinitive after «amat»)",
        "amat": "loves",
        "puella": "the girl",
        "omnia": "everything (neuter pl. of «omnis»)",
        "numerat": "counts",
        "ecce": "look!",
        "pater": "father! (vocative — she is calling to him)",
        "inquit": "says (used with quoted speech)",
        "in": "in (+ abl.)",
        "hāc": "this (abl. fem. — «in hāc viā», in this street)",
        "viā": "street (abl. after «in»)",
        "decem": "ten",
        "tabernās": "shops (acc. pl. — object)",
        "videō": "I see",
        "vīgintī": "twenty",
        "asinōs": "donkeys (acc. pl. — object)",
        "deinde": "then, next",
        "columnās": "the columns (acc. pl. — object)",
        "templī": "of a temple (gen.)",
        "ūna": "one (fem. — counting the «columnae»)",
        "duae": "two (fem.)",
        "trēs": "three",
        "quattuor": "four",
        "quīnque": "five",
        "sex": "six",
        "septem": "seven",
        "octō": "eight",
        "columnae": "columns (nom. pl.)",
        "rīdet": "laughs",
        "rogat": "asks",
        "quot": "how many? (indeclinable)",
        "hominēs": "people (-ēs is both nom. and acc. pl. — the verb decides which)",
        "forō": "the forum (abl. after «in»)",
        "sunt": "(they) are; there are",
        "tot": "so many (indeclinable)",
        "nōn": "not",
        "possum": "I can, I am able",
        "fortasse": "perhaps",
        "mīlle": "a thousand",
        "post": "after (+ acc.)",
        "duās": "two (fem. acc. — «post duās hōrās», after two hours)",
        "hōrās": "hours (acc. pl. after «post»)",
        "ad": "to (+ acc.)",
        "forum": "the forum (acc. after «ad»)",
        "veniunt": "(they) come",
        "ibi": "there",
        "vir": "a man (nom.)",
        "magnus": "big",
        "iam": "already",
        "patrem": "(her) father (acc. — the one being waited for)",
        "exspectat": "awaits, is waiting for",
        "salvē": "hello!",
        "habēs": "you (sg.) have",
        "habeō": "I have",
        "respondet": "answers, replies",
        "meum": "my (agreeing with «frūmentum»)",
        "optimum": "excellent, the best (superlative of «bonus»)",
        "est": "is",
        "melius": "better (neuter comparative of «bonus»)",
        "urbe": "the city (abl. after «in»)"
      },
      translation: [
        "At the first hour Mark and Paula are walking through the streets of the city. Today Mark wants to sell his grain, for a Roman merchant wishes to buy a hundred sacks of grain. Paula walks along with her father because she loves to count. The girl counts everything!",
        "«Look, father!» says Paula. «In this street I see ten shops and twenty donkeys!» Then the girl counts the columns of a temple: «One, two, three, four, five, six, seven, eight — eight columns!» Mark laughs and asks: «How many people are in the forum?» «I can’t count so many people, father! Maybe there are a thousand!»",
        "After two hours they come to the forum. There the Roman merchant, a big man, is already waiting for her father. «Hello, Mark!» he says. «How many sacks of grain do you have?» «I have a hundred sacks,» Mark replies. «My grain is excellent: there is no better grain in the city!»"
      ],
      questions: [
        {
          q: "Why does Paula come along with her father?",
          options: [
            "She wants to buy a new doll",
            "Because she loves to count — and counts everything she sees",
            "Julia sent her to keep an eye on Mark",
            "She is looking for Lupo, who has run off"
          ],
          answer: 1,
          explain: "«Paula cum patre ambulat, quod numerāre amat. Puella omnia numerat!» — she walks with her father because she loves counting."
        },
        {
          q: "In «Prīmā hōrā Mark et Paula ambulant», what does «prīmā hōrā» tell you?",
          options: [
            "How long they walk",
            "Where they are walking",
            "When they walk — at the first hour, around dawn",
            "How quickly they walk"
          ],
          answer: 2,
          explain: "A bare ablative on a time word answers ‘when?’ — at the first hour of the Roman day, just after sunrise."
        },
        {
          q: "How many columns does the temple turn out to have?",
          options: ["Six", "Seven", "Eight", "Ten"],
          answer: 2,
          explain: "Paula counts up to «octō — octō columnae!»: eight columns."
        },
        {
          q: "How does Mark answer the question «Quot saccōs frūmentī habēs?»",
          options: [
            "Twenty sacks, of poor quality",
            "A hundred sacks — and no better grain in the city",
            "A thousand sacks, already sold",
            "He refuses to say until he hears a price"
          ],
          answer: 1,
          explain: "«Centum saccōs habeō … melius frūmentum in urbe nōn est!» — a hundred sacks, and (he claims) the best grain in town."
        }
      ]
    },
    {
      title: "Pretium frūmentī",
      intro: "The haggling begins — and when the coins are finally counted out, only one person in the forum counts them correctly.",
      paragraphs: [
        "«Quantum est pretium?» rogat mercātor Rōmānus. «Centum saccī — centum sēstertiī!» respondet Mark. «Centum sēstertiī? Nimium est!» clāmat mercātor. «Tibi octōgintā sēstertiōs dō.» Mark caput movet: «Iam vīgintī annōs frūmentum vēndō, amīce; pretium bonum sciō.»",
        "Duās hōrās mercātōrēs dē pretiō clāmant. Tandem mercātor Rōmānus «Nōnāgintā sēstertiōs tibi dō» inquit, «nōn plūs!» «Bene,» respondet Mark. «Nōnāgintā sēstertiī mihi placent.» Mercātor numerum in tabulā scrībit: XC.",
        "Deinde mercātor Rōmānus sēstertiōs numerat et patrī dat. Sed Paula quoque pecūniam numerat. «Pater!» clāmat. «Hīc octōgintā septem sēstertiī sunt, nōn nōnāgintā! Trēs sēstertiī dēsunt!» Mercātor ērubēscit et trēs sēstertiōs addit. «Errāvī,» inquit. «Haec puella callidior est quam multī mercātōrēs! Quot annōs nāta es, puella?» «Octō annōs nāta sum!» respondet Paula. Mercātor rīdet et puellae ūnum sēstertium dōnat.",
        "Nocte familia in caupōnā sedet et Paula mātrī omnia nārrat. «Nunc quīnque sēstertiōs habeō, māter: quattuor et ūnum novum!» Julia rīdet. Quinn rogat: «Quandō domum redīmus, pater?» «Post ūnum mēnsem,» respondet Mark. Subitō canis Lupo botulum puerī rapit et dēvorat. «Ō Lupo!» clāmat puer īrātus. «Botulus meus erat!» Paula rīdet: «Nunc Lupo ūnum botulum habet, tū nūllum!»"
      ],
      glosses: {
        "quantum": "how much? how great? (from «quantus»)",
        "est": "is",
        "pretium": "the price (nom.)",
        "rogat": "asks",
        "mercātor": "the merchant (nom. — subject)",
        "rōmānus": "Roman",
        "centum": "a hundred (indeclinable)",
        "saccī": "sacks (nom. pl.)",
        "sēstertiī": "sesterces (nom. pl. — the everyday Roman coin)",
        "respondet": "answers, replies",
        "mark": "Mark (the father — his name never changes form)",
        "nimium": "too much",
        "clāmat": "shouts",
        "tibi": "to you (dat. of «tū»)",
        "octōgintā": "eighty",
        "sēstertiōs": "sesterces (acc. pl. — object)",
        "dō": "I give",
        "caput": "(his) head (acc. — object of «movet»)",
        "movet": "moves, shakes",
        "iam": "now, already (with present tense + acc. of time: ‘for … now’)",
        "vīgintī": "twenty",
        "annōs": "years (acc. of duration — ‘for … years’)",
        "frūmentum": "grain (acc. — object)",
        "vēndō": "I sell — here: I have been selling",
        "amīce": "friend! (vocative)",
        "bonum": "good (agreeing with «pretium»)",
        "sciō": "I know",
        "duās": "two (fem. acc. — «duās hōrās», for two hours)",
        "hōrās": "hours (acc. of duration — how long)",
        "mercātōrēs": "the merchants (nom. pl. — the two of them)",
        "dē": "about, concerning (+ abl.)",
        "pretiō": "the price (abl. after «dē»)",
        "clāmant": "(they) shout",
        "tandem": "at last",
        "nōnāgintā": "ninety",
        "inquit": "says (used with quoted speech)",
        "nōn": "not; «nōn plūs» — no more",
        "plūs": "more (comparative of «multus»)",
        "bene": "fine, very well",
        "mihi": "to me (dat. of «ego»)",
        "placent": "are pleasing (to) — «mihi placent», ‘they suit me’",
        "numerum": "the number (acc. — object)",
        "in": "in, on (+ abl.)",
        "tabulā": "a (wax) tablet (abl. after «in»)",
        "scrībit": "writes",
        "xc": "XC — Roman numerals for 90 (X before C subtracts: 100 − 10)",
        "deinde": "then, next",
        "numerat": "counts",
        "et": "and",
        "patrī": "to (her) father (dat. — the receiver)",
        "dat": "gives",
        "sed": "but",
        "paula": "Paula (the daughter)",
        "quoque": "also, too",
        "pecūniam": "the money (acc. — object)",
        "pater": "father! (vocative)",
        "hīc": "here",
        "septem": "seven — «octōgintā septem», eighty-seven",
        "sunt": "(there) are",
        "trēs": "three",
        "dēsunt": "are missing, are lacking (dē + sunt)",
        "ērubēscit": "blushes, turns red",
        "addit": "adds",
        "errāvī": "I made a mistake (perfect of «errō»)",
        "haec": "this (fem. nom. — «haec puella», this girl)",
        "puella": "girl",
        "callidior": "cleverer, shrewder (comparative)",
        "quam": "than",
        "multī": "many",
        "quot": "how many? (indeclinable)",
        "nāta": "old (in the idiom «annōs nāta» — literally ‘born for … years’)",
        "es": "you (sg.) are",
        "octō": "eight",
        "sum": "I am",
        "puellae": "to the girl (dat. — the receiver of the gift)",
        "ūnum": "one (acc.)",
        "sēstertium": "sesterce (acc. sg.)",
        "dōnat": "presents, gives as a gift",
        "nocte": "at night (abl. of time when)",
        "familia": "the family",
        "caupōnā": "the inn (abl. after «in»)",
        "sedet": "sits",
        "mātrī": "to (her) mother (dat.)",
        "omnia": "everything (neuter pl. of «omnis»)",
        "nārrat": "tells, relates",
        "nunc": "now",
        "quīnque": "five",
        "habeō": "I have",
        "māter": "mother! (vocative)",
        "quattuor": "four",
        "novum": "new (agreeing with «ūnum [sēstertium]»)",
        "julia": "Julia (the mother — her name declines like «puella»)",
        "rīdet": "laughs",
        "quinn": "Quinn (the son, twelve years old — his name never changes form)",
        "quandō": "when?",
        "domum": "home(ward) (acc. of motion toward — no preposition needed)",
        "redīmus": "do we return, go back (from «redeō»)",
        "post": "after (+ acc.)",
        "mēnsem": "month (acc. after «post»)",
        "subitō": "suddenly",
        "canis": "the dog (nom. — subject; his name follows in apposition)",
        "lupo": "Lupo (the dog, a lovable menace — quasi lupus!)",
        "botulum": "the sausage (acc. — object)",
        "puerī": "of the boy, the boy’s (gen.)",
        "rapit": "snatches",
        "dēvorat": "devours",
        "ō": "oh!",
        "puer": "the boy",
        "īrātus": "angry, furious",
        "botulus": "the sausage (nom. — subject)",
        "meus": "my",
        "erat": "was (imperfect of «est»)",
        "tū": "you (sg.)",
        "nūllum": "none, not one («nūllum botulum», no sausage)",
        "habet": "has"
      },
      translation: [
        "«How much is the price?» asks the Roman merchant. «A hundred sacks — a hundred sesterces!» answers Mark. «A hundred sesterces? That’s too much!» shouts the merchant. «I’ll give you eighty sesterces.» Mark shakes his head: «I have been selling grain for twenty years now, my friend; I know a good price.»",
        "For two hours the merchants shout about the price. At last the Roman merchant says: «I’ll give you ninety sesterces — no more!» «Fine,» answers Mark. «Ninety sesterces suit me.» The merchant writes the number on a tablet: XC.",
        "Then the Roman merchant counts out the sesterces and gives them to her father. But Paula counts the money too. «Father!» she shouts. «There are eighty-seven sesterces here, not ninety! Three sesterces are missing!» The merchant blushes and adds three sesterces. «I made a mistake,» he says. «This girl is cleverer than many merchants! How old are you, girl?» «I am eight years old!» Paula answers. The merchant laughs and gives the girl one sesterce as a present.",
        "That night the family sits in the inn, and Paula tells her mother everything. «Now I have five sesterces, mother: four — and one new one!» Julia laughs. Quinn asks: «When do we go home, father?» «After one month,» Mark answers. Suddenly the dog Lupo snatches the boy’s sausage and devours it. «Oh, Lupo!» shouts the boy, furious. «That was my sausage!» Paula laughs: «Now Lupo has one sausage — and you have none!»"
      ],
      questions: [
        {
          q: "What does the Roman merchant offer at first, and what does Mark ask for?",
          options: [
            "He offers eighty sesterces; Mark asks a hundred",
            "He offers a hundred sesterces; Mark asks eighty",
            "He offers ninety sesterces; Mark asks a thousand",
            "He offers twenty sesterces; Mark asks ninety"
          ],
          answer: 0,
          explain: "Mark opens with «centum saccī — centum sēstertiī!» and the merchant counters «Tibi octōgintā sēstertiōs dō» — eighty."
        },
        {
          q: "In «Iam vīgintī annōs frūmentum vēndō», what is Mark saying?",
          options: [
            "He sold grain twenty years ago",
            "He has been selling grain for twenty years now",
            "He sells grain twenty times a year",
            "He sold his grain in twenty days"
          ],
          answer: 1,
          explain: "The accusative «vīgintī annōs» measures duration, and «iam» + present tense means ‘have been …ing for … now’."
        },
        {
          q: "What does Paula discover when she counts the money?",
          options: [
            "The merchant has paid three sesterces too many",
            "There are only eighty-seven sesterces — three are missing",
            "The coins are denarii, not sesterces",
            "Mark has miscounted his sacks of grain"
          ],
          answer: 1,
          explain: "«Hīc octōgintā septem sēstertiī sunt, nōn nōnāgintā! Trēs sēstertiī dēsunt!» — 87, not 90: three missing."
        },
        {
          q: "How does the merchant react to being caught short?",
          options: [
            "He angrily refuses to pay anything",
            "He blames Mark for the mistake",
            "He blushes, adds the three sesterces, and gives Paula a coin of her own",
            "He calls for the soldiers in the forum"
          ],
          answer: 2,
          explain: "«Mercātor ērubēscit et trēs sēstertiōs addit» — then he praises Paula («callidior … quam multī mercātōrēs!») and gives her a sesterce."
        }
      ]
    }
  ],

  quiz: [
    {
      prompt: "Which number does the Roman numeral XVII represent?",
      options: ["15", "17", "22", "12"],
      answer: 1,
      explain: "Read left to right and add: X (10) + V (5) + I + I = 17."
    },
    {
      prompt: "The merchant’s tablet reads «XC». How many sesterces is that?",
      options: ["40", "60", "110", "90"],
      answer: 3,
      explain: "A smaller value before a larger one subtracts: X before C is 100 − 10 = 90."
    },
    {
      prompt: "In «Prīmā hōrā mercātor venit», what does «prīmā hōrā» express?",
      options: [
        "When something happens — at the first hour",
        "Where something happens",
        "How long something lasts",
        "Whose hour it is"
      ],
      answer: 0,
      explain: "A bare ablative on a time word is the ‘time when’ construction: at the first hour."
    },
    {
      prompt: "In «Avunculus Ted multōs annōs nāvigat», the accusative «multōs annōs» expresses…",
      options: [
        "the place where he sails",
        "possession — whose years they are",
        "duration — for many years",
        "a point in time — in that year"
      ],
      answer: 2,
      explain: "The bare accusative of a time word measures a stretch of time: Uncle Ted sails for many years."
    },
    {
      prompt: "Which phrase correctly says ‘two girls’ as the subject of a sentence?",
      options: ["duo puellae", "duam puellae", "duae puellae", "duīs puellae"],
      answer: 2,
      explain: "«duo» is one of the three numbers that decline: masculine «duo puerī» but feminine «duae puellae»."
    },
    {
      prompt: "What does «post trēs hōrās» mean?",
      options: ["for three hours", "three hours ago", "at the third hour", "after three hours"],
      answer: 3,
      explain: "«post» + accusative means ‘after’: after three hours. (Bare «trēs hōrās», with no preposition, would be ‘for three hours’.)"
    },
    {
      prompt: "What is «Quot nāvēs in portū sunt?» asking?",
      options: [
        "How many ships are in the harbor?",
        "Whose ships are in the harbor?",
        "How big are the ships in the harbor?",
        "Which ships are in the harbor?"
      ],
      answer: 0,
      explain: "Indeclinable «quot» asks ‘how many?’ — and «tot» (‘so many’) is its natural answer."
    },
    {
      prompt: "In «Iam decem annōs in urbe habitō», the speaker…",
      options: [
        "lived in the city ten years ago",
        "has been living in the city for ten years now",
        "moves to the city every ten years",
        "stayed in the city for only ten days"
      ],
      answer: 1,
      explain: "«iam» + present tense + accusative of duration: ‘I have been living in the city for ten years now.’"
    }
  ]
});
