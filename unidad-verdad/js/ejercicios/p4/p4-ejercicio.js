/* ============================================================
   EJERCICIO P4 · Evaluando el impacto clínico de tus descripciones
   Lógica de arrastre, medidores, avatar y autocorrección
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const cardPool = document.getElementById("p4-card-pool");
  const dropzone = document.getElementById("p4-dropzone");
  const dropHint = document.getElementById("p4-drop-hint");

  const meterEfficacy = document.getElementById("p4-meter-efficacy");
  const meterClarity = document.getElementById("p4-meter-clarity");
  const meterValues = document.getElementById("p4-meter-values");

  const avatar = document.getElementById("p4-avatar");
  const avatarText = document.getElementById("p4-avatar-text");

  const btnEvaluate = document.getElementById("p4-btn-evaluate");
  const btnReset = document.getElementById("p4-btn-reset");
  const finalFeedback = document.getElementById("p4-final-feedback");

  const cards = Array.from(document.querySelectorAll(".p4-card"));

  // Estado interno
  let currentDragCard = null;
  let baseline = 50; // nivel neutro de las barras
  let meterState = {
    efficacy: baseline,
    clarity: baseline,
    values: baseline,
  };

  // Contadores para autocorrección
  let counts = {
    representacional: 0,
    funcional: 0,
    contextual: 0,
    neutra: 0,
  };

  // --------------------------------------------
  // Inicialización
  // --------------------------------------------

  resetExercise();

  cards.forEach((card) => {
    card.addEventListener("dragstart", handleDragStart);
    card.addEventListener("dragend", handleDragEnd);
  });

  dropzone.addEventListener("dragover", handleDragOver);
  dropzone.addEventListener("dragenter", handleDragEnter);
  dropzone.addEventListener("dragleave", handleDragLeave);
  dropzone.addEventListener("drop", handleDrop);

  btnEvaluate.addEventListener("click", handleEvaluate);
  btnReset.addEventListener("click", resetExercise);

  // --------------------------------------------
  // Funciones de drag & drop
  // --------------------------------------------

  function handleDragStart(event) {
    if (event.currentTarget.classList.contains("p4-card-locked")) return;

    currentDragCard = event.currentTarget;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", currentDragCard.dataset.cardId);
    currentDragCard.classList.add("p4-card-dragging");
  }

  function handleDragEnd(event) {
    if (!currentDragCard) return;
    currentDragCard.classList.remove("p4-card-dragging");
    currentDragCard = null;
  }

  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  function handleDragEnter(event) {
    event.preventDefault();
    dropzone.classList.add("p4-dropzone-active");
  }

  function handleDragLeave(event) {
    // Evitar parpadeos: solo quitar si realmente salimos del dropzone
    if (!dropzone.contains(event.relatedTarget)) {
      dropzone.classList.remove("p4-dropzone-active");
    }
  }

  function handleDrop(event) {
    event.preventDefault();
    dropzone.classList.remove("p4-dropzone-active");

    const cardId = event.dataTransfer.getData("text/plain");
    const card = cards.find((c) => c.dataset.cardId === cardId);

    if (!card || card.classList.contains("p4-card-locked")) return;

    // Mover tarjeta a la zona de evaluación
    dropzone.appendChild(card);
    card.classList.add("p4-card-locked");

    if (dropHint) {
      dropHint.style.display = "none";
    }

    // Limpiar clases de resultado previo
    card.classList.remove("p4-card-good", "p4-card-bad", "p4-card-star");

    // Aplicar efecto según categoría
    const category = card.dataset.category;
    applyCardEffect(category);

    // Actualizar contadores
    if (counts.hasOwnProperty(category)) {
      counts[category]++;
    }

    updateMetersVisual();
  }

  // --------------------------------------------
  // Lógica de efectos en medidores y avatar
  // --------------------------------------------

  function applyCardEffect(category) {
    let deltaNeg = -12;
    let deltaPosModerado = 10;
    let deltaPosFuerte = 18;
    let deltaNeutral = 0;

    // Decisión especial para tarjeta neutra
    if (category === "neutra") {
      const totalFuncionales =
        counts.funcional + counts.contextual;
      const totalRepres = counts.representacional;

      if (totalFuncionales > totalRepres) {
        category = "funcional";
        deltaNeutral = deltaPosModerado;
      } else if (totalRepres > totalFuncionales) {
        category = "representacional";
        deltaNeutral = deltaNeg;
      } else {
        // equilibrio: efecto mínimo
        category = "funcional";
        deltaNeutral = 4;
      }
    }

    switch (category) {
      case "representacional":
        meterState.efficacy = clamp(meterState.efficacy + deltaNeg);
        meterState.clarity = clamp(meterState.clarity + deltaNeg);
        meterState.values = clamp(meterState.values + deltaNeg);
        setAvatarState("confused");
        if (avatarText) {
          avatarText.textContent =
            "Esta descripción no orienta la acción clínica. Funciona como explicación interna, no como guía de intervención.";
        }
        break;

      case "funcional":
        meterState.efficacy = clamp(
          meterState.efficacy + (deltaNeutral || deltaPosModerado)
        );
        meterState.clarity = clamp(
          meterState.clarity + (deltaNeutral || deltaPosModerado)
        );
        meterState.values = clamp(
          meterState.values + (deltaNeutral || deltaPosModerado)
        );
        setAvatarState("smile");
        if (avatarText) {
          avatarText.textContent =
            "Esta descripción ayuda a guiar la intervención, aunque podría precisarse más en términos de función y contexto.";
        }
        break;

      case "contextual":
        meterState.efficacy = clamp(meterState.efficacy + deltaPosFuerte);
        meterState.clarity = clamp(meterState.clarity + deltaPosFuerte);
        meterState.values = clamp(meterState.values + deltaPosFuerte);
        setAvatarState("star");
        if (avatarText) {
          avatarText.textContent =
            "Descripción funcional-contextual: organiza el patrón conductual en relación con el contexto y orienta una acción clínica precisa.";
        }
        break;
    }
  }

  function setAvatarState(state) {
    if (!avatar) return;
    switch (state) {
      case "confused":
        avatar.textContent = "😕";
        break;
      case "smile":
        avatar.textContent = "🙂";
        break;
      case "star":
        avatar.textContent = "✨";
        break;
      default:
        avatar.textContent = "😐";
    }
  }

  function updateMetersVisual() {
    meterEfficacy.style.height = meterState.efficacy + "%";
    meterClarity.style.height = meterState.clarity + "%";
    meterValues.style.height = meterState.values + "%";
  }

  function clamp(value) {
    if (value < 0) return 0;
    if (value > 100) return 100;
    return value;
  }

  // --------------------------------------------
  // Autocorrección final
  // --------------------------------------------

  function handleEvaluate() {
    // Quitar clases previas
    cards.forEach((card) => {
      card.classList.remove(
        "p4-card-good",
        "p4-card-bad",
        "p4-card-star"
      );
    });
    finalFeedback.textContent = "";
    finalFeedback.classList.remove(
      "p4-feedback-success",
      "p4-feedback-error"
    );

    const anyDropped = cards.some((card) =>
      dropzone.contains(card)
    );
    if (!anyDropped) {
      finalFeedback.textContent =
        "Primero arrastra al menos una tarjeta al área de evaluación para analizar sus efectos clínicos.";
      finalFeedback.classList.add("p4-feedback-error");
      return;
    }

    // Clasificación visual de tarjetas
    cards.forEach((card) => {
      if (!dropzone.contains(card)) return;

      const category = card.dataset.category;

      if (category === "representacional") {
        card.classList.add("p4-card-bad");
      } else if (category === "contextual") {
        card.classList.add("p4-card-star");
      } else if (category === "funcional") {
        card.classList.add("p4-card-good");
      } else if (category === "neutra") {
        // neutra: color según efecto global
        const totalFuncionales =
          counts.funcional + counts.contextual;
        const totalRepres = counts.representacional;
        if (totalFuncionales >= totalRepres) {
          card.classList.add("p4-card-good");
        } else {
          card.classList.add("p4-card-bad");
        }
      }
    });

    const totalFuncionales = counts.funcional + counts.contextual;
    const totalRepres = counts.representacional;

    if (totalFuncionales > totalRepres) {
      finalFeedback.textContent =
        "Verdad, en contextualismo funcional, es aquello que transforma la intervención clínica. Tus descripciones organizan la conducta en términos de función y contexto más que de causas internas.";
      finalFeedback.classList.add("p4-feedback-success");
    } else {
      finalFeedback.textContent =
        "Describir no es intervenir. Muchas de tus descripciones se centran en explicaciones internas o rasgos fijos. Observa cómo eso limita la precisión y la utilidad de tus acciones clínicas.";
      finalFeedback.classList.add("p4-feedback-error");
    }
  }

  // --------------------------------------------
  // Reinicio completo del ejercicio
  // --------------------------------------------

  function resetExercise() {
    // Reiniciar medidores
    meterState.efficacy = baseline;
    meterState.clarity = baseline;
    meterState.values = baseline;
    updateMetersVisual();

    // Volver avatar a estado neutro
    setAvatarState("neutral");
    if (avatarText) {
      avatarText.textContent =
        "Estado neutro. Tus descripciones aún no han sido evaluadas.";
    }

    // Reset de contadores
    counts = {
      representacional: 0,
      funcional: 0,
      contextual: 0,
      neutra: 0,
    };

    // Devolver tarjetas al pool
    cards.forEach((card) => {
      card.classList.remove(
        "p4-card-dragging",
        "p4-card-locked",
        "p4-card-good",
        "p4-card-bad",
        "p4-card-star"
      );
      if (cardPool && !cardPool.contains(card)) {
        cardPool.appendChild(card);
      }
    });

    // Hint visible de nuevo
    if (dropHint) {
      dropHint.style.display = "";
    }

    // Limpiar feedback final
    finalFeedback.textContent = "";
    finalFeedback.classList.remove(
      "p4-feedback-success",
      "p4-feedback-error"
    );
  }
});
