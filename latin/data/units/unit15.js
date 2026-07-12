registerUnit({
  id: 15,
  stage: 2,
  title: "Haec Urbs",
  tagline: "Pointing words hic, ille, is — and the possessives meus, tuus, noster, vester, suus",

  grammar: [
    {
      heading: "Pointing words: «hic» and «ille»",
      body: "<p>Rome is a city you tour by pointing, and Latin has two pointing words for the job. <span class=\"la\">Hic, haec, hoc</span> points at what is close to the speaker: <em>this temple here</em>. <span class=\"la\">Ille, illa, illud</span> points at what is farther off: <em>that building over there</em>. Like any adjective, they agree with their noun in gender, number, and case — <span class=\"la\">hic circus</span>, <span class=\"la\">haec basilica</span>, <span class=\"la\">hoc templum</span>.</p><p>They also stand happily on their own: <span class=\"la\">Hoc est Forum Rōmānum</span> — <em>THIS is the Roman Forum</em>. When a demonstrative stands alone, supply <em>man</em>, <em>woman</em>, or <em>thing</em> from its gender.</p>",
      table: {
        caption: "«hic» (this, near) and «ille» (that, far) — the forms you will meet most",
        headers: ["Form (m. / f. / n.)", "hic — this", "ille — that"],
        rows: [
          ["nom. sg.", "hic / haec / hoc", "ille / illa / illud"],
          ["acc. sg.", "hunc / hanc / hoc", "illum / illam / illud"],
          ["abl. sg.", "hōc / hāc / hōc", "illō / illā / illō"],
          ["nom. pl.", "hī / hae / haec", "illī / illae / illa"],
          ["acc. pl.", "hōs / hās / haec", "illōs / illās / illa"]
        ]
      },
      tip: "Reading tip: every form of «hic» starts with h‑, every form of «ille» with ill‑. Spot the first letters for near/far, then let the ending point you to the noun it agrees with."
    },
    {
      heading: "«Is, ea, id» — the pocket pronoun",
      body: "<p>Latin's hardest-working little word is <span class=\"la\">is, ea, id</span>. It is a mild pointer (<em>this, that</em>) and, standing alone, it is the pronoun <em>he, she, it</em>: <span class=\"la\">Ted nāvem habet; ea magna est</span> — <em>Ted has a ship; it is big</em>.</p><p>Two forms repay special attention. The genitive <span class=\"la\">eius</span> means <em>his, her, its</em>: <span class=\"la\">columnae eius</span> — <em>its columns</em>. The genitive plural <span class=\"la\">eōrum / eārum</span> means <em>their</em>. You will meet these constantly from now on.</p>",
      table: {
        caption: "«is, ea, id» — the forms you will meet most",
        headers: ["Form", "Latin (m. / f. / n.)", "English"],
        rows: [
          ["nom. sg.", "is / ea / id", "he / she / it"],
          ["acc. sg.", "eum / eam / id", "him / her / it"],
          ["gen. sg.", "eius", "his, her, its"],
          ["nom. pl.", "eī / eae / ea", "they"],
          ["acc. pl.", "eōs / eās / ea", "them"],
          ["gen. pl.", "eōrum / eārum / eōrum", "their"]
        ]
      },
      tip: "Reading tip: when you meet «is/ea/id», look back — it picks up someone or something the story just mentioned, and its gender tells you which."
    },
    {
      heading: "«Meus, tuus, noster, vester» — whose is it?",
      body: "<p>The possessives are ordinary 1st/2nd-declension adjectives: they decline like <span class=\"la\">bonus</span> and <span class=\"la\">pulcher</span> and agree with the <strong>thing owned</strong>, not with the owner — <span class=\"la\">pater meus</span>, <span class=\"la\">māter mea</span>, <span class=\"la\">dōnum meum</span>.</p><p>Latin drops possessives whenever ownership is obvious: <span class=\"la\">patrem videō</span> usually means <em>I see MY father</em>. So, just like <span class=\"la\">ego</span> and <span class=\"la\">tū</span> back in Unit 8, a possessive that DOES appear is carrying weight: <span class=\"la\">Botulus meus est!</span> — <em>that sausage is MINE!</em></p>",
      table: {
        caption: "The possessive adjectives",
        headers: ["Possessive", "Meaning", "Example"],
        rows: [
          ["meus, mea, meum", "my, mine", "canis meus — my dog"],
          ["tuus, tua, tuum", "your (one owner)", "tabula tua — your tablet"],
          ["noster, nostra, nostrum", "our", "domus nostra — our house"],
          ["vester, vestra, vestrum", "your (several owners)", "canis vester — your (pl.) dog"],
          ["suus, sua, suum", "his / her / their own", "botulum suum — his own sausage"]
        ]
      },
      tip: "Reading tip: match the possessive's ending to a nearby noun — «nostra» in «familia nostra» is feminine because «familia» is, no matter who the owners are."
    },
    {
      heading: "«Suus» — one's OWN (versus «eius»)",
      body: "<p><span class=\"la\">Suus, sua, suum</span> is the reflexive possessive: it always points back to the <strong>subject</strong> of its sentence. <span class=\"la\">canis Lupo botulum suum dēvorat</span> — the dog Lupo devours <em>his own</em> sausage (a rare law-abiding moment). For anyone else's property, Latin switches to <span class=\"la\">eius</span>: <span class=\"la\">Lupo botulum eius dēvorat</span> — Lupo devours <em>his</em> sausage, meaning some other fellow's. The merchant's, probably.</p><p>So when you read <span class=\"la\">suus</span>, ask one question: who is the subject? That is the owner.</p>",
      table: {
        caption: "suus vs. eius at a glance",
        headers: ["Latin", "Whose?", "Example"],
        rows: [
          ["suus, sua, suum", "the subject's own", "Lupo botulum suum dēvorat — his OWN sausage"],
          ["eius", "somebody else's (his, her, its)", "Lupo botulum eius dēvorat — that man's sausage"]
        ]
      },
      tip: "Reading tip: «suus» → look left for the subject of the verb; «eius» → look back to the person or thing just mentioned."
    }
  ],

  vocab: [
    {
      latin: "hic",
      forms: "haec, hoc",
      pos: "pronoun (demonstrative)",
      gloss: "this",
      example: "Hoc templum splendidum est.",
      exampleGloss: "This temple is splendid."
    },
    {
      latin: "ille",
      forms: "illa, illud",
      pos: "pronoun (demonstrative)",
      gloss: "that",
      example: "Illa statua magna est.",
      exampleGloss: "That statue is big."
    },
    {
      latin: "is",
      forms: "ea, id",
      pos: "pronoun (demonstr./personal)",
      gloss: "he, she, it; this, that",
      example: "Ted nāvem habet; ea nāvis magna est.",
      exampleGloss: "Ted has a ship; that ship is big."
    },
    {
      latin: "meus",
      forms: "mea, meum",
      pos: "adjective (possessive)",
      gloss: "my, mine",
      example: "Hic canis meus est.",
      exampleGloss: "This dog is mine."
    },
    {
      latin: "tuus",
      forms: "tua, tuum",
      pos: "adjective (possessive)",
      gloss: "your (singular)",
      example: "Estne haec tabula tua?",
      exampleGloss: "Is this tablet yours?"
    },
    {
      latin: "noster",
      forms: "nostra, nostrum",
      pos: "adjective (possessive)",
      gloss: "our",
      example: "Domus nostra in Ostiā est.",
      exampleGloss: "Our house is in Ostia."
    },
    {
      latin: "vester",
      forms: "vestra, vestrum",
      pos: "adjective (possessive)",
      gloss: "your (plural)",
      example: "Magister vester bene docet.",
      exampleGloss: "Your (pl.) teacher teaches well."
    },
    {
      latin: "suus",
      forms: "sua, suum",
      pos: "adjective (reflexive possessive)",
      gloss: "his/her/their own",
      example: "Canis Lupo botulum suum dēvorat.",
      exampleGloss: "The dog Lupo devours his own sausage."
    },
    {
      latin: "monumentum",
      forms: "monumentī, n.",
      pos: "noun (2nd decl.)",
      gloss: "monument",
      example: "Rōma monumenta multa habet.",
      exampleGloss: "Rome has many monuments."
    },
    {
      latin: "āra",
      forms: "ārae, f.",
      pos: "noun (1st decl.)",
      gloss: "altar",
      example: "In templō āra stat.",
      exampleGloss: "An altar stands in the temple."
    },
    {
      latin: "basilica",
      forms: "basilicae, f.",
      pos: "noun (1st decl.)",
      gloss: "basilica, public hall",
      example: "Mercātōrēs in basilicā labōrant.",
      exampleGloss: "Merchants work in the basilica."
    },
    {
      latin: "cūria",
      forms: "cūriae, f.",
      pos: "noun (1st decl.)",
      gloss: "senate-house",
      example: "Senātōrēs in cūriā sedent.",
      exampleGloss: "The senators sit in the senate-house."
    },
    {
      latin: "sepulcrum",
      forms: "sepulcrī, n.",
      pos: "noun (2nd decl.)",
      gloss: "tomb",
      example: "Prope viam sepulcra sunt.",
      exampleGloss: "There are tombs near the road."
    },
    {
      latin: "aurum",
      forms: "aurī, n.",
      pos: "noun (2nd decl.)",
      gloss: "gold",
      example: "Templum plēnum aurī est.",
      exampleGloss: "The temple is full of gold."
    },
    {
      latin: "argentum",
      forms: "argentī, n.",
      pos: "noun (2nd decl.)",
      gloss: "silver",
      example: "Mercātor argentum in arcā tenet.",
      exampleGloss: "The merchant keeps his silver in a chest."
    },
    {
      latin: "marmor",
      forms: "marmoris, n.",
      pos: "noun (3rd decl.)",
      gloss: "marble",
      example: "Columnae ex marmore sunt.",
      exampleGloss: "The columns are made of marble."
    },
    {
      latin: "splendidus",
      forms: "splendida, splendidum",
      pos: "adjective (1st/2nd decl.)",
      gloss: "splendid, gleaming",
      example: "Palātium splendidum vidēmus.",
      exampleGloss: "We see the gleaming palace."
    },
    {
      latin: "sacer",
      forms: "sacra, sacrum",
      pos: "adjective (1st/2nd decl.)",
      gloss: "sacred",
      example: "Haec āra sacra est.",
      exampleGloss: "This altar is sacred."
    },
    {
      latin: "pūblicus",
      forms: "pūblica, pūblicum",
      pos: "adjective (1st/2nd decl.)",
      gloss: "public",
      example: "Circus aedificium pūblicum est.",
      exampleGloss: "The circus is a public building."
    },
    {
      latin: "prīvātus",
      forms: "prīvāta, prīvātum",
      pos: "adjective (1st/2nd decl.)",
      gloss: "private",
      example: "Illa domus prīvāta est.",
      exampleGloss: "That house is private."
    },
    {
      latin: "aedificō",
      forms: "aedificāre, aedificāvī, aedificātum",
      pos: "verb (1st conj.)",
      gloss: "build",
      example: "Rōmānī templa magna aedificant.",
      exampleGloss: "The Romans build great temples."
    },
    {
      latin: "ōrnō",
      forms: "ōrnāre, ōrnāvī, ōrnātum",
      pos: "verb (1st conj.)",
      gloss: "decorate, adorn",
      example: "Rōmānī templa sua ōrnant.",
      exampleGloss: "The Romans adorn their temples."
    },
    {
      latin: "dēmōnstrō",
      forms: "dēmōnstrāre, dēmōnstrāvī, dēmōnstrātum",
      pos: "verb (1st conj.)",
      gloss: "point out, show",
      example: "Avunculus Ted monumenta urbis dēmōnstrat.",
      exampleGloss: "Uncle Ted points out the monuments of the city."
    },
    {
      latin: "enim",
      forms: "(indēcl.; second word)",
      pos: "conjunction (postpositive)",
      gloss: "for, you see",
      example: "Templum nōn intrāmus: sacrum enim est.",
      exampleGloss: "We do not enter the temple: for it is sacred."
    },
    {
      latin: "autem",
      forms: "(indēcl.; second word)",
      pos: "conjunction (postpositive)",
      gloss: "however, moreover",
      example: "Hoc templum magnum est; illud autem parvum est.",
      exampleGloss: "This temple is big; that one, however, is small."
    }
  ],

  readings: [
    {
      title: "Hoc est Forum Rōmānum",
      intro: "Uncle Ted leads the family into the Roman Forum and cannot stop pointing at things.",
      paragraphs: [
        "Hodiē familia Fabia per viās urbis ambulat. Ted enim Rōmam bene scit et monumenta dēmōnstrāre potest. «Hoc est Forum Rōmānum,» inquit. «Vidētisne haec aedificia? In hōc forō Rōmānī emunt, vēndunt, labōrant.» Quinn stupet: tanta est turba, tantus clāmor!",
        "«Illud autem aedificium cūria est,» inquit Ted. «In cūriā senātōrēs Rōmānī sedent; eōrum cōnsilia magna sunt. Haec basilica quoque aedificium pūblicum est: ibi multī mercātōrēs labōrant.»",
        "Paula āram parvam cōnspicit. «Haec āra sacra est,» inquit Ted. «Rōmānī enim deīs suīs dōna in ārīs pōnunt.» Paula clāmat: «Avunculus noster multa scit!» «Ita,» respondet Ted. «Nauta sum; nautae multās urbēs vident. Sed haec urbs mea nōn est: ego enim Ostiam meam amō.»"
      ],
      glosses: {
        "hodiē": "today",
        "familia": "the family",
        "fabia": "Fabian, of the Fabii (the family's name, agreeing with «familia»)",
        "per": "through (+ acc.)",
        "viās": "streets (acc. pl. after «per»)",
        "urbis": "of the city (gen.)",
        "ambulat": "(it) walks — the family walks",
        "ted": "Ted, Julia's brother, the sea captain (his name never changes form)",
        "enim": "for, you see (second word — gives the reason)",
        "rōmam": "Rome (acc. — direct object)",
        "bene": "well",
        "scit": "(he) knows",
        "et": "and",
        "monumenta": "monuments (acc. pl.)",
        "dēmōnstrāre": "to point out (infinitive after «potest»)",
        "potest": "(he) can, is able",
        "hoc": "this (neut. — this place/building)",
        "est": "is",
        "forum": "the Forum, the great public square",
        "rōmānum": "Roman (agreeing with «Forum»)",
        "inquit": "says, said (with quoted speech)",
        "vidētisne": "do you (all) see…? («vidētis» + question ‑ne)",
        "haec": "these (neut. pl. with «aedificia»); this (fem. sg. with «āra», «urbs», «basilica»)",
        "aedificia": "buildings",
        "in": "in, on (+ abl.)",
        "hōc": "this (abl., with «forō»)",
        "forō": "forum (abl. after «in»)",
        "rōmānī": "the Romans",
        "emunt": "(they) buy",
        "vēndunt": "(they) sell",
        "labōrant": "(they) work",
        "quinn": "Quinn, the son, 12 years old",
        "stupet": "(he) is amazed, stands agape",
        "tanta": "so great (with «turba»)",
        "turba": "crowd",
        "tantus": "so great (with «clāmor»)",
        "clāmor": "shouting, din",
        "illud": "that (neut., pointing farther off)",
        "autem": "however, moreover (second word)",
        "aedificium": "building",
        "cūria": "the senate-house",
        "cūriā": "senate-house (abl. after «in»)",
        "senātōrēs": "senators",
        "sedent": "(they) sit",
        "eōrum": "their (gen. pl. of «is» — of those men)",
        "cōnsilia": "plans, counsels",
        "magna": "great (neut. pl., with «cōnsilia»)",
        "sunt": "are",
        "basilica": "basilica, public hall",
        "quoque": "also, too",
        "pūblicum": "public (agreeing with «aedificium»)",
        "ibi": "there",
        "multī": "many",
        "mercātōrēs": "merchants",
        "paula": "Paula, the daughter, 8 years old",
        "āram": "altar (acc. — direct object)",
        "parvam": "small (with «āram»)",
        "cōnspicit": "(she) catches sight of",
        "āra": "altar",
        "sacra": "sacred (with «āra»)",
        "deīs": "for the gods (dat. pl.)",
        "suīs": "their own (dat. pl., with «deīs»)",
        "dōna": "gifts (acc. pl.)",
        "ārīs": "altars (abl. pl. after «in» — on altars)",
        "pōnunt": "(they) place, put",
        "clāmat": "(she) shouts",
        "avunculus": "uncle (mother's brother)",
        "noster": "our (with «avunculus»)",
        "multa": "many things (neut. pl. used as a noun)",
        "ita": "yes",
        "respondet": "(he) answers",
        "nauta": "a sailor",
        "sum": "(I) am",
        "nautae": "sailors",
        "multās": "many (acc. pl., with «urbēs»)",
        "urbēs": "cities (acc. pl.)",
        "vident": "(they) see",
        "sed": "but",
        "urbs": "city",
        "mea": "my, mine (with «urbs»)",
        "nōn": "not",
        "ego": "I (emphatic)",
        "ostiam": "Ostia, the port of Rome — the family's home town (acc.)",
        "meam": "my (acc., with «Ostiam»)",
        "amō": "(I) love"
      },
      translation: [
        "Today the Fabian family is walking through the streets of the city. Ted, you see, knows Rome well and can point out its monuments. ‘This is the Roman Forum,’ he says. ‘Do you all see these buildings? In this forum the Romans buy, sell, and work.’ Quinn is amazed: so great is the crowd, so great the din!",
        "‘That building over there, however, is the senate-house,’ says Ted. ‘In the senate-house sit the Roman senators; their plans are great ones. This basilica too is a public building: many merchants work there.’",
        "Paula catches sight of a small altar. ‘This altar is sacred,’ says Ted. ‘The Romans, you see, place gifts for their gods on altars.’ Paula shouts: ‘Our uncle knows many things!’ ‘Yes,’ Ted answers. ‘I am a sailor, and sailors see many cities. But this city is not mine: I love my Ostia.’"
      ],
      questions: [
        {
          q: "According to Ted, what do Romans do in the Forum?",
          options: [
            "They race horses there",
            "They buy, sell, and work there",
            "They sleep there",
            "They keep their dogs there"
          ],
          answer: 1,
          explain: "«In hōc forō Rōmānī emunt, vēndunt, labōrant» — buying, selling, working."
        },
        {
          q: "In «Illud autem aedificium cūria est», the word «illud» tells you the senate-house is…",
          options: [
            "right next to the speakers",
            "farther away — ‘that building over there’",
            "owned by Ted",
            "no longer standing"
          ],
          answer: 1,
          explain: "«ille, illa, illud» points away from the speaker — that one over there. For something near, Ted would say «hoc aedificium»."
        },
        {
          q: "Why is the little altar special?",
          options: [
            "It is sacred — Romans put gifts for their gods on altars",
            "It is made of solid gold",
            "It belongs to the Fabius family",
            "Lupo is hiding behind it"
          ],
          answer: 0,
          explain: "«Haec āra sacra est … Rōmānī enim deīs suīs dōna in ārīs pōnunt» — sacred, a place for gifts to the gods."
        },
        {
          q: "Which city does Ted call «mea» — his own?",
          options: ["Rome", "Ostia", "Athens", "He loves all cities equally"],
          answer: 1,
          explain: "«haec urbs mea nōn est: ego enim Ostiam meam amō» — Rome is grand, but Ostia is HIS."
        }
      ]
    },
    {
      title: "Aurum, marmor, botulus",
      intro: "Marble and gold on the Capitoline, tombs along the road — and Lupo commits a crime near the Circus Maximus.",
      paragraphs: [
        "Deinde familia ad Capitōlium ascendit. Ibi templum Iovis stat, magnum et splendidum. «Hoc templum deī magnī est,» inquit Ted. «Plēnum aurī et argentī est; columnae eius ex marmore sunt.» Quinn stupet: «Numquam tantum aedificium vīdī! Hoc templum mōns marmoris est!»",
        "«Herī prope viam sepulcra multa vīdimus,» inquit Paula. «Eratne illud oppidum parvum?» «Minimē,» respondet Ted. «Illa aedificia sepulcra erant. Rōmānī enim sepulcra prope viās aedificant: ea monumenta virōrum clārōrum sunt.»",
        "Tandem ad Circum Maximum pervēnērunt. «Hic est circus meus!» clāmat Paula. Ted rīdet: «Tuus nōn est! Circus enim nōn prīvātus, sed pūblicus est. Hīc Rōmānī spectācula spectant; equī in circō currunt.» «Potestne familia nostra spectāculum vidēre?» rogat Quinn. «Ita,» respondet Ted, «crās spectāculum vidēre possumus.»",
        "Prope circum caupōna erat; in mēnsā botulī erant. Canis Lupo eōs cōnspexit. Subitō canis botulum rapuit et per turbam fūgit! «Botulus meus est!» clāmat mercātor īrātus. «Canis vester malus est!» «Ita,» respondet Mark, «canis noster malus, sed cārus est. Ecce pecūnia tua.» Mercātor pecūniam accēpit. Lupo autem botulum suum iam dēvorāvit: botulus enim nōn iam mercātōris, sed canis erat."
      ],
      glosses: {
        "deinde": "then, next",
        "familia": "the family",
        "ad": "to, toward (+ acc.)",
        "capitōlium": "the Capitoline, Rome's citadel hill (acc. after «ad»)",
        "ascendit": "(it) climbs — the family climbs",
        "ibi": "there",
        "templum": "temple",
        "iovis": "of Jupiter (gen. — Jupiter, king of the gods)",
        "stat": "(it) stands",
        "magnum": "great, huge (with «templum»)",
        "et": "and",
        "splendidum": "splendid, gleaming (with «templum»)",
        "hoc": "this (neut., with «templum»)",
        "deī": "of the god (gen.)",
        "magnī": "great (gen., with «deī»)",
        "est": "is",
        "inquit": "says, said (with quoted speech)",
        "ted": "Ted, the uncle, the sea captain",
        "plēnum": "full (+ gen. — full OF)",
        "aurī": "of gold (gen. after «plēnum»)",
        "argentī": "of silver (gen. after «plēnum»)",
        "columnae": "columns",
        "eius": "its (gen. of «is» — the temple's)",
        "ex": "out of, of (+ abl.)",
        "marmore": "marble (abl. after «ex» — made of marble)",
        "sunt": "are",
        "quinn": "Quinn, the son",
        "stupet": "(he) is amazed",
        "numquam": "never",
        "tantum": "so great (with «aedificium»)",
        "aedificium": "building",
        "vīdī": "(I) have seen (perfect)",
        "mōns": "a mountain",
        "marmoris": "of marble (gen.)",
        "herī": "yesterday",
        "prope": "near (+ acc.)",
        "viam": "road (acc. after «prope»)",
        "sepulcra": "tombs",
        "multa": "many (neut. pl., with «sepulcra»)",
        "vīdimus": "(we) saw (perfect)",
        "paula": "Paula, the daughter, 8 years old",
        "eratne": "was it…? («erat» + question ‑ne)",
        "illud": "that (neut. — the thing they saw)",
        "oppidum": "town",
        "parvum": "small (with «oppidum»)",
        "minimē": "no, not at all",
        "respondet": "(he) answers",
        "illa": "those (neut. pl., with «aedificia»)",
        "aedificia": "buildings",
        "erant": "(they) were (imperfect)",
        "rōmānī": "the Romans",
        "enim": "for, you see (second word — gives the reason)",
        "viās": "roads (acc. pl. after «prope»)",
        "aedificant": "(they) build",
        "ea": "those, they (neut. pl. — the tombs)",
        "monumenta": "monuments",
        "virōrum": "of men (gen. pl.)",
        "clārōrum": "famous (gen. pl., with «virōrum»)",
        "tandem": "at last",
        "circum": "the Circus (acc. — the racetrack)",
        "maximum": "Maximus, ‘the Greatest’ (part of the racetrack's name)",
        "pervēnērunt": "(they) arrived, reached (perfect)",
        "hic": "this (masc., with «circus» — pointing right at it)",
        "circus": "circus, racetrack",
        "meus": "my, mine",
        "clāmat": "(she/he) shouts",
        "rīdet": "(he) laughs",
        "tuus": "yours (standing alone: ‘it is not YOURS’)",
        "nōn": "not",
        "prīvātus": "private",
        "sed": "but",
        "pūblicus": "public",
        "hīc": "here (adverb — note the long ī)",
        "spectācula": "shows, spectacles (acc. pl.)",
        "spectant": "(they) watch",
        "equī": "horses",
        "in": "in, on (+ abl.)",
        "circō": "circus (abl. after «in»)",
        "currunt": "(they) run, race",
        "potestne": "can…? («potest» + question ‑ne)",
        "nostra": "our (with «familia»)",
        "spectāculum": "a show (acc.)",
        "vidēre": "to see (infinitive after «potest / possumus»)",
        "rogat": "(he) asks",
        "ita": "yes",
        "crās": "tomorrow",
        "possumus": "(we) can, are able",
        "caupōna": "a food stall, tavern",
        "erat": "was (imperfect — «caupōna erat»: there was; «canis erat»: it was the dog's)",
        "mēnsā": "table (abl. after «in»)",
        "botulī": "sausages",
        "lupo": "Lupo, the family dog, a lovable menace — quasi lupus! (his name never changes form)",
        "eōs": "them (acc. pl. of «is» — the sausages)",
        "cōnspexit": "(he) spotted (perfect)",
        "subitō": "suddenly",
        "canis": "the dog; (last sentence, gen.) the dog's",
        "botulum": "a sausage (acc.)",
        "rapuit": "(he) snatched (perfect)",
        "per": "through (+ acc.)",
        "turbam": "crowd (acc. after «per»)",
        "fūgit": "(he) fled (perfect)",
        "botulus": "the sausage",
        "mercātor": "the merchant, the stall-keeper",
        "īrātus": "angry",
        "vester": "your (belonging to you all — with «canis»)",
        "malus": "bad",
        "mark": "Mark, the father (his name never changes form)",
        "noster": "our (with «canis»)",
        "cārus": "dear",
        "ecce": "look! here is…",
        "pecūnia": "money",
        "tua": "your (with «pecūnia»)",
        "pecūniam": "money (acc.)",
        "accēpit": "(he) accepted, took (perfect)",
        "autem": "but, however (second word — marks a turn)",
        "suum": "his own (acc. — pointing back to the subject, Lupo)",
        "iam": "already; (nōn iam) no longer",
        "dēvorāvit": "(he) devoured (perfect)",
        "mercātōris": "the merchant's (gen.)"
      },
      translation: [
        "Then the family climbs the Capitoline. There stands the temple of Jupiter, huge and gleaming. ‘This temple belongs to the great god,’ says Ted. ‘It is full of gold and silver, and its columns are made of marble.’ Quinn is amazed: ‘I have never seen so great a building! This temple is a mountain of marble!’",
        "‘Yesterday near the road we saw many tombs,’ says Paula. ‘Was that a little town?’ ‘Not at all,’ Ted answers. ‘Those buildings were tombs. The Romans, you see, build tombs near the roads: they are the monuments of famous men.’",
        "At last they reached the Circus Maximus. ‘This is my circus!’ shouts Paula. Ted laughs: ‘It is not yours! The circus is not private but public. Here the Romans watch the shows, and horses race in the circus.’ ‘Can our family see a show?’ asks Quinn. ‘Yes,’ Ted replies, ‘tomorrow we can see a show.’",
        "Near the circus there was a food stall; on the table there were sausages. The dog Lupo spotted them. Suddenly the dog snatched a sausage and fled through the crowd! ‘That sausage is mine!’ shouts the merchant, furious. ‘Your dog is a bad one!’ ‘Yes,’ Mark answers, ‘our dog is bad — but dear to us. Here is your money.’ The merchant took the money. Lupo, however, had already devoured his own sausage: for the sausage was no longer the merchant's, but the dog's."
      ],
      questions: [
        {
          q: "What is the temple of Jupiter full of?",
          options: [
            "Sausages and cheese",
            "Gold and silver",
            "Senators",
            "Writing tablets"
          ],
          answer: 1,
          explain: "«Plēnum aurī et argentī est» — «plēnus» takes the genitive: full OF gold and silver."
        },
        {
          q: "What did Paula think the tombs along the road were?",
          options: [
            "A small town",
            "Temples",
            "Ships",
            "Market stalls"
          ],
          answer: 0,
          explain: "«Eratne illud oppidum parvum?» — she asks whether THAT («illud») was a little town; Ted corrects her: «illa aedificia sepulcra erant»."
        },
        {
          q: "Why isn't the Circus Maximus Paula's, according to Ted?",
          options: [
            "It belongs to the sausage merchant",
            "It is a public building, not a private one",
            "It is sacred to Jupiter",
            "It burned down long ago"
          ],
          answer: 1,
          explain: "«Circus enim nōn prīvātus, sed pūblicus est» — and note the possessive standing alone: «Tuus nōn est!», it is not YOURS."
        },
        {
          q: "How does the sausage affair end?",
          options: [
            "The merchant calls the guards",
            "Mark pays the merchant — and Lupo has already devoured the sausage",
            "Lupo gives the sausage back",
            "Paula buys sausages for everyone"
          ],
          answer: 1,
          explain: "«Ecce pecūnia tua» — Mark pays up; meanwhile «Lupo botulum suum iam dēvorāvit»: «suum», his OWN, because the sausage is no longer the merchant's."
        }
      ]
    }
  ],

  quiz: [
    {
      prompt: "Which pointing word means ‘this’ — something near the speaker?",
      options: ["ille", "hic", "is", "suus"],
      answer: 1,
      explain: "«hic, haec, hoc» = this (near); «ille, illa, illud» = that (farther off); «is, ea, id» is the mild all-purpose pointer."
    },
    {
      prompt: "In «Hoc templum magnum est; illud autem parvum est», what does «autem» add?",
      options: [
        "A reason (‘because’)",
        "A contrast (‘however / on the other hand’)",
        "A negation",
        "A yes/no question"
      ],
      answer: 1,
      explain: "«autem» sits second in its sentence and pivots the thought: this temple is big; THAT one, however, is small."
    },
    {
      prompt: "In «Ted nāvem habet; ea magna est», what does «ea» refer to?",
      options: ["Ted", "The ship", "The sea", "Rome"],
      answer: 1,
      explain: "«ea» is feminine singular, so it picks up the feminine noun «nāvem»: the ship is big."
    },
    {
      prompt: "What does «eius» mean in «canis eius»?",
      options: [
        "his or her (somebody else's) — ‘his/her dog’",
        "his own",
        "their own",
        "this very dog"
      ],
      answer: 0,
      explain: "«eius» is the genitive of «is, ea, id» — his/her when the owner is NOT the subject. For the subject's own things, Latin uses «suus»."
    },
    {
      prompt: "In «Quinn tabulam suam portat», whose tablet is it?",
      options: [
        "Quinn's own",
        "The teacher's",
        "Paula's",
        "The reader's"
      ],
      answer: 0,
      explain: "«suus» always points back to the subject of its sentence — Quinn carries his OWN tablet."
    },
    {
      prompt: "The angry merchant shouts «Canis vester malus est!». Whose dog is he talking about?",
      options: [
        "His own dog",
        "The dog of the people he is shouting at",
        "The senators' dog",
        "A stray that belongs to nobody"
      ],
      answer: 1,
      explain: "«vester» = your, belonging to several people addressed — the whole family standing in front of him."
    },
    {
      prompt: "The speaker says: «Paula pūpam meam habet». Whose doll is Paula holding?",
      options: [
        "Paula's",
        "The speaker's",
        "Her mother's",
        "Nobody's"
      ],
      answer: 1,
      explain: "«meam» = my: it agrees with «pūpam» (fem. acc.) but it points to the speaker — Paula is holding MY doll."
    },
    {
      prompt: "What does «enim» do in «Templum nōn intrāmus: sacrum enim est»?",
      options: [
        "It gives the reason — ‘for, you see’",
        "It marks a contrast",
        "It makes the sentence negative",
        "It turns the sentence into a question"
      ],
      answer: 0,
      explain: "«enim» (second word in its clause) explains what came before: we do not go in, FOR it is sacred."
    }
  ]
});
