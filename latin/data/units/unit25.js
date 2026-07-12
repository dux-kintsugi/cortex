registerUnit({
  id: 25,
  stage: 3,
  title: "Avunculum Vīvere!",
  tagline: "Indirect statement — the accusative + infinitive, in every tense",

  grammar: [
    {
      heading: "«Dīcit avunculum vīvere» — how Latin says ‘that’",
      body: "<p>English reports speech with a little hinge-word: he says <em>that</em> Ted is alive. Classical Latin has no hinge-word at all. After a verb of saying, thinking, knowing, or perceiving, the reported sentence folds itself into a new shape: its subject turns <strong>accusative</strong>, its verb turns <strong>infinitive</strong>. <span class=\"la\">Nūntius dīcit avunculum vīvere</span> — literally ‘the messenger says uncle to-be-alive’, that is, <em>the messenger says that uncle (Ted) is alive</em>.</p><p>This is the famous <strong>accusative + infinitive</strong>, and Romans used it constantly — every letter, every rumor, every scrap of news in this unit arrives wrapped in it. The reading strategy: when you meet a ‘head’ verb like <span class=\"la\">dīcit</span>, <span class=\"la\">putat</span>, <span class=\"la\">scit</span>, <span class=\"la\">audit</span>, expect an accusative right after it, hold that accusative in mind as the subject of an infinitive still to come — and supply the word ‘that’ yourself.</p>",
      table: {
        caption: "Verbs that launch an indirect statement",
        headers: ["Verb", "Meaning", "Example"],
        rows: [
          ["dīcō", "say", "dīcit avunculum vīvere — he says that uncle is alive"],
          ["affirmō", "assert, declare", "affirmat nāvem venīre — he declares that a ship is coming"],
          ["putō", "think, suppose", "putō eam ex Sardiniā venīre — I think it is coming from Sardinia"],
          ["crēdō", "believe", "crēdō eum vīvere — I believe that he is alive"],
          ["sciō", "know", "sciō mē domī esse — I know that I am home"],
          ["audiō", "hear", "audīmus nāvem adesse — we hear that the ship is here"],
          ["videō", "see", "videō avunculum stāre — I see that uncle is standing there"],
          ["intellegō", "understand", "intellegit mātrem trīstem esse — he understands that mother is sad"]
        ]
      },
      tip: "An accusative right after a saying/thinking verb? Don’t read it as an object yet — it is probably the subject of an infinitive still on its way."
    },
    {
      heading: "Earlier, now, later: the three infinitives",
      body: "<p>Inside an indirect statement, the infinitive’s tense is <em>relative to the main verb</em>. The <strong>present</strong> infinitive (<span class=\"la\">vīvere</span>) means the same time; the <strong>perfect</strong> infinitive in <span class=\"la\">‑isse</span> (<span class=\"la\">vīdisse</span>, <span class=\"la\">pervēnisse</span>) means earlier; the <strong>future</strong> infinitive in <span class=\"la\">‑ūrus esse</span> (<span class=\"la\">reditūrus esse</span>) means later.</p><p>So: <span class=\"la\">dīcit avunculum valēre</span> — he says that uncle IS well. <span class=\"la\">Dīcit avunculum valuisse</span> — that uncle WAS well. <span class=\"la\">Dīcit avunculum mox reditūrum esse</span> — that uncle WILL soon return. The verb <span class=\"la\">sum</span> plays along: <span class=\"la\">esse</span>, <span class=\"la\">fuisse</span>, <span class=\"la\">futūrus esse</span>. And the passive comes too: present <span class=\"la\">portārī</span>, perfect <span class=\"la\">portātus esse</span> — the participle-plus-<span class=\"la\">esse</span> pattern you mastered in unit 22, now wearing an infinitive.</p>",
      table: {
        caption: "The infinitives of portō (carry)",
        headers: ["Tense", "Active", "Passive", "Time relative to the main verb"],
        rows: [
          ["present", "portāre — to carry", "portārī — to be carried", "same time"],
          ["perfect", "portāvisse — to have carried", "portātus esse — to have been carried", "earlier"],
          ["future", "portātūrus esse — to be about to carry", "—", "later"]
        ]
      },
      tip: "‑isse = earlier. ‑ūrus esse = later. Everything else = same time as the saying."
    },
    {
      heading: "«sē» — who is who inside the report",
      body: "<p>Reported speech has to keep track of who is talking about whom, and Latin does it with one tiny word: <span class=\"la\">sē</span>. Inside an indirect statement, <span class=\"la\">sē</span> always points back to the reporter. <span class=\"la\">Ted scrībit sē valēre</span> — Ted writes that <em>he himself</em> is well. Swap in <span class=\"la\">eum</span> and the ‘he’ becomes somebody else: <span class=\"la\">Ted scrībit eum valēre</span> — Ted writes that <em>he</em> (some other man) is well.</p><p><span class=\"la\">mē</span>, <span class=\"la\">tē</span>, <span class=\"la\">nōs</span> and <span class=\"la\">vōs</span> behave just as you would hope: <span class=\"la\">sciō mē domī esse</span> — I know that I am home; <span class=\"la\">semper affirmābam tē vīvere</span> — I always declared that you were alive.</p><p>One more wrinkle. Because the report’s subject is accusative, a report can hold <strong>two accusatives</strong> at once — one the subject, one the object. <span class=\"la\">Sciō deōs mē servāvisse</span> — I know that the gods saved me: <span class=\"la\">deōs</span> is the subject of <span class=\"la\">servāvisse</span>, and <span class=\"la\">mē</span> is its object. The accusative that comes first is usually the subject; when in doubt, let sense and context decide — the gods saved me, not the other way round.</p>",
      table: {
        caption: "Pronoun subjects inside the indirect statement",
        headers: ["Latin", "Refers to", "Example"],
        rows: [
          ["sē", "the reporter himself/herself", "Ted dīcit sē valēre — Ted says that he (Ted) is well"],
          ["eum / eam / eōs", "somebody else", "Ted dīcit eum valēre — Ted says that he (another man) is well"],
          ["mē / tē / nōs / vōs", "exactly who you expect", "putāsne mē mare timēre? — do you think that I fear the sea?"]
        ]
      },
      tip: "«sē» in a report = the person doing the reporting. Ask: who is the sayer? That is who «sē» is."
    },
    {
      heading: "«negō», «spērō», and the agreeing participle",
      body: "<p>Two idioms round out the toolkit. First: to report a negative, Romans preferred one crisp verb, <span class=\"la\">negō</span> — ‘say that … not’. <span class=\"la\">Nauta negat avunculum mortuum esse</span> — the sailor says that the uncle is NOT dead. When you see <span class=\"la\">negō</span>, build the ‘not’ into the reported clause yourself.</p><p>Second: because the perfect passive and future infinitives contain a participle, that participle <strong>agrees</strong> with the accusative subject, like any adjective: <span class=\"la\">dīcit avunculum reditūrum esse</span>, but <span class=\"la\">dīcit nāvem āmissam esse</span> and <span class=\"la\">nautās servātōs esse</span>. Those endings are old friends from units 22–23 — let them show you which accusative belongs to which infinitive. Verbs of hoping and promising (<span class=\"la\">spērō</span>, <span class=\"la\">prōmittō</span>) usually take the future infinitive: <span class=\"la\">prōmittit sē ventūrum esse</span> — he promises that he will come.</p>",
      tip: "Inside a report, «‑ūrum esse» after an accusative = ‘will …’; a PPP + «esse» = ‘was …-ed’. The participle’s ending points to its subject."
    }
  ],

  vocab: [
    {
      latin: "vīvō",
      forms: "vīvere, vīxī, vīctum",
      pos: "verb (3rd conj.)",
      gloss: "live, be alive",
      example: "Nūntius dīcit avunculum vīvere!",
      exampleGloss: "The messenger says that uncle Ted is alive!"
    },
    {
      latin: "putō",
      forms: "putāre, putāvī, putātum",
      pos: "verb (1st conj.)",
      gloss: "think, suppose",
      example: "Mark putat nāvem mox ventūram esse.",
      exampleGloss: "Mark thinks that the ship will come soon."
    },
    {
      latin: "intellegō",
      forms: "intellegere, intellēxī, intellēctum",
      pos: "verb (3rd conj.)",
      gloss: "understand",
      example: "Paula intellegit mātrem trīstem esse.",
      exampleGloss: "Paula understands that her mother is sad."
    },
    {
      latin: "affirmō",
      forms: "affirmāre, affirmāvī, affirmātum",
      pos: "verb (1st conj.)",
      gloss: "assert, declare",
      example: "Nauta affirmat sē Ted vīdisse.",
      exampleGloss: "The sailor asserts that he saw Ted."
    },
    {
      latin: "valeō",
      forms: "valēre, valuī",
      pos: "verb (2nd conj.)",
      gloss: "be well, be strong",
      example: "Ted scrībit sē bene valēre.",
      exampleGloss: "Ted writes that he is well."
    },
    {
      latin: "celebrō",
      forms: "celebrāre, celebrāvī, celebrātum",
      pos: "verb (1st conj.)",
      gloss: "celebrate",
      example: "Familia reditum avunculī convīviō celebrat.",
      exampleGloss: "The family celebrates their uncle’s return with a feast."
    },
    {
      latin: "amplector",
      forms: "amplectī, amplexus sum",
      pos: "verb (3rd conj., deponent)",
      gloss: "embrace",
      example: "Julia frātrem lacrimāns amplectitur.",
      exampleGloss: "Julia, weeping, embraces her brother."
    },
    {
      latin: "testis",
      forms: "testis, m./f.",
      pos: "noun (3rd decl.)",
      gloss: "witness",
      example: "Testis affirmat sē Ted in īnsulā vīdisse.",
      exampleGloss: "The witness declares that he saw Ted on the island."
    },
    {
      latin: "mendācium",
      forms: "mendāciī, n.",
      pos: "noun (2nd decl.)",
      gloss: "lie, falsehood",
      example: "Rūmōrēs dē morte avunculī mendācia erant.",
      exampleGloss: "The rumors about their uncle’s death were lies."
    },
    {
      latin: "laetitia",
      forms: "laetitiae, f.",
      pos: "noun (1st decl.)",
      gloss: "joy, gladness",
      example: "Domus tōta laetitiā plēna est.",
      exampleGloss: "The whole house is full of joy."
    },
    {
      latin: "ōsculum",
      forms: "ōsculī, n.",
      pos: "noun (2nd decl.)",
      gloss: "kiss",
      example: "Paula avunculō multa ōscula dat.",
      exampleGloss: "Paula gives her uncle many kisses."
    },
    {
      latin: "reditus",
      forms: "reditūs, m.",
      pos: "noun (4th decl.)",
      gloss: "return",
      example: "Omnēs dē reditū gubernātōris loquuntur.",
      exampleGloss: "Everyone is talking about the captain’s return."
    },
    {
      latin: "adventus",
      forms: "adventūs, m.",
      pos: "noun (4th decl.)",
      gloss: "arrival",
      example: "Adventus frātris Juliam dēlectat.",
      exampleGloss: "Her brother’s arrival delights Julia."
    },
    {
      latin: "convīvium",
      forms: "convīviī, n.",
      pos: "noun (2nd decl.)",
      gloss: "feast, dinner party",
      example: "Julia convīvium magnum parat.",
      exampleGloss: "Julia prepares a great feast."
    },
    {
      latin: "pōculum",
      forms: "pōculī, n.",
      pos: "noun (2nd decl.)",
      gloss: "cup, goblet",
      example: "Pōcula vīnō optimō plēna sunt.",
      exampleGloss: "The cups are full of excellent wine."
    },
    {
      latin: "carmen",
      forms: "carminis, n.",
      pos: "noun (3rd decl.)",
      gloss: "song, poem",
      example: "Nautae carmina laeta cantābant.",
      exampleGloss: "The sailors were singing joyful songs."
    },
    {
      latin: "grātiās agere",
      forms: "(+ dat.)",
      pos: "phrase",
      gloss: "to give thanks",
      example: "Familia deīs grātiās agit.",
      exampleGloss: "The family gives thanks to the gods."
    },
    {
      latin: "fortūnātus",
      forms: "‑a, ‑um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "fortunate, lucky",
      example: "Quam fortūnāta est familia nostra!",
      exampleGloss: "How fortunate our family is!"
    },
    {
      latin: "falsus",
      forms: "‑a, ‑um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "false",
      example: "Rūmor dē morte avunculī falsus erat.",
      exampleGloss: "The rumor about their uncle’s death was false."
    },
    {
      latin: "sānus",
      forms: "‑a, ‑um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "healthy, sound",
      example: "Ted sānus et incolumis est.",
      exampleGloss: "Ted is healthy and unharmed."
    },
    {
      latin: "beātus",
      forms: "‑a, ‑um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "blessed, happy",
      example: "Nēmō beātior est quam Julia.",
      exampleGloss: "No one is happier than Julia."
    },
    {
      latin: "quidem",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "indeed, in fact",
      example: "Ego quidem crēdō avunculum vīvere.",
      exampleGloss: "I for my part believe that uncle is alive."
    },
    {
      latin: "vix",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "scarcely, hardly",
      example: "Julia verbīs nūntiī vix crēdit.",
      exampleGloss: "Julia scarcely believes the messenger’s words."
    },
    {
      latin: "vērē",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "truly",
      example: "Testis vērē loquitur.",
      exampleGloss: "The witness speaks truly."
    },
    {
      latin: "ūnā",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "together",
      example: "Tandem omnēs ūnā cēnant et cantant.",
      exampleGloss: "At last everyone dines and sings together."
    }
  ],

  readings: [
    {
      title: "Rūmōrēs et Epistula",
      intro: "After the storm, Ostia runs on rumors — until a letter-carrier brings word in Ted’s own hand.",
      paragraphs: [
        "Post tempestātem multī rūmōrēs per viās Ostiae volābant. Aliī dīcēbant gubernātōrem Ted vīvere; aliī putābant eum mortuum esse. Mox rūmōrēs novī volābant: aliī dīcēbant nāvem eius mersam esse et omnēs nautās periisse; aliī autem affirmābant nāvem ad Sardiniam pervēnisse. Mercātor ignōtus in tabernā clāmābat sē scīre Ted mortuum esse. Sed nauta, quī nūper ex Sardiniā vēnerat, negābat: «Mendācium est! Affirmō eum vīvere!»",
        "Julia, hīs rūmōribus audītīs, vix dormīre poterat. «Alter dīcit frātrem meum vīvere», inquit, «alter putat eum mortuum esse. Rūmōribus crēdere nōn possum.» Quinn autem semper affirmābat avunculum suum vīvere; crēdēbat enim eum gubernātōrem optimum esse.",
        "Subitō Lupo lātrāvit: tabellārius epistulam portābat! Mark epistulam celeriter lēgit; deinde magnā vōce clāmāvit: «Ted haec verba suā manū scrīpsit! Scrībit sē vīvere et bene valēre. Dīcit nāvem quidem āmissam esse, sed nautās servātōs esse. Affirmat sē mox domum reditūrum esse!» Tum Julia lacrimāre incēpit — nōn dolōre, sed laetitiā. Omnēs enim intellēxērunt rūmōrēs falsōs fuisse."
      ],
      glosses: {
        "post": "after (+ acc.)",
        "tempestātem": "the storm (acc.)",
        "multī": "many",
        "rūmōrēs": "rumors (nom. pl.; at the end acc. pl., subject of «fuisse»)",
        "per": "through",
        "viās": "the streets (acc. pl.)",
        "ostiae": "of Ostia, the port of Rome (gen.)",
        "volābant": "were flying (about)",
        "aliī": "some (people) … («aliī … aliī» = some … others)",
        "dīcēbant": "kept saying (that…) — introduces accusative + infinitive",
        "putābant": "thought, kept thinking (that…)",
        "novī": "new, fresh (nom. pl. — with «rūmōrēs»)",
        "nāvem": "the ship (acc. — subject of the infinitive)",
        "eius": "his (— Ted’s)",
        "mersam": "sunk; «mersam esse» = to have been sunk (perfect passive infinitive)",
        "esse": "to be; with a participle: to have been …-ed",
        "et": "and",
        "omnēs": "all (acc. pl.; later nom. pl., ‘everyone’)",
        "nautās": "the sailors (acc. — subject of the infinitive)",
        "periisse": "to have perished (perfect infinitive of «pereō»)",
        "autem": "however, but",
        "affirmābant": "kept declaring (that…)",
        "ad": "to; «ad Sardiniam pervenīre» = to reach Sardinia",
        "sardiniam": "Sardinia, a large island west of Italy (acc.)",
        "pervēnisse": "to have arrived, to have reached (perfect infinitive)",
        "mercātor": "a merchant",
        "ignōtus": "unknown, a stranger",
        "in": "in",
        "tabernā": "a tavern, shop (abl.)",
        "clāmābat": "kept shouting",
        "sē": "that he himself (acc. — points back to the speaker)",
        "scīre": "to know; «sē scīre» = that he knew",
        "ted": "Ted, the uncle, the ship’s captain — his name never changes form (here acc., subject of the infinitive)",
        "mortuum": "dead (agrees with «Ted»/«eum»)",
        "sed": "but",
        "nauta": "a sailor",
        "quī": "who",
        "nūper": "recently",
        "ex": "from, out of",
        "sardiniā": "Sardinia (abl.)",
        "vēnerat": "had come (pluperfect)",
        "negābat": "said no, denied it («negō» = say that…not)",
        "mendācium": "a lie",
        "est": "(it) is",
        "affirmō": "I declare (that…)",
        "eum": "that he (acc. — Ted)",
        "vīvere": "is alive (lit. ‘to live’ — present infinitive, same time)",
        "julia": "Julia, the mother",
        "hīs": "these (abl. — with «rūmōribus»)",
        "rūmōribus": "rumors (first abl.: «hīs rūmōribus audītīs» = these rumors having been heard; then dat. with «crēdere»)",
        "audītīs": "having been heard (ablative absolute with «hīs rūmōribus»)",
        "vix": "scarcely, hardly",
        "dormīre": "to sleep",
        "poterat": "was able, could",
        "alter": "the one … («alter … alter» = one man … another)",
        "dīcit": "says (that…)",
        "frātrem": "brother (acc. — subject of the infinitive)",
        "meum": "my",
        "inquit": "said (used with quoted speech)",
        "putat": "thinks (that…)",
        "crēdere": "to believe, to trust (+ dat.)",
        "nōn": "not",
        "possum": "I can, I am able",
        "quinn": "Quinn, the son — his name never changes form",
        "semper": "always",
        "affirmābat": "kept declaring (that…)",
        "avunculum": "uncle (acc. — subject of the infinitive)",
        "suum": "his own",
        "crēdēbat": "believed (that…)",
        "enim": "for, you see",
        "gubernātōrem": "helmsman, ship’s captain (acc. — «gubernātōrem Ted» = captain Ted, the acc. ending carried by the title)",
        "optimum": "the best (acc.)",
        "subitō": "suddenly",
        "lupo": "Lupo, the family dog — quasi lupus, but far friendlier",
        "lātrāvit": "barked (perfect)",
        "tabellārius": "a letter-carrier",
        "epistulam": "a letter (acc.)",
        "portābat": "was carrying, was bringing",
        "mark": "Mark, the father — his name never changes form",
        "celeriter": "quickly",
        "lēgit": "read (perfect)",
        "deinde": "then, next",
        "magnā": "loud, great (abl.)",
        "vōce": "voice (abl. — «magnā vōce» = in a loud voice)",
        "clāmāvit": "shouted (perfect)",
        "haec": "these (acc. — with «verba»)",
        "verba": "words (acc.)",
        "suā": "his own (abl. — with «manū»)",
        "manū": "hand (abl. — «suā manū» = with his own hand)",
        "scrīpsit": "wrote (perfect)",
        "scrībit": "he writes (that…)",
        "bene": "well",
        "valēre": "to be well; «sē valēre» = that he is well",
        "quidem": "indeed, it is true",
        "āmissam": "lost; «āmissam esse» = to have been lost (perfect passive infinitive)",
        "servātōs": "saved; «servātōs esse» = to have been saved (perfect passive infinitive)",
        "affirmat": "he declares (that…)",
        "mox": "soon",
        "domum": "home, homeward",
        "reditūrum": "going to return; «reditūrum esse» = will return (future infinitive)",
        "tum": "then",
        "lacrimāre": "to weep",
        "incēpit": "began (perfect of «incipiō»)",
        "dolōre": "from grief (abl. of cause)",
        "laetitiā": "from joy (abl. of cause)",
        "intellēxērunt": "(they) understood (that…) (perfect)",
        "falsōs": "false (acc. pl. — agrees with «rūmōrēs»)",
        "fuisse": "to have been (perfect infinitive of «sum» — earlier time)"
      },
      translation: [
        "After the storm many rumors were flying through the streets of Ostia. Some kept saying that captain Ted was alive; others thought that he was dead. Soon new rumors were flying: some kept saying that his ship had been sunk and that all the sailors had perished; others, however, declared that the ship had reached Sardinia. An unknown merchant kept shouting in a tavern that he knew Ted was dead. But a sailor, who had recently come from Sardinia, said no: «It is a lie! I declare that he is alive!»",
        "Julia, when these rumors had been heard, could scarcely sleep. «One man says that my brother is alive,» she said, «another thinks that he is dead. I cannot trust rumors.» But Quinn always kept declaring that his uncle was alive; for he believed that he was the best helmsman.",
        "Suddenly Lupo barked: a letter-carrier was bringing a letter! Mark read the letter quickly; then he shouted in a loud voice: «Ted wrote these words with his own hand! He writes that he is alive and well. He says that the ship, it is true, was lost, but that the sailors were saved. He declares that he will soon return home!» Then Julia began to weep — not from grief, but from joy. For they all understood that the rumors had been false."
      ],
      questions: [
        {
          q: "What were the rumors flying around Ostia after the storm?",
          options: [
            "Everyone agreed that Ted had drowned",
            "Some said the ship had sunk and all the sailors had perished; others that it had reached Sardinia",
            "The ship had been captured by pirates",
            "Ted had decided to stay in Greece"
          ],
          answer: 1,
          explain: "«Aliī dīcēbant nāvem eius mersam esse et omnēs nautās periisse; aliī affirmābant nāvem ad Sardiniam pervēnisse» — two reports, both wrapped in the accusative + infinitive."
        },
        {
          q: "In «Affirmō eum vīvere», what is the sailor claiming?",
          options: [
            "That he orders Ted to live",
            "That Ted used to live in Ostia",
            "That he himself (the sailor) is alive",
            "That Ted is alive — accusative «eum» + infinitive «vīvere» after a verb of declaring"
          ],
          answer: 3,
          explain: "«affirmō» launches an indirect statement: «eum» (= Ted) is the accusative subject, «vīvere» the present infinitive — ‘I declare that he is alive.’ For himself the sailor would say «sē vīvere»."
        },
        {
          q: "According to Ted’s letter, what happened to the ship and the crew?",
          options: [
            "The ship was lost, but the sailors were saved",
            "Both ship and sailors were lost",
            "The ship was saved, but the sailors perished",
            "The ship reached Ostia with everyone aboard"
          ],
          answer: 0,
          explain: "«Dīcit nāvem quidem āmissam esse, sed nautās servātōs esse» — note the participles agreeing: «āmissam» with «nāvem», «servātōs» with «nautās»."
        },
        {
          q: "Why does Julia begin to weep at the end of the reading?",
          options: [
            "Because the letter confirms Ted’s death",
            "Because Lupo has been barking all day",
            "For joy, not grief — «nōn dolōre, sed laetitiā»",
            "Because the letter-carrier demanded money"
          ],
          answer: 2,
          explain: "The two ablatives of cause make the contrast: not from «dolor» (grief) but from «laetitia» (joy) — this unit’s favorite noun."
        }
      ]
    },
    {
      title: "Reditus et Convīvium",
      intro: "A sail from Sardinia, a reunion on the dock, and the happiest feast the house on the harbor has ever held.",
      paragraphs: [
        "Paucīs post diēbus Quinn, quī cotīdiē in portū sedēbat nāvēsque spectābat, procul vēlum cōnspexit. «Nāvis venit!» clāmāvit. «Putō eam ex Sardiniā venīre!» Tōta familia ad portum cucurrit; etiam canis Lupo, quī omnēs sequēbātur, magnā laetitiā lātrābat.",
        "Nāvis lentē appropinquābat, et Paula prīma avunculum cōnspexit. «Videō avunculum in nāve stāre!» clāmāvit. Vērē dīxerat: mox Ted in terrā stābat, sānus et incolumis, sed barba eius longa erat. Julia frātrem lacrimāns amplexa est; Paula eī multa ōscula dedit; Mark et Quinn eum quoque amplexī sunt. «Semper affirmābam tē vīvere!» inquit Quinn. Ted rīsit: «Bene putābās, mī Quinn. Vix crēdō mē vīvum esse — sed ecce, vīvō!»",
        "Vesperī familia reditum avunculī convīviō magnō celebrābat. Mēnsa cibō optimō plēna erat, pōcula vīnō plēna; omnēs ūnā cēnābant et carmina laeta cantābant. Ted multa dē naufragiō nārrāvit. Dīxit tempestātem maximam subitō factam esse; affirmāvit nāvem prope Sardiniam ad saxa iactātam et frāctam esse, sed sē cum nautīs in terram natāvisse. «Sciō deōs mē servāvisse», inquit; «eīs grātiās agō.» Affirmāvit sē novam nāvem parātūrum esse. «Putāsne mē mare timēre? Minimē! Prōmittō Quinn mēcum ōlim nāvigātūrum esse!» Quinn, hīs verbīs audītīs, beātissimus erat.",
        "Subitō clāmor: Lupo botulum ē mēnsā rapuerat et sub lectō dēvorābat! Omnēs rīsērunt. «Nunc vērē sciō mē domī esse», inquit Ted. Familia iterum ūnā beāta erat; Julia illā nocte deīs grātiās ēgit, quod frātrem suum vīvere sciēbat."
      ],
      glosses: {
        "paucīs": "a few (abl. — «paucīs post diēbus» = a few days later)",
        "post": "later, afterward (here an adverb inside «paucīs post diēbus»)",
        "diēbus": "days (abl. pl. of «diēs», 5th decl.)",
        "quinn": "Quinn, the son — his name never changes form",
        "quī": "who",
        "cotīdiē": "every day",
        "in": "in, on; (with acc.) onto, to",
        "portū": "the harbor (abl. — 4th decl.)",
        "sedēbat": "sat, used to sit",
        "nāvēsque": "and the ships (acc. pl.)",
        "spectābat": "watched, kept watching",
        "procul": "far off, in the distance",
        "vēlum": "a sail (acc.)",
        "cōnspexit": "caught sight of (perfect)",
        "nāvis": "a ship",
        "venit": "is coming",
        "clāmāvit": "(he/she) shouted (perfect)",
        "putō": "I think (that…)",
        "eam": "that it (acc. — the ship, subject of the infinitive)",
        "ex": "from, out of",
        "sardiniā": "Sardinia, a large island west of Italy (abl.)",
        "venīre": "is coming (lit. ‘to come’ — present infinitive)",
        "tōta": "the whole",
        "familia": "the family",
        "ad": "to, toward; against",
        "portum": "the harbor (acc.)",
        "cucurrit": "ran (perfect of «currō»)",
        "etiam": "even, also",
        "canis": "the dog («canis Lupo» = the dog Lupo)",
        "lupo": "Lupo, the family dog — quasi lupus, but far friendlier",
        "omnēs": "everyone, all",
        "sequēbātur": "was following (deponent «sequor» — active meaning)",
        "magnā": "great (abl.)",
        "laetitiā": "joy (abl. — «magnā laetitiā» = with great joy)",
        "lātrābat": "was barking",
        "lentē": "slowly",
        "appropinquābat": "was approaching",
        "et": "and",
        "paula": "Paula, the daughter",
        "prīma": "first — «prīma cōnspexit» = was the first to spot",
        "videō": "I see (that…) — verbs of seeing also take acc. + infinitive",
        "avunculum": "uncle (acc. — first the object of «cōnspexit», then subject of the infinitive «stāre»)",
        "nāve": "the ship (abl.)",
        "stāre": "standing (lit. ‘to stand’ — present infinitive)",
        "vērē": "truly",
        "dīxerat": "she had spoken (pluperfect)",
        "mox": "soon",
        "ted": "Ted, the uncle, Julia’s brother, the ship’s captain — his name never changes form",
        "terrā": "land (abl. — «in terrā» = on land)",
        "stābat": "was standing",
        "sānus": "healthy, sound",
        "incolumis": "unharmed, safe",
        "sed": "but",
        "barba": "beard",
        "eius": "his",
        "longa": "long",
        "erat": "was",
        "julia": "Julia, the mother",
        "frātrem": "her brother (acc.)",
        "lacrimāns": "weeping (present participle)",
        "amplexa": "«amplexa est» = (she) embraced (deponent «amplector» — passive shape, active meaning)",
        "est": "is; with «amplexa»: (she) embraced",
        "eī": "to him (dat.)",
        "multa": "many",
        "ōscula": "kisses (acc. pl.)",
        "dedit": "gave (perfect)",
        "mark": "Mark, the father — his name never changes form",
        "eum": "him (acc.)",
        "quoque": "also, too",
        "amplexī": "«amplexī sunt» = (they) embraced (deponent, masc. pl.)",
        "sunt": "are; with «amplexī»: (they) embraced",
        "semper": "always",
        "affirmābam": "I kept declaring (that…)",
        "tē": "that you (acc. — subject of the infinitive)",
        "vīvere": "are/is alive (lit. ‘to live’ — present infinitive)",
        "inquit": "said (used with quoted speech)",
        "rīsit": "laughed (perfect)",
        "bene": "well, rightly",
        "putābās": "you were thinking, you supposed",
        "mī": "my (voc. — «mī Quinn» = my dear Quinn; the indeclinable name keeps its one form even when addressed)",
        "vix": "scarcely, hardly",
        "crēdō": "I believe (that…)",
        "mē": "that I (acc. — subject of the infinitive)",
        "vīvum": "alive (agrees with «mē»)",
        "esse": "to be; am/is/are (inside the indirect statement)",
        "ecce": "look! behold!",
        "vīvō": "I am alive, I live",
        "vesperī": "in the evening",
        "reditum": "the return (acc. — 4th decl., from «redeō»)",
        "avunculī": "of (their) uncle (gen.)",
        "convīviō": "with a feast (abl.)",
        "magnō": "great (abl.)",
        "celebrābat": "was celebrating",
        "mēnsa": "the table",
        "cibō": "with food (abl. — after «plēna»)",
        "optimō": "excellent, the best (abl.)",
        "plēna": "full (of)",
        "pōcula": "the cups (nom. pl.)",
        "vīnō": "with wine (abl.)",
        "ūnā": "together",
        "cēnābant": "were dining",
        "carmina": "songs (acc. pl. of «carmen»)",
        "laeta": "joyful (acc. pl. neut.)",
        "cantābant": "were singing",
        "dē": "about, concerning",
        "naufragiō": "the shipwreck (abl.)",
        "nārrāvit": "told, related (perfect)",
        "dīxit": "he said (that…)",
        "tempestātem": "the storm (acc. — subject of the infinitive)",
        "maximam": "very great, huge (acc.)",
        "subitō": "suddenly",
        "factam": "«factam esse» = to have arisen, happened (perfect passive infinitive of «faciō»)",
        "affirmāvit": "he declared (that…)",
        "nāvem": "the ship (acc. — subject of the infinitive)",
        "prope": "near (+ acc.)",
        "sardiniam": "Sardinia (acc.)",
        "saxa": "rocks (acc. pl. — «ad saxa» = onto the rocks)",
        "iactātam": "hurled; «iactātam esse» = to have been hurled (perfect passive infinitive)",
        "frāctam": "broken; «frāctam esse» = to have been wrecked (perfect passive infinitive)",
        "sē": "that he himself (acc. — points back to the speaker, Ted)",
        "cum": "with",
        "nautīs": "his sailors (abl.)",
        "terram": "the land (acc. — «in terram» = to land)",
        "natāvisse": "to have swum (perfect infinitive of «natō»)",
        "sciō": "I know (that…)",
        "deōs": "the gods (acc. — subject of the infinitive)",
        "servāvisse": "to have saved (perfect infinitive) — «deōs mē servāvisse» = that the gods saved me",
        "eīs": "to them (dat.)",
        "grātiās": "thanks (acc. — «grātiās agere» = to give thanks)",
        "agō": "I give («grātiās agō» = I give thanks)",
        "novam": "new (acc.)",
        "parātūrum": "going to get ready; «parātūrum esse» = will prepare (future infinitive)",
        "putāsne": "do you think (that…)? («putās» + question-marker «-ne»)",
        "mare": "the sea (acc.)",
        "timēre": "fear (lit. ‘to fear’ — «mē mare timēre» = that I fear the sea)",
        "minimē": "not at all!",
        "prōmittō": "I promise (that…)",
        "mēcum": "with me («cum» attached to «mē»)",
        "ōlim": "one day (here, of the future)",
        "nāvigātūrum": "going to sail; «nāvigātūrum esse» = will sail (future infinitive — its ‑um ending shows that «Quinn» is the accusative subject)",
        "hīs": "these (abl. — with «verbīs»)",
        "verbīs": "words (abl. — «hīs verbīs audītīs» = these words having been heard)",
        "audītīs": "having been heard (ablative absolute)",
        "beātissimus": "the happiest, utterly blessed (superlative of «beātus»)",
        "clāmor": "a shout, an uproar",
        "botulum": "a sausage (acc.)",
        "ē": "from, out of",
        "mēnsā": "the table (abl.)",
        "rapuerat": "had snatched (pluperfect)",
        "sub": "under (+ abl.)",
        "lectō": "a couch (abl.)",
        "dēvorābat": "was devouring",
        "rīsērunt": "(they) laughed (perfect)",
        "nunc": "now",
        "domī": "at home (locative)",
        "iterum": "again",
        "beāta": "blessed, happy",
        "illā": "that (abl. — with «nocte»)",
        "nocte": "night (abl. — «illā nocte» = that night)",
        "deīs": "to the gods (dat.)",
        "ēgit": "gave («grātiās ēgit» = gave thanks; perfect of «agō»)",
        "quod": "because",
        "suum": "her own",
        "sciēbat": "she knew (that…)"
      },
      translation: [
        "A few days later Quinn, who sat in the harbor every day and watched the ships, caught sight of a sail far off. «A ship is coming!» he shouted. «I think it is coming from Sardinia!» The whole family ran to the harbor; even the dog Lupo, who followed them all, was barking with great joy.",
        "The ship slowly drew near, and Paula was the first to catch sight of their uncle. «I see uncle standing on the ship!» she shouted. She had spoken truly: soon Ted was standing on land, healthy and unharmed, though his beard was long. Julia, weeping, embraced her brother; Paula gave him many kisses; Mark and Quinn embraced him too. «I always declared that you were alive!» said Quinn. Ted laughed: «You thought well, my dear Quinn. I scarcely believe that I am alive myself — but look, I live!»",
        "In the evening the family celebrated their uncle’s return with a great feast. The table was full of excellent food, the cups full of wine; everyone dined together and sang joyful songs. Ted told many things about the shipwreck. He said that a huge storm had suddenly arisen; he declared that the ship had been hurled onto rocks near Sardinia and wrecked, but that he and his sailors had swum to land. «I know that the gods saved me,» he said; «I give them thanks.» He declared that he would get a new ship ready. «Do you think that I fear the sea? Not at all! I promise that Quinn will one day sail with me!» When these words had been heard, Quinn was utterly happy.",
        "Suddenly an uproar: Lupo had snatched a sausage from the table and was devouring it under a couch! Everyone laughed. «Now I truly know that I am home,» said Ted. The family, together again, was happy; that night Julia gave thanks to the gods, because she knew that her brother was alive."
      ],
      questions: [
        {
          q: "Who is the first to catch sight of Ted himself on the arriving ship?",
          options: [
            "Quinn",
            "Paula — «Paula prīma avunculum cōnspexit»",
            "Julia",
            "Lupo"
          ],
          answer: 1,
          explain: "Quinn spots the sail («vēlum cōnspexit»), but it is Paula who first sees the man: «Paula prīma avunculum cōnspexit»."
        },
        {
          q: "In «Dīxit tempestātem maximam subitō factam esse», when did the storm arise?",
          options: [
            "While he was telling the story",
            "It is still to come",
            "It never happened — the infinitive denies it",
            "Before the moment of speaking — the perfect infinitive «factam esse» reports an earlier event"
          ],
          answer: 3,
          explain: "«factam esse» is a perfect (passive) infinitive: inside a report, ‑isse forms and participle + «esse» point to time EARLIER than the saying verb «dīxit»."
        },
        {
          q: "What does Ted declare about his future plans?",
          options: [
            "He will get a new ship ready — and he promises that Quinn will one day sail with him",
            "He will never go to sea again",
            "He will move the family to Sardinia",
            "He will sell his ship and become a grain merchant"
          ],
          answer: 0,
          explain: "«Affirmāvit sē novam nāvem parātūrum esse … Prōmittō Quinn mēcum ōlim nāvigātūrum esse» — two future infinitives in ‑ūrum esse; «nāvigātūrum» shows that Quinn is the accusative subject."
        },
        {
          q: "What does Lupo do during the feast?",
          options: [
            "He sleeps through the whole dinner",
            "He howls at the moon",
            "He snatches a sausage from the table and devours it under a couch",
            "He runs back to the harbor"
          ],
          answer: 2,
          explain: "«Lupo botulum ē mēnsā rapuerat et sub lectō dēvorābat» — the pluperfect «rapuerat»: by the time anyone shouted, the theft was already history. Some things never change."
        }
      ]
    }
  ],

  quiz: [
    {
      prompt: "In «Nūntius dīcit avunculum vīvere», what is being said?",
      options: [
        "The messenger tells the uncle to live",
        "The messenger says that the uncle is alive",
        "The uncle says that the messenger is alive",
        "The messenger and the uncle are both alive"
      ],
      answer: 1,
      explain: "After «dīcit», the accusative «avunculum» is the subject of the infinitive «vīvere»: an indirect statement — ‘says THAT the uncle is alive’."
    },
    {
      prompt: "Which sentence says «Julia thinks that the ship was lost»?",
      options: [
        "Julia putat nāvem āmissam esse",
        "Julia nāvem āmīsit",
        "Julia dīcit sē nāvem āmīsisse",
        "Nauta putat Juliam āmissam esse"
      ],
      answer: 0,
      explain: "«putat» + accusative subject «nāvem» + perfect passive infinitive «āmissam esse» = ‘thinks that the ship was lost’. The others say Julia lost it herself, or that JULIA was lost (note the accusative «Juliam»)."
    },
    {
      prompt: "In «Nauta affirmat sē Ted vīdisse», when did the sailor see Ted?",
      options: [
        "At the same moment he is speaking",
        "Before the moment of speaking — «vīdisse» is a perfect infinitive",
        "After he speaks, at some future time",
        "Never — the sentence denies it"
      ],
      answer: 1,
      explain: "The ‑isse ending marks the perfect infinitive: time EARLIER than the main verb. «Affirmat sē Ted vīdisse» = he declares that he SAW Ted; «sē» is the subject of the report, Ted its object."
    },
    {
      prompt: "«Scrībit sē mox domum reditūrum esse.» What is Ted saying about his return?",
      options: [
        "He has already returned home",
        "He is returning at this very moment",
        "He will soon return home — «reditūrum esse» is a future infinitive",
        "He does not want to return home"
      ],
      answer: 2,
      explain: "The participle in ‑ūrus + «esse» is the future infinitive: time LATER than the saying. ‘He writes that he will soon return home.’"
    },
    {
      prompt: "In «Ted dīcit sē valēre», who is well?",
      options: [
        "Ted himself — «sē» points back to the subject of the saying verb",
        "Somebody other than Ted",
        "The person Ted is talking to",
        "No one — «sē» makes the verb negative"
      ],
      answer: 0,
      explain: "Inside an indirect statement, «sē» refers to the reporter: Ted says that HE (Ted) is well. For another man, Latin would say «eum valēre»."
    },
    {
      prompt: "What does «Nauta negat avunculum mortuum esse» mean?",
      options: [
        "The sailor asks whether the uncle is dead",
        "The sailor says that the uncle is dead",
        "The sailor orders the uncle not to die",
        "The sailor says that the uncle is NOT dead — «negō» = ‘say that…not’"
      ],
      answer: 3,
      explain: "Latin prefers one verb, «negō», where English says ‘say that…not’. So «negat avunculum mortuum esse» = he denies that the uncle is dead."
    },
    {
      prompt: "Which of these verbs should make you expect an accusative + infinitive after it?",
      options: [
        "ambulat",
        "amplectitur",
        "affirmat",
        "appropinquat"
      ],
      answer: 2,
      explain: "«affirmō» is a verb of declaring, so it launches an indirect statement. Walking, embracing, and approaching report nothing — no acc. + inf. after them."
    },
    {
      prompt: "In «Omnēs intellēxērunt rūmōrēs falsōs fuisse», what does «fuisse» tell you?",
      options: [
        "The rumors are false right now",
        "The rumors will turn out to be false",
        "«fuisse» is a command: be false!",
        "The rumors HAD BEEN false — perfect infinitive of «sum», time earlier than the understanding"
      ],
      answer: 3,
      explain: "«fuisse» is the perfect infinitive of «sum»: inside the report it points to earlier time — everyone understood that the rumors had been false all along."
    }
  ]
});
