registerUnit({
  id: 19,
  stage: 2,
  title: "Vir Quī…",
  tagline: "Relative clauses: quī, quae, quod",

  grammar: [
    {
      heading: "A sentence tucked inside a sentence",
      body: "<p>English does this constantly: ‘the man <em>who is standing in the street</em>’, ‘the gift <em>that Ted gives</em>’. The italic part is a <strong>relative clause</strong> — a mini-sentence that describes a noun. Latin builds it with the relative pronoun <span class=\"la\">quī, quae, quod</span> (who, which, that).</p><p><span class=\"la\">Vir quī in viā stat mercātor est</span> — the man <em>who is standing in the street</em> is a merchant. The noun being described (<span class=\"la\">vir</span>) is called the <strong>antecedent</strong>, and the relative clause rides along right behind it, like a name tag on a suitcase.</p><p>Reading strategy: when you meet a form of <span class=\"la\">quī</span>, open a mental bracket. The mini-clause runs to its own verb — then close the bracket and rejoin the main sentence, which carries on as if nothing had happened.</p>",
      table: {
        caption: "The relative pronoun «quī, quae, quod» — singular",
        headers: ["Case", "masc.", "fem.", "neut.", "Typical English"],
        rows: [
          ["nominative", "quī", "quae", "quod", "who, which (subject)"],
          ["accusative", "quem", "quam", "quod", "whom, which (object)"],
          ["genitive", "cuius", "cuius", "cuius", "whose"],
          ["dative", "cui", "cui", "cui", "to / for whom"],
          ["ablative", "quō", "quā", "quō", "with / by / in which"]
        ]
      },
      tip: "See «quī / quae / quod» right after a noun? That noun is about to get described. Bracket the clause, find its verb, and move on."
    },
    {
      heading: "The golden rule: gender and number from behind, case from within",
      body: "<p>A relative pronoun looks two ways at once. It takes its <strong>gender and number</strong> from its antecedent — but its <strong>case</strong> from its own job <em>inside</em> the relative clause.</p><p>Compare: <span class=\"la\">puella quae canem videt</span> — the girl who sees the dog (<span class=\"la\">quae</span> is the subject of <span class=\"la\">videt</span>, so nominative) — with <span class=\"la\">puella quam canis videt</span> — the girl whom the dog sees (<span class=\"la\">quam</span> is the object, so accusative). Same girl, same gender and number; different case, because her job in the mini-sentence changed.</p><p>That is why Latin can say <span class=\"la\">hominī quī vēritātem nōn dīcit nēmō crēdit</span> — nobody trusts a person who does not tell the truth. <span class=\"la\">Hominī</span> is dative (the one being trusted), but <span class=\"la\">quī</span> is nominative, because inside its own clause it is the one doing the (not-)telling.</p>",
      table: {
        caption: "The relative pronoun — plural",
        headers: ["Case", "masc.", "fem.", "neut.", "Typical English"],
        rows: [
          ["nominative", "quī", "quae", "quae", "who, which (subject)"],
          ["accusative", "quōs", "quās", "quae", "whom, which (object)"],
          ["genitive", "quōrum", "quārum", "quōrum", "whose"],
          ["dative", "quibus", "quibus", "quibus", "to / for whom"],
          ["ablative", "quibus", "quibus", "quibus", "with / by / in which"]
        ]
      },
      tip: "Never expect the relative pronoun to copy its antecedent's case. Ask instead: what is it doing in its own little clause?"
    },
    {
      heading: "Old faces: quis? versus quī — and the two lives of quod",
      body: "<p>You have met lookalikes before. <span class=\"la\">Quis?</span> (Unit 16) asks a question: <span class=\"la\">quis clāmat?</span> — who is shouting? The relative <span class=\"la\">quī</span> asks nothing; it leans on a noun and describes it: <span class=\"la\">vir quī clāmat</span> — the man who is shouting. If there is a noun right in front of it, it is almost certainly relative.</p><p><span class=\"la\">Quod</span> has led a double life since Unit 3. After a neuter noun it is the relative: <span class=\"la\">dōnum quod amō</span> — the gift that I love. Introducing a reason, it is the conjunction ‘because’: <span class=\"la\">Lupo lātrat, quod cibum cupit</span> — Lupo barks because he wants food. The noun in front (or the lack of one) tells you which <span class=\"la\">quod</span> you are holding.</p><p>And an old acquaintance turns out to have been a relative all along: <span class=\"la\">cuius</span> (whose), which you met as a question word back at the harbor in Unit 5, is also the genitive of <span class=\"la\">quī</span>: <span class=\"la\">vir cuius canis lātrat</span> — the man whose dog is barking.</p>",
      tip: "Noun + quī/quae/quod = description. Question mark + quis/quid = question. Comma + quod + a reason = because."
    },
    {
      heading: "Describing people: tālis, quālis — and whom to trust",
      body: "<p>This unit's theme is describing people — beards, hair, scars, clothes — and deciding whether to believe them. Two little adjectives run the show: <span class=\"la\">quālis?</span> asks ‘what sort of?’, and <span class=\"la\">tālis</span> answers ‘such, that sort’: <span class=\"la\">Quālis homō est? Tālis homō vēritātem nōn dīcit</span> — what sort of person is he? Such a person does not tell the truth.</p><p>One habit to lock in while you read: <span class=\"la\">crēdō</span> (believe, trust) takes the <strong>dative</strong>. <span class=\"la\">Virō crēdō</span> — I trust the man; <span class=\"la\">mendācī nōn crēdō</span> — I don't trust a liar. When a dative sits next to <span class=\"la\">crēdō</span>, that is the person being believed — or, in this unit, definitely not believed.</p>",
      table: {
        caption: "Asking and answering about sorts of people",
        headers: ["Latin", "English"],
        rows: [
          ["quālis?", "what sort of?"],
          ["tālis", "such, of that sort"],
          ["tālis… quālis…", "such… as…"],
          ["virō crēdō", "I trust the man (dative!)"],
          ["mendācī nōn crēdō", "I don't trust a liar (dative!)"]
        ]
      }
    }
  ],

  vocab: [
    {
      latin: "quī",
      forms: "quae, quod",
      pos: "pronoun (relative)",
      gloss: "who, which, that (relative)",
      example: "Vir quī in viā stat mercātor est.",
      exampleGloss: "The man who is standing in the street is a merchant."
    },
    {
      latin: "ignōtus",
      forms: "‑a, ‑um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "unknown, strange",
      example: "Vir ignōtus familiam salūtat.",
      exampleGloss: "An unknown man greets the family."
    },
    {
      latin: "dīves",
      forms: "gen. dīvitis",
      pos: "adjective (3rd decl.)",
      gloss: "rich",
      example: "Mercātor dīves multam pecūniam habet.",
      exampleGloss: "The rich merchant has a lot of money."
    },
    {
      latin: "pauper",
      forms: "gen. pauperis",
      pos: "adjective (3rd decl.)",
      gloss: "poor",
      example: "Nauta pauper pecūniam nōn habet.",
      exampleGloss: "The poor sailor has no money."
    },
    {
      latin: "callidus",
      forms: "‑a, ‑um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "clever, cunning",
      example: "Julia callidior est quam mercātor.",
      exampleGloss: "Julia is more clever than the merchant."
    },
    {
      latin: "benignus",
      forms: "‑a, ‑um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "kind",
      example: "Avunculus benignus puerīs dōna dat.",
      exampleGloss: "The kind uncle gives the children gifts."
    },
    {
      latin: "crūdēlis",
      forms: "‑e",
      pos: "adjective (3rd decl.)",
      gloss: "cruel",
      example: "Dominus crūdēlis numquam rīdet.",
      exampleGloss: "A cruel master never laughs."
    },
    {
      latin: "mendāx",
      forms: "gen. mendācis",
      pos: "adjective (3rd decl.)",
      gloss: "lying, deceitful",
      example: "Homō mendāx vēra numquam dīcit.",
      exampleGloss: "A deceitful person never says true things."
    },
    {
      latin: "dubius",
      forms: "‑a, ‑um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "doubtful, uncertain",
      example: "Quinn dubius est: cui crēdere dēbet?",
      exampleGloss: "Quinn is uncertain: whom should he trust?"
    },
    {
      latin: "tālis",
      forms: "‑e",
      pos: "adjective (3rd decl.)",
      gloss: "such, of such a kind",
      example: "Tālem virum numquam vīdī.",
      exampleGloss: "I have never seen such a man."
    },
    {
      latin: "quālis",
      forms: "‑e",
      pos: "adjective (3rd decl., interrogative)",
      gloss: "what sort of?",
      example: "Quālis homō est ille mercātor?",
      exampleGloss: "What sort of person is that merchant?"
    },
    {
      latin: "barba",
      forms: "barbae, f.",
      pos: "noun (1st decl.)",
      gloss: "beard",
      example: "Barba avunculī Ted rūfa est.",
      exampleGloss: "Uncle Ted's beard is red."
    },
    {
      latin: "capillus",
      forms: "capillī, m.",
      pos: "noun (2nd decl.)",
      gloss: "hair",
      example: "Capillus senis albus est.",
      exampleGloss: "The old man's hair is white."
    },
    {
      latin: "ōs",
      forms: "ōris, n.",
      pos: "noun (3rd decl.)",
      gloss: "mouth, face",
      example: "Lupo botulum in ōre tenet.",
      exampleGloss: "Lupo is holding a sausage in his mouth."
    },
    {
      latin: "cicātrīx",
      forms: "cicātrīcis, f.",
      pos: "noun (3rd decl.)",
      gloss: "scar",
      example: "Nauta cicātrīcem in ōre habet.",
      exampleGloss: "The sailor has a scar on his face."
    },
    {
      latin: "vestīmentum",
      forms: "vestīmentī, n.",
      pos: "noun (2nd decl.)",
      gloss: "clothing, garment",
      example: "Vestīmenta mercātōris splendida sunt.",
      exampleGloss: "The merchant's clothes are splendid."
    },
    {
      latin: "vēritās",
      forms: "vēritātis, f.",
      pos: "noun (3rd decl.)",
      gloss: "truth",
      example: "Paula vēritātem semper dīcit.",
      exampleGloss: "Paula always tells the truth."
    },
    {
      latin: "dolus",
      forms: "dolī, m.",
      pos: "noun (2nd decl.)",
      gloss: "trick, deceit",
      example: "Julia dolum virī statim vīdit.",
      exampleGloss: "Julia saw the man's trick at once."
    },
    {
      latin: "fallō",
      forms: "fallere, fefellī, falsum",
      pos: "verb (3rd conj.)",
      gloss: "deceive, trick",
      example: "Mendāx hominēs fallere temptat.",
      exampleGloss: "The liar tries to deceive people."
    },
    {
      latin: "cognōscō",
      forms: "cognōscere, cognōvī, cognitum",
      pos: "verb (3rd conj.)",
      gloss: "get to know, recognize",
      example: "Ted virum statim cognōvit.",
      exampleGloss: "Ted recognized the man immediately."
    },
    {
      latin: "appellō",
      forms: "appellāre, appellāvī, appellātum",
      pos: "verb (1st conj.)",
      gloss: "call, name",
      example: "Familia canem Lupo appellat.",
      exampleGloss: "The family calls the dog Lupo."
    },
    {
      latin: "simulō",
      forms: "simulāre, simulāvī, simulātum",
      pos: "verb (1st conj.)",
      gloss: "pretend",
      example: "Lupo dormīre simulat.",
      exampleGloss: "Lupo pretends to be asleep."
    },
    {
      latin: "negō",
      forms: "negāre, negāvī, negātum",
      pos: "verb (1st conj.)",
      gloss: "deny, say no",
      example: "Vir omnia negat.",
      exampleGloss: "The man denies everything."
    },
    {
      latin: "crēdō",
      forms: "crēdere, crēdidī, crēditum (+ dat.)",
      pos: "verb (3rd conj.)",
      gloss: "believe, trust (+ dat.)",
      example: "Paula virō ignōtō nōn crēdit.",
      exampleGloss: "Paula does not trust the unknown man."
    },
    {
      latin: "nūper",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "recently",
      example: "Ted nūper ad urbem vēnit.",
      exampleGloss: "Ted recently came to the city."
    }
  ],

  readings: [
    {
      title: "Mercātor Ignōtus",
      intro: "In a tavern near the forum, a splendidly dressed stranger walks up to the family's table — claiming to be an old friend of Ted.",
      paragraphs: [
        "Vesper erat. Familia in caupōnā, quae prope forum erat, cēnābat. Subitō vir ignōtus, cuius vestīmenta splendida erant, ad mēnsam appropinquāvit. Vir barbam nigram et in ōre cicātrīcem habēbat. «Salvēte!» inquit. «Ego sum Lūcius, mercātor dīves, quī cum Ted saepe nāvigāvī. Ted amīcus meus cārissimus est!»",
        "Julia, quae callida erat, nihil dīxit, sed vir fābulās mīrās nārrābat, quibus Quinn laetus crēdēbat. Deinde vir inquit: «Ted, quī mihi decem dēnāriōs dēbet, ubi est? Pecūniam meam petō.»",
        "«Quālis vir est Ted?» rogāvit Julia. «Vir magnus», respondit mercātor, «quī barbam longam nigramque habet.» Paula rīsit: avunculus Ted barbam rūfam et brevem habet! Tālis homō vēritātem nōn dīcit. Sed Julia callida «manē nōbīscum» inquit; «Ted mox venit.»"
      ],
      glosses: {
        "vesper": "evening (nom.)",
        "erat": "was (imperfect of «est»)",
        "familia": "family",
        "in": "in (+ abl.)",
        "caupōnā": "inn, tavern (abl. after «in»)",
        "quae": "who, which (fem. — introduces a relative clause)",
        "prope": "near (+ acc.)",
        "forum": "forum, market square (acc. after «prope»)",
        "cēnābat": "was dining, was having dinner",
        "subitō": "suddenly",
        "vir": "man",
        "ignōtus": "unknown, strange",
        "cuius": "whose (genitive of the relative pronoun)",
        "vestīmenta": "clothes, garments (nom. pl. n.)",
        "splendida": "splendid (nom. pl. n., with «vestīmenta»)",
        "erant": "were",
        "ad": "to, toward (+ acc.)",
        "mēnsam": "table (acc. after «ad»)",
        "appropinquāvit": "approached (perfect)",
        "barbam": "beard (acc.)",
        "nigram": "black (acc. sg. f., with «barbam»)",
        "et": "and",
        "ōre": "face, mouth (abl. after «in»)",
        "cicātrīcem": "scar (acc.)",
        "habēbat": "had, was wearing",
        "salvēte": "hello! greetings! (to more than one person)",
        "inquit": "says / said (used with quoted speech)",
        "ego": "I",
        "sum": "am",
        "lūcius": "Lucius — the name the stranger gives himself",
        "mercātor": "merchant",
        "dīves": "rich",
        "quī": "who (masc. — introduces a relative clause)",
        "cum": "with (+ abl.)",
        "saepe": "often",
        "nāvigāvī": "I sailed, I have sailed (perfect)",
        "ted": "Ted, Julia's brother, the ship captain — his name never changes form",
        "amīcus": "friend",
        "meus": "my",
        "cārissimus": "dearest (superlative of «cārus»)",
        "est": "is",
        "julia": "Julia, the mother",
        "callida": "clever, shrewd (nom. sg. f.)",
        "nihil": "nothing",
        "dīxit": "said (perfect)",
        "sed": "but",
        "fābulās": "stories (acc. pl.)",
        "mīrās": "amazing, marvelous (acc. pl. f.)",
        "nārrābat": "was telling, kept telling",
        "quibus": "which (dat. pl. — «crēdō» takes the dative; refers to the stories)",
        "quinn": "Quinn, the son, twelve years old — his name never changes form",
        "laetus": "happy (describing Quinn)",
        "crēdēbat": "believed, trusted (+ dat.)",
        "deinde": "then, next",
        "mihi": "to me (dat. of «ego»)",
        "decem": "ten",
        "dēnāriōs": "denarii (acc. pl. — silver coins)",
        "dēbet": "owes",
        "ubi": "where?",
        "pecūniam": "money (acc.)",
        "meam": "my (acc. sg. f.)",
        "petō": "I seek, I demand",
        "quālis": "what sort of?",
        "magnus": "big, great",
        "rogāvit": "asked (perfect)",
        "respondit": "answered, replied (perfect)",
        "longam": "long (acc. sg. f., with «barbam»)",
        "nigramque": "and black («nigram» + ‑que)",
        "habet": "has",
        "paula": "Paula, the daughter, eight years old",
        "rīsit": "laughed (perfect)",
        "avunculus": "uncle (mother's brother)",
        "rūfam": "red (acc. sg. f., with «barbam»)",
        "brevem": "short (acc. sg. f.)",
        "tālis": "such, of that sort",
        "homō": "person, man",
        "vēritātem": "truth (acc.)",
        "nōn": "not",
        "dīcit": "says, tells",
        "manē": "stay! (imperative of «maneō» — not the ‘morning’ word!)",
        "nōbīscum": "with us («cum» + «nōbīs» stuck together)",
        "mox": "soon",
        "venit": "comes, is coming"
      },
      translation: [
        "It was evening. The family was dining in a tavern which was near the forum. Suddenly an unknown man, whose clothes were splendid, approached the table. The man had a black beard and a scar on his face. «Greetings!» he said. «I am Lucius, a rich merchant who often sailed with Ted. Ted is my dearest friend!»",
        "Julia, who was clever, said nothing, but the man kept telling marvelous stories, which a delighted Quinn believed. Then the man said: «Ted, who owes me ten denarii — where is he? I want my money.»",
        "«What sort of man is Ted?» asked Julia. «A great man,» the merchant answered, «who has a long black beard.» Paula laughed: Uncle Ted has a short red beard! Such a man is not telling the truth. But clever Julia said, «Stay with us; Ted is coming soon.»"
      ],
      questions: [
        {
          q: "Who does the stranger claim to be?",
          options: [
            "Ted's long-lost brother",
            "Lucius, a rich merchant who often sailed with Ted",
            "A senator from the forum",
            "A poor sailor looking for work"
          ],
          answer: 1,
          explain: "«Ego sum Lūcius, mercātor dīves, quī cum Ted saepe nāvigāvī» — the quī-clause carries his whole claim: a rich merchant who often sailed with Ted."
        },
        {
          q: "In «Ted, quī mihi decem dēnāriōs dēbet, ubi est?», what is the man claiming?",
          options: [
            "That Ted owes him ten denarii",
            "That he owes Ted ten denarii",
            "That Ted owns ten ships",
            "That Ted is hiding nearby"
          ],
          answer: 0,
          explain: "«quī» picks up Ted and is the subject of «dēbet»: Ted, who owes me («mihi») ten denarii. The direction of the debt is the whole con."
        },
        {
          q: "What detail shows Paula that the man is lying?",
          options: [
            "He does not know Ted's name",
            "He says Ted's ship is small",
            "He says Ted has a long black beard — but Ted's beard is red and short",
            "He refuses to sit at the table"
          ],
          answer: 2,
          explain: "The merchant describes «vir… quī barbam longam nigramque habet» — but «avunculus Ted barbam rūfam et brevem habet»."
        },
        {
          q: "How does clever Julia respond to the lie?",
          options: [
            "She shouts that he is a liar",
            "She quietly invites him to stay, because Ted is coming soon",
            "She pays him the ten denarii",
            "She sends Lupo to chase him away"
          ],
          answer: 1,
          explain: "«Manē nōbīscum; Ted mox venit» — she says nothing about the beard and lets the trap close by itself."
        }
      ]
    },
    {
      title: "Barba Quae Vēra Nōn Erat",
      intro: "Julia asks a few innocent questions, Ted walks in — and Lupo settles the matter of the beard once and for all.",
      paragraphs: [
        "Julia, quae dolōs mercātōrum bene cognōscēbat, virum interrogāvit: «Quālis est nāvis, quā Ted nāvigat? Quot nautās habet?» Vir, quī vēritātem nesciēbat, respondit: «Nāvis, quā Ted nāvigat, parva est; quīnque nautās habet.» Sed nāvis avunculī magna est et vīgintī nautās habet!",
        "Vir clāmāvit: «Ted mihi decem dēnāriōs et gemmam pretiōsam dēbet! Hominī benignō crēdere dēbētis!» Paula virō ignōtō nōn crēdēbat.",
        "Subitō Ted caupōnam intrāvit! Vir ignōtus, postquam avunculum Ted vīdit, perterritus ad portam properāre temptāvit. Sed Ted clāmāvit: «Hunc virum cognōscō! Nōn est Lūcius — est Gāius mendāx, quī nautās in portū Ostiae fefellit! Cicātrīcem, quam in ōre habet, memoriā teneō!»",
        "Vir omnia negāvit: «Ego hominēs numquam fallō!» Sed Lupo, quī prope mēnsam dormīre simulābat, subitō barbam virī rapuit — et ecce: barba vēra nōn erat! Sine barbā stābat homō quem avunculus cognōscēbat. Gāius ē caupōnā fūgit; Lupo barbam in ōre tenēbat.",
        "Omnēs rīdēbant. «Hominī quī vēritātem nōn dīcit», inquit Julia, «nēmō crēdere dēbet.» «Ita!» inquit Paula. «Canis noster callidior est quam mercātor mendāx!» Lupo, cui omnēs grātiās agēbant, botulum accēpit."
      ],
      glosses: {
        "julia": "Julia, the mother",
        "quae": "who (fem. — introduces a relative clause)",
        "dolōs": "tricks, deceits (acc. pl.)",
        "mercātōrum": "of merchants (gen. pl.)",
        "bene": "well",
        "cognōscēbat": "knew, was well acquainted with",
        "virum": "man (acc.)",
        "interrogāvit": "questioned (perfect)",
        "quālis": "what sort of?",
        "est": "is",
        "nāvis": "ship (nom.)",
        "avunculī": "of the uncle, the uncle's (gen.)",
        "quot": "how many?",
        "nautās": "sailors (acc. pl.)",
        "habet": "has",
        "vir": "man",
        "quī": "who (masc. — introduces a relative clause)",
        "vēritātem": "truth (acc.)",
        "nesciēbat": "did not know",
        "respondit": "answered, replied (perfect)",
        "quā": "on which (abl. sg. f. — the ship he sails on)",
        "ted": "Ted, Julia's brother, the ship captain — his name never changes form",
        "nāvigat": "sails",
        "parva": "small",
        "quīnque": "five",
        "sed": "but",
        "magna": "big",
        "et": "and",
        "vīgintī": "twenty",
        "clāmāvit": "shouted (perfect)",
        "mihi": "to me (dat. of «ego»)",
        "decem": "ten",
        "dēnāriōs": "denarii (acc. pl. — silver coins)",
        "gemmam": "gem, jewel (acc.)",
        "pretiōsam": "precious (acc. sg. f.)",
        "dēbet": "owes; (with an infinitive) ought, must",
        "hominī": "person, man (dat. — «crēdō» takes the dative)",
        "benignō": "kind (dat. sg. m., with «hominī»)",
        "crēdere": "to believe, to trust (infinitive, + dat.)",
        "dēbētis": "you (pl.) ought, must",
        "paula": "Paula, the daughter, eight years old",
        "virō": "man (dat. — «crēdō» takes the dative)",
        "ignōtō": "unknown (dat. sg. m., with «virō»)",
        "nōn": "not",
        "crēdēbat": "believed, trusted (+ dat.)",
        "subitō": "suddenly",
        "caupōnam": "inn, tavern (acc.)",
        "intrāvit": "entered (perfect)",
        "ignōtus": "unknown, strange",
        "postquam": "after",
        "avunculum": "uncle (acc. — object of «vīdit»)",
        "avunculus": "uncle (nom.)",
        "vīdit": "saw (perfect)",
        "perterritus": "terrified",
        "ad": "to, toward (+ acc.)",
        "portam": "door (acc. after «ad»)",
        "properāre": "to hurry (infinitive)",
        "temptāvit": "tried (perfect)",
        "hunc": "this (acc. sg. m., with «virum»)",
        "cognōscō": "I recognize",
        "lūcius": "Lucius — the stranger's false name",
        "gāius": "Gaius — the impostor's real name",
        "mendāx": "lying, deceitful; a liar",
        "in": "in (+ abl.)",
        "portū": "harbor (abl. after «in»)",
        "ostiae": "of Ostia, the port of Rome (gen.)",
        "fefellit": "deceived, tricked (perfect of «fallō»)",
        "cicātrīcem": "scar (acc.)",
        "quam": "which (acc. sg. f. — the scar); after a comparative: than",
        "ōre": "face, mouth (abl. after «in»)",
        "memoriā": "in memory («memoriā tenēre» = to remember)",
        "teneō": "I hold («memoriā teneō» = I remember)",
        "omnia": "everything (acc. pl. n.)",
        "negāvit": "denied (perfect)",
        "ego": "I",
        "hominēs": "people (acc. pl.)",
        "numquam": "never",
        "fallō": "I deceive, I trick",
        "lupo": "Lupo, the family dog — quasi lupus! (his name never changes form)",
        "prope": "near (+ acc.)",
        "mēnsam": "table (acc. after «prope»)",
        "dormīre": "to sleep (infinitive)",
        "simulābat": "was pretending",
        "barbam": "beard (acc.)",
        "virī": "of the man (gen.)",
        "rapuit": "snatched (perfect)",
        "ecce": "look! behold!",
        "barba": "beard (nom.)",
        "vēra": "real, true (nom. sg. f.)",
        "erat": "was (imperfect of «est»)",
        "sine": "without (+ abl.)",
        "barbā": "beard (abl. after «sine»)",
        "stābat": "was standing",
        "homō": "person, man",
        "quem": "whom (acc. sg. m. — object of «cognōscēbat»)",
        "ē": "out of (+ abl.)",
        "caupōnā": "inn, tavern (abl. after «ē»)",
        "fūgit": "fled (perfect)",
        "tenēbat": "was holding, kept",
        "omnēs": "everyone, all (nom. pl.)",
        "rīdēbant": "were laughing",
        "dīcit": "says, tells",
        "inquit": "says / said (used with quoted speech)",
        "nēmō": "no one",
        "ita": "yes",
        "canis": "dog",
        "noster": "our",
        "callidior": "more clever, craftier (comparative)",
        "mercātor": "merchant",
        "cui": "to whom (dat. sg. — with «grātiās agēbant»)",
        "grātiās": "thanks (acc. pl. — «grātiās agere» = to give thanks)",
        "agēbant": "were giving («grātiās agere» = to thank)",
        "botulum": "sausage (acc.)",
        "accēpit": "received (perfect)"
      },
      translation: [
        "Julia, who knew merchants' tricks well, questioned the man: «What sort of ship is it that Ted sails on? How many sailors does it have?» The man, who did not know the truth, answered: «The ship on which Ted sails is small; it has five sailors.» But the uncle's ship is big and has twenty sailors!",
        "The man shouted: «Ted owes me ten denarii and a precious gem! You ought to trust a kind man!» Paula did not trust the unknown man.",
        "Suddenly Ted entered the tavern! The stranger, after he saw Uncle Ted, tried in terror to hurry to the door. But Ted shouted: «I recognize this man! He is not Lucius — he is Gaius the liar, who tricked sailors in the harbor of Ostia! I remember the scar he has on his face!»",
        "The man denied everything: «I never deceive people!» But Lupo, who was pretending to sleep near the table, suddenly snatched the man's beard — and behold: the beard was not real! Without the beard stood a man whom the uncle knew. Gaius fled out of the tavern; Lupo kept the beard in his mouth.",
        "Everyone was laughing. «No one,» said Julia, «ought to trust a person who does not tell the truth.» «Yes!» said Paula. «Our dog is craftier than a lying merchant!» Lupo, to whom everyone was giving thanks, received a sausage."
      ],
      questions: [
        {
          q: "How do the man's answers about the ship give him away?",
          options: [
            "He says it is small with five sailors, but Ted's ship is big with twenty",
            "He says it carries wine instead of grain",
            "He cannot remember the ship's name",
            "He says it sank last year"
          ],
          answer: 0,
          explain: "He claims «nāvis… parva est; quīnque nautās habet» — but the truth is «nāvis avunculī magna est et vīgintī nautās habet». The numbers convict him."
        },
        {
          q: "In «Cicātrīcem, quam in ōre habet, memoriā teneō», the word «quam» refers to…",
          options: [
            "the scar",
            "the face",
            "the memory",
            "the tavern"
          ],
          answer: 0,
          explain: "«quam» is feminine singular accusative, matching its antecedent «cicātrīcem» — the scar he has on his face."
        },
        {
          q: "How is the false beard discovered?",
          options: [
            "It falls off while the man runs away",
            "Ted pulls it off in anger",
            "Lupo, who was pretending to sleep near the table, snatches it",
            "Paula asks the man to remove it"
          ],
          answer: 2,
          explain: "«Lupo, quī prope mēnsam dormīre simulābat, subitō barbam virī rapuit» — the dog was only pretending («simulābat») to sleep."
        },
        {
          q: "In «Hominī quī vēritātem nōn dīcit nēmō crēdere dēbet», why is «quī» nominative when «hominī» is dative?",
          options: [
            "The relative pronoun is always nominative",
            "«quī» takes its case from its own clause, where it is the subject of «dīcit»",
            "It is a mistake in the Latin",
            "«nēmō» attracts it into the nominative"
          ],
          answer: 1,
          explain: "Gender and number come from the antecedent («hominī», masc. sg.), but case comes from the pronoun's job inside its own clause — here, subject of «dīcit»."
        }
      ]
    }
  ],

  quiz: [
    {
      prompt: "Which relative pronoun completes «puella ___ in hortō cantat» (the girl who sings in the garden)?",
      options: ["quī", "quae", "quod", "quem"],
      answer: 1,
      explain: "The antecedent «puella» is feminine singular, and the pronoun is the subject of «cantat» — so feminine nominative singular: «quae»."
    },
    {
      prompt: "Which relative pronoun completes «dōnum ___ Ted dat» (the gift that Ted gives)?",
      options: ["quī", "quae", "quod", "cuius"],
      answer: 2,
      explain: "«dōnum» is neuter singular, and the gift is the object of «dat» — neuter accusative singular is «quod» (identical to the nominative)."
    },
    {
      prompt: "In «vir quem vidēs mercātor est», why is «quem» accusative?",
      options: [
        "Because «vir» is accusative",
        "Because it is the object of «vidēs» inside its own clause",
        "Because relative pronouns are always accusative",
        "Because «est» requires the accusative"
      ],
      answer: 1,
      explain: "Case comes from the pronoun's job in its own clause: you see him, so «quem» is the object of «vidēs». «Vir» stays nominative in the main clause."
    },
    {
      prompt: "In «puer cuius pater nāvigat», what does «cuius» mean?",
      options: ["who", "whom", "whose", "to whom"],
      answer: 2,
      explain: "«cuius» is the genitive of the relative pronoun: the boy whose father sails."
    },
    {
      prompt: "In «Lupo lātrat, quod cibum cupit», the word «quod» means…",
      options: ["which", "because", "what?", "whom"],
      answer: 1,
      explain: "Here «quod» introduces a reason, so it is the conjunction ‘because’. As a relative it follows a neuter noun: «dōnum quod amō» — the gift that I love."
    },
    {
      prompt: "«Nāvis quā nāvigāmus magna est.» What does «quā» tell you?",
      options: [
        "The ship is far away",
        "We are sailing on that ship — ablative ‘on which’",
        "Someone is asking which ship it is",
        "The ship belongs to us"
      ],
      answer: 1,
      explain: "«quā» is ablative feminine singular: the ship on which we sail. The ablative marks where or by what means — no question is being asked."
    },
    {
      prompt: "Which sentence says ‘Nobody trusts a liar’?",
      options: [
        "Nēmō mendācī crēdit.",
        "Mendāx nēminī crēdit.",
        "Nēmō mendācem videt.",
        "Mendāx omnibus crēdit."
      ],
      answer: 0,
      explain: "«crēdō» takes the dative: «mendācī» is the liar (not) being trusted, and «nēmō» is the subject. «Mendāx nēminī crēdit» flips it — the liar trusts nobody."
    },
    {
      prompt: "«Quālem virum vīdistī?» is asking…",
      options: [
        "how many men you saw",
        "what sort of man you saw",
        "which man belongs to you",
        "whether you saw the man"
      ],
      answer: 1,
      explain: "«quālis» asks about kind or quality — what sort of man? — and «quālem» is accusative, agreeing with «virum». ‘How many’ would be «quot»."
    }
  ]
});
