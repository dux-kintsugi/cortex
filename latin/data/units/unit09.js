registerUnit({
  id: 9,
  stage: 1,
  title: "Epistula ex Urbe",
  tagline: "Third-declension nouns in all their cases",

  grammar: [
    {
      heading: "A third family of nouns",
      body: "<p>So far every noun you’ve met has belonged to one of two tidy families: the 1st declension (<span class=\"la\">epistula, epistulam, epistulae…</span>) and the 2nd (<span class=\"la\">oculus, oculum, oculī…</span>). Ted’s letter is full of nouns from a third family — the <strong>3rd declension</strong> — and its members refuse to match: <span class=\"la\">rēx</span>, <span class=\"la\">urbs</span>, <span class=\"la\">homō</span>, <span class=\"la\">nox</span>, <span class=\"la\">corpus</span>. No shared nominative ending at all.</p><p>The trick: the nominative is a disguise, and the <strong>genitive</strong> pulls it off. <span class=\"la\">rēx, rēgis</span> — drop the <span class=\"la\">-is</span> and you have the stem <span class=\"la\">rēg-</span>, the base on which every other form is built. That is why the vocabulary list always gives you the pair.</p>",
      table: {
        caption: "The nominative disguises, the genitive reveals",
        headers: ["Nominative", "Genitive", "Stem", "Meaning"],
        rows: [
          ["rēx", "rēgis", "rēg-", "king"],
          ["urbs", "urbis", "urb-", "city"],
          ["homō", "hominis", "homin-", "person"],
          ["mīles", "mīlitis", "mīlit-", "soldier"],
          ["corpus", "corporis", "corpor-", "body"],
          ["nox", "noctis", "noct-", "night"]
        ]
      },
      tip: "Reading tip: when you meet a strange form like «noctem» or «mīlitibus», peel off the ending and look for a stem you know: noct- → nox, mīlit- → mīles."
    },
    {
      heading: "The endings: masculine and feminine",
      body: "<p>Good news: the 3rd declension does exactly the same <em>jobs</em> with its cases as the first two — subject, direct object, ‘of’, ‘to/for’, and partner-of-prepositions. Only the costumes are new. Here is <span class=\"la\">rēx</span> in full.</p><p>Most of these will feel familiar fast: <span class=\"la\">-em</span> works like <span class=\"la\">-am</span> and <span class=\"la\">-um</span> (direct object), <span class=\"la\">-is</span> answers ‘whose?’ just as <span class=\"la\">-ae</span> and <span class=\"la\">-ī</span> did, and <span class=\"la\">-ibus</span> is the all-purpose plural ‘to/for/with’ ending.</p>",
      table: {
        caption: "Third declension, masculine & feminine: rēx, rēgis (king)",
        headers: ["Case", "Singular", "Plural", "How to read it"],
        rows: [
          ["Nominative", "rēx", "rēgēs", "subject"],
          ["Accusative", "rēgem", "rēgēs", "direct object"],
          ["Genitive", "rēgis", "rēgum", "of the king(s)"],
          ["Dative", "rēgī", "rēgibus", "to / for the king(s)"],
          ["Ablative", "rēge", "rēgibus", "after prepositions: cum rēge"]
        ]
      },
      tip: "When you see «-em», think ‘direct object’; when you see «-is» after a noun you already know, think ‘of the…’."
    },
    {
      heading: "The neuters: corpus, nōmen, caput",
      body: "<p>Neuter nouns of the 3rd declension play by two special rules. First, the accusative is <strong>identical</strong> to the nominative — <span class=\"la\">nōmen</span> is both ‘the name (subject)’ and ‘the name (object)’; only the rest of the sentence tells you which. Second, the plural ends in <span class=\"la\">-a</span>: <span class=\"la\">corpora</span>, <span class=\"la\">nōmina</span>, <span class=\"la\">capita</span>.</p><p>That <span class=\"la\">-a</span> is a famous trap. <span class=\"la\">corpora</span> looks like a 1st-declension singular (like <span class=\"la\">epistula</span>) — but it means ‘bodies’, plural. If a form seems 1st-declension yet no such noun exists, suspect a neuter plural.</p>",
      table: {
        caption: "Third declension neuter: nōmen, nōminis (name)",
        headers: ["Case", "Singular", "Plural"],
        rows: [
          ["Nominative", "nōmen", "nōmina"],
          ["Accusative", "nōmen", "nōmina"],
          ["Genitive", "nōminis", "nōminum"],
          ["Dative", "nōminī", "nōminibus"],
          ["Ablative", "nōmine", "nōminibus"]
        ]
      },
      tip: "Reading tip: if an -a word is the subject of a plural verb («nōmina sunt»), it is a neuter plural, not a 1st-declension singular."
    },
    {
      heading: "Look-alikes: reading around the ambiguity",
      body: "<p>Two endings pull double duty. <span class=\"la\">-ēs</span> is both nominative <em>and</em> accusative plural: in <span class=\"la\">mīlitēs videō</span> the soldiers are being seen (the verb says ‘I see’), but in <span class=\"la\">mīlitēs ambulant</span> they are the subject. Let the verb — its person and its number — cast the deciding vote.</p><p>A few nouns also wear <span class=\"la\">-is</span> in the nominative itself: <span class=\"la\">cīvis</span> (citizen), <span class=\"la\">auris</span> (ear), <span class=\"la\">nāvis</span> (ship) — yes, your old friend from the harbor was 3rd declension all along. And some genitive plurals add an i: <span class=\"la\">cīvium</span>, <span class=\"la\">montium</span>, <span class=\"la\">partium</span>. The <span class=\"la\">-um</span> at the end still means ‘of the …s’.</p><p>One more look-alike, and Ted’s letter leans on it: on a 3rd-declension noun, <span class=\"la\">-ī</span> is the <strong>dative</strong> singular — ‘to/for’. <span class=\"la\">Imperātōrī clāmant</span>: they shout <em>to</em> the emperor. That same <span class=\"la\">-ī</span> has meant ‘of’ on 2nd-declension nouns ever since <span class=\"la\">epistula avunculī</span> — but a 3rd-declension noun does its ‘of’ work with <span class=\"la\">-is</span> (<span class=\"la\">imperātōris</span>, ‘of the emperor’). So check the noun’s family: if its genitive ends in <span class=\"la\">-is</span>, then <span class=\"la\">-ī</span> on it means ‘to/for’, not ‘of’.</p>",
      tip: "Don’t panic over an ambiguous ending — Romans didn’t read word by word, and neither should you. Hold both possibilities, read on, and the verb will settle it."
    }
  ],

  vocab: [
    {
      latin: "epistula",
      forms: "epistulae, f.",
      pos: "noun (1st decl.)",
      gloss: "letter (correspondence)",
      example: "Ted epistulam ad familiam mittit.",
      exampleGloss: "Ted sends a letter to the family."
    },
    {
      latin: "urbs",
      forms: "urbis, f.",
      pos: "noun (3rd decl.)",
      gloss: "city",
      example: "Rōma est urbs magna et pulchra.",
      exampleGloss: "Rome is a big, beautiful city."
    },
    {
      latin: "rēx",
      forms: "rēgis, m.",
      pos: "noun (3rd decl.)",
      gloss: "king",
      example: "Rōma rēgēs nōn habet, sed imperātōrem.",
      exampleGloss: "Rome has no kings — but it has an emperor."
    },
    {
      latin: "homō",
      forms: "hominis, m.",
      pos: "noun (3rd decl.)",
      gloss: "human being, person",
      example: "Multī hominēs in urbe habitant.",
      exampleGloss: "Many people live in the city."
    },
    {
      latin: "mīles",
      forms: "mīlitis, m.",
      pos: "noun (3rd decl.)",
      gloss: "soldier",
      example: "Mīlitēs per viās urbis ambulant.",
      exampleGloss: "Soldiers walk through the streets of the city."
    },
    {
      latin: "senātor",
      forms: "senātōris, m.",
      pos: "noun (3rd decl.)",
      gloss: "senator",
      example: "Senātor togam pulchram habet.",
      exampleGloss: "The senator has a beautiful toga."
    },
    {
      latin: "imperātor",
      forms: "imperātōris, m.",
      pos: "noun (3rd decl.)",
      gloss: "emperor; general",
      example: "Cīvēs imperātōrem laudant.",
      exampleGloss: "The citizens praise the emperor."
    },
    {
      latin: "cīvis",
      forms: "cīvis, m./f.",
      pos: "noun (3rd decl.)",
      gloss: "citizen",
      example: "Cīvēs in forō stant et clāmant.",
      exampleGloss: "The citizens stand in the forum and shout."
    },
    {
      latin: "senex",
      forms: "senis, m.",
      pos: "noun (3rd decl.)",
      gloss: "old man",
      example: "Senex fessus prope portam sedet.",
      exampleGloss: "A tired old man sits near the gate."
    },
    {
      latin: "corpus",
      forms: "corporis, n.",
      pos: "noun (3rd decl., neuter)",
      gloss: "body",
      example: "Corpus hominis caput et pedēs habet.",
      exampleGloss: "A person’s body has a head and feet."
    },
    {
      latin: "caput",
      forms: "capitis, n.",
      pos: "noun (3rd decl., neuter)",
      gloss: "head",
      example: "Paula caput pūpae tenet.",
      exampleGloss: "Paula is holding the doll’s head."
    },
    {
      latin: "pēs",
      forms: "pedis, m.",
      pos: "noun (3rd decl.)",
      gloss: "foot",
      example: "Lupo pedem patris tenet.",
      exampleGloss: "Lupo has hold of father’s foot."
    },
    {
      latin: "oculus",
      forms: "oculī, m.",
      pos: "noun (2nd decl.)",
      gloss: "eye",
      example: "Oculī Paulae sunt pulchrī.",
      exampleGloss: "Paula’s eyes are beautiful."
    },
    {
      latin: "auris",
      forms: "auris, f.",
      pos: "noun (3rd decl.)",
      gloss: "ear",
      example: "Canis aurēs bonās habet.",
      exampleGloss: "The dog has good ears."
    },
    {
      latin: "cor",
      forms: "cordis, n.",
      pos: "noun (3rd decl., neuter)",
      gloss: "heart",
      example: "Cor puerī laetum est.",
      exampleGloss: "The boy’s heart is glad."
    },
    {
      latin: "vōx",
      forms: "vōcis, f.",
      pos: "noun (3rd decl.)",
      gloss: "voice",
      example: "Vōx magistrī magna est.",
      exampleGloss: "The teacher’s voice is loud."
    },
    {
      latin: "nōmen",
      forms: "nōminis, n.",
      pos: "noun (3rd decl., neuter)",
      gloss: "name",
      example: "Nōmen canis est Lupo.",
      exampleGloss: "The dog’s name is Lupo."
    },
    {
      latin: "lūx",
      forms: "lūcis, f.",
      pos: "noun (3rd decl.)",
      gloss: "light",
      example: "Māter lūcem in fenestrā videt.",
      exampleGloss: "Mother sees a light in the window."
    },
    {
      latin: "nox",
      forms: "noctis, f.",
      pos: "noun (3rd decl.)",
      gloss: "night",
      example: "Nautae per noctem nāvigant.",
      exampleGloss: "The sailors sail through the night."
    },
    {
      latin: "mōns",
      forms: "montis, m.",
      pos: "noun (3rd decl.)",
      gloss: "mountain, hill",
      example: "In montibus templa stant.",
      exampleGloss: "Temples stand on the hills."
    },
    {
      latin: "pōns",
      forms: "pontis, m.",
      pos: "noun (3rd decl.)",
      gloss: "bridge",
      example: "Nautae prope pontem labōrant.",
      exampleGloss: "The sailors work near the bridge."
    },
    {
      latin: "pars",
      forms: "partis, f.",
      pos: "noun (3rd decl.)",
      gloss: "part",
      example: "Magna pars urbis nova est.",
      exampleGloss: "A great part of the city is new."
    },
    {
      latin: "salūs",
      forms: "salūtis, f.",
      pos: "noun (3rd decl.)",
      gloss: "safety, health; greeting",
      example: "Ted familiae salūtem mittit.",
      exampleGloss: "Ted sends the family a greeting."
    },
    {
      latin: "mittō",
      forms: "mittere, mīsī, missum",
      pos: "verb (3rd conj.)",
      gloss: "send",
      example: "Ego epistulam ad amīcum mittō.",
      exampleGloss: "I am sending a letter to my friend."
    },
    {
      latin: "accipiō",
      forms: "accipere, accēpī, acceptum",
      pos: "verb (3rd conj., -iō)",
      gloss: "receive, accept",
      example: "Familia epistulam laeta accipit.",
      exampleGloss: "The family happily receives the letter."
    }
  ],

  readings: [
    {
      title: "Homō ad portam",
      intro: "A knock at the door of the Fabius house: someone has come a long way with something to deliver.",
      paragraphs: [
        "Familia Fabia in ātriō sedet. Māter fīliaque tunicās parant; Quinn litterās scrībit; Lupo dormit. Subitō canis clāmat: homō ad portam stat! Homō epistulam magnam tenet.",
        "«Salvē!» inquit homō. «Epistulam portō. Epistula ex urbe Rōmā est.» Mark properat et epistulam accipit. Ecce — epistula avunculī est! Ted, frāter Juliae, iam in urbe magnā habitat.",
        "Familia laeta est. Māter vōcem hominis audit: homō «Valēte!» clāmat et ambulat. Quinn epistulam tenet, quod puer in lūdō litterās discit et bene legit. Māter et pater et soror audiunt; Lupo quoque nōn dormit, sed sedet et audit — canis aurēs bonās habet. Quinn epistulam legit."
      ],
      glosses: {
        "familia": "the family",
        "fabia": "Fabian, of the Fabii (the family’s name)",
        "in": "in (+ abl.)",
        "ātriō": "the atrium, the front hall (abl. after «in»)",
        "sedet": "sits, is sitting",
        "māter": "the mother",
        "fīliaque": "and the daughter (-que = and)",
        "tunicās": "tunics (acc. pl. — object)",
        "parant": "(they) prepare, get ready",
        "quinn": "Quinn (the son — his name never changes form)",
        "litterās": "letters of the alphabet (acc. pl.)",
        "scrībit": "writes",
        "lupo": "Lupo (the dog — his name never changes form; quasi lupus, ‘wolf’!)",
        "dormit": "sleeps",
        "subitō": "suddenly",
        "canis": "the dog",
        "clāmat": "shouts, calls out (of the dog: barks)",
        "homō": "a man, a person (3rd decl. nominative)",
        "ad": "at, to (+ acc.)",
        "portam": "the door, the gate (acc. after «ad»)",
        "stat": "stands, is standing",
        "epistulam": "a letter (acc. — object)",
        "magnam": "big (agreeing with «epistulam»)",
        "tenet": "holds",
        "salvē": "hello!",
        "inquit": "says (used with quoted speech)",
        "portō": "I carry, I bring",
        "epistula": "the letter (nom. — subject)",
        "ex": "out of, from (+ abl.)",
        "urbe": "the city (abl. after «ex»/«in»)",
        "rōmā": "Rome (abl. — «urbe Rōmā», the city of Rome)",
        "est": "is",
        "mark": "Mark (the father — his name never changes form)",
        "properat": "hurries",
        "et": "and",
        "accipit": "receives, takes",
        "ecce": "look!",
        "avunculī": "of the uncle, the uncle’s (gen. — the 2nd-decl. -ī ‘of’ ending)",
        "ted": "Ted (Julia’s brother, a ship’s captain — his name never changes form)",
        "frāter": "the brother",
        "juliae": "of Julia (gen. — the -ae ‘of’ ending)",
        "iam": "now, by now",
        "magnā": "great (abl., agreeing with «urbe»)",
        "habitat": "lives, dwells",
        "laeta": "happy, glad",
        "vōcem": "the voice (acc. -em — direct object; from vōx, vōcis)",
        "hominis": "of the man (gen. — the -is ‘of’ form of «homō»)",
        "valēte": "goodbye! farewell! (said to more than one person)",
        "ambulat": "walks — here, walks off",
        "quod": "because",
        "puer": "the boy",
        "lūdō": "school (abl. after «in»)",
        "discit": "learns, is learning",
        "bene": "well",
        "legit": "reads",
        "pater": "the father",
        "soror": "the sister (3rd decl. nominative)",
        "audiunt": "(they) listen",
        "quoque": "also, too",
        "nōn": "not",
        "sed": "but",
        "audit": "listens",
        "aurēs": "ears (acc. pl. — object)",
        "bonās": "good (agreeing with «aurēs»)",
        "habet": "has"
      },
      translation: [
        "The Fabius family is sitting in the atrium. Mother and daughter are getting tunics ready; Quinn is writing his letters; Lupo is asleep. Suddenly the dog barks: a man is standing at the door! The man is holding a big letter.",
        "«Hello!» says the man. «I’m carrying a letter. The letter is from the city of Rome.» Mark hurries over and takes the letter. Look — it is their uncle’s letter! Ted, Julia’s brother, is now living in the great city.",
        "The family is delighted. Mother hears the man’s voice: the man calls «Farewell!» and walks off. Quinn holds the letter, because the boy is learning his letters at school and reads well. Mother, father, and sister listen; Lupo, too, is not sleeping but sits and listens — the dog has good ears. Quinn reads the letter."
      ],
      questions: [
        {
          q: "What is the family doing when the stranger appears?",
          options: [
            "Sleeping in their bedrooms",
            "Sitting in the atrium, busy with everyday tasks",
            "Shopping at the market",
            "Walking to the harbor"
          ],
          answer: 1,
          explain: "«Familia Fabia in ātriō sedet» — mother and daughter prepare tunics, Quinn writes, and Lupo (of course) sleeps."
        },
        {
          q: "Who is the first to notice the man at the door?",
          options: ["Mark", "Quinn", "Lupo the dog", "Julia"],
          answer: 2,
          explain: "«Subitō canis clāmat» — the dog suddenly barks, and only then do we learn a man is standing at the door."
        },
        {
          q: "In «epistula avunculī est», what does the ending of «avunculī» tell you?",
          options: [
            "The uncle is the subject of the sentence",
            "The letter was sent to the uncle",
            "The letter belongs to the uncle — it is his letter",
            "The uncle is the direct object"
          ],
          answer: 2,
          explain: "«avunculī» is genitive — ‘of the uncle’. The letter is Uncle Ted’s own."
        },
        {
          q: "Why is it Quinn, rather than his parents, who takes the letter?",
          options: [
            "He is learning his letters at school and reads well",
            "He is the oldest child in the family",
            "Mark and Julia refuse to touch it",
            "The letter is addressed only to him"
          ],
          answer: 0,
          explain: "«quod puer in lūdō litterās discit et bene legit» — because the boy is learning letters at school and reads well."
        }
      ]
    },
    {
      title: "Epistula Avunculī",
      intro: "Quinn reads his uncle Ted’s letter aloud — greetings from the greatest city in the world.",
      paragraphs: [
        "Ted Juliae et Mark et Quinn et Paulae salūtem mittit. Ego iam in urbe Rōmā habitō. Rōma nōn est oppidum, sed urbs magna: multī hominēs hīc habitant.",
        "Ego per viās urbis saepe ambulō et hominēs spectō. Mīlitēs videō et senātōrēs; senātōrēs togās pulchrās habent. In forō cīvēs stant, et vōcēs cīvium magnae sunt. Etiam imperātōrem videō! Nōmen imperātōris est Trāiānus. Multī mīlitēs cum imperātōre ambulant, et cīvēs imperātōrī clāmant: «Salvē, imperātor!»",
        "Urbs septem montēs habet; in montibus templa magna stant. Ego cum nautīs per pontēs urbis ambulō et nāvēs spectō. Pars urbis nova semper oculōs dēlectat!",
        "Sed nox in urbe nōn est grāta: hominēs per noctem clāmant et cantant, et ego male dormiō — oculī fessī sunt! Mox tamen ad vōs nāvigō et dōna multa portō, et botulum magnum canī Lupo! Valēte."
      ],
      glosses: {
        "ted": "Ted (writing from Rome — his name never changes form)",
        "juliae": "to Julia (dat. — the -ae ‘to/for’ ending marks a recipient of the letter)",
        "et": "and",
        "mark": "Mark (the father — his name never changes form; a recipient like the others: ‘to Mark’)",
        "quinn": "Quinn (the son — never changes form; ‘to Quinn’)",
        "paulae": "to Paula (dat.)",
        "salūtem": "a greeting (acc. — «salūtem mittit», ‘sends a greeting’: the standard Roman letter opening)",
        "mittit": "sends",
        "ego": "I",
        "iam": "now, by now",
        "in": "in, on (+ abl.)",
        "urbe": "the city (abl.)",
        "rōmā": "Rome (abl. — «in urbe Rōmā»)",
        "habitō": "I live, I dwell",
        "rōma": "Rome (nom. — subject)",
        "nōn": "not",
        "est": "is",
        "oppidum": "a town",
        "sed": "but",
        "urbs": "a city (3rd decl. nominative)",
        "magna": "great, big",
        "multī": "many",
        "hominēs": "people (-ēs is nom. or acc. pl. — subject in «hominēs habitant», object in «hominēs spectō»)",
        "hīc": "here",
        "habitant": "(they) live",
        "per": "through (+ acc.)",
        "viās": "the streets (acc. pl. after «per»)",
        "urbis": "of the city (gen.)",
        "saepe": "often",
        "ambulō": "I walk",
        "spectō": "I watch",
        "mīlitēs": "soldiers (-ēs can be nom. or acc. pl. — the verb decides which)",
        "videō": "I see",
        "senātōrēs": "senators (acc. pl. as object, then nom. pl. as subject — same -ēs ending)",
        "togās": "togas (acc. pl. — object)",
        "pulchrās": "beautiful (agreeing with «togās»)",
        "habent": "(they) have",
        "forō": "the forum (abl. after «in»)",
        "cīvēs": "the citizens (nom. pl. — subject)",
        "stant": "(they) stand",
        "vōcēs": "the voices (nom. pl. — subject)",
        "cīvium": "of the citizens (gen. pl.)",
        "magnae": "loud, great (agreeing with «vōcēs»)",
        "sunt": "are",
        "etiam": "even, also",
        "imperātōrem": "the emperor (acc. — object)",
        "nōmen": "the name (3rd decl. neuter — subject)",
        "imperātōris": "of the emperor (gen.)",
        "trāiānus": "Trajan (emperor of Rome, AD 98–117)",
        "cum": "with (+ abl.)",
        "imperātōre": "the emperor (abl. after «cum»)",
        "ambulant": "(they) walk",
        "imperātōrī": "to the emperor (dat. — the one they shout to)",
        "clāmant": "(they) shout",
        "salvē": "hail! hello!",
        "imperātor": "emperor (nom. form, used here as a greeting)",
        "septem": "seven",
        "montēs": "hills (acc. pl. — object of «habet»)",
        "habet": "has",
        "montibus": "the hills (abl. pl. after «in»)",
        "templa": "temples (2nd decl. neuter nom. pl. — subject)",
        "nautīs": "sailors (abl. pl. after «cum»)",
        "pontēs": "the bridges (acc. pl. after «per»)",
        "nāvēs": "ships (acc. pl. — object)",
        "pars": "a part (3rd decl. nom. — subject)",
        "nova": "new (agreeing with «pars»)",
        "semper": "always",
        "oculōs": "the eyes (acc. pl. — object)",
        "dēlectat": "delights",
        "nox": "the night (3rd decl. nom. — subject)",
        "grāta": "pleasant (agreeing with «nox»)",
        "noctem": "the night (acc. after «per» — all through the night)",
        "cantant": "(they) sing",
        "male": "badly",
        "dormiō": "I sleep",
        "oculī": "(my) eyes (nom. pl. — subject)",
        "fessī": "tired (agreeing with «oculī»)",
        "mox": "soon",
        "tamen": "however, still",
        "ad": "to (+ acc.)",
        "vōs": "you all (after «ad»)",
        "nāvigō": "I sail",
        "dōna": "gifts (acc. pl. — object)",
        "multa": "many (agreeing with «dōna»)",
        "portō": "I carry, I bring",
        "botulum": "a sausage (acc. — object)",
        "magnum": "big (agreeing with «botulum»)",
        "canī": "for the dog (dat. — the 3rd-decl. -ī ‘to/for’ ending of «canis»)",
        "lupo": "Lupo (the dog’s name, in apposition — it never changes form)",
        "valēte": "farewell! (the standard way to close a Roman letter)"
      },
      translation: [
        "Ted sends greetings to Julia and Mark and Quinn and Paula. I am now living in the city of Rome. Rome is not a town but a great city: many people live here.",
        "I often walk through the streets of the city and watch the people. I see soldiers and senators; the senators have beautiful togas. In the forum citizens stand about, and the voices of the citizens are loud. I even see the emperor! The emperor’s name is Trajan. Many soldiers walk with the emperor, and the citizens shout to the emperor: «Hail, emperor!»",
        "The city has seven hills; on the hills stand great temples. I walk with sailors across the city’s bridges and watch the ships. Some new part of the city is always delighting my eyes!",
        "But night in the city is not pleasant: people shout and sing all through the night, and I sleep badly — my eyes are tired! Soon, however, I am sailing to you, and I am bringing many gifts — and a big sausage for Lupo the dog! Farewell."
      ],
      questions: [
        {
          q: "How does Ted open his letter?",
          options: [
            "With a complaint about the noise",
            "By sending a greeting to each family member by name",
            "With a description of the emperor",
            "By asking the family for money"
          ],
          answer: 1,
          explain: "«Ted Juliae et Mark et Quinn et Paulae salūtem mittit» — the classic Roman letter opening, with the recipients in the dative: «Juliae» and «Paulae» show the -ae ending, while Mark and Quinn never change form."
        },
        {
          q: "In «vōcēs cīvium magnae sunt», what does «cīvium» mean?",
          options: [
            "The citizens, as the subject",
            "Of the citizens (genitive plural)",
            "To the citizens (dative)",
            "One citizen (singular)"
          ],
          answer: 1,
          explain: "The -ium ending is a genitive plural: the voices OF the citizens are loud."
        },
        {
          q: "In «cīvēs imperātōrī clāmant», what does the ending of «imperātōrī» signal?",
          options: [
            "The subject (nominative)",
            "Possession (genitive)",
            "The person the shout is directed to (dative)",
            "The direct object (accusative)"
          ],
          answer: 2,
          explain: "Third-declension -ī is the dative singular — the citizens shout TO the emperor."
        },
        {
          q: "What is Ted’s one complaint about life in Rome?",
          options: [
            "The food is terrible",
            "The bridges are dangerous",
            "People shout and sing all night, so he sleeps badly",
            "He never gets to see the emperor"
          ],
          answer: 2,
          explain: "«hominēs per noctem clāmant et cantant, et ego male dormiō» — the night noise ruins his sleep."
        }
      ]
    }
  ],

  quiz: [
    {
      prompt: "In «Cīvēs rēgem nōn habent», which word is the direct object?",
      options: ["Cīvēs", "rēgem", "nōn", "habent"],
      answer: 1,
      explain: "«rēgem» ends in -em, the third-declension accusative singular — the direct-object case."
    },
    {
      prompt: "What does «hominis» mean in «nōmen hominis»?",
      options: ["the person (subject)", "of the person", "to the person", "with the person"],
      answer: 1,
      explain: "-is is the third-declension genitive singular: the name OF the person."
    },
    {
      prompt: "Which is the accusative (direct-object) form of «urbs»?",
      options: ["urbis", "urbī", "urbem", "urbe"],
      answer: 2,
      explain: "-em marks the accusative singular: «urbem videō» — I see the city."
    },
    {
      prompt: "«Corpora» looks like a first-declension noun, but it is really…",
      options: [
        "a woman’s name",
        "the plural of «corpus» — ‘bodies’",
        "the genitive of «corpus»",
        "an adjective"
      ],
      answer: 1,
      explain: "Third-declension neuters form their nominative and accusative plural in -a: corpus → corpora, nōmen → nōmina."
    },
    {
      prompt: "In «Mīlitēs imperātōrem spectant», who is watching whom?",
      options: [
        "The soldiers watch the emperor",
        "The emperor watches the soldiers",
        "They are watching each other",
        "It cannot be determined"
      ],
      answer: 0,
      explain: "«imperātōrem» wears the accusative -em (object), so «mīlitēs» must be the nominative plural — and the plural verb «spectant» agrees with it."
    },
    {
      prompt: "In «Ted senātōribus fābulās nārrat», what does «senātōribus» mean?",
      options: ["the senators (subject)", "of the senators", "to the senators", "with one senator"],
      answer: 2,
      explain: "-ibus is the dative or ablative plural; with a verb of telling («nārrat»), read it as dative — Ted tells stories TO the senators."
    },
    {
      prompt: "In «Cīvis in viā stat», the word «cīvis» is…",
      options: [
        "genitive — ‘of the citizen’",
        "nominative — the subject, ‘the citizen’",
        "accusative — the direct object",
        "dative — ‘to the citizen’"
      ],
      answer: 1,
      explain: "Some third-declension nominatives happen to end in -is. The verb «stat» needs a subject, and «cīvis» is it."
    },
    {
      prompt: "Which noun is correctly paired with its genitive?",
      options: ["rēx → rēgis", "homō → homōris", "mīles → mīlēs", "nox → noxae"],
      answer: 0,
      explain: "The genitive reveals the stem: rēx, rēgis. (The real pairs are homō, hominis; mīles, mīlitis; nox, noctis.)"
    }
  ]
});
