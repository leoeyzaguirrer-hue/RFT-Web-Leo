// ============================================================
// EJERCICIO BLOQUE 1 · SIMULADOR DE FORMULACIÓN VIVA
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".f1-card");
  const dropzone = document.getElementById("f1-dropzone");
  const avatar = document.getElementById("f1-avatar");
  const avatarText = document.getElementById("f1-avatar-text");
  const meterInner = document.getElementById("f1-meter-inner");
  const meterValue = document.getElementById("f1-meter-value");
  const actionsPanel = document.getElementById("f1-actions-panel");
  const actionsEmpty = document.getElementById("f1-actions-empty");
  const actionsList = document.getElementById("f1-actions-list");
  const btnEvaluar = document.getElementById("f1-btn-evaluar");
  const btnReset = document.getElementById("f1-btn-reset");
  const feedbackFinal = document.getElementById("f1-feedback-final");

  let lastSelection = null; // guarda la última tarjeta aplicada

  // Configuración de cada tarjeta
  const CARD_CONFIG = {
    "defecto-interno": {
      category: "representacional",
      meter: 10,
      avatarEmoji: "😕",
      avatarText:
        "Esta formulación atribuye el patrón a un defecto interno. Describe, pero no orienta a intervenir.",
      actions: [],
      evalFeedback:
        "Describir al consultante como defectuoso no guía acciones flexibles. En contextualismo, la formulación debe apuntar a patrones funcionales modificables."
    },
    "siempre-fue-asi": {
      category: "representacional",
      meter: 15,
      avatarEmoji: "😕",
      avatarText:
        "“Siempre fue así” es una formulación estática. Cierra la exploración de antecedentes, consecuencias y contexto.",
      actions: [],
      evalFeedback:
        "Una formulación que naturaliza el problema (“siempre fue así”) tiende a bloquear el cambio. Busca descripciones que abran posibilidades de intervención."
    },
    "evita-experiencias": {
      category: "funcional",
      meter: 60,
      avatarEmoji: "🙂",
      avatarText:
        "Ahora la formulación describe la función: evitar experiencias internas difíciles. Esto ya orienta hacia procesos de evitación experiencial.",
      actions: [
        "Explorar la evitación experiencial en sesión.",
        "Diseñar ejercicios de exposición a sensaciones internas.",
        "Introducir metáforas y prácticas de aceptación."
      ],
      evalFeedback:
        "Estás formulando en términos funcionales (evitación de experiencias internas). Un siguiente paso es traducir esto en acciones clínicas concretas y sostenidas."
    },
    "contexto-contingencias": {
      category: "funcional",
      meter: 65,
      avatarEmoji: "🙂",
      avatarText:
        "Describes cómo el patrón cambia según contexto y contingencias. Es una formulación dinámica y sensible al entorno.",
      actions: [
        "Mapear contextos que disparan el patrón.",
        "Modificar contingencias relevantes (reforzadores y antecedentes)."
      ],
      evalFeedback:
        "Observar el rol del contexto y las contingencias es clave en un análisis funcional. Asegúrate de que la formulación también señale qué hacer diferente."
    },
    "alivio-inmediato": {
      category: "accion",
      meter: 90,
      avatarEmoji: "😊",
      avatarText:
        "La conducta se mantiene por alivio inmediato. Esto orienta claramente a trabajar con el ciclo alivio–mantenimiento.",
      actions: [
        "Análisis funcional en vivo del ciclo alivio–malestar.",
        "Diseñar exposición encadenada para permanecer en contacto con malestar.",
        "Trabajar reglas que fomenten acción valiosa pese al impulso de aliviar."
      ],
      evalFeedback:
        "Has llegado a una formulación viva: especifica la función (alivio inmediato) y sugiere intervenciones claras para modificar el patrón."
    },
    "intervencion-clara": {
      category: "accion",
      meter: 95,
      avatarEmoji: "✨",
      avatarText:
        "La formulación ya incluye una dirección de intervención. Estás usando la conceptualización como herramienta, no como descripción abstracta.",
      actions: [
        "Especificar la intervención propuesta (qué, cuándo, cómo).",
        "Vincular la intervención con valores del consultante.",
        "Definir indicadores observables de cambio."
      ],
      evalFeedback:
        "Una formulación contextualista se valida por las acciones que habilita. Aquí la conceptualización está claramente al servicio del diseño de intervención."
    }
  };

  // -----------------------------
  // DRAG & DROP DE TARJETAS
  // -----------------------------
  cards.forEach((card) => {
    card.addEventListener("dragstart", (ev) => {
      ev.dataTransfer.setData("text/plain", card.dataset.cardId);
      card.classList.add("f1-card-dragging");
    });

    card.addEventListener("dragend", () => {
      card.classList.remove("f1-card-dragging");
    });
  });

  dropzone.addEventListener("dragover", (ev) => {
    ev.preventDefault();
    dropzone.classList.add("f1-dropzone-hover");
  });

  dropzone.addEventListener("dragleave", () => {
    dropzone.classList.remove("f1-dropzone-hover");
  });

  dropzone.addEventListener("drop", (ev) => {
    ev.preventDefault();
    dropzone.classList.remove("f1-dropzone-hover");
    const cardId = ev.dataTransfer.getData("text/plain");
    if (!cardId || !CARD_CONFIG[cardId]) return;

    aplicarFormulacion(cardId);
  });

  // Permitir también clic (para estudiantes que no arrastran)
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const cardId = card.dataset.cardId;
      if (CARD_CONFIG[cardId]) {
        aplicarFormulacion(cardId);
      }
    });
  });

  // -----------------------------
  // APLICAR FORMULACIÓN
  // -----------------------------
  function aplicarFormulacion(cardId) {
    const config = CARD_CONFIG[cardId];
    lastSelection = cardId;

    // Marcar tarjeta seleccionada
    cards.forEach((c) => c.classList.remove("f1-card-selected"));
    const selected = Array.from(cards).find(
      (c) => c.dataset.cardId === cardId
    );
    if (selected) {
      selected.classList.add("f1-card-selected");
    }

    // Actualizar avatar
    avatar.textContent = config.avatarEmoji;
    avatarText.textContent = config.avatarText;

    // Actualizar indicador
    meterInner.style.width = `${config.meter}%`;
    meterValue.textContent = `${config.meter}%`;

    // Actualizar panel de acciones
    actualizarAcciones(config);

    // Limpiar feedback final al cambiar de formulación
    feedbackFinal.textContent = "";
    feedbackFinal.classList.remove("f1-feedback-ok", "f1-feedback-warn", "f1-feedback-error");
  }

  function actualizarAcciones(config) {
    actionsList.innerHTML = "";

    if (!config.actions || config.actions.length === 0) {
      actionsEmpty.style.display = "block";
      return;
    }

    actionsEmpty.style.display = "none";
    config.actions.forEach((accion) => {
      const li = document.createElement("li");
      li.className = "f1-action-item";
      li.textContent = accion;
      actionsList.appendChild(li);
    });
  }

  // -----------------------------
  // EVALUAR FORMULACIÓN
  // -----------------------------
  btnEvaluar.addEventListener("click", () => {
    if (!lastSelection || !CARD_CONFIG[lastSelection]) {
      feedbackFinal.textContent =
        "Primero aplica una formulación al consultante (arrastrando una tarjeta o haciendo clic sobre ella).";
      feedbackFinal.className = "f1-feedback-final f1-feedback-warn";
      return;
    }

    const config = CARD_CONFIG[lastSelection];

    if (config.category === "accion") {
      feedbackFinal.textContent =
        config.evalFeedback +
        " Estás usando la conceptualización como herramienta funcional.";
      feedbackFinal.className = "f1-feedback-final f1-feedback-ok";
    } else if (config.category === "funcional") {
      feedbackFinal.textContent =
        config.evalFeedback +
        " Trata de afinar aún más: ¿qué harás diferente en sesión gracias a esta formulación?";
      feedbackFinal.className = "f1-feedback-final f1-feedback-warn";
    } else {
      feedbackFinal.textContent =
        config.evalFeedback +
        " Recuerda: en ACT/RFT, una formulación es viva cuando abre rutas de acción, no cuando cierra la exploración.";
      feedbackFinal.className = "f1-feedback-final f1-feedback-error";
    }
  });

  // -----------------------------
  // REINICIAR EJERCICIO
  // -----------------------------
  btnReset.addEventListener("click", () => {
    lastSelection = null;

    // Quitar selección de tarjetas
    cards.forEach((c) => c.classList.remove("f1-card-selected"));

    // Reset avatar
    avatar.textContent = "😐";
    avatarText.textContent =
      "El consultante está en estado neutro. Aún no has aplicado ninguna formulación.";

    // Reset indicador
    meterInner.style.width = "0%";
    meterValue.textContent = "0%";

    // Reset acciones
    actionsList.innerHTML = "";
    actionsEmpty.style.display = "block";

    // Reset feedback
    feedbackFinal.textContent = "";
    feedbackFinal.className = "f1-feedback-final";
  });
});
