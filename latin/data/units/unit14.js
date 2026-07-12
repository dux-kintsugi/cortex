registerUnit({
  id: 14,
  stage: 2,
  title: "Rōma!",
  tagline: "The perfect tense — the tense things happened in",

  grammar: [
    {
      heading: "The perfect: the «it happened» tense",
      body: "<p>Last unit you met the imperfect — the tense of background, of <em>was doing</em>. Now comes its partner, the <strong>perfect</strong>: the tense of events. <span class=\"la\">Nāvis nāvigābat</span> — the ship <em>was sailing</em> (scene-setting, camera panning). <span class=\"la\">Quinn urbem cōnspexit</span> — Quinn <em>caught sight of</em> the city (click — it happened, once, done).</p><p>English renders the Latin perfect two ways, and both are right: <span class=\"la\">vīdī</span> can be <em>I saw</em> or <em>I have seen</em>. Context decides; don't agonize. The endings are unlike anything you have met so far — which is good news, because that makes them unmistakable.</p>",
      table: {
        caption: "The perfect endings — «vīdī» (I saw, I have seen)",
        headers: ["Latin", "Who?", "English"],
        rows: [
          ["vīdī", "I", "I saw, I have seen"],
          ["vīdistī", "you (sg.)", "you saw"],
          ["vīdit", "he / she / it", "he saw"],
          ["vīdimus", "we", "we saw"],
          ["vīdistis", "you (pl.)", "you (all) saw"],
          ["vīdērunt", "they", "they saw"]
        ]
      },
      tip: "Reading tip: in stories, -it (he did) and -ērunt (they did) carry the plot. Spot them and you hold the chain of events."
    },
    {
      heading: "Four flavors of perfect stem",
      body: "<p>Every verb builds its perfect on a special <strong>perfect stem</strong>. You never have to build one yourself — this is a reading course — you only have to recognize one when it walks past. Luckily they come in four common flavors, shown below.</p><p>Watch out for the sneakiest pairs, where a single long vowel is the <strong>only</strong> difference: <span class=\"la\">venit</span> <em>he comes</em>, but <span class=\"la\">vēnit</span> <em>he came</em>; <span class=\"la\">fugit</span> <em>he flees</em>, but <span class=\"la\">fūgit</span> <em>he fled</em>. The macron is doing real work here — read it!</p>",
      table: {
        caption: "How perfect stems look",
        headers: ["Flavor", "Examples", "What to notice"],
        rows: [
          ["added -v-", "amāvit, nāvigāvit, audīvit, dormīvit", "a v right before the ending"],
          ["added -u-", "habuit, stupuit, potuit", "a u right before the ending"],
          ["-s- or -x-", "mānsit, rīsit, dūxit, cōnspexit", "a hiss or an x"],
          ["changed vowel", "vēnit, vīdit, fūgit, fēcit", "a longer (or different) vowel than the present"]
        ]
      },
      tip: "Mystery verb form? Try the four flavors in reverse: strip the -v- or -u-, un-hiss the s/x, or shorten the vowel — the present you already know usually appears."
    },
    {
      heading: "«Fuī» and «potuī» — was and could, as events",
      body: "<p><span class=\"la\">Sum</span> and <span class=\"la\">possum</span> have perfects too. <span class=\"la\">Fuī</span> is <em>I was / I have been</em>, viewed as a completed fact: <span class=\"la\">hodiē in urbe fuimus!</span> — <em>today we were (actually) in the city!</em> <span class=\"la\">Potuī</span> is <em>I was able, I could</em>: <span class=\"la\">Quinn dormīre nōn potuit</span> — <em>Quinn could not sleep</em> (he tried, it is over, he failed).</p><p>Compare the imperfects from last unit: <span class=\"la\">erat</span> paints the scene (<em>it was night</em>), <span class=\"la\">fuit</span> reports the fact (<em>he was there — done</em>).</p>",
      table: {
        caption: "sum → fuī, possum → potuī",
        headers: ["sum → fuī", "possum → potuī", "Who?"],
        rows: [
          ["fuī", "potuī", "I"],
          ["fuistī", "potuistī", "you (sg.)"],
          ["fuit", "potuit", "he / she / it"],
          ["fuimus", "potuimus", "we"],
          ["fuistis", "potuistis", "you (pl.)"],
          ["fuērunt", "potuērunt", "they"]
        ]
      }
    },
    {
      heading: "Two cameras: imperfect for the scene, perfect for the event",
      body: "<p>A Roman storyteller runs two cameras at once. The <strong>imperfect</strong> is the slow wide pan: what the scene looked like, what was going on all the while. The <strong>perfect</strong> is the snapshot: what happened next. <span class=\"la\">Puerī dormiēbant; subitō canis lātrāvit.</span> — <em>The children were sleeping; suddenly the dog barked.</em></p><p>Two of this unit's new words love the perfect. <span class=\"la\">Postquam</span> (<em>after</em>) introduces a completed event: <span class=\"la\">postquam cēnam habuērunt, dormīvērunt</span> — <em>after they had dinner, they slept</em>. And <span class=\"la\">numquam</span> / <span class=\"la\">umquam</span> pair with it for lifetime claims: <span class=\"la\">numquam tantam urbem vīdī!</span> — <em>I have never seen so great a city!</em></p>",
      tip: "When «subitō», «statim», «postquam», or «tandem» shows up, brace for a perfect — something is about to HAPPEN."
    }
  ],

  vocab: [
    {
      latin: "herī",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "yesterday",
      example: "Herī ad urbem pervēnimus.",
      exampleGloss: "Yesterday we arrived at the city."
    },
    {
      latin: "perveniō",
      forms: "pervenīre, pervēnī, perventum",
      pos: "verb (4th conj.)",
      gloss: "arrive, reach",
      example: "Tandem ad portās urbis pervēnimus.",
      exampleGloss: "At last we reached the gates of the city."
    },
    {
      latin: "ascendō",
      forms: "ascendere, ascendī, ascēnsum",
      pos: "verb (3rd conj.)",
      gloss: "climb, go up",
      example: "Puerī montem ascendērunt.",
      exampleGloss: "The children climbed the hill."
    },
    {
      latin: "cōnspiciō",
      forms: "cōnspicere, cōnspexī, cōnspectum",
      pos: "verb (3rd conj. -iō)",
      gloss: "catch sight of",
      example: "Paula statuam magnam cōnspexit.",
      exampleGloss: "Paula caught sight of a great statue."
    },
    {
      latin: "stupeō",
      forms: "stupēre, stupuī",
      pos: "verb (2nd conj.)",
      gloss: "be amazed, be stunned",
      example: "Puer stupuit, quod urbs tanta erat.",
      exampleGloss: "The boy was stunned, because the city was so big."
    },
    {
      latin: "gaudeō",
      forms: "gaudēre",
      pos: "verb (2nd conj.)",
      gloss: "rejoice, be glad",
      example: "Paula gaudet et rīdet.",
      exampleGloss: "Paula is glad and laughs."
    },
    {
      latin: "mīrus",
      forms: "-a, -um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "amazing, wonderful",
      example: "Fābula avunculī mīra erat.",
      exampleGloss: "The uncle's story was amazing."
    },
    {
      latin: "tantus",
      forms: "-a, -um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "so great, so large",
      example: "Tanta erat turba!",
      exampleGloss: "So great was the crowd!"
    },
    {
      latin: "Rōmānus",
      forms: "-a, -um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "Roman",
      example: "Templa Rōmāna alta sunt.",
      exampleGloss: "Roman temples are tall."
    },
    {
      latin: "spectāculum",
      forms: "spectāculī, n.",
      pos: "noun (2nd decl.)",
      gloss: "sight, spectacle, show",
      example: "Spectāculum mīrum vīdimus.",
      exampleGloss: "We saw an amazing sight."
    },
    {
      latin: "amphitheātrum",
      forms: "amphitheātrī, n.",
      pos: "noun (2nd decl.)",
      gloss: "amphitheater",
      example: "Amphitheātrum magnum cōnspeximus.",
      exampleGloss: "We caught sight of the great amphitheater."
    },
    {
      latin: "circus",
      forms: "circī, m.",
      pos: "noun (2nd decl.)",
      gloss: "circus, racetrack",
      example: "In circō equī celeriter currunt.",
      exampleGloss: "In the racetrack the horses run fast."
    },
    {
      latin: "thermae",
      forms: "thermārum, f. pl.",
      pos: "noun (1st decl., pl. only)",
      gloss: "public baths",
      example: "Mark in thermīs natāvit.",
      exampleGloss: "Mark swam in the public baths."
    },
    {
      latin: "columna",
      forms: "columnae, f.",
      pos: "noun (1st decl.)",
      gloss: "column, pillar",
      example: "Columnae templī altae sunt.",
      exampleGloss: "The temple's columns are tall."
    },
    {
      latin: "turris",
      forms: "turris, f. (acc. turrim)",
      pos: "noun (3rd decl.)",
      gloss: "tower",
      example: "Turrim altam procul vīdimus.",
      exampleGloss: "We saw a tall tower in the distance."
    },
    {
      latin: "palātium",
      forms: "palātiī, n.",
      pos: "noun (2nd decl.)",
      gloss: "palace",
      example: "Palātium imperātōris in monte stat.",
      exampleGloss: "The emperor's palace stands on the hill."
    },
    {
      latin: "caupōna",
      forms: "caupōnae, f.",
      pos: "noun (1st decl.)",
      gloss: "inn",
      example: "In caupōnā parvā dormīvimus.",
      exampleGloss: "We slept in a small inn."
    },
    {
      latin: "clāmor",
      forms: "clāmōris, m.",
      pos: "noun (3rd decl.)",
      gloss: "shout, shouting",
      example: "Clāmōrem turbae audīvī.",
      exampleGloss: "I heard the shouting of the crowd."
    },
    {
      latin: "sonus",
      forms: "sonī, m.",
      pos: "noun (2nd decl.)",
      gloss: "sound",
      example: "Sonī urbis mīrī sunt.",
      exampleGloss: "The sounds of the city are amazing."
    },
    {
      latin: "somnus",
      forms: "somnī, m.",
      pos: "noun (2nd decl.)",
      gloss: "sleep",
      example: "Somnus tamen nōn vēnit.",
      exampleGloss: "Sleep, however, did not come."
    },
    {
      latin: "statim",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "immediately",
      example: "Lupo botulum statim dēvorāvit.",
      exampleGloss: "Lupo immediately devoured the sausage."
    },
    {
      latin: "numquam",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "never",
      example: "Numquam tantam urbem vīdī.",
      exampleGloss: "I have never seen so great a city."
    },
    {
      latin: "umquam",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "ever",
      example: "Vīdistīne umquam palātium?",
      exampleGloss: "Have you ever seen the palace?"
    },
    {
      latin: "vērō",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "indeed, truly",
      example: "Urbs vērō mīra est.",
      exampleGloss: "The city is truly amazing."
    },
    {
      latin: "postquam",
      forms: "(conj.)",
      pos: "conjunction",
      gloss: "after",
      example: "Postquam cēnam habuimus, dormīvimus.",
      exampleGloss: "After we had dinner, we slept."
    }
  ],

  readings: [
    {
      title: "Ad Portās Rōmae",
      intro: "After days on the river, Ted's boat brings the family to Rome at last — just as night falls.",
      paragraphs: [
        "Herī familia Fabia ad urbem Rōmam tandem pervēnit. Nāvis per flūmen lentē nāvigābat; Quinn et Paula in nāve stābant et rīpās spectābant. Subitō Quinn turrēs et templa procul cōnspexit. «Ecce!» clāmāvit. «Urbem videō! Rōmam videō!» Paula gaudēbat; canis Lupo lātrābat.",
        "Postquam nāvis ad rīpam vēnit, Mark et Julia et puerī ē nāve discessērunt. Avunculus Ted tamen in nāve mānsit, quod nauta bonus semper prope nāvem manet. Lupo statim in terram fūgit; canis nāvēs nōn amat.",
        "Iam nox erat. Familia fessa per portam urbis ambulāvit et caupōnam prope forum invēnit. Ibi cēnam bonam habuērunt; deinde puerī in lectīs statim dormīvērunt. Quinn tamen dormīre nōn potuit, quod sonōs urbis audiēbat: clāmōrēs, sonōs mīrōs. Tandem somnus vēnit."
      ],
      glosses: {
        "herī": "yesterday",
        "familia": "family",
        "fabia": "Fabian — the family of Fabius",
        "ad": "to",
        "urbem": "city (acc.)",
        "rōmam": "Rome (acc.)",
        "tandem": "at last",
        "pervēnit": "arrived, reached (perfect — the long ē marks it; «pervenit» would be present)",
        "nāvis": "ship",
        "per": "through, along",
        "flūmen": "river",
        "lentē": "slowly",
        "nāvigābat": "was sailing (imperfect — background)",
        "quinn": "Quinn (the son — his name never changes form)",
        "et": "and",
        "paula": "Paula (the daughter — her name declines: Paula, Paulae, Paulam…)",
        "in": "in, on; (+ acc.) into, onto",
        "nāve": "ship (abl. after «in»)",
        "stābant": "were standing (imperfect)",
        "rīpās": "banks (acc. pl.)",
        "spectābant": "were watching (imperfect)",
        "subitō": "suddenly",
        "turrēs": "towers (acc. pl.)",
        "templa": "temples (acc. pl.)",
        "procul": "far off, in the distance",
        "cōnspexit": "caught sight of (perfect of «cōnspiciō»)",
        "ecce": "look!",
        "clāmāvit": "shouted (perfect)",
        "videō": "I see",
        "gaudēbat": "was overjoyed (imperfect)",
        "lupo": "Lupo (the dog — quasi lupus! his name never changes form)",
        "lātrābat": "was barking (imperfect)",
        "postquam": "after",
        "rīpam": "bank (acc.)",
        "vēnit": "came (perfect — long ē; «venit» would be present)",
        "mark": "Mark (the father — his name never changes form)",
        "julia": "Julia (the mother — her name declines: Julia, Juliae, Juliam…)",
        "puerī": "the children (nom. pl.)",
        "ē": "out of, off",
        "discessērunt": "departed, went off (perfect of «discēdō»)",
        "avunculus": "uncle (mother's brother)",
        "ted": "Ted (Julia's brother, the ship's captain)",
        "tamen": "however",
        "mānsit": "stayed (perfect of «maneō»)",
        "quod": "because",
        "nauta": "sailor",
        "bonus": "good",
        "semper": "always",
        "prope": "near",
        "nāvem": "ship (acc.)",
        "manet": "stays (present — a general truth)",
        "statim": "immediately",
        "terram": "land, dry ground (acc.)",
        "fūgit": "fled (perfect — long ū; «fugit» would be present)",
        "canis": "dog",
        "nāvēs": "ships (acc. pl.)",
        "nōn": "not",
        "amat": "loves",
        "iam": "by now, already",
        "nox": "night",
        "erat": "it was (imperfect of «sum»)",
        "fessa": "tired",
        "portam": "gate (acc.)",
        "urbis": "of the city (gen.)",
        "ambulāvit": "walked (perfect)",
        "caupōnam": "inn (acc.)",
        "forum": "forum, public square",
        "invēnit": "found (perfect — long ē; «invenit» would be present)",
        "ibi": "there",
        "cēnam": "dinner (acc.)",
        "bonam": "good (acc.)",
        "habuērunt": "(they) had (perfect of «habeō»)",
        "deinde": "then",
        "lectīs": "beds (abl. pl.)",
        "dormīvērunt": "fell asleep, slept (perfect)",
        "dormīre": "to sleep (infinitive)",
        "potuit": "was able, could (perfect of «possum»)",
        "sonōs": "sounds (acc. pl.)",
        "audiēbat": "kept hearing (imperfect)",
        "clāmōrēs": "shouts (acc. pl.)",
        "mīrōs": "strange, amazing (acc. pl.)",
        "somnus": "sleep (nom.)"
      },
      translation: [
        "Yesterday the Fabius family at last arrived at the city of Rome. The ship was sailing slowly along the river; Quinn and Paula were standing on the ship and watching the banks. Suddenly Quinn caught sight of towers and temples in the distance. «Look!» he shouted. «I see the city! I see Rome!» Paula was overjoyed; Lupo the dog was barking.",
        "After the ship came to the bank, Mark and Julia and the children went off the ship. Uncle Ted, however, stayed on the ship, because a good sailor always stays near his ship. Lupo immediately fled onto dry land; the dog does not love ships.",
        "By now it was night. The tired family walked through the city gate and found an inn near the forum. There they had a good dinner; then the children fell asleep at once in their beds. Quinn, however, could not sleep, because he kept hearing the sounds of the city: shouts, strange sounds. At last sleep came."
      ],
      questions: [
        {
          q: "When did the family reach Rome?",
          options: ["A month ago", "This very morning", "Yesterday", "They have not arrived yet"],
          answer: 2,
          explain: "«Herī familia … pervēnit» — the adverb «herī» (yesterday) plus the perfect «pervēnit» (they arrived — done)."
        },
        {
          q: "Why did Uncle Ted stay on the boat?",
          options: ["He was too tired to walk", "A good sailor always stays near his ship", "He was afraid of the crowds", "He wanted to guard the dinner"],
          answer: 1,
          explain: "«nauta bonus semper prope nāvem manet» — a good sailor always stays near the ship. Note the present tense for a general truth."
        },
        {
          q: "«Cōnspexit» tells you that Quinn…",
          options: ["was gazing at the banks for a long time", "is catching sight of them right now", "wants to catch sight of them", "caught sight of them — a single completed event"],
          answer: 3,
          explain: "«cōnspexit» has the -x- perfect stem (cōnspiciō → cōnspexī): a snapshot event, not ongoing background."
        },
        {
          q: "Why couldn't Quinn fall asleep?",
          options: ["The bed was hard", "Lupo was barking all night", "He kept hearing the sounds of the city", "He was hungry"],
          answer: 2,
          explain: "«dormīre nōn potuit, quod sonōs urbis audiēbat» — he could not sleep because he kept hearing (imperfect!) the city's sounds."
        }
      ]
    },
    {
      title: "Multa Mīra",
      intro: "The next morning Mark leads everyone out into the city for a day of firsts.",
      paragraphs: [
        "Mark familiam per viās urbis dūxit. In forō Rōmānō stetērunt et stupuērunt: templa alta, columnae albae, statuae deōrum ibi erant; turba tanta per forum properābat. «Numquam tanta aedificia vīdī!» inquit Quinn. «Templa Ostiae parva sunt; templa Rōmāna vērō tanta sunt!»",
        "Deinde ad amphitheātrum vēnērunt, aedificium tantum. Quinn stupuit et rogāvit: «Habitantne deī in aedificiō tantō?» Mark rīsit et respondit: «Minimē! Ibi Rōmānī spectācula spectant.» Mox in circō equōs cōnspexērunt; equī celeriter currēbant.",
        "Tum puerī montem Palātīnum ascendērunt et palātium imperātōris cōnspexērunt. «Estne domus?» rogāvit Paula. «Ita,» inquit Mark, «domus imperātōris est. Imperātor in domō parvā nōn habitat!» Pater fessus in thermās intrāvit. Lupo quoque in thermās fūgit — et in aquā natāvit! Virī Rōmānī clāmāvērunt; Paula rīsit; Mark īrātus canem ex aquā trāxit.",
        "Tandem nox vēnit et familia fessa ad caupōnam ambulāvit. «Vīdistīne umquam tantam urbem?» rogāvit Quinn. «Minimē, numquam!» respondit Paula. «Hodiē multa mīra vīdimus: forum, amphitheātrum, circum, palātium — et canem in thermīs!» Mark rīsit: «Herī urbem procul vīdimus; hodiē in mediā urbe fuimus!» Lupo dormiēbat: canis quoque fessus erat."
      ],
      glosses: {
        "mark": "Mark (the father)",
        "familiam": "family (acc.)",
        "per": "through",
        "viās": "streets (acc. pl.)",
        "urbis": "of the city (gen.)",
        "dūxit": "led (perfect of «dūcō»)",
        "in": "in, on; (+ acc.) into",
        "forō": "forum (abl. after «in»)",
        "rōmānō": "Roman (abl.)",
        "stetērunt": "(they) stood still, came to a halt (perfect of «stō»)",
        "et": "and",
        "stupuērunt": "(they) were stunned (perfect of «stupeō»)",
        "templa": "temples (nom./acc. pl.)",
        "alta": "tall (n. pl.)",
        "columnae": "columns (nom. pl.)",
        "albae": "white (nom. pl.)",
        "statuae": "statues (nom. pl.)",
        "deōrum": "of the gods (gen. pl.)",
        "ibi": "there",
        "erant": "there were (imperfect)",
        "turba": "crowd",
        "tanta": "so great (nom.)",
        "forum": "forum (acc. after «per»)",
        "properābat": "was hurrying (imperfect)",
        "numquam": "never",
        "aedificia": "buildings (acc. pl.)",
        "vīdī": "I have seen (perfect of «videō»)",
        "inquit": "he/she says, said (with quotations)",
        "quinn": "Quinn (the son)",
        "ostiae": "of Ostia (gen.)",
        "parva": "small (n. pl.)",
        "sunt": "(they) are",
        "rōmāna": "Roman (n. pl.)",
        "vērō": "truly, indeed",
        "deinde": "next, then",
        "ad": "to",
        "amphitheātrum": "amphitheater (acc.)",
        "vēnērunt": "(they) came (perfect of «veniō»)",
        "aedificium": "a building",
        "tantum": "so large",
        "stupuit": "was stunned (perfect)",
        "rogāvit": "asked (perfect of «rogō»)",
        "habitantne": "do (they) live…? («habitant» + the question-tag «-ne»)",
        "deī": "gods (nom. pl.)",
        "aedificiō": "building (abl. after «in»)",
        "tantō": "so great (abl.)",
        "rīsit": "laughed (perfect of «rīdeō»)",
        "respondit": "answered (perfect of «respondeō»)",
        "minimē": "no! not at all",
        "rōmānī": "the Romans (adjective used as a noun)",
        "spectācula": "shows, spectacles (acc. pl.)",
        "spectant": "(they) watch (present — a general truth)",
        "mox": "soon",
        "circō": "racetrack (abl. after «in»)",
        "equōs": "horses (acc. pl.)",
        "cōnspexērunt": "(they) caught sight of (perfect of «cōnspiciō»)",
        "equī": "horses (nom. pl.)",
        "celeriter": "quickly",
        "currēbant": "were running (imperfect)",
        "tum": "then",
        "puerī": "the children (nom. pl.)",
        "montem": "hill (acc.)",
        "palātīnum": "Palatine — the hill where the emperors lived",
        "ascendērunt": "climbed (perfect of «ascendō»)",
        "palātium": "palace (acc.)",
        "thermīs": "the baths (abl. pl. — in the baths)",
        "imperātōris": "of the emperor (gen.)",
        "estne": "is it…? («est» + «-ne»)",
        "domus": "a house",
        "paula": "Paula (the daughter)",
        "pater": "father",
        "ita": "yes",
        "est": "it is",
        "imperātor": "the emperor",
        "domō": "house (abl. after «in»)",
        "parvā": "small (abl.)",
        "nōn": "not",
        "habitat": "lives",
        "fessus": "tired",
        "thermās": "the public baths (acc. — «in» + acc. = into)",
        "intrāvit": "entered, went into (perfect)",
        "lupo": "Lupo (the dog)",
        "quoque": "also, too",
        "fūgit": "dashed, ran off (perfect — long ū marks it)",
        "aquā": "water (abl.)",
        "natāvit": "swam (perfect of «natō»)",
        "virī": "men (nom. pl.)",
        "clāmāvērunt": "(they) shouted (perfect)",
        "īrātus": "angry",
        "canem": "dog (acc.)",
        "ex": "out of",
        "trāxit": "dragged (perfect of «trahō»)",
        "tandem": "at last",
        "nox": "night",
        "vēnit": "came (perfect — long ē)",
        "familia": "family",
        "fessa": "tired",
        "caupōnam": "inn (acc.)",
        "ambulāvit": "walked (perfect)",
        "vīdistīne": "have you ever seen…? («vīdistī», you saw, + «-ne»)",
        "umquam": "ever",
        "tantam": "so great (acc.)",
        "urbem": "city (acc.)",
        "hodiē": "today",
        "multa": "many things (n. pl.)",
        "mīra": "amazing (n. pl. — «many amazing things»)",
        "vīdimus": "we saw, we have seen (perfect)",
        "circum": "racetrack (acc.)",
        "herī": "yesterday",
        "procul": "from afar",
        "mediā": "the middle of (abl.)",
        "urbe": "city (abl. after «in»)",
        "fuimus": "we were, we have been (perfect of «sum»)",
        "dormiēbat": "was (already) sleeping (imperfect)",
        "canis": "dog",
        "erat": "was (imperfect)"
      },
      translation: [
        "Mark led the family through the streets of the city. In the Roman Forum they stopped and were stunned: tall temples, white columns, statues of the gods were there; a huge crowd was hurrying through the forum. «I have never seen such great buildings!» said Quinn. «The temples of Ostia are small; Roman temples are truly enormous!»",
        "Next they came to the amphitheater, so large a building. Quinn was stunned and asked: «Do gods live in so great a building?» Mark laughed and answered: «Not at all! There the Romans watch shows.» Soon they caught sight of horses in the racetrack; the horses were running fast.",
        "Then the children climbed the Palatine hill and caught sight of the emperor's palace. «Is it a house?» asked Paula. «Yes,» said Mark, «it is the emperor's house. The emperor does not live in a small house!» The tired father went into the public baths. Lupo dashed into the baths too — and swam in the water! Roman men shouted; Paula laughed; an angry Mark dragged the dog out of the water.",
        "At last night came, and the tired family walked back to the inn. «Have you ever seen so great a city?» asked Quinn. «No, never!» answered Paula. «Today we saw many amazing things: the forum, the amphitheater, the racetrack, the palace — and a dog in the public baths!» Mark laughed: «Yesterday we saw the city from afar; today we have been in the very middle of the city!» Lupo was already sleeping: the dog, too, was tired."
      ],
      questions: [
        {
          q: "What did Quinn wonder about the amphitheater?",
          options: ["Whether gods lived in it", "Whether it was the emperor's palace", "How much it had cost to build", "Whether Uncle Ted had ever seen it"],
          answer: 0,
          explain: "«Habitantne deī in aedificiō tantō?» — do gods live in so great a building? Mark laughs: no, the Romans watch shows there."
        },
        {
          q: "«Stetērunt et stupuērunt» tells you that the family…",
          options: ["stands and stares (present)", "was standing and staring all along (imperfect)", "stopped and was stunned — completed events (perfect)", "will stop and stare"],
          answer: 2,
          explain: "Both verbs end in -ērunt, the perfect «they» ending: two snapshot events in a row — they halted, they were stunned."
        },
        {
          q: "What did Lupo do at the baths?",
          options: ["He stole a bather's tunic", "He dashed in and swam in the water", "He fell asleep at the door", "He bit a Roman"],
          answer: 1,
          explain: "«Lupo quoque in thermās fūgit — et in aquā natāvit!» — he dashed into the baths and swam. Hence the shouting Romans and the angry Mark."
        },
        {
          q: "«Hodiē in mediā urbe fuimus» — Mark means that…",
          options: ["they will be in the city today", "today they have actually been in the middle of the city", "they lived in the city long ago, as children", "they can visit the city today"],
          answer: 1,
          explain: "«fuimus» is the perfect of «sum»: we were / we have been — a completed fact, contrasted with «herī … procul vīdimus» (yesterday we only saw it from afar)."
        }
      ]
    }
  ],

  quiz: [
    {
      prompt: "In «Familia ad urbem Rōmam pervēnit», how do you know «pervēnit» is perfect and not present?",
      options: ["The word order of the sentence", "The long ē — the present would be «pervenit»", "The -t ending", "You cannot tell without more context"],
      answer: 1,
      explain: "«Perveniō» belongs to the vowel-change flavor: present «pervenit», perfect «pervēnit». The macron is the whole difference — the -t ending appears in both."
    },
    {
      prompt: "Which ending tells you THEY did something in the perfect?",
      options: ["-ērunt", "-nt", "-bant", "-tis"],
      answer: 0,
      explain: "«-ērunt» is the perfect «they» ending (clāmāvērunt, vēnērunt). Plain «-nt» is present; «-bant» is imperfect."
    },
    {
      prompt: "«Vīdistī» means…",
      options: ["you saw / you have seen", "you see", "you were seeing", "they saw"],
      answer: 0,
      explain: "«-istī» is the perfect «you (sg.)» ending on the perfect stem vīd-. The present would be «vidēs», the imperfect «vidēbās»."
    },
    {
      prompt: "Which of these is the perfect of «maneō» (stay)?",
      options: ["manet", "manēbat", "manēre", "mānsit"],
      answer: 3,
      explain: "«Mānsit» shows the -s- perfect flavor: maneō → mānsī. «Manet» is present, «manēbat» imperfect, «manēre» the infinitive."
    },
    {
      prompt: "«Fuī» is the perfect of which verb?",
      options: ["faciō", "sum", "fugiō", "possum"],
      answer: 1,
      explain: "Sum → fuī (I was / I have been). The lookalikes go elsewhere: faciō → fēcī, fugiō → fūgī, possum → potuī."
    },
    {
      prompt: "In «Postquam cēnam habuērunt, dormīvērunt», which happened first?",
      options: ["Both at exactly the same time", "The sleeping", "Impossible to say", "The dinner"],
      answer: 3,
      explain: "«Postquam» (after) introduces the earlier event: after they had dinner, they slept. Both verbs are perfect — two completed events in order."
    },
    {
      prompt: "«Turba clāmābat» — the -bat ending presents the shouting as…",
      options: ["a single completed event", "ongoing background noise", "about to happen", "a command"],
      answer: 1,
      explain: "«-bat» is the imperfect: the crowd was shouting all the while, as background. A single completed shout would be the perfect «clāmāvit»."
    },
    {
      prompt: "«Numquam tantam urbem vīdī» — the speaker is saying that…",
      options: ["he has never seen so great a city", "he never wants to see the city", "the city can never be seen", "he did not see the city clearly"],
      answer: 0,
      explain: "«Numquam» (never) with the perfect «vīdī» (I have seen) makes a lifetime claim: never in my life have I seen so great a city."
    }
  ]
});
