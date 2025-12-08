// ============================================
// DATOS BÁSICOS DEL LABORATORIO
// ============================================

const phases = [
  {
    id: 1,
    title: "Fase 1 de 5 · Entrenamiento directo (A–B)",
    type: "trainingAB"
  },
  {
    id: 2,
    title: "Fase 2 de 5 · Entrenamiento directo (A–C)",
    type: "trainingAC"
  },
  {
    id: 3,
    title: "Fase 3 de 5 · Pruebas derivadas sin feedback",
    type: "derivedTests"
  },
  {
    id: 4,
    title: "Fase 4 de 5 · Visualización de clases de equivalencia",
    type: "visualization"
  },
  {
    id: 5,
    title: "Fase 5 de 5 · Transferencia de función dentro de la clase",
    type: "transfer"
  }
];

// Estímulos de las tres clases
const classesAB = [
  { A: "ZUG", B: "Círculo azul" },
  { A: "MIP", B: "Triángulo rojo" },
  { A: "TAV", B: "Cuadrado amarillo" }
];

const classesAC = [
  { A: "ZUG", C: "Montaña" },
  { A: "MIP", C: "Cuchillo" },
  { A: "TAV", C: "Perro" }
];

// Para transferencia de función (fase 5)
const functionsByC = {
  "Montaña": "Peligro físico",
  "Cuchillo": "Amenaza directa",
  "Perro": "Seguridad / protección"
};

// ============================================
// REFERENCIAS A ELEMENTOS DEL DOM
// ============================================

const phaseIndicatorEl = document.getElementById("labPhaseIndicator");
const phaseContentEl   = document.getElementById("labPhaseContent");
const feedbackEl       = document.getElementById("labFeedback");
const progressFillEl   = document.getElementById("labProgressFill");
const progressTextEl   = document.getElementById("labProgressText");

const btnResetPhase = document.getElementById("btnResetPhase");
const btnPrevPhase  = document.getElementById("btnPrevPhase");
const btnNextPhase  = document.getElementById("btnNextPhase");

// ============================================
// ESTADO GLOBAL
// ============================================

let currentPhaseIndex = 0;

// Fase 1 y 2: entrenamiento
let trainingTrialsAB = [];
let trainingTrialsAC = [];
let currentTrialIndex = 0;
let correctCountCurrentPhase = 0;

// Fase 3: pruebas derivadas
let derivedTrials = [];
let derivedIndex = 0;
let derivedCorrect = 0;

// Fase 5: transferencia
let transferTrials = [];
let transferIndex = 0;
let transferCorrect = 0;

// ============================================
// UTILIDADES
// ============================================

function shuffle(array) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ============================================
// RENDER PRINCIPAL
// ============================================

function renderPhase() {
  const phase = phases[currentPhaseIndex];

  // Indicador
  phaseIndicatorEl.textContent = phase.title;

  // Limpia feedback y progreso
  feedbackEl.textContent = "";
  progressFillEl.style.width = "0%";
  progressTextEl.textContent = "";

  // Render según tipo
  switch (phase.type) {
    case "trainingAB":
      setupTrainingAB();
      break;
    case "trainingAC":
      setupTrainingAC();
      break;
    case "derivedTests":
      setupDerivedTests();
      break;
    case "visualization":
      setupVisualization();
      break;
    case "transfer":
      setupTransfer();
      break;
  }

  // Habilita / deshabilita botones de fase
  btnPrevPhase.disabled = currentPhaseIndex === 0;
  btnNextPhase.disabled = currentPhaseIndex === phases.length - 1;
}

// ============================================
// FASE 1 – ENTRENAMIENTO AB
// ============================================

function setupTrainingAB() {
  // Prepara ensayos A–B (cada A aparece varias veces)
  trainingTrialsAB = [];
  correctCountCurrentPhase = 0;
  currentTrialIndex = 0;

  // 3 repeticiones por clase → 9 ensayos
  const base = classesAB.flatMap(item => [item, item, item]);
  trainingTrialsAB = shuffle(base);

  renderTrainingABTrial();
}

function renderTrainingABTrial() {
  const trial = trainingTrialsAB[currentTrialIndex];

  const allOptions = classesAB.map(c => c.B);
  const shuffledOptions = shuffle(allOptions);

  phaseContentEl.innerHTML = `
    <div class="lab-instructions">
      Entrena relaciones arbitrarias entre palabras sin sentido (A) y figuras (B).
      Responde por ensayo y error. Observa cómo tu historia de entrenamiento se acumula.
    </div>
    <div class="lab-stimulus-layout">
      <div class="lab-stimulus-card">
        <div class="lab-stimulus-label">Estímulo A</div>
        <div class="lab-stimulus-value">${trial.A}</div>
      </div>
      <div class="lab-options">
        ${shuffledOptions.map(opt => `
          <button class="lab-option-card" data-option="${opt}">
            <span>${opt}</span>
            <small>Selecciona la figura que “va con” esta palabra</small>
          </button>
        `).join("")}
      </div>
    </div>
  `;

  // Listeners
  const optionButtons = phaseContentEl.querySelectorAll(".lab-option-card");
  optionButtons.forEach(btn => {
    btn.addEventListener("click", () => handleTrainingABResponse(btn, trial));
  });

  updateTrainingProgress(trainingTrialsAB, currentTrialIndex, correctCountCurrentPhase);
}

function handleTrainingABResponse(buttonEl, trial) {
  const chosen = buttonEl.getAttribute("data-option");
  const isCorrect = chosen === trial.B;

  if (isCorrect) {
    correctCountCurrentPhase++;
    feedbackEl.textContent =
      "Correcto: esta relación A–B está siendo entrenada directamente por contingencias.";
  } else {
    feedbackEl.textContent =
      "En este ensayo la relación no coincide. Sigue intentando: el criterio viene de la historia de refuerzo.";
  }

  currentTrialIndex++;

  if (currentTrialIndex < trainingTrialsAB.length) {
    setTimeout(() => {
      renderTrainingABTrial();
    }, 700);
  } else {
    // Fase completada
    const total = trainingTrialsAB.length;
    const aciertos = correctCountCurrentPhase;
    const porcentaje = Math.round((aciertos / total) * 100);
    feedbackEl.textContent =
      `Fase 1 completada. Aciertos: ${aciertos} de ${total} (${porcentaje}%). ` +
      `Ya dispones de una historia de entrenamiento A–B que luego permitirá relaciones derivadas.`;

    // Desactivar botones de respuesta
    const optionButtons = phaseContentEl.querySelectorAll(".lab-option-card");
    optionButtons.forEach(btn => btn.classList.add("disabled"));
    updateTrainingProgress(trainingTrialsAB, trainingTrialsAB.length, correctCountCurrentPhase);
  }
}

function updateTrainingProgress(trialsArray, index, correctCount) {
  const total = trialsArray.length;
  const completed = Math.min(index, total);
  const progress = total > 0 ? (completed / total) * 100 : 0;
  progressFillEl.style.width = `${progress}%`;
  progressTextEl.textContent =
    `Ensayos completados: ${completed} de ${total} · Respuestas correctas: ${correctCount}`;
}

// ============================================
// FASE 2 – ENTRENAMIENTO AC
// ============================================

function setupTrainingAC() {
  trainingTrialsAC = [];
  correctCountCurrentPhase = 0;
  currentTrialIndex = 0;

  // 3 repeticiones por clase → 9 ensayos
  const base = classesAC.flatMap(item => [item, item, item]);
  trainingTrialsAC = shuffle(base);

  renderTrainingACTrial();
}

function renderTrainingACTrial() {
  const trial = trainingTrialsAC[currentTrialIndex];

  const allOptions = classesAC.map(c => c.C);
  const shuffledOptions = shuffle(allOptions);

  phaseContentEl.innerHTML = `
    <div class="lab-instructions">
      Ahora la misma palabra A se relaciona con nuevos estímulos C.
      Observa que nunca se presentan juntas las figuras de la fase anterior.
    </div>
    <div class="lab-stimulus-layout">
      <div class="lab-stimulus-card">
        <div class="lab-stimulus-label">Estímulo A</div>
        <div class="lab-stimulus-value">${trial.A}</div>
      </div>
      <div class="lab-options">
        ${shuffledOptions.map(opt => `
          <button class="lab-option-card" data-option="${opt}">
            <span>${opt}</span>
            <small>Elige la imagen que “va con” esta palabra</small>
          </button>
        `).join("")}
      </div>
    </div>
  `;

  const optionButtons = phaseContentEl.querySelectorAll(".lab-option-card");
  optionButtons.forEach(btn => {
    btn.addEventListener("click", () => handleTrainingACResponse(btn, trial));
  });

  updateTrainingProgress(trainingTrialsAC, currentTrialIndex, correctCountCurrentPhase);
}

function handleTrainingACResponse(buttonEl, trial) {
  const chosen = buttonEl.getAttribute("data-option");
  const isCorrect = chosen === trial.C;

  if (isCorrect) {
    correctCountCurrentPhase++;
    feedbackEl.textContent =
      "Correcto: construyes una nueva relación A–C sin ver nunca juntas las figuras de la fase anterior.";
  } else {
    feedbackEl.textContent =
      "En este ensayo la relación no coincide. La historia A–C también se moldea por contingencias.";
  }

  currentTrialIndex++;

  if (currentTrialIndex < trainingTrialsAC.length) {
    setTimeout(() => {
      renderTrainingACTrial();
    }, 700);
  } else {
    const total = trainingTrialsAC.length;
    const aciertos = correctCountCurrentPhase;
    const porcentaje = Math.round((aciertos / total) * 100);
    feedbackEl.textContent =
      `Fase 2 completada. Aciertos: ${aciertos} de ${total} (${porcentaje}%). ` +
      `Has entrenado dos redes A–B y A–C que nunca se presentaron juntas.`;

    const optionButtons = phaseContentEl.querySelectorAll(".lab-option-card");
    optionButtons.forEach(btn => btn.classList.add("disabled"));
    updateTrainingProgress(trainingTrialsAC, trainingTrialsAC.length, correctCountCurrentPhase);
  }
}

// ============================================
// FASE 3 – PRUEBAS DERIVADAS SIN FEEDBACK
// ============================================

function setupDerivedTests() {
  derivedIndex = 0;
  derivedCorrect = 0;

  // Construimos ensayos derivados simples:
  // B→C (transitividad) y C→B (equivalencia), más B→A y C→A (simetría)
  derivedTrials = [];

  classesAB.forEach(classItem => {
    const A = classItem.A;
    const B = classItem.B;
    const C = classesAC.find(c => c.A === A).C;

    // B → C
    derivedTrials.push({
      prompt: `A partir de tu entrenamiento, ¿qué imagen C crees que se relaciona con esta figura B?`,
      givenLabel: "Figura B",
      givenValue: B,
      options: classesAC.map(c => c.C),
      correctOption: C
    });

    // C → B
    derivedTrials.push({
      prompt: `A partir de tu entrenamiento, ¿qué figura B crees que se relaciona con esta imagen C?`,
      givenLabel: "Imagen C",
      givenValue: C,
      options: classesAB.map(c => c.B),
      correctOption: B
    });

    // B → A
    derivedTrials.push({
      prompt: `Ahora, desde la figura B, elige la palabra A que se relacionó con ella en tu entrenamiento.`,
      givenLabel: "Figura B",
      givenValue: B,
      options: classesAB.map(c => c.A),
      correctOption: A
    });

    // C → A
    derivedTrials.push({
      prompt: `Desde la imagen C, elige la palabra A que se relacionó con ella en tu entrenamiento.`,
      givenLabel: "Imagen C",
      givenValue: C,
      options: classesAC.map(c => c.A),
      correctOption: A
    });
  });

  derivedTrials = shuffle(derivedTrials);
  renderDerivedTrial();
}

function renderDerivedTrial() {
  const trial = derivedTrials[derivedIndex];

  const shuffledOptions = shuffle(trial.options);

  phaseContentEl.innerHTML = `
    <div class="lab-instructions">
      Pruebas derivadas sin feedback ensayo a ensayo.
      Responde según lo que <strong>crees que debería ser correcto</strong> a partir de lo que ya entrenaste.
    </div>
    <div class="lab-test-layout">
      <div class="lab-test-stimulus">
        <div class="lab-test-stimulus-label">${trial.givenLabel}</div>
        <div class="lab-test-stimulus-value">${trial.givenValue}</div>
      </div>
      <div class="lab-test-options">
        ${shuffledOptions.map(opt => `
          <button class="lab-option-card" data-option="${opt}">
            <span>${opt}</span>
            <small>Selecciona la mejor opción derivada</small>
          </button>
        `).join("")}
      </div>
    </div>
  `;

  const optionButtons = phaseContentEl.querySelectorAll(".lab-option-card");
  optionButtons.forEach(btn => {
    btn.addEventListener("click", () => handleDerivedResponse(btn, trial));
  });

  const total = derivedTrials.length;
  const completed = derivedIndex;
  const progress = total > 0 ? (completed / total) * 100 : 0;
  progressFillEl.style.width = `${progress}%`;
  progressTextEl.textContent =
    `Ensayos derivados: ${completed} de ${total} (sin feedback inmediato).`;

  // Feedback neutro en cada ensayo
  feedbackEl.textContent =
    "Respuestas registradas sin feedback inmediato. Al final verás cuántas relaciones derivadas emitiste correctamente.";
}

function handleDerivedResponse(buttonEl, trial) {
  const chosen = buttonEl.getAttribute("data-option");
  if (chosen === trial.correctOption) {
    derivedCorrect++;
  }

  derivedIndex++;

  if (derivedIndex < derivedTrials.length) {
    renderDerivedTrial();
  } else {
    // Fin de pruebas derivadas
    const total = derivedTrials.length;
    const porcentaje = Math.round((derivedCorrect / total) * 100);
    phaseContentEl.innerHTML = `
      <div class="lab-instructions">
        Resultados de las pruebas derivadas.
      </div>
      <p>
        Has respondido correctamente <strong>${derivedCorrect}</strong> de <strong>${total}</strong> ensayos derivados
        (${porcentaje}%). Ninguna de estas relaciones se entrenó directamente.
      </p>
      <p>
        Esto ilustra propiedades de <strong>simetría, transitividad y equivalencia</strong> en tu repertorio:
        respondiste “como si” hubieras aprendido explícitamente todas las combinaciones.
      </p>
    `;
    feedbackEl.textContent =
      "Aquí puedes detenerte a discutir qué implica comportarte correctamente ante relaciones nunca entrenadas de forma directa.";
    progressFillEl.style.width = "100%";
    progressTextEl.textContent =
      `Pruebas derivadas completadas. Relaciones emergentes evaluadas: ${total}.`;
  }
}

// ============================================
// FASE 4 – VISUALIZACIÓN DE CLASES
// ============================================

function setupVisualization() {
  // Oculta barra de progreso (no es relevante aquí)
  progressFillEl.style.width = "0%";
  progressTextEl.textContent = "";

  // Construimos la rep
