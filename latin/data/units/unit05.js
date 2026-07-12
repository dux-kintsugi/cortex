registerUnit({
  id: 5,
  stage: 1,
  title: "Portus",
  tagline: "The genitive case: whose ship, whose grain, whose sausage",

  grammar: [
    {
      heading: "One little ending means ‹of›",
      body: "<p>English shows possession with <strong>of</strong> or <strong>’s</strong>: the ship <em>of the uncle</em>, the uncle<em>’s</em> ship. Latin does the same job with nothing but an ending: <span class=\"la\">nāvis avunculī</span>. That ending is the <strong>genitive case</strong>, and it answers exactly one question: <em>whose? of what?</em></p><p>You already know the nominative (the do-er) and the accusative (the done-to). The genitive is the third case in your collection, and it is the gentlest of the three: it never changes what happens in the sentence. It just hangs a little ‹of…› label on the noun next door: <span class=\"la\">botulus nautae</span>, the sailor’s sausage; <span class=\"la\">vēlum nāvis</span>, the ship’s sail. The genitive can stand before or after its noun — Latin does not mind.</p>",
      table: {
        caption: "The genitive, 1st and 2nd declension",
        headers: ["Declension", "Genitive singular", "Genitive plural"],
        rows: [
          ["1st (puella, nauta)", "puellae — of the girl", "puellārum — of the girls"],
          ["2nd (dominus)", "dominī — of the master", "dominōrum — of the masters"],
          ["2nd neuter (vēlum)", "vēlī — of the sail", "vēlōrum — of the sails"]
        ]
      },
      tip: "Reading tip: a noun ending in ‑ae, ‑ī, ‑ārum, or ‑ōrum sitting right beside another noun almost always means ‹of…›. Try ‹of› first — it nearly always fits."
    },
    {
      heading: "Cuius…? Asking (and answering) whose",
      body: "<p>This unit’s little question word is <span class=\"la\">cuius</span> — <em>whose?</em> The answer comes back in the genitive, often with nothing but <span class=\"la\">est</span> or <span class=\"la\">sunt</span> holding it up: <span class=\"la\">Cuius est arca? Arca Juliae est.</span> Whose is the chest? It is Julia’s. Latin loves this bare pattern — there is no word for ‹belongs›; you just say <em>X is of-somebody</em>.</p><p>Family words are natural genitive magnets: <span class=\"la\">Mark est marītus Juliae</span> — Mark is Julia’s husband; <span class=\"la\">Ted est frāter Juliae</span> — Ted is Julia’s brother; <span class=\"la\">avunculus puerī puellaeque</span> — the uncle of the boy and the girl. (There is <span class=\"la\">‑que</span> again, glued to the second word.)</p><p>A note about the family’s names: Julia and Paula take Latin endings like any 1st-declension noun (<span class=\"la\">Juliae</span>, <span class=\"la\">Paulae</span> — of Julia, of Paula), but Mark, Quinn, Ted, and Lupo keep exactly one shape in every case — just as Hebrew names do in Latin Bibles (<span class=\"la\">vīdit Iacob</span>). When you need to <em>see</em> the case, lean on a family word: <span class=\"la\">nāvis avunculī</span>, the uncle’s ship.</p>",
      tip: "When a sentence is just noun + genitive + «est», read it as ‹…belongs to…› and move on. Nothing is hiding."
    },
    {
      heading: "Full of it: plēnus + genitive",
      body: "<p>One adjective in this unit takes a genitive sidekick: <span class=\"la\">plēnus</span>, <em>full</em>. Full <em>of what?</em> The genitive says: <span class=\"la\">amphora vīnī plēna est</span> — the amphora is full of wine; <span class=\"la\">saccī frūmentī plēnī sunt</span> — the sacks are full of grain.</p><p>So when you meet <span class=\"la\">plēnus</span>, glance around for a nearby genitive — it is usually carrying the interesting half of the sentence. A harbor that is merely <span class=\"la\">plēnus</span> is crowded; an amphora that is <span class=\"la\">vīnī plēna</span> is a party.</p>"
    },
    {
      heading: "The ‑ae ambush (and the ‑ī one too)",
      body: "<p>Here is the one genuine trap: the genitive singular endings look exactly like nominative plurals you already know. <span class=\"la\">puellae</span> can be <em>the girls</em> — or <em>of the girl</em>. <span class=\"la\">dominī</span> can be <em>the masters</em> — or <em>of the master</em>.</p><p>Two quick checks settle it every time. First, <strong>the verb</strong>: <span class=\"la\">nautae cantant</span> has a plural verb, so <span class=\"la\">nautae</span> is a plural subject — sailors, singing. Second, <strong>the neighbors</strong>: in <span class=\"la\">botulum nautae rapit</span> the verb is singular and <span class=\"la\">nautae</span> is snuggled up against <span class=\"la\">botulum</span> — so it is the sailor’s sausage, and somebody else is doing the snatching.</p>",
      table: {
        caption: "Same form, two jobs",
        headers: ["Form", "Could be…", "…or"],
        rows: [
          ["puellae", "the girls (nom. pl.)", "of the girl (gen. sg.)"],
          ["nautae", "the sailors (nom. pl.)", "of the sailor (gen. sg.)"],
          ["dominī", "the masters (nom. pl.)", "of the master (gen. sg.)"]
        ]
      },
      tip: "Check the verb first: plural verb → plural subject. Singular verb and a noun neighbor → you are probably looking at a genitive."
    }
  ],

  vocab: [
    {
      latin: "portus",
      forms: "portūs, m.",
      pos: "noun (4th decl.)",
      gloss: "harbor, port",
      example: "Portus Ostiae magnus est.",
      exampleGloss: "The harbor of Ostia is big."
    },
    {
      latin: "nāvis",
      forms: "nāvis, f.",
      pos: "noun (3rd decl.)",
      gloss: "ship",
      example: "Nāvis avunculī portum intrat.",
      exampleGloss: "The uncle’s ship enters the harbor."
    },
    {
      latin: "nauta",
      forms: "nautae, m.",
      pos: "noun (1st decl., masculine)",
      gloss: "sailor",
      example: "Nautae semper cantant.",
      exampleGloss: "Sailors are always singing."
    },
    {
      latin: "magister",
      forms: "magistrī, m.",
      pos: "noun (2nd decl.)",
      gloss: "master, captain; teacher",
      example: "Ted est magister nāvis.",
      exampleGloss: "Ted is the master of the ship."
    },
    {
      latin: "gubernātor",
      forms: "gubernātōris, m.",
      pos: "noun (3rd decl.)",
      gloss: "helmsman",
      example: "Gubernātor undās spectat.",
      exampleGloss: "The helmsman watches the waves."
    },
    {
      latin: "mare",
      forms: "maris, n.",
      pos: "noun (3rd decl., neuter)",
      gloss: "sea",
      example: "Mare magnum et altum est.",
      exampleGloss: "The sea is big and deep."
    },
    {
      latin: "unda",
      forms: "undae, f.",
      pos: "noun (1st decl.)",
      gloss: "wave",
      example: "Undae magnae sunt, sed nāvis bona est.",
      exampleGloss: "The waves are big, but the ship is good."
    },
    {
      latin: "vēlum",
      forms: "vēlī, n.",
      pos: "noun (2nd decl., neuter)",
      gloss: "sail",
      example: "Vēlum nāvis plēnum est.",
      exampleGloss: "The ship’s sail is full."
    },
    {
      latin: "ancora",
      forms: "ancorae, f.",
      pos: "noun (1st decl.)",
      gloss: "anchor",
      example: "Nautae ancoram tenent.",
      exampleGloss: "The sailors are holding the anchor."
    },
    {
      latin: "frūmentum",
      forms: "frūmentī, n.",
      pos: "noun (2nd decl., neuter)",
      gloss: "grain",
      example: "Frūmentum mercātōris est.",
      exampleGloss: "The grain is the merchant’s."
    },
    {
      latin: "saccus",
      forms: "saccī, m.",
      pos: "noun (2nd decl.)",
      gloss: "sack",
      example: "Servī saccōs frūmentī portant.",
      exampleGloss: "The slaves carry sacks of grain."
    },
    {
      latin: "amphora",
      forms: "amphorae, f.",
      pos: "noun (1st decl.)",
      gloss: "amphora, storage jar",
      example: "Amphora vīnī plēna est.",
      exampleGloss: "The amphora is full of wine."
    },
    {
      latin: "arca",
      forms: "arcae, f.",
      pos: "noun (1st decl.)",
      gloss: "chest, box",
      example: "Paula arcam magnam spectat.",
      exampleGloss: "Paula looks at the big chest."
    },
    {
      latin: "uxor",
      forms: "uxōris, f.",
      pos: "noun (3rd decl.)",
      gloss: "wife",
      example: "Julia est uxor mercātōris.",
      exampleGloss: "Julia is the merchant’s wife."
    },
    {
      latin: "marītus",
      forms: "marītī, m.",
      pos: "noun (2nd decl.)",
      gloss: "husband",
      example: "Mark est marītus Juliae.",
      exampleGloss: "Mark is Julia’s husband."
    },
    {
      latin: "vīta",
      forms: "vītae, f.",
      pos: "noun (1st decl.)",
      gloss: "life",
      example: "Vīta nautārum laeta est.",
      exampleGloss: "The life of sailors is a happy one."
    },
    {
      latin: "cuius",
      forms: "(gen. of «quis»)",
      pos: "pronoun (interrogative)",
      gloss: "whose?",
      example: "Cuius est arca?",
      exampleGloss: "Whose is the chest?"
    },
    {
      latin: "exspectō",
      forms: "exspectāre, exspectāvī, exspectātum",
      pos: "verb (1st conj.)",
      gloss: "wait for, expect",
      example: "Familia avunculum exspectat.",
      exampleGloss: "The family is waiting for the uncle."
    },
    {
      latin: "nāvigō",
      forms: "nāvigāre, nāvigāvī, nāvigātum",
      pos: "verb (1st conj.)",
      gloss: "sail",
      example: "Ted semper nāvigat.",
      exampleGloss: "Ted is always sailing."
    },
    {
      latin: "salūtō",
      forms: "salūtāre, salūtāvī, salūtātum",
      pos: "verb (1st conj.)",
      gloss: "greet",
      example: "Quinn et Paula avunculum salūtant.",
      exampleGloss: "Quinn and Paula greet their uncle."
    },
    {
      latin: "natō",
      forms: "natāre, natāvī, natātum",
      pos: "verb (1st conj.)",
      gloss: "swim",
      example: "Lupo laetus natat.",
      exampleGloss: "Lupo happily swims."
    },
    {
      latin: "maneō",
      forms: "manēre, mānsī, mānsum",
      pos: "verb (2nd conj.)",
      gloss: "remain, stay",
      example: "Ted nōn manet: semper nāvigat.",
      exampleGloss: "Ted does not stay: he is always sailing."
    },
    {
      latin: "altus",
      forms: "‑a, ‑um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "high, deep",
      example: "Mūrus hortī altus est.",
      exampleGloss: "The garden’s wall is high."
    },
    {
      latin: "longus",
      forms: "‑a, ‑um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "long",
      example: "Vīta nautae nōn semper longa est.",
      exampleGloss: "A sailor’s life is not always long."
    },
    {
      latin: "procul",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "far off, in the distance",
      example: "Nāvis procul est.",
      exampleGloss: "The ship is far off."
    }
  ],

  readings: [
    {
      title: "Nāvis Avunculī",
      intro: "Uncle Ted’s ship is coming in — the whole family heads down to the harbor of Ostia.",
      paragraphs: [
        "Portus Ostiae magnus est. Nautae clāmant et cantant; servī saccōs portant. Familia Fabia quoque portum intrat, quod avunculum exspectat: Ted est frāter Juliae et avunculus Quinn Paulaeque. Ted semper nāvigat.",
        "Quinn aquam spectat et subitō clāmat: «Ecce! Nāvis avunculī!» Nāvis procul est; vēlum plēnum est, undae altae sunt, sed gubernātor bonus est. Mox nāvis magna portum intrat.",
        "Ted, magister nāvis, familiam videt et clāmat: «Salvē, salvē!» Quinn et Paula avunculum laetī salūtant. Lupo quoque laetus est — sed subitō botulum nautae videt! Canis malus botulum rapit et dēvorat. Nauta īrātus clāmat, sed Lupo iam procul est."
      ],
      glosses: {
        "portus": "harbor (nom. — the subject)",
        "ostiae": "of Ostia (gen.) — Ostia is the port town of Rome",
        "magnus": "big, great",
        "est": "is",
        "nautae": "sailors (nom. pl.); but in «botulum nautae»: the sailor’s (gen. sg. — same spelling!)",
        "clāmant": "(they) shout",
        "et": "and",
        "cantant": "(they) sing",
        "servī": "slaves (nom. pl.)",
        "saccōs": "sacks (acc. pl. — object)",
        "portant": "(they) carry",
        "familia": "family (nom.)",
        "fabia": "Fabian — the family’s name (the familia Fabia)",
        "quoque": "also, too",
        "portum": "harbor (acc. — object of «intrat»)",
        "intrat": "enters",
        "quod": "because",
        "avunculum": "uncle (acc. — object)",
        "exspectat": "is waiting for",
        "ted": "Ted, Julia’s brother, a ship’s captain — his name never changes form",
        "frāter": "brother",
        "juliae": "of Julia, Julia’s (gen. — Julia is the mother)",
        "avunculus": "uncle (your mother’s brother)",
        "quinn": "Quinn, the son (twelve years old, mad about ships) — his name never changes form; after «avunculus» it means ‹of Quinn›",
        "paulaeque": "and of Paula (gen. + ‑que ‹and›)",
        "semper": "always",
        "nāvigat": "sails, is sailing",
        "aquam": "water (acc.)",
        "spectat": "watches, looks at",
        "subitō": "suddenly",
        "clāmat": "shouts",
        "ecce": "look!",
        "nāvis": "ship (nom.); after another noun: of the ship (gen. — same form)",
        "avunculī": "of the uncle, the uncle’s (gen.)",
        "procul": "far off, in the distance",
        "vēlum": "sail (nom.)",
        "plēnum": "full",
        "undae": "waves (nom. pl.)",
        "altae": "high",
        "sunt": "are",
        "sed": "but",
        "gubernātor": "helmsman (nom.)",
        "bonus": "good",
        "mox": "soon",
        "magna": "big",
        "magister": "master, captain: «magister nāvis» = the captain of the ship",
        "familiam": "family (acc. — object)",
        "videt": "sees",
        "salvē": "hello!",
        "paula": "Paula, the daughter (eight years old, fearless) — her name declines like «puella»",
        "laetī": "happy (describing both children at once)",
        "salūtant": "(they) greet",
        "lupo": "Lupo, the family dog — a lovable menace (his name never changes form)",
        "laetus": "happy",
        "botulum": "sausage (acc. — object; the sailor’s lunch)",
        "canis": "dog",
        "malus": "bad, naughty",
        "rapit": "snatches, grabs",
        "dēvorat": "devours, gobbles up",
        "nauta": "sailor (nom. sg.)",
        "īrātus": "angry",
        "iam": "already, by now"
      },
      translation: [
        "The harbor of Ostia is big. Sailors are shouting and singing; slaves are carrying sacks. The Fabius family enters the harbor too, because it is waiting for the uncle: Ted is Julia’s brother and the uncle of Quinn and Paula. Ted is always sailing.",
        "Quinn watches the water and suddenly shouts: «Look! Uncle’s ship!» The ship is far off; the sail is full, the waves are high, but the helmsman is good. Soon the big ship enters the harbor.",
        "Ted, the captain of the ship, sees the family and shouts: «Hello, hello!» Quinn and Paula happily greet their uncle. Lupo is happy too — but suddenly he sees a sailor’s sausage! The naughty dog snatches the sausage and devours it. The angry sailor shouts, but Lupo is already far away."
      ],
      questions: [
        {
          q: "Why does the family go into the harbor?",
          options: [
            "To buy grain at the market",
            "They are waiting for Uncle Ted",
            "To watch the slaves work",
            "Lupo ran there and they followed"
          ],
          answer: 1,
          explain: "«portum intrat, quod avunculum exspectat» — «quod» means ‹because›: the family is waiting for their uncle, Ted."
        },
        {
          q: "In «nāvis avunculī», what does the form «avunculī» tell you?",
          options: [
            "The uncle is performing the action",
            "The ship belongs to the uncle",
            "The uncle is being spoken to",
            "The uncle is the object of the verb"
          ],
          answer: 1,
          explain: "«avunculī» ends in ‑ī — genitive singular, ‹of the uncle›. It is the uncle’s ship."
        },
        {
          q: "How is Ted related to the children?",
          options: [
            "He is their father",
            "He is their grandfather",
            "He is their uncle — their mother’s brother",
            "He is just a family friend"
          ],
          answer: 2,
          explain: "«Ted est frāter Juliae et avunculus Quinn Paulaeque» — Julia’s brother, so the children’s uncle («avunculus» is specifically a maternal uncle)."
        },
        {
          q: "What does Lupo steal at the harbor?",
          options: [
            "A sailor’s sausage",
            "A sack of grain",
            "An egg from a merchant",
            "Cheese from Ted’s ship"
          ],
          answer: 0,
          explain: "«botulum nautae videt… rapit et dēvorat» — he sees the sailor’s sausage, snatches it, and devours it."
        }
      ]
    },
    {
      title: "Cuius Est Arca?",
      intro: "The cargo comes ashore — sacks, amphorae, and one mysterious chest. Time to sort out whose is whose.",
      paragraphs: [
        "Nāvis avunculī iam manet — ancora aquam intrat! Nautae labōrant et saccōs portant; saccī frūmentī plēnī sunt. «Cuius est frūmentum?» inquit Paula. «Frūmentum patris est,» inquit Ted. «Mark est mercātor frūmentī.»",
        "Nautae amphorās quoque portant; amphorae vīnī et oleī plēnae sunt. «Cuius sunt amphorae?» inquit Quinn. «Dominī tabernae sunt,» inquit Ted. «Dominus tabernae vīnum semper optat!»",
        "Deinde nautae arcam magnam portant. «Cuius est arca?» inquit Paula. Ted rīdet: «Arca Juliae est… sed mox, mox!» Julia quoque, māter Paulae, rīdet; Paula tamen arcam spectat et spectat.",
        "Subitō Lupo aquam intrat — canis natat! Nautae rīdent. Quinn mare spectat. «Vīta nautae pulchra est!» inquit puer. «Mare magnum est, undae altae sunt! Mox Quinn quoque nauta est!» Ted rīdet: «Vīta nautae longa nōn semper est… sed pulchra est.» Familia laeta est: Ted iam nōn nāvigat, sed manet."
      ],
      glosses: {
        "nāvis": "ship (nom.): «nāvis avunculī» = the uncle’s ship",
        "avunculī": "of the uncle, the uncle’s (gen.)",
        "iam": "now, by now; «iam nōn» = no longer",
        "manet": "stays, stays put, is at rest",
        "ancora": "anchor (nom.)",
        "aquam": "water (acc.)",
        "intrat": "enters, goes into",
        "nautae": "sailors (nom. pl.); but in «vīta nautae»: of a sailor, a sailor’s (gen. sg.)",
        "labōrant": "(they) work",
        "et": "and",
        "saccōs": "sacks (acc. — object)",
        "portant": "(they) carry",
        "saccī": "the sacks (nom. pl. — subject)",
        "frūmentī": "of grain (gen.): «saccī frūmentī» = sacks of grain",
        "plēnī": "full (with the genitive: full of…)",
        "sunt": "are",
        "cuius": "whose?",
        "est": "is",
        "frūmentum": "grain (nom.)",
        "inquit": "says (used with quoted speech)",
        "paula": "Paula, the daughter",
        "patris": "of the father, father’s (gen. — a 3rd-declension ‹of›: same job, different ending)",
        "ted": "Ted, the ship’s captain — his name never changes form",
        "mark": "Mark, the father — his name never changes form",
        "mercātor": "merchant: «mercātor frūmentī» = a grain merchant",
        "quoque": "also, too",
        "amphorās": "amphorae, storage jars (acc. — object)",
        "amphorae": "the amphorae (nom. pl. — subject)",
        "vīnī": "of wine (gen. — with «plēnae»: full of wine)",
        "oleī": "of oil (gen.)",
        "plēnae": "full (with the genitive: full of…)",
        "quinn": "Quinn, the son — his name never changes form",
        "dominī": "the master’s, of the master (gen. — ‹they belong to the master›)",
        "tabernae": "of the tavern (gen.): «dominus tabernae» = the tavern keeper",
        "dominus": "master, owner",
        "vīnum": "wine (acc. — object)",
        "semper": "always",
        "optat": "wants, wishes for",
        "deinde": "then, next",
        "arcam": "chest, box (acc. — object)",
        "magnam": "big",
        "arca": "chest, box (nom.)",
        "rīdet": "laughs",
        "juliae": "of Julia, Julia’s (gen.)",
        "sed": "but",
        "mox": "soon",
        "julia": "Julia, the mother — her name declines: Julia, Juliae…",
        "māter": "mother: «māter Paulae» = Paula’s mother",
        "paulae": "of Paula, Paula’s (gen.)",
        "tamen": "however, though",
        "spectat": "looks at, stares at",
        "subitō": "suddenly",
        "lupo": "Lupo, the family dog — quasi lupus! (but his name never changes form)",
        "canis": "dog",
        "natat": "swims, is swimming",
        "rīdent": "(they) laugh",
        "mare": "sea (neuter — nominative and accusative look the same)",
        "vīta": "life (nom.): «vīta nautae» = a sailor’s life",
        "pulchra": "beautiful",
        "puer": "boy",
        "magnum": "big",
        "undae": "waves (nom. pl.)",
        "altae": "high",
        "nauta": "sailor (nom.)",
        "longa": "long",
        "nōn": "not",
        "familia": "family",
        "laeta": "happy",
        "nāvigat": "sails, is sailing"
      },
      translation: [
        "The uncle’s ship is at rest now — the anchor goes into the water! The sailors work and carry sacks; the sacks are full of grain. «Whose is the grain?» says Paula. «The grain is father’s,» says Ted. «Mark is a grain merchant.»",
        "The sailors carry amphorae too; the amphorae are full of wine and oil. «Whose are the amphorae?» says Quinn. «They are the tavern keeper’s,» says Ted. «The master of the tavern always wants wine!»",
        "Then the sailors carry a big chest. «Whose is the chest?» says Paula. Ted laughs: «The chest is Julia’s… but soon, soon!» Julia, Paula’s mother, laughs too; Paula, however, stares and stares at the chest.",
        "Suddenly Lupo goes into the water — the dog is swimming! The sailors laugh. Quinn gazes at the sea. «A sailor’s life is beautiful!» says the boy. «The sea is big, the waves are high! Soon Quinn is a sailor too!» Ted laughs: «A sailor’s life is not always long… but it is beautiful.» The family is happy: Ted is not sailing now, but staying."
      ],
      questions: [
        {
          q: "Whose is the grain?",
          options: [
            "The tavern keeper’s",
            "Ted’s",
            "Mark’s — the children’s father",
            "The sailors’"
          ],
          answer: 2,
          explain: "«Frūmentum patris est… Mark est mercātor frūmentī» — the grain belongs to the father, Mark, who is a grain merchant."
        },
        {
          q: "In «amphorae vīnī et oleī plēnae sunt», the genitives «vīnī» and «oleī» tell you…",
          options: [
            "who owns the amphorae",
            "what the amphorae are full of",
            "where the amphorae come from",
            "who made the amphorae"
          ],
          answer: 1,
          explain: "«plēnus» takes a genitive to say full ‹of› something: full of wine and oil."
        },
        {
          q: "What do we learn about the big chest?",
          options: [
            "It is full of grain for the family",
            "It is Julia’s — but Ted won’t say more yet",
            "It belongs to the tavern keeper",
            "Lupo chews it open on the dock"
          ],
          answer: 1,
          explain: "«Arca Juliae est… sed mox, mox!» — it is Julia’s, and Ted only teases: ‹soon, soon!›"
        },
        {
          q: "«Vīta nautae longa nōn semper est» — what does Ted mean?",
          options: [
            "A sailor’s life can be short — a bit of dark sailor humor",
            "Sailors always live to a ripe old age",
            "The voyage to Ostia took too long",
            "Quinn is too young to become a sailor"
          ],
          answer: 0,
          explain: "Word for word: ‹a sailor’s life is not always long›. Ted teases the starry-eyed boy — then grants that it is beautiful."
        }
      ]
    }
  ],

  quiz: [
    {
      prompt: "In «nāvis avunculī», who owns the ship?",
      options: [
        "The uncle",
        "The sailor",
        "The helmsman",
        "No one — «avunculī» is the ship’s name"
      ],
      answer: 0,
      explain: "«avunculī» is the genitive of «avunculus»: ‹of the uncle›. The ‑ī ending is your ‹of› signal."
    },
    {
      prompt: "In «Lupo botulum nautae rapit», whose sausage is it?",
      options: [
        "Lupo’s",
        "The sailor’s",
        "Nobody’s — «nautae» means ‹the sailors›",
        "Ted’s"
      ],
      answer: 1,
      explain: "The verb «rapit» is singular with «Lupo» as its subject, and «nautae» sits right next to «botulum» — genitive singular: the sailor’s sausage."
    },
    {
      prompt: "«puellae» can be ‹the girls› (subject) or ‹of the girl›. In «rosa puellae pulchra est», it means…",
      options: [
        "the girls, as the subject",
        "of the girl — it is the girl’s rose",
        "the girl, as the object",
        "girls who are being addressed"
      ],
      answer: 1,
      explain: "The verb «est» is singular and «puellae» snuggles up to «rosa»: ‹the girl’s rose is beautiful›."
    },
    {
      prompt: "«Cuius est arca?» asks…",
      options: [
        "What is in the chest?",
        "Where is the chest?",
        "Whose is the chest?",
        "How big is the chest?"
      ],
      answer: 2,
      explain: "«cuius» = ‹whose?› — and the answer comes back in the genitive: «Arca Juliae est»."
    },
    {
      prompt: "Which form means ‹of the sailors› — more than one sailor?",
      options: [
        "nauta",
        "nautae",
        "nautam",
        "nautārum"
      ],
      answer: 3,
      explain: "‑ārum is the 1st-declension genitive plural. «nautae» as a genitive is singular — one sailor only."
    },
    {
      prompt: "In «Mark est marītus Juliae», the ending of «Juliae» shows that…",
      options: [
        "Julia is the subject of the sentence",
        "Mark is Julia’s husband",
        "Julia is the direct object",
        "there are several women named Julia"
      ],
      answer: 1,
      explain: "Genitive ‑ae = ‹of Julia›: Mark is the husband of Julia. (Mark’s own name keeps one shape in every case.)"
    },
    {
      prompt: "Review: in «Nautae saccōs portant», which word is the direct object?",
      options: [
        "Nautae",
        "saccōs",
        "portant",
        "There is no object"
      ],
      answer: 1,
      explain: "«saccōs» ends in ‑ōs — accusative plural, the done-to case. «Nautae» (nom. pl.) do the carrying."
    },
    {
      prompt: "«Frūmentum dominī est» is best translated…",
      options: [
        "The master is grain",
        "The grain is the master’s",
        "The master has no grain",
        "The grain, like the master, exists"
      ],
      answer: 1,
      explain: "A genitive with «est» states possession: the grain is ‹of the master› — it belongs to him."
    }
  ]
});
