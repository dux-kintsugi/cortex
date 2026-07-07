registerUnit({
  id: 8,
  stage: 1,
  title: "In Lūdō",
  tagline: "The whole present tense, ego/tū/nōs/vōs, and yes/no questions",

  grammar: [
    {
      heading: "One verb, six people",
      body: "<p>Until now, every verb you have read ended in <span class=\"la\">-t</span> (one person doing it) or <span class=\"la\">-nt</span> (several people doing it). Time to meet the whole family. A Latin verb carries its subject on its ending — all six possible subjects, no pronoun required.</p><p>So <span class=\"la\">amō</span> is a complete sentence: <em>I love</em>. <span class=\"la\">Habēmus</span> is a complete sentence: <em>we have</em>. The ending IS the subject. Once these six endings are automatic, half of every Latin sentence reads itself.</p>",
      table: {
        caption: "«amāre» (to love) in the present — all six persons",
        headers: ["Latin", "Who?", "English"],
        rows: [
          ["amō", "I", "I love, I am loving"],
          ["amās", "you (sg.)", "you love"],
          ["amat", "he / she / it", "he loves"],
          ["amāmus", "we", "we love"],
          ["amātis", "you (pl.)", "you (all) love"],
          ["amant", "they", "they love"]
        ]
      },
      tip: "Reading tip: glance at the verb's ending before anything else — it hands you the subject for free."
    },
    {
      heading: "«Videō, vidēs…» — and the new school verbs",
      body: "<p>The <span class=\"la\">-eō</span> verbs you know (<span class=\"la\">videō, habeō, sedeō</span> — joined this unit by <span class=\"la\">doceō</span>) take the same six endings, keeping their <span class=\"la\">ē</span>: <span class=\"la\">videō, vidēs, videt, vidēmus, vidētis, vident</span>.</p><p>This unit also brings some school verbs from other verb families — <span class=\"la\">scrībō</span> (write), <span class=\"la\">legō</span> (read), <span class=\"la\">discō</span> (learn), <span class=\"la\">sciō</span> (know). Their middle vowels wobble a little (<span class=\"la\">scrībis</span>, not <span class=\"la\">scrībēs</span>), and you will meet their families properly later. But here is the good news: the <strong>person endings never change</strong>. <span class=\"la\">-ō, -s, -t, -mus, -tis, -nt</span> mean <em>I, you, he, we, you all, they</em> on every verb in the language. You can always tell WHO.</p>",
      table: {
        caption: "The person endings work on every verb",
        headers: ["Ending", "Who?", "Examples"],
        rows: [
          ["-ō", "I", "amō, videō, scrībō, sciō"],
          ["-s", "you (sg.)", "amās, vidēs, scrībis, scīs"],
          ["-t", "he / she / it", "amat, videt, scrībit, scit"],
          ["-mus", "we", "amāmus, vidēmus, scrībimus, scīmus"],
          ["-tis", "you (pl.)", "amātis, vidētis, scrībitis, scītis"],
          ["-nt", "they", "amant, vident, scrībunt, sciunt"]
        ]
      },
      tip: "Don't worry about the wobbly vowels in scrībis/scrībimus yet — lock onto the final consonants: -s you, -t he, -mus we, -tis you all, -nt they."
    },
    {
      heading: "«Ego, tū, nōs, vōs» — the pronouns Latin barely needs",
      body: "<p>If <span class=\"la\">labōrō</span> already means <em>I work</em>, why does Latin even own the word <span class=\"la\">ego</span>? For the spotlight. Romans drop the pronoun when the subject is ordinary and add it for <strong>emphasis or contrast</strong>: <span class=\"la\">ego labōrō, tū cantās</span> — <em>I do the working, YOU do the singing</em>.</p><p>So when a pronoun shows up, hear it stressed. <span class=\"la\">Ego litterās sciō</span> is not just <em>I know my letters</em> — it is <em>I (unlike a certain sleepy classmate) know my letters</em>.</p>",
      table: {
        caption: "Personal pronouns and the endings they travel with",
        headers: ["Pronoun", "Meaning", "Ending to expect"],
        rows: [
          ["ego", "I", "-ō"],
          ["tū", "you (sg.)", "-s"],
          ["nōs", "we", "-mus"],
          ["vōs", "you (pl.)", "-tis"]
        ]
      },
      tip: "When you spot «ego» or «tū», someone is drawing a contrast — look around for the other half of it."
    },
    {
      heading: "Asking with «-ne», answering with «ita» and «minimē»",
      body: "<p>To ask a yes/no question, Latin hangs the little tag <span class=\"la\">-ne</span> onto the first word — usually the verb, because that is what is being questioned: <span class=\"la\">Amāsne canem?</span> — <em>Do you love the dog?</em> <span class=\"la\">Habētisne tabulās?</span> — <em>Do you all have your tablets?</em></p><p>Latin has no single word that exactly matches our <em>yes</em> and <em>no</em>. The usual moves are <span class=\"la\">ita</span> (<em>so it is</em> = yes) and <span class=\"la\">minimē</span> (<em>not in the least</em> = no) — or simply repeating the verb: <span class=\"la\">Amās? Amō.</span> — <em>Do you? I do.</em></p>",
      tip: "Reading tip: mentally peel the -ne off («habētisne» → «habētis») and read the sentence as a statement with a question mark."
    }
  ],

  vocab: [
    {
      latin: "lūdus",
      forms: "lūdī, m.",
      pos: "noun (2nd decl.)",
      gloss: "school; game",
      example: "Quīntus in lūdō sedet.",
      exampleGloss: "Quintus sits in school."
    },
    {
      latin: "discipulus",
      forms: "discipulī, m.",
      pos: "noun (2nd decl.)",
      gloss: "student, pupil",
      example: "Discipulī magistrum spectant.",
      exampleGloss: "The students watch the teacher."
    },
    {
      latin: "tabula",
      forms: "tabulae, f.",
      pos: "noun (1st decl.)",
      gloss: "writing tablet",
      example: "Tabulam ad lūdum portō.",
      exampleGloss: "I carry my tablet to school."
    },
    {
      latin: "stilus",
      forms: "stilī, m.",
      pos: "noun (2nd decl.)",
      gloss: "stylus, pen",
      example: "Stilum novum habeō.",
      exampleGloss: "I have a new stylus."
    },
    {
      latin: "littera",
      forms: "litterae, f.",
      pos: "noun (1st decl.)",
      gloss: "letter (of the alphabet); pl. a letter",
      example: "Litterās in tabulā scrībimus.",
      exampleGloss: "We write letters on the tablet."
    },
    {
      latin: "numerus",
      forms: "numerī, m.",
      pos: "noun (2nd decl.)",
      gloss: "number",
      example: "Paulla numerōs amat.",
      exampleGloss: "Paulla loves numbers."
    },
    {
      latin: "ego",
      forms: "(pers. pron.)",
      pos: "pronoun (personal)",
      gloss: "I",
      example: "Ego litterās sciō.",
      exampleGloss: "I know my letters."
    },
    {
      latin: "tū",
      forms: "(pers. pron.)",
      pos: "pronoun (personal)",
      gloss: "you (singular)",
      example: "Tū bene cantās.",
      exampleGloss: "You sing well."
    },
    {
      latin: "nōs",
      forms: "(pers. pron.)",
      pos: "pronoun (personal)",
      gloss: "we",
      example: "Nōs in hortō labōrāmus.",
      exampleGloss: "We are working in the garden."
    },
    {
      latin: "vōs",
      forms: "(pers. pron.)",
      pos: "pronoun (personal)",
      gloss: "you (plural)",
      example: "Vōs fābulam spectātis.",
      exampleGloss: "You (all) are watching the play."
    },
    {
      latin: "-ne",
      forms: "(enclitic)",
      pos: "particle (enclitic)",
      gloss: "(attached) signals a yes/no question",
      example: "Amāsne canem?",
      exampleGloss: "Do you love the dog?"
    },
    {
      latin: "ita",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "yes; so, thus",
      example: "Ita, magister discipulōs laudat.",
      exampleGloss: "Yes, the teacher praises the students."
    },
    {
      latin: "minimē",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "no, not at all",
      example: "Minimē, Ferōx bonus nōn est!",
      exampleGloss: "No, Ferox is not good!"
    },
    {
      latin: "rogō",
      forms: "rogāre, rogāvī, rogātum",
      pos: "verb (1st conj.)",
      gloss: "ask",
      example: "Magister discipulōs rogat.",
      exampleGloss: "The teacher questions the students."
    },
    {
      latin: "doceō",
      forms: "docēre, docuī, doctum",
      pos: "verb (2nd conj.)",
      gloss: "teach",
      example: "Magister numerōs docet.",
      exampleGloss: "The teacher teaches numbers."
    },
    {
      latin: "discō",
      forms: "discere, didicī",
      pos: "verb (3rd conj.)",
      gloss: "learn",
      example: "Litterās in lūdō discimus.",
      exampleGloss: "We learn our letters in school."
    },
    {
      latin: "scrībō",
      forms: "scrībere, scrīpsī, scrīptum",
      pos: "verb (3rd conj.)",
      gloss: "write",
      example: "Quīntus litterās bene scrībit.",
      exampleGloss: "Quintus writes his letters well."
    },
    {
      latin: "legō",
      forms: "legere, lēgī, lēctum",
      pos: "verb (3rd conj.)",
      gloss: "read",
      example: "Fābulāsne legis?",
      exampleGloss: "Do you read stories?"
    },
    {
      latin: "recitō",
      forms: "recitāre, recitāvī, recitātum",
      pos: "verb (1st conj.)",
      gloss: "read aloud, recite",
      example: "Discipulus fābulam recitat.",
      exampleGloss: "The student recites a story."
    },
    {
      latin: "sciō",
      forms: "scīre, scīvī, scītum",
      pos: "verb (4th conj.)",
      gloss: "know",
      example: "Ego numerōs sciō.",
      exampleGloss: "I know the numbers."
    },
    {
      latin: "laudō",
      forms: "laudāre, laudāvī, laudātum",
      pos: "verb (1st conj.)",
      gloss: "praise",
      example: "Magister puerum bonum laudat.",
      exampleGloss: "The teacher praises the good boy."
    },
    {
      latin: "bene",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "well",
      example: "Tū bene recitās.",
      exampleGloss: "You recite well."
    },
    {
      latin: "male",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "badly",
      example: "Sextus male scrībit.",
      exampleGloss: "Sextus writes badly."
    },
    {
      latin: "piger",
      forms: "pigra, pigrum",
      pos: "adjective (1st/2nd decl.)",
      gloss: "lazy",
      example: "Discipulus piger nōn labōrat.",
      exampleGloss: "A lazy student does not work."
    },
    {
      latin: "salvēte",
      forms: "(interj.; sg. salvē)",
      pos: "interjection",
      gloss: "hello! (to several people)",
      example: "«Salvēte, puerī!» inquit magister.",
      exampleGloss: "‘Hello, boys!’ says the teacher."
    }
  ],

  readings: [
    {
      title: "Ad lūdum",
      intro: "Early one morning Quintus hurries to school — and Ferox tags along.",
      paragraphs: [
        "Māne est. Quīntus ad lūdum properat; puer tabulam stilumque portat. Ferōx quoque per viās ambulat. Canis Quīntum amat, sed lūdum nōn amat: in lūdō cibus nōn est!",
        "In lūdō magister discipulōs exspectat. Multī puerī iam in lūdō sedent. «Salvēte, discipulī!» inquit magister. «Salvē, magister!» respondent puerī. Quīntus intrat et prope amīcum sedet.",
        "Magister discipulōs spectat et rogat: «Habētisne tabulās et stilōs?» «Ita!» clāmant puerī. «Nōs tabulās et stilōs habēmus.» Sed Sextus tabulam nōn habet. «Ego tabulam nōn habeō,» inquit. Sextus discipulus piger est."
      ],
      glosses: {
        "māne": "in the morning, early",
        "est": "(it / he) is",
        "quīntus": "Quintus (the son of the family, 12 years old)",
        "ad": "to, toward (+ acc.)",
        "lūdum": "school (acc. — after «ad», or as direct object)",
        "properat": "(he) hurries",
        "puer": "the boy",
        "tabulam": "a writing tablet (acc. — direct object)",
        "stilumque": "and a stylus («stilum» + ‑que)",
        "portat": "(he) carries",
        "ferōx": "Ferox, the family dog",
        "quoque": "also, too",
        "per": "through (+ acc.)",
        "viās": "streets (acc. pl. after «per»)",
        "ambulat": "(he) walks",
        "canis": "the dog",
        "quīntum": "Quintus (acc. — direct object)",
        "amat": "(he) loves",
        "sed": "but",
        "nōn": "not",
        "in": "in (+ abl.)",
        "lūdō": "school (abl. after «in»)",
        "cibus": "food",
        "magister": "the teacher, schoolmaster",
        "discipulōs": "the students (acc. pl.)",
        "exspectat": "(he) waits for",
        "multī": "many",
        "puerī": "boys",
        "iam": "already",
        "sedent": "(they) sit, are sitting",
        "salvēte": "hello! (to several people)",
        "discipulī": "students (here addressed: ‘students!’)",
        "inquit": "says, said (with quoted speech)",
        "salvē": "hello! (to one person)",
        "respondent": "(they) answer",
        "intrat": "(he) enters, comes in",
        "et": "and",
        "prope": "near, next to (+ acc.)",
        "amīcum": "a friend (acc. after «prope»)",
        "sedet": "(he) sits, takes a seat",
        "spectat": "(he) looks at",
        "rogat": "(he) asks",
        "habētisne": "do you (all) have…? («habētis» + question ‑ne)",
        "tabulās": "tablets (acc. pl.)",
        "stilōs": "styluses (acc. pl.)",
        "ita": "yes",
        "clāmant": "(they) shout",
        "nōs": "we (emphatic)",
        "habēmus": "(we) have",
        "sextus": "Sextus, a schoolmate of Quintus",
        "habet": "(he) has",
        "ego": "I (emphatic)",
        "habeō": "(I) have",
        "discipulus": "a student",
        "piger": "lazy"
      },
      translation: [
        "It is early morning. Quintus hurries to school; the boy is carrying a writing tablet and a stylus. Ferox is walking through the streets too. The dog loves Quintus, but he does not love school: there is no food in school!",
        "In the school the teacher is waiting for his students. Many boys are already sitting in the schoolroom. ‘Hello, students!’ says the teacher. ‘Hello, master!’ the boys answer. Quintus comes in and takes a seat next to a friend.",
        "The teacher looks at the students and asks: ‘Do you all have your tablets and styluses?’ ‘Yes!’ the boys shout. ‘We have our tablets and styluses.’ But Sextus has no tablet. ‘I don't have a tablet,’ he says. Sextus is a lazy student."
      ],
      questions: [
        {
          q: "What is Quintus carrying to school?",
          options: [
            "A sausage and a cheese",
            "A writing tablet and a stylus",
            "A gift for the teacher",
            "Nothing — Ferox carries everything"
          ],
          answer: 1,
          explain: "«puer tabulam stilumque portat» — the ‑que on «stilum» means ‘and’: a tablet AND a stylus."
        },
        {
          q: "Why does Ferox walk along but not love school?",
          options: [
            "He is afraid of the magister",
            "There is no food in school",
            "He is too tired to go inside",
            "He would rather dig in the garden"
          ],
          answer: 1,
          explain: "«in lūdō cibus nōn est!» — for Ferox, a building without food is a building without a point."
        },
        {
          q: "In «Habētisne tabulās et stilōs?», what does the attached ‑ne do?",
          options: [
            "It makes the sentence negative",
            "It turns the sentence into a yes/no question",
            "It means ‘and’",
            "It marks the direct object"
          ],
          answer: 1,
          explain: "‑ne hangs on the first word (here the verb «habētis») and signals a yes/no question: ‘Do you all have…?’"
        },
        {
          q: "Who admits «Ego tabulam nōn habeō»?",
          options: ["Quīntus", "The magister", "Sextus", "Paulla"],
          answer: 2,
          explain: "«Sed Sextus tabulam nōn habet» — and he confirms it himself in the first person: «ego … nōn habeō»."
        }
      ]
    },
    {
      title: "Magister rogat",
      intro: "Letters, numbers, and hard questions — then Ferox pays the classroom a memorable visit.",
      paragraphs: [
        "In lūdō discipulī litterās et numerōs discunt. Magister litterās docet; puerī in tabulīs scrībunt. Quīntus bene scrībit, sed Sextus male scrībit, quod piger est. «Vidētisne litterās?» rogat magister. «Ita! Nōs bene vidēmus,» respondent discipulī.",
        "Deinde magister Quīntum rogat: «Scīsne litterās?» «Ita,» respondet puer, «ego litterās et numerōs sciō.» «Legisne fābulās?» «Ita! Ego fābulās dē pīrātīs legō.»",
        "Mox magister Sextum rogat: «Tūne litterās scīs?» Sextus nōn respondet: puer dormit! Discipulī rīdent. Tandem Sextus respondet: «Minimē, ego litterās nōn sciō… sed bene dormiō!» Magister īrātus est.",
        "Deinde Quīntus fābulam dē pīrātīs bene recitat. «Bene recitās!» inquit magister. «Ego discipulōs bonōs semper laudō.» Subitō discipulī clāmant: ecce, Ferōx in fenestrā est! Canis per fenestram intrat et tabulam Quīntī rapit. Discipulī rīdent, sed magister nōn rīdet. «Amatne canis litterās?» rogat magister. «Minimē,» respondet Quīntus. «Litterās nōn amat — Ferōx tabulās semper dēvorat!»"
      ],
      glosses: {
        "in": "in (+ abl.)",
        "lūdō": "school (abl. after «in»)",
        "discipulī": "the students",
        "litterās": "letters (acc. pl.)",
        "et": "and",
        "numerōs": "numbers (acc. pl.)",
        "discunt": "(they) learn",
        "magister": "the teacher, schoolmaster",
        "docet": "(he) teaches",
        "puerī": "the boys",
        "tabulīs": "tablets (abl. pl. after «in» — on their tablets)",
        "scrībunt": "(they) write",
        "quīntus": "Quintus",
        "bene": "well",
        "scrībit": "(he) writes",
        "sed": "but",
        "sextus": "Sextus, Quintus's lazy schoolmate",
        "male": "badly",
        "quod": "because",
        "piger": "lazy",
        "est": "(he) is",
        "vidētisne": "do you (all) see…? («vidētis» + question ‑ne)",
        "rogat": "(he) asks",
        "ita": "yes",
        "nōs": "we (emphatic)",
        "vidēmus": "(we) see",
        "respondent": "(they) answer",
        "deinde": "then, next",
        "quīntum": "Quintus (acc. — the one being asked)",
        "scīsne": "do you know…? («scīs» + question ‑ne)",
        "respondet": "(he) answers",
        "puer": "the boy",
        "ego": "I (emphatic)",
        "sciō": "(I) know",
        "legisne": "do you read…? («legis» + question ‑ne)",
        "fābulās": "stories (acc. pl.)",
        "dē": "about (+ abl.)",
        "pīrātīs": "pirates (abl. after «dē»)",
        "legō": "(I) read",
        "mox": "soon",
        "sextum": "Sextus (acc. — the one being asked)",
        "tūne": "do YOU…? («tū» + question ‑ne, emphatic)",
        "scīs": "(you) know",
        "nōn": "not",
        "dormit": "(he) is sleeping",
        "rīdent": "(they) laugh",
        "tandem": "at last, finally",
        "minimē": "no, not at all",
        "dormiō": "(I) sleep",
        "īrātus": "angry",
        "fābulam": "a story (acc.)",
        "recitat": "(he) recites, reads aloud",
        "recitās": "(you) recite",
        "inquit": "says, said (with quoted speech)",
        "discipulōs": "students (acc. pl.)",
        "bonōs": "good (acc. pl., agreeing with «discipulōs»)",
        "semper": "always",
        "laudō": "(I) praise",
        "subitō": "suddenly",
        "clāmant": "(they) shout",
        "ecce": "look!",
        "ferōx": "Ferox, the family dog",
        "fenestrā": "window (abl. after «in» — at the window)",
        "canis": "the dog",
        "per": "through (+ acc.)",
        "fenestram": "window (acc. after «per»)",
        "intrat": "(he) enters, comes in",
        "tabulam": "tablet (acc. — direct object)",
        "quīntī": "of Quintus, Quintus's (gen.)",
        "rapit": "(he) snatches, grabs",
        "rīdet": "(he) laughs",
        "amatne": "does (he) love…? («amat» + question ‑ne)",
        "amat": "(he) loves",
        "tabulās": "tablets (acc. pl.)",
        "dēvorat": "(he) devours"
      },
      translation: [
        "In school the students are learning letters and numbers. The teacher teaches the letters; the boys write on their tablets. Quintus writes well, but Sextus writes badly, because he is lazy. ‘Do you all see the letters?’ asks the teacher. ‘Yes! We see them well,’ the students answer.",
        "Then the teacher asks Quintus: ‘Do you know your letters?’ ‘Yes,’ the boy answers, ‘I know my letters and my numbers.’ ‘Do you read stories?’ ‘Yes! I read stories about pirates.’",
        "Soon the teacher asks Sextus: ‘Do YOU know your letters?’ Sextus does not answer: the boy is asleep! The students laugh. At last Sextus answers: ‘No, I don't know my letters… but I sleep well!’ The teacher is angry.",
        "Then Quintus recites a story about pirates, and recites it well. ‘You recite well!’ says the teacher. ‘I always praise good students.’ Suddenly the students shout: look, Ferox is at the window! The dog comes in through the window and snatches Quintus's tablet. The students laugh, but the teacher does not laugh. ‘Does the dog love letters?’ asks the teacher. ‘No,’ Quintus answers. ‘He doesn't love letters — Ferox always devours tablets!’"
      ],
      questions: [
        {
          q: "Why does Sextus write badly?",
          options: [
            "His stylus is broken",
            "He is lazy",
            "He cannot see the tablet",
            "The teacher never taught him"
          ],
          answer: 1,
          explain: "«Sextus male scrībit, quod piger est» — «quod» means ‘because’: because he is lazy."
        },
        {
          q: "When the teacher asks «Tūne litterās scīs?», what does Sextus finally answer?",
          options: [
            "«Ita» — he knows them well",
            "«Minimē» — he doesn't know them, but he sleeps well",
            "He recites a story about pirates",
            "He blames Ferox for eating his tablet"
          ],
          answer: 1,
          explain: "«Minimē, ego litterās nōn sciō… sed bene dormiō!» — no to the letters, yes to the napping."
        },
        {
          q: "What does Ferox do when he gets into the classroom?",
          options: [
            "He bites the teacher",
            "He falls asleep beside Sextus",
            "He snatches Quintus's tablet",
            "He eats the students' lunch"
          ],
          answer: 2,
          explain: "«tabulam Quīntī rapit» — «rapit» = snatches, and the genitive «Quīntī» tells you whose tablet it is."
        },
        {
          q: "In «Amatne canis litterās?», the ‑ne attached to «amat» tells you that the sentence is…",
          options: [
            "a negative statement",
            "a command",
            "a yes/no question",
            "an emphatic exclamation"
          ],
          answer: 2,
          explain: "‑ne on the first word (the verb «amat») marks a yes/no question: ‘Does the dog love letters?’ Quintus's answer: «minimē»."
        }
      ]
    }
  ],

  quiz: [
    {
      prompt: "Which ending on a Latin verb means ‘we’?",
      options: ["-tis", "-mus", "-nt", "-s"],
      answer: 1,
      explain: "-mus = we: «habēmus» we have, «vidēmus» we see. Meanwhile -s = you (sg.), -tis = you (pl.), -nt = they."
    },
    {
      prompt: "In «Ego litterās sciō», who knows the letters?",
      options: ["I do", "You do", "He does", "They do"],
      answer: 0,
      explain: "«ego» = I, and the -ō ending on «sciō» says the same thing: first person singular."
    },
    {
      prompt: "What does «Habēsne stilum?» ask?",
      options: [
        "Where is the stylus?",
        "Do you have a stylus?",
        "You do not have a stylus.",
        "Someone stole the stylus!"
      ],
      answer: 1,
      explain: "Peel off the ‑ne: «habēs» = you (sg.) have. With ‑ne it becomes the yes/no question ‘Do you have a stylus?’"
    },
    {
      prompt: "A Roman answers a question with «minimē». What are they saying?",
      options: ["A little", "Yes", "No, not at all", "Maybe"],
      answer: 2,
      explain: "«minimē» literally means ‘least of all’ — Latin's firm no. Its partner «ita» (‘so it is’) is the yes."
    },
    {
      prompt: "In «Vōs bene recitātis», who is reciting?",
      options: ["We", "You (one person)", "You (several people)", "They"],
      answer: 2,
      explain: "«vōs» = you plural, and «recitātis» wears the matching -tis ending. One person would be «tū … recitās»."
    },
    {
      prompt: "Which verb form means ‘you (sg.) are teaching’?",
      options: ["doceō", "docēs", "docet", "docētis"],
      answer: 1,
      explain: "The -s ending = you (singular): «docēs». «doceō» = I teach, «docet» = he teaches, «docētis» = you all teach."
    },
    {
      prompt: "In «Magister discipulum laudat», who is being praised?",
      options: ["The teacher", "The student", "Both of them", "Nobody"],
      answer: 1,
      explain: "«discipulum» ends in -um — accusative, the direct-object case. The nominative «magister» is the one doing the praising."
    },
    {
      prompt: "Latin usually drops ego/tū/nōs/vōs. When one of them DOES appear, what does it usually add?",
      options: [
        "It turns the sentence into a question",
        "Emphasis or contrast",
        "Politeness",
        "It changes the tense"
      ],
      answer: 1,
      explain: "The verb ending already names the subject, so the pronoun is extra — Romans add it for spotlight: «ego labōrō, tū dormīs» — I work, YOU sleep."
    }
  ]
});
