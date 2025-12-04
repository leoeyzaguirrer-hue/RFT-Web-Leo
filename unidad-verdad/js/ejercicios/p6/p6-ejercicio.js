/* ============================================================
   EJERCICIO P6 · El Juego de Contingencias del Terapeuta
   Lógica de rondas, contingencias y autocorrección
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  // Elementos principales
  const env = document.getElementById("p6-env");
  const envLabel = document.getElementById("p6-env-label");
  const envTagline = document.getElementById("p6-env-tagline");

  const avatarTherapist = document.getElementById("p6-avatar-therapist");
  const avatarTherapistText = document.getElementById(
    "p6-avatar-therapist-text"
  );
  const avatarClient = document.getElementById("p6-avatar-client");
  const avatarClientText = document.getElementById("p6-avatar-client-text");

  const impactFill = document.getElementById("p6-impact-fill");
  const scoreAcademia = document.getElementById("p6-score-academia");
  const scoreCoherencia = document.getElementById("p6-score-coherencia");
  const scoreClinico = document.getElementById("p6-score-clinico");

  const roundNumber = document.getElementById("p6-round-number");
  const roundProgress = document.getElementById("p6-round-progress");
  const caseText = document.getElementById("p6-case-text");
  const optionButtons = [
    document.getElementById("p6-option-1"),
    document.getElementById("p6-option-2"),
    document.getElementById("p6-option-3"),
  ];
  const roundFeedback = document.getElementById("p6-round-feedback");

  const btnPrevRound = document.getElementById("p6-btn-prev-round");
  const btnNextRound = document.getElementById("p6-btn-next-round");

  const pctAcademia = document.getElementById("p6-pct-academia");
  const pctCoherencia = document.getElementById("p6-pct-coherencia");
  const pctClinico = document.getElementById("p6-pct-clinico");
  const resultsText = document.getElementById("p6-results-text");

  const btnEvaluate = document.getElementById("p6-btn-evaluate");
  const btnReset = document.getElementById("p6-btn-reset");
  const finalFeedback = document.getElementById("p6-final-feedback");

  // Definición de rondas y opciones
  const rounds = [
    {
      id: 1,
      caseText:
        "Evita reuniones sociales cuando anticipa juicio. Ha empezado a aislarse y rechaza invitaciones que antes aceptaba.",
      options: [
        {
          label: "📚 Explorar estructura profunda del self.",
          type: "academia",
          envLabel: "Ambiente académico",
          envTagline:
            "Tu análisis suena sofisticado y complejo. Colegas y supervisores lo valoran.",
          therapistText:
            "El terapeuta se siente reconocido por su marco teórico profundo.",
          clientFace: "😐",
          clientText:
            "La vida del consultante cambia poco. La explicación no orienta acciones concretas.",
        },
        {
          label: "🧠 Relacionarlo con un rasgo evitativo.",
          type: "coherencia",
          envLabel: "Ambiente de coherencia conceptual",
          envTagline:
            "El caso encaja ordenadamente en un esquema explicativo estable.",
          therapistText:
            "El terapeuta siente que la narrativa del caso está bien armada.",
          clientFace: "😕",
          clientText:
            "El consultante sigue atascado. La etiqueta describe, pero no cambia el patrón.",
        },
        {
          label:
            "🎯 Identificar función de evitar para obtener alivio inmediato.",
          type: "clinico",
          envLabel: "Ambiente de eficacia clínica",
          envTagline:
            "El foco está en cómo la evitación reduce malestar y mantiene el patrón.",
          therapistText:
            "El terapeuta organiza el caso en términos de función y contexto.",
          clientFace: "🙂",
          clientText:
            "El consultante empieza a ver alternativas concretas para acercarse a lo que valora.",
        },
      ],
    },
    {
      id: 2,
      caseText:
        "Duda persistentemente al tomar decisiones importantes. Pospone elecciones y busca que otros decidan por él.",
      options: [
        {
          label: "🏛 Revisar trauma histórico como causa principal.",
          type: "academia",
          envLabel: "Ambiente académico",
          envTagline:
            "La explicación histórica es valorada en ciertos marcos teóricos y espacios de discusión.",
          therapistText:
            "El terapeuta despliega un análisis complejo y culturalmente reconocible.",
          clientFace: "😐",
          clientText:
            "El consultante comprende un posible origen, pero la pauta de indecisión se mantiene.",
        },
        {
          label:
            "🎭 Ajustarlo al esquema narrativo que el paciente trae de sí mismo.",
          type: "coherencia",
          envLabel: "Ambiente de coherencia conceptual",
          envTagline:
            "La historia del paciente se vuelve internamente coherente y consistente.",
          therapistText:
            "El terapeuta siente que la narrativa identitaria del consultante está bien articulada.",
          clientFace: "😕",
          clientText:
            "La indecisión se reconfigura narrativamente, pero sigue presente en su conducta diaria.",
        },
        {
          label:
            "🎯 Analizar el patrón de evitación de responsabilidad y sus contingencias.",
          type: "clinico",
          envLabel: "Ambiente de eficacia clínica",
          envTagline:
            "La conceptualización organiza antecedentes, conductas y consecuencias observables.",
          therapistText:
            "El terapeuta puede diseñar ejercicios específicos para alterar el patrón de evitación.",
          clientFace: "🙂",
          clientText:
            "El consultante practica decisiones graduales y empieza a asumir más agencia en su vida.",
        },
      ],
    },
    {
      id: 3,
      caseText:
        "Experimenta pensamientos intrusivos que lo paralizan. Dedica mucho tiempo a analizarlos y teme que signifiquen algo profundo.",
      options: [
        {
          label: "📚 Explorar un posible conflicto inconsciente subyacente.",
          type: "academia",
          envLabel: "Ambiente académico",
          envTagline:
            "La hipótesis se percibe compleja, sofisticada y atractiva en términos teóricos.",
          therapistText:
            "El terapeuta se siente intelectualmente estimulado por el análisis.",
          clientFace: "😐",
          clientText:
            "Los pensamientos intrusivos continúan, ahora con una capa extra de interpretación.",
        },
        {
          label:
            "🧠 Describirlo como un patrón de sobreidentificación con el contenido de los pensamientos.",
          type: "coherencia",
          envLabel: "Ambiente de coherencia conceptual",
          envTagline:
            "La experiencia encaja en un modelo conceptual que ordena el fenómeno.",
          therapistText:
            "El terapeuta siente que entiende bien el caso dentro de un marco general.",
          clientFace: "😕",
          clientText:
            "El consultante nombra el patrón, pero aún le cuesta responder de forma distinta a los pensamientos.",
        },
        {
          label:
            "🎯 Analizar la función de la fusión y la evitación, y construir alternativas de respuesta.",
          type: "clinico",
          envLabel: "Ambiente de eficacia clínica",
          envTagline:
            "La conceptualización se orienta a cambiar la relación funcional con los eventos privados.",
          therapistText:
            "El terapeuta diseña intervenciones para flexibilizar la respuesta a los pensamientos.",
          clientFace: "✨",
          clientText:
            "El consultante empieza a notar los pensamientos y a seguir actuando en función de sus valores.",
        },
      ],
    },
  ];

  // Estado interno
  let currentRoundIndex = 0;
  let choicesByRound = {}; // { roundId: "academia" | "coherencia" | "clinico" }
  let scores = {
    academia: 0,
    coherencia: 0,
    clinico: 0,
  };
  let clinicalImpact = 0; // 0–100

  // Inicialización
  initExercise();

  // --------------------------------------------
  // Inicialización y reset
  // --------------------------------------------

  function initExercise() {
    // Asignar eventos a opciones
    optionButtons.forEach((btn) => {
      btn.addEventListener("click", handleOptionClick);
    });

    // Navegación entre rondas
    btnPrevRound.addEventListener("click", () => changeRound(-1));
    btnNextRound.addEventListener("click", () => changeRound(1));

    // Botones finales
    btnEvaluate.addEventListener("click", handleEvaluate);
    btnReset.addEventListener("click", resetExercise);

    resetExercise();
  }

  function resetExercise() {
    currentRoundIndex = 0;
    choicesByRound = {};
    scores = { academia: 0, coherencia: 0, clinico: 0 };
    clinicalImpact = 0;

    // Reset entorno
    env.classList.remove(
      "p6-env-academia",
      "p6-env-coherencia",
      "p6-env-clinico"
    );
    envLabel.textContent = "Ambiente neutro";
    envTagline.textContent = "Aún no has tomado decisiones.";

    // Reset avatares
    avatarTherapist.textContent = "🧑‍⚕️";
    avatarTherapistText.textContent =
      "Terapeuta en estado neutro, evaluando opciones.";
    avatarClient.textContent = "😐";
    avatarClientText.textContent =
      "Consultante sin cambios clínicos aún visibles.";

    // Impacto clínico
    updateImpactFill();

    // Scores visibles
    updateScoresDisplay();

    // Resultados numéricos
    pctAcademia.textContent = "0%";
    pctCoherencia.textContent = "0%";
    pctClinico.textContent = "0%";

    resultsText.textContent =
      'Cuando pulses "Evaluar patrón de selección", aparecerá aquí un análisis contextualista de tus elecciones.';

    finalFeedback.textContent = "";
    finalFeedback.classList.remove(
      "p6-feedback-success",
      "p6-feedback-error"
    );

    // Limpiar selección visual de opciones
    optionButtons.forEach((btn) => {
      btn.classList.remove("p6-option-selected");
    });

    // Cargar primera ronda
    loadCurrentRound();
    updateRoundProgress();
  }

  // --------------------------------------------
  // Manejo de rondas
  // --------------------------------------------

  function loadCurrentRound() {
    const round = rounds[currentRoundIndex];
    if (!round) return;

    roundNumber.textContent = round.id.toString();
    caseText.textContent = round.caseText;

    round.options.forEach((opt, idx) => {
      const btn = optionButtons[idx];
      btn.textContent = opt.label;
      btn.dataset.type = opt.type;
    });

    // Restaurar selección si ya había elección en esta ronda
    optionButtons.forEach((btn) => {
      btn.classList.remove("p6-option-selected");
    });

    const chosenType = choicesByRound[round.id];
    if (chosenType) {
      const chosenBtn = round.options.findIndex(
        (o) => o.type === chosenType
      );
      if (chosenBtn >= 0 && optionButtons[chosenBtn]) {
        optionButtons[chosenBtn].classList.add("p6-option-selected");
      }
      const opt = round.options[chosenBtn];
      applyEnvironment(opt, false);
      roundFeedback.textContent =
        "Ya seleccionaste una opción en esta ronda. Puedes cambiarla eligiendo otra.";
    } else {
      roundFeedback.textContent =
        "Elige una opción para ver cómo cambia el ambiente y qué tipo de reforzamiento recibe tu teoría.";
    }

    // Botones prev/next
    btnPrevRound.disabled = currentRoundIndex === 0;
    btnNextRound.disabled = currentRoundIndex === rounds.length - 1;
  }

  function changeRound(delta) {
    const newIndex = currentRoundIndex + delta;
    if (newIndex < 0 || newIndex >= rounds.length) return;
    currentRoundIndex = newIndex;
    loadCurrentRound();
    updateRoundProgress();
  }

  function updateRoundProgress() {
    const answeredCount = Object.keys(choicesByRound).length;
    roundProgress.textContent = `Has respondido ${answeredCount} de ${rounds.length} rondas.`;
  }

  // --------------------------------------------
  // Manejo de selección de opción
  // --------------------------------------------

  function handleOptionClick(event) {
    const btn = event.currentTarget;
    const index = parseInt(btn.dataset.choiceIndex, 10);
    const round = rounds[currentRoundIndex];
    if (!round || isNaN(index) || index < 0 || index >= round.options.length)
      return;

    const option = round.options[index];

    // Registrar elección de esta ronda
    registerChoice(round.id, option.type);

    // Actualizar selección visual
    optionButtons.forEach((b) => b.classList.remove("p6-option-selected"));
    btn.classList.add("p6-option-selected");

    // Aplicar entorno y feedback
    applyEnvironment(option, true);

    // Mini feedback contextualista por tipo
    if (option.type === "academia") {
      roundFeedback.textContent =
        "Esta opción maximiza el reforzamiento académico: tu análisis suena sofisticado y culturalmente valorado, pero el impacto clínico es limitado.";
    } else if (option.type === "coherencia") {
      roundFeedback.textContent =
        "Esta opción prioriza la coherencia conceptual: la narrativa del caso se siente ordenada, aunque la conducta del consultante cambia poco.";
    } else if (option.type === "clinico") {
      roundFeedback.textContent =
        "Esta opción se orienta a la eficacia clínica: organiza el caso en términos de función y contexto para guiar acciones concretas.";
    }

    updateScoresDisplay();
    updateImpactFill();
    updateRoundProgress();
  }

  function registerChoice(roundId, type) {
    const prevType = choicesByRound[roundId];

    // Si ya había una elección, restar su puntaje anterior
    if (prevType && scores[prevType] !== undefined) {
      scores[prevType] = Math.max(scores[prevType] - 1, 0);
      if (prevType === "clinico") {
        clinicalImpact = clamp(clinicalImpact - 25);
      }
    }

    // Registrar nuevo tipo
    choicesByRound[roundId] = type;
    if (scores[type] !== undefined) {
      scores[type] += 1;
      if (type === "clinico") {
        clinicalImpact = clamp(clinicalImpact + 25);
      }
    }
  }

  // --------------------------------------------
  // Actualización de entorno y avatares
  // --------------------------------------------

  function applyEnvironment(option, animateImpact) {
    env.classList.remove(
      "p6-env-academia",
      "p6-env-coherencia",
      "p6-env-clinico"
    );

    if (option.type === "academia") {
      env.classList.add("p6-env-academia");
    } else if (option.type === "coherencia") {
      env.classList.add("p6-env-coherencia");
    } else if (option.type === "clinico") {
      env.classList.add("p6-env-clinico");
    }

    envLabel.textContent = option.envLabel;
    envTagline.textContent = option.envTagline;

    // Terapeuta
    avatarTherapist.textContent = "🧑‍⚕️";
    avatarTherapistText.textContent = option.therapistText;

    // Consultante
    avatarClient.textContent = option.clientFace;
    avatarClientText.textContent = option.clientText;

    if (animateImpact) {
      updateImpactFill();
    }
  }

  function updateScoresDisplay() {
    if (scoreAcademia)
      scoreAcademia.textContent = scores.academia.toString();
    if (scoreCoherencia)
      scoreCoherencia.textContent = scores.coherencia.toString();
    if (scoreClinico)
      scoreClinico.textContent = scores.clinico.toString();
  }

  function updateImpactFill() {
    if (!impactFill) return;
    impactFill.style.width = `${clinicalImpact}%`;
  }

  function clamp(value) {
    if (value < 0) return 0;
    if (value > 100) return 100;
    return value;
  }

  // --------------------------------------------
  // Evaluación final
  // --------------------------------------------

  function handleEvaluate() {
    finalFeedback.textContent = "";
    finalFeedback.classList.remove(
      "p6-feedback-success",
      "p6-feedback-error"
    );

    const answeredCount = Object.keys(choicesByRound).length;
    if (answeredCount < rounds.length) {
      finalFeedback.textContent =
        "Responde las 3 rondas antes de evaluar tu patrón de selección de teorías.";
      finalFeedback.classList.add("p6-feedback-error");
      return;
    }

    const totalChoices =
      scores.academia + scores.coherencia + scores.clinico;
    if (totalChoices === 0) {
      pctAcademia.textContent = "0%";
      pctCoherencia.textContent = "0%";
      pctClinico.textContent = "0%";
      resultsText.textContent =
        "No se registraron elecciones suficientes para analizar tu patrón de selección.";
      finalFeedback.classList.add("p6-feedback-error");
      finalFeedback.textContent =
        "Algo salió mal al registrar tus elecciones. Intenta reiniciar el ejercicio.";
      return;
    }

    const pctAca = Math.round((scores.academia / totalChoices) * 100);
    const pctCoh = Math.round((scores.coherencia / totalChoices) * 100);
    const pctCli = Math.round((scores.clinico / totalChoices) * 100);

    pctAcademia.textContent = `${pctAca}%`;
    pctCoherencia.textContent = `${pctCoh}%`;
    pctClinico.textContent = `${pctCli}%`;

    // Construir análisis contextualista
    const lines = [];

    lines.push(
      `Tus conceptualizaciones fueron seleccionadas por: 🎓 Academia: ${pctAca}%, 🧠 Coherencia: ${pctCoh}%, 🎯 Eficacia clínica: ${pctCli}%.`
    );

    // Dominancia principal
    const maxPct = Math.max(pctAca, pctCoh, pctCli);
    const dominantDimensions = [];
    if (pctAca === maxPct) dominantDimensions.push("academia");
    if (pctCoh === maxPct) dominantDimensions.push("coherencia");
    if (pctCli === maxPct) dominantDimensions.push("clinico");

    if (dominantDimensions.length === 1) {
      if (dominantDimensions[0] === "academia") {
        lines.push(
          "Tu patrón se inclina a maximizar el reconocimiento académico: las teorías tienden a sobrevivir porque suenan sofisticadas o culturalmente validadas."
        );
      } else if (dominantDimensions[0] === "coherencia") {
        lines.push(
          "Tu patrón se orienta sobre todo a la coherencia conceptual: priorizas explicaciones ordenadas y narrativas claras, aunque el impacto conductual pueda ser limitado."
        );
      } else if (dominantDimensions[0] === "clinico") {
        lines.push(
          "Tu patrón está fuertemente orientado a la eficacia clínica: seleccionas teorías en función de su capacidad para organizar función, contexto e intervención."
        );
      }
    } else {
      lines.push(
        "Tus elecciones muestran una combinación de reforzamiento académico, coherencia conceptual y eficacia clínica. Observa qué tipo de consecuencia pesa más en cada caso."
      );
    }

    // Comentarios adicionales
    if (pctCli < 40) {
      lines.push(
        "El impacto clínico parece no ser siempre el criterio principal. Un enfoque contextualista invita a revisar qué tanto tus teorías ayudan a cambiar patrones conductuales específicos."
      );
    } else if (pctCli >= 60) {
      lines.push(
        "En varias decisiones diste peso a las consecuencias clínicas. Esto es coherente con el criterio pragmático: la verdad se evalúa por lo que permite hacer en la intervención."
      );
    }

    lines.push(
      "Desde el contextualismo funcional, la ciencia y las teorías son conductas seleccionadas por sus consecuencias. No sobreviven por representar una 'realidad interna', sino porque amplían (o no) nuestra capacidad para predecir e influir la conducta."
    );

    resultsText.innerHTML = lines.join("<br><br>");

    // Mensaje final de refuerzo o corrección
    if (pctCli >= pctAca && pctCli >= pctCoh) {
      finalFeedback.classList.add("p6-feedback-success");
      finalFeedback.textContent =
        "Muy bien. Estás entrenando una postura en la que la eficacia clínica pesa fuertemente en la selección de teorías y modelos.";
    } else {
      finalFeedback.classList.add("p6-feedback-error");
      finalFeedback.textContent =
        "Observa cómo a veces tus elecciones se orientan a reconocimiento o coherencia, más que a impacto clínico. Esa es justamente la clase de patrón que el contextualismo funcional invita a revisar.";
    }
  }
});
