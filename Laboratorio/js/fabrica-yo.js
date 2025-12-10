// ELEMENTOS DEL DOM
const deicticContainer = document.getElementById("deicticContainer");
const childFace = document.getElementById("childFace");
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
const finalOverlay = document.getElementById("finalOverlay");
const finalRestartButton = document.getElementById("finalRestartButton");

// ESTADO DEL LABORATORIO
let phase = "deictic"; // 'deictic' o 'contents'
let currentIndex = 0;
let clarityLevel = 0; // 0 a 8
let answeredCorrectly = false;

// PREGUNTAS FASE 1D — NIÑO–ADULTO
const deicticQuestions = [
  {
    question: "¿Quién eres tú?",
    options: ["Yo", "Tú"],
    correctIndex: 0,
    feedback:
      "Cuando dices «yo», marcas el punto desde donde respondes. La palabra «yo» no describe tu carácter, indica una posición.",
    wrongDeicticFeedback:
      "Si dices «tú» aquí, cambias el lugar desde donde respondes. Vuelve a elegir la opción que marque tu propio punto de vista."
  },
  {
    question: "¿Quién soy yo?",
    options: ["Yo", "Tú"],
    correctIndex: 1,
    feedback:
      "Aquí «tú» marca a la otra persona. El marco yo–tú diferencia quién vive la experiencia y quién pregunta.",
    wrongDeicticFeedback:
      "Si respondes «yo», confundes tu punto de vista con el del adulto. Revisa quién hace la pregunta."
  },
  {
    question: "¿Dónde estás tú ahora?",
    options: ["Aquí", "Allá"],
    correctIndex: 0,
    feedback:
      "«Aquí» marca tu ubicación actual. El yo se ubica en un lugar, pero no se reduce a ese lugar.",
    wrongDeicticFeedback:
      "Si respondes «allá», pierdes la referencia. Recuerda: respondes como el niño, desde donde estás."
  },
  {
    question: "¿Dónde estoy yo?",
    options: ["Aquí", "Allá"],
    correctIndex: 1,
    feedback:
      "Si tú respondes, el otro está «allá». Tu punto de vista organiza dónde está cada uno.",
    wrongDeicticFeedback:
      "Si dices «aquí», te colocas en el lugar del adulto. Vuelve a responder desde tu propio punto."
  },
  {
    question: "¿Qué momento es hoy?",
    options: ["Ahora / Hoy", "Entonces / Ayer"],
    correctIndex: 0,
    feedback:
      "El marco ahora–entonces permite situar los eventos en el tiempo. El yo observa cómo cambian esos eventos.",
    wrongDeicticFeedback:
      "Si dices «entonces / ayer», estás hablando desde otro momento. Responde desde el tiempo presente."
  },
  {
    question: "¿Qué momento fue ayer?",
    options: ["Ahora / Hoy", "Entonces / Ayer"],
    correctIndex: 1,
    feedback:
      "Puedes hablar de «ayer» desde el lugar en el que estás ahora. Eso implica continuidad del yo a través del tiempo.",
    wrongDeicticFeedback:
      "Si eliges «ahora / hoy», confundes el tiempo actual con el pasado. Marca el momento que ya pasó."
  },
  {
    question: "¿Dónde estabas ayer?",
    options: ["Aquí", "Allá / En otro lugar"],
    correctIndex: 1,
    feedback:
      "Tu cuerpo puede haber estado en otro lugar, pero sigues respondiendo desde el mismo punto de «yo».",
    wrongDeicticFeedback:
      "Si respondes «aquí», borras el cambio de lugar. Marca que ayer estabas en otro sitio, aunque sigas siendo tú."
  },
  {
    question: "¿Quién eres ahora?",
    options: ["La misma persona que antes", "Alguien completamente distinto"],
    correctIndex: 0,
    feedback:
      "El contenido de tu historia cambia, pero el punto desde donde dices «yo» se mantiene. Aquí se consolida el yo deíctico.",
    wrongDeicticFeedback:
      "Si eliges «alguien completamente distinto», pierdes la continuidad del yo. Marca que sigues siendo tú, aunque la experiencia cambie."
  }
];

// PREGUNTAS FASE 1E — CONTENIDOS DEL YO
const contentQuestions = [
  {
    question: "¿Qué está ocurriendo en tu mente ahora?",
    options: [
      "Estoy pensando «soy aburrido»",
      "Yo soy mi pensamiento de aburrimiento"
    ],
    correctIndex: 0,
    activeBubble: "thought",
    feedback:
      "El pensamiento aparece en tu campo de experiencia, pero no eres idéntico al contenido del pensamiento.",
    coordFeedback:
      "Aquí has respondido con un MARCO DE COORDINACIÓN: «yo = pensamiento». Eso está bien como relación, pero el marco deíctico de «yo aquí ahora» no se fortalece. Vuelve a elegir la opción que trate al pensamiento como algo que te ocurre."
  },
  {
    question: "¿Qué notas en tu cuerpo en este momento?",
    options: ["Un nudo en el pecho", "Yo soy el nudo en el pecho"],
    correctIndex: 0,
    activeBubble: "emotion",
    feedback:
      "La sensación corporal es algo que te ocurre. El yo es el punto desde donde notas esa sensación.",
    coordFeedback:
      "Responder «yo soy el nudo» también es un MARCO DE COORDINACIÓN. No hay problema con la frase, pero si el yo se iguala a la sensación, se pierde la perspectiva de observación."
  },
  {
    question:
      "Mientras recuerdas cuando te gritaron, ¿sigues siendo tú?",
    options: ["Sí, sigo siendo yo", "No, soy otra persona"],
    correctIndex: 0,
    activeBubble: "memory",
    feedback:
      "Los recuerdos cambian y aparecen, pero el observador que los nota permanece. El yo no es el recuerdo.",
    coordFeedback:
      "Si eliges «no, soy otra persona», cortas la continuidad del yo a través del tiempo. Para el entrenamiento de perspectiva, marca que sigues siendo tú."
  },
  {
    question:
      "Si ahora sientes miedo intenso, ¿el miedo y tú son exactamente lo mismo?",
    options: ["No, es algo que me está pasando", "Sí, yo soy el miedo"],
    correctIndex: 0,
    activeBubble: "fear",
    feedback:
      "El miedo entra en tu campo de experiencia y puede ser muy fuerte, pero no agota quién eres. El yo observa esa experiencia.",
    coordFeedback:
      "«Yo soy el miedo» es otro ejemplo de MARCO DE COORDINACIÓN. Funcionalmente igualas el yo al contenido. Aquí queremos que notes el miedo como algo presente en tu campo, sin perder el punto de observación."
  }
];

// INICIALIZACIÓN
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
  finalOverlay.classList.remove("fy-final-overlay-active");
}

// ACTUALIZAR CONTENEDOR DEÍCTICO
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

  // CLARIDAD DEL ROSTRO SEGÚN NIVEL
  childFace.classList.remove("fy-face-soft", "fy-face-clear");

  if (clarityLevel >= 6) {
    childFace.classList.add("fy-face-clear");
  } else if (clarityLevel >= 3) {
    childFace.classList.add("fy-face-soft");
  }
}

// MÉTRICAS
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
    claridadLabel.textContent = "100%";
  }
}

// TEXTOS POR FASE
function configurePhaseTexts() {
  if (phase === "deictic") {
    phaseTag.textContent = "FASE 1D · NIÑO Y ADULTO";
    phaseTitle.textContent = "ENTRENANDO EL PUNTO DE «YO»";
    phaseDescription.textContent =
      "Responde como si fueras el niño que aprende a diferenciar quién es él, quién es el otro, dónde está y cuándo ocurren las cosas. No estamos describiendo tu personalidad, sino estabilizando el punto de vista.";
    sceneChildAdult.classList.remove("fy-scene-hidden");
    sceneContents.classList.add("fy-scene-hidden");
  } else {
    phaseTag.textContent = "FASE 1E · CONTENIDOS DEL YO";
    phaseTitle.textContent =
      "LO QUE CAMBIA DENTRO DEL CAMPO DE EXPERIENCIA";
    phaseDescription.textContent =
      "Ahora el punto de «yo» ya está claro. Observa cómo pensamientos, recuerdos y sensaciones entran y salen del campo de experiencia, mientras tu lugar como observador se mantiene.";
    sceneChildAdult.classList.add("fy-scene-hidden");
    sceneContents.classList.remove("fy-scene-hidden");
  }
}

// RENDERIZAR PREGUNTA ACTUAL
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

// RESPUESTAS FASE 1D
function handleDeicticAnswer(selectedIndex) {
  const q = deicticQuestions[currentIndex];
  const buttons = answerOptions.querySelectorAll(".fy-answer-button");

  if (answeredCorrectly) return;

  buttons.forEach((btn) => {
    btn.classList.remove("fy-answer-button-wrong", "fy-answer-button-correct");
  });

  if (selectedIndex === q.correctIndex) {
    buttons.forEach((btn, idx) => {
      if (idx === q.correctIndex) {
        btn.classList.add("fy-answer-button-correct");
      }
      btn.disabled = true;
    });

    clarityLevel = Math.min(8, clarityLevel + 1);
    updateDeicticContainer();
    feedbackArea.textContent = q.feedback;
    answeredCorrectly = true;
    nextButton.disabled = false;
  } else {
    buttons[selectedIndex].classList.add("fy-answer-button-wrong");
    feedbackArea.textContent = q.wrongDeicticFeedback;
  }

  updateMetrics();
}

// RESPUESTAS FASE 1E
function handleContentAnswer(selectedIndex) {
  const q = contentQuestions[currentIndex];
  const buttons = contentsOptions.querySelectorAll(".fy-answer-button");

  if (answeredCorrectly) return;

  buttons.forEach((btn) => {
    btn.classList.remove("fy-answer-button-wrong", "fy-answer-button-correct");
  });

  if (selectedIndex === q.correctIndex) {
    buttons.forEach((btn, idx) => {
      if (idx === q.correctIndex) {
        btn.classList.add("fy-answer-button-correct");
      }
      btn.disabled = true;
    });
    feedbackArea.textContent = q.feedback;
    answeredCorrectly = true;
    nextButton.disabled = false;
  } else {
    buttons[selectedIndex].classList.add("fy-answer-button-wrong");
    feedbackArea.textContent = q.coordFeedback;
  }
}

// BURBUJAS
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

// BOTONES GLOBALES
nextButton.addEventListener("click", () => {
  if (!answeredCorrectly) return;

  if (phase === "deictic") {
    if (currentIndex < deicticQuestions.length - 1) {
      currentIndex++;
      renderCurrentQuestion();
    } else {
      // Pasar a fase de contenidos
      phase = "contents";
      currentIndex = 0;
      clarityLevel = 8; // punto de vista al máximo
      updateDeicticContainer();
      configurePhaseTexts();
      renderCurrentQuestion();
      feedbackArea.textContent =
        "Ahora observa cómo pensamientos, recuerdos y sensaciones cambian dentro del campo, mientras tu punto de «yo aquí ahora» se mantiene.";
    }
  } else {
    if (currentIndex < contentQuestions.length - 1) {
      currentIndex++;
      renderCurrentQuestion();
    } else {
      // Fin del laboratorio: mostrar overlay final
      feedbackArea.textContent =
        "Has completado esta parte de La Fábrica del Yo. El yo se mantiene como punto de observación mientras cambian lugar, tiempo y contenidos de la experiencia.";
      nextButton.disabled = true;
      finalOverlay.classList.add("fy-final-overlay-active");
    }
  }
});

resetButton.addEventListener("click", initLab);
finalRestartButton.addEventListener("click", initLab);

// INICIO
initLab();
