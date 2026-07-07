registerUnit({
  id: 7,
  stage: 1,
  title: "Per Viās Ostiae",
  tagline: "Prepositions and the ablative case",

  grammar: [
    {
      heading: "A fifth case: the ablative",
      body: "<p>You already read four cases: nominative for the subject, accusative for the object, genitive for <em>of</em>, dative for <em>to/for</em>. Meet the fifth: the <strong>ablative</strong>. On its own it covers a grab-bag of meanings — <em>in, with, from, by</em> — but here is the comforting part: in this unit you will only ever see it <strong>right after a preposition</strong>, and the preposition tells you exactly what it means.</p><p>The endings are friendly. First declension: <span class=\"la\">viā</span> (singular), <span class=\"la\">viīs</span> (plural). Second declension: <span class=\"la\">amīcō</span> / <span class=\"la\">amīcīs</span>, and neuters likewise: <span class=\"la\">templō</span> / <span class=\"la\">templīs</span>. Notice that ablative <span class=\"la\">viā</span> differs from nominative <span class=\"la\">via</span> only by its long <span class=\"la\">ā</span> — one small macron doing a very large job.</p>",
      table: {
        caption: "Ablative endings, 1st & 2nd declension",
        headers: ["Declension", "Ablative singular", "Ablative plural"],
        rows: [
          ["1st (via)", "viā", "viīs"],
          ["2nd masc. (amīcus)", "amīcō", "amīcīs"],
          ["2nd neut. (templum)", "templō", "templīs"]
        ]
      },
      tip: "Reading tip: ‑ō and ‑īs are also dative endings. Don't panic — right after a preposition, the form is ablative. The preposition always outranks the ambiguity."
    },
    {
      heading: "The ablative six: in, cum, sine, ā/ab, ē/ex, dē",
      body: "<p>Six prepositions govern the ablative, and they are the where-and-with crowd: <span class=\"la\">in</span> (in, on), <span class=\"la\">cum</span> (with), <span class=\"la\">sine</span> (without), <span class=\"la\">ā/ab</span> (from, away from), <span class=\"la\">ē/ex</span> (out of), <span class=\"la\">dē</span> (down from). When one of these appears, the next noun's case is already settled, so you can read the whole phrase as a single chunk: <span class=\"la\">cum amīcō</span>, <span class=\"la\">sine pecūniā</span>, <span class=\"la\">in hortō</span>.</p><p>Two of them own a long and a short outfit: <span class=\"la\">ā</span> becomes <span class=\"la\">ab</span> and <span class=\"la\">ē</span> becomes <span class=\"la\">ex</span> before vowels (<span class=\"la\">ab oppidō</span>, <span class=\"la\">ex ātriō</span>) — the same trick as English <em>a/an</em>.</p><p>And <span class=\"la\">dē</span> has a second career. Literally it means <em>down from</em> (<span class=\"la\">dē mūrō</span>, down from the wall), but with verbs of telling and showing it means <em>about</em>: <span class=\"la\">fābulam dē statuā nārrat</span> — he tells a story <em>about</em> the statue.</p>",
      table: {
        caption: "Prepositions with the ablative",
        headers: ["Preposition", "Meaning", "Example"],
        rows: [
          ["in", "in, on", "in viā — in the street"],
          ["cum", "with", "cum amīcō — with a friend"],
          ["sine", "without", "sine pecūniā — without money"],
          ["ā / ab", "from, away from", "ab oppidō — away from the town"],
          ["ē / ex", "out of, from", "ē tabernā — out of the shop"],
          ["dē", "down from; about", "dē mūrō — down from the wall"]
        ]
      }
    },
    {
      heading: "The accusative four: ad, per, prope, in",
      body: "<p>Movement and direction call for the accusative: <span class=\"la\">ad forum</span> (to the forum), <span class=\"la\">per viās</span> (through the streets), <span class=\"la\">prope portum</span> (near the harbor), and <span class=\"la\">in theātrum</span> (<em>into</em> the theater). If the ablative six mostly answer <em>where?</em>, these mostly answer <em>where to?</em></p><p>You have been reading accusatives as direct objects since unit 4 — this is the same ending with a new employer. In <span class=\"la\">Ferōx per turbam properat</span>, the dog is not hurrying the crowd anywhere; <span class=\"la\">turbam</span> is accusative simply because <span class=\"la\">per</span> demands it.</p>",
      table: {
        caption: "Prepositions with the accusative",
        headers: ["Preposition", "Meaning", "Example"],
        rows: [
          ["ad", "to, toward", "ad forum — to the forum"],
          ["per", "through, along", "per viās — through the streets"],
          ["prope", "near", "prope templum — near the temple"],
          ["in (+ acc.)", "into", "in theātrum — into the theater"]
        ]
      },
      tip: "Reading tip: preposition first, noun second, meaning as a chunk. See «ad» and expect a destination; see «per» and expect a route."
    },
    {
      heading: "«in»: one word, two jobs",
      body: "<p>The preposition <span class=\"la\">in</span> is bilingual in cases. With the <strong>ablative</strong> it marks location: <span class=\"la\">in forō stat</span> — he stands <em>in</em> the forum. With the <strong>accusative</strong> it marks motion: <span class=\"la\">in theātrum intrat</span> — she goes <em>into</em> the theater. Same preposition, different question: <em>where?</em> versus <em>where to?</em></p><p>So when you meet <span class=\"la\">in</span>, glance at the noun's ending before you translate. <span class=\"la\">in viā</span>: standing around in the street. <span class=\"la\">in viam</span>: stepping out into it. The ending is the whole story — which is very Latin of it.</p>",
      table: {
        caption: "«in» — location vs. motion",
        headers: ["Phrase", "Case", "Meaning"],
        rows: [
          ["in forō stat", "ablative", "he stands in the forum (location)"],
          ["in theātrum intrat", "accusative", "she goes into the theater (motion)"]
        ]
      }
    }
  ],

  vocab: [
    {
      latin: "via",
      forms: "viae, f.",
      pos: "noun (1st decl.)",
      gloss: "road, way, street",
      example: "Via ad portum longa est.",
      exampleGloss: "The road to the harbor is long."
    },
    {
      latin: "in",
      forms: "(+ abl. or acc.)",
      pos: "preposition",
      gloss: "in, on (+ abl.); into (+ acc.)",
      example: "Canis in hortō dormit.",
      exampleGloss: "The dog is sleeping in the garden."
    },
    {
      latin: "cum",
      forms: "(+ abl.)",
      pos: "preposition",
      gloss: "with",
      example: "Quīntus cum Paullā per viās ambulat.",
      exampleGloss: "Quintus walks through the streets with Paulla."
    },
    {
      latin: "sine",
      forms: "(+ abl.)",
      pos: "preposition",
      gloss: "without",
      example: "Canis sine cibō nōn laetus est.",
      exampleGloss: "Without food the dog is not happy."
    },
    {
      latin: "ā, ab",
      forms: "(+ abl.)",
      pos: "preposition",
      gloss: "from, away from",
      example: "Nauta ab oppidō ad portum properat.",
      exampleGloss: "The sailor hurries from the town to the harbor."
    },
    {
      latin: "ē, ex",
      forms: "(+ abl.)",
      pos: "preposition",
      gloss: "out of, from",
      example: "Mercātor ē tabernā properat.",
      exampleGloss: "The merchant hurries out of the shop."
    },
    {
      latin: "dē",
      forms: "(+ abl.)",
      pos: "preposition",
      gloss: "down from; about",
      example: "Titus fābulās dē undīs nārrat.",
      exampleGloss: "Titus tells stories about the waves."
    },
    {
      latin: "ad",
      forms: "(+ acc.)",
      pos: "preposition",
      gloss: "to, toward",
      example: "Familia ad forum ambulat.",
      exampleGloss: "The family walks to the forum."
    },
    {
      latin: "per",
      forms: "(+ acc.)",
      pos: "preposition",
      gloss: "through, along",
      example: "Turba per viās oppidī ambulat.",
      exampleGloss: "The crowd walks through the streets of the town."
    },
    {
      latin: "prope",
      forms: "(+ acc.)",
      pos: "preposition",
      gloss: "near",
      example: "Statua prope templum stat.",
      exampleGloss: "The statue stands near the temple."
    },
    {
      latin: "forum",
      forms: "forī, n.",
      pos: "noun (2nd decl., neut.)",
      gloss: "forum, marketplace",
      example: "In forō turba magna est.",
      exampleGloss: "In the forum there is a big crowd."
    },
    {
      latin: "templum",
      forms: "templī, n.",
      pos: "noun (2nd decl., neut.)",
      gloss: "temple",
      example: "Templum magnum in oppidō stat.",
      exampleGloss: "A great temple stands in the town."
    },
    {
      latin: "oppidum",
      forms: "oppidī, n.",
      pos: "noun (2nd decl., neut.)",
      gloss: "town",
      example: "Ostia oppidum pulchrum est.",
      exampleGloss: "Ostia is a beautiful town."
    },
    {
      latin: "theātrum",
      forms: "theātrī, n.",
      pos: "noun (2nd decl., neut.)",
      gloss: "theater",
      example: "Puerī in theātrum intrant.",
      exampleGloss: "The boys go into the theater."
    },
    {
      latin: "balneum",
      forms: "balneī, n.",
      pos: "noun (2nd decl., neut.)",
      gloss: "bath, bathhouse",
      example: "Mārcus in balneō sedet.",
      exampleGloss: "Marcus sits in the bath."
    },
    {
      latin: "aedificium",
      forms: "aedificiī, n.",
      pos: "noun (2nd decl., neut.)",
      gloss: "building",
      example: "Aedificia oppidī magna sunt.",
      exampleGloss: "The buildings of the town are big."
    },
    {
      latin: "statua",
      forms: "statuae, f.",
      pos: "noun (1st decl.)",
      gloss: "statue",
      example: "Statua magna in forō stat.",
      exampleGloss: "A big statue stands in the forum."
    },
    {
      latin: "turba",
      forms: "turbae, f.",
      pos: "noun (1st decl.)",
      gloss: "crowd",
      example: "Ecce turba in viīs!",
      exampleGloss: "Look — a crowd in the streets!"
    },
    {
      latin: "properō",
      forms: "properāre, properāvī, properātum",
      pos: "verb (1st conj.)",
      gloss: "hurry",
      example: "Servī ad macellum properant.",
      exampleGloss: "The slaves hurry to the market."
    },
    {
      latin: "errō",
      forms: "errāre, errāvī, errātum",
      pos: "verb (1st conj.)",
      gloss: "wander; be mistaken",
      example: "Ferōx per oppidum errat.",
      exampleGloss: "Ferox wanders through the town."
    },
    {
      latin: "stō",
      forms: "stāre, stetī, statum",
      pos: "verb (1st conj.)",
      gloss: "stand",
      example: "Puella prope portam stat.",
      exampleGloss: "The girl stands near the gate."
    },
    {
      latin: "appropinquō",
      forms: "appropinquāre, appropinquāvī, appropinquātum",
      pos: "verb (1st conj.)",
      gloss: "approach, draw near (ad + acc.)",
      example: "Nāvis ad portum appropinquat.",
      exampleGloss: "The ship approaches the harbor."
    },
    {
      latin: "hīc",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "here",
      example: "Hīc templum est, ibi theātrum.",
      exampleGloss: "Here is the temple; there, the theater."
    },
    {
      latin: "ibi",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "there",
      example: "Servī ibi labōrant.",
      exampleGloss: "The slaves are working there."
    },
    {
      latin: "tandem",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "at last, finally",
      example: "Tandem canis dormit.",
      exampleGloss: "At last the dog is sleeping."
    }
  ],

  readings: [
    {
      title: "Ad forum",
      intro: "The whole family sets out through the streets of Ostia toward the forum — and Ferox smells opportunity.",
      paragraphs: [
        "Māne est. Mārcus et Līvia cum Quīntō et Paullā per viās Ostiae ambulant. Ferōx quoque cum familiā ambulat; canis laetus est, quod in viīs cibus est — hīc botulus, ibi cāseus!",
        "In viīs turba magna est. Multī virī ad forum properant; servī saccōs et amphorās portant. Quīntus prope Mārcum ambulat et aedificia magna spectat. Paulla statuās videt et rīdet.",
        "Tandem familia ad forum appropinquat. In forō templum magnum stat; prope templum statua pulchra est. «Ecce!» inquit Paulla. «Statua magna est, sed nōn ambulat!» Mārcus rīdet et fīliae fābulam dē statuā nārrat."
      ],
      glosses: {
        "māne": "in the morning; «māne est» = it is morning",
        "est": "is",
        "mārcus": "Marcus (the father, a grain merchant)",
        "et": "and",
        "līvia": "Livia (the mother)",
        "cum": "with (+ ablative)",
        "quīntō": "Quintus (abl. after «cum»)",
        "paullā": "Paulla (abl. after «cum»)",
        "per": "through (+ accusative)",
        "viās": "streets (acc. pl. — object of «per»)",
        "ostiae": "of Ostia (gen.) — the port town of Rome",
        "ambulant": "(they) walk",
        "ferōx": "Ferox (the family dog)",
        "quoque": "also, too",
        "familiā": "the family (abl. after «cum»)",
        "ambulat": "(he/she/it) walks",
        "canis": "the dog",
        "laetus": "happy",
        "quod": "because",
        "in": "in, on (+ abl.)",
        "viīs": "the streets (abl. pl. after «in»)",
        "cibus": "food",
        "hīc": "here",
        "botulus": "a sausage",
        "ibi": "there",
        "cāseus": "cheese",
        "turba": "a crowd",
        "magna": "big, large",
        "multī": "many",
        "virī": "men (nom. pl.)",
        "ad": "to, toward (+ accusative)",
        "forum": "the forum (acc. after «ad»)",
        "properant": "(they) hurry",
        "servī": "slaves (nom. pl.)",
        "saccōs": "sacks (acc. pl.)",
        "amphorās": "amphoras, large jars (acc. pl.)",
        "portant": "(they) carry",
        "quīntus": "Quintus (the son, 12)",
        "prope": "near (+ accusative)",
        "mārcum": "Marcus (acc. after «prope»)",
        "aedificia": "buildings (acc. pl., neuter)",
        "spectat": "(he) looks at",
        "paulla": "Paulla (the daughter, 8)",
        "statuās": "statues (acc. pl.)",
        "videt": "(she) sees",
        "rīdet": "(he/she) laughs",
        "tandem": "at last, finally",
        "familia": "the family (nom.)",
        "appropinquat": "(it) approaches, draws near",
        "forō": "the forum (abl. after «in»)",
        "templum": "a temple (first nom., the subject of «stat»; then acc. after «prope»)",
        "magnum": "great, big (neuter)",
        "stat": "(it) stands",
        "statua": "a statue",
        "pulchra": "beautiful",
        "ecce": "look!",
        "inquit": "says (used with quoted speech)",
        "sed": "but",
        "nōn": "not",
        "fīliae": "to his daughter (dat. — she gets told the story)",
        "fābulam": "a story (acc.)",
        "dē": "about (+ abl.; literally «down from»)",
        "statuā": "the statue (abl. after «dē»)",
        "nārrat": "(he) tells"
      },
      translation: [
        "It is morning. Marcus and Livia are walking with Quintus and Paulla through the streets of Ostia. Ferox is walking with the family too; the dog is happy, because there is food in the streets — a sausage here, cheese there!",
        "In the streets there is a big crowd. Many men are hurrying to the forum; slaves are carrying sacks and amphoras. Quintus walks near Marcus and looks at the big buildings. Paulla sees the statues and laughs.",
        "At last the family approaches the forum. In the forum stands a great temple; near the temple is a beautiful statue. «Look!» says Paulla. «The statue is big, but it doesn't walk!» Marcus laughs and tells his daughter a story about the statue."
      ],
      questions: [
        {
          q: "Why is Ferox happy as the family walks through the streets?",
          options: [
            "He loves big crowds",
            "There is food in the streets — a sausage here, cheese there",
            "He is going to see Titus",
            "Livia gave him breakfast"
          ],
          answer: 1,
          explain: "«canis laetus est, quod in viīs cibus est — hīc botulus, ibi cāseus»: he is happy because there is food in the streets."
        },
        {
          q: "Where are the many men hurrying?",
          options: ["To the harbor", "To the baths", "To the forum", "To the theater"],
          answer: 2,
          explain: "«Multī virī ad forum properant» — ad + accusative = to, toward the forum."
        },
        {
          q: "In «per viās Ostiae ambulant», why does «viās» end in ‑ās?",
          options: [
            "It is nominative plural — the subject",
            "It is accusative — «per» takes the accusative",
            "It is ablative — «per» takes the ablative",
            "It is genitive singular — «of the street»"
          ],
          answer: 1,
          explain: "«per» always takes the accusative, so «viās» wears the accusative-plural ending ‑ās. («Ostiae» is the genitive: the streets of Ostia.)"
        },
        {
          q: "What does Paulla find funny about the statue?",
          options: [
            "It is very small",
            "It looks like Ferox",
            "It is big but doesn't walk",
            "It is holding a sausage"
          ],
          answer: 2,
          explain: "«Statua magna est, sed nōn ambulat!» — the statue is big, but it doesn't walk. Paulla is easily amused."
        }
      ]
    },
    {
      title: "Sine Paullā",
      intro: "From the forum the family heads for the harbor — but somewhere in the crowd, Paulla disappears.",
      paragraphs: [
        "Deinde familia ē forō ambulat et ā templō ad portum properat, quod ibi nāvis Titī est. Sed in viīs turba magna est. Subitō Ferōx botulum videt et per turbam properat — et Paulla quoque per turbam properat!",
        "Subitō Līvia stat. «Paulla nōn hīc est!» inquit. Familia sine Paullā per viās oppidī errat. Quīntus in theātrum intrat — Paulla ibi nōn est. Līvia prope balneum stat et fīliam vocat — puella nōn respondet.",
        "Tandem Quīntus clāmat: «Ecce Ferōx! Canis prope portum stat — et ibi Paulla quoque est!» Familia ad portum properat. Paulla cum Titō prope aquam stat. «Salvē!» inquit Titus et rīdet. Paulla fābulam nārrat: «Ferōx ad portum properat — et ecce, Titus hīc est!»",
        "Līvia ad fīliam properat et puellam tenet. Sed Ferōx nōn laetus est: canis sine botulō stat! Titus rīdet et botulum novum ē saccō portat. Tandem familia laeta domum ambulat."
      ],
      glosses: {
        "deinde": "then, next",
        "familia": "the family (nom.)",
        "ē": "out of (+ abl.)",
        "forō": "the forum (abl. after «ē»)",
        "ambulat": "(it) walks",
        "et": "and",
        "ā": "from, away from (+ abl.)",
        "templō": "the temple (abl. after «ā»)",
        "ad": "to, toward (+ accusative)",
        "portum": "the harbor (acc. after «ad»/«prope»)",
        "properat": "(he/she/it) hurries",
        "quod": "because",
        "ibi": "there",
        "nāvis": "the ship (nom.)",
        "titī": "of Titus (gen.) — Livia’s brother, the sea captain",
        "est": "is",
        "sed": "but",
        "in": "in (+ abl.); into (+ acc.)",
        "viīs": "the streets (abl. pl. after «in»)",
        "turba": "a crowd",
        "magna": "big",
        "subitō": "suddenly",
        "ferōx": "Ferox (the dog)",
        "botulum": "a sausage (acc.)",
        "videt": "(he) sees",
        "per": "through (+ accusative)",
        "turbam": "the crowd (acc. after «per»)",
        "paulla": "Paulla (the daughter, 8)",
        "quoque": "also, too",
        "līvia": "Livia (the mother)",
        "stat": "(he/she) stands, stops still",
        "nōn": "not",
        "hīc": "here",
        "inquit": "says (used with quoted speech)",
        "sine": "without (+ abl.)",
        "paullā": "Paulla (abl. after «sine»)",
        "viās": "the streets (acc. pl. after «per»)",
        "oppidī": "of the town (gen.)",
        "errat": "(it) wanders",
        "quīntus": "Quintus (the son, 12)",
        "theātrum": "the theater (acc. after «in» = into)",
        "intrat": "(he) enters, goes in",
        "prope": "near (+ accusative)",
        "balneum": "the bathhouse (acc. after «prope»)",
        "fīliam": "her daughter (acc.)",
        "vocat": "(she) calls",
        "puella": "the girl",
        "respondet": "(she) answers",
        "tandem": "at last, finally",
        "clāmat": "(he) shouts",
        "ecce": "look!",
        "canis": "the dog",
        "cum": "with (+ ablative)",
        "titō": "Titus (abl. after «cum»)",
        "aquam": "the water (acc. after «prope»)",
        "salvē": "hello!",
        "titus": "Titus (Livia’s brother, the sea captain)",
        "rīdet": "(he) laughs",
        "fābulam": "the story (acc.)",
        "nārrat": "(she) tells",
        "puellam": "the girl (acc.)",
        "tenet": "(she) holds",
        "laetus": "happy",
        "botulō": "a sausage (abl. after «sine»)",
        "novum": "new (acc.)",
        "saccō": "a sack (abl. after «ē»)",
        "portat": "(he) carries, brings",
        "laeta": "happy (fem.)",
        "domum": "home, homeward (special accusative — no preposition needed)"
      },
      translation: [
        "Then the family walks out of the forum and hurries from the temple toward the harbor, because Titus's ship is there. But in the streets there is a big crowd. Suddenly Ferox sees a sausage and hurries through the crowd — and Paulla hurries through the crowd too!",
        "Suddenly Livia stops. «Paulla is not here!» she says. The family wanders through the streets of the town without Paulla. Quintus goes into the theater — Paulla is not there. Livia stands near the bathhouse and calls her daughter — the girl does not answer.",
        "At last Quintus shouts: «Look — Ferox! The dog is standing near the harbor — and Paulla is there too!» The family hurries to the harbor. Paulla is standing with Titus near the water. «Hello!» says Titus, and laughs. Paulla tells the story: «Ferox hurries to the harbor — and look, Titus is here!»",
        "Livia hurries to her daughter and holds the girl tight. But Ferox is not happy: the dog stands there without a sausage! Titus laughs and brings a new sausage out of a sack. At last the family walks home happy."
      ],
      questions: [
        {
          q: "Why does the family head for the harbor after leaving the forum?",
          options: [
            "To buy fish at the market",
            "Because Titus's ship is there",
            "To watch the ships sail away",
            "Because Ferox lives there"
          ],
          answer: 1,
          explain: "«ad portum properat, quod ibi nāvis Titī est» — because Titus's ship is there. «Titī» is genitive: the ship of Titus."
        },
        {
          q: "Where does Quintus go in to look for Paulla?",
          options: ["Into the theater", "Into the bathhouse", "Into the temple", "Into a shop"],
          answer: 0,
          explain: "«Quīntus in theātrum intrat» — in + accusative marks motion: he goes into the theater."
        },
        {
          q: "Where — and with whom — is Paulla finally found?",
          options: [
            "Near the harbor, with Titus",
            "In the forum, with a merchant",
            "Near the bathhouse, alone",
            "At home, with Livia"
          ],
          answer: 0,
          explain: "«Canis prope portum stat — et ibi Paulla quoque est!… Paulla cum Titō prope aquam stat.»"
        },
        {
          q: "Why is Ferox unhappy at the harbor, and how does Titus fix it?",
          options: [
            "He is lost; Paulla finds him",
            "He has no sausage; Titus brings a new one out of a sack",
            "He is afraid of the water; Quintus holds him",
            "He is tired; the family carries him home"
          ],
          answer: 1,
          explain: "«canis sine botulō stat» — sausage-less! Then «Titus… botulum novum ē saccō portat»: a new sausage out of a sack."
        }
      ]
    }
  ],

  quiz: [
    {
      prompt: "Which of these prepositions takes the accusative case?",
      options: ["cum", "sine", "per", "dē"],
      answer: 2,
      explain: "«per» (through) takes the accusative: «per viās». The other three — «cum», «sine», «dē» — all take the ablative."
    },
    {
      prompt: "In «Paulla in theātrum intrat», the phrase «in theātrum» means…",
      options: [
        "in the theater (she is already inside)",
        "near the theater",
        "out of the theater",
        "into the theater (moving inward)"
      ],
      answer: 3,
      explain: "«theātrum» is accusative, and in + accusative signals motion: into the theater. Location would be ablative: «in theātrō»."
    },
    {
      prompt: "In «Familia in forō stat», why does «forō» end in ‑ō?",
      options: [
        "It is accusative — the direct object of «stat»",
        "It is ablative — in + ablative expresses location",
        "It is dative — the forum is receiving something",
        "It is genitive — it means «of the forum»"
      ],
      answer: 1,
      explain: "After «in» marking the place where something simply is, the noun is ablative: «in forō» = in the forum. «stat» takes no object at all."
    },
    {
      prompt: "What does «sine aquā» mean?",
      options: ["with water", "near the water", "without water", "into the water"],
      answer: 2,
      explain: "«sine» + ablative = without: «sine aquā», without water."
    },
    {
      prompt: "«Servī ē tabernā properant.» Where are the slaves hurrying?",
      options: ["into the shop", "around the shop", "behind the shop", "out of the shop"],
      answer: 3,
      explain: "«ē/ex» + ablative = out of: «ē tabernā», out of the shop."
    },
    {
      prompt: "In «Mārcus cum Titō ambulat», what case is «Titō», and why?",
      options: [
        "Dative — Titus is receiving something",
        "Accusative — Titus is the direct object",
        "Ablative — «cum» always takes the ablative",
        "Nominative — Titus is the subject"
      ],
      answer: 2,
      explain: "The ‑ō ending could be dative or ablative on its own, but the preposition decides: «cum» takes only the ablative."
    },
    {
      prompt: "In «Mārcus fābulam dē statuā nārrat», what does «dē statuā» mean?",
      options: [
        "down from the statue",
        "toward the statue",
        "about the statue",
        "without the statue"
      ],
      answer: 2,
      explain: "With a verb of telling, «dē» + ablative means about: he tells a story about the statue. «Down from» is its literal, physical sense («dē mūrō»)."
    },
    {
      prompt: "Which sentence means «The girl hurries through the crowd»?",
      options: [
        "Puella per turbam properat.",
        "Puella cum turbā properat.",
        "Puella prope turbam properat.",
        "Puella sine turbā properat."
      ],
      answer: 0,
      explain: "«per» + accusative = through. The others: «cum turbā» = with the crowd, «prope turbam» = near the crowd, «sine turbā» = without the crowd."
    }
  ]
});
