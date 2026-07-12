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
      body: "<p>Movement and direction call for the accusative: <span class=\"la\">ad forum</span> (to the forum), <span class=\"la\">per viās</span> (through the streets), <span class=\"la\">prope portum</span> (near the harbor), and <span class=\"la\">in theātrum</span> (<em>into</em> the theater). If the ablative six mostly answer <em>where?</em>, these mostly answer <em>where to?</em></p><p>You have been reading accusatives as direct objects since unit 4 — this is the same ending with a new employer. In <span class=\"la\">Lupo per turbam properat</span>, the dog is not hurrying the crowd anywhere; <span class=\"la\">turbam</span> is accusative simply because <span class=\"la\">per</span> demands it.</p>",
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
      example: "Quinn cum Paulā per viās ambulat.",
      exampleGloss: "Quinn walks through the streets with Paula."
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
      example: "Avunculus Ted fābulās dē undīs nārrat.",
      exampleGloss: "Uncle Ted tells stories about the waves."
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
      example: "Mark in balneō sedet.",
      exampleGloss: "Mark sits in the bath."
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
      example: "Lupo per oppidum errat.",
      exampleGloss: "Lupo wanders through the town."
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
      intro: "The whole family sets out through the streets of Ostia toward the forum — and Lupo smells opportunity.",
      paragraphs: [
        "Māne est. Mark et Julia cum Quinn et Paulā per viās Ostiae ambulant. Lupo quoque cum familiā ambulat; canis laetus est, quod in viīs cibus est — hīc botulus, ibi cāseus!",
        "In viīs turba magna est. Multī virī ad forum properant; servī saccōs et amphorās portant. Quinn prope patrem ambulat et aedificia magna spectat. Paula statuās videt et rīdet.",
        "Tandem familia ad forum appropinquat. In forō templum magnum stat; prope templum statua pulchra est. «Ecce!» inquit Paula. «Statua magna est, sed nōn ambulat!» Mark rīdet et fīliae fābulam dē statuā nārrat."
      ],
      glosses: {
        "māne": "in the morning; «māne est» = it is morning",
        "est": "is",
        "mark": "Mark (the father, a grain merchant — his name never changes form)",
        "et": "and",
        "julia": "Julia (the mother)",
        "cum": "with (+ ablative)",
        "quinn": "Quinn (the son, 12 — his name never changes form, even after «cum»)",
        "paulā": "Paula (abl. after «cum» — her name declines)",
        "per": "through (+ accusative)",
        "viās": "streets (acc. pl. — object of «per»)",
        "ostiae": "of Ostia (gen.) — the port town of Rome",
        "ambulant": "(they) walk",
        "lupo": "Lupo (the family dog — quasi lupus!)",
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
        "prope": "near (+ accusative)",
        "patrem": "his father (acc. after «prope»)",
        "aedificia": "buildings (acc. pl., neuter)",
        "spectat": "(he) looks at",
        "paula": "Paula (the daughter, 8)",
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
        "It is morning. Mark and Julia are walking with Quinn and Paula through the streets of Ostia. Lupo is walking with the family too; the dog is happy, because there is food in the streets — a sausage here, cheese there!",
        "In the streets there is a big crowd. Many men are hurrying to the forum; slaves are carrying sacks and amphoras. Quinn walks near his father and looks at the big buildings. Paula sees the statues and laughs.",
        "At last the family approaches the forum. In the forum stands a great temple; near the temple is a beautiful statue. «Look!» says Paula. «The statue is big, but it doesn't walk!» Mark laughs and tells his daughter a story about the statue."
      ],
      questions: [
        {
          q: "Why is Lupo happy as the family walks through the streets?",
          options: [
            "He loves big crowds",
            "There is food in the streets — a sausage here, cheese there",
            "He is going to see Uncle Ted",
            "Julia gave him breakfast"
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
          q: "What does Paula find funny about the statue?",
          options: [
            "It is very small",
            "It looks like Lupo",
            "It is big but doesn't walk",
            "It is holding a sausage"
          ],
          answer: 2,
          explain: "«Statua magna est, sed nōn ambulat!» — the statue is big, but it doesn't walk. Paula is easily amused."
        }
      ]
    },
    {
      title: "Sine Paulā",
      intro: "From the forum the family heads for the harbor — but somewhere in the crowd, Paula disappears.",
      paragraphs: [
        "Deinde familia ē forō ambulat et ā templō ad portum properat, quod ibi nāvis avunculī est. Sed in viīs turba magna est. Subitō Lupo botulum videt et per turbam properat — et Paula quoque per turbam properat!",
        "Subitō Julia stat. «Paula nōn hīc est!» inquit. Familia sine Paulā per viās oppidī errat. Quinn in theātrum intrat — Paula ibi nōn est. Julia prope balneum stat et fīliam vocat — puella nōn respondet.",
        "Tandem Quinn clāmat: «Ecce Lupo! Canis prope portum stat — et ibi Paula quoque est!» Familia ad portum properat. Paula cum avunculō prope aquam stat. «Salvē!» inquit avunculus Ted et rīdet. Paula fābulam nārrat: «Lupo ad portum properat — et ecce, avunculus Ted hīc est!»",
        "Julia ad fīliam properat et puellam tenet. Sed Lupo nōn laetus est: canis sine botulō stat! Ted rīdet et botulum novum ē saccō portat. Tandem familia laeta domum ambulat."
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
        "avunculī": "of their uncle (gen.) — Ted, Julia’s brother, the sea captain",
        "est": "is",
        "sed": "but",
        "in": "in (+ abl.); into (+ acc.)",
        "viīs": "the streets (abl. pl. after «in»)",
        "turba": "a crowd",
        "magna": "big",
        "subitō": "suddenly",
        "lupo": "Lupo (the dog — quasi lupus!)",
        "botulum": "a sausage (acc.)",
        "videt": "(he) sees",
        "per": "through (+ accusative)",
        "turbam": "the crowd (acc. after «per»)",
        "paula": "Paula (the daughter, 8)",
        "quoque": "also, too",
        "julia": "Julia (the mother)",
        "stat": "(he/she) stands, stops still",
        "nōn": "not",
        "hīc": "here",
        "inquit": "says (used with quoted speech)",
        "sine": "without (+ abl.)",
        "paulā": "Paula (abl. after «sine» — her name declines)",
        "viās": "the streets (acc. pl. after «per»)",
        "oppidī": "of the town (gen.)",
        "errat": "(it) wanders",
        "quinn": "Quinn (the son, 12 — his name never changes form)",
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
        "avunculō": "her uncle (abl. after «cum»)",
        "aquam": "the water (acc. after «prope»)",
        "salvē": "hello!",
        "avunculus": "the uncle (nom.)",
        "ted": "Ted (the uncle — his name never changes form)",
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
        "Then the family walks out of the forum and hurries from the temple toward the harbor, because their uncle's ship is there. But in the streets there is a big crowd. Suddenly Lupo sees a sausage and hurries through the crowd — and Paula hurries through the crowd too!",
        "Suddenly Julia stops. «Paula is not here!» she says. The family wanders through the streets of the town without Paula. Quinn goes into the theater — Paula is not there. Julia stands near the bathhouse and calls her daughter — the girl does not answer.",
        "At last Quinn shouts: «Look — Lupo! The dog is standing near the harbor — and Paula is there too!» The family hurries to the harbor. Paula is standing with her uncle near the water. «Hello!» says Uncle Ted, and laughs. Paula tells the story: «Lupo hurries to the harbor — and look, Uncle Ted is here!»",
        "Julia hurries to her daughter and holds the girl tight. But Lupo is not happy: the dog stands there without a sausage! Ted laughs and brings a new sausage out of a sack. At last the family walks home happy."
      ],
      questions: [
        {
          q: "Why does the family head for the harbor after leaving the forum?",
          options: [
            "To buy fish at the market",
            "Because Uncle Ted's ship is there",
            "To watch the ships sail away",
            "Because Lupo lives there"
          ],
          answer: 1,
          explain: "«ad portum properat, quod ibi nāvis avunculī est» — because their uncle's ship is there. «avunculī» is genitive: the ship of the uncle."
        },
        {
          q: "Where does Quinn go in to look for Paula?",
          options: ["Into the theater", "Into the bathhouse", "Into the temple", "Into a shop"],
          answer: 0,
          explain: "«Quinn in theātrum intrat» — in + accusative marks motion: he goes into the theater."
        },
        {
          q: "Where — and with whom — is Paula finally found?",
          options: [
            "Near the harbor, with Uncle Ted",
            "In the forum, with a merchant",
            "Near the bathhouse, alone",
            "At home, with Julia"
          ],
          answer: 0,
          explain: "«Canis prope portum stat — et ibi Paula quoque est!… Paula cum avunculō prope aquam stat.»"
        },
        {
          q: "Why is Lupo unhappy at the harbor, and how does Ted fix it?",
          options: [
            "He is lost; Paula finds him",
            "He has no sausage; Ted brings a new one out of a sack",
            "He is afraid of the water; Quinn holds him",
            "He is tired; the family carries him home"
          ],
          answer: 1,
          explain: "«canis sine botulō stat» — sausage-less! Then «Ted… botulum novum ē saccō portat»: a new sausage out of a sack."
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
      prompt: "In «Paula in theātrum intrat», the phrase «in theātrum» means…",
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
      prompt: "In «Mark cum fīliō ambulat», what case is «fīliō», and why?",
      options: [
        "Dative — the son is receiving something",
        "Accusative — the son is the direct object",
        "Ablative — «cum» always takes the ablative",
        "Nominative — the son is the subject"
      ],
      answer: 2,
      explain: "The ‑ō ending could be dative or ablative on its own, but the preposition decides: «cum» takes only the ablative."
    },
    {
      prompt: "In «Mark fābulam dē statuā nārrat», what does «dē statuā» mean?",
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
