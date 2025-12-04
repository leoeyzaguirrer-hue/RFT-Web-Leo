/* ============================================================
   EJERCICIO P5 · El Constructor de Análisis Útiles
   Lógica de arrastre, conteo, porcentajes y autocorrección
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("p5-board");
  const boardHint = document.getElementById("p5-board-hint");
  const pieceCounter = document.getElementById("p5-piece-counter");
  const medal = document.getElementById("p5-medal");

  const resultsPrecision = document.getElementById("p5-precision-value");
  const resultsAlcance = document.getElementById("p5-alcance-value");
  const resultsProfundidad = document.getElementById("p5-profundidad-value");
  const resultsText = document.getElementById("p5-results-text");

  const btnEvaluate = document.getElementById("p5-btn-evaluate");
  const btnReset = document.getElementById("p5-btn-reset");
  const finalFeedback = document.getElementById("p5-final-feedback");

  const cards = Array.from(document.querySelectorAll(".p5-card"));
  const sourceZones = Array.from(document.querySelectorAll(".p5-source-zone"));

  const MAX_PIEZAS = 6;
  const MIN_PIEZAS = 4;

  let currentDragCard = null;
  let usedDistractor = false;

  // Guardar origen inicial de cada tarjeta
  cards.forEach((card) => {
    const parent = card.parentElement;
    if (parent && parent.id) {
      card.dataset.origin = parent.id;
    }
  });

  // Inicialización
  resetExercise();

  // Asignar eventos de arrastre
  cards.forEach((card) => {
    card.addEventListener("dragstart", handleDragStart);
    card.addEventListener("dragend", handleDragEnd);
  });

  // Board: como zona de destino
  board.addEventListener("dragover", handleDragOverBoard);
  board.addEventListener("dragenter", handleDragEnterBoard);
  board.addEventListener("dragleave", handleDragLeaveBoard);
  board.addEventListener("drop", handleDropOnBoard);

  // Zonas de origen: permiten devolver piezas
  sourceZones.forEach((zone) => {
    zone.addEventListener("dragover", handleDragOverSourceZone);
    zone.addEventListener("drop", (event) => handleDropOnSourceZone(event, zone));
  });

  // Botones
  btnEvaluate.addEventListener("click", handleEvaluate);
  btnReset.addEventListener("click", resetExercise);

  // --------------------------------------------------
  // Funciones de arrastre
  // --------------------------------------------------

  function handleDragStart(event) {
    currentDragCard = event.currentTarget;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", currentDragCard.dataset.cardId);
    currentDragCard.classList.add("p5-card-dragging");
  }

  function handleDragEnd() {
    if (!currentDragCard) return;
    currentDragCard.classList.remove("p5-card-dragging");
    currentDragCard = null;
  }

  function handleDragOverBoard(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  function handleDragEnterBoard(event) {
    event.preventDefault();
    board.classList.add("p5-board-active");
  }

  function handleDragLeaveBoard(event) {
    if (!board.contains(event.relatedTarget)) {
      board.classList.remove("p5-board-active");
    }
  }

  function handleDropOnBoard(event) {
    event.preventDefault();
    board.classList.remove("p5-board-active");

    const cardId = event.dataTransfer.getData("text/plain");
    const card = cards.find((c) => c.dataset.cardId === cardId);
    if (!card) return;

    const dimension = card.dataset.dimension;

    // Si es distractor: se "derrite" y vuelve a su origen
    if (dimension === "distractor") {
      usedDistractor = true;
      showMedal(
        "🚫 Esta descripción no orienta la acción clínica. Evítala."
      );
      card.classList.add("p5-card-melt");
      const originId = card.dataset.origin;
      const origin = document.getElementById(originId);

      setTimeout(() => {
        card.classList.remove("p5-card-melt");
        if (origin && !origin.contains(card)) {
          origin.querySelector(".p5-card-pool")?.appendChild(card);
        }
        recalcBoardState();
      }, 650);

      return;
    }

    // Si no es distractor, comprobamos límite de piezas
    const { totalPiezas } = computeBoardCounts();
    if (totalPiezas >= MAX_PIEZAS && !board.contains(card)) {
      // Límite excedido
      board.classList.add("p5-board-error");
      showMedal("⚠️ Máximo 6 piezas en el marco.");
      setTimeout(() => {
        board.classList.remove("p5-board-error");
      }, 350);

      // Devolver a origen
      const originId = card.dataset.origin;
      const origin = document.getElementById(originId);
      if (origin && !origin.contains(card)) {
        origin.querySelector(".p5-card-pool")?.appendChild(card);
      }
      recalcBoardState();
      return;
    }

    // Añadir tarjeta al board si no está ya
    if (!board.contains(card)) {
      board.appendChild(card);
    }

    if (boardHint) {
      boardHint.style.display = "none";
    }

    // Pequeño mensaje según dimensión
    if (dimension === "precision") {
      showMedal("🎯 Esta pieza aumenta la precisión del análisis.");
    } else if (dimension === "alcance") {
      showMedal("📡 Esta pieza amplía el alcance del análisis.");
    } else if (dimension === "profundidad") {
      showMedal("🌊 Esta pieza profundiza tu conceptualización.");
    }

    recalcBoardState();
  }

  function handleDragOverSourceZone(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  function handleDropOnSourceZone(event, zone) {
    event.preventDefault();

    const cardId = event.dataTransfer.getData("text/plain");
    const card = cards.find((c) => c.dataset.cardId === cardId);
    if (!card) return;

    const pool = zone.querySelector(".p5-card-pool");
    if (pool && !pool.contains(card)) {
      pool.appendChild(card);
    }

    recalcBoardState();
  }

  // --------------------------------------------------
  // Estado del board y contadores
  // --------------------------------------------------

  function computeBoardCounts() {
    const boardCards = Array.from(board.querySelectorAll(".p5-card"));

    let counts = {
      precision: 0,
      alcance: 0,
      profundidad: 0,
    };

    boardCards.forEach((card) => {
      const dim = card.dataset.dimension;
      if (dim === "precision") counts.precision++;
      if (dim === "alcance") counts.alcance++;
      if (dim === "profundidad") counts.profundidad++;
    });

    const totalPiezas =
      counts.precision + counts.alcance + counts.profundidad;

    return { counts, totalPiezas };
  }

  function recalcBoardState() {
    const { counts, totalPiezas } = computeBoardCounts();

    // Contador visual
    if (pieceCounter) {
      pieceCounter.textContent = `${totalPiezas} / ${MAX_PIEZAS} piezas seleccionadas`;
    }

    // Mostrar u ocultar hint
    if (boardHint) {
      boardHint.style.display = totalPiezas === 0 ? "" : "none";
    }

    // Reset de colores finales en tarjetas (solo se aplican en evaluación)
    cards.forEach((card) => {
      card.classList.remove(
        "p5-card-good",
        "p5-card-bad",
        "p5-card-star"
      );
    });

    // Reset resultados numéricos provisionales
    if (resultsPrecision) resultsPrecision.textContent = "0%";
    if (resultsAlcance) resultsAlcance.textContent = "0%";
    if (resultsProfundidad) resultsProfundidad.textContent = "0%";
    if (resultsText) {
      resultsText.textContent =
        'Cuando pulses "Evaluar análisis", aquí aparecerá una interpretación de tu modelo.';
    }

    // Limpiar feedback final
    finalFeedback.textContent = "";
    finalFeedback.classList.remove(
      "p5-feedback-success",
      "p5-feedback-error"
    );
  }

  // --------------------------------------------------
  // Medalla / mensajes breves
  // --------------------------------------------------

  function showMedal(text) {
    if (!medal) return;
    medal.textContent = text;
    medal.classList.add("p5-medal-visible");
    setTimeout(() => {
      medal.classList.remove("p5-medal-visible");
    }, 1800);
  }

  // --------------------------------------------------
  // Evaluación final
  // --------------------------------------------------

  function handleEvaluate() {
    const { counts, totalPiezas } = computeBoardCounts();

    // Limpiar estilos previos
    cards.forEach((card) => {
      card.classList.remove(
        "p5-card-good",
        "p5-card-bad",
        "p5-card-star",
        "p5-card-melt"
      );
    });
    finalFeedback.textContent = "";
    finalFeedback.classList.remove(
      "p5-feedback-success",
      "p5-feedback-error"
    );

    // Verificar número mínimo de piezas
    if (totalPiezas < MIN_PIEZAS) {
      finalFeedback.textContent =
        "Añade al menos 4 piezas al Marco Conceptual antes de evaluar tu análisis.";
      finalFeedback.classList.add("p5-feedback-error");
      return;
    }

    // Cálculo de porcentajes (máximo 2 por dimensión)
    const maxPorDim = 2;
    const precisionPct = clampPercent(
      (counts.precision / maxPorDim) * 100
    );
    const alcancePct = clampPercent(
      (counts.alcance / maxPorDim) * 100
    );
    const profundidadPct = clampPercent(
      (counts.profundidad / maxPorDim) * 100
    );

    if (resultsPrecision)
      resultsPrecision.textContent = `${precisionPct}%`;
    if (resultsAlcance)
      resultsAlcance.textContent = `${alcancePct}%`;
    if (resultsProfundidad)
      resultsProfundidad.textContent = `${profundidadPct}%`;

    // Clasificación visual de tarjetas en el marco
    const boardCards = Array.from(board.querySelectorAll(".p5-card"));
    boardCards.forEach((card) => {
      const dim = card.dataset.dimension;
      if (dim === "precision" || dim === "alcance") {
        card.classList.add("p5-card-good");
      } else if (dim === "profundidad") {
        card.classList.add("p5-card-star");
      }
      // Los distractores no deberían estar en el board en este punto
    });

    // Construir retroalimentación textual
    let mensajes = [];

    if (precisionPct < 50) {
      mensajes.push(
        "Tu análisis es demasiado general. Añade piezas que clarifiquen qué antecedentes evocan el patrón y qué consecuencias lo mantienen."
      );
    }

    if (alcancePct < 50) {
      mensajes.push(
        "Tu conceptualización está muy limitada a uno o pocos contextos. Considera en qué otros ámbitos aparece el patrón (trabajo, pareja, familia)."
      );
    }

    if (profundidadPct < 50) {
      mensajes.push(
        "Estás trabajando casi sólo en el nivel inmediato. Incorpora historia de aprendizaje y niveles evolutivos para ganar profundidad."
      );
    }

    if (usedDistractor) {
      mensajes.push(
        "Has utilizado al menos una pieza distractora. Varias descripciones representacionales parecen técnicas, pero no orientan la acción clínica."
      );
    }

    let mensajeBase = "";
    if (
      precisionPct >= 70 &&
      alcancePct >= 70 &&
      profundidadPct >= 70 &&
      !usedDistractor
    ) {
      mensajeBase =
        "Excelente. Tu conceptualización es sólida, amplia y coherente. Facilita intervenciones precisas y sostenibles.";
      finalFeedback.classList.add("p5-feedback-success");
    } else {
      mensajeBase =
        "Recuerda: en contextualismo funcional, una conceptualización 'verdadera' es aquella que amplía tu capacidad para intervenir, no la que suena más elegante.";
      finalFeedback.classList.add("p5-feedback-error");
    }

    mensajes.unshift(mensajeBase);

    finalFeedback.innerHTML = mensajes.join("<br>");
  }

  function clampPercent(value) {
    if (value < 0) return 0;
    if (value > 100) return 100;
    return Math.round(value);
  }

  // --------------------------------------------------
  // Reinicio completo
  // --------------------------------------------------

  function resetExercise() {
    // Devolver tarjetas a su origen
    cards.forEach((card) => {
      card.classList.remove(
        "p5-card-dragging",
        "p5-card-good",
        "p5-card-bad",
        "p5-card-star",
        "p5-card-melt"
      );
      const originId = card.dataset.origin;
      const origin = document.getElementById(originId);
      if (origin) {
        const pool = origin.querySelector(".p5-card-pool");
        if (pool && !pool.contains(card)) {
          pool.appendChild(card);
        }
      }
    });

    usedDistractor = false;

    // Limpiar board
    if (boardHint) {
      boardHint.style.display = "";
    }
    board.classList.remove("p5-board-active", "p5-board-error");

    // Reset resultados
    if (pieceCounter) {
      pieceCounter.textContent = `0 / ${MAX_PIEZAS} piezas seleccionadas`;
    }
    if (resultsPrecision) resultsPrecision.textContent = "0%";
    if (resultsAlcance) resultsAlcance.textContent = "0%";
    if (resultsProfundidad) resultsProfundidad.textContent = "0%";
    if (resultsText) {
      resultsText.textContent =
        'Cuando pulses "Evaluar análisis", aquí aparecerá una interpretación de tu modelo.';
    }

    finalFeedback.textContent = "";
    finalFeedback.classList.remove(
      "p5-feedback-success",
      "p5-feedback-error"
    );
  }
});
