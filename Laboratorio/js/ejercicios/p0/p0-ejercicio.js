// ============================================================
// FASE 0 · RESPUESTA RELACIONAL ARBITRARIA (RRAA)
// Bloques:
//   - Ensayos "ES IGUAL A" (3 ensayos)
//   - Overlay de mapa de opuestos
//   - Ensayos "ES OPUESTO A" (2 ensayos)
// ============================================================

(function () {
  const STIMULI = ["◎", "◇", "▢"];

  // Mapeo arbitrario de "opuestos"
  const OPPOSITE_MAP = {
    0: 1, // ◎ ↔ ◇
    1: 0,
    2: 2, // ▢ se mantiene igual
  };

  // DOM
  const contextoLabelEl = document.getElementById("rraaContextoLabel");
  const sampleEl = document.getElementById("rraaSampleSymbol");
  const choiceButtons = Array.from(
    document.querySelectorAll(".rraa-choice-card")
  );
  const feedbackEl = document.getElementById("rraaFeedback");
  const progressEl = document.getElementById("rraaProgress");
  const btnNext = document.getElementById("rraaBtnNext");
  const btnRestart = document.getElementById("rraaBtnRestart");

  const overlay = document.getElementById("rraaOverlay");
  const overlayText = document.getElementById("rraaOverlayText");
  const overlayBtn = document.getElementById("rraaOverlayBtn");

  const oppositeMapOverlay = document.getElementById("rraaOppositeMap");
  const mapContinueBtn = document.getElementById("rraaMapContinueBtn");

  // Estado
  let trials = [];
  let currentIndex = 0;
  let correctCount = 0;
  let answered = false;
  let mapShown = false; // para mostrar el mapa justo después de los ensayos "igual"

  // ------------------------------------------------------------
  // Utilidades
  // ------------------------------------------------------------

  function shuffle(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function createTrialSpec() {
    // 3 ensayos con IGUAL
    const igualTrials = [
      { context: "igual", sample: 0 },
      { context: "igual", sample: 1 },
      { context: "igual", sample: 2 },
    ];

    // 2 ensayos con OPUESTO (usando ◎ y ◇)
    const opuestoTrials = [
      { context: "opuesto", sample: 0 },
      { context: "opuesto", sample: 1 },
    ];

    return igualTrials.concat(opuestoTrials);
  }

  function buildTrials() {
    const base = createTrialSpec();
    const result = [];

    base.forEach((t) => {
      if (t.context === "igual") {
        const options = shuffle([0, 1, 2]);
        const correctStim = t.sample;
        const correctIndex = options.indexOf(correctStim);
        result.push({
          context: t.context,
          sample: t.sample,
          options,
          correctStim,
          correctIndex,
        });
      } else if (t.context === "opuesto") {
        const correctStim = OPPOSITE_MAP[t.sample];
        let options = shuffle([0, 1, 2]);
        if (!options.includes(correctStim)) {
          options[0] = correctStim;
        }
        const correctIndex = options.indexOf(correctStim);
        result.push({
          context: t.context,
          sample: t.sample,
          options,
          correctStim,
          correctIndex,
        });
      }
    });

    return result;
  }

  // ------------------------------------------------------------
  // Renderizado
  // ------------------------------------------------------------

  function resetChoiceStyles() {
    choiceButtons.forEach((btn) => {
      btn.classList.remove("rraa-correct", "rraa-incorrect");
    });
  }

  function renderTrial() {
    const trial = trials[currentIndex];
    if (!trial) return;

    answered = false;
    btnNext.disabled = true;
    resetChoiceStyles();

    // Contexto
    contextoLabelEl.textContent =
      trial.context === "igual" ? "ES IGUAL A" : "ES OPUESTO A";

    // Estímulo muestra
    sampleEl.textContent = STIMULI[trial.sample];

    // Opciones
    choiceButtons.forEach((btn, i) => {
      const stimIndex = trial.options[i];
      const symbolSpan = btn.querySelector(".rraa-choice-symbol");
      btn.dataset.stimIndex = String(stimIndex);
      if (symbolSpan) {
        symbolSpan.textContent = STIMULI[stimIndex];
      }
    });

    // Feedback y progreso
    feedbackEl.textContent =
      "Haz clic en la opción que cumpla la clave relacional.";
    progressEl.textContent = `Ensayo ${currentIndex + 1} de ${
      trials.length
    } · Aciertos: ${correctCount}`;
  }

  // ------------------------------------------------------------
  // Lógica de respuesta
  // ------------------------------------------------------------

  function handleChoiceClick(event) {
    const btn = event.currentTarget;
    const trial = trials[currentIndex];
    if (!trial || answered) return;

    answered = true;
    btnNext.disabled = false;

    const clickedStimIndex = parseInt(btn.dataset.stimIndex, 10);
    const isCorrect = clickedStimIndex === trial.correctStim;

    resetChoiceStyles();

    if (isCorrect) {
      btn.classList.add("rraa-correct");
      correctCount += 1;
      feedbackEl.textContent = "✔ Respuesta correcta.";
    } else {
      btn.classList.add("rraa-incorrect");
      feedbackEl.textContent = "✖ Respuesta incorrecta.";
    }

    // Resaltar opción correcta
    choiceButtons.forEach((choiceBtn) => {
      const stimIndex = parseInt(choiceBtn.dataset.stimIndex, 10);
      if (stimIndex === trial.correctStim) {
        choiceBtn.classList.add("rraa-correct");
      }
    });

    progressEl.textContent = `Ensayo ${currentIndex + 1} de ${
      trials.length
    } · Aciertos: ${correctCount}`;
  }

  function handleNext() {
    if (!answered) {
      feedbackEl.textContent =
        "Primero selecciona una opción para este ensayo.";
      return;
    }

    // Si acabamos de terminar el último ensayo de "igual" y aún no mostramos el mapa
    if (currentIndex === 2 && !mapShown) {
      mapShown = true;
      showOppositeMap();
      return;
    }

    if (currentIndex < trials.length - 1) {
      currentIndex += 1;
      renderTrial();
    } else {
      showOverlay();
    }
  }

  function handleRestart() {
    initPhase();
  }

  function showOverlay() {
    const total = trials.length;
    const msg =
      "No respondiste a objetos, sino a relaciones que aprendiste " +
      "bajo claves arbitrarias.\n\n" +
      `Ensayos correctos: ${correctCount} de ${total}.`;

    overlayText.textContent = msg;
    overlay.classList.add("rraa-overlay--visible");
  }

  function hideOverlay() {
    overlay.classList.remove("rraa-overlay--visible");
    initPhase();
  }

  function showOppositeMap() {
    oppositeMapOverlay.classList.add("rraa-overlay--visible");
  }

  function hideOppositeMap() {
    oppositeMapOverlay.classList.remove("rraa-overlay--visible");
    // pasamos al primer ensayo "opuesto"
    currentIndex = 3; // índices 0,1,2 = igual; 3,4 = opuesto
    renderTrial();
  }

  // ------------------------------------------------------------
  // Inicialización
  // ------------------------------------------------------------

  function initPhase() {
    trials = buildTrials();
    currentIndex = 0;
    correctCount = 0;
    answered = false;
    mapShown = false;
    btnNext.disabled = true;
    resetChoiceStyles();
    renderTrial();
  }

  // ------------------------------------------------------------
  // Listeners
  // ------------------------------------------------------------

  choiceButtons.forEach((btn) => {
    btn.addEventListener("click", handleChoiceClick);
  });

  btnNext.addEventListener("click", handleNext);
  btnRestart.addEventListener("click", handleRestart);
  overlayBtn.addEventListener("click", hideOverlay);
  mapContinueBtn.addEventListener("click", hideOppositeMap);

  // Arranque
  initPhase();
})();
