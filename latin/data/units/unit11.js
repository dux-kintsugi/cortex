registerUnit({
  id: 11,
  stage: 2,
  title: "Cōnsilium",
  tagline: "The full present of sum and possum — plus the infinitive",

  grammar: [
    {
      heading: "«Sum»: the whole present, at last",
      body: "<p>Since Unit 1 you have known <span class=\"la\">est</span> (is) and <span class=\"la\">sunt</span> (are). They were the tip of an iceberg. Here is the entire verb <span class=\"la\">esse</span> (to be) in the present tense — six forms, one per person.</p><p>Reading strategy: a form of <span class=\"la\">esse</span> works like an equals sign. It links the subject to a description, and both sides stay in the <strong>nominative</strong>: <span class=\"la\">Quinn laetus est</span> — Quinn = happy. Better yet, the ending tells you the subject even when no pronoun appears: <span class=\"la\">parāta sum</span> can only mean <em>I</em> am ready.</p>",
      table: {
        caption: "Present of «esse» (to be)",
        headers: ["Latin", "English"],
        rows: [
          ["sum", "I am"],
          ["es", "you are (one person)"],
          ["est", "he / she / it is; there is"],
          ["sumus", "we are"],
          ["estis", "you are (more than one)"],
          ["sunt", "they are; there are"]
        ]
      },
      tip: "«es» and «est» are tiny words that love to hide mid-sentence. Train your eye to catch them — they carry the skeleton of the whole sentence."
    },
    {
      heading: "«Possum»: pot- glued onto sum",
      body: "<p><span class=\"la\">Possum</span> (I can) is nothing more than <span class=\"la\">pot‑</span> (able) welded onto the forms of <span class=\"la\">sum</span>. Before an <strong>s</strong>, the <strong>t</strong> smooths out: <span class=\"la\">pot‑sum</span> becomes <span class=\"la\">possum</span>, while <span class=\"la\">pot‑es</span> stays <span class=\"la\">potes</span>. If you know <span class=\"la\">sum</span>, you already know <span class=\"la\">possum</span> for free.</p><p>And <span class=\"la\">possum</span> almost never travels alone: it wants a second verb in the <strong>infinitive</strong> to say what the subject is able <em>to do</em>: <span class=\"la\">Ted nāvigāre potest</span> — Ted can sail. Grammarians call this the <em>complementary infinitive</em>, because it completes the thought.</p>",
      table: {
        caption: "Present of «posse» (to be able)",
        headers: ["Latin", "English"],
        rows: [
          ["possum", "I can"],
          ["potes", "you can (one person)"],
          ["potest", "he / she / it can"],
          ["possumus", "we can"],
          ["potestis", "you can (more than one)"],
          ["possunt", "they can"]
        ]
      },
      tip: "When you meet a form of «possum», don't stop — scan ahead for a word ending in ‑re. That infinitive is the real action of the sentence."
    },
    {
      heading: "The infinitive: a verb wearing its name tag",
      body: "<p>The <strong>infinitive</strong> is the ‘to ___’ form of a verb, and it is delightfully easy to spot: it ends in <span class=\"la\">‑re</span>. First-conjugation verbs end in <span class=\"la\">‑āre</span> (<span class=\"la\">amāre</span> — to love, <span class=\"la\">labōrāre</span> — to work), second-conjugation verbs in <span class=\"la\">‑ēre</span> (<span class=\"la\">vidēre</span> — to see, <span class=\"la\">habēre</span> — to have). Two irregulars are worth learning whole: <span class=\"la\">esse</span> (to be) and <span class=\"la\">posse</span> (to be able).</p><p>A whole club of verbs likes to be completed by an infinitive — verbs of wanting, owing, trying, hesitating, ordering. When you read one of them, expect an infinitive nearby.</p><p>Note the pattern with <span class=\"la\">iubeō</span> (I order): the person ordered goes in the <strong>accusative</strong>, then comes the infinitive. <span class=\"la\">Julia fīlium labōrāre iubet</span> — Julia orders her son to work.</p>",
      table: {
        caption: "Verbs that call for an infinitive",
        headers: ["Signal verb", "Meaning", "Example"],
        rows: [
          ["cupit", "wants to…", "nāvigāre cupit — wants to sail"],
          ["dēbet", "must, ought to…", "labōrāre dēbet — has to work"],
          ["temptat", "tries to…", "iuvāre temptat — tries to help"],
          ["dubitat", "hesitates to…", "intrāre dubitat — hesitates to go in"],
          ["iubet", "orders (someone) to…", "fīlium portāre iubet — orders her son to carry"]
        ]
      }
    },
    {
      heading: "«Necesse est» and «licet»: nobody in particular",
      body: "<p>Two very useful chunks have no personal subject at all. <span class=\"la\">Necesse est</span> + infinitive means ‘it is necessary to…’ — in plain English, <em>somebody's gotta</em>: <span class=\"la\">necesse est aquam portāre</span> — the water has to be carried. <span class=\"la\">Licet</span> + infinitive means ‘it is allowed’; add a <strong>dative</strong> for the person who has permission: <span class=\"la\">Paulae natāre licet</span> — Paula may swim. And with <span class=\"la\">nōn</span>? <span class=\"la\">Calceōs dēvorāre nōn licet</span> — eating shoes is <em>not</em> allowed. Somebody tell the dog.</p>",
      tip: "Read «necesse est» as one frozen chunk, like a stamp that says MUST. The infinitive after it tells you what must happen."
    }
  ],

  vocab: [
    {
      latin: "sum",
      forms: "esse, fuī, futūrus (irreg.)",
      pos: "verb (irregular)",
      gloss: "be (full present: sum, es, est, sumus, estis, sunt)",
      example: "Ego nauta nōn sum.",
      exampleGloss: "I am not a sailor."
    },
    {
      latin: "possum",
      forms: "posse, potuī (irreg.)",
      pos: "verb (irregular)",
      gloss: "be able, can",
      example: "Ted bene nāvigāre potest.",
      exampleGloss: "Ted can sail well."
    },
    {
      latin: "cupiō",
      forms: "cupere, cupīvī, cupītum",
      pos: "verb (3rd conj. ‑iō)",
      gloss: "desire, want",
      example: "Quinn nauta esse cupit.",
      exampleGloss: "Quinn wants to be a sailor."
    },
    {
      latin: "dēbeō",
      forms: "dēbēre, dēbuī, dēbitum",
      pos: "verb (2nd conj.)",
      gloss: "ought, must; owe",
      example: "Hodiē labōrāre dēbēmus.",
      exampleGloss: "Today we have to work."
    },
    {
      latin: "iubeō",
      forms: "iubēre, iussī, iussum",
      pos: "verb (2nd conj.)",
      gloss: "order, bid",
      example: "Māter fīliam cēnam parāre iubet.",
      exampleGloss: "The mother orders her daughter to prepare dinner."
    },
    {
      latin: "temptō",
      forms: "temptāre, temptāvī, temptātum",
      pos: "verb (1st conj.)",
      gloss: "try, attempt",
      example: "Paula natāre temptat.",
      exampleGloss: "Paula tries to swim."
    },
    {
      latin: "spērō",
      forms: "spērāre, spērāvī, spērātum",
      pos: "verb (1st conj.)",
      gloss: "hope, hope for",
      example: "Fortūnam bonam spērāmus.",
      exampleGloss: "We hope for good fortune."
    },
    {
      latin: "dubitō",
      forms: "dubitāre, dubitāvī, dubitātum",
      pos: "verb (1st conj.)",
      gloss: "doubt, hesitate",
      example: "Julia nōn dubitat.",
      exampleGloss: "Julia does not hesitate."
    },
    {
      latin: "cōgitō",
      forms: "cōgitāre, cōgitāvī, cōgitātum",
      pos: "verb (1st conj.)",
      gloss: "think, plan",
      example: "Mark dē itinere cōgitat.",
      exampleGloss: "Mark is thinking about the journey."
    },
    {
      latin: "iuvō",
      forms: "iuvāre, iūvī, iūtum",
      pos: "verb (1st conj.)",
      gloss: "help",
      example: "Puer patrem iuvat.",
      exampleGloss: "The boy helps his father."
    },
    {
      latin: "ōrō",
      forms: "ōrāre, ōrāvī, ōrātum",
      pos: "verb (1st conj.)",
      gloss: "pray (to), beg",
      example: "Familia deōs ōrat.",
      exampleGloss: "The family prays to the gods."
    },
    {
      latin: "cōnsilium",
      forms: "cōnsiliī, n.",
      pos: "noun (2nd decl.)",
      gloss: "plan, advice",
      example: "Cōnsilium novum habēmus.",
      exampleGloss: "We have a new plan."
    },
    {
      latin: "iter",
      forms: "itineris, n.",
      pos: "noun (3rd decl.)",
      gloss: "journey, route",
      example: "Iter longum est.",
      exampleGloss: "The journey is long."
    },
    {
      latin: "sarcina",
      forms: "sarcinae, f.",
      pos: "noun (1st decl.)",
      gloss: "pack, baggage",
      example: "Sarcinae magnae sunt.",
      exampleGloss: "The packs are big."
    },
    {
      latin: "cista",
      forms: "cistae, f.",
      pos: "noun (1st decl.)",
      gloss: "trunk, chest",
      example: "Julia cistam parat.",
      exampleGloss: "Julia is getting the trunk ready."
    },
    {
      latin: "calceus",
      forms: "calceī, m.",
      pos: "noun (2nd decl.)",
      gloss: "shoe",
      example: "Canis Lupo calceum tenet.",
      exampleGloss: "The dog Lupo is holding a shoe."
    },
    {
      latin: "paenula",
      forms: "paenulae, f.",
      pos: "noun (1st decl.)",
      gloss: "traveling cloak",
      example: "Paenula nova nōn est.",
      exampleGloss: "The cloak is not new."
    },
    {
      latin: "fortūna",
      forms: "fortūnae, f.",
      pos: "noun (1st decl.)",
      gloss: "fortune, luck",
      example: "Fortūna nautās bonōs iuvat.",
      exampleGloss: "Fortune helps good sailors."
    },
    {
      latin: "deus",
      forms: "deī, m. (nom. pl. dī)",
      pos: "noun (2nd decl.)",
      gloss: "god",
      example: "Dī hominēs spectant.",
      exampleGloss: "The gods watch human beings."
    },
    {
      latin: "dea",
      forms: "deae, f.",
      pos: "noun (1st decl.)",
      gloss: "goddess",
      example: "Dea pulchra est.",
      exampleGloss: "The goddess is beautiful."
    },
    {
      latin: "necesse est",
      forms: "(+ infinitive)",
      pos: "phrase (impersonal)",
      gloss: "it is necessary",
      example: "Necesse est aquam portāre.",
      exampleGloss: "It is necessary to carry water."
    },
    {
      latin: "licet",
      forms: "licēre, licuit (impersonal, + dat.)",
      pos: "verb (2nd conj., impersonal)",
      gloss: "it is allowed, one may",
      example: "Puerīs natāre licet.",
      exampleGloss: "The boys are allowed to swim."
    },
    {
      latin: "parātus",
      forms: "‑a, ‑um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "ready, prepared",
      example: "Cēna parāta est.",
      exampleGloss: "Dinner is ready."
    },
    {
      latin: "crās",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "tomorrow",
      example: "Crās nāvigāmus.",
      exampleGloss: "Tomorrow we sail."
    },
    {
      latin: "hodiē",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "today",
      example: "Hodiē in hortō labōrāmus.",
      exampleGloss: "Today we are working in the garden."
    }
  ],

  readings: [
    {
      title: "Cōnsilium Novum",
      intro: "The evening after Lupo's harbor adventure, the family sits together — and Mark has an announcement.",
      paragraphs: [
        "Vesper est. Tōta familia in ātriō sedet, sed Mark nōn sedet: pater stat et cōgitat. Tandem «cōnsilium novum habeō!» inquit. «Rōmam nāvigāre cupiō. Avunculus Ted nāvem magnam habet; nāvis avunculī nōs portāre potest.»",
        "Quinn laetus clāmat: «ego nauta esse cupiō! Possumusne nōs quoque nāvigāre?» «Ita!» respondet Mark. «Tōta familia nāvigāre potest — etiam Lupo!»",
        "Julia nōn dubitat, sed multa cōgitat. «Iter longum est» inquit. «Necesse est cistās et sarcinās parāre; crās multum labōrāre dēbēmus.» Paula rīdet: «ego iam parāta sum! Parātīne vōs estis?» Lupo nōn respondet: canis in culīnā dormit."
      ],
      glosses: {
        "vesper": "evening (nom.)",
        "est": "is; it is",
        "tōta": "the whole (with «familia»)",
        "familia": "family",
        "in": "in (+ abl.)",
        "ātriō": "atrium, hall (abl. after «in»)",
        "sedet": "sits, is sitting",
        "sed": "but",
        "mark": "Mark, the father (his name never changes form)",
        "nōn": "not",
        "pater": "father (nom.) — that is, Mark",
        "stat": "stands",
        "et": "and",
        "cōgitat": "thinks, is thinking",
        "tandem": "at last, finally",
        "cōnsilium": "plan (acc. — object of «habeō»)",
        "novum": "new (acc. sg. n., with «cōnsilium»)",
        "habeō": "I have",
        "inquit": "says / said (used with quoted speech)",
        "rōmam": "to Rome (city names take a plain accusative for ‘to’ — no preposition needed)",
        "nāvigāre": "to sail (infinitive)",
        "cupiō": "I want, I desire",
        "avunculus": "uncle (nom.) — the mother's brother",
        "ted": "Ted, Julia's brother, the ship captain (his name never changes form)",
        "nāvem": "ship (acc.)",
        "magnam": "big (acc. sg. f., with «nāvem»)",
        "habet": "has",
        "nāvis": "ship (nom.)",
        "avunculī": "of the uncle, the uncle's (gen.)",
        "nōs": "we / us (the same form serves as subject and object)",
        "portāre": "to carry (infinitive)",
        "potest": "is able, can (+ infinitive)",
        "quinn": "Quinn, the son, twelve years old",
        "laetus": "happy (nom., describing the subject)",
        "clāmat": "shouts",
        "ego": "I",
        "nauta": "a sailor (nom. — predicate after «esse»)",
        "esse": "to be (infinitive of «sum»)",
        "possumusne": "can we…? («possumus» + question particle ‑ne)",
        "quoque": "also, too",
        "ita": "yes",
        "respondet": "answers, replies",
        "etiam": "even, also",
        "lupo": "Lupo, the family dog — quasi lupus, ‘Wolf’!",
        "julia": "Julia, the mother (her name declines: Julia, Juliae, Juliam…)",
        "dubitat": "hesitates",
        "multa": "many things (neuter plural used as a noun)",
        "iter": "journey (nom.)",
        "longum": "long (nom. sg. n., with «iter»)",
        "necesse": "necessary («necesse est» = it is necessary)",
        "cistās": "trunks, chests (acc. pl.)",
        "sarcinās": "packs, bags (acc. pl.)",
        "parāre": "to prepare, get ready (infinitive)",
        "crās": "tomorrow",
        "multum": "much, hard (adverb)",
        "labōrāre": "to work (infinitive)",
        "dēbēmus": "we must, we ought",
        "paula": "Paula, the daughter, eight years old",
        "rīdet": "laughs",
        "iam": "already",
        "parāta": "ready (nom. sg. f. — Paula is speaking)",
        "sum": "I am",
        "parātīne": "ready? («parātī» ready, masc. pl. + question particle ‑ne)",
        "vōs": "you (plural)",
        "estis": "you (pl.) are",
        "canis": "dog",
        "culīnā": "kitchen (abl. after «in»)",
        "dormit": "sleeps, is asleep"
      },
      translation: [
        "It is evening. The whole family is sitting in the atrium, but Mark is not sitting: the father stands and thinks. At last he says, «I have a new plan! I want to sail to Rome. Uncle Ted has a big ship; the uncle's ship can carry us.»",
        "Quinn shouts happily: «I want to be a sailor! Can we sail too?» «Yes!» answers Mark. «The whole family can sail — even Lupo!»",
        "Julia does not hesitate, but she is thinking of many things. «The journey is long,» she says. «We need to get the trunks and the packs ready; tomorrow we must work hard.» Paula laughs: «I am ready already! Are you all ready?» Lupo does not answer: the dog is asleep in the kitchen."
      ],
      questions: [
        {
          q: "What does Mark announce to the family?",
          options: [
            "He must work tomorrow",
            "He wants to sail to Rome",
            "He has bought a new ship",
            "Uncle Ted is coming for dinner"
          ],
          answer: 1,
          explain: "«Rōmam nāvigāre cupiō» — I want to sail to Rome. «Cupiō» plus the infinitive «nāvigāre» carries the announcement."
        },
        {
          q: "Whose ship will carry the family?",
          options: [
            "Mark's own ship",
            "A merchant's ship from the forum",
            "Uncle Ted's ship",
            "Quinn's little toy boat"
          ],
          answer: 2,
          explain: "«nāvis avunculī nōs portāre potest» — the genitive «avunculī» tells you the ship is the uncle's, i.e. Ted's."
        },
        {
          q: "In «Possumusne nōs quoque nāvigāre?», Quinn is asking whether…",
          options: [
            "they must also sail",
            "they are also able to sail",
            "they also want to sail",
            "Ted can sail alone"
          ],
          answer: 1,
          explain: "«possumus» = we can, we are able; the attached ‑ne turns it into a yes/no question. Wanting would be «cupimus», obligation «dēbēmus»."
        },
        {
          q: "What does Julia say is necessary?",
          options: [
            "Praying to the gods",
            "Buying a new dog",
            "Getting the trunks and packs ready",
            "Staying at home in Ostia"
          ],
          answer: 2,
          explain: "«Necesse est cistās et sarcinās parāre» — necesse est + infinitive: it is necessary to prepare the trunks and packs."
        }
      ]
    },
    {
      title: "Sarcinae et Deī",
      intro: "Packing day: trunks, cloaks, one doomed shoe — and a prayer for good fortune.",
      paragraphs: [
        "Hodiē tōta familia labōrat, quod crās iter est. Julia in cubiculō cistās parat: in cistīs sunt tunicae, togae, paenulae. «Iter longum est» inquit; «paenulās et calceōs bonōs habēre dēbēmus.»",
        "Mark fīlium sarcinās portāre iubet; puer laetus sarcinās magnās ad portam portat. Pater fīlium laudat: «tū validus es et bene labōrāre potes!» Paula parva est, sed iuvāre temptat: pūpam et parvam sarcinam portat. «Ego quoque iter parāre possum!» inquit puella.",
        "Subitō Lupo quoque «iuvat»: calceum novum patris rapit! Mark īrātus clāmat: «malus canis es! Calceōs dēvorāre nōn licet!» Sed Paula nōn dubitat: botulum tenet et canem vocat. Lupo calceum iam nōn cupit — botulum cupit. Mark calceum ūmidum accipit et tandem rīdet.",
        "Vesper est. Familia deōs deāsque ōrat, quod in marī perīcula sunt. Mark deīs dōna parva dat et fortūnam bonam ōrat. «Dī nautās iuvāre possunt» inquit. «Fortūnam bonam spērāmus» respondet Julia, «sed bene labōrāre quoque dēbēmus.»",
        "Nox est. Quinn dormīre nōn potest: puer dē nāvibus cōgitat. «Crās» inquit «nauta sum! Fortasse gubernātor esse possum!» Tandem puer fessus dormit. Lupo quoque dormit — in cistā magnā!"
      ],
      glosses: {
        "hodiē": "today",
        "tōta": "the whole (with «familia»)",
        "familia": "family",
        "labōrat": "works, is working",
        "quod": "because",
        "crās": "tomorrow",
        "iter": "journey (nom.)",
        "est": "is; it is",
        "julia": "Julia, the mother",
        "in": "in (+ abl.)",
        "cubiculō": "bedroom (abl. after «in»)",
        "cistās": "trunks, chests (acc. pl.)",
        "parat": "prepares, gets ready",
        "cistīs": "trunks (abl. pl. after «in»)",
        "sunt": "are; there are",
        "tunicae": "tunics (nom. pl.)",
        "togae": "togas (nom. pl.)",
        "paenulae": "traveling cloaks (nom. pl.)",
        "longum": "long (nom. sg. n., with «iter»)",
        "inquit": "says / said (used with quoted speech)",
        "paenulās": "traveling cloaks (acc. pl.)",
        "et": "and",
        "calceōs": "shoes (acc. pl.)",
        "bonōs": "good (acc. pl. m., with «calceōs»)",
        "habēre": "to have (infinitive)",
        "dēbēmus": "we must, we ought",
        "mark": "Mark, the father",
        "fīlium": "son (acc. — the person being ordered)",
        "sarcinās": "packs, bags (acc. pl.)",
        "portāre": "to carry (infinitive)",
        "iubet": "orders (person in the acc. + infinitive)",
        "puer": "boy",
        "laetus": "happy",
        "magnās": "big (acc. pl. f.)",
        "ad": "to, toward (+ acc.)",
        "portam": "door, gate (acc. after «ad»)",
        "portat": "carries",
        "pater": "father (nom. — the subject)",
        "laudat": "praises",
        "tū": "you (singular)",
        "validus": "strong",
        "es": "you (sg.) are",
        "bene": "well",
        "labōrāre": "to work (infinitive)",
        "potes": "you (sg.) can, are able",
        "paula": "Paula, the daughter, eight years old",
        "parva": "small, little",
        "sed": "but",
        "iuvāre": "to help (infinitive)",
        "temptat": "tries, attempts",
        "pūpam": "doll (acc.)",
        "parvam": "small, little (acc. sg. f.)",
        "sarcinam": "pack (acc. sg.)",
        "ego": "I",
        "quoque": "also, too",
        "parāre": "to prepare, get ready (infinitive)",
        "possum": "I can, I am able",
        "puella": "girl",
        "subitō": "suddenly",
        "lupo": "Lupo, the family dog",
        "iuvat": "helps",
        "calceum": "shoe (acc.)",
        "novum": "new (acc. sg. m., with «calceum»)",
        "patris": "of the father, the father's (gen. of «pater»)",
        "rapit": "snatches, grabs",
        "īrātus": "angry",
        "clāmat": "shouts",
        "malus": "bad",
        "canis": "dog",
        "dēvorāre": "to devour, gobble up (infinitive)",
        "nōn": "not",
        "licet": "it is allowed («nōn licet» = it is not allowed)",
        "dubitat": "hesitates",
        "botulum": "sausage (acc.)",
        "tenet": "holds",
        "canem": "dog (acc.)",
        "vocat": "calls",
        "iam": "now; «iam nōn» = no longer",
        "cupit": "wants, desires",
        "ūmidum": "damp, soggy (acc. sg. m., with «calceum»)",
        "accipit": "takes, receives",
        "tandem": "at last, finally",
        "rīdet": "laughs",
        "vesper": "evening (nom.)",
        "deōs": "gods (acc. pl.)",
        "deāsque": "and goddesses («deās» + ‑que)",
        "ōrat": "prays to, prays for (takes a direct object)",
        "marī": "sea (abl. after «in»)",
        "perīcula": "dangers (nom. pl.)",
        "deīs": "to the gods (dat. pl.)",
        "dōna": "gifts (acc. pl.)",
        "dat": "gives",
        "fortūnam": "fortune, luck (acc.)",
        "bonam": "good (acc. sg. f.)",
        "dī": "gods (nom. pl. of «deus»)",
        "nautās": "sailors (acc. pl.)",
        "possunt": "they can, are able",
        "spērāmus": "we hope for",
        "respondet": "answers, replies",
        "nox": "night (nom.)",
        "quinn": "Quinn, the son, twelve years old",
        "dormīre": "to sleep (infinitive)",
        "potest": "is able, can (+ infinitive)",
        "dē": "about, concerning (+ abl.)",
        "nāvibus": "ships (abl. pl. after «dē»)",
        "cōgitat": "thinks, is thinking",
        "nauta": "a sailor (nom. — predicate)",
        "sum": "I am",
        "fortasse": "perhaps, maybe",
        "gubernātor": "helmsman, steersman (nom.)",
        "esse": "to be (infinitive of «sum»)",
        "fessus": "tired",
        "dormit": "sleeps, is asleep",
        "cistā": "trunk, chest (abl. after «in»)",
        "magnā": "big (abl. sg. f., with «cistā»)"
      },
      translation: [
        "Today the whole family is working, because tomorrow is the journey. In the bedroom Julia is getting the trunks ready: in the trunks are tunics, togas, and traveling cloaks. «The journey is long,» she says; «we must have cloaks and good shoes.»",
        "Mark orders his son to carry the packs; the happy boy carries the big packs to the door. The father praises his son: «You are strong and you can work well!» Paula is small, but she tries to help: she carries her doll and a little pack. «I can get ready for the journey too!» says the girl.",
        "Suddenly Lupo «helps» too: he snatches the father's new shoe! Mark shouts angrily: «You are a bad dog! Devouring shoes is not allowed!» But Paula does not hesitate: she holds a sausage and calls the dog. Lupo no longer wants the shoe — he wants the sausage. Mark takes the soggy shoe and at last he laughs.",
        "It is evening. The family prays to the gods and goddesses, because there are dangers on the sea. Mark gives the gods small gifts and prays for good fortune. «The gods can help sailors,» he says. «We hope for good fortune,» answers Julia, «but we must also work well.»",
        "It is night. Quinn cannot sleep: the boy is thinking about ships. «Tomorrow,» he says, «I am a sailor! Maybe I can be a helmsman!» At last the tired boy falls asleep. Lupo is sleeping too — in the big trunk!"
      ],
      questions: [
        {
          q: "Why is the whole family working today?",
          options: [
            "Because the journey is tomorrow",
            "Because a storm is coming",
            "Because Uncle Ted is arriving",
            "Because the house is a mess"
          ],
          answer: 0,
          explain: "«quod crās iter est» — because tomorrow is the journey. «Quod» gives the reason; «crās» means tomorrow."
        },
        {
          q: "In «Mark fīlium sarcinās portāre iubet», what is the son told to do?",
          options: [
            "To pack the trunks",
            "To carry the packs",
            "To help his mother",
            "To watch the dog"
          ],
          answer: 1,
          explain: "«iubet» + accusative person + infinitive: Mark orders his son («fīlium», acc.) to carry (portāre) the packs (sarcinās)."
        },
        {
          q: "How does Paula get the shoe away from Lupo?",
          options: [
            "She chases him into the garden",
            "She shouts at him angrily",
            "She holds a sausage and calls him",
            "She hides the shoes in a trunk"
          ],
          answer: 2,
          explain: "«botulum tenet et canem vocat» — she holds a sausage and calls the dog; then «Lupo calceum iam nōn cupit — botulum cupit»."
        },
        {
          q: "Why can't Quinn fall asleep?",
          options: [
            "Lupo is barking in the kitchen",
            "He is thinking about ships",
            "He is afraid of the sea",
            "The trunks are in his bedroom"
          ],
          answer: 1,
          explain: "«puer dē nāvibus cōgitat» — the boy is thinking about ships, dreaming of being a «nauta» tomorrow."
        }
      ]
    }
  ],

  quiz: [
    {
      prompt: "Which form of «esse» means ‘we are’?",
      options: ["es", "sumus", "estis", "sunt"],
      answer: 1,
      explain: "«sumus» is the first-person plural: we are. «es» = you (sg.) are, «estis» = you (pl.) are, «sunt» = they are."
    },
    {
      prompt: "«Potestis» tells you that somebody can do something. Who?",
      options: ["I", "you (one person)", "we", "you (more than one)"],
      answer: 3,
      explain: "The ‑tis ending marks ‘you (plural)’: «potestis» = you all can. ‘You (sg.) can’ would be «potes», ‘we can’ «possumus»."
    },
    {
      prompt: "In «Quinn nāvigāre cupit», what does «nāvigāre» mean?",
      options: ["he sails", "to sail", "the sailor", "they sail"],
      answer: 1,
      explain: "The ‑āre ending marks the infinitive: Quinn wants to sail. ‘He sails’ would be «nāvigat»; ‘the sailor’ is «nauta»."
    },
    {
      prompt: "Which sentence says that the family CANNOT work today?",
      options: [
        "Familia hodiē labōrāre nōn dēbet.",
        "Familia hodiē nōn labōrat.",
        "Familia hodiē labōrāre nōn potest.",
        "Familia crās labōrāre potest."
      ],
      answer: 2,
      explain: "«labōrāre nōn potest» = is not able to work. «nōn dēbet» = doesn't have to; «nōn labōrat» = isn't working; «crās… potest» = can work tomorrow."
    },
    {
      prompt: "In «necesse est cistās parāre», what exactly is necessary?",
      options: [
        "the trunks themselves",
        "getting the trunks ready",
        "buying new trunks",
        "opening the trunks"
      ],
      answer: 1,
      explain: "«necesse est» + infinitive: the necessary thing is «parāre» (to prepare), and «cistās» is the object of that infinitive."
    },
    {
      prompt: "«Licetne Paulae natāre?» is asking whether…",
      options: [
        "Paula knows how to swim",
        "Paula is allowed to swim",
        "Paula wants to swim",
        "Paula must swim"
      ],
      answer: 1,
      explain: "«licet» + dative + infinitive = it is permitted for someone to… Ability would be «potest», desire «cupit», obligation «dēbet»."
    },
    {
      prompt: "Spot the infinitive: «Māter fīliam cantāre iubet.»",
      options: ["Māter", "fīliam", "cantāre", "iubet"],
      answer: 2,
      explain: "«cantāre» wears the ‑āre name tag: to sing. The mother (nom.) orders her daughter (acc.) to sing — the «iubeō» pattern."
    },
    {
      prompt: "«Parātī estis» means…",
      options: [
        "I am ready",
        "he is ready",
        "you (all) are ready",
        "they are ready"
      ],
      answer: 2,
      explain: "«estis» = you (pl.) are, and «parātī» agrees in the plural. ‘They are ready’ would be «parātī sunt», ‘I am ready’ «parātus sum» or «parāta sum»."
    }
  ]
});
