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
// FASE 1 – ENTRENAMIENTO AB (CON SUBFASE GUIADA)
// ============================================

let guidedDemoDone = false;
let labeledTrialsRemaining = 3;

function setupTrainingAB() {
  trainingTrialsAB = [];
  correctCountCurrentPhase = 0;
  currentTrialIndex = 0;
  guidedDemoDone = false;
  labeledTrialsRemaining = 3;

  const base = classesAB.flatMap(item => [item, item, item]);
  trainingTrialsAB = shuffle(base);

  renderGuidedABDemo();
}

function renderGuidedABDemo() {
  const demoPairs = [classesAB[0], classesAB[1]]; // TAV y MIP
  let demoIndex = 0;

  function showDemoPair() {
    const demo = demoPairs[demoIndex];

    phaseContentEl.innerHTML = `
      <div class="lab-instructions">
        En este laboratorio aprenderás relaciones <strong>arbitrarias</strong> entre palabras sin sentido (A)
        y figuras (B). Estas conexiones no son naturales: se construyen por entrenamiento.
      </div>

      <div class="lab-stimulus-layout">
        <div class="lab-stimulus-card">
          <div class="lab-stimulus-label">Estímulo A (palabra)</div>
          <div class="lab-stimulus-value">${demo.A}</div>
        </div>

        <div class="lab-stimulus-card">
          <div class="lab-stimulus-label">Estímulo B (figura)</div>
          <div class="lab-stimulus-value">${demo.B}</div>
        </div>
      </div>

      <div class="lab-instructions" style="margin-top:16px;">
        Observa esta relación correcta. No intentes memorizarla como un “dato”,
        sino como una relación que se fortalece por contingencias.
      </div>

      <div style="margin-top:18px; text-align:right; display:flex; gap:10px; justify-content:flex-end;">
        ${demoIndex < demoPairs.length - 1
          ? `<button class="lab-btn lab-btn-secondary" id="btnNextDemo">Ver siguiente ejemplo</button>`
          : `<button class="lab-btn lab-btn-primary" id="btnStartGuidedAB">Comenzar entrenamiento A–B</button>`
        }
      </div>
    `;

    feedbackEl.textContent =
      `Ejemplo guiado ${demoIndex + 1} de ${demoPairs.length}: esta es una relación A–B correcta presentada solo como modelo.`;

    progressFillEl.style.width = "0%";
    progressTextEl.textContent =
      `Demostración guiada: ${demoIndex + 1} de ${demoPairs.length}.`;

    if (demoIndex < demoPairs.length - 1) {
      document.getElementById("btnNextDemo").addEventListener("click", () => {
        demoIndex++;
        showDemoPair();
      });
    } else {
      document.getElementById("btnStartGuidedAB").addEventListener("click", () => {
        guidedDemoDone = true;
        renderTrainingABTrial();
      });
    }
  }

  showDemoPair();
}


// ------------------------------
// SUBFASE 1.1 — ENSAYOS CON RÓTULOS A/B VISIBLES
// ------------------------------

function renderTrainingABTrial() {
  const trial = trainingTrialsAB[currentTrialIndex];
  const allOptions = classesAB.map(c => c.B);
  const shuffledOptions = shuffle(allOptions);

  const showLabels = labeledTrialsRemaining > 0;

  phaseContentEl.innerHTML = `
    <div class="lab-instructions">
      Entrena relaciones arbitrarias entre palabras (A) y figuras (B).
      Responde por ensayo y error.
    </div>

    <div class="lab-stimulus-layout">
      <div class="lab-stimulus-card">
        <div class="lab-stimulus-label">
          ${showLabels ? "Estímulo A (palabra)" : "Estímulo"}
        </div>
        <div class="lab-stimulus-value">${trial.A}</div>
      </div>

      <div class="lab-options">
        ${shuffledOptions.map(opt => `
          <button class="lab-option-card" data-option="${opt}">
            <span>${opt}</span>
            <small>
              ${showLabels ? "Estímulo B (figura)" : "Selecciona la opción"}
            </small>
          </button>
        `).join("")}
      </div>
    </div>
  `;

  const optionButtons = phaseContentEl.querySelectorAll(".lab-option-card");
  optionButtons.forEach(btn => {
    btn.addEventListener("click", () => handleTrainingABResponse(btn, trial));
  });

  updateTrainingProgress(trainingTrialsAB, currentTrialIndex, correctCountCurrentPhase);
}

// ------------------------------
// RESPUESTA DEL ESTUDIANTE
// ------------------------------

function handleTrainingABResponse(buttonEl, trial) {
  const chosen = buttonEl.getAttribute("data-option");
  const isCorrect = chosen === trial.B;

  if (isCorrect) {
    correctCountCurrentPhase++;
    feedbackEl.textContent =
      "Correcto: esta relación A–B se está fortaleciendo por tu historia de respuestas.";
  } else {
    feedbackEl.textContent =
      "Esta no es la relación entrenada. Observa qué opción resulta consistente con tus aciertos previos.";
  }

  currentTrialIndex++;

  if (labeledTrialsRemaining > 0) labeledTrialsRemaining--;

  if (currentTrialIndex < trainingTrialsAB.length) {
    setTimeout(() => {
      renderTrainingABTrial();
    }, 700);
  } else {
    const total = trainingTrialsAB.length;
    const aciertos = correctCountCurrentPhase;
    const porcentaje = Math.round((aciertos / total) * 100);

    feedbackEl.textContent =
      `Fase 1 completada. Aciertos: ${aciertos} de ${total} (${porcentaje}%). ` +
      `Has construido una historia de discriminación condicional A–B.`;

    const optionButtons = phaseContentEl.querySelectorAll(".lab-option-card");
    optionButtons.forEach(btn => btn.classList.add("disabled"));

    updateTrainingProgress(trainingTrialsAB, trainingTrialsAB.length, correctCountCurrentPhase);
  }
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

  // Construimos la representación de clases
  const classCardsHtml = classesAB.map(classItem => {
    const A = classItem.A;
    const B = classItem.B;
    const C = classesAC.find(c => c.A === A).C;

    return `
      <div class="lab-class-card">
        <div class="lab-class-title">Clase de equivalencia · A = ${A}</div>
        <div class="lab-class-row">
          <div><strong>A:</strong> ${A}</div>
          <div><strong>B:</strong> ${B}</div>
          <div><strong>C:</strong> ${C}</div>
        </div>
      </div>
    `;
  }).join("");

  phaseContentEl.innerHTML = `
    <div class="lab-instructions">
      Visualización de las <strong>clases de equivalencia</strong> formadas a partir de tu entrenamiento.
      No se trata de asociaciones aisladas, sino de <strong>redes simbólicas</strong> en las que
      los miembros de una misma clase se vuelven intercambiables a nivel funcional.
    </div>
    <div class="lab-classes-layout">
      ${classCardsHtml}
    </div>
  `;

  feedbackEl.textContent =
    "Cada tarjeta muestra una clase: todos los estímulos A, B y C dentro de ella se comportan como equivalentes en tu repertorio.";
}

// ============================================
// FASE 5 – TRANSFERENCIA DE FUNCIÓN
// ============================================

function setupTransfer() {
  transferIndex = 0;
  transferCorrect = 0;

  // Preparamos los ensayos: uno por palabra A
  transferTrials = classesAC.map(item => {
    const A = item.A;
    const C = item.C;
    const func = functionsByC[C];
    return {
      A,
      C,
      func
    };
  });

  renderTransferTrialIntro();
}

function renderTransferTrialIntro() {
  // Entrenamiento explícito de funciones en C
  const trainingListHtml = classesAC.map(item => {
    const C = item.C;
    const func = functionsByC[C];
    return `<li><strong>${C}</strong> → ${func}</li>`;
  }).join("");

  phaseContentEl.innerHTML = `
    <div class="lab-instructions">
      Ahora asignaremos <strong>nuevas funciones</strong> a los estímulos C (imágenes).
      Observa cómo esas funciones pueden transferirse a las palabras A por pertenecer a la misma clase.
    </div>
    <div class="lab-function-layout">
      <div class="lab-function-training">
        <p><strong>Entrenamiento de funciones en C:</strong></p>
        <ul>
          ${trainingListHtml}
        </ul>
        <p style="margin-top:8px;">
          Primero se entrena la función en C. Luego probaremos qué ocurre cuando sólo aparece la palabra A.
        </p>
      </div>
      <div class="lab-function-test" id="labTransferTestContainer">
        <!-- Aquí cargaremos los ensayos de prueba uno por uno -->
      </div>
    </div>
  `;

  // Inicia primer ensayo de prueba
  renderTransferTestTrial();
}

function renderTransferTestTrial() {
  const container = document.getElementById("labTransferTestContainer");
  const trial = transferTrials[transferIndex];

  // Opciones: todas las funciones posibles
  const allFunctions = Object.values(functionsByC);
  const shuffled = shuffle(allFunctions);

  container.innerHTML = `
    <div class="lab-instructions">
      Considera que ya entrenaste esas funciones en C.
      Ahora sólo verás una <strong>palabra A</strong>. Elige qué función crees que evocará.
    </div>
    <div class="lab-stimulus-layout">
      <div class="lab-stimulus-card">
        <div class="lab-stimulus-label">Palabra A</div>
        <div class="lab-stimulus-value">${trial.A}</div>
      </div>
      <div class="lab-options">
        ${shuffled.map(fn => `
          <button class="lab-option-card" data-option="${fn}">
            <span>${fn}</span>
            <small>Función que crees que evocará esta palabra</small>
          </button>
        `).join("")}
      </div>
    </div>
  `;

  const optionButtons = container.querySelectorAll(".lab-option-card");
  optionButtons.forEach(btn => {
    btn.addEventListener("click", () => handleTransferResponse(btn, trial));
  });

  const total = transferTrials.length;
  const completed = transferIndex;
  const progress = total > 0 ? (completed / total) * 100 : 0;
  progressFillEl.style.width = `${progress}%`;
  progressTextEl.textContent =
    `Ensayos de transferencia: ${completed} de ${total}.`;
  feedbackEl.textContent =
    "En esta fase sí hay feedback por ensayo, pero lo relevante es notar que la palabra nunca tuvo contacto directo con esa función.";
}

function handleTransferResponse(buttonEl, trial) {
  const chosen = buttonEl.getAttribute("data-option");
  const isCorrect = chosen === trial.func;

  if (isCorrect) {
    transferCorrect++;
    feedbackEl.textContent =
      "Correcto: la palabra A parece heredar la función que entrenaste en C dentro de la misma clase.";
  } else {
    feedbackEl.textContent =
      "En este ensayo la elección no coincide con la función entrenada en C. Observa que, aun así, tu respuesta se guía por la red previa.";
  }

  transferIndex++;

  if (transferIndex < transferTrials.length) {
    setTimeout(() => {
      renderTransferTestTrial();
    }, 800);
  } else {
    const total = transferTrials.length;
    const porcentaje = Math.round((transferCorrect / total) * 100);
    phaseContentEl.innerHTML = `
      <div class="lab-instructions">
        Resultados de la fase de <strong>transferencia de función</strong>.
      </div>
      <p>
        Has respondido correctamente <strong>${transferCorrect}</strong> de <strong>${total}</strong> ensayos
        (${porcentaje}%). Aquí, las palabras A evocan funciones que nunca se entrenaron directamente con ellas,
        sino con otros miembros de su clase.
      </p>
      <p>
        Esto muestra cómo, una vez formadas las clases de equivalencia, las <strong>funciones psicológicas</strong>
        pueden transferirse entre sus miembros sin nuevo contacto con la experiencia original.
      </p>
    `;
    feedbackEl.textContent =
      "Este es el puente final del laboratorio: desde equivalencia de estímulos hacia la comprensión de la transformación de funciones.";
    progressFillEl.style.width = "100%";
    progressTextEl.textContent =
      `Transferencia de función completada. Ensayos realizados: ${total}.`;
  }
}

// ============================================
// CONTROLES DE FASE
// ============================================

btnResetPhase.addEventListener("click", () => {
  renderPhase(); // vuelve a inicializar la fase actual
});

btnPrevPhase.addEventListener("click", () => {
  if (currentPhaseIndex > 0) {
    currentPhaseIndex--;
    renderPhase();
  }
});

btnNextPhase.addEventListener("click", () => {
  if (currentPhaseIndex < phases.length - 1) {
    currentPhaseIndex++;
    renderPhase();
  }
});

// ============================================
// INICIO
// ============================================

renderPhase();
