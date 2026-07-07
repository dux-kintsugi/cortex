registerUnit({
  id: 10,
  stage: 1,
  title: "Ferōx Perditus",
  tagline: "Adjective agreement across the cases — and everything Stage I taught you",

  grammar: [
    {
      heading: "Adjectives wear the noun's uniform",
      body: "<p>You have known since Unit 2 that Latin adjectives change their endings: <span class=\"la\">hortus magnus</span>, <span class=\"la\">rosa pulchra</span>. Here, at last, is the whole system. An adjective <strong>agrees</strong> with its noun in three things — <strong>case</strong>, <strong>number</strong>, and <strong>gender</strong> — and it borrows endings you already know from <span class=\"la\">puella</span>, <span class=\"la\">servus</span>, and <span class=\"la\">dōnum</span>.</p><p>So <span class=\"la\">canis niger</span> is the black dog doing something, <span class=\"la\">canem nigrum</span> is the black dog having something done to it, and <span class=\"la\">cum cane nigrō</span> is the black dog keeping you company. The ending is not decoration: it tells you which noun the adjective belongs to, even from across the sentence.</p>",
      table: {
        caption: "«magnus, -a, -um» across the cases",
        headers: ["Case", "Masculine", "Feminine", "Neuter"],
        rows: [
          ["Nom. sg.", "magnus", "magna", "magnum"],
          ["Acc. sg.", "magnum", "magnam", "magnum"],
          ["Gen. sg.", "magnī", "magnae", "magnī"],
          ["Dat. sg.", "magnō", "magnae", "magnō"],
          ["Abl. sg.", "magnō", "magnā", "magnō"],
          ["Nom. pl.", "magnī", "magnae", "magna"],
          ["Acc. pl.", "magnōs", "magnās", "magna"],
          ["Gen. pl.", "magnōrum", "magnārum", "magnōrum"],
          ["Dat./Abl. pl.", "magnīs", "magnīs", "magnīs"]
        ]
      },
      tip: "Read each ending as a name-tag: «magnam» says ‘I belong to a feminine accusative singular — go and find her.’"
    },
    {
      heading: "Agreement is not rhyming",
      body: "<p>With first- and second-declension nouns, adjective and noun often chime: <span class=\"la\">puella parva</span>, <span class=\"la\">dominō bonō</span>. But Unit 9 gave you third-declension nouns, and with those the music changes: <span class=\"la\">vōx clāra</span>, <span class=\"la\">nāvem magnam</span>, <span class=\"la\">in urbe magnā</span>. The endings do not match — and the grammar is perfect.</p><p><strong>Agreement means same case, number, and gender — not the same letters.</strong> A first/second-declension adjective keeps its own endings no matter which declension its noun comes from.</p>",
      table: {
        caption: "Mismatched endings, perfect agreement",
        headers: ["Phrase", "Case, number, gender", "Meaning"],
        rows: [
          ["canis niger", "nom. sg. m.", "the black dog (subject)"],
          ["canem nigrum", "acc. sg. m.", "the black dog (object)"],
          ["vōx clāra", "nom. sg. f.", "a clear voice"],
          ["in urbe magnā", "abl. sg. f.", "in the great city"],
          ["mīlitī validō", "dat. sg. m.", "to the strong soldier"]
        ]
      },
      tip: "Puzzled by an adjective's ending? Don't stare at it — find its noun. The noun's case explains everything."
    },
    {
      heading: "The -er family: pulcher and miser",
      body: "<p>A few masculine forms end in <span class=\"la\">-er</span> instead of <span class=\"la\">-us</span>. You have already met <span class=\"la\">pulcher</span> and <span class=\"la\">piger</span>; this unit adds <span class=\"la\">niger</span> and <span class=\"la\">miser</span>. The only question is what happens to that <em>e</em> when the other endings arrive: most adjectives drop it (<span class=\"la\">pulcher, pulchra</span>), a few keep it (<span class=\"la\">miser, misera</span>).</p><p>You never have to choose — you only have to recognize. <span class=\"la\">nigra</span>, <span class=\"la\">nigrum</span>, <span class=\"la\">miserī</span>, <span class=\"la\">miserae</span>: once you spot the stem, the rest is the familiar ending system.</p>",
      table: {
        caption: "Two kinds of -er adjective",
        headers: ["Masculine", "Feminine", "Neuter", "That little -e-"],
        rows: [
          ["pulcher", "pulchra", "pulchrum", "drops out"],
          ["niger", "nigra", "nigrum", "drops out"],
          ["piger", "pigra", "pigrum", "drops out"],
          ["miser", "misera", "miserum", "stays"]
        ]
      }
    },
    {
      heading: "Adjectives flying solo: substantives",
      body: "<p>Latin happily drops a noun when the adjective's gender already tells the story. <span class=\"la\">Multī in forō stant</span> — many <em>people</em> stand in the forum. <span class=\"la\">Multa videt</span> — he sees many <em>things</em>. An adjective used as a noun like this is called a <strong>substantive</strong>.</p><p>The decoder ring: masculine plural (<span class=\"la\">multī, bonī</span>) means people; feminine (<span class=\"la\">multae</span>) means women; neuter plural (<span class=\"la\">multa, bona</span>) means things. And the pronoun <span class=\"la\">nēmō</span>, ‘no one’, is the gloomiest of the lot — in this unit's story, <span class=\"la\">nēmō canem videt</span>.</p>",
      tip: "A lone adjective is a noun in disguise. Ask its gender: masculine — people; neuter — things."
    },
    {
      heading: "Stage I in one look",
      body: "<p>Unit 10 closes Stage I. Look how much Latin you now read on sight: five cases in three declensions, all six persons of the present tense, questions with <span class=\"la\">-ne</span>, answers with <span class=\"la\">ita</span> and <span class=\"la\">minimē</span>, and a squad of prepositions that announce which case is coming next.</p><p>One habit above all: <strong>read the endings, not the word order</strong>. <span class=\"la\">Canem nigrum nēmō videt</span> and <span class=\"la\">nēmō canem nigrum videt</span> say exactly the same thing — the <span class=\"la\">-m</span> endings mark the object wherever it stands.</p>",
      table: {
        caption: "The case signals you now know",
        headers: ["Case", "Job in the sentence", "Typical signals (sg. / pl.)"],
        rows: [
          ["Nominative", "subject; with «est/sunt»", "-a, -us, -um / -ae, -ī, -a, -ēs"],
          ["Accusative", "direct object; after «ad, per, prope»", "-am, -um, -em / -ās, -ōs, -a, -ēs"],
          ["Genitive", "possession — ‘of’", "-ae, -ī, -is / -ārum, -ōrum, -um"],
          ["Dative", "‘to/for’ with giving, showing, telling", "-ae, -ō, -ī / -īs, -ibus"],
          ["Ablative", "after «in, cum, sine, ā/ab, ē/ex, dē»", "-ā, -ō, -e / -īs, -ibus"]
        ]
      },
      tip: "And the verb endings, one last time: -ō I, -s you, -t he/she/it, -mus we, -tis you all, -nt they. Stage II hangs everything on these."
    }
  ],

  vocab: [
    {
      latin: "perditus",
      forms: "-a, -um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "lost",
      example: "Canis perditus in viīs errat.",
      exampleGloss: "The lost dog wanders in the streets."
    },
    {
      latin: "albus",
      forms: "-a, -um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "white",
      example: "Templa alba in forō stant.",
      exampleGloss: "White temples stand in the forum."
    },
    {
      latin: "niger",
      forms: "nigra, nigrum",
      pos: "adjective (1st/2nd decl., -er)",
      gloss: "black",
      example: "Ferōx est canis niger.",
      exampleGloss: "Ferox is a black dog."
    },
    {
      latin: "rūfus",
      forms: "-a, -um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "red, red-haired",
      example: "Nauta rūfus in nāve cantat.",
      exampleGloss: "A red-haired sailor is singing on the ship."
    },
    {
      latin: "flāvus",
      forms: "-a, -um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "yellow, golden",
      example: "Rosae flāvae in hortō sunt.",
      exampleGloss: "There are yellow roses in the garden."
    },
    {
      latin: "lātus",
      forms: "-a, -um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "wide, broad",
      example: "Viae urbis lātae sunt.",
      exampleGloss: "The streets of the city are wide."
    },
    {
      latin: "validus",
      forms: "-a, -um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "strong",
      example: "Nautae validī saccōs portant.",
      exampleGloss: "Strong sailors carry the sacks."
    },
    {
      latin: "miser",
      forms: "misera, miserum",
      pos: "adjective (1st/2nd decl., -er)",
      gloss: "wretched, unhappy",
      example: "Servus miser nōn cantat.",
      exampleGloss: "The unhappy slave is not singing."
    },
    {
      latin: "sollicitus",
      forms: "-a, -um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "worried, anxious",
      example: "Māter sollicita fīlium exspectat.",
      exampleGloss: "The worried mother is waiting for her son."
    },
    {
      latin: "tōtus",
      forms: "-a, -um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "whole, entire",
      example: "Tōta familia canem quaerit.",
      exampleGloss: "The whole family is searching for the dog."
    },
    {
      latin: "sōlus",
      forms: "-a, -um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "alone, only",
      example: "Paulla sōla in cubiculō sedet.",
      exampleGloss: "Paulla sits alone in the bedroom."
    },
    {
      latin: "medius",
      forms: "-a, -um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "middle (of)",
      example: "Nauta in mediā nāve stat.",
      exampleGloss: "The sailor stands in the middle of the ship."
    },
    {
      latin: "vērus",
      forms: "-a, -um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "true, real",
      example: "Fābula Titī vēra est.",
      exampleGloss: "Titus's story is true."
    },
    {
      latin: "clārus",
      forms: "-a, -um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "clear, bright; famous",
      example: "Rōma urbs clāra est.",
      exampleGloss: "Rome is a famous city."
    },
    {
      latin: "nēmō",
      forms: "acc. nēminem, m./f.",
      pos: "pronoun",
      gloss: "no one",
      example: "Nēmō in culīnā labōrat.",
      exampleGloss: "No one is working in the kitchen."
    },
    {
      latin: "quaerō",
      forms: "quaerere, quaesīvī, quaesītum",
      pos: "verb (3rd conj.)",
      gloss: "search for, seek",
      example: "Līvia fīliam in viīs quaerit.",
      exampleGloss: "Livia is looking for her daughter in the streets."
    },
    {
      latin: "inveniō",
      forms: "invenīre, invēnī, inventum",
      pos: "verb (4th conj.)",
      gloss: "find",
      example: "Familia canem in portū invenit.",
      exampleGloss: "The family finds the dog at the harbor."
    },
    {
      latin: "lātrō",
      forms: "lātrāre, lātrāvī, lātrātum",
      pos: "verb (1st conj.)",
      gloss: "bark",
      example: "Ferōx prope portam lātrat.",
      exampleGloss: "Ferox is barking near the gate."
    },
    {
      latin: "lacrimō",
      forms: "lacrimāre, lacrimāvī, lacrimātum",
      pos: "verb (1st conj.)",
      gloss: "weep, cry",
      example: "Paulla lacrimat, quod canis perditus est.",
      exampleGloss: "Paulla is crying because the dog is lost."
    },
    {
      latin: "ubīque",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "everywhere",
      example: "In portū canēs ubīque sunt.",
      exampleGloss: "At the harbor there are dogs everywhere."
    },
    {
      latin: "nusquam",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "nowhere",
      example: "Ferōx nusquam est.",
      exampleGloss: "Ferox is nowhere to be found."
    },
    {
      latin: "fortasse",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "perhaps",
      example: "Fortasse canis in hortō dormit.",
      exampleGloss: "Perhaps the dog is sleeping in the garden."
    },
    {
      latin: "color",
      forms: "colōris, m.",
      pos: "noun (3rd decl.)",
      gloss: "color",
      example: "Color rosae pulcher est.",
      exampleGloss: "The color of the rose is beautiful."
    },
    {
      latin: "forma",
      forms: "formae, f.",
      pos: "noun (1st decl.)",
      gloss: "shape, form, beauty",
      example: "Statua formam pulchram habet.",
      exampleGloss: "The statue has a beautiful shape."
    },
    {
      latin: "cauda",
      forms: "caudae, f.",
      pos: "noun (1st decl.)",
      gloss: "tail",
      example: "Canis caudam albam habet.",
      exampleGloss: "The dog has a white tail."
    }
  ],

  readings: [
    {
      title: "Canis Perditus",
      intro: "Morning in the Fabius house — and someone is missing from the atrium.",
      paragraphs: [
        "Māne est. Familia Fabia in ātriō sedet, sed Ferōx, canis niger, nōn est in ātriō. Quīntus cubicula spectat, Līvia culīnam, Mārcus hortum et tōtam domum. Canis nusquam est.",
        "Paulla misera lacrimat. «Ferōx perditus est!» clāmat. «Minimē,» inquit Līvia, et fīliam parvam tenet. «Ferōx validus est, nōn piger. Fortasse sōlus in viīs errat et cibum quaerit.» Sed tōta familia sollicita est.",
        "Familia per viās canem quaerit. «Ferōx! Ferōx!» clāmant puer puellaque, sed nēmō canem nigrum videt: nōn est in forō, nōn in macellō. Tandem Mārcus «Ferōx cibum amat,» inquit, «et in portū cibus est. Ad portum!»"
      ],
      glosses: {
        "māne": "in the early morning",
        "est": "is",
        "familia": "the family",
        "fabia": "Fabian — the familia Fabia, the Fabius household",
        "in": "in (+ abl.)",
        "ātriō": "the atrium, the main hall (abl. after «in»)",
        "sedet": "sits, is sitting",
        "sed": "but",
        "ferōx": "Ferox, the family dog (his name means ‘fierce’)",
        "canis": "dog (nom.)",
        "niger": "black (m. nom. — agreeing with «canis»)",
        "nōn": "not",
        "quīntus": "Quintus, the son, 12 years old",
        "cubicula": "the bedrooms (acc. pl., neuter)",
        "spectat": "looks at, checks",
        "līvia": "Livia, the mother",
        "culīnam": "the kitchen (acc.)",
        "mārcus": "Marcus, the father",
        "hortum": "the garden (acc.)",
        "et": "and",
        "tōtam": "the whole (acc. f. — agreeing with «domum»)",
        "domum": "house (acc.)",
        "nusquam": "nowhere",
        "paulla": "Paulla, the daughter, 8 years old",
        "misera": "poor, unhappy (f. nom. — agreeing with «Paulla»)",
        "lacrimat": "weeps, is crying",
        "perditus": "lost (m. nom.)",
        "clāmat": "shouts",
        "minimē": "no!, not at all",
        "inquit": "says (used with quoted speech)",
        "fīliam": "daughter (acc.)",
        "parvam": "little (acc. f. — agreeing with «fīliam»)",
        "tenet": "holds",
        "validus": "strong (m. nom.)",
        "piger": "lazy (m. nom.)",
        "fortasse": "perhaps",
        "sōlus": "alone (m. nom.)",
        "viīs": "the streets (abl. pl. after «in»)",
        "errat": "wanders, is wandering",
        "cibum": "food (acc.)",
        "quaerit": "searches for, is looking for",
        "tōta": "the whole (f. nom. — agreeing with «familia»)",
        "sollicita": "worried (f. nom.)",
        "per": "through (+ acc.)",
        "viās": "the streets (acc. pl. after «per»)",
        "canem": "dog (acc.)",
        "clāmant": "(they) shout",
        "puer": "the boy",
        "puellaque": "and the girl (-que = and)",
        "nēmō": "no one",
        "nigrum": "black (acc. m. — agreeing with «canem»)",
        "videt": "sees",
        "forō": "the forum (abl. after «in»)",
        "macellō": "the food-market (abl. after «in»)",
        "tandem": "at last",
        "amat": "loves",
        "portū": "the harbor (abl. after «in»)",
        "cibus": "food (nom.)",
        "ad": "to, toward (+ acc.)",
        "portum": "the harbor (acc. after «ad»)"
      },
      translation: [
        "It is early morning. The Fabius family is sitting in the atrium, but Ferox, the black dog, is not in the atrium. Quintus checks the bedrooms, Livia the kitchen, Marcus the garden and the whole house. The dog is nowhere.",
        "Poor Paulla is crying. «Ferox is lost!» she shouts. «Not at all,» says Livia, and holds her little daughter. «Ferox is strong, not lazy. Perhaps he is wandering alone in the streets, looking for food.» But the whole family is worried.",
        "The family searches the streets for the dog. «Ferox! Ferox!» shout the boy and the girl, but no one sees a black dog: he is not in the forum, not in the market. At last Marcus says: «Ferox loves food — and at the harbor there is food. To the harbor!»"
      ],
      questions: [
        {
          q: "At the start of the reading, why is the family worried?",
          options: [
            "Ferox has stolen Livia's breakfast",
            "Ferox is nowhere in the whole house",
            "Paulla refuses to get out of bed",
            "Marcus's ship is late"
          ],
          answer: 1,
          explain: "They search everywhere — «Quīntus cubicula spectat, Līvia culīnam, Mārcus hortum et tōtam domum» — and «canis nusquam est»: the dog is nowhere."
        },
        {
          q: "How does Livia try to comfort Paulla?",
          options: [
            "She promises to buy a new puppy",
            "She says Ferox is asleep in the garden",
            "She says Ferox is strong, not lazy — perhaps just off hunting for food",
            "She gives Paulla a sausage"
          ],
          answer: 2,
          explain: "«Ferōx validus est, nōn piger. Fortasse sōlus in viīs errat et cibum quaerit.» — strong, not lazy; probably wandering and looking for food."
        },
        {
          q: "In «nēmō canem nigrum videt», why does «nigrum» end in -um?",
          options: [
            "It agrees with «nēmō», the subject",
            "It agrees with «canem» — accusative singular masculine",
            "It is a neuter plural",
            "It marks the genitive case"
          ],
          answer: 1,
          explain: "«canem» is accusative singular masculine (the object of «videt»), so its adjective takes the matching form «nigrum». Same case, number, and gender — even though -em and -um are different letters."
        },
        {
          q: "What is Marcus's reasoning for heading to the harbor?",
          options: [
            "Titus is expecting the family there",
            "Ferox loves food, and the harbor is full of it",
            "A sailor reported seeing a black dog",
            "Paulla wants to look at the ships"
          ],
          answer: 1,
          explain: "«Ferōx cibum amat, et in portū cibus est. Ad portum!» — the dog loves food, and the harbor has food. Impeccable logic."
        }
      ]
    },
    {
      title: "Canis in Portū",
      intro: "The search reaches the harbor — where a very familiar ship is tied up.",
      paragraphs: [
        "Portus Ostiae plēnus est: nāvēs longae, nautae validī, saccī, amphorae. Familia per turbam ambulat. «Estne hīc canis niger?» rogat Quīntus. Nautae rīdent: «Hīc canēs ubīque sunt — albī, rūfī, flāvī!»",
        "Subitō canis procul lātrat: vōx clāra est. «Ferōx lātrat! Vōcem canis bene sciō!» clāmat Paulla. Familia ad nāvem magnam properat — et ibi canem invenit! In mediā nāve Ferōx sedet et caudam albam movet.",
        "In nāve etiam vir validus stat: Titus avunculus! «Salvēte!» inquit. «Ferōx nōn perditus est: māne ad nāvem errat et iam botulōs nautārum dēvorat. Vērus pīrāta est!» Paulla laeta canem tenet; iam nēmō lacrimat.",
        "Deinde Titus fābulās dē urbe Rōmā nārrat: «Rōma clāra est: forma urbis pulchra est, viae lātae sunt, templa alba.» «Spectāmusne nōs quoque urbem clāram?» rogat Quīntus. «Ita,» inquit Mārcus. «Mox tōta familia cum cane nigrō ad urbem nāvigat!»"
      ],
      glosses: {
        "portus": "the harbor (nom.)",
        "ostiae": "of Ostia, the port town of Rome (gen.)",
        "plēnus": "full (m. nom. — agreeing with «portus»)",
        "est": "is",
        "nāvēs": "ships (nom. pl.)",
        "longae": "long (f. nom. pl. — agreeing with «nāvēs»)",
        "nautae": "sailors (nom. pl.)",
        "validī": "strong (m. nom. pl. — agreeing with «nautae»)",
        "saccī": "sacks (nom. pl.)",
        "amphorae": "amphorae, big storage jars (nom. pl.)",
        "familia": "the family",
        "per": "through (+ acc.)",
        "turbam": "the crowd (acc.)",
        "ambulat": "walks",
        "estne": "is there…? («est» + question-marker «-ne»)",
        "hīc": "here",
        "canis": "dog — nom. in «canis niger»; genitive (‘of the dog’) in «vōcem canis»",
        "niger": "black (m. nom.)",
        "rogat": "asks",
        "quīntus": "Quintus, the son",
        "rīdent": "(they) laugh",
        "canēs": "dogs (nom. pl.)",
        "ubīque": "everywhere",
        "sunt": "(they) are; there are",
        "albī": "white ones (m. nom. pl. — describing the dogs)",
        "rūfī": "red ones (m. nom. pl.)",
        "flāvī": "golden-yellow ones (m. nom. pl.)",
        "subitō": "suddenly",
        "procul": "far off, in the distance",
        "lātrat": "barks",
        "vōx": "the voice (nom.)",
        "clāra": "clear; famous (f. nom. — with «vōx»: clear; with «Rōma»: famous)",
        "ferōx": "Ferox, the family dog",
        "vōcem": "voice (acc.)",
        "bene": "well",
        "sciō": "I know",
        "clāmat": "shouts",
        "paulla": "Paulla, the daughter",
        "ad": "to, toward (+ acc.)",
        "nāvem": "ship (acc.)",
        "magnam": "big (acc. f. — agreeing with «nāvem»)",
        "properat": "hurries",
        "et": "and",
        "ibi": "there",
        "canem": "the dog (acc.)",
        "invenit": "finds",
        "in": "in, on (+ abl.)",
        "mediā": "the middle of (abl. f. — agreeing with «nāve»)",
        "nāve": "the ship (abl. after «in»)",
        "sedet": "sits",
        "caudam": "tail (acc.)",
        "albam": "white (acc. f. — agreeing with «caudam»)",
        "movet": "moves, wags",
        "etiam": "also, besides",
        "vir": "a man (nom.)",
        "validus": "strong (m. nom. — agreeing with «vir»)",
        "stat": "stands",
        "titus": "Titus, Livia's brother, a ship's captain",
        "avunculus": "uncle (your mother's brother)",
        "salvēte": "hello! (to more than one person)",
        "inquit": "says (used with quoted speech)",
        "nōn": "not",
        "perditus": "lost (m. nom.)",
        "māne": "early this morning",
        "errat": "wanders (Latin tells the morning's events in the present tense)",
        "iam": "now, already",
        "botulōs": "sausages (acc. pl.)",
        "nautārum": "of the sailors (gen. pl.)",
        "dēvorat": "devours, gobbles up",
        "vērus": "a true, real (m. nom.)",
        "pīrāta": "pirate (nom. — a 1st-declension noun that is masculine, like «nauta»)",
        "laeta": "happy (f. nom. — agreeing with «Paulla»)",
        "tenet": "holds",
        "nēmō": "no one",
        "lacrimat": "weeps, cries",
        "deinde": "then",
        "fābulās": "stories (acc. pl.)",
        "dē": "about (+ abl.)",
        "urbe": "the city (abl. after «dē»)",
        "rōmā": "Rome (abl. — «urbs Rōma», the city of Rome)",
        "nārrat": "tells",
        "rōma": "Rome (nom.)",
        "forma": "the look, the beauty (nom.)",
        "urbis": "of the city (gen.)",
        "pulchra": "beautiful (f. nom. — agreeing with «forma»)",
        "viae": "the streets (nom. pl.)",
        "lātae": "wide (f. nom. pl. — agreeing with «viae»)",
        "templa": "the temples (nom. pl., neuter)",
        "alba": "white (nom. pl. neuter — agreeing with «templa»)",
        "spectāmusne": "are we going to see…? («spectāmus» ‘we see’ + «-ne»; the present here points at the near future)",
        "nōs": "we",
        "quoque": "too, also",
        "urbem": "the city (acc.)",
        "clāram": "famous (acc. f. — agreeing with «urbem»)",
        "ita": "yes",
        "mārcus": "Marcus, the father",
        "mox": "soon",
        "tōta": "the whole (f. nom. — agreeing with «familia»)",
        "cum": "with (+ abl.)",
        "cane": "the dog (abl. after «cum»)",
        "nigrō": "black (abl. m. — agreeing with «cane»)",
        "nāvigat": "sails, is sailing (present for the near future)"
      },
      translation: [
        "The harbor of Ostia is full: long ships, strong sailors, sacks, amphorae. The family walks through the crowd. «Is there a black dog here?» asks Quintus. The sailors laugh: «There are dogs everywhere here — white ones, red ones, golden ones!»",
        "Suddenly a dog barks in the distance: the voice is clear. «That is Ferox barking! I know that dog's voice well!» shouts Paulla. The family hurries to a big ship — and there it finds the dog! In the middle of the ship sits Ferox, wagging his white tail.",
        "On the ship there also stands a strong man: Uncle Titus! «Hello, everyone!» he says. «Ferox is not lost: early this morning he wandered over to the ship, and now he is devouring the sailors' sausages. He is a true pirate!» Paulla, overjoyed, holds the dog; now no one is crying.",
        "Then Titus tells stories about the city of Rome: «Rome is famous: the look of the city is beautiful, the streets are wide, the temples white.» «Are we going to see the famous city too?» asks Quintus. «Yes,» says Marcus. «Soon the whole family — black dog included — sails to the city!»"
      ],
      questions: [
        {
          q: "How does Paulla know Ferox is near before she can see him?",
          options: [
            "She spots his white tail above the crowd",
            "She recognizes his bark — she knows his voice well",
            "Titus waves to her from the ship",
            "She smells the sausages"
          ],
          answer: 1,
          explain: "«Subitō canis procul lātrat… Vōcem canis bene sciō!» — a dog barks in the distance, and Paulla knows that voice."
        },
        {
          q: "According to Titus, what has the ‘true pirate’ been doing on board?",
          options: [
            "Guarding the grain sacks",
            "Sleeping inside an amphora",
            "Devouring the sailors' sausages",
            "Chasing the harbor cats"
          ],
          answer: 2,
          explain: "«iam botulōs nautārum dēvorat. Vērus pīrāta est!» — he is gobbling up the sailors' sausages. Classic Ferox."
        },
        {
          q: "In «cum cane nigrō», what does the ending of «nigrō» tell you?",
          options: [
            "It is ablative, agreeing with «cane» after «cum»",
            "It is dative — someone is giving the dog something",
            "It shows the dog is the subject of the sentence",
            "It is nominative plural"
          ],
          answer: 0,
          explain: "«cum» takes the ablative: «cane» is ablative singular of «canis», and «nigrō» is the matching masculine ablative singular. Different letters (-e and -ō), same case — that is agreement."
        },
        {
          q: "How does the day end for the family?",
          options: [
            "The whole family — dog included — will soon sail to Rome",
            "They sell Ferox to the sailors as a ship's dog",
            "Titus sails away to Rome alone",
            "They decide never to visit the harbor again"
          ],
          answer: 0,
          explain: "«Mox tōta familia cum cane nigrō ad urbem nāvigat!» — soon the whole family, black dog and all, sails to the city. Stage II, here we come."
        }
      ]
    }
  ],

  quiz: [
    {
      prompt: "Which phrase is correct Latin for ‘the black dog’ as the subject of a sentence?",
      options: ["canis nigrum", "canem niger", "canis niger", "canī nigrō"],
      answer: 2,
      explain: "A subject is nominative: «canis» (nom. sg. m.) needs the masculine nominative singular «niger». The other options mix cases that don't agree."
    },
    {
      prompt: "In «Familia nāvem magnam videt», why does the adjective end in -am while its noun ends in -em?",
      options: [
        "The adjective is a mistake for «magnem»",
        "Agreement means same case, number, and gender — not identical letters",
        "«magnam» actually agrees with «familia»",
        "«nāvem» is genitive"
      ],
      answer: 1,
      explain: "«nāvem» is a 3rd-declension accusative (-em); the 1st/2nd-declension adjective shows the same case with its own ending, -am. If it agreed with «familia» (nominative) it would be «magna»."
    },
    {
      prompt: "Which adjective correctly completes «Līvia in viā ______ ambulat» (Livia walks in the wide street)?",
      options: ["lātus", "lātam", "lātā", "lātīs"],
      answer: 2,
      explain: "«in viā» is ablative singular feminine, so the adjective must be «lātā». «lātam» would be accusative, «lātīs» plural, «lātus» masculine."
    },
    {
      prompt: "In «Multī in forō stant», what does «multī» mean?",
      options: ["much", "many things", "many people", "the crowd's"],
      answer: 2,
      explain: "A masculine plural adjective standing alone is a substantive meaning people: «multī» = ‘many (men/people)’. ‘Many things’ would be the neuter «multa»."
    },
    {
      prompt: "«Cauda canis alba est.» Which word is the subject?",
      options: ["cauda", "canis", "alba", "est"],
      answer: 0,
      explain: "«alba» is feminine nominative and agrees with «cauda», so «cauda» is the subject; «canis» here is genitive — ‘the dog's tail is white’. With 3rd-declension nouns, let the adjective's agreement guide you."
    },
    {
      prompt: "In «Titus puerīs fābulās nārrat», who or what is in the dative case?",
      options: [
        "Titus — the storyteller",
        "puerīs — the boys, to whom he tells the stories",
        "fābulās — the stories",
        "nothing; there is no dative here"
      ],
      answer: 1,
      explain: "«puerīs» has the dative plural ending -īs: Titus tells the stories to the boys. «fābulās» (-ās) is the accusative object; «Titus» is the nominative subject."
    },
    {
      prompt: "Which phrase means ‘with the unhappy sailor’?",
      options: ["cum nautā miserō", "cum nautam miserum", "sine nautā miserō", "ad nautam miserum"],
      answer: 0,
      explain: "«cum» takes the ablative: «nautā». And since «nauta» is masculine despite its 1st-declension looks, the adjective is masculine ablative «miserō». «sine» means without, and «ad» means to."
    },
    {
      prompt: "«Spectātisne portum?» Who would be doing the looking?",
      options: ["I alone", "you (more than one person)", "we", "they"],
      answer: 1,
      explain: "The ending -tis is second person plural — ‘you all’. The attached «-ne» just turns the sentence into a yes/no question: ‘Are you (all) looking at the harbor?’"
    }
  ]
});
