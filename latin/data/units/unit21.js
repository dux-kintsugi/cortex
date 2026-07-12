registerUnit({
  id: 21,
  stage: 3,
  title: "Portus Labōrat",
  tagline: "The passive voice (present, imperfect, future) and the ablative of agent",

  grammar: [
    {
      heading: "Flipping the sentence: the passive voice",
      body: "<p>Until now, every verb you have met was <strong>active</strong>: the subject does the deed. <span class=\"la\">Servī frūmentum portant</span> — the slaves carry the grain. The <strong>passive</strong> turns the camera around: <span class=\"la\">frūmentum portātur</span> — the grain <em>is carried</em>. Same event, new star: the subject now receives the action instead of performing it.</p><p>The recognition trick is beautifully small. Latin builds the passive with a new set of personal endings, and their fingerprint is <strong>‑r</strong>. In stories, two of them do almost all the work: <span class=\"la\">‑tur</span> (he/she/it) and <span class=\"la\">‑ntur</span> (they). Where the active says <span class=\"la\">portat</span>, the passive says <span class=\"la\">portātur</span>; where the active says <span class=\"la\">portant</span>, the passive says <span class=\"la\">portantur</span>.</p><p>A busy harbor is passive country: sacks don’t carry, they <em>are carried</em>; ships don’t load, they <em>are loaded</em>. Watch the endings and you will always know whether the subject is working — or being worked on.</p>",
      table: {
        caption: "Present passive of «portāre» (to carry)",
        headers: ["Latin", "English"],
        rows: [
          ["portor", "I am (being) carried"],
          ["portāris", "you are carried (one person)"],
          ["portātur", "he / she / it is carried"],
          ["portāmur", "we are carried"],
          ["portāminī", "you are carried (more than one)"],
          ["portantur", "they are carried"]
        ]
      },
      tip: "New reflex: verb ends in ‑tur or ‑ntur → the subject is on the receiving end. «Nāvis onerātur» — the ship isn’t doing anything; things are being done to it."
    },
    {
      heading: "«ā/ab» + ablative: who actually did it",
      body: "<p>A passive sentence can name the doer — the <strong>agent</strong> — with <span class=\"la\">ā/ab</span> plus the ablative, whenever the doer is a person (or at least has a pulse): <span class=\"la\">horreum ā cūstōde cūstōdītur</span> — the warehouse is guarded <em>by the watchman</em>. Use <span class=\"la\">ab</span> before a vowel or <span class=\"la\">h‑</span>.</p><p>But when the work is done by a <em>thing</em> — a tool, a machine, plain stuff — Latin drops the preposition and uses the bare ablative (the <strong>ablative of means</strong>): <span class=\"la\">amphorae māchinā tolluntur</span> — the amphorae are lifted <em>by the crane</em>. English says ‘by’ both times; Latin gives you two different signals: a preposition for people, no preposition for things.</p>",
      table: {
        caption: "Agent (person) versus means (thing)",
        headers: ["Latin", "English", "Signal"],
        rows: [
          ["ā fabrō tollitur", "it is lifted by the workman", "person → «ā/ab» + ablative"],
          ["māchinā tollitur", "it is lifted by the crane", "thing → bare ablative, no preposition"],
          ["ab amīcīs laudātur", "he is praised by his friends", "«ab» before a vowel or h‑"]
        ]
      },
      tip: "After a passive verb, «ā/ab» answers ‘by whom?’ A bare ablative answers ‘by what?’"
    },
    {
      heading: "Was being loaded, will be loaded: imperfect and future passive",
      body: "<p>The passive endings snap straight onto the tense signs you already know. <strong>Imperfect passive</strong>: spot <span class=\"la\">‑bā‑</span> plus <span class=\"la\">‑tur/‑ntur</span> — <span class=\"la\">nāvis onerābātur</span>, the ship <em>was being loaded</em>. <strong>Future passive</strong>: the 1st and 2nd conjugations use <span class=\"la\">‑bitur/‑buntur</span> (<span class=\"la\">portābitur</span> — it will be carried), while the 3rd and 4th use an <span class=\"la\">‑ē‑</span>: <span class=\"la\">tollētur</span> — it will be lifted.</p><p>That little <span class=\"la\">ē</span> deserves respect: in the 3rd conjugation it is all that separates present <span class=\"la\">tollitur</span> (is being lifted) from future <span class=\"la\">tollētur</span> (will be lifted).</p>",
      table: {
        caption: "One verb, three tenses (3rd person singular)",
        headers: ["Tense", "1st conj. «portō»", "3rd conj. «tollō»"],
        rows: [
          ["present", "portātur — is carried", "tollitur — is lifted"],
          ["imperfect", "portābātur — was being carried", "tollēbātur — was being lifted"],
          ["future", "portābitur — will be carried", "tollētur — will be lifted"]
        ]
      },
      tip: "Read the verb from the inside out: stem (what happens) + tense sign (when) + ‑tur/‑ntur (it’s happening TO the subject)."
    },
    {
      heading: "No culprit named — and one culprit named precisely",
      body: "<p>Latin loves an agentless passive. <span class=\"la\">Magnum negōtium geritur</span> — big business is being done. By whom? The sentence doesn’t say, and it doesn’t have to: in a harbor everything is being lifted, moved, and loaded by <em>somebody</em>, and often nobody cares who. So when you meet a passive without <span class=\"la\">ā/ab</span>, don’t hunt for a hidden doer — the sentence is already complete.</p><p>But when Latin <em>does</em> name names, it does so with precision: <span class=\"la\">botulus ā cane portātur</span> — the sausage is being carried off <em>by the dog</em>. The passive voice: an excellent instrument for assigning blame.</p>",
      tip: "Passives will swarm these readings. At each one, ask two questions: what is being done — and does anyone admit to doing it?"
    }
  ],

  vocab: [
    {
      latin: "labor",
      forms: "labōris, m.",
      pos: "noun (3rd decl.)",
      gloss: "work, toil",
      example: "Labor in portū numquam perficitur.",
      exampleGloss: "The work in the harbor is never finished."
    },
    {
      latin: "opus",
      forms: "operis, n.",
      pos: "noun (3rd decl.)",
      gloss: "work, task",
      example: "Opus ā fabrīs iam incipitur.",
      exampleGloss: "The task is already being begun by the workmen."
    },
    {
      latin: "officium",
      forms: "officiī, n.",
      pos: "noun (2nd decl.)",
      gloss: "duty",
      example: "Officium tuum est canem cūstōdīre.",
      exampleGloss: "It is your duty to watch the dog."
    },
    {
      latin: "horreum",
      forms: "horreī, n.",
      pos: "noun (2nd decl.)",
      gloss: "granary, warehouse",
      example: "Frūmentum in horreum portātur.",
      exampleGloss: "The grain is carried into the warehouse."
    },
    {
      latin: "corbis",
      forms: "corbis, m.",
      pos: "noun (3rd decl.)",
      gloss: "basket",
      example: "Ūvae in corbe sunt.",
      exampleGloss: "The grapes are in the basket."
    },
    {
      latin: "fūnis",
      forms: "fūnis, m.",
      pos: "noun (3rd decl.)",
      gloss: "rope",
      example: "Nauta fūnem longum tenet.",
      exampleGloss: "The sailor holds a long rope."
    },
    {
      latin: "māchina",
      forms: "māchinae, f.",
      pos: "noun (1st decl.)",
      gloss: "machine, crane",
      example: "Amphorae māchinā tolluntur.",
      exampleGloss: "The amphorae are lifted by the crane."
    },
    {
      latin: "plaustrum",
      forms: "plaustrī, n.",
      pos: "noun (2nd decl.)",
      gloss: "wagon, cart",
      example: "Plaustrum ab asinō lentē trahitur.",
      exampleGloss: "The cart is pulled slowly by a donkey."
    },
    {
      latin: "faber",
      forms: "fabrī, m.",
      pos: "noun (2nd decl.)",
      gloss: "craftsman, workman",
      example: "Fabrī in portū fortiter labōrant.",
      exampleGloss: "The workmen work hard in the harbor."
    },
    {
      latin: "socius",
      forms: "sociī, m.",
      pos: "noun (2nd decl.)",
      gloss: "partner, ally",
      example: "Avunculus Ted multōs sociōs habet.",
      exampleGloss: "Uncle Ted has many partners."
    },
    {
      latin: "merx",
      forms: "mercis, f.",
      pos: "noun (3rd decl.)",
      gloss: "merchandise, goods",
      example: "Mercēs ā mercātōre vēnduntur.",
      exampleGloss: "The goods are sold by the merchant."
    },
    {
      latin: "cūstōs",
      forms: "cūstōdis, m.",
      pos: "noun (3rd decl.)",
      gloss: "guard, watchman",
      example: "Cūstōs horreum diū cūstōdit.",
      exampleGloss: "The watchman guards the warehouse for a long time."
    },
    {
      latin: "cūstōdiō",
      forms: "cūstōdīre, cūstōdīvī, cūstōdītum",
      pos: "verb (4th conj.)",
      gloss: "guard, watch over",
      example: "Porta ā cūstōde cūstōdītur.",
      exampleGloss: "The gate is guarded by a watchman."
    },
    {
      latin: "onerō",
      forms: "onerāre, onerāvī, onerātum",
      pos: "verb (1st conj.)",
      gloss: "load",
      example: "Nāvis frūmentō onerātur.",
      exampleGloss: "The ship is being loaded with grain."
    },
    {
      latin: "impōnō",
      forms: "impōnere, imposuī, impositum",
      pos: "verb (3rd conj.)",
      gloss: "place on, load onto",
      example: "Saccī in plaustrum impōnuntur.",
      exampleGloss: "The sacks are loaded onto the wagon."
    },
    {
      latin: "tollō",
      forms: "tollere, sustulī, sublātum",
      pos: "verb (3rd conj.)",
      gloss: "lift, raise",
      example: "Faber corbem magnum tollit.",
      exampleGloss: "The workman lifts a big basket."
    },
    {
      latin: "trādō",
      forms: "trādere, trādidī, trāditum",
      pos: "verb (3rd conj.)",
      gloss: "hand over",
      example: "Mercātor pecūniam nautae trādit.",
      exampleGloss: "The merchant hands the money over to the sailor."
    },
    {
      latin: "moveō",
      forms: "movēre, mōvī, mōtum",
      pos: "verb (2nd conj.)",
      gloss: "move",
      example: "Plaustra lentē moventur.",
      exampleGloss: "The wagons are moved slowly."
    },
    {
      latin: "gerō",
      forms: "gerere, gessī, gestum",
      pos: "verb (3rd conj.)",
      gloss: "carry on, conduct, wear",
      example: "Magnum negōtium in portū geritur.",
      exampleGloss: "Great business is carried on in the harbor."
    },
    {
      latin: "perficiō",
      forms: "perficere, perfēcī, perfectum",
      pos: "verb (3rd conj. ‑iō)",
      gloss: "finish, complete",
      example: "Opus ante noctem perficiētur.",
      exampleGloss: "The task will be finished before night."
    },
    {
      latin: "incipiō",
      forms: "incipere, incēpī, inceptum",
      pos: "verb (3rd conj. ‑iō)",
      gloss: "begin",
      example: "Labor prīmā hōrā incipitur.",
      exampleGloss: "The work is begun at the first hour."
    },
    {
      latin: "occupātus",
      forms: "‑a, ‑um",
      pos: "adjective (1st/2nd decl.)",
      gloss: "busy",
      example: "Māter hodiē occupāta est.",
      exampleGloss: "Mother is busy today."
    },
    {
      latin: "diū",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "for a long time",
      example: "Quinn nāvēs diū spectat.",
      exampleGloss: "Quinn watches the ships for a long time."
    },
    {
      latin: "intereā",
      forms: "(indēcl.)",
      pos: "adverb",
      gloss: "meanwhile",
      example: "Intereā canis Lupo in culīnā dormit.",
      exampleGloss: "Meanwhile Lupo the dog sleeps in the kitchen."
    },
    {
      latin: "quia",
      forms: "(conj.)",
      pos: "conjunction",
      gloss: "because",
      example: "Paula laeta est, quia canis domum redit.",
      exampleGloss: "Paula is happy because the dog is coming home."
    }
  ],

  readings: [
    {
      title: "Omnia moventur",
      intro: "Back home in Ostia, Mark and Quinn watch the harbor wake up — where everything is being done by somebody.",
      paragraphs: [
        "Familia Fabia iterum in Ostiā est. Prīmā hōrā Mark et Quinn ad portum properant, quia nāvis avunculī Ted hodiē onerātur. Quinn laetus est: portum enim amat, et omnia spectāre cupit.",
        "In portū labor ubīque est. Frūmentum ā servīs in saccōs pōnitur; saccī in plaustra impōnuntur; plaustra ad horrea lentē moventur. Māchina magna amphorās tollit: fūnēs ā fabrīs tenentur, et amphorae in nāvēs impōnuntur. «Spectā māchinam!» clāmat Quinn. «Amphorae sine labōre tolluntur!»",
        "Prope horreum stat cūstōs validus, quī mercēs cūstōdit. «Cūr semper hīc stās?» rogat Quinn. «Officium meum est,» respondet cūstōs. «Merx enim pretiōsa ā malīs virīs saepe petitur; itaque horreum ā mē diū cūstōdītur.»",
        "Intereā Paula cum cane Lupo ad patrem currit. «Cūr omnēs virī tam occupātī sunt?» rogat. Mark respondet: «Magnum negōtium hodiē geritur, mea fīlia. Nāvis avunculī onerātur, quia crās avunculus Ted in Graeciam nāvigābit. Opus iam incipitur!»"
      ],
      glosses: {
        "familia": "family",
        "fabia": "Fabian — the family’s name (the household of Fabius)",
        "iterum": "again",
        "in": "in (+ abl.); into, onto, to (+ acc.)",
        "ostiā": "Ostia, the port of Rome (abl.)",
        "est": "is",
        "prīmā": "first (abl., with «hōrā»)",
        "hōrā": "hour («prīmā hōrā»: at the first hour)",
        "mark": "Mark, the father, a grain merchant (his name never changes form)",
        "et": "and",
        "quinn": "Quinn, the son (his name never changes form)",
        "ad": "to, toward (+ acc.)",
        "portum": "harbor (acc.)",
        "properant": "(they) hurry",
        "quia": "because",
        "nāvis": "ship",
        "avunculī": "of (their) uncle (gen. — the case ending sits on «avunculī», since the name «Ted» never changes)",
        "ted": "Ted, the uncle, Julia’s brother — his name never changes form",
        "hodiē": "today",
        "onerātur": "is being loaded (present passive)",
        "laetus": "happy",
        "enim": "for, you see (never the first word)",
        "amat": "loves",
        "omnia": "everything (neut. pl.)",
        "spectāre": "to watch",
        "cupit": "wants, desires",
        "portū": "harbor (abl.)",
        "labor": "work, toil",
        "ubīque": "everywhere",
        "frūmentum": "grain",
        "ā": "by (+ abl. — marks the agent); from",
        "servīs": "slaves (abl. — the agents, with «ā»)",
        "saccōs": "sacks (acc. pl.)",
        "pōnitur": "is put, is placed (present passive)",
        "saccī": "the sacks (nom. pl. — now the subject)",
        "plaustra": "wagons (first acc. after «in», then nom. subject)",
        "impōnuntur": "are loaded onto (present passive)",
        "horrea": "warehouses (acc. pl.)",
        "lentē": "slowly",
        "moventur": "are moved (present passive)",
        "māchina": "crane (nom.)",
        "magna": "great, big",
        "amphorās": "amphorae, large clay jars (acc. pl.)",
        "tollit": "lifts (active — the crane does the work)",
        "fūnēs": "ropes (nom. pl.)",
        "fabrīs": "workmen (abl. — the agents, with «ā»)",
        "tenentur": "are held (present passive)",
        "amphorae": "the amphorae (nom. pl.)",
        "nāvēs": "ships (acc. pl.)",
        "spectā": "look at…! (imperative)",
        "māchinam": "crane (acc.)",
        "clāmat": "shouts",
        "sine": "without (+ abl.)",
        "labōre": "toil (abl.)",
        "tolluntur": "are lifted (present passive)",
        "prope": "near (+ acc.)",
        "horreum": "warehouse (acc.)",
        "stat": "stands",
        "cūstōs": "guard, watchman",
        "validus": "strong, sturdy",
        "quī": "who (relative pronoun)",
        "mercēs": "goods, merchandise (acc. pl.)",
        "cūstōdit": "guards (active)",
        "cūr": "why?",
        "semper": "always",
        "hīc": "here",
        "stās": "you stand",
        "rogat": "asks",
        "officium": "duty",
        "meum": "my",
        "respondet": "answers, replies",
        "merx": "merchandise (nom. sg., used collectively: goods)",
        "pretiōsa": "valuable, precious",
        "malīs": "bad, wicked (abl. pl.)",
        "virīs": "men (abl. — the agents, with «ā»)",
        "saepe": "often",
        "petitur": "is sought, is gone after (present passive)",
        "itaque": "and so, therefore",
        "mē": "me (abl. — «ā mē»: by me)",
        "diū": "for a long time",
        "cūstōdītur": "is guarded (present passive)",
        "intereā": "meanwhile",
        "paula": "Paula, the daughter",
        "cum": "with (+ abl.)",
        "cane": "dog (abl., after «cum»)",
        "lupo": "Lupo, the family dog — quasi lupus! (his name never changes form)",
        "patrem": "father (acc.)",
        "currit": "runs",
        "omnēs": "all",
        "virī": "men (nom. pl.)",
        "tam": "so",
        "occupātī": "busy (nom. pl.)",
        "sunt": "are",
        "magnum": "great, big (neut.)",
        "negōtium": "business",
        "geritur": "is being carried on, is being done (present passive)",
        "mea": "my (vocative — he is speaking to her)",
        "fīlia": "daughter",
        "avunculus": "uncle (nom.)",
        "graeciam": "Greece (acc. — «in Graeciam»: to Greece)",
        "nāvigābit": "will sail (future)",
        "opus": "the work, the task",
        "iam": "already, now",
        "incipitur": "is being begun (present passive)",
        "crās": "tomorrow"
      },
      translation: [
        "The Fabius family is in Ostia again. At the first hour Mark and Quinn hurry to the harbor, because their uncle Ted’s ship is being loaded today. Quinn is happy: he loves the harbor, you see, and wants to watch everything.",
        "In the harbor there is work everywhere. Grain is put into sacks by slaves; the sacks are loaded onto wagons; the wagons are slowly moved to the warehouses. A great crane lifts the amphorae: the ropes are held by workmen, and the amphorae are loaded onto the ships. «Look at the crane!» shouts Quinn. «The amphorae are lifted without any toil!»",
        "Near the warehouse stands a sturdy watchman, who guards the goods. «Why are you always standing here?» asks Quinn. «It is my duty,» the watchman replies. «Valuable merchandise, you see, is often gone after by bad men; and so the warehouse is guarded by me for a long time.»",
        "Meanwhile Paula runs with the dog Lupo to her father. «Why are all the men so busy?» she asks. Mark replies: «Great business is being done today, my daughter. Your uncle’s ship is being loaded, because tomorrow Uncle Ted will sail to Greece. The work is already beginning!»"
      ],
      questions: [
        {
          q: "Why do Mark and Quinn hurry to the harbor at the first hour?",
          options: [
            "Their uncle Ted’s ship is being loaded today",
            "A storm is coming in from the sea",
            "Lupo has run off to the harbor again",
            "Mark must buy grain at the market"
          ],
          answer: 0,
          explain: "«quia nāvis avunculī Ted hodiē onerātur» — because their uncle Ted’s ship is being loaded today. Note the passive «onerātur»: the ship is having something done to it."
        },
        {
          q: "In «Frūmentum ā servīs in saccōs pōnitur», who is doing the placing?",
          options: [
            "The grain",
            "The slaves",
            "The sacks",
            "Nobody — the sentence names no doer"
          ],
          answer: 1,
          explain: "«ā servīs» is the ablative of agent: the grain (subject) is placed by the slaves. The sentence does name its doer — with «ā» + ablative."
        },
        {
          q: "How does the watchman explain his long hours by the warehouse?",
          options: [
            "He is waiting for Ted’s ship to arrive",
            "It is his duty, since valuable goods are often targeted by bad men",
            "He is paid a denarius for every hour he stands there",
            "He is guarding Lupo, who keeps stealing sausages"
          ],
          answer: 1,
          explain: "«Officium meum est… merx pretiōsa ā malīs virīs saepe petitur; itaque horreum ā mē diū cūstōdītur.» Duty, valuable goods, bad men — hence the guarding."
        },
        {
          q: "Which of these verbs from the reading is passive?",
          options: ["properant", "tollit", "geritur", "currit"],
          answer: 2,
          explain: "«geritur» ends in ‑tur — the passive fingerprint: business is being done. The other three are ordinary active forms."
        }
      ]
    },
    {
      title: "Nāvis avunculī onerātur",
      intro: "All day long Uncle Ted’s ship is loaded for tomorrow’s voyage to Greece — and Lupo commits one more crime.",
      paragraphs: [
        "Multās hōrās nāvis avunculī onerābātur, quia crās avunculus Ted in Graeciam nāvigābit. Frūmentum patris ā servīs ad portum vehēbātur; intereā amphorae vīnī et oleī ā fabrīs ex horreīs portābantur. Labor magnus erat, sed omnēs fortiter labōrābant.",
        "Ted, magister nāvis, in mediō portū stābat et omnia spectābat. «Age, sociī!» clāmābat. «Cūr plaustrum tam lentē movētur? Necesse est omnēs mercēs ante noctem impōnere! Opus ante noctem perficiētur!» Sociī itaque fūnēs trahēbant, et amphorae gravēs māchinā tollēbantur. Deinde saccī frūmentī ā servīs magistrō trādēbantur.",
        "Subitō magnus clāmor audītur: Lupo botulum ē corbe rapit et per portum fugit! «Tenē canem!» clāmat faber īrātus. Sed Lupo nōn capitur; celerior enim est quam omnēs fabrī. Paula rīdet: «Ecce! Botulus ā cane meō domum portātur!»",
        "Post multās hōrās opus tandem perficitur; nāvis plēna est. Crās prīmā hōrā avunculus Ted vēla dabit et in Graeciam nāvigābit. Julia tamen sollicita est. «Mare magnum est,» inquit, «et ventī saepe validī sunt.» Ted rīdet: «Cūr timēs, soror? Nāvis mea nova et valida est. Mox iterum ad vōs redībō, et tum multae fābulae mīrae ā mē nārrābuntur!»"
      ],
      glosses: {
        "multās": "many (acc. pl.)",
        "hōrās": "hours (acc.; bare «multās hōrās»: for many hours — duration; after «post»: after many hours)",
        "nāvis": "ship",
        "avunculī": "of (their) uncle (gen. — the case ending sits on «avunculī»)",
        "onerābātur": "was being loaded (imperfect passive)",
        "quia": "because",
        "crās": "tomorrow",
        "avunculus": "uncle (nom.)",
        "ted": "Ted, the uncle, Julia’s brother, the ship’s captain — his name never changes form",
        "in": "in (+ abl.); to, into (+ acc.)",
        "graeciam": "Greece (acc. — «in Graeciam»: to Greece)",
        "nāvigābit": "will sail (future)",
        "frūmentum": "grain",
        "patris": "of (their) father (gen.)",
        "ā": "by (+ abl. — marks the agent); from",
        "servīs": "slaves (abl. — the agents, with «ā»)",
        "ad": "to, toward (+ acc.)",
        "portum": "harbor (acc.)",
        "vehēbātur": "was being carted, conveyed (imperfect passive)",
        "intereā": "meanwhile",
        "amphorae": "amphorae, large clay jars (nom. pl.)",
        "vīnī": "of wine (gen.)",
        "et": "and",
        "oleī": "of olive oil (gen.)",
        "fabrīs": "workmen (abl. — the agents, with «ā»)",
        "ex": "out of (+ abl.)",
        "horreīs": "warehouses (abl. pl.)",
        "portābantur": "were being carried (imperfect passive)",
        "labor": "work, toil",
        "magnus": "great, big",
        "erat": "was",
        "sed": "but",
        "omnēs": "all, everyone",
        "fortiter": "hard, stoutly, bravely",
        "labōrābant": "were working",
        "magister": "master, captain («magister nāvis»: ship’s captain)",
        "mediō": "the middle of (abl.)",
        "portū": "harbor (abl.)",
        "stābat": "was standing",
        "omnia": "everything (neut. pl.)",
        "spectābat": "was watching",
        "age": "come on! (imperative)",
        "sociī": "partners (first a shout — ‘mates!’ (vocative); later the subject, nom. pl.)",
        "clāmābat": "kept shouting",
        "cūr": "why?",
        "plaustrum": "wagon (nom.)",
        "tam": "so",
        "lentē": "slowly",
        "movētur": "is being moved (present passive)",
        "necesse": "necessary («necesse est» + infinitive: it is necessary to…)",
        "est": "is",
        "mercēs": "goods, merchandise (acc. pl.)",
        "ante": "before (+ acc.)",
        "noctem": "night (acc.)",
        "impōnere": "to load on (infinitive)",
        "itaque": "and so, therefore",
        "fūnēs": "ropes (acc. pl.)",
        "trahēbant": "were hauling, were pulling",
        "gravēs": "heavy (nom. pl.)",
        "māchinā": "by the crane (bare abl. of means — a thing, so no «ā»)",
        "tollēbantur": "were being lifted (imperfect passive)",
        "deinde": "then, next",
        "saccī": "sacks (nom. pl.)",
        "frūmentī": "of grain (gen.)",
        "magistrō": "to the captain (dat. — the receiver)",
        "trādēbantur": "were being handed over (imperfect passive)",
        "subitō": "suddenly",
        "clāmor": "shout, uproar",
        "audītur": "is heard (present passive)",
        "lupo": "Lupo, the family dog — quasi lupus! (his name never changes form)",
        "botulum": "sausage (acc.)",
        "ē": "out of (+ abl.)",
        "corbe": "basket (abl.)",
        "rapit": "snatches",
        "per": "through (+ acc.)",
        "fugit": "flees, runs off",
        "tenē": "hold…! catch…! (imperative)",
        "canem": "dog (acc.)",
        "clāmat": "shouts",
        "faber": "workman (nom.)",
        "īrātus": "angry",
        "nōn": "not",
        "capitur": "is caught (present passive)",
        "celerior": "faster (comparative)",
        "enim": "for, you see (never the first word)",
        "quam": "than",
        "fabrī": "workmen (nom. pl.)",
        "paula": "Paula, the daughter",
        "rīdet": "laughs",
        "ecce": "look!",
        "botulus": "the sausage (nom. — now the subject!)",
        "cane": "dog (abl. — the agent, with «ā»)",
        "meō": "my (abl.)",
        "domum": "home, homeward",
        "portātur": "is being carried (present passive)",
        "post": "after (+ acc.)",
        "opus": "the work, the task",
        "tandem": "at last",
        "perficitur": "is finished, is completed (present passive)",
        "perficiētur": "will be completed (future passive — note the ē)",
        "plēna": "full",
        "prīmā": "first (abl., with «hōrā»)",
        "hōrā": "hour («prīmā hōrā»: at the first hour)",
        "vēla": "sails (acc. — «vēla dare»: to set sail)",
        "dabit": "will give (future; «vēla dabit»: he will set sail)",
        "julia": "Julia, the mother — her name declines like «puella»",
        "tamen": "however, nevertheless",
        "sollicita": "worried, anxious",
        "mare": "sea",
        "magnum": "big, great (neut.)",
        "inquit": "says, said (used with direct speech)",
        "ventī": "winds (nom. pl.)",
        "saepe": "often",
        "validī": "strong (nom. pl.)",
        "sunt": "are",
        "timēs": "you fear, you are afraid",
        "soror": "sister (vocative)",
        "mea": "my",
        "nova": "new",
        "valida": "strong",
        "mox": "soon",
        "iterum": "again",
        "vōs": "you (pl., acc. after «ad»)",
        "redībō": "I will come back (future)",
        "tum": "then",
        "multae": "many (nom. pl.)",
        "fābulae": "stories (nom. pl.)",
        "mīrae": "amazing, wondrous",
        "mē": "me (abl. — «ā mē»: by me)",
        "nārrābuntur": "will be told (future passive)"
      },
      translation: [
        "For many hours their uncle’s ship was being loaded, because tomorrow Uncle Ted will sail to Greece. Their father’s grain was being carted to the harbor by slaves; meanwhile amphorae of wine and olive oil were being carried out of the warehouses by workmen. The work was great, but everyone was working hard.",
        "Ted, the ship’s captain, was standing in the middle of the harbor, watching everything. «Come on, mates!» he kept shouting. «Why is that wagon being moved so slowly? All the goods must be loaded on before night! The work will be completed before night!» So his partners hauled the ropes, and the heavy amphorae were lifted by the crane. Then the sacks of grain were handed over to the captain by the slaves.",
        "Suddenly a great uproar is heard: Lupo snatches a sausage from a basket and flees through the harbor! «Catch the dog!» shouts an angry workman. But Lupo is not caught; he is faster, you see, than all the workmen. Paula laughs: «Look! The sausage is being carried home by my dog!»",
        "After many hours the work is at last finished; the ship is full. Tomorrow at the first hour Uncle Ted will set sail and voyage to Greece. Julia, however, is worried. «The sea is big,» she says, «and the winds are often strong.» Ted laughs: «Why are you afraid, sister? My ship is new and strong. Soon I shall come back to you again — and then many amazing stories will be told by me!»"
      ],
      questions: [
        {
          q: "For how long was the ship being loaded, and why?",
          options: [
            "For many hours, because Uncle Ted sails for Greece tomorrow",
            "For one hour, because the cargo was small",
            "All night, because the crane had broken",
            "For two days, because of a storm at sea"
          ],
          answer: 0,
          explain: "«Multās hōrās nāvis avunculī onerābātur, quia crās avunculus Ted in Graeciam nāvigābit» — accusative of duration plus «quia» giving the reason."
        },
        {
          q: "In «amphorae gravēs māchinā tollēbantur», why is there no «ā» before «māchinā»?",
          options: [
            "The author simply left it out — «ā māchinā» would be equally correct",
            "«māchinā» is a thing, not a person: the ablative of means takes no preposition",
            "«ā» can never stand before a word beginning with m‑",
            "Because the verb is in the imperfect tense"
          ],
          answer: 1,
          explain: "People get «ā/ab» (agent); tools and things stand in the bare ablative (means). The crane is a thing — mighty, but still a thing."
        },
        {
          q: "What happens after Lupo snatches the sausage?",
          options: [
            "He is caught by the angry workman",
            "He drops it into the sea",
            "He is not caught — he is faster than all the workmen",
            "Ted throws him off the ship"
          ],
          answer: 2,
          explain: "«Sed Lupo nōn capitur; celerior enim est quam omnēs fabrī» — not caught, being faster than the whole workforce. As usual."
        },
        {
          q: "What does Ted promise will happen when he returns?",
          options: [
            "Gifts of gold and silver will be given to everyone",
            "Many amazing stories will be told by him",
            "A new ship will be built for Quinn",
            "He will never sail again"
          ],
          answer: 1,
          explain: "«multae fābulae mīrae ā mē nārrābuntur» — a future passive («nārrābuntur») with «ā mē» naming the agent: many amazing stories will be told by me."
        }
      ]
    }
  ],

  quiz: [
    {
      prompt: "Which ending marks a Latin verb as passive in the 3rd person singular?",
      options: ["‑t", "‑tur", "‑nt", "‑mus"],
      answer: 1,
      explain: "‑tur is the passive counterpart of active ‑t: «portat» (he carries) → «portātur» (he is carried). The ‑r is the passive fingerprint."
    },
    {
      prompt: "In «Nāvis ā nautīs onerātur», what is happening?",
      options: [
        "The ship is loading the sailors",
        "The sailors are being loaded by the ship",
        "The ship is being loaded by the sailors",
        "The ship loaded the sailors (in the past)"
      ],
      answer: 2,
      explain: "«nāvis» is the subject, «onerātur» is present passive, and «ā nautīs» names the agents: the ship is being loaded by the sailors."
    },
    {
      prompt: "«Amphorae tollēbantur» means:",
      options: [
        "The amphorae are being lifted",
        "The amphorae will be lifted",
        "The amphorae were being lifted",
        "The amphorae lift"
      ],
      answer: 2,
      explain: "‑bā‑ is the imperfect tense sign and ‑ntur the passive plural ending: they were being lifted."
    },
    {
      prompt: "«Opus perficiētur» — which translation is right?",
      options: [
        "The task is being finished",
        "The task was being finished",
        "The task will be finished",
        "Finish the task!"
      ],
      answer: 2,
      explain: "In the 3rd conjugation the ‑ē‑ signals the future passive: «perficitur» = is finished, «perficiētur» = will be finished."
    },
    {
      prompt: "When does a passive sentence use «ā/ab» with the ablative?",
      options: [
        "Always, whenever any doer is mentioned",
        "When the doer is a person (or an animal)",
        "When the doer is a thing or a tool",
        "Only in questions"
      ],
      answer: 1,
      explain: "«ā/ab» + ablative marks a living agent: «ā fabrō» — by the workman. Things and tools take the bare ablative of means, no preposition."
    },
    {
      prompt: "In «Plaustrum frūmentō onerātur», the word «frūmentō» is…",
      options: [
        "the subject of the sentence",
        "an agent — it should have «ā» in front",
        "an ablative of means: the wagon is loaded WITH grain",
        "a genitive of possession"
      ],
      answer: 2,
      explain: "Grain is stuff, not a person, so it stands in the bare ablative of means: the wagon is being loaded with (by means of) grain."
    },
    {
      prompt: "Which verb form is FUTURE passive?",
      options: ["movētur", "movēbātur", "movēbitur", "movēre"],
      answer: 2,
      explain: "For a 2nd-conjugation verb like «moveō», ‑bitur is future passive: «movēbitur» — it will be moved. «movētur» is present, «movēbātur» imperfect, «movēre» the infinitive."
    },
    {
      prompt: "In «Merx ā cūstōde cūstōdiēbātur», who was guarding what?",
      options: [
        "The guard was being guarded by the merchandise",
        "The merchandise was being guarded by the guard",
        "The merchandise will be guarded by the guard",
        "The guard is guarding the merchandise right now"
      ],
      answer: 1,
      explain: "«merx» is the subject of the imperfect passive «cūstōdiēbātur», and «ā cūstōde» names the agent: the goods were being guarded by the watchman."
    }
  ]
});
