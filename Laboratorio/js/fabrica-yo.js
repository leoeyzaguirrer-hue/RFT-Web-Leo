// Elementos básicos
const deicticContainer = document.getElementById("deicticContainer");
const faseLabel = document.getElementById("faseLabel");
const preguntaLabel = document.getElementById("preguntaLabel");
const claridadLabel = document.getElementById("claridadLabel");
const phaseTag = document.getElementById("phaseTag");
const phaseTitle = document.getElementById("phaseTitle");
const phaseDescription = document.getElementById("phaseDescription");
const feedbackArea = document.getElementById("feedbackArea");

const sceneChildAdult = document.getElementById("sceneChildAdult");
const sceneContents = document.getElementById("sceneContents");

const adultQuestion = document.getElementById("adultQuestion");
const answerOptions = document.getElementById("answerOptions");
const contentsQuestion = document.getElementById("contentsQuestion");
const contentsOptions = document.getElementById("contentsOptions");

const bubbleThought = document.getElementById("bubbleThought");
const bubbleEmotion = document.getElementById("bubbleEmotion");
const bubbleMemory = document.getElementById("bubbleMemory");
const bubbleFear = document.getElementById("bubbleFear");

const resetButton = document.getElementById("resetButton");
const nextButton = document.getElementById("nextButton");

// Estado del laboratorio
let phase = "deictic"; // 'deictic' o 'contents'
let currentIndex = 0;
let clarityLevel = 0; // 0 a 8
let answeredCorrectly = false;

// Preguntas de FASE 1D — Niño–adulto
const deicticQuestions = [
  {
    question: "¿Quién eres tú?",
    options: ["Yo", "Tú"],
    correctIndex: 0,
    feedback:
      "Cuando dices «yo», marcas el punto desde donde respondes. La palabra «yo» no describe un rasgo, indica una posición."
  },
  {
    question: "¿Quién soy yo?",
    options: ["Yo", "Tú"],
    correctIndex: 1,
    feedback:
      "Aquí «tú» marca a la otra persona. El marco yo–tú diferencia quién vive la experiencia y quién pregunta."
  },
  {
    question: "¿Dónde estás tú ahora?",
    options: ["Aquí", "Allá"],
    correctIndex: 0,
    feedback:
      "«Aquí» marca tu ubicación actual, no quién eres. El yo se ubica en un lugar, pero no se reduce al lugar."
  },
  {
    question: "¿Dónde estoy yo?",
    options: ["Aquí", "Allá"],
    correctIndex: 1,
    feedback:
      "Si tú respondes, el otro está «allá». Tu punto de vista organiza dónde está cada uno."
  },
  {
    question: "¿Qué día es hoy?",
    options: ["Ahora / Hoy", "Ayer"],
    correctIndex: 0,
    feedback:
      "El marco ahora–antes permite situar los eventos en el tiempo. El yo observa cómo cambian esos eventos."
  },
  {
    question: "¿Qué día fue ayer?",
    options: ["Ahora / Hoy", "Ayer"],
    correctIndex: 1,
    feedback:
      "Puedes hablar de «ayer» desde el lugar en el que estás ahora. Eso implica continuidad del yo a través del tiempo."
  },
  {
    question: "¿Dónde estabas ayer?",
    options: ["Aquí", "Allá / En otro lugar"],
    correctIndex: 1,
    feedback:
      "Tu cuerpo puede haber estado en otro lugar, pero sigues respondiendo desde el mismo punto de «yo»."
  },
  {
    question: "¿Quién eres ahora?",
    options: ["La misma persona que antes", "Alguien completamente distinto"],
    correctIndex: 0,
    feedback:
      "El contenido de tu historia cambia, pero el punto desde donde dices «yo» se mantiene. Aquí se consolida el yo deíctico."
  }
];

// Preguntas de FASE 1E — Contenidos en el campo del yo
const contentQuestions = [
  {
    question: "¿Qué está ocurriendo en tu mente ahora?",
    options: ["Estoy pensando «soy aburrido»", "Yo soy mi pensamiento"],
    correctIndex: 0,
    activeBubble: "thought",
    feedback:
      "El pensamiento aparece en tu campo de experiencia, pero no eres idéntico al contenido del pensamiento."
  },
  {
    question: "¿Qué notas en tu cuerpo en este momento?",
    options: ["Un nudo en el pecho", "Yo soy el nudo"],
    correctIndex: 0,
    activeBubble: "emotion",
    feedback:
      "La sensación corporal es algo que te ocurre. El yo es el punto desde donde notas esa sensación."
  },
  {
    question: "Mientras recuerdas cuando te gritaron, ¿sigues siendo tú?",
    options: ["Sí, sigo siendo yo", "No, soy otra persona"],
    correctIndex: 0,
    activeBubble: "memory",
    feedback:
      "Los recuerdos cambian y aparecen, pero el observador que los nota permanece. El yo no es el recuerdo."
  },
  {
    question:
      "Si ahora sientes miedo, ¿el miedo y tú son exactamente lo mismo?",
    options: ["No, es algo que me está pasando", "Sí, yo soy el miedo"],
    correctIndex: 0,
    activeBubble: "fear",
    feedback:
      "El miedo entra en tu campo de experiencia y puede ser intenso, pero no agota quién eres. El yo observa esa experiencia."
  }
];

// Inicialización
function initLab() {
  phase = "deictic";
  currentIndex = 0;
  clarityLevel = 0;
  answeredCorrectly = false;

  updateDeicticContainer();
  updateMetrics();
  configurePhaseTexts();
  renderCurrentQuestion();
  resetBubbles();

  nextButton.disabled = true;
  feedbackArea.textContent =
    "Recuerda: estamos entrenando el lugar desde donde respondes, no tus rasgos de personalidad.";
}

function updateDeicticContainer() {
  const levels = [
    "fy-level-0",
    "fy-level-1",
    "fy-level-2",
    "fy-level-3",
    "fy-level-4",
    "fy-level-5",
    "fy-level-6",
    "fy-level-7",
    "fy-level-8"
  ];

  levels.forEach((cls) => deicticContainer.classList.remove(cls));

  const index = Math.max(0, Math.min(clarityLevel, 8));
  deicticContainer.classList.add(levels[index]);
}

function updateMetrics() {
  if (phase === "deictic") {
    faseLabel.textContent =
      "Fase 1 · Marcos de persona, lugar y tiempo (niño–adulto)";
    preguntaLabel.textContent = `${currentIndex + 1} / ${deicticQuestions.length}`;
    const pct = Math.round((clarityLevel / 8) * 100);
    claridadLabel.textContent = `${pct}%`;
  } else {
    faseLabel.textContent =
      "Fase 2 · Contenidos en el campo del yo (pensamientos, sensaciones)";
    preguntaLabel.textContent = `${currentIndex + 1} / ${contentQuestions.length}`;
    claridadLabel.textContent =
      "El punto de vista permanece estable mientras cambian los contenidos";
  }
}

function configurePhaseTexts() {
  if (phase === "deictic") {
    phaseTag.textContent = "Fase 1D · Niño y adulto";
    phaseTitle.textContent = "Entrenando el punto de «yo»";
    phaseDescription.textContent =
      "Responde como si fueras el niño que aprende a diferenciar quién es él, quién es el otro, dónde está y cuándo ocurren las cosas. No estamos describiendo tu personalidad, sino estabilizando el punto de vista.";
    sceneChildAdult.classList.remove("fy-scene-hidden");
    sceneContents.classList.add("fy-scene-hidden");
  } else {
    phaseTag.textContent = "Fase 1E · Contenidos del yo";
    phaseTitle.textContent = "Lo que cambia dentro del campo de experiencia";
    phaseDescription.textContent =
      "Ahora el punto de «yo» ya está claro. Observa cómo pensamientos, recuerdos y sensaciones entran y salen del campo de experiencia, mientras tu lugar como observador se mantiene.";
    sceneChildAdult.classList.add("fy-scene-hidden");
    sceneContents.classList.remove("fy-scene-hidden");
  }
}

// Renderizado de preguntas
function renderCurrentQuestion() {
  answeredCorrectly = false;
  nextButton.disabled = true;

  if (phase === "deictic") {
    const q = deicticQuestions[currentIndex];
    adultQuestion.textContent = q.question;
    answerOptions.innerHTML = "";
    q.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "fy-answer-button";
      btn.textContent = opt;
      btn.addEventListener("click", () => handleDeicticAnswer(idx));
      answerOptions.appendChild(btn);
    });
  } else {
    const q = contentQuestions[currentIndex];
    contentsQuestion.textContent = q.question;
    contentsOptions.innerHTML = "";
    resetBubbles();
    activateBubble(q.activeBubble);
    q.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "fy-answer-button";
      btn.textContent = opt;
      btn.addEventListener("click", () => handleContentAnswer(idx));
      contentsOptions.appendChild(btn);
    });
  }

  updateMetrics();
}

// Manejo de respuestas
function handleDeicticAnswer(selectedIndex) {
  if (answeredCorrectly) return;
  const q = deicticQuestions[currentIndex];
  const buttons = answerOptions.querySelectorAll(".fy-answer-button");

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correctIndex) {
      btn.classList.add("fy-answer-button-correct");
    }
    if (idx === selectedIndex && idx !== q.correctIndex) {
      btn.classList.add("fy-answer-button-wrong");
    }
  });

  if (selectedIndex === q.correctIndex) {
    clarityLevel = Math.min(8, clarityLevel + 1);
    updateDeicticContainer();
    feedbackArea.textContent = q.feedback;
    answeredCorrectly = true;
    nextButton.disabled = false;
  } else {
    feedbackArea.textContent =
      "Esa respuesta no organiza bien el punto de vista. Vuelve a leer la pregunta: ¿desde dónde estás respondiendo?";
  }
}

function handleContentAnswer(selectedIndex) {
  if (answeredCorrectly) return;
  const q = contentQuestions[currentIndex];
  const buttons = contentsOptions.querySelectorAll(".fy-answer-button");

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correctIndex) {
      btn.classList.add("fy-answer-button-correct");
    }
    if (idx === selectedIndex && idx !== q.correctIndex) {
      btn.classList.add("fy-answer-button-wrong");
    }
  });

  if (selectedIndex === q.correctIndex) {
    feedbackArea.textContent = q.feedback;
    answeredCorrectly = true;
    nextButton.disabled = false;
  } else {
    feedbackArea.textContent =
      "Si el yo se vuelve idéntico al contenido, se pierde la función de observación. Elige la opción que trate al pensamiento o la sensación como algo que te ocurre.";
  }
}

// Burbujas de contenido
function resetBubbles() {
  [
    bubbleThought,
    bubbleEmotion,
    bubbleMemory,
    bubbleFear
  ].forEach((b) => b.classList.remove("fy-bubble-active"));
}

function activateBubble(type) {
  resetBubbles();
  if (type === "thought") bubbleThought.classList.add("fy-bubble-active");
  if (type === "emotion") bubbleEmotion.classList.add("fy-bubble-active");
  if (type === "memory") bubbleMemory.classList.add("fy-bubble-active");
  if (type === "fear") bubbleFear.classList.add("fy-bubble-active");
}

// Botones globales
nextButton.addEventListener("click", () => {
  if (!answeredCorrectly) return;

  if (phase === "deictic") {
    if (currentIndex < deicticQuestions.length - 1) {
      currentIndex++;
      renderCurrentQuestion();
    } else {
      // Pasar a la fase de contenidos
      phase = "contents";
      currentIndex = 0;
      configurePhaseTexts();
      renderCurrentQuestion();
      feedbackArea.textContent =
        "Ahora observa cómo pensamientos, recuerdos y sensaciones cambian dentro del campo, mientras tu punto de «yo» permanece.";
    }
  } else {
    if (currentIndex < contentQuestions.length - 1) {
      currentIndex++;
      renderCurrentQuestion();
    } else {
      feedbackArea.textContent =
        "Has completado esta parte de La Fábrica del Yo. El yo se mantiene como punto de observación mientras cambian lugar, tiempo y contenidos de la experiencia.";
      nextButton.disabled = true;
    }
  }
});

resetButton.addEventListener("click", initLab);

// Iniciar
initLab();
