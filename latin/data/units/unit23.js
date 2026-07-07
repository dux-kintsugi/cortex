registerUnit({
  id: 23,
  stage: 3,
  title: "Nāve Āmissā",
  tagline: "Participles and the ablative absolute — whole clauses folded into single words",

  grammar: [
    {
      heading: "«Flēns»: the present participle — a verb in adjective's clothing",
      body: "<p>English does it constantly: <em>the weeping mother</em>, <em>sailors arriving from other lands</em>. Latin builds this from the verb stem plus <span class=\"la\">‑ns</span>: <span class=\"la\">flēns</span> — weeping; <span class=\"la\">vigilāns</span> — keeping watch. Outside the nominative the stem shows <span class=\"la\">‑nt‑</span>: <span class=\"la\">flentem, flentis, flentēs</span>. It declines like the 3rd-declension adjectives of unit 17 (think <span class=\"la\">ingēns, ingentis</span>).</p><p>A participle is an adjective made out of a verb, so it <strong>agrees</strong> with a noun — and that noun is the one doing the action: <span class=\"la\">Līvia flēns sedēbat</span> — Livia sat <em>weeping</em>; <span class=\"la\">nautae ex aliīs terrīs venientēs</span> — sailors <em>arriving</em> from other lands. The action runs at the same time as the main verb: while she sat, she wept.</p>",
      table: {
        caption: "Present participles, conjugation by conjugation",
        headers: ["Verb", "Participle (nom., gen.)", "Meaning"],
        rows: [
          ["fleō", "flēns, flentis", "weeping"],
          ["vigilō", "vigilāns, vigilantis", "keeping watch"],
          ["dīcō", "dīcēns, dīcentis", "saying"],
          ["capiō", "capiēns, capientis", "taking"],
          ["veniō", "veniēns, venientis", "coming"]
        ]
      },
      tip: "See ‑ns or ‑nt‑ on a verb stem? Find the noun it agrees with and read ‘…-ing’: «puer vigilāns» — the boy keeping watch."
    },
    {
      heading: "The perfect participle steps out on its own",
      body: "<p>In unit 22 the perfect passive participle always carried <span class=\"la\">est</span> or <span class=\"la\">sunt</span> with it: <span class=\"la\">nāvis frācta est</span> — the ship was wrecked. Drop the <span class=\"la\">est</span> and the participle becomes a plain modifier: <span class=\"la\">nāvis frācta</span> — <em>the wrecked ship</em>; <span class=\"la\">virī ē marī servātī</span> — <em>the men saved from the sea</em>; <span class=\"la\">nūntius exspectātus</span> — <em>the long-awaited message</em>.</p><p>Hold on to two facts about it. It is <strong>passive</strong> — the noun had something done to it — and it is <strong>past</strong> — the deed is already over. English usually settles for a simple ‑ed word, but the full flavor is «having been …-ed»: <span class=\"la\">magister nāvis āmissae</span>, the captain of the ship <em>that was lost</em>.</p>",
      tip: "‑tus/‑ta/‑tum (or ‑sus) agreeing with a noun, no «est» in sight → read ‘…-ed’: «vōtum datum», the vow that was given."
    },
    {
      heading: "«Ventūrus»: the participle of things to come",
      body: "<p>The third and rarest snapshot: take the stem of the fourth principal part and add <span class=\"la\">‑ūrus, ‑ūra, ‑ūrum</span> — <em>about to, going to</em>. <span class=\"la\">nāvis ventūra</span> — a ship about to arrive. With <span class=\"la\">est</span> it makes a handy near-future: <span class=\"la\">Titus ventūrus est</span> — Titus is <em>going to</em> come. Recognition is all you need for now.</p><p>So every Latin verb can freeze its action in three snapshots — one before, one during, one after. Learn the trio as a chant: <span class=\"la\">portāns</span>, carrying; <span class=\"la\">portātus</span>, carried; <span class=\"la\">portātūrus</span>, about to carry.</p>",
      table: {
        caption: "The three participles side by side",
        headers: ["Time & voice", "Example", "Meaning"],
        rows: [
          ["present active", "portāns", "carrying"],
          ["perfect passive", "portātus", "(having been) carried"],
          ["future active", "portātūrus", "about to carry"]
        ]
      },
      tip: "‑ūrus = ‘about to’. «servātūrus» — about to save; «servātus» — saved. One vowel, a world of difference."
    },
    {
      heading: "The ablative absolute: «nāve āmissā»",
      body: "<p>Now for Latin's favorite scene-setting trick — and this unit's title. Take a noun and a participle, put <strong>both in the ablative</strong>, and park the pair at the edge of the sentence, usually fenced off by commas: <span class=\"la\">nāve āmissā, familia maesta erat</span> — <em>the ship having been lost</em>, the family was in mourning. The phrase is called <em>absolute</em> (from <span class=\"la\">absolūtus</span>, ‘untied’) because it hangs free: its noun plays no part in the main clause.</p><p>Translate it flexibly with <em>when, after, since, while</em>: <span class=\"la\">precibus factīs, familia discessit</span> — <em>after the prayers were made</em>, the family left; <span class=\"la\">aliīs dormientibus, Quīntus vigilābat</span> — <em>while the others slept</em>, Quintus kept watch. A perfect participle means the background deed is already done; a present participle means it is still going on.</p>",
      table: {
        caption: "Reading the ablative absolute",
        headers: ["Latin", "Literal", "Natural English"],
        rows: [
          ["nāve āmissā", "with the ship lost", "since the ship was lost"],
          ["precibus factīs", "with the prayers made", "after praying"],
          ["lacrimīs siccātīs", "with the tears dried", "once her tears were dried"],
          ["aliīs dormientibus", "with the others sleeping", "while the others slept"]
        ]
      },
      tip: "Two ablatives at the head of a sentence, one of them a participle, then a comma: read them as the backdrop, then start the main clause fresh."
    }
  ],

  vocab: [
    {
      latin: "spēs",
      forms: "speī, f.",
      pos: "noun (5th decl.)",
      gloss: "hope",
      example: "Spēs Quīntum numquam relinquit.",
      exampleGloss: "Hope never abandons Quintus."
    },
    {
      latin: "dolor",
      forms: "dolōris, m.",
      pos: "noun (3rd decl.)",
      gloss: "grief, pain",
      example: "Dolor mātris magnus erat.",
      exampleGloss: "The mother's grief was great."
    },
    {
      latin: "lacrima",
      forms: "lacrimae, f.",
      pos: "noun (1st decl.)",
      gloss: "tear",
      example: "Oculī Paullae lacrimīs plēnī sunt.",
      exampleGloss: "Paulla's eyes are full of tears."
    },
    {
      latin: "cūra",
      forms: "cūrae, f.",
      pos: "noun (1st decl.)",
      gloss: "care, worry",
      example: "Cūrae Mārcum per tōtam noctem tenent.",
      exampleGloss: "Worries grip Marcus all night long."
    },
    {
      latin: "silentium",
      forms: "silentiī, n.",
      pos: "noun (2nd decl.)",
      gloss: "silence",
      example: "Silentium tōtam domum tenēbat.",
      exampleGloss: "Silence held the whole house."
    },
    {
      latin: "fāma",
      forms: "fāmae, f.",
      pos: "noun (1st decl.)",
      gloss: "rumor, report; reputation",
      example: "Fāma incerta per oppidum errat.",
      exampleGloss: "An uncertain rumor drifts through the town."
    },
    {
      latin: "sōlācium",
      forms: "sōlāciī, n.",
      pos: "noun (2nd decl.)",
      gloss: "comfort, consolation",
      example: "Precēs mātrī sōlācium dant.",
      exampleGloss: "Prayers give the mother comfort."
    },
    {
      latin: "animus",
      forms: "animī, m.",
      pos: "noun (2nd decl.)",
      gloss: "mind, spirit, courage",
      example: "«Bonum animum habē!» inquit Quīntus.",
      exampleGloss: "«Keep your courage up!» says Quintus."
    },
    {
      latin: "precēs",
      forms: "precum, f. pl.",
      pos: "noun (3rd decl., plural)",
      gloss: "prayers",
      example: "Dī precēs Līviae audiunt.",
      exampleGloss: "The gods hear Livia's prayers."
    },
    {
      latin: "vōtum",
      forms: "vōtī, n.",
      pos: "noun (2nd decl.)",
      gloss: "vow",
      example: "Līvia in templō vōtum facit.",
      exampleGloss: "Livia makes a vow in the temple."
    },
    {
      latin: "sacrificium",
      forms: "sacrificiī, n.",
      pos: "noun (2nd decl.)",
      gloss: "sacrifice",
      example: "Māter deō sacrificium prōmittit.",
      exampleGloss: "The mother promises the god a sacrifice."
    },
    {
      latin: "pietās",
      forms: "pietātis, f.",
      pos: "noun (3rd decl.)",
      gloss: "devotion, duty, loyalty",
      example: "Magna est pietās fīliī bonī.",
      exampleGloss: "Great is the devotion of a good son."
    },
    {
      latin: "dēspērō",
      forms: "dēspērāre, dēspērāvī, dēspērātum",
      pos: "verb (1st conj.)",
      gloss: "despair, give up hope",
      example: "Quīntus numquam dēspērat.",
      exampleGloss: "Quintus never despairs."
    },
    {
      latin: "fleō",
      forms: "flēre, flēvī, flētum",
      pos: "verb (2nd conj.)",
      gloss: "weep",
      example: "Māter fīliaque diū flēbant.",
      exampleGloss: "Mother and daughter wept for a long time."
    },
    {
      latin: "taceō",
      forms: "tacēre, tacuī, tacitum",
      pos: "verb (2nd conj.)",
      gloss: "be silent",
      example: "Omnēs in ātriō tacēbant.",
      exampleGloss: "Everyone in the atrium was silent."
    },
    {
      latin: "vigilō",
      forms: "vigilāre, vigilāvī, vigilātum",
      pos: "verb (1st conj.)",
      gloss: "stay awake, keep watch",
      example: "Puer sōlus in portū vigilābat.",
      exampleGloss: "The boy kept watch alone in the harbor."
    },
    {
      latin: "cōnfirmō",
      forms: "cōnfirmāre, cōnfirmāvī, cōnfirmātum",
      pos: "verb (1st conj.)",
      gloss: "strengthen, encourage",
      example: "Quīntus mātrem maestam cōnfirmāre temptat.",
      exampleGloss: "Quintus tries to encourage his sorrowful mother."
    },
    {
      latin: "anxius",
      forms: "‑a, ‑um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "anxious",
      example: "Mārcus anxius nūntium exspectat.",
      exampleGloss: "Anxious, Marcus waits for news."
    },
    {
      latin: "trīstis",
      forms: "‑e",
      pos: "adjective (3rd decl.)",
      gloss: "sad",
      example: "Cūr tam trīstis es, Paulla?",
      exampleGloss: "Why are you so sad, Paulla?"
    },
    {
      latin: "maestus",
      forms: "‑a, ‑um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "sorrowful, mournful",
      example: "Familia maesta in ātriō sedet.",
      exampleGloss: "The mournful family sits in the atrium."
    },
    {
      latin: "incertus",
      forms: "‑a, ‑um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "uncertain",
      example: "Fāma incerta est: nēmō vērum scit.",
      exampleGloss: "The rumor is uncertain: no one knows the truth."
    },
    {
      latin: "certus",
      forms: "‑a, ‑um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "certain, sure",
      example: "Ūna rēs certa est: Titus gubernātor optimus est.",
      exampleGloss: "One thing is certain: Titus is the best helmsman."
    },
    {
      latin: "nūllus",
      forms: "‑a, ‑um (gen. nūllīus)",
      pos: "adjective (1st/2nd decl.)",
      gloss: "no, none",
      example: "Nūlla epistula ā Titō venit.",
      exampleGloss: "No letter comes from Titus."
    },
    {
      latin: "alius",
      forms: "alia, aliud",
      pos: "adjective (1st/2nd decl.)",
      gloss: "other, another",
      example: "Alius nauta aliud nārrat.",
      exampleGloss: "One sailor tells one story, another tells another."
    },
    {
      latin: "alter",
      forms: "altera, alterum",
      pos: "adjective (1st/2nd decl.)",
      gloss: "the other (of two)",
      example: "Alter nauta spērat, alter dēspērat.",
      exampleGloss: "One sailor hopes, the other despairs."
    }
  ],

  readings: [
    {
      title: "Domus Maesta",
      intro: "In the days after the shipwreck the house falls silent — and rumors, some dark, some hopeful, drift through Ostia.",
      paragraphs: [
        "Nāve Titī āmissā, tōta domus maesta erat. Ubīque silentium erat: nēmō cantābat, nēmō rīdēbat, etiam parva Paulla tacēbat. Līvia in cubiculō sedēbat, diū flēns; oculī eius lacrimīs plēnī erant. Etiam Ferōx maestus erat: botulōs nōn iam rapiēbat, sed ante portam iacēbat, viam oculīs trīstibus spectāns.",
        "Mārcus autem cotīdiē ad portum ībat et nautās ex aliīs terrīs venientēs interrogābat: «Vīdistisne nāvem frāctam? Vīdistisne virōs ē marī servātōs?» Sed nēmō certum respōnsum dare poterat, et fāma incerta per oppidum errābat. Alter nauta clāmābat: «Omnēs periērunt!»; alter respondēbat: «Minimē! Paucī in īnsulā parvā etiam nunc vīvunt.» Itaque animus Mārcī inter spem metumque iactābātur.",
        "Quīntus tamen nōn dēspērābat. «Nūlla nāvis», inquit, «gubernātōrem meliōrem habet. Avunculus noster vīvit et fortasse in īnsulā ignōtā auxilium exspectat.» Puer, tālia dīcēns, mātrem maestam cōnfirmāre temptābat. Nocte, aliīs dormientibus, sōlus vigilābat et, dē avunculō cōgitāns, stēllās clārās spectābat."
      ],
      glosses: {
        "nāve": "ship (abl. — first half of an ablative absolute)",
        "titī": "of Titus (gen.)",
        "āmissā": "lost; «nāve āmissā» = the ship having been lost, since the ship was lost (ablative absolute)",
        "tōta": "the whole",
        "domus": "house, household",
        "maesta": "mournful, sorrowful",
        "erat": "was",
        "ubīque": "everywhere",
        "silentium": "silence",
        "nēmō": "no one",
        "cantābat": "was singing",
        "rīdēbat": "was laughing",
        "etiam": "even; also",
        "parva": "little",
        "paulla": "Paulla, the daughter",
        "tacēbat": "was silent",
        "līvia": "Livia, the mother",
        "in": "in, on",
        "cubiculō": "bedroom (abl.)",
        "sedēbat": "was sitting",
        "diū": "for a long time",
        "flēns": "weeping (present participle — agrees with «Līvia»)",
        "oculī": "eyes (nom. pl.)",
        "eius": "her (lit. ‘of her’)",
        "lacrimīs": "with tears (abl. pl.)",
        "plēnī": "full",
        "erant": "were",
        "ferōx": "Ferox, the family dog",
        "maestus": "sorrowful, mournful",
        "botulōs": "sausages (acc. pl.)",
        "nōn": "not; «nōn iam» = no longer",
        "iam": "now; «nōn iam» = no longer",
        "rapiēbat": "kept snatching, kept stealing",
        "sed": "but",
        "ante": "before, in front of (+ acc.)",
        "portam": "the door, the gate (acc.)",
        "iacēbat": "was lying, lay",
        "viam": "the road (acc.)",
        "oculīs": "with eyes (abl. pl.)",
        "trīstibus": "sad (abl. pl.)",
        "spectāns": "watching (present participle — agrees with «Ferōx»)",
        "mārcus": "Marcus, the father",
        "autem": "but, however",
        "cotīdiē": "every day",
        "ad": "to, toward",
        "portum": "the harbor (acc.)",
        "ībat": "went, kept going (imperfect of «eō»)",
        "et": "and",
        "nautās": "sailors (acc. pl.)",
        "ex": "out of, from",
        "aliīs": "other; the others («ex aliīs terrīs» from other lands; «aliīs dormientibus» while the others slept)",
        "terrīs": "lands (abl. pl.)",
        "venientēs": "coming, arriving (present participle, acc. pl. — agrees with «nautās»)",
        "interrogābat": "questioned, kept questioning",
        "vīdistisne": "did you (pl.) see…? (perfect + question ‑ne)",
        "nāvem": "a ship (acc.)",
        "frāctam": "wrecked, broken (perfect participle, acc. — agrees with «nāvem»)",
        "virōs": "men (acc. pl.)",
        "ē": "out of, from",
        "marī": "the sea (abl.)",
        "servātōs": "saved, rescued (perfect participle, acc. pl. — agrees with «virōs»)",
        "certum": "certain, sure (acc.)",
        "respōnsum": "answer (acc.)",
        "dare": "to give",
        "poterat": "was able, could",
        "fāma": "rumor, report",
        "incerta": "uncertain",
        "per": "through",
        "oppidum": "the town (acc.)",
        "errābat": "was wandering, kept drifting about",
        "alter": "one (of two); «alter … alter» = the one … the other",
        "nauta": "sailor",
        "clāmābat": "kept shouting",
        "omnēs": "all, everyone",
        "periērunt": "(they) perished (perfect of «pereō»)",
        "respondēbat": "kept answering",
        "minimē": "no! not at all!",
        "paucī": "a few",
        "īnsulā": "island (abl.)",
        "parvā": "small (abl.)",
        "nunc": "now",
        "vīvunt": "(they) are alive, live",
        "itaque": "and so, therefore",
        "animus": "mind, spirit",
        "mārcī": "of Marcus (gen.)",
        "inter": "between",
        "spem": "hope (acc. of «spēs», 5th decl.)",
        "metumque": "and fear (acc., 4th decl. + ‑que)",
        "iactābātur": "was being tossed (imperfect passive)",
        "quīntus": "Quintus, the son",
        "tamen": "however, nevertheless",
        "dēspērābat": "despaired, gave up hope (with «nōn»: did not despair)",
        "nūlla": "no, not any",
        "nāvis": "ship",
        "inquit": "said (used with quoted speech)",
        "gubernātōrem": "helmsman (acc.)",
        "meliōrem": "better (comparative, acc.)",
        "habet": "has",
        "avunculus": "uncle",
        "noster": "our",
        "vīvit": "is alive, lives",
        "fortasse": "perhaps",
        "ignōtā": "unknown (abl.)",
        "auxilium": "help (acc.)",
        "exspectat": "waits for, awaits",
        "puer": "the boy",
        "tālia": "such things (acc. pl.)",
        "dīcēns": "saying (present participle — agrees with «puer»)",
        "mātrem": "his mother (acc.)",
        "maestam": "sorrowful (acc.)",
        "cōnfirmāre": "to strengthen, to encourage",
        "temptābat": "tried, kept trying",
        "nocte": "at night (abl. of time)",
        "dormientibus": "sleeping; «aliīs dormientibus» = while the others slept (ablative absolute, present participle)",
        "sōlus": "alone",
        "vigilābat": "stayed awake, kept watch",
        "dē": "about, concerning",
        "avunculō": "his uncle (abl. — after «dē»)",
        "cōgitāns": "thinking (present participle)",
        "stēllās": "stars (acc. pl.)",
        "clārās": "bright (acc. pl.)",
        "spectābat": "watched, kept watching"
      },
      translation: [
        "With Titus's ship lost, the whole house was in mourning. Everywhere there was silence: no one sang, no one laughed, even little Paulla was silent. Livia sat in her bedroom, weeping for a long time; her eyes were full of tears. Even Ferox was sorrowful: he no longer stole sausages, but lay in front of the door, watching the road with sad eyes.",
        "But Marcus went to the harbor every day and questioned the sailors arriving from other lands: «Did you see a wrecked ship? Did you see men saved from the sea?» But no one could give a certain answer, and uncertain rumor drifted through the town. One sailor kept shouting: «They all perished!»; the other kept answering: «Not at all! A few are alive on a small island even now.» And so Marcus's mind was tossed between hope and fear.",
        "Quintus, however, did not despair. «No ship,» he said, «has a better helmsman. Our uncle is alive, and perhaps he is waiting for help on some unknown island.» Saying such things, the boy tried to strengthen his sorrowful mother. At night, while the others slept, he alone stayed awake and, thinking about his uncle, watched the bright stars."
      ],
      questions: [
        {
          q: "What does the opening phrase «nāve Titī āmissā» do for the whole reading?",
          options: [
            "It says Titus is losing the ship at this very moment",
            "It sets the scene: Titus's ship having been lost, the house is in mourning",
            "It says the ship is about to be lost",
            "It makes «nāve» the subject of the main clause"
          ],
          answer: 1,
          explain: "Noun + perfect participle, both ablative = ablative absolute: ‘with Titus's ship lost / since the ship was lost’. It hangs free of the main clause, which then starts fresh with «tōta domus»."
        },
        {
          q: "How has Ferox changed since the shipwreck?",
          options: [
            "He barks at every sailor who passes",
            "He steals more sausages than ever",
            "He no longer steals sausages and lies at the door, watching the road",
            "He has run away to the harbor"
          ],
          answer: 2,
          explain: "«botulōs nōn iam rapiēbat, sed ante portam iacēbat, viam … spectāns» — even the sausage thief is in mourning."
        },
        {
          q: "In «nautās ex aliīs terrīs venientēs interrogābat», whom does Marcus question?",
          options: [
            "Sailors who are about to leave for other lands",
            "Sailors arriving from other lands",
            "Sailors whom he had rescued from the sea",
            "Sailors who used to question him"
          ],
          answer: 1,
          explain: "«venientēs» is a present participle agreeing with «nautās»: sailors ‘coming’ from other lands — arriving, not departing (that would be a form of «discēdō»)."
        },
        {
          q: "What does Quintus do at night, «aliīs dormientibus»?",
          options: [
            "He sleeps more soundly than anyone else",
            "He stays awake alone, thinking of his uncle and watching the stars",
            "He wakes the others with his weeping",
            "He sneaks off to the harbor with Ferōx"
          ],
          answer: 1,
          explain: "«aliīs dormientibus» is an ablative absolute with a present participle — WHILE the others slept — and the main clause says «sōlus vigilābat», he alone kept watch."
        }
      ]
    },
    {
      title: "Vōtum",
      intro: "Livia decides that tears are not enough: the family carries its hope to the temple of Neptune — and an old sailor fans the spark.",
      paragraphs: [
        "Multōs diēs familia nūntium exspectābat; sed nūllus nūntius, nūlla epistula veniēbat. Dolor et cūra Līviam tenēbant; per longās noctēs anxia vigilābat. Tandem, lacrimīs siccātīs, cōnsilium cēpit. «Lacrimae», inquit, «frātrem meum nōn servābunt. Deōs ōrāre dēbēmus. Venīte mēcum ad templum Neptūnī, quod prope portum stat!»",
        "Prīmā lūce tōta familia per viās tacitās ad templum properāvit. In templō Līvia ante āram stetit et, manūs ad caelum tollēns, deum ōrāvit: «Ō Neptūne, rēx maris, audī precēs fēminae maestae! Frāter meus in marī tuō perditus est. Servā eum, et ego tibi sacrificium magnum dabō āramque tuam dōnīs ōrnābō. Hoc vōtum tibi faciō.» Quīntus et Paulla quoque, manūs ad caelum tollentēs, tacitī ōrābant.",
        "Precibus factīs vōtōque datō, familia ē templō discessit. In viā Quīntus mātrī dīxit: «Bonum animum habē, māter! Pietās tua magna est; dī precēs tuās audient. Titus gubernātor optimus est — id ego sciō, id tū scīs, id etiam Ferōx scit!» Verba puerī mātrī sōlācium dabant, et Līvia prīmum post naufragium rīsit.",
        "Posteā Quīntus cotīdiē in portū nāvēs intrantēs spectābat. Ōlim senex nauta, puerum vigilantem cōnspiciēns, «Quem exspectās, puer?» rogāvit. «Avunculum meum», respondit Quīntus, «magistrum nāvis āmissae.» Tum senex: «Spēs tua», inquit, «mihi placet. Mare virōs fortēs nōn semper dēvorat: ego quondam, nāve frāctā, trēs diēs in undīs natāvī et servātus sum. Manē cum spē certā: nūntius mox veniet.» Itaque familia, inter dolōrem spemque vīvēns, nūntium exspectābat. Sed dē eō nūntiō fābula alia erit."
      ],
      glosses: {
        "multōs": "many (acc. — «multōs diēs» = for many days, duration)",
        "diēs": "days (acc. pl., 5th decl. — duration of time)",
        "familia": "family",
        "nūntium": "news, a message (acc.)",
        "exspectābat": "was waiting for",
        "sed": "but",
        "nūllus": "no, not any",
        "nūntius": "message, news",
        "nūlla": "no, not any (fem.)",
        "epistula": "letter",
        "veniēbat": "was coming, came",
        "dolor": "grief",
        "et": "and",
        "cūra": "worry, care",
        "līviam": "Livia (acc.)",
        "tenēbant": "held, gripped",
        "per": "through, throughout",
        "longās": "long (acc. pl.)",
        "noctēs": "nights (acc. pl.)",
        "anxia": "anxious (describing Livia)",
        "vigilābat": "lay awake, kept watch",
        "tandem": "at last",
        "lacrimīs": "tears (abl. — part of an ablative absolute)",
        "siccātīs": "dried; «lacrimīs siccātīs» = her tears having been dried (ablative absolute)",
        "cōnsilium": "a plan (acc.)",
        "cēpit": "took; «cōnsilium cēpit» = she formed a plan (perfect)",
        "lacrimae": "tears (nom. pl.)",
        "inquit": "said (used with quoted speech)",
        "frātrem": "brother (acc.)",
        "meum": "my (acc.)",
        "nōn": "not",
        "servābunt": "will save (future)",
        "deōs": "the gods (acc. pl.)",
        "ōrāre": "to pray to, to entreat",
        "dēbēmus": "we must, we ought",
        "venīte": "come! (pl. command)",
        "mēcum": "with me (= cum mē)",
        "ad": "to, toward",
        "templum": "the temple (acc.)",
        "neptūnī": "of Neptune, god of the sea (gen.)",
        "quod": "which (neut. — refers to «templum»)",
        "prope": "near",
        "portum": "the harbor (acc.)",
        "stat": "stands",
        "prīmā": "first (abl. — «prīmā lūce» = at first light)",
        "lūce": "light (abl. of «lūx»)",
        "tōta": "the whole",
        "viās": "streets (acc. pl.)",
        "tacitās": "silent (acc. pl. — from «taceō»)",
        "properāvit": "hurried (perfect)",
        "in": "in, on",
        "templō": "the temple (abl.)",
        "līvia": "Livia, the mother",
        "ante": "before, in front of (+ acc.)",
        "āram": "the altar (acc.)",
        "stetit": "stood (perfect of «stō»)",
        "manūs": "hands (acc. pl. — 4th decl.)",
        "caelum": "the sky (acc.)",
        "tollēns": "raising, lifting (present participle — agrees with «Līvia»)",
        "deum": "the god (acc.)",
        "ōrāvit": "prayed to, entreated (perfect)",
        "ō": "O …! (marks someone being addressed)",
        "neptūne": "Neptune (voc. — being addressed)",
        "rēx": "king",
        "maris": "of the sea (gen.)",
        "audī": "hear! listen to! (sg. command)",
        "precēs": "prayers (acc. pl.)",
        "fēminae": "of a woman (gen.)",
        "maestae": "sorrowful (gen.)",
        "frāter": "brother",
        "meus": "my",
        "marī": "sea (abl.)",
        "tuō": "your (abl.)",
        "perditus": "lost; «perditus est» = has been lost, is lost",
        "est": "is; after a participle: was/has been …-ed",
        "servā": "save! (sg. command)",
        "eum": "him",
        "ego": "I",
        "tibi": "to you, for you",
        "sacrificium": "a sacrifice (acc.)",
        "magnum": "great (acc.)",
        "dabō": "I will give (future)",
        "āramque": "and the altar (acc. + ‑que)",
        "tuam": "your (acc.)",
        "dōnīs": "with gifts (abl. pl.)",
        "ōrnābō": "I will adorn, decorate (future)",
        "hoc": "this (acc. neut. — with «vōtum»)",
        "vōtum": "vow (acc.)",
        "faciō": "I make",
        "quīntus": "Quintus, the son",
        "paulla": "Paulla, the daughter",
        "quoque": "also, too",
        "tollentēs": "raising (present participle, pl. — agrees with Quintus and Paulla)",
        "tacitī": "silent, in silence (nom. pl.)",
        "ōrābant": "were praying",
        "precibus": "prayers (abl. — part of an ablative absolute)",
        "factīs": "made; «precibus factīs» = the prayers having been made (ablative absolute)",
        "vōtōque": "and the vow (abl. + ‑que)",
        "datō": "given; «vōtō datō» = the vow having been given (ablative absolute)",
        "ē": "out of, from",
        "discessit": "departed (perfect)",
        "viā": "the way, road (abl. — «in viā» = on the way)",
        "mātrī": "to his mother (dat.)",
        "dīxit": "said (perfect)",
        "bonum": "good (acc.); «bonum animum habē» = keep your courage up",
        "animum": "spirit, courage (acc.)",
        "habē": "have! keep! (sg. command)",
        "māter": "mother (being addressed)",
        "pietās": "devotion, loyalty",
        "tua": "your",
        "magna": "great",
        "dī": "the gods (irregular nom. pl. of «deus»)",
        "tuās": "your (acc. pl.)",
        "audient": "will hear (future)",
        "titus": "Titus, Livia's brother, the missing captain",
        "gubernātor": "helmsman",
        "optimus": "the best",
        "id": "it, this (acc.)",
        "sciō": "I know",
        "tū": "you",
        "scīs": "you know",
        "etiam": "even; also",
        "ferōx": "Ferox, the family dog",
        "scit": "knows",
        "verba": "the words (nom. pl.)",
        "puerī": "of the boy (gen.)",
        "sōlācium": "comfort, consolation (acc.)",
        "dabant": "gave, kept giving",
        "prīmum": "for the first time",
        "post": "after (+ acc.)",
        "naufragium": "the shipwreck (acc.)",
        "rīsit": "smiled, laughed (perfect of «rīdeō»)",
        "posteā": "afterwards",
        "cotīdiē": "every day",
        "portū": "the harbor (abl. — 4th decl.)",
        "nāvēs": "the ships (acc. pl.)",
        "intrantēs": "entering, coming in (present participle — agrees with «nāvēs»)",
        "spectābat": "watched, kept watching",
        "ōlim": "one day, once",
        "senex": "old; an old man",
        "nauta": "sailor",
        "puerum": "the boy (acc.)",
        "vigilantem": "keeping watch (present participle, acc. — agrees with «puerum»)",
        "cōnspiciēns": "catching sight of (present participle)",
        "quem": "whom? (acc.)",
        "exspectās": "are you waiting for",
        "puer": "boy (being addressed)",
        "rogāvit": "asked (perfect)",
        "avunculum": "my uncle (acc.)",
        "respondit": "replied (perfect)",
        "magistrum": "the master, captain (acc.)",
        "nāvis": "of the ship (gen.)",
        "āmissae": "lost (perfect participle, gen. — agrees with «nāvis»)",
        "tum": "then",
        "spēs": "hope",
        "mihi": "me (dat. — «mihi placet» = pleases me)",
        "placet": "pleases, is pleasing to",
        "mare": "the sea",
        "virōs": "men (acc. pl.)",
        "fortēs": "brave (acc. pl.)",
        "semper": "always",
        "dēvorat": "devours, swallows up",
        "quondam": "once, long ago",
        "nāve": "ship (abl. — part of an ablative absolute)",
        "frāctā": "wrecked; «nāve frāctā» = my ship having been wrecked (ablative absolute)",
        "trēs": "three",
        "undīs": "the waves (abl. pl.)",
        "natāvī": "I swam (perfect)",
        "servātus": "saved; «servātus sum» = I was saved",
        "sum": "I am; after a participle: I was …-ed",
        "manē": "wait! stay! (sg. command of «maneō»)",
        "cum": "with",
        "spē": "hope (abl. — 5th decl.)",
        "certā": "sure, certain (abl.)",
        "mox": "soon",
        "veniet": "will come (future)",
        "itaque": "and so, therefore",
        "inter": "between",
        "dolōrem": "grief (acc.)",
        "spemque": "and hope (acc. + ‑que)",
        "vīvēns": "living (present participle — agrees with «familia»)",
        "dē": "about, concerning",
        "eō": "that (abl. — with «nūntiō»)",
        "nūntiō": "message, news (abl.)",
        "fābula": "story",
        "alia": "another, a different",
        "erit": "will be (future)"
      },
      translation: [
        "For many days the family waited for news; but no message, no letter came. Grief and worry gripped Livia; through the long nights she lay awake, anxious. At last, her tears dried, she formed a plan. «Tears,» she said, «will not save my brother. We must pray to the gods. Come with me to the temple of Neptune, which stands near the harbor!»",
        "At first light the whole family hurried through the silent streets to the temple. In the temple Livia stood before the altar and, raising her hands to the sky, prayed to the god: «O Neptune, king of the sea, hear the prayers of a sorrowful woman! My brother is lost on your sea. Save him, and I will give you a great sacrifice and adorn your altar with gifts. This vow I make to you.» Quintus and Paulla too, raising their hands to the sky, prayed in silence.",
        "The prayers made and the vow given, the family left the temple. On the way Quintus said to his mother: «Keep your courage up, mother! Your devotion is great; the gods will hear your prayers. Titus is the best helmsman — I know it, you know it, even Ferox knows it!» The boy's words gave his mother comfort, and Livia smiled for the first time since the shipwreck.",
        "Afterwards Quintus watched the incoming ships at the harbor every day. One day an old sailor, catching sight of the boy keeping watch, asked: «Whom are you waiting for, boy?» «My uncle,» Quintus replied, «the captain of the lost ship.» Then the old man said: «Your hope pleases me. The sea does not always devour brave men: I myself once, my ship wrecked, swam in the waves for three days and was saved. Wait with sure hope: news will come soon.» And so the family, living between grief and hope, waited for news. But about that news there will be another story."
      ],
      questions: [
        {
          q: "What finally moves Livia to act?",
          options: [
            "A letter at last arrives from Titus",
            "She decides that tears will not save her brother — the family must pray to the gods",
            "Marcus orders her to stop weeping",
            "Neptune appears to her in a dream"
          ],
          answer: 1,
          explain: "«Lacrimae frātrem meum nōn servābunt. Deōs ōrāre dēbēmus.» — her grief turns into a plan: «cōnsilium cēpit»."
        },
        {
          q: "What exactly does Livia vow to Neptune?",
          options: [
            "To send Quintus to sea as a sailor",
            "To build him a new temple in Ostia",
            "That if he saves Titus, she will give a great sacrifice and adorn his altar with gifts",
            "To weep at his altar every day"
          ],
          answer: 2,
          explain: "«Servā eum, et ego tibi sacrificium magnum dabō āramque tuam dōnīs ōrnābō. Hoc vōtum tibi faciō.» — save him, AND I will give: the classic shape of a Roman vow."
        },
        {
          q: "In «precibus factīs vōtōque datō, familia ē templō discessit», when does the family leave?",
          options: [
            "While they are still praying",
            "Before the prayers begin",
            "After the prayers have been made and the vow given",
            "Instead of praying at all"
          ],
          answer: 2,
          explain: "Two ablative absolutes with perfect participles — «precibus factīs», «vōtō datō» — mark completed background events: the praying and vowing are done, THEN they depart."
        },
        {
          q: "Why does the old sailor tell Quintus his own story?",
          options: [
            "To warn him that the sea devours everyone in the end",
            "Because he once survived a shipwreck himself — living proof that Titus too may be saved",
            "To ask the boy for money",
            "Because he was the helmsman of Titus's ship"
          ],
          answer: 1,
          explain: "«ego quondam, nāve frāctā, … servātus sum» — an ablative absolute plus a first-person perfect passive: his ship was wrecked, yet he was saved. So: «Manē cum spē certā»."
        }
      ]
    }
  ],

  quiz: [
    {
      prompt: "In «Līvia lacrimāns sedēbat», what does «lacrimāns» tell you?",
      options: [
        "Livia was weeping as she sat — an action running alongside the main verb",
        "Livia had wept long before she sat down",
        "Livia is about to weep",
        "Someone else is weeping for Livia"
      ],
      answer: 0,
      explain: "‑ns marks the present active participle: ‘weeping’, simultaneous with «sedēbat». It agrees with «Līvia», so she is the one doing it."
    },
    {
      prompt: "Which phrase means «the arriving ships» — the ships that are coming in?",
      options: ["nāvēs āmissae", "nāvēs intrantēs", "nāvēs intrātūrae", "nāvēs frāctae"],
      answer: 1,
      explain: "«intrantēs» is a present participle: ‘entering’. «āmissae» and «frāctae» are perfect passive (lost, wrecked — already done), and «intrātūrae» is future (about to enter)."
    },
    {
      prompt: "What is the difference between «nāvis frācta est» and «nāvis frācta»?",
      options: [
        "There is no difference at all",
        "The first is a full sentence (‘the ship was wrecked’); the second is a noun phrase (‘the wrecked ship’)",
        "The second one is future in meaning",
        "The first is present passive (‘is being wrecked’)"
      ],
      answer: 1,
      explain: "Participle + «est» = the perfect passive verb of unit 22. The participle alone simply modifies its noun: «nāvis frācta», the wrecked ship — ready to be used in any sentence."
    },
    {
      prompt: "«Titus ventūrus est.» What does this say?",
      options: [
        "Titus has already come",
        "Titus is coming through the door right now",
        "Titus is going to come",
        "Titus is being carried"
      ],
      answer: 2,
      explain: "‑ūrus is the future active participle: ‘about to, going to’. With «est» it makes a near-future: Titus is going to come. ‘Has come’ would be «vēnit»."
    },
    {
      prompt: "In «nāve āmissā, familia maesta erat», the phrase «nāve āmissā» is best read as…",
      options: [
        "‘the lost ship’ — the subject of the sentence",
        "‘to the lost ship’ — where the family went",
        "an ablative absolute: ‘since the ship had been lost, …’",
        "a command: ‘lose the ship!’"
      ],
      answer: 2,
      explain: "Noun + participle, both ablative, fenced off at the head of the sentence: the ablative absolute. It sets the scene; the subject of the main clause is «familia»."
    },
    {
      prompt: "Which of these is an ablative absolute with a PRESENT participle — ‘while X was going on’?",
      options: ["precibus factīs", "aliīs dormientibus", "vōtō datō", "nāve frāctā"],
      answer: 1,
      explain: "«dormientibus» shows the present-participle stem ‑nt‑: ‘while the others were sleeping’. The other three use perfect participles — deeds already done."
    },
    {
      prompt: "In «alter nauta clāmābat, alter respondēbat», what does «alter … alter» mean?",
      options: [
        "The one (of two) … the other",
        "Some … others (among many)",
        "Neither … nor",
        "Both at the same time"
      ],
      answer: 0,
      explain: "«alter» is the ‘other’ of exactly TWO: one sailor shouted, the other answered. For others among many, Latin switches to «alius»."
    },
    {
      prompt: "«Puer, tālia dīcēns, mātrem cōnfirmābat.» Who is saying such things?",
      options: [
        "The mother",
        "The boy — «dīcēns» agrees with «puer»",
        "Ferōx",
        "Nobody — «dīcēns» is a command"
      ],
      answer: 1,
      explain: "A participle agrees with its noun in case, number, and gender: nominative «dīcēns» hooks onto nominative «puer», not accusative «mātrem». The boy speaks; the mother is encouraged."
    }
  ]
});
