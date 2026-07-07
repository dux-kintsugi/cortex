registerUnit({
  id: 4,
  stage: 1,
  title: "Ad Macellum",
  tagline: "The accusative case: direct objects at the market",

  grammar: [
    {
      heading: "Who's doing what to whom",
      body: "<p>Until now, nearly every noun you've met has been a subject — the one doing the action or being described. (The odd exception: a noun after <span class=\"la\">est</span> that completes the thought, as in <span class=\"la\">Līvia māter est</span> — Livia <em>is a mother</em>.) This unit adds the other half of the sentence: the <strong>direct object</strong>, the thing the action lands on. Latin doesn't mark the object with word order, the way English does; it changes the noun's <strong>ending</strong>.</p><p>Watch: <span class=\"la\">ūva</span> is a grape sitting there being a subject. The moment somebody buys it, sees it, or (this being Ostia) devours it, it becomes <span class=\"la\">ūvam</span>: <span class=\"la\">Līvia ūvam emit</span> — Livia buys the grape. Same trick in the 2nd declension: <span class=\"la\">botulus</span> becomes <span class=\"la\">botulum</span> — <span class=\"la\">Mercātor botulum vēndit</span>, the merchant sells the sausage.</p><p>These forms are called <strong>cases</strong> — a case is a costume a noun wears to show its job in the sentence: same noun, different ending, different job. The subject form is called the <strong>nominative</strong>; this new object form is the <strong>accusative</strong>. One wrinkle: neuter nouns like <span class=\"la\">ōvum</span> are lazy — their nominative and accusative are identical.</p>",
      table: {
        caption: "Accusative singular (1st & 2nd declension)",
        headers: ["Declension", "Nominative (doer)", "Accusative (done-to)"],
        rows: [
          ["1st (fem.)", "ūva", "ūvam"],
          ["2nd (masc.)", "botulus", "botulum"],
          ["2nd (neut.)", "ōvum", "ōvum"]
        ]
      },
      tip: "Reading tip: the instant you see ‑am, or an ‑um noun that isn't the subject, tag it ‘receiving the action’ and read on — the verb that explains what happened to it is usually waiting at the end."
    },
    {
      heading: "Shopping in the plural",
      body: "<p>Markets deal in plurals — nobody buys one olive. In the plural the accusative is just as recognizable: 1st-declension <span class=\"la\">‑ae</span> becomes <span class=\"la\">‑ās</span>, and 2nd-declension <span class=\"la\">‑ī</span> becomes <span class=\"la\">‑ōs</span>.</p><p><span class=\"la\">Mercātor botulōs vēndit</span> — the merchant sells sausages. <span class=\"la\">Paulla ūvās spectat</span> — Paulla eyes the grapes. Long <span class=\"la\">‑ās</span> and long <span class=\"la\">‑ōs</span> are the two loudest object-signals in this unit.</p><p>Neuters stay lazy: <span class=\"la\">ōva</span> is both ‘eggs’ doing something and ‘eggs’ having something done to them. When you meet <span class=\"la\">Līvia ōva emit</span>, ask who is doing the buying — Livia, clearly — and the eggs settle into the object slot by themselves.</p>",
      table: {
        caption: "Accusative plural (1st & 2nd declension)",
        headers: ["Declension", "Nominative", "Accusative"],
        rows: [
          ["1st (fem.)", "ūvae", "ūvās"],
          ["2nd (masc.)", "botulī", "botulōs"],
          ["2nd (neut.)", "ōva", "ōva"]
        ]
      },
      tip: "Reading tip: ‑ās and ‑ōs never mark a subject. Spot one, and you already know half of the sentence's plot."
    },
    {
      heading: "Word order is a suggestion",
      body: "<p>English says <em>the dog steals the sausage</em>, and if you flip the words, the sausage turns thief. Latin is free of this anxiety: the endings carry the roles, so the words can move. <span class=\"la\">Ferōx botulum rapit</span>, <span class=\"la\">botulum Ferōx rapit</span>, <span class=\"la\">botulum rapit Ferōx</span> — three word orders, one crime.</p><p>Latin does have a favorite arrangement: subject first, object in the middle, <strong>verb last</strong>. So train your eye to hold the nouns in memory, sorted by ending, until the verb arrives to tie the scene together.</p><p>One extra helper: a describing word wears the same ending as its noun. In <span class=\"la\">botulum magnum rapit</span>, the matching <span class=\"la\">‑um</span> tells you <em>big</em> belongs to <em>sausage</em> — one big sausage, snatched.</p>",
      tip: "Reading tip: don't translate word-by-word as you go. Collect the endings first, then let the final verb tell you what happened."
    },
    {
      heading: "mālum, malum — the macron matters",
      body: "<p>Two of this unit's words are near-twins: <span class=\"la\">mālum</span> with a long ā is an <em>apple</em>; <span class=\"la\">malus, mala, malum</span> with a short a means <em>bad, wicked</em>. The macron is not decoration — it is part of the word's identity, and Romans heard the difference clearly.</p><p>Both star in this unit's story: Paulla wants a <span class=\"la\">mālum</span>, and Ferox is — briefly, and in one merchant's furious opinion — a <span class=\"la\">canis malus</span>. Roman jokers loved this pair; you are now equipped to groan at their puns.</p>",
      tip: "Reading tip: when a familiar word seems wildly wrong in context, check the macrons — Latin has several of these near-twin pairs."
    }
  ],

  vocab: [
    {
      latin: "macellum",
      forms: "gen. macellī, n.",
      pos: "noun (2nd decl.)",
      gloss: "food market",
      example: "Macellum magnum et plēnum est.",
      exampleGloss: "The food market is big and full."
    },
    {
      latin: "taberna",
      forms: "gen. tabernae, f.",
      pos: "noun (1st decl.)",
      gloss: "shop, stall",
      example: "Taberna ōva et cāseum habet.",
      exampleGloss: "The stall has eggs and cheese."
    },
    {
      latin: "pecūnia",
      forms: "gen. pecūniae, f.",
      pos: "noun (1st decl.)",
      gloss: "money",
      example: "Līvia pecūniam portat.",
      exampleGloss: "Livia carries the money."
    },
    {
      latin: "dēnārius",
      forms: "gen. dēnāriī, m.",
      pos: "noun (2nd decl.)",
      gloss: "denarius (silver coin)",
      example: "Mercātor dēnāriōs amat.",
      exampleGloss: "The merchant loves denarii."
    },
    {
      latin: "mercātor",
      forms: "gen. mercātōris, m.",
      pos: "noun (3rd decl.)",
      gloss: "merchant",
      example: "Mercātor ūvās vēndit.",
      exampleGloss: "The merchant sells grapes."
    },
    {
      latin: "ūva",
      forms: "gen. ūvae, f.",
      pos: "noun (1st decl.)",
      gloss: "grape",
      example: "Paulla ūvās dēvorat.",
      exampleGloss: "Paulla devours the grapes."
    },
    {
      latin: "mālum",
      forms: "gen. mālī, n.",
      pos: "noun (2nd decl.)",
      gloss: "apple",
      example: "Puella mālum tenet.",
      exampleGloss: "The girl holds an apple."
    },
    {
      latin: "ōvum",
      forms: "gen. ōvī, n.",
      pos: "noun (2nd decl.)",
      gloss: "egg",
      example: "Līvia ōva emit.",
      exampleGloss: "Livia buys eggs."
    },
    {
      latin: "botulus",
      forms: "gen. botulī, m.",
      pos: "noun (2nd decl.)",
      gloss: "sausage",
      example: "Ferōx botulum spectat.",
      exampleGloss: "Ferox is eyeing the sausage."
    },
    {
      latin: "cāseus",
      forms: "gen. cāseī, m.",
      pos: "noun (2nd decl.)",
      gloss: "cheese",
      example: "Cāseus nōn cārus est.",
      exampleGloss: "The cheese is not expensive."
    },
    {
      latin: "vīnum",
      forms: "gen. vīnī, n.",
      pos: "noun (2nd decl.)",
      gloss: "wine",
      example: "Mārcus vīnum amat.",
      exampleGloss: "Marcus loves wine."
    },
    {
      latin: "oleum",
      forms: "gen. oleī, n.",
      pos: "noun (2nd decl.)",
      gloss: "olive oil",
      example: "Asinus oleum portat.",
      exampleGloss: "The donkey carries the olive oil."
    },
    {
      latin: "olīva",
      forms: "gen. olīvae, f.",
      pos: "noun (1st decl.)",
      gloss: "olive",
      example: "Mercātor olīvās quoque vēndit.",
      exampleGloss: "The merchant sells olives too."
    },
    {
      latin: "asinus",
      forms: "gen. asinī, m.",
      pos: "noun (2nd decl.)",
      gloss: "donkey",
      example: "Asinus fessus dormit.",
      exampleGloss: "The tired donkey is sleeping."
    },
    {
      latin: "emō",
      forms: "emere, ēmī, ēmptum",
      pos: "verb (3rd conj.)",
      gloss: "buy",
      example: "Fēmina cāseum emit.",
      exampleGloss: "The woman buys cheese."
    },
    {
      latin: "vēndō",
      forms: "vēndere, vēndidī, vēnditum",
      pos: "verb (3rd conj.)",
      gloss: "sell",
      example: "Mercātor botulōs vēndit.",
      exampleGloss: "The merchant sells sausages."
    },
    {
      latin: "clāmō",
      forms: "clāmāre, clāmāvī, clāmātum",
      pos: "verb (1st conj.)",
      gloss: "shout",
      example: "Mercātor clāmat: «Ūvās! Olīvās!»",
      exampleGloss: "The merchant shouts: «Grapes! Olives!»"
    },
    {
      latin: "rapiō",
      forms: "rapere, rapuī, raptum",
      pos: "verb (3rd conj. ‑iō)",
      gloss: "snatch, steal",
      example: "Canis botulum rapit.",
      exampleGloss: "The dog snatches the sausage."
    },
    {
      latin: "dēvorō",
      forms: "dēvorāre, dēvorāvī, dēvorātum",
      pos: "verb (1st conj.)",
      gloss: "devour, gulp down",
      example: "Ferōx cibum dēvorat.",
      exampleGloss: "Ferox devours the food."
    },
    {
      latin: "rīdeō",
      forms: "rīdēre, rīsī, rīsum",
      pos: "verb (2nd conj.)",
      gloss: "laugh",
      example: "Paulla laeta rīdet.",
      exampleGloss: "Paulla laughs happily."
    },
    {
      latin: "optō",
      forms: "optāre, optāvī, optātum",
      pos: "verb (1st conj.)",
      gloss: "wish for",
      example: "Puella māla optat.",
      exampleGloss: "The girl wishes for apples."
    },
    {
      latin: "malus",
      forms: "‑a, ‑um",
      pos: "adjective",
      gloss: "bad, wicked",
      example: "Canis malus cibum rapit.",
      exampleGloss: "The bad dog snatches the food."
    },
    {
      latin: "cārus",
      forms: "‑a, ‑um",
      pos: "adjective",
      gloss: "dear, expensive",
      example: "Vīnum cārum est.",
      exampleGloss: "The wine is expensive."
    },
    {
      latin: "tamen",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "nevertheless, still",
      example: "Māla cāra sunt; Līvia tamen māla emit.",
      exampleGloss: "The apples are expensive; nevertheless Livia buys the apples."
    },
    {
      latin: "subitō",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "suddenly",
      example: "Subitō canis botulum rapit.",
      exampleGloss: "Suddenly the dog snatches the sausage."
    }
  ],

  readings: [
    {
      title: "Ad macellum",
      intro: "Livia and Paulla head to the market with the shopping money — and Ferox, uninvited, with an appetite.",
      paragraphs: [
        "Līvia et Paulla ad macellum ambulant. Ferōx quoque ambulat: canis cibum semper amat. Macellum est magnum et plēnum; multae sunt tabernae, multī virī fēminaeque.",
        "Ecce taberna! Semprōnius mercātor botulōs cāseōsque vēndit. «Botulōs! Cāseōs!» clāmat. Ferōx botulōs spectat et botulōs amat. Canis nōn ambulat: sedet et spectat.",
        "Līvia ōva et cāseum emit. Paulla ūvās mālaque spectat. Māla optat, sed māla cāra sunt. Līvia tamen māla emit, quod Paullam amat. Paulla laeta est et rīdet."
      ],
      glosses: {
        "līvia": "Livia (the mother)",
        "et": "and",
        "paulla": "Paulla (the daughter, eight years old)",
        "ad": "to, toward (read «ad macellum» as one chunk: to the market)",
        "macellum": "the food market",
        "ambulant": "(they) walk",
        "ferōx": "Ferox, the family dog",
        "quoque": "also, too",
        "ambulat": "(he) walks",
        "canis": "the dog (nom. = nominative, the subject form)",
        "cibum": "food (acc. = accusative, the direct-object form — object of «amat»)",
        "semper": "always",
        "amat": "(he/she) loves",
        "est": "is",
        "magnum": "big",
        "plēnum": "full, crowded",
        "multae": "many (with «tabernae»)",
        "sunt": "(there) are",
        "tabernae": "stalls, shops (nom. pl.)",
        "multī": "many (with «virī»)",
        "virī": "men (nom. pl.)",
        "fēminaeque": "and women",
        "ecce": "look! behold!",
        "taberna": "a stall (nom.)",
        "semprōnius": "Sempronius, a sausage-seller",
        "mercātor": "merchant (nom. — another name for the same person: Sempronius the merchant)",
        "botulōs": "sausages (acc. pl. — object)",
        "cāseōsque": "and cheeses (acc. pl.)",
        "vēndit": "(he) sells",
        "cāseōs": "cheeses (acc. pl.)",
        "clāmat": "(he) shouts",
        "spectat": "(he/she) looks at, watches",
        "nōn": "not",
        "sedet": "(he) sits",
        "ōva": "eggs (acc. pl., neuter — object of «emit»)",
        "cāseum": "cheese (acc. sg.)",
        "emit": "(she) buys",
        "ūvās": "grapes (acc. pl. — object)",
        "mālaque": "and apples (acc. pl., neuter)",
        "māla": "apples (neuter pl. — long ā: fruit!)",
        "optat": "(she) wishes for",
        "sed": "but",
        "cāra": "expensive (with «māla»)",
        "tamen": "nevertheless, anyway",
        "quod": "because",
        "paullam": "Paulla (acc. — the one being loved)",
        "laeta": "happy",
        "rīdet": "(she) laughs"
      },
      translation: [
        "Livia and Paulla walk to the food market. Ferox walks along too: the dog always loves food. The market is big and full; there are many stalls, many men and women.",
        "Look — a stall! Sempronius the merchant sells sausages and cheeses. «Sausages! Cheeses!» he shouts. Ferox watches the sausages, and the sausages he loves. The dog is not walking anywhere: he sits, and he watches.",
        "Livia buys eggs and cheese. Paulla eyes the grapes and the apples. She wishes for apples, but the apples are expensive. Livia buys the apples anyway, because she loves Paulla. Paulla is happy and laughs."
      ],
      questions: [
        {
          q: "Why does Ferox tag along to the market?",
          options: [
            "He always loves food",
            "He is guarding Paulla",
            "Livia calls him",
            "He is afraid to stay home alone"
          ],
          answer: 0,
          explain: "«canis cibum semper amat» — the dog always loves food. Ferox has his priorities in order."
        },
        {
          q: "What does Sempronius sell at his stall?",
          options: [
            "Grapes and olives",
            "Eggs and wine",
            "Sausages and cheeses",
            "Apples and olive oil"
          ],
          answer: 2,
          explain: "«botulōs cāseōsque vēndit» — sausages and cheeses, both wearing the accusative ‑ōs, with the little ‑que gluing on the ‘and’."
        },
        {
          q: "In «quod Paullam amat», what does the ‑am ending on «Paullam» tell you?",
          options: [
            "Paulla is doing the loving",
            "Paulla is the one being loved",
            "There is more than one Paulla",
            "Paulla is being spoken to directly"
          ],
          answer: 1,
          explain: "‑am is the accusative singular ending: Paulla is the object. Livia does the loving; Paulla receives it."
        },
        {
          q: "Why does Livia buy the apples even though they are expensive?",
          options: [
            "Sempronius lowers the price",
            "Because she loves Paulla",
            "Because Marcus asked for them",
            "She doesn't actually buy them"
          ],
          answer: 1,
          explain: "«Līvia tamen māla emit, quod Paullam amat» — she buys them anyway, because she loves Paulla."
        }
      ]
    },
    {
      title: "Canis malus",
      intro: "Back at the sausage stall, Ferox commits the crime of the season — and a small donkey saves the day.",
      paragraphs: [
        "Semprōnius botulōs habet: botulī magnī sunt, et nōn cārī. Līvia botulum optat, quod Mārcus botulōs amat. Fēmina pecūniam parat: dēnāriōs tenet.",
        "Ferōx quoque botulōs spectat. Canis nōn dormit — canis labōrat! Subitō Ferōx botulum magnum rapit et botulum dēvorat. Iam botulus nōn est! «Malus canis!» clāmat Semprōnius. «Canis malus botulum rapit!»",
        "Līvia īrāta est. «Ferōx! Canis malus!» clāmat. Fēmina tamen dēnāriōs parat et botulum emit. Semprōnius iam nōn īrātus est: mercātor rīdet, quod pecūniam habet.",
        "Deinde Paulla asinum videt. Asinus parvus oleum et vīnum portat; asinus fessus est. Paulla asinum amat et mālum tenet: asinus mālum dēvorat. Paulla rīdet, Līvia quoque rīdet. Ferōx nōn rīdet: canis plēnus est et iam dormit. Fēminae laetae domum ambulant."
      ],
      glosses: {
        "semprōnius": "Sempronius, the sausage-seller",
        "botulōs": "sausages (acc. pl. — object)",
        "habet": "(he) has",
        "botulī": "the sausages (nom. pl. — subject)",
        "magnī": "big (with «botulī»)",
        "sunt": "are",
        "et": "and",
        "nōn": "not",
        "cārī": "expensive (with «botulī»)",
        "līvia": "Livia (the mother)",
        "botulum": "a sausage (acc. sg. — object)",
        "optat": "(she) wishes for, wants",
        "quod": "because",
        "mārcus": "Marcus (the father, a merchant himself)",
        "amat": "(he/she) loves",
        "fēmina": "the woman (nom.)",
        "pecūniam": "money (acc. — object of «parat»)",
        "parat": "(she) gets ready, prepares",
        "dēnāriōs": "denarii, silver coins (acc. pl.)",
        "tenet": "(she) holds",
        "ferōx": "Ferox, the dog",
        "quoque": "also, too",
        "spectat": "(he) watches",
        "canis": "the dog (nom. — subject)",
        "dormit": "(he) sleeps",
        "labōrat": "(he) works, is on the job",
        "subitō": "suddenly",
        "magnum": "big (acc. — matching «botulum»)",
        "rapit": "(he) snatches, steals",
        "dēvorat": "(he) devours, gulps down",
        "iam": "now, already",
        "botulus": "the sausage (nom.)",
        "est": "is",
        "malus": "bad, wicked (with «canis» — short a!)",
        "clāmat": "(he/she) shouts",
        "īrāta": "angry (describing Livia)",
        "tamen": "nevertheless, all the same",
        "emit": "(she) buys",
        "īrātus": "angry (describing Sempronius)",
        "mercātor": "the merchant (nom.)",
        "rīdet": "(he/she) laughs",
        "deinde": "then, next",
        "paulla": "Paulla (the daughter)",
        "asinum": "the donkey (acc. — object)",
        "videt": "(she) sees",
        "asinus": "the donkey (nom. — subject)",
        "parvus": "small, little",
        "oleum": "olive oil (acc.)",
        "vīnum": "wine (acc.)",
        "portat": "(he) carries",
        "fessus": "tired",
        "mālum": "an apple (acc. — long ā: the fruit, not the wickedness)",
        "plēnus": "full",
        "fēminae": "the women (nom. pl.)",
        "laetae": "happy (with «fēminae»)",
        "domum": "home, homeward (a direction word — no preposition needed)",
        "ambulant": "(they) walk"
      },
      translation: [
        "Sempronius has sausages: the sausages are big, and not expensive. Livia wants a sausage, because Marcus loves sausages. The woman gets her money ready: she is holding the denarii.",
        "Ferox is watching the sausages too. The dog is not asleep — the dog is on the job! Suddenly Ferox snatches a big sausage and devours it. Now there is no sausage! «Bad dog!» shouts Sempronius. «The wicked dog is stealing a sausage!»",
        "Livia is furious. «Ferox! Bad dog!» she shouts. All the same, the woman gets out her denarii and buys the sausage. Sempronius is no longer angry: the merchant laughs, because he has his money.",
        "Then Paulla sees a donkey. The little donkey is carrying oil and wine; the donkey is tired. Paulla loves the donkey and holds out an apple: the donkey devours the apple. Paulla laughs, and Livia laughs too. Ferox is not laughing: the dog is full and already asleep. The happy women walk home."
      ],
      questions: [
        {
          q: "What does Ferox do the moment he snatches the sausage?",
          options: [
            "Runs home with it",
            "Buries it behind a stall",
            "Devours it on the spot",
            "Gives it to Paulla"
          ],
          answer: 2,
          explain: "«botulum dēvorat. Iam botulus nōn est!» — he devours it; the sausage instantly ceases to exist."
        },
        {
          q: "In «Subitō Ferōx botulum magnum rapit», which words are accusative — the thing snatched?",
          options: [
            "Subitō Ferōx",
            "Ferōx botulum",
            "botulum magnum",
            "magnum rapit"
          ],
          answer: 2,
          explain: "«botulum magnum» — noun and adjective both wear ‑um; the matching endings show that ‘big’ belongs to ‘sausage’."
        },
        {
          q: "Why does Sempronius end up laughing?",
          options: [
            "Ferox performs a trick",
            "Livia pays for the stolen sausage",
            "The donkey brays at him",
            "He was never really angry"
          ],
          answer: 1,
          explain: "«fēmina tamen dēnāriōs parat et botulum emit … mercātor rīdet, quod pecūniam habet» — a sale is a sale, even when the customer is a dog."
        },
        {
          q: "What is the little donkey carrying?",
          options: [
            "Oil and wine",
            "Grapes and apples",
            "Eggs and cheese",
            "Sausages"
          ],
          answer: 0,
          explain: "«asinus parvus oleum et vīnum portat» — oil and wine, both accusative objects of «portat»."
        }
      ]
    }
  ],

  quiz: [
    {
      prompt: "In «Puella ūvam tenet», which word is the direct object?",
      options: ["Puella", "ūvam", "tenet", "There is no object"],
      answer: 1,
      explain: "«ūvam» ends in ‑am — accusative singular, the direct-object case. The grape is what is being held."
    },
    {
      prompt: "Which form is the accusative plural of «botulus»?",
      options: ["botulī", "botulōs", "botulum", "botulae"],
      answer: 1,
      explain: "2nd-declension nominative plural ‑ī switches to ‑ōs for the object case. «botulae» isn't a form of this word at all."
    },
    {
      prompt: "«Botulum Ferōx rapit.» Who snatches what?",
      options: [
        "The sausage snatches Ferox",
        "Ferox snatches the sausage",
        "Ferox and the sausage both act",
        "Impossible to tell from this order"
      ],
      answer: 1,
      explain: "The order is scrambled but the endings don't lie: «Ferōx» is nominative (the doer), «botulum» is accusative (the done-to)."
    },
    {
      prompt: "In «Līvia ōva emit», is «ōva» subject or object — and how can you tell?",
      options: [
        "Subject — it could come first",
        "Object — «Līvia» is the subject, and «emit» needs something bought",
        "Subject — neuter nouns are always subjects",
        "Object — every word after the first is an object"
      ],
      answer: 1,
      explain: "Neuter ‑a looks the same in both cases, so context decides: Livia is doing the buying, so the eggs are being bought."
    },
    {
      prompt: "What is the difference between «mālum» and «malum»?",
      options: [
        "Nothing — two spellings of one word",
        "«mālum» (long ā) is ‘apple’; «malum» is ‘bad’",
        "«mālum» is ‘bad’; «malum» is ‘apple’",
        "«mālum» is simply the plural of «malum»"
      ],
      answer: 1,
      explain: "The macron is part of the word. Long ā: the fruit. Short a: wickedness. Ferox supplies the malum, the market the mālum."
    },
    {
      prompt: "«Mercātor olīvās vēndit» means:",
      options: [
        "The olives sell the merchant",
        "The merchant sells olives",
        "The merchants sell an olive",
        "The merchant buys olives"
      ],
      answer: 1,
      explain: "«mercātor» is nominative singular (the seller); «olīvās», with ‑ās, is accusative plural (what's sold); «vēndit» means sells — buying would be «emit»."
    },
    {
      prompt: "You meet «asinōs» in a sentence. Before reading further, what should you expect?",
      options: [
        "One donkey doing something",
        "Several donkeys with something being done to them",
        "The donkey's owner",
        "A donkey being spoken to"
      ],
      answer: 1,
      explain: "‑ōs is the accusative plural: more than one donkey, on the receiving end of whatever verb is coming."
    },
    {
      prompt: "In «Līvia et Paulla macellum amant», why does the verb end in ‑nt?",
      options: [
        "Because «macellum» is neuter",
        "Because the subject — Livia and Paulla together — is plural",
        "Because the sentence is a question",
        "Because the object comes right before the verb"
      ],
      answer: 1,
      explain: "‑t for one doer, ‑nt for more than one: two shoppers, one plural verb. «macellum», with its ‑um, is just the object."
    }
  ]
});
