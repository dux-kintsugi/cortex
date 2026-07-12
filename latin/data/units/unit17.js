registerUnit({
  id: 17,
  stage: 2,
  title: "Fortior Quam Leō",
  tagline: "Third-declension adjectives, comparatives & superlatives — and «quam»",

  grammar: [
    {
      heading: "Adjectives join the third declension",
      body: "<p>Until now, every adjective you have met dressed like a 1st/2nd-declension noun: <span class=\"la\">magnus, magna, magnum</span>. Today’s crowd at the races — <span class=\"la\">fortis</span>, <span class=\"la\">omnis</span>, <span class=\"la\">ingēns</span>, <span class=\"la\">ferōx</span> — wears <strong>third-declension</strong> endings instead, the same family as <span class=\"la\">urbs</span> and <span class=\"la\">leō</span>.</p><p>Most of them have <strong>two</strong> nominative forms: <span class=\"la\">fortis</span> for masculine and feminine, <span class=\"la\">forte</span> for neuter. A few tough customers have only <strong>one</strong> — <span class=\"la\">ingēns</span>, <span class=\"la\">ferōx</span>, <span class=\"la\">audāx</span>, <span class=\"la\">fēlīx</span> — and, just like third-declension nouns, they hide their stem in the genitive: <span class=\"la\">ferōx, ferōcis</span> → stem <span class=\"la\">ferōc-</span>. (And <span class=\"la\">celer</span> shows off with three: <span class=\"la\">celer, celeris, celere</span>.)</p><p>Three small differences from the nouns you know: ablative singular in <span class=\"la\">-ī</span> (not <span class=\"la\">-e</span>), neuter plural in <span class=\"la\">-ia</span>, genitive plural in <span class=\"la\">-ium</span>. Everything else will feel familiar.</p>",
      table: {
        caption: "Third-declension adjective: fortis, forte (brave, strong)",
        headers: ["Case", "Masc./Fem. sg.", "Neuter sg.", "Masc./Fem. pl.", "Neuter pl."],
        rows: [
          ["Nominative", "fortis", "forte", "fortēs", "fortia"],
          ["Accusative", "fortem", "forte", "fortēs", "fortia"],
          ["Genitive", "fortis", "fortis", "fortium", "fortium"],
          ["Dative", "fortī", "fortī", "fortibus", "fortibus"],
          ["Ablative", "fortī", "fortī", "fortibus", "fortibus"]
        ]
      },
      tip: "Reading tip: an adjective ending in -x or -ns (ferōx, ingēns) keeps its stem in the genitive — peel off the -is: ferōcis → ferōc-, ingentis → ingent-. Then match it to its noun by case, not by look-alike endings: «leō ferōx» is a perfectly good pair."
    },
    {
      heading: "Fortior quam leō — the comparative",
      body: "<p>To say <em>braver</em>, <em>faster</em>, <em>sweeter</em>, Latin swaps the adjective’s ending for <span class=\"la\">-ior</span> (masculine and feminine) or <span class=\"la\">-ius</span> (neuter): <span class=\"la\">fortis</span> → <span class=\"la\">fortior</span>, <span class=\"la\">celer</span> → <span class=\"la\">celerior</span>. It works on the old 1st/2nd-declension adjectives too: <span class=\"la\">longus</span> → <span class=\"la\">longior</span>. The comparative then declines like a third-declension noun: <span class=\"la\">fortiōrem, fortiōrēs, fortiōris…</span></p><p>To name the loser of the comparison, use <span class=\"la\">quam</span> = <strong>than</strong>. The two things compared stand in the <strong>same case</strong>: <span class=\"la\">Julia celerior est quam Paula</span> — both nominative. One more trick: <span class=\"la\">quam</span> at the head of an exclamation means <em>how…!</em> — <span class=\"la\">Quam celerēs sunt equī!</span> ‘How fast the horses are!’</p>",
      table: {
        caption: "Building the comparative",
        headers: ["Positive", "Comparative", "Meaning"],
        rows: [
          ["fortis", "fortior", "braver, stronger"],
          ["celer", "celerior", "swifter"],
          ["audāx", "audācior", "bolder"],
          ["dulcis", "dulcior", "sweeter"],
          ["longus", "longior", "longer"]
        ]
      },
      tip: "Reading tip: -ior- in the middle of a word is one of Latin’s loudest signals — something is being compared. Spot it, then scan ahead for «quam» to find the runner-up."
    },
    {
      heading: "The superlative: -issimus (mostly)",
      body: "<p>For <em>bravest</em> or <em>very brave</em>, add <span class=\"la\">-issimus, -a, -um</span> to the stem: <span class=\"la\">fortissimus</span>, <span class=\"la\">audācissimus</span>. The result declines like <span class=\"la\">bonus</span> — back to friendly old endings.</p><p>Two families cheat. Adjectives whose masculine ends in <span class=\"la\">-er</span> double the r: <span class=\"la\">celer</span> → <span class=\"la\">celerrimus</span>, <span class=\"la\">pulcher</span> → <span class=\"la\">pulcherrimus</span>. And <span class=\"la\">facilis</span> and <span class=\"la\">difficilis</span> double the l: <span class=\"la\">facillimus</span>, <span class=\"la\">difficillimus</span>.</p><p>With a genitive plural, the superlative picks a champion out of a group: <span class=\"la\">fortissimus omnium</span> — ‘the bravest of them all’.</p>",
      table: {
        caption: "Building the superlative",
        headers: ["Positive", "Superlative", "Meaning"],
        rows: [
          ["fortis", "fortissimus", "bravest, very brave"],
          ["audāx", "audācissimus", "boldest"],
          ["celer", "celerrimus", "swiftest"],
          ["pulcher", "pulcherrimus", "most beautiful"],
          ["facilis", "facillimus", "easiest"]
        ]
      },
      tip: "A superlative doesn’t always compare — often it just turns the volume up: «leō ferōcissimus» can simply mean ‘a very fierce lion’. Read it as ‘extremely X’ unless an «omnium» tells you a contest is on."
    },
    {
      heading: "The famous four — and tam … quam",
      body: "<p>Four everyday adjectives refuse to play by the rules, exactly as they do in English (good, better, best): <span class=\"la\">bonus → melior → optimus</span>; <span class=\"la\">malus → peior → pessimus</span>; <span class=\"la\">magnus → maior → maximus</span>; <span class=\"la\">parvus → minor → minimus</span>. These are so common that Rome names buildings with them: the <span class=\"la\">Circus Maximus</span> is literally ‘the Greatest Racetrack’ — no false advertising there.</p><p>Finally, to say two things are <em>equally</em> something, Latin pairs <span class=\"la\">tam</span> with <span class=\"la\">quam</span>: <span class=\"la\">leō nōn erat tam ferōx quam canis noster</span> — ‘the lion was not <strong>as</strong> fierce <strong>as</strong> our dog.’ (Lupo would agree.)</p>",
      table: {
        caption: "Irregular comparison: the famous four",
        headers: ["Positive", "Comparative", "Superlative"],
        rows: [
          ["bonus (good)", "melior (better)", "optimus (best)"],
          ["malus (bad)", "peior (worse)", "pessimus (worst)"],
          ["magnus (big)", "maior (bigger)", "maximus (biggest)"],
          ["parvus (small)", "minor (smaller)", "minimus (smallest)"]
        ]
      },
      tip: "The stems are strange but the endings are honest: melior, peior, maior, minor still wear the comparative’s -or; optimus, pessimus, maximus, minimus wear the superlative’s -imus."
    }
  ],

  vocab: [
    {
      latin: "fortis",
      forms: "-e",
      pos: "adjective (3rd decl.)",
      gloss: "brave, strong",
      example: "Gladiātor fortis leōnem nōn timet.",
      exampleGloss: "The brave gladiator does not fear the lion."
    },
    {
      latin: "omnis",
      forms: "-e",
      pos: "adjective (3rd decl.)",
      gloss: "all, every",
      example: "Omnēs cīvēs hodiē in circō sunt.",
      exampleGloss: "All the citizens are in the circus today."
    },
    {
      latin: "ingēns",
      forms: "(gen. ingentis)",
      pos: "adjective (3rd decl., one ending)",
      gloss: "huge, enormous",
      example: "Amphitheātrum est aedificium ingēns.",
      exampleGloss: "The amphitheater is an enormous building."
    },
    {
      latin: "celer",
      forms: "celeris, celere",
      pos: "adjective (3rd decl.)",
      gloss: "swift, fast",
      example: "Equī celerēs per harēnam currunt.",
      exampleGloss: "Swift horses run across the track."
    },
    {
      latin: "brevis",
      forms: "-e",
      pos: "adjective (3rd decl.)",
      gloss: "short, brief",
      example: "Certāmen breve erat, sed iūcundum.",
      exampleGloss: "The race was short, but delightful."
    },
    {
      latin: "facilis",
      forms: "-e",
      pos: "adjective (3rd decl.)",
      gloss: "easy",
      example: "Victōria nōn semper facilis est.",
      exampleGloss: "Victory is not always easy."
    },
    {
      latin: "difficilis",
      forms: "-e",
      pos: "adjective (3rd decl.)",
      gloss: "difficult",
      example: "Iter ad urbem longum et difficile erat.",
      exampleGloss: "The journey to the city was long and difficult."
    },
    {
      latin: "dulcis",
      forms: "-e",
      pos: "adjective (3rd decl.)",
      gloss: "sweet",
      example: "Māla dulcia Paulam dēlectant.",
      exampleGloss: "Sweet apples delight Paula."
    },
    {
      latin: "gravis",
      forms: "-e",
      pos: "adjective (3rd decl.)",
      gloss: "heavy, serious",
      example: "Saccus frūmentī gravis est.",
      exampleGloss: "A sack of grain is heavy."
    },
    {
      latin: "fēlīx",
      forms: "(gen. fēlīcis)",
      pos: "adjective (3rd decl., one ending)",
      gloss: "lucky, fortunate, happy",
      example: "Hodiē fēlīx sum: pecūniam in viā inveniō!",
      exampleGloss: "Today I am lucky: I find money in the street!"
    },
    {
      latin: "audāx",
      forms: "(gen. audācis)",
      pos: "adjective (3rd decl., one ending)",
      gloss: "bold, daring",
      example: "Paula audāx est: leōnēs nōn timet.",
      exampleGloss: "Paula is bold: she is not afraid of lions."
    },
    {
      latin: "ferōx",
      forms: "(gen. ferōcis)",
      pos: "adjective (3rd decl., one ending)",
      gloss: "fierce, wild",
      example: "Canis Lupo nōn semper ferōx est: saepe dormit.",
      exampleGloss: "The dog Lupo is not always ferocious: he often sleeps."
    },
    {
      latin: "quam",
      forms: "(indēcl.)",
      pos: "adverb / conjunction",
      gloss: "than (after a comparative); how…! (in exclamations)",
      example: "Leō maior est quam canis.",
      exampleGloss: "A lion is bigger than a dog."
    },
    {
      latin: "tam",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "so; «tam … quam» = as … as",
      example: "Quinn nōn est tam audāx quam soror.",
      exampleGloss: "Quinn is not as bold as his sister."
    },
    {
      latin: "leō",
      forms: "leōnis, m.",
      pos: "noun (3rd decl.)",
      gloss: "lion",
      example: "Leō ingēns in harēnā stat.",
      exampleGloss: "A huge lion stands in the arena."
    },
    {
      latin: "gladiātor",
      forms: "gladiātōris, m.",
      pos: "noun (3rd decl.)",
      gloss: "gladiator",
      example: "Turba gladiātōrem fortem laudat.",
      exampleGloss: "The crowd praises the brave gladiator."
    },
    {
      latin: "aurīga",
      forms: "aurīgae, m.",
      pos: "noun (1st decl., masculine)",
      gloss: "charioteer",
      example: "Aurīga celer equōs albōs habet.",
      exampleGloss: "The fast charioteer has white horses."
    },
    {
      latin: "quadrīgae",
      forms: "quadrīgārum, f. (plural only)",
      pos: "noun (1st decl., plural)",
      gloss: "four-horse chariot team",
      example: "Quadrīgae per circum celeriter currunt.",
      exampleGloss: "The four-horse chariots race swiftly around the circus."
    },
    {
      latin: "harēna",
      forms: "harēnae, f.",
      pos: "noun (1st decl.)",
      gloss: "sand; arena, racetrack floor",
      example: "Leō in harēnam venit.",
      exampleGloss: "The lion comes into the arena."
    },
    {
      latin: "victor",
      forms: "victōris, m.",
      pos: "noun (3rd decl.)",
      gloss: "winner, victor",
      example: "Aurīga rūfus victor certāminis est.",
      exampleGloss: "The charioteer in red is the winner of the race."
    },
    {
      latin: "victōria",
      forms: "victōriae, f.",
      pos: "noun (1st decl.)",
      gloss: "victory",
      example: "Victōria dulcis est!",
      exampleGloss: "Victory is sweet!"
    },
    {
      latin: "certāmen",
      forms: "certāminis, n.",
      pos: "noun (3rd decl., neuter)",
      gloss: "contest, race",
      example: "Certāmina quadrīgārum puerum dēlectant.",
      exampleGloss: "The chariot races delight the boy."
    },
    {
      latin: "vincō",
      forms: "vincere, vīcī, victum",
      pos: "verb (3rd conj.)",
      gloss: "conquer, win",
      example: "Aurīga audāx saepe vincit.",
      exampleGloss: "A bold charioteer often wins."
    },
    {
      latin: "superō",
      forms: "superāre, superāvī, superātum",
      pos: "verb (1st conj.)",
      gloss: "overcome, surpass",
      example: "Nāvis magna undās superat.",
      exampleGloss: "The great ship overcomes the waves."
    },
    {
      latin: "fortiter",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "bravely",
      example: "Nautae in undīs fortiter labōrant.",
      exampleGloss: "The sailors toil bravely on the waves."
    }
  ],

  readings: [
    {
      title: "In Circō Maximō",
      intro: "Uncle Ted takes the family to the chariot races — along with, it seems, every other person in Rome.",
      paragraphs: [
        "Hodiē familia Fabia laetissima est: avunculus enim Ted omnēs ad Circum Maximum dūcit. Ibi certāmina quadrīgārum sunt. In circō turba ingēns sedet; clāmor cīvium maximus est. «Ecce!» inquit Ted. «Hic circus maximus omnium aedificiōrum urbis est.»",
        "Subitō quadrīgae in harēnam veniunt. Hic aurīga tunicam albam habet, ille rūfam. Equī celeriter currunt — quam celerēs sunt! Aurīga albus celer est, sed aurīga rūfus celerior. Quinn stat et clāmat: «Curre, curre! Vince!»",
        "Tandem aurīga rūfus omnēs superat: victor est! Turba gaudet et victōrem laudat. «Victōria dulcis est!» inquit Ted. «Aurīga rūfus fēlīx erat — et audāx. Aurīgae enim audācēs saepe vincunt.» Paula rīdet: «Ego quoque aurīga esse cupiō! Sum enim audācior quam frāter!»"
      ],
      glosses: {
        "hodiē": "today",
        "familia": "the family",
        "fabia": "Fabian — the family’s name",
        "laetissima": "overjoyed (superlative of «laeta» — very happy)",
        "est": "is",
        "avunculus": "uncle (nom. — subject)",
        "ted": "Ted (Julia’s brother, the ship’s captain — his name never changes form)",
        "enim": "for, you see (explains the sentence before)",
        "omnēs": "everyone, all (acc. pl. — object)",
        "ad": "to (+ acc.)",
        "circum": "the Circus (acc. after «ad» — the Circus Maximus, Rome’s great racetrack)",
        "maximum": "Maximus, ‘the Greatest’ (superlative of «magnus»)",
        "dūcit": "leads, takes",
        "ibi": "there",
        "certāmina": "races, contests (3rd decl. neuter pl.)",
        "quadrīgārum": "of four-horse chariot teams (gen. pl.)",
        "sunt": "there are; (they) are",
        "in": "in (+ abl.); into, onto (+ acc.)",
        "circō": "the circus (abl. after «in»)",
        "turba": "a crowd",
        "ingēns": "huge (3rd decl. adjective, one nominative for all genders)",
        "sedet": "sits",
        "clāmor": "the shouting, the roar",
        "cīvium": "of the citizens (gen. pl.)",
        "maximus": "the greatest, very great (superlative of «magnus»)",
        "ecce": "look!",
        "inquit": "says",
        "hic": "this",
        "circus": "circus, racetrack",
        "omnium": "of all (gen. pl. — ‘the greatest of all…’)",
        "aedificiōrum": "of the buildings (gen. pl.)",
        "urbis": "of the city (gen.)",
        "subitō": "suddenly",
        "quadrīgae": "the four-horse chariot teams (nom. pl. — subject)",
        "harēnam": "the sand, the track (acc. after «in» — onto the track)",
        "veniunt": "(they) come",
        "aurīga": "charioteer (a 1st-declension noun that is masculine!)",
        "tunicam": "a tunic (acc. — object)",
        "albam": "white (agreeing with «tunicam»)",
        "habet": "has, wears",
        "ille": "that one, the other",
        "rūfam": "a red one (supply «tunicam»)",
        "equī": "the horses (nom. pl. — subject)",
        "celeriter": "swiftly",
        "currunt": "(they) run",
        "quam": "how…! (exclamation); after a comparative: than",
        "celerēs": "fast (nom. pl., agreeing with «equī»)",
        "albus": "white — here, the one in white",
        "celer": "fast (nom. sg.)",
        "sed": "but",
        "rūfus": "red — here, the one in red",
        "celerior": "faster (comparative of «celer»)",
        "quinn": "Quinn (the son, 12 — his name never changes form)",
        "stat": "stands (he is on his feet with excitement)",
        "et": "and",
        "clāmat": "shouts",
        "curre": "run! (imperative)",
        "vince": "win! (imperative of «vincō»)",
        "tandem": "at last",
        "superat": "overtakes, defeats",
        "victor": "the winner",
        "gaudet": "rejoices",
        "victōrem": "the winner (acc. — object)",
        "laudat": "praises",
        "victōria": "victory",
        "dulcis": "sweet (3rd decl. adjective)",
        "fēlīx": "lucky (3rd decl. adjective, one nominative for all genders)",
        "erat": "was",
        "audāx": "bold, daring",
        "aurīgae": "charioteers (nom. pl. — subject)",
        "audācēs": "bold (nom. pl., agreeing with «aurīgae»)",
        "saepe": "often",
        "vincunt": "(they) win",
        "paula": "Paula (the daughter, 8 — fearless)",
        "rīdet": "laughs",
        "ego": "I",
        "quoque": "also, too",
        "esse": "to be (infinitive, with «cupiō»)",
        "cupiō": "I want",
        "sum": "I am",
        "audācior": "bolder (comparative of «audāx»)",
        "frāter": "brother (nom. — «quam» puts both terms of the comparison in the same case)"
      },
      translation: [
        "Today the Fabius family is overjoyed: Uncle Ted is taking everyone to the Circus Maximus. The chariot races are there. In the circus an enormous crowd is sitting; the roar of the citizens is tremendous. «Look!» says Ted. «This circus is the greatest of all the buildings of the city.»",
        "Suddenly the chariot teams come onto the track. This charioteer wears a white tunic, that one a red. The horses run at speed — how fast they are! The charioteer in white is fast, but the charioteer in red is faster. Quinn stands and shouts: «Run, run! Win!»",
        "At last the charioteer in red overtakes them all: he is the winner! The crowd rejoices and praises the victor. «Victory is sweet!» says Ted. «The red charioteer was lucky — and bold. Bold charioteers, you see, often win.» Paula laughs: «I want to be a charioteer too! After all, I am bolder than my brother!»"
      ],
      questions: [
        {
          q: "Why is the family so happy at the start of the reading?",
          options: [
            "Uncle Ted is taking them all to the races at the Circus Maximus",
            "Lupo has finally learned to behave",
            "They are sailing home to Ostia today",
            "Mark has sold all his grain at a good price"
          ],
          answer: 0,
          explain: "«avunculus enim Ted omnēs ad Circum Maximum dūcit» — Uncle Ted is leading everyone to the Circus, where the chariot races are held."
        },
        {
          q: "In «aurīga rūfus celerior est», what does the ending -ior tell you?",
          options: [
            "It is a superlative — ‘fastest of all’",
            "It is a comparative — ‘faster’ (than the other charioteer)",
            "It marks the plural",
            "It marks the genitive case"
          ],
          answer: 1,
          explain: "-ior is the comparative ending: celer → celerior, ‘faster’. The white charioteer is fast, but the red one is faster."
        },
        {
          q: "In «Quam celerēs sunt!», what is «quam» doing?",
          options: [
            "It means ‘than’ after a comparative",
            "It introduces an exclamation — ‘How fast they are!’",
            "It asks a yes/no question",
            "It negates the sentence"
          ],
          answer: 1,
          explain: "With no comparative in sight, «quam» at the head of the sentence is exclamatory: ‘How fast they are!’"
        },
        {
          q: "What does Paula claim at the end?",
          options: [
            "That she is bolder than her brother Quinn and wants to be a charioteer herself",
            "That the charioteer in white really won",
            "That she is faster than the horses",
            "That chariot racing is boring"
          ],
          answer: 0,
          explain: "«Ego quoque aurīga esse cupiō! Sum enim audācior quam frāter!» — she wants to be a charioteer, being (she says) bolder than her brother."
        }
      ]
    },
    {
      title: "Fortior Quam Leō",
      intro: "Next stop, the amphitheater: gladiators, a very large lion — and Paula, aged eight, with strong opinions.",
      paragraphs: [
        "Mox avunculus Ted familiam ad amphitheātrum dūcit. Aedificium est ingēns. «Estne amphitheātrum maius quam circus?» rogat Paula. «Minimē,» respondet Ted, «circus maior est. Sed hoc aedificium pulchrius est quam omnia aedificia urbis.» Intrant et sedent; ubīque hominēs sunt.",
        "Tum gladiātōrēs in harēnam veniunt et fortiter pugnant. Omnēs fortēs sunt, sed hic gladiātor, vir ingēns, omnēs superat. Turba clāmat: «Fortissimus omnium est!» Quinn stupet: «Gladiātōrēs fortiōrēs sunt quam mīlitēs!» «Fortasse,» inquit pater Mark et rīdet.",
        "Subitō omnēs tacent: leō in harēnam venit. Leō ingēns est et ferōx. Nunc gladiātor sōlus in mediā harēnā stat — omnium audācissimus. Leō celeriter currit; gladiātor nōn fugit, sed fortiter stat. Tandem gladiātor leōnem superat! Leō fessus est et — ecce! — in mediā harēnā dormit. Turba rīdet et clāmat: «Victor!»",
        "Deinde familia ad caupōnam ambulat et dē spectāculō nārrat. «Gladiātor fortior erat quam leō!» inquit Paula. «Ita,» respondet Quinn, «sed leō nōn erat tam ferōx quam canis noster. Lupo enim botulōs rapit — et numquam dormit!» Omnēs rīdent. «Vēra dīcis,» inquit Julia. «Canis noster ferōcior est quam omnēs leōnēs Rōmae!»"
      ],
      glosses: {
        "mox": "soon, presently",
        "avunculus": "uncle (nom. — subject)",
        "ted": "Ted (the uncle — his name never changes form)",
        "familiam": "the family (acc. — object)",
        "ad": "to (+ acc.)",
        "amphitheātrum": "the amphitheater (neuter — same form for nom. and acc.)",
        "dūcit": "leads, takes",
        "aedificium": "the building",
        "est": "is",
        "ingēns": "enormous (3rd decl. adjective)",
        "estne": "is…? (the -ne turns it into a yes/no question)",
        "maius": "bigger (neuter comparative of «magnus»)",
        "quam": "than (after a comparative); with «tam»: as",
        "circus": "the circus (the Circus Maximus of the last reading)",
        "rogat": "asks",
        "paula": "Paula (the daughter, 8)",
        "minimē": "no! not at all!",
        "respondet": "answers",
        "maior": "bigger (comparative of «magnus»)",
        "sed": "but",
        "hoc": "this (neuter, agreeing with «aedificium»)",
        "pulchrius": "more beautiful (neuter comparative of «pulcher»)",
        "omnia": "all (neuter pl., agreeing with «aedificia»)",
        "aedificia": "the buildings (neuter pl.)",
        "urbis": "of the city (gen.)",
        "intrant": "(they) go in",
        "et": "and",
        "sedent": "(they) sit down",
        "ubīque": "everywhere",
        "hominēs": "people (nom. pl.)",
        "sunt": "(they) are; there are",
        "tum": "then",
        "gladiātōrēs": "the gladiators (nom. pl. — subject)",
        "in": "into, onto (+ acc.); in (+ abl.)",
        "harēnam": "the arena (acc. after «in» — into the arena)",
        "veniunt": "(they) come",
        "fortiter": "bravely",
        "pugnant": "(they) fight («pugnāre», to fight — a story word)",
        "omnēs": "all, everyone (nom. or acc. pl. — let the verb decide)",
        "fortēs": "brave, strong (nom. pl.)",
        "hic": "this",
        "gladiātor": "gladiator",
        "vir": "a man",
        "superat": "overcomes, defeats",
        "turba": "the crowd",
        "clāmat": "shouts",
        "fortissimus": "the strongest, the bravest (superlative of «fortis»)",
        "omnium": "of (them) all (gen. pl. — ‘the strongest of all’)",
        "quinn": "Quinn (the son, 12 — his name never changes form)",
        "stupet": "is amazed",
        "fortiōrēs": "braver, stronger (comparative, nom. pl.)",
        "mīlitēs": "soldiers (after «quam» — same case as «gladiātōrēs», nominative)",
        "fortasse": "perhaps",
        "inquit": "says",
        "pater": "father (nom. — subject)",
        "mark": "Mark (the father — his name never changes form)",
        "rīdet": "laughs, smiles",
        "subitō": "suddenly",
        "tacent": "(they) fall silent («tacēre», to be silent — a story word)",
        "leō": "a lion (nom. — subject)",
        "venit": "comes",
        "ferōx": "fierce (just the adjective here — nothing to do with the dog)",
        "nunc": "now",
        "sōlus": "alone, on his own",
        "mediā": "the middle of (agreeing with «harēnā»)",
        "harēnā": "the arena (abl. after «in»)",
        "stat": "stands, stands his ground",
        "audācissimus": "the boldest (superlative of «audāx»)",
        "celeriter": "swiftly",
        "currit": "runs, charges",
        "nōn": "not",
        "fugit": "flees, runs away",
        "tandem": "at last",
        "leōnem": "the lion (acc. — object)",
        "fessus": "tired, worn out",
        "ecce": "look!",
        "dormit": "sleeps, falls asleep",
        "victor": "winner! (the crowd’s shout for the champion)",
        "deinde": "then, afterwards",
        "familia": "the family",
        "caupōnam": "the inn (acc. after «ad» — where the family is staying in Rome)",
        "ambulat": "walks",
        "dē": "about (+ abl.)",
        "spectāculō": "the show (abl. after «dē»)",
        "nārrat": "tells, talks",
        "fortior": "braver, stronger (comparative of «fortis»)",
        "erat": "was",
        "ita": "yes",
        "tam": "so; «tam … quam» = as … as",
        "canis": "dog",
        "noster": "our",
        "lupo": "Lupo (the family dog — his name never changes form; canis Lupo, quasi lupus!)",
        "enim": "for, after all",
        "botulōs": "sausages (acc. pl. — object)",
        "rapit": "snatches, steals",
        "numquam": "never",
        "rīdent": "(they) laugh",
        "vēra": "true things — ‘the truth’ (neuter pl. used as a noun)",
        "dīcis": "you say, you speak",
        "julia": "Julia (the mother — nom.; her name declines: Julia, Juliae, Juliam…)",
        "ferōcior": "fiercer (comparative of «ferōx»)",
        "leōnēs": "lions (after «quam» — same case as «canis», nominative pl.)",
        "rōmae": "of Rome (gen.)"
      },
      translation: [
        "Soon Uncle Ted takes the family to the amphitheater. The building is enormous. «Is the amphitheater bigger than the circus?» asks Paula. «Not at all,» Ted answers, «the circus is bigger. But this building is more beautiful than all the buildings of the city.» They go in and sit down; there are people everywhere.",
        "Then the gladiators come into the arena and fight bravely. All are strong, but this one gladiator, a huge man, defeats them all. The crowd shouts: «He is the strongest of them all!» Quinn is amazed: «Gladiators are braver than soldiers!» «Perhaps,» says father Mark, and smiles.",
        "Suddenly everyone falls silent: a lion comes into the arena. The lion is huge and fierce. Now a single gladiator stands in the middle of the arena — the boldest of them all. The lion charges at speed; the gladiator does not flee, but bravely stands his ground. At last the gladiator overcomes the lion! The lion is worn out and — look! — falls asleep in the middle of the arena. The crowd laughs and shouts: «Victor!»",
        "Afterwards the family walks to the inn and talks about the show. «The gladiator was braver than the lion!» says Paula. «Yes,» Quinn answers, «but the lion was not as fierce as our dog. Lupo, after all, steals sausages — and he never sleeps!» Everyone laughs. «You speak the truth,» says Julia. «Our dog is fiercer than all the lions of Rome!»"
      ],
      questions: [
        {
          q: "According to Ted, how does the amphitheater compare with the circus?",
          options: [
            "The amphitheater is bigger than the circus",
            "The circus is bigger, but the amphitheater is more beautiful",
            "They are exactly the same size",
            "The circus is more beautiful than the amphitheater"
          ],
          answer: 1,
          explain: "«circus maior est. Sed hoc aedificium pulchrius est quam omnia aedificia urbis» — bigger circus, more beautiful amphitheater. (Historically true: the Circus Maximus held far more spectators.)"
        },
        {
          q: "In «Gladiātōrēs fortiōrēs sunt quam mīlitēs», why is «mīlitēs» in the nominative?",
          options: [
            "Because it is the direct object of «sunt»",
            "Because it shows possession",
            "Because «quam» compares it with the subject «gladiātōrēs», and both terms stand in the same case",
            "Because all comparisons require the ablative"
          ],
          answer: 2,
          explain: "With «quam», the two things compared take the same case. «Gladiātōrēs» is nominative, so «mīlitēs» is too."
        },
        {
          q: "How does the fight with the lion end?",
          options: [
            "The gladiator flees from the arena",
            "The lion defeats the gladiator",
            "The gladiator overcomes the lion, which ends up asleep in the middle of the arena",
            "The crowd rushes in to rescue the gladiator"
          ],
          answer: 2,
          explain: "«Tandem gladiātor leōnem superat! Leō fessus est et … dormit» — the exhausted lion simply lies down and sleeps."
        },
        {
          q: "What is Quinn’s point about Lupo at the inn?",
          options: [
            "Lupo is not nearly as fierce as the lion",
            "The lion was not as fierce as Lupo — the dog steals sausages and never sleeps",
            "Lupo would be terrified of the lion",
            "Lupo should be trained as a gladiator"
          ],
          answer: 1,
          explain: "«leō nōn erat tam ferōx quam canis noster» — tam … quam means ‘as … as’: the lion doesn’t measure up to the family’s sausage-thief."
        }
      ]
    }
  ],

  quiz: [
    {
      prompt: "In «Quinn celerior est quam Paula», what does «quam» mean?",
      options: ["how", "than", "and", "very"],
      answer: 1,
      explain: "After a comparative in -ior, «quam» means ‘than’: Quinn is faster than Paula. (His opinion, anyway.)"
    },
    {
      prompt: "What does «fortissimus» mean?",
      options: ["brave", "braver", "bravest, very brave", "bravely"],
      answer: 2,
      explain: "-issimus is the superlative ending: fortis → fortissimus, ‘bravest’ or simply ‘very brave’."
    },
    {
      prompt: "Which pair of positive and comparative is matched correctly?",
      options: [
        "bonus → melior (better)",
        "magnus → minimus (bigger)",
        "malus → optimus (worse)",
        "parvus → maior (smaller)"
      ],
      answer: 0,
      explain: "The famous four: bonus/melior/optimus, malus/peior/pessimus, magnus/maior/maximus, parvus/minor/minimus."
    },
    {
      prompt: "In «vōx dulcior», what does the -ior ending tell you about the voice?",
      options: [
        "It is the sweetest of all",
        "It is sweeter (than some other voice)",
        "It is not sweet at all",
        "It belongs to more than one singer"
      ],
      answer: 1,
      explain: "-ior is the comparative: dulcis → dulcior, ‘sweeter’. A comparison is in the air — look for a «quam» nearby."
    },
    {
      prompt: "«Fēlīx» has a single nominative form for all genders. Where do you find its stem?",
      options: [
        "In the genitive: fēlīcis → fēlīc-",
        "In the nominative plural",
        "In the verb of the sentence",
        "Nowhere — it never changes form"
      ],
      answer: 0,
      explain: "One-ending adjectives work like 3rd-declension nouns: the genitive unmasks the stem. fēlīx, fēlīcis → fēlīc-, so accusative fēlīcem, plural fēlīcēs."
    },
    {
      prompt: "In «Paula tam audāx est quam Quinn», what is being claimed?",
      options: [
        "Paula is bolder than Quinn",
        "Paula is just as bold as Quinn",
        "Paula is less bold than Quinn",
        "Quinn is the boldest person in Rome"
      ],
      answer: 1,
      explain: "«tam … quam» = ‘as … as’ — an equal match. For ‘bolder than’, Latin would use the comparative: «audācior quam Quinn»."
    },
    {
      prompt: "Which form completes «Hic equus omnium ______ est» to mean ‘This horse is the swiftest of all’?",
      options: ["celer", "celerior", "celerrimus", "celeriter"],
      answer: 2,
      explain: "‘Swiftest of all’ needs the superlative. Adjectives in -er double the r: celer → celerrimus. («Celeriter» is the adverb ‘swiftly’.)"
    },
    {
      prompt: "«Certāmen breve erat.» Why does the adjective end in -e?",
      options: [
        "It is an adverb meaning ‘briefly’",
        "«breve» is the neuter form of «brevis», agreeing with the neuter noun «certāmen»",
        "It is a comparative",
        "It marks the ablative case"
      ],
      answer: 1,
      explain: "Third-declension adjectives pair -is (m./f.) with -e (neuter): certāmen is neuter, so brevis becomes breve. ‘The race was short.’"
    }
  ]
});
