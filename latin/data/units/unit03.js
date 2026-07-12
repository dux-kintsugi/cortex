registerUnit({
  id: 3,
  stage: 1,
  title: "Vīta Cotīdiāna",
  tagline: "Present-tense verbs in ‑t and ‑nt — the household comes alive",

  grammar: [
    {
      heading: "Verbs at last: ‑t and ‑nt",
      body: "<p>For two units the family has mostly just <em>been</em> things — <span class=\"la\">Lupo est canis</span>, <span class=\"la\">hortus magnus est</span>. Now the household starts <em>doing</em> things. A Latin action verb carries its subject on its tail: <strong>‑t</strong> means <em>one</em> person or thing does it, <strong>‑nt</strong> means <em>more than one</em>.</p><p><span class=\"la\">Labōrat</span> is a complete sentence all by itself: “he works,” “she works,” or “it works.” Latin needs no pronoun — the <strong>‑t</strong> already says it. And one Latin form covers three English ones: <span class=\"la\">cantat</span> is “she sings,” “she is singing,” and “she does sing.” Pick whichever English fits the story.</p>",
      table: {
        caption: "Present tense, third person — the verbs of this unit",
        headers: ["One doer (‑t)", "Meaning", "Several doers (‑nt)", "Meaning"],
        rows: [
          ["labōrat", "he/she works", "labōrant", "they work"],
          ["cantat", "he/she sings", "cantant", "they sing"],
          ["videt", "he/she sees", "vident", "they see"],
          ["sedet", "he/she sits", "sedent", "they sit"],
          ["dormit", "he/she sleeps", "dormiunt", "they sleep"]
        ]
      },
      tip: "Reading tip: glance at the verb’s tail before anything else. ‑t = one doer, ‑nt = several — and the subject noun, if one is named, will match: «servus labōrat», «servī labōrant»."
    },
    {
      heading: "Two verb families",
      body: "<p>Listen to the vowel at the heart of the verb. Verbs of the <strong>first family</strong> hum on <strong>a</strong>: <span class=\"la\">labōrat, cantat, vocat, portat, ambulat</span>. Verbs of the <strong>second family</strong> hum on <strong>e</strong>: <span class=\"la\">videt, sedet, tenet, habet</span>. Same tails, different hum — and the meaning of <strong>‑t</strong> and <strong>‑nt</strong> never changes.</p><p>One sleepy exception sneaks in with the vocabulary: <span class=\"la\">dormiō</span> (sleep) belongs to a family you will meet properly much later. For now you only need to recognize <span class=\"la\">dormit</span> (one sleeper — usually Lupo) and <span class=\"la\">dormiunt</span> (several sleepers).</p><p>The <strong>a</strong>-family is what dictionaries call the <strong>1st conjugation</strong>, the <strong>e</strong>-family the <strong>2nd conjugation</strong> — just numbered names for the two families you have already heard humming. (The <span class=\"la\">‑āre</span> form, as in <span class=\"la\">cantāre</span>, is the verb’s dictionary name — you will meet it properly in Unit 11.)</p>",
      table: {
        caption: "The family vowel (heard in full in the dictionary forms: cantāre, habēre)",
        headers: ["Family", "Vowel", "One doer", "Several doers"],
        rows: [
          ["1st conjugation", "ā", "cantat", "cantant"],
          ["2nd conjugation", "ē", "habet", "habent"],
          ["dormiō (a preview)", "ī/iu", "dormit", "dormiunt"]
        ]
      }
    },
    {
      heading: "The verb likes to come last",
      body: "<p>English nails its verb down between subject and object; Latin loves to save the verb for the end: <span class=\"la\">Ancilla semper cantat</span> — literally “the maid always sings.” So don’t panic in the middle of a Latin sentence. Hold the subject in your mind, collect the little words as they come, and expect the action to land at the period.</p><p>But because the <em>endings</em> — not the word order — tell you who does what, Latin can also push the verb to the front for drama: <span class=\"la\">dormit Lupo!</span> means exactly what <span class=\"la\">Lupo dormit</span> means. Word order moves the spotlight; it never changes the facts.</p>",
      tip: "Reading tip: a verb at the start of a sentence is a drumroll, not a new rule. Read «dormit Lupo» as “asleep — that’s our Lupo.”"
    },
    {
      heading: "Little words that run the clock",
      body: "<p>This unit’s adverbs are the story’s clockwork: <span class=\"la\">iam</span> (now, already), <span class=\"la\">mox</span> (soon), <span class=\"la\">deinde</span> (then, next), <span class=\"la\">saepe</span> (often), <span class=\"la\">semper</span> (always). They usually stand early in the sentence and tell you <em>when</em> the verb at the end will happen. Note the pair <span class=\"la\">iam nōn</span>: “no longer” — <span class=\"la\">iam familia nōn dormit</span>, the family isn’t sleeping <em>any more</em>.</p><p>Finally, <span class=\"la\">quod</span> means “because” and pins a reason onto a statement: <span class=\"la\">Ancilla cantat, quod laeta est</span> — the maid sings <em>because she is happy</em>. When you meet <span class=\"la\">quod</span>, expect a little sentence after it, complete with its own verb.</p>",
      table: {
        caption: "This unit’s time-words (plus one reason-word)",
        headers: ["Latin", "English"],
        rows: [
          ["iam", "now, already (iam nōn = no longer)"],
          ["saepe", "often"],
          ["semper", "always"],
          ["deinde", "then, next"],
          ["mox", "soon"],
          ["quod", "because"]
        ]
      }
    }
  ],

  vocab: [
    {
      latin: "labōrō",
      forms: "labōrāre, labōrāvī, labōrātum",
      pos: "verb (1st conj.)",
      gloss: "work",
      example: "Servus labōrat; servī labōrant.",
      exampleGloss: "The slave is working; the slaves are working."
    },
    {
      latin: "ambulō",
      forms: "ambulāre, ambulāvī, ambulātum",
      pos: "verb (1st conj.)",
      gloss: "walk",
      example: "Pater et fīlius ambulant.",
      exampleGloss: "Father and son are walking."
    },
    {
      latin: "portō",
      forms: "portāre, portāvī, portātum",
      pos: "verb (1st conj.)",
      gloss: "carry",
      example: "Aqua? Ancilla portat!",
      exampleGloss: "Water? The maid is carrying it!"
    },
    {
      latin: "parō",
      forms: "parāre, parāvī, parātum",
      pos: "verb (1st conj.)",
      gloss: "prepare",
      example: "Cēna? Māter iam parat.",
      exampleGloss: "Dinner? Mother is already preparing it."
    },
    {
      latin: "vocō",
      forms: "vocāre, vocāvī, vocātum",
      pos: "verb (1st conj.)",
      gloss: "call",
      example: "Māter vocat: «Paula! Paula!»",
      exampleGloss: "Mother calls: «Paula! Paula!»"
    },
    {
      latin: "cantō",
      forms: "cantāre, cantāvī, cantātum",
      pos: "verb (1st conj.)",
      gloss: "sing",
      example: "Ancilla laeta cantat.",
      exampleGloss: "The happy maid is singing."
    },
    {
      latin: "amō",
      forms: "amāre, amāvī, amātum",
      pos: "verb (1st conj.)",
      gloss: "love, like",
      example: "Ecce cibus! Lupo amat.",
      exampleGloss: "Look — food! Lupo loves it."
    },
    {
      latin: "habitō",
      forms: "habitāre, habitāvī, habitātum",
      pos: "verb (1st conj.)",
      gloss: "live, dwell",
      example: "Ecce domus: familia Fabia habitat.",
      exampleGloss: "Look, the house: the Fabius family lives there."
    },
    {
      latin: "intrō",
      forms: "intrāre, intrāvī, intrātum",
      pos: "verb (1st conj.)",
      gloss: "enter",
      example: "Deinde dominus intrat.",
      exampleGloss: "Then the master comes in."
    },
    {
      latin: "spectō",
      forms: "spectāre, spectāvī, spectātum",
      pos: "verb (1st conj.)",
      gloss: "look at, watch",
      example: "Lupo dormit; Paula spectat.",
      exampleGloss: "Lupo is sleeping; Paula is watching."
    },
    {
      latin: "videō",
      forms: "vidēre, vīdī, vīsum",
      pos: "verb (2nd conj.)",
      gloss: "see",
      example: "Māter videt: puer nōn labōrat!",
      exampleGloss: "Mother sees it: the boy is not working!"
    },
    {
      latin: "habeō",
      forms: "habēre, habuī, habitum",
      pos: "verb (2nd conj.)",
      gloss: "have, hold",
      example: "Cibus? Lupo iam habet!",
      exampleGloss: "Food? Lupo already has some!"
    },
    {
      latin: "sedeō",
      forms: "sedēre, sēdī, sessum",
      pos: "verb (2nd conj.)",
      gloss: "sit",
      example: "Pater fessus est et sedet.",
      exampleGloss: "Father is tired and sits down."
    },
    {
      latin: "teneō",
      forms: "tenēre, tenuī, tentum",
      pos: "verb (2nd conj.)",
      gloss: "hold",
      example: "Paula tenet — et Lupo quoque tenet!",
      exampleGloss: "Paula holds on — and Lupo holds on too! (a tug-of-war)"
    },
    {
      latin: "dormiō",
      forms: "dormīre, dormīvī, dormītum",
      pos: "verb (4th conj.)",
      gloss: "sleep",
      example: "Canis semper dormit.",
      exampleGloss: "The dog is always sleeping."
    },
    {
      latin: "cēna",
      forms: "gen. cēnae, f.",
      pos: "noun (1st decl.)",
      gloss: "dinner",
      example: "Cēna iam parāta est.",
      exampleGloss: "Dinner is ready now."
    },
    {
      latin: "cibus",
      forms: "gen. cibī, m.",
      pos: "noun (2nd decl.)",
      gloss: "food",
      example: "Cibus bonus est.",
      exampleGloss: "The food is good."
    },
    {
      latin: "servus",
      forms: "gen. servī, m.",
      pos: "noun (2nd decl.)",
      gloss: "slave, servant",
      example: "Servī labōrant et portant.",
      exampleGloss: "The slaves are working and carrying loads."
    },
    {
      latin: "ancilla",
      forms: "gen. ancillae, f.",
      pos: "noun (1st decl.)",
      gloss: "slave-woman, maid",
      example: "Ancilla cantat et parat.",
      exampleGloss: "The maid is singing and getting things ready."
    },
    {
      latin: "saepe",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "often",
      example: "Paula saepe cantat.",
      exampleGloss: "Paula often sings."
    },
    {
      latin: "iam",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "now, already",
      example: "Iam familia nōn dormit.",
      exampleGloss: "The family is not sleeping any more."
    },
    {
      latin: "semper",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "always",
      example: "Lupo semper dormit.",
      exampleGloss: "Lupo is always sleeping."
    },
    {
      latin: "deinde",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "then, next",
      example: "Deinde māter intrat.",
      exampleGloss: "Then the mother comes in."
    },
    {
      latin: "mox",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "soon",
      example: "Mox cēna parāta est.",
      exampleGloss: "Soon dinner is ready."
    },
    {
      latin: "quod",
      forms: "(indēcl.)",
      pos: "conjunction",
      gloss: "because",
      example: "Puer laetus est, quod nōn labōrat.",
      exampleGloss: "The boy is happy because he is not working."
    }
  ],

  readings: [
    {
      title: "Familia labōrat",
      intro: "Early morning at the Fabius house in Ostia. The whole household is getting up — well, almost the whole household.",
      paragraphs: [
        "Ecce domus! Familia Fabia habitat. Iam familia nōn dormit: pater et māter nōn dormiunt, fīlius fīliaque nōn dormiunt. Sed Lupo dormit!",
        "Mark est mercātor: vir bonus est. Iam dominus vocat: «Servī! Servī!» Sed servī nōn labōrant, et dominus īrātus est. Deinde servī ambulant, labōrant, portant — mox dominus laetus est.",
        "Ecce culīna! Ancilla parat et cantat; semper cantat ancilla, quod laeta est. Cēna mox parāta est. Julia quoque labōrat: domina bona est.",
        "Et Lupo? Lupo nōn labōrat, nōn portat, nōn cantat: canis semper dormit, quod semper «fessus» est. Ō Lupo!"
      ],
      glosses: {
        "ecce": "look!",
        "domus": "house",
        "familia": "family, household",
        "fabia": "Fabian — of the Fabius family",
        "habitat": "(it) lives (here), dwells (here)",
        "iam": "now (iam nōn = no longer)",
        "nōn": "not",
        "dormit": "(he/she/it) sleeps, is asleep",
        "pater": "father",
        "et": "and",
        "māter": "mother",
        "dormiunt": "(they) sleep",
        "fīlius": "son",
        "fīliaque": "and the daughter (fīlia + ‑que)",
        "sed": "but",
        "lupo": "Lupo, the family dog — quasi lupus! (his name never changes form)",
        "mark": "Mark, the father (his name never changes form)",
        "est": "is",
        "mercātor": "merchant, trader",
        "vir": "man",
        "bonus": "good",
        "dominus": "master of the household (that is, Mark)",
        "vocat": "(he/she) calls, calls out",
        "servī": "slaves; (in «Servī!») slaves! — calling them",
        "labōrant": "(they) work, are working",
        "īrātus": "angry",
        "deinde": "then, next",
        "ambulant": "(they) walk, get moving",
        "portant": "(they) carry (their loads)",
        "mox": "soon",
        "laetus": "happy, glad",
        "culīna": "kitchen",
        "ancilla": "slave-woman, maid",
        "parat": "(she) prepares (the meal), gets things ready",
        "cantat": "(he/she) sings, is singing",
        "semper": "always",
        "quod": "because",
        "laeta": "happy (of a woman)",
        "cēna": "dinner",
        "parāta": "ready, prepared",
        "julia": "Julia, the mother",
        "quoque": "also, too",
        "domina": "mistress of the household",
        "bona": "good (of a woman)",
        "labōrat": "(he/she) works, is working",
        "portat": "(he/she) carries (something)",
        "canis": "dog",
        "fessus": "tired",
        "ō": "oh!"
      },
      translation: [
        "Look — the house! The Fabius family lives here. The family is not asleep now: father and mother are not sleeping, the son and the daughter are not sleeping. But Lupo is sleeping!",
        "Mark is a merchant: he is a good man. Now the master calls: «Slaves! Slaves!» But the slaves are not working, and the master is angry. Then the slaves get moving, work, and carry their loads — soon the master is happy.",
        "Look — the kitchen! The maid is preparing the meal and singing; the maid is always singing, because she is happy. Dinner will soon be ready. Julia is working too: she is a good mistress of the house.",
        "And Lupo? Lupo is not working, not carrying, not singing: the dog is always sleeping, because he is always “tired.” Oh, Lupo!"
      ],
      questions: [
        {
          q: "Who is still asleep while the whole household is up?",
          options: ["Mark", "The slave-woman", "Lupo the dog", "Paula"],
          answer: 2,
          explain: "«Sed Lupo dormit!» — everyone else is up, but the dog sleeps on. He is, after all, always «fessus»."
        },
        {
          q: "Why is Mark angry at first?",
          options: ["Dinner is not ready", "The slaves are not working", "Lupo has stolen food", "The kitchen is empty"],
          answer: 1,
          explain: "«Sed servī nōn labōrant, et dominus īrātus est» — he calls them, and they are not (yet) working."
        },
        {
          q: "Why does the maid keep singing?",
          options: ["Because she is happy", "Because she is tired", "Because Julia orders it", "Because dinner is already ready"],
          answer: 0,
          explain: "«semper cantat ancilla, quod laeta est» — «quod» gives the reason: she is happy."
        },
        {
          q: "In «servī ambulant, labōrant, portant», what does the ending ‑nt on each verb tell you?",
          options: ["The actions happened yesterday", "More than one person is doing them", "The slaves are being addressed", "The verbs are negative"],
          answer: 1,
          explain: "‑nt marks a plural subject: the «servī» all get moving, work, and carry — three verbs, one busy crowd."
        }
      ]
    },
    {
      title: "Cēna parāta est",
      intro: "Later the same day: the children have their tasks too, and at dinnertime a very sleepy dog finally makes his move.",
      paragraphs: [
        "Quinn nōn labōrat: puer sedet et spectat. «Quinn nōn labōrat!» inquit Paula. Māter videt: puer sedet, nōn labōrat! Deinde māter vocat; iam Quinn nōn sedet, sed labōrat.",
        "Paula nōn est fessa: puella parva est, sed semper labōrat. Aqua? Paula portat! Herba? Paula portat! Saepe cantat puella, quod laeta est.",
        "Et Lupo? Cantat māter: dormit Lupo. Portant servī: dormit Lupo. Paula vocat: «Lupo! Lupo!» — puella tenet et tenet, sed canis semper dormit!",
        "Deinde cēna parāta est; ancilla vocat: «Cēna! Cēna!» Familia intrat et sedet: pater sedet, māter sedet, puer puellaque sedent. Mark fessus est, sed laetus, quod cēna bona est.",
        "Ecce — iam Lupo nōn dormit! Canis intrat; canis quoque sedet. Lupo nōn labōrat, nōn portat — sed cēna? Lupo amat! Paula spectat: cibus? Lupo iam habet! Rīdet familia: Lupo semper Lupo est."
      ],
      glosses: {
        "quinn": "Quinn, the son (twelve years old — his name never changes form)",
        "nōn": "not",
        "labōrat": "(he/she) works, is working",
        "puer": "boy",
        "sedet": "(he/she/it) sits, is sitting",
        "et": "and",
        "spectat": "(he/she) watches, stares",
        "inquit": "says (used with direct speech)",
        "paula": "Paula, the daughter (eight years old)",
        "māter": "mother",
        "videt": "(she) sees (it)",
        "deinde": "then, next",
        "vocat": "(he/she) calls, calls out",
        "iam": "now, by now (iam nōn = no longer)",
        "sed": "but",
        "est": "is",
        "fessa": "tired (of a girl/woman)",
        "puella": "girl",
        "parva": "small, little",
        "semper": "always",
        "aqua": "water (to be fetched)",
        "portat": "(he/she) carries (it)",
        "herba": "plants, herbs (for the kitchen)",
        "saepe": "often",
        "cantat": "(he/she) sings, is singing",
        "quod": "because",
        "laeta": "happy (of a girl/woman)",
        "lupo": "Lupo, the dog; (in «Lupo!») Lupo! — calling him",
        "dormit": "(he) sleeps, is asleep",
        "portant": "(they) carry (loads)",
        "servī": "the slaves",
        "tenet": "(she/he) takes hold, holds on",
        "canis": "dog",
        "cēna": "dinner; (in «Cēna!») dinner! — announcing it",
        "parāta": "ready, prepared",
        "ancilla": "slave-woman, maid",
        "familia": "family, household",
        "intrat": "(he/it) comes in, enters",
        "pater": "father",
        "puellaque": "and the girl (puella + ‑que)",
        "sedent": "(they) sit",
        "mark": "Mark, the father",
        "fessus": "tired",
        "laetus": "happy, glad",
        "bona": "good (of the dinner)",
        "ecce": "look!",
        "quoque": "also, too",
        "amat": "(he) loves (it)",
        "cibus": "food",
        "habet": "(he) has (some), holds (it)",
        "rīdet": "(it: the family) laughs"
      },
      translation: [
        "Quinn is not working: the boy is sitting and staring. «Quinn isn’t working!» says Paula. Mother sees it: the boy is sitting, not working! Then mother calls; now Quinn is not sitting — he is working.",
        "Paula is not tired: she is a little girl, but she always works. Water? Paula carries it! Herbs? Paula carries them! The girl often sings, because she is happy.",
        "And Lupo? Mother sings: Lupo sleeps. The slaves carry their loads: Lupo sleeps. Paula calls: «Lupo! Lupo!» — the girl takes hold of him and holds on and on, but the dog just keeps on sleeping!",
        "Then dinner is ready; the maid calls: «Dinner! Dinner!» The family comes in and sits down: father sits, mother sits, the boy and the girl sit. Mark is tired but happy, because dinner is good.",
        "Look — now Lupo is not asleep! The dog comes in; the dog sits down too. Lupo does not work, does not carry — but dinner? That Lupo loves! Paula looks: the food? Lupo already has some! The family laughs: Lupo is always Lupo."
      ],
      questions: [
        {
          q: "What is Quinn doing instead of working?",
          options: ["Sleeping in his bed", "Sitting and staring", "Carrying water", "Singing in the kitchen"],
          answer: 1,
          explain: "«puer sedet et spectat» — he sits and stares (daydreaming), until his mother calls him back to work."
        },
        {
          q: "How does Paula try to wake Lupo?",
          options: ["She brings him food", "She sings to him", "She calls his name and takes hold of him", "She opens the window"],
          answer: 2,
          explain: "«Paula vocat: ‘Lupo! Lupo!’ — puella tenet et tenet» — she calls and takes hold of him, but he sleeps on."
        },
        {
          q: "What finally gets Lupo out of bed?",
          options: ["Mark getting angry", "Dinner", "The slaves at work", "Paula taking hold of him"],
          answer: 1,
          explain: "Only when «cēna parāta est» does the dog appear: «iam Lupo nōn dormit! Canis intrat» — and soon he even has food."
        },
        {
          q: "In «puer puellaque sedent», what does the ‑que on «puellaque» do?",
          options: ["It makes the word negative", "It means «and», joining puer and puella", "It shows the girl owns something", "It marks a question"],
          answer: 1,
          explain: "‑que tacked onto the second word means «and»: the boy and the girl sit. That is also why the verb is plural «sedent»."
        }
      ]
    }
  ],

  quiz: [
    {
      prompt: "A Latin verb ends in ‑t (and not in ‑nt). What do you know for certain?",
      options: ["The action is in the past", "One person (or thing) is doing it", "The doer is masculine", "The sentence is a question"],
      answer: 1,
      explain: "‑t = one doer: «labōrat» — he, she, or it works. (‑nt would mean several doers.)"
    },
    {
      prompt: "Which sentence says that several people are working?",
      options: ["Servus labōrat.", "Ancilla cantat.", "Servī labōrant.", "Lupo nōn labōrat."],
      answer: 2,
      explain: "«Servī labōrant» — plural subject «servī» matched by the plural tail ‑nt."
    },
    {
      prompt: "«Servī labōrant, sed Lupo dormit.» What is Lupo doing?",
      options: ["Working", "Carrying", "Barking", "Sleeping"],
      answer: 3,
      explain: "«dormit» = he is sleeping; «sed» (but) sets him against the hard-working slaves. Classic Lupo."
    },
    {
      prompt: "Which verb means «they see»?",
      options: ["videt", "vident", "vocant", "sedent"],
      answer: 1,
      explain: "«vident» = vide‑ (see) + the plural tail ‑nt: they see. «videt» = he/she sees, «vocant» = they call, «sedent» = they sit."
    },
    {
      prompt: "«Dormit Lupo.» The verb comes first here. What does the sentence mean?",
      options: ["Lupo is sleeping", "Sleep, Lupo!", "Lupo was sleeping", "The bed belongs to Lupo"],
      answer: 0,
      explain: "Word order moves the emphasis, never the meaning: ‑t still marks one doer, and «Lupo» is still the subject. It is simply a dramatic way to say he is asleep."
    },
    {
      prompt: "«Ancilla cantat, quod laeta est.» Why is the maid singing?",
      options: ["Because dinner is ready", "Because she is happy", "Because the master calls her", "Because she is tired"],
      answer: 1,
      explain: "«quod» introduces the reason, and «laeta est» = she is happy."
    },
    {
      prompt: "In «Deinde māter intrat», when does the mother come in?",
      options: ["Next, as the following event", "Always", "Often", "Soon"],
      answer: 0,
      explain: "«deinde» = then, next — it moves the story one step forward. («semper» = always, «saepe» = often, «mox» = soon.)"
    },
    {
      prompt: "«Mox cēna parāta est.» What are you being told about dinner?",
      options: ["It is already ready", "It will be ready soon", "It is never ready", "It was ready yesterday"],
      answer: 1,
      explain: "«mox» = soon. Latin cheerfully uses the present — literally «soon dinner is ready» — where English says «it will be ready soon»."
    }
  ]
});
