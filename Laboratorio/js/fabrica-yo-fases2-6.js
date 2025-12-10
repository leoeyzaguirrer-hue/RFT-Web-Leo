// ELEMENTOS DEL DOM
const faseLabel = document.getElementById("faseLabel");
const pasoLabel = document.getElementById("pasoLabel");
const phaseTag = document.getElementById("phaseTag");
const phaseTitle = document.getElementById("phaseTitle");
const phaseDescription = document.getElementById("phaseDescription");
const phaseScene = document.getElementById("phaseScene");
const feedbackArea = document.getElementById("feedbackArea");

const backButton = document.getElementById("backButton");
const resetButton = document.getElementById("resetButton");
const nextButton = document.getElementById("nextButton");

const finalOverlay = document.getElementById("finalOverlay");
const finalBackButton = document.getElementById("finalBackButton");
const finalRestartButton = document.getElementById("finalRestartButton");

let currentStep = 0;
let answeredCorrectly = false;

// DEFINICIÓN DE FASES/PASOS
const steps = [
  {
    id: "fase2",
    tag: "FASE 2 · AQUÍ–ALLÁ",
    title: "PERSPECTIVA ESPACIAL EXPLÍCITA",
    description:
      "Ubica «aquí» y «allá» respecto al punto de yo. El yo no es el lugar, es el observador de los lugares.",
    faseLabel: "Fase 2 · Aquí–Allá",
    renderScene: renderFase2,
    type: "choice"
  },
  {
    id: "fase3",
    tag: "FASE 3 · AHORA–ANTES",
    title: "CONTINUIDAD DEL YO EN EL TIEMPO",
    description:
      "Explora cómo cambian los contenidos («ayer tuve miedo») mientras se mantiene el punto de «yo aquí ahora».",
    faseLabel: "Fase 3 · Ahora–Antes",
    renderScene: renderFase3,
    type: "choice"
  },
  {
    id: "fase3b",
    tag: "FASE 3B · MICROFASE DE TRANSICIÓN",
    title: "YO AQUÍ AHORA… MIENTRAS NOTO ESTO",
    description:
      "Integramos persona, lugar, tiempo y experiencia en una sola frase de perspectiva.",
    faseLabel: "Fase 3B · Transición al selfing",
    renderScene: renderFase3B,
    type: "click-only"
  },
  {
    id: "fase4",
    tag: "FASE 4 · NACIMIENTO DEL SELFING",
    title: "RESPONDER AL PROPIO RESPONDER",
    description:
      "El sistema te muestra algo que hiciste. Tu tarea es notar que ahora respondes a tu propio responder.",
    faseLabel: "Fase 4 · Selfing explícito",
    renderScene: renderFase4,
    type: "choice"
  },
  {
    id: "fase5",
    tag: "FASE 5 · SELFING SANO VS PROBLEMÁTICO",
    title: "CUANDO EL YO SE CONFUNDE CON EL CONTENIDO",
    description:
      "Compara un selfing flexible con uno rígido. Lo que cambia no es el contenido, sino la función de las relaciones.",
    faseLabel: "Fase 5 · Selfing sano vs. problemático",
    renderScene: renderFase5,
    type: "choice"
  },
  {
    id: "fase6",
    tag: "FASE 6 · INTEGRACIÓN FINAL",
    title: "¿DESDE DÓNDE RESPONDES?",
    description:
      "Coherencia, reglas, valores y miedo pueden estar presentes al mismo tiempo. La pregunta es desde dónde respondes.",
    faseLabel: "Fase 6 · Integración",
    renderScene: renderFase6,
    type: "choice"
  }
];

// INICIALIZACIÓN
function initLab() {
  currentStep = 0;
  answeredCorrectly = false;
  finalOverlay.classList.remove("fy-final-overlay-active");
  renderStep();
}

// RENDERIZAR PASO ACTUAL
function renderStep() {
  const step = steps[currentStep];
  answeredCorrectly = false;
  nextButton.disabled = step.type !== "click-only"; // en click-only se habilita en el propio evento

  phaseTag.textContent = step.tag;
  phaseTitle.textContent = step.title;
  phaseDescription.textContent = step.description;
  faseLabel.textContent = step.faseLabel;
  pasoLabel.textContent = `${currentStep + 1} / ${steps.length}`;

  feedbackArea.textContent =
    "Lee con calma y responde. El objetivo es notar la función de la respuesta, no solo acertar.";

  // limpiar escena
  phaseScene.innerHTML = "";
  step.renderScene();

  // estado botones anterior/siguiente
  backButton.disabled = currentStep === 0;
}

// UTILIDAD: crear botón de opción
function createAnswerButton(texto, esCorrecta, feedbackCorrecto, feedbackError) {
  const btn = document.createElement("button");
  btn.className = "fy-answer-button";
  btn.textContent = texto;

  btn.addEventListener("click", () => {
    if (answeredCorrectly) return;

    const allButtons =
      phaseScene.querySelectorAll(".fy-answer-button");
    allButtons.forEach((b) =>
      b.classList.remove(
        "fy-answer-button-correct",
        "fy-answer-button-wrong"
      )
    );

    if (esCorrecta) {
      btn.classList.add("fy-answer-button-correct");
      allButtons.forEach((b) => (b.disabled = true));
      feedbackArea.textContent = feedbackCorrecto;
      answeredCorrectly = true;
      nextButton.disabled = false;
    } else {
      btn.classList.add("fy-answer-button-wrong");
      feedbackArea.textContent = feedbackError;
    }
  });

  return btn;
}

/* ========= FASE 2 · AQUÍ–ALLÁ ========= */
function renderFase2() {
  const layout = document.createElement("div");
  layout.className = "fy-space-layout";

  const cardCasa = document.createElement("div");
  cardCasa.className = "fy-space-card";
  cardCasa.innerHTML = `
    <div class="fy-space-icon">🏠</div>
    <div class="fy-space-title">CASA</div>
    <p class="fy-space-hint">Imagina que el niño está adentro.</p>
  `;

  const cardCalle = document.createElement("div");
  cardCalle.className = "fy-space-card";
  cardCalle.innerHTML = `
    <div class="fy-space-icon">🛣️</div>
    <div class="fy-space-title">CALLE</div>
    <p class="fy-space-hint">El adulto está un poco más lejos.</p>
  `;

  const cardHabitacion = document.createElement("div");
  cardHabitacion.className = "fy-space-card";
  cardHabitacion.innerHTML = `
    <div class="fy-space-icon">🛏️</div>
    <div class="fy-space-title">HABITACIÓN</div>
    <p class="fy-space-hint">Todo ocurre dentro de este espacio.</p>
  `;

  layout.appendChild(cardCasa);
  layout.appendChild(cardCalle);
  layout.appendChild(cardHabitacion);

  const cardCenter = document.createElement("div");
  cardCenter.className = "fy-card-center";
  cardCenter.innerHTML = `
    <div class="fy-card-title">
      Ubica «aquí» y «allá» respecto al yo.
    </div>
    <p class="fy-card-text">
      Responde como si fueras el niño. ¿Cuál de estas frases describe mejor
      la escena?
    </p>
  `;

  const optionsContainer = document.createElement("div");
  optionsContainer.className = "fy-answer-options";

  const btnCorrecto = createAnswerButton(
    "«Yo estoy aquí en la casa… y tú estás allá en la calle»",
    true,
    "Aquí el yo se ubica en un «aquí» concreto y coloca al otro en «allá». El contenedor no se fusiona con la casa: simplemente organiza dónde está cada uno.",
    "Recuerda que hablamos desde el punto de vista del niño. Él marca su propio «aquí» y el «allá» del adulto."
  );

  const btnError = createAnswerButton(
    "«Yo soy la casa… y tú eres la calle»",
    false,
    "",
    "Esta respuesta iguala al yo con los lugares (MARCO DE COORDINACIÓN). Lo que queremos es ubicar lugares respecto al yo, no convertir al yo en un objeto físico."
  );

  optionsContainer.appendChild(btnCorrecto);
  optionsContainer.appendChild(btnError);

  cardCenter.appendChild(optionsContainer);

  phaseScene.appendChild(layout);
  phaseScene.appendChild(cardCenter);
}

/* ========= FASE 3 · AHORA–ANTES ========= */
function renderFase3() {
  const timeline = document.createElement("div");
  timeline.className = "fy-timeline";

  timeline.innerHTML = `
    <div class="fy-timeline-line"></div>
    <div class="fy-timeline-labels">
      <span>ANTES</span>
      <span>AHORA</span>
    </div>
  `;

  const cardCenter = document.createElement("div");
  cardCenter.className = "fy-card-center";
  cardCenter.innerHTML = `
    <div class="fy-card-title">
      El contenido cambia, el punto de yo se mantiene.
    </div>
    <p class="fy-card-text">
      Imagina que ayer pensaste «ayer tuve miedo» y hoy puedes decir
      «ahora sigo aquí» y «yo sigo siendo yo». ¿Qué describe mejor la
      continuidad del yo?
    </p>
  `;

  const optionsContainer = document.createElement("div");
  optionsContainer.className = "fy-answer-options";

  const btnCorrecto = createAnswerButton(
    "«Ayer tuve miedo… y ahora sigo aquí siendo el mismo yo que observa»",
    true,
    "Aquí se ve claramente la continuidad del yo: el miedo cambia en el tiempo, pero el punto de observación se mantiene.",
    ""
  );

  const btnError = createAnswerButton(
    "«Ayer era otra persona… hoy soy alguien completamente distinto»",
    false,
    "",
    "Esta frase corta la continuidad del yo. Para efectos clínicos, la perspectiva se beneficia cuando puedes decir «sigo siendo yo» aunque el contenido cambie."
  );

  optionsContainer.appendChild(btnCorrecto);
  optionsContainer.appendChild(btnError);

  cardCenter.appendChild(optionsContainer);

  phaseScene.appendChild(timeline);
  phaseScene.appendChild(cardCenter);
}

/* ========= FASE 3B · MICROFASE ========= */
function renderFase3B() {
  const cardCenter = document.createElement("div");
  cardCenter.className = "fy-card-center";
  cardCenter.innerHTML = `
    <div class="fy-card-title">
      «Yo estoy aquí ahora… mientras noto esto»
    </div>
    <p class="fy-card-text">
      Esta frase integra persona, lugar, tiempo y experiencia.
      Haz clic en la tarjeta para colocarla dentro del contenedor del yo.
    </p>
  `;

  const optionsContainer = document.createElement("div");
  optionsContainer.className = "fy-answer-options";

  const btn = document.createElement("button");
  btn.className = "fy-answer-button";
  btn.textContent = "Colocar «Yo estoy aquí ahora… mientras noto esto» en el yo";

  btn.addEventListener("click", () => {
    if (answeredCorrectly) return;
    btn.classList.add("fy-answer-button-correct");
    feedbackArea.textContent =
      "Esta frase muestra explícitamente el yo como contexto: «yo aquí ahora» mientras algo ocurre en el campo de experiencia.";
    answeredCorrectly = true;
    nextButton.disabled = false;
  });

  optionsContainer.appendChild(btn);

  cardCenter.appendChild(optionsContainer);
  phaseScene.appendChild(cardCenter);
}

/* ========= FASE 4 · NACIMIENTO DEL SELFING ========= */
function renderFase4() {
  const cardCenter = document.createElement("div");
  cardCenter.className = "fy-card-center";
  cardCenter.innerHTML = `
    <div class="fy-card-title">
      El sistema te recuerda algo que hiciste.
    </div>
    <p class="fy-card-text">
      Primero arrastraste «tengo miedo» al yo. Ahora lees:
      «Estoy notando que tengo miedo». ¿Qué está ocurriendo?
    </p>
  `;

  const optionsContainer = document.createElement("div");
  optionsContainer.className = "fy-answer-options";

  const btnCorrecto = createAnswerButton(
    "Estoy respondiendo verbalmente a mi propio responder",
    true,
    "Exacto. Aquí el organismo no solo tiene miedo: responde a su propia respuesta. Eso es el nacimiento del selfing.",
    ""
  );

  const btnError = createAnswerButton(
    "Solo estoy repitiendo la misma frase de antes, nada cambia",
    false,
    "",
    "El contenido verbal parece similar, pero la función es distinta: ahora estás observando que respondes a tu miedo, no solo teniéndolo."
  );

  optionsContainer.appendChild(btnCorrecto);
  optionsContainer.appendChild(btnError);

  cardCenter.appendChild(optionsContainer);
  phaseScene.appendChild(cardCenter);
}

/* ========= FASE 5 · SELFING SANO VS PROBLEMÁTICO ========= */
function renderFase5() {
  const layout = document.createElement("div");
  layout.className = "fy-selfing-layout";

  const colA = document.createElement("div");
  colA.className = "fy-selfing-column";
  colA.innerHTML = `
    <div class="fy-selfing-header fy-selfing-header-sano">
      LADO A · SELFING SANO
    </div>
    <div class="fy-selfing-list">
      «Estoy notando que tengo ansiedad ahora»<br />
      «Esto es una sensación en mi cuerpo»<br />
      «Yo sigo aquí»
    </div>
  `;

  const colB = document.createElement("div");
  colB.className = "fy-selfing-column";
  colB.innerHTML = `
    <div class="fy-selfing-header fy-selfing-header-problematico">
      LADO B · SELFING PROBLEMÁTICO
    </div>
    <div class="fy-selfing-list">
      «Yo soy ansioso»<br />
      «Siempre he sido así»<br />
      «Nada va a cambiar»
    </div>
  `;

  layout.appendChild(colA);
  layout.appendChild(colB);

  const cardCenter = document.createElement("div");
  cardCenter.className = "fy-card-center";
  cardCenter.innerHTML = `
    <div class="fy-card-title">
      Misma emoción, funciones relacionales distintas.
    </div>
    <p class="fy-card-text">
      ¿Qué tipo de relación está ocurriendo cuando dices «yo soy ansioso»?
    </p>
  `;

  const optionsContainer = document.createElement("div");
  optionsContainer.className = "fy-answer-options";

  const btnCorrecto = createAnswerButton(
    "Es una relación de coordinación aplicada al yo",
    true,
    "Correcto. «Yo = ansioso» es un MARCO DE COORDINACIÓN. El problema no es el contenido, sino cómo esa coordinación se rigidiza.",
    ""
  );

  const btnError = createAnswerButton(
    "Es solo una descripción neutral sin efectos",
    false,
    "",
    "En clínica, esta frase suele adquirir funciones rígidas: si el yo queda pegado al contenido, se pierde la perspectiva de observación."
  );

  optionsContainer.appendChild(btnCorrecto);
  optionsContainer.appendChild(btnError);

  cardCenter.appendChild(layout);
  cardCenter.appendChild(optionsContainer);

  phaseScene.appendChild(cardCenter);
}

/* ========= FASE 6 · INTEGRACIÓN FINAL ========= */
function renderFase6() {
  const cardCenter = document.createElement("div");
  cardCenter.className = "fy-card-center";
  cardCenter.innerHTML = `
    <div class="fy-card-title">
      Coherencia, reglas, valores y miedo en el mismo campo.
    </div>
    <p class="fy-card-text">
      Imagina que ves a la vez: una red de coherencia, una autorregla,
      algo que te importa (valor) y una imagen aversiva. ¿Desde qué lugar
      es clínicamente más útil responder?
    </p>
  `;

  const optionsContainer = document.createElement("div");
  optionsContainer.className = "fy-answer-options";

  const btn1 = createAnswerButton(
    "Desde la coherencia, cueste lo que cueste",
    false,
    "",
    "La coherencia es importante, pero si se vuelve rígida puede perder flexibilidad psicológica."
  );

  const btn2 = createAnswerButton(
    "Desde el miedo, para que se vaya rápido",
    false,
    "",
    "Cuando el miedo manda, el repertorio se estrecha. El objetivo no es obedecer al miedo, sino observarlo."
  );

  const btn3 = createAnswerButton(
    "Desde el yo que observa todo lo que está presente",
    true,
    "Este es el cierre del laboratorio: el yo como contexto permite responder a coherencia, reglas, valores y miedo sin quedar atrapado en ninguno.",
    ""
  );

  optionsContainer.appendChild(btn1);
  optionsContainer.appendChild(btn2);
  optionsContainer.appendChild(btn3);

  cardCenter.appendChild(optionsContainer);
  phaseScene.appendChild(cardCenter);
}

/* ========= BOTONES GLOBALES ========= */
nextButton.addEventListener("click", () => {
  if (!answeredCorrectly) {
    feedbackArea.textContent =
      "Primero responde a la pregunta o realiza la acción de esta fase antes de continuar.";
    return;
  }

  if (currentStep < steps.length - 1) {
    currentStep++;
    renderStep();
  } else {
    // Fin: overlay
    finalOverlay.classList.add("fy-final-overlay-active");
  }
});

backButton.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    renderStep();
  }
});

resetButton.addEventListener("click", initLab);
finalRestartButton.addEventListener("click", initLab);
finalBackButton.addEventListener("click", () => {
  finalOverlay.classList.remove("fy-final-overlay-active");
});

// INICIO
initLab();
