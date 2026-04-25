const DATA = {
  pronouns: {
    i: { english: "I", zulmera: "Zov" },
    you: { english: "You", zulmera: "Ztu" },
    he: { english: "He", zulmera: "Eil" },
    she: { english: "She", zulmera: "Ela" },
    we: { english: "We", zulmera: "Noz" },
    youPlural: { english: "You (plural)", zulmera: "Uzted" },
    they: { english: "They (masc / neutral)", zulmera: "Eilon" },
    theyFem: { english: "They (fem)", zulmera: "Elan" }
  },
  questionWords: {
    yesno: "Evar",
    what: "Velu",
    who: "Ziven",
    where: "Doun",
    when: "Keiven",
    why: "Porvel",
    how: "Koume"
  },
  conjunctions: {
    and: "Ei",
    but: "Per",
    or: "Ou",
    because: "Porke",
    so: "Enz",
    although: "Aunk",
    if: "Zif"
  },
  greetings: {
    hello: "Zhola",
    hi: "Zho",
    "good morning": "Buneiv maneiv",
    "good afternoon": "Buneiv tardeiv",
    "good evening": "Buneiv nokheiv",
    "good night": "Buneiv nokheil",
    goodbye: "Adeivous",
    "see you later": "Eivour dospuv",
    "see you tomorrow": "Eivour maneiv"
  },
  politeness: {
    please: "Porvim",
    "thank you": "Greiziou",
    "thank you very much": "Muv greiziou",
    "you're welcome": "Deneiv",
    sorry: "Zientou",
    "excuse me": "Perdoun",
    "no problem": "Nuv probleim",
    yes: "Ziv",
    no: "Nuv",
    maybe: "Keizav",
    "i don't know": "Nuv Zov zeiv",
    "i understand": "Zov entienou",
    "i don't understand": "Nuv Zov entienou",
    "of course": "Porzuv",
    welcome: "Bienveil"
  },
  timeWords: {
    today: "Hoiv",
    yesterday: "Eiveir",
    tomorrow: "Voreiv",
    now: "Eivour",
    later: "Dospuv",
    always: "Ziempr",
    never: "Nunke",
    soon: "Prountou"
  },
  numbers: {
    "0": "Zon",
    "1": "Eiv",
    "2": "Doz",
    "3": "Zhrei",
    "4": "Kuar",
    "5": "Vim",
    "6": "Zeis",
    "7": "Zeth",
    "8": "Ouv",
    "9": "Nev",
    "10": "Dekei"
  },
  days: {
    monday: "Luneiv",
    tuesday: "Marteiv",
    wednesday: "Merkeiv",
    thursday: "Jupeiv",
    friday: "Veneiv",
    saturday: "Zateiv",
    sunday: "Zoleiv"
  },
  months: {
    january: "Zhaneiv",
    february: "Febreiv",
    march: "Marzeiv",
    april: "Abreiv",
    may: "Maieiv",
    june: "Juneiv",
    july: "Juleiv",
    august: "Agouzeiv",
    september: "Zepteiv",
    october: "Okteiv",
    november: "Noveiv",
    december: "Dekeiv"
  },
  colors: new Set([
    "red", "blue", "yellow", "green", "orange", "grey", "gray",
    "purple", "pink", "white", "black", "brown", "gold", "silver"
  ]),
  irregularVerbs: {
    estar: {
      i: "eztou",
      you: "eztes",
      he: "ezte",
      we: "eztemous",
      they: "ezten"
    },
    ser: {
      i: "zou",
      you: "zes",
      he: "ze",
      we: "zemous",
      they: "zen"
    }
  }
};

const REFERENCE_TABLES = [
  {
    title: "Pronouns",
    headers: ["English", "Zulmera"],
    rows: [
      ["I", "Zov"],
      ["You", "Ztu"],
      ["He", "Eil"],
      ["She", "Ela"],
      ["We", "Noz"],
      ["They (masc / neutral)", "Eilon"],
      ["They (fem)", "Elan"]
    ]
  },
  {
    title: "Question Words",
    headers: ["English", "Zulmera"],
    rows: [
      ["What", "Velu"],
      ["Who", "Ziven"],
      ["Where", "Doun"],
      ["When", "Keiven"],
      ["Why", "Porvel"],
      ["How", "Koume"]
    ]
  },
  {
    title: "Conjunctions",
    headers: ["English", "Zulmera"],
    rows: [
      ["And", "Ei"],
      ["But", "Per"],
      ["Or", "Ou"],
      ["Because", "Porke"],
      ["So / Therefore", "Enz"],
      ["Although", "Aunk"],
      ["If", "Zif"]
    ]
  },
  {
    title: "Greetings",
    headers: ["English", "Zulmera"],
    rows: [
      ["Hello", "Zhola"],
      ["Good morning", "Buneiv maneiv"],
      ["Good afternoon", "Buneiv tardeiv"],
      ["Good evening", "Buneiv nokheiv"],
      ["Goodbye", "Adeivous"],
      ["See you later", "Eivour dospuv"]
    ]
  },
  {
    title: "Numbers 0-10",
    headers: ["Number", "Zulmera"],
    rows: Object.entries(DATA.numbers)
  },
  {
    title: "Days and Months",
    headers: ["English", "Zulmera"],
    rows: [
      ...Object.entries(DATA.days),
      ...Object.entries(DATA.months)
    ]
  }
];

document.addEventListener("DOMContentLoaded", () => {
  populatePronouns();
  renderReferenceTables();
  bindComposer();
  bindLookup();
  bindWordTools();
  updateSubjectMode();
  composeSentence();
  runLookup();
  runWordTransform();
  runVerbTransform();
});

function populatePronouns() {
  const subjectPronoun = document.getElementById("subjectPronoun");
  Object.entries(DATA.pronouns).forEach(([key, entry]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = `${entry.english} (${entry.zulmera})`;
    subjectPronoun.appendChild(option);
  });
}

function renderReferenceTables() {
  const grid = document.getElementById("referenceGrid");
  REFERENCE_TABLES.forEach((table) => {
    const card = document.createElement("article");
    card.className = "reference-card";
    card.innerHTML = `
      <h3>${table.title}</h3>
      <table>
        <thead>
          <tr>${table.headers.map((header) => `<th>${header}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${table.rows
            .map((row) => `<tr><td>${capitalizeCell(row[0])}</td><td><strong>${row[1]}</strong></td></tr>`)
            .join("")}
        </tbody>
      </table>
    `;
    grid.appendChild(card);
  });
}

function bindComposer() {
  const composerIds = [
    "questionType", "verbInput", "verbPerson", "tense", "negation", "feelingInput",
    "subjectMode", "subjectPronoun", "subjectPhrase", "subjectGender", "subjectNumber",
    "objectPhrase", "objectGender", "objectNumber"
  ];

  composerIds.forEach((id) => {
    const node = document.getElementById(id);
    const eventName = node.tagName === "SELECT" || node.type === "checkbox" ? "change" : "input";
    node.addEventListener(eventName, () => {
      if (id === "subjectMode") {
        updateSubjectMode();
      }
      composeSentence();
    });
  });

  document.getElementById("composeButton").addEventListener("click", composeSentence);
  document.getElementById("clearComposer").addEventListener("click", () => {
    document.getElementById("questionType").value = "statement";
    document.getElementById("verbInput").value = "";
    document.getElementById("verbPerson").value = "i";
    document.getElementById("tense").value = "present";
    document.getElementById("negation").checked = false;
    document.getElementById("feelingInput").value = "";
    document.getElementById("subjectMode").value = "noun";
    document.getElementById("subjectPronoun").value = "i";
    document.getElementById("subjectPhrase").value = "";
    document.getElementById("subjectGender").value = "masc";
    document.getElementById("subjectNumber").value = "singular";
    document.getElementById("objectPhrase").value = "";
    document.getElementById("objectGender").value = "masc";
    document.getElementById("objectNumber").value = "singular";
    updateSubjectMode();
    composeSentence();
  });
}

function bindLookup() {
  document.getElementById("lookupButton").addEventListener("click", runLookup);
  document.getElementById("lookupInput").addEventListener("input", runLookup);
}

function bindWordTools() {
  document.getElementById("wordButton").addEventListener("click", runWordTransform);
  document.getElementById("wordInput").addEventListener("input", runWordTransform);
  document.getElementById("wordType").addEventListener("change", runWordTransform);
  document.getElementById("verbButton").addEventListener("click", runVerbTransform);
  ["verbOnlyInput", "verbOnlyPerson", "verbOnlyTense", "verbOnlyNegative"].forEach((id) => {
    const node = document.getElementById(id);
    const eventName = node.tagName === "SELECT" || node.type === "checkbox" ? "change" : "input";
    node.addEventListener(eventName, runVerbTransform);
  });
}

function updateSubjectMode() {
  const mode = document.getElementById("subjectMode").value;
  document.querySelectorAll("[data-group='subjectPronoun']").forEach((node) => {
    node.hidden = mode !== "pronoun";
  });
  document.querySelectorAll("[data-group='subjectNoun']").forEach((node) => {
    node.hidden = mode !== "noun";
  });
}

function composeSentence() {
  const questionType = document.getElementById("questionType").value;
  const verbInput = document.getElementById("verbInput").value.trim();
  const verbPerson = document.getElementById("verbPerson").value;
  const tense = document.getElementById("tense").value;
  const negation = document.getElementById("negation").checked;
  const feelingInput = document.getElementById("feelingInput").value.trim();
  const subjectMode = document.getElementById("subjectMode").value;
  const subjectPronoun = document.getElementById("subjectPronoun").value || "i";
  const subjectPhrase = document.getElementById("subjectPhrase").value.trim();
  const subjectGender = document.getElementById("subjectGender").value;
  const subjectNumber = document.getElementById("subjectNumber").value;
  const objectPhrase = document.getElementById("objectPhrase").value.trim();
  const objectGender = document.getElementById("objectGender").value;
  const objectNumber = document.getElementById("objectNumber").value;

  const head = [];
  if (questionType !== "statement") {
    head.push(DATA.questionWords[questionType]);
  }
  if (negation) {
    head.push("Nuv");
  }
  if (tense === "past") {
    head.push("Zeil");
  } else if (tense === "future") {
    head.push("Vora");
  }

  const verb = conjugateSpanishVerb(verbInput, verbPerson);
  if (verb) {
    head.push(verb);
  }

  const feeling = normalizeSpacing(feelingInput);
  if (feeling) {
    head.push(feeling);
  }

  let subjectChunk = "";
  let subjectMeta = "";
  if (subjectMode === "pronoun") {
    subjectChunk = DATA.pronouns[subjectPronoun].zulmera;
    subjectMeta = `Pronoun subject uses ${subjectChunk} and drops the subject linker.`;
  } else {
    const shapedSubject = transformEnglishPhrase(subjectPhrase || "girl");
    const subjectLinker = getSubjectLinker(subjectGender, subjectNumber);
    subjectChunk = `zi ${shapedSubject} ${subjectLinker}`;
    subjectMeta = `Zi introduces the subject, then ${subjectLinker} marks ${subjectGender === "fem" ? "feminine" : "masculine / neutral"} ${subjectNumber}.`;
  }

  let objectChunk = "";
  let objectMeta = "No object bridge yet.";
  if (objectPhrase) {
    const shapedObject = transformEnglishPhrase(objectPhrase);
    const objectLinker = getObjectLinker(objectGender, objectNumber);
    objectChunk = `${objectLinker} ${shapedObject}`;
    objectMeta = `${objectLinker} marks the object as ${objectGender === "fem" ? "feminine" : "masculine / neutral"} ${objectNumber}.`;
  }

  const output = normalizeSpacing([head.join(" "), subjectChunk, objectChunk].filter(Boolean).join(" "));
  const isBlankStarter = !verbInput && !feelingInput && !subjectPhrase && !objectPhrase && subjectMode === "noun";
  if (isBlankStarter) {
    document.getElementById("sentenceOutput").textContent = "Cantou zi girl vela atha sed zong";
    document.getElementById("sentenceBreakdown").textContent = "Sample line: action first, then Zi + subject linker, then the object bridge.";
    return;
  }

  document.getElementById("sentenceOutput").textContent = `${output || "Cantou zi girl vela atha sed zong"}${questionType === "statement" ? "" : "?"}`;
  document.getElementById("sentenceBreakdown").textContent = [subjectMeta, objectMeta].join(" ");
}

function runLookup() {
  const input = document.getElementById("lookupInput").value.trim();
  const outputNode = document.getElementById("lookupOutput");
  const metaNode = document.getElementById("lookupMeta");

  if (!input) {
    outputNode.textContent = "Buneiv maneiv";
    metaNode.textContent = "Try a reference phrase like good morning, thank you, or a noun phrase like cold river.";
    return;
  }

  const normalized = input.toLowerCase().trim();
  const dictionary =
    DATA.greetings[normalized] ||
    DATA.politeness[normalized] ||
    DATA.conjunctions[normalized] ||
    DATA.timeWords[normalized] ||
    DATA.days[normalized] ||
    DATA.months[normalized] ||
    DATA.numbers[normalized];

  if (dictionary) {
    outputNode.textContent = dictionary;
    metaNode.textContent = "Exact match from the Zulmera reference tables.";
    return;
  }

  const transformed = transformEnglishPhrase(input);
  outputNode.textContent = transformed;
  metaNode.textContent = "Fallback mode applied Zulmera phonetic rules to the English phrase.";
}

function runWordTransform() {
  const input = document.getElementById("wordInput").value.trim();
  const type = document.getElementById("wordType").value;
  const output = input ? transformEnglishWord(input, type) : "veter";
  document.getElementById("wordOutput").textContent = output;
}

function runVerbTransform() {
  const infinitive = document.getElementById("verbOnlyInput").value.trim();
  const person = document.getElementById("verbOnlyPerson").value;
  const tense = document.getElementById("verbOnlyTense").value;
  const negative = document.getElementById("verbOnlyNegative").checked;
  const verb = conjugateSpanishVerb(infinitive, person);
  const pieces = [];

  if (negative) {
    pieces.push("Nuv");
  }
  if (tense === "past") {
    pieces.push("Zeil");
  } else if (tense === "future") {
    pieces.push("Vora");
  }
  pieces.push(verb || "cantou");
  document.getElementById("verbOutput").textContent = pieces.join(" ");
}

function transformEnglishPhrase(phrase) {
  return phrase
    .split(/(\s+|-)/)
    .map((part) => {
      if (!part.trim() || /^\s+$/.test(part) || part === "-") {
        return part;
      }
      return transformEnglishWord(part, inferWordType(part));
    })
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

function transformEnglishWord(word, explicitType = "standard") {
  if (!word) {
    return "";
  }

  const type = explicitType || inferWordType(word);
  const leading = word.match(/^[^A-Za-z0-9]*/)?.[0] || "";
  const trailing = word.match(/[^A-Za-z0-9]*$/)?.[0] || "";
  const core = word.slice(leading.length, word.length - trailing.length);
  if (!core) {
    return word;
  }

  if (type === "person" || type === "color") {
    return `${leading}${core}${trailing}`;
  }

  const isCapitalized = /^[A-Z][a-z]+$/.test(core);
  let result = core.toLowerCase();

  result = result.replace(/th/g, "zh");
  result = result.replace(/w/g, "v");
  if (result.startsWith("s")) {
    result = `z${result.slice(1)}`;
  }

  const letters = result.split("");
  for (let i = 1; i < letters.length - 1; i += 1) {
    if (letters[i] === "a") {
      letters[i] = "e";
    } else if (letters[i] === "o") {
      letters[i] = "ou";
    }
  }
  result = letters.join("");
  result = result.replace(/([bcdfghjklmnpqrstvxzy])\1+/g, "$1");

  if (isCapitalized) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }

  return `${leading}${result}${trailing}`;
}

function inferWordType(word) {
  const cleaned = word.replace(/[^A-Za-z]/g, "");
  if (!cleaned) {
    return "standard";
  }
  if (DATA.colors.has(cleaned.toLowerCase())) {
    return "color";
  }
  if (/^[A-Z][a-z]+$/.test(cleaned)) {
    return "person";
  }
  return "standard";
}

function conjugateSpanishVerb(infinitive, person) {
  if (!infinitive) {
    return "";
  }

  const clean = infinitive.toLowerCase().trim();
  if (DATA.irregularVerbs[clean]) {
    return DATA.irregularVerbs[clean][person];
  }

  const endings = {
    i: "ou",
    you: "es",
    he: "e",
    we: "emous",
    they: "en"
  };

  if (!/(ar|er|ir)$/.test(clean)) {
    return clean;
  }

  const stem = clean.slice(0, -2);
  return `${stem}${endings[person]}`;
}

function getSubjectLinker(gender, number) {
  if (gender === "fem" && number === "plural") {
    return "velan";
  }
  if (gender === "fem") {
    return "vela";
  }
  if (number === "plural") {
    return "veln";
  }
  return "vel";
}

function getObjectLinker(gender, number) {
  if (gender === "fem" && number === "plural") {
    return "athan";
  }
  if (gender === "fem") {
    return "atha";
  }
  if (number === "plural") {
    return "athn";
  }
  return "ath";
}

function normalizeSpacing(text) {
  return text.replace(/\s+/g, " ").trim();
}

function capitalizeCell(value) {
  if (/^\d+$/.test(value)) {
    return value;
  }
  return value
    .split(" ")
    .map((word) => word ? word.charAt(0).toUpperCase() + word.slice(1) : word)
    .join(" ");
}
