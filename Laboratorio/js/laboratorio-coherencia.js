// ============================================================
// LABORATORIO RFT · COHERENCIA NIVELES 1 y 2
// Lógica de fases, botones, reinterpretaciones y preguntas
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // ------------------ Utilidad: cambio de fase ------------------
  const phases = document.querySelectorAll(".lab-phase");

  const goToPhase = (num) => {
    phases.forEach((ph) => {
      ph.classList.toggle("active", ph.dataset.phase === String(num));
    });
    const activeInner = document.querySelector(".lab-phase.active .phase-inner");
    if (activeInner) activeInner.scrollTop = 0;
  };

  // ============================================================
  // FASE 1 -> FASE 2
  // ============================================================
  const btnF1Next = document.getElementById("btnF1Next");
  if (btnF1Next) {
    btnF1Next.addEventListener("click", () => {
      goToPhase(2);
    });
  }

  // ============================================================
  // NIVEL 1 · ABSORCIÓN DE NUEVA INFORMACIÓN
  // ============================================================

  const experiencias = [
    "Aprobé el examen.",
    "Alguien me elogió sinceramente.",
    "Me fue bien en algo importante."
  ];

  const reinterpretaciones = [
    "Fue solo suerte, no significa nada.",
    "Lo dicen porque no me conocen de verdad.",
    "Esto es una excepción, ya me irá mal después."
  ];

  let indiceExperiencia = 0;

  const textoNuevaExperiencia = document.getElementById("textoNuevaExperiencia");
  const textoReinterpretacion = document.getElementById("textoReinterpretacion");
  const cohReinterpretCard = document.getElementById("cohReinterpretCard");
  const listaIntegradas = document.getElementById("listaIntegradas");
  const btnNuevaExperiencia = document.getElementById("btnNuevaExperiencia");
  const btnEnviarRed = document.getElementById("btnEnviarRed");
  const btnF2Next = document.getElementById("btnF2Next");
  const cohNivel1Estado = document.getElementById("cohNivel1Estado");

  const mostrarExperiencia = () => {
    if (!textoNuevaExperiencia) return;
    if (indiceExperiencia >= experiencias.length) {
      // Ya no hay más experiencias
      textoNuevaExperiencia.textContent = "No hay más experiencias nuevas por ahora.";
      if (btnEnviarRed) btnEnviarRed.disabled = true;
      return;
    }
    textoNuevaExperiencia.textContent = experiencias[indiceExperiencia];
    if (btnEnviarRed) btnEnviarRed.disabled = false;
    if (cohReinterpretCard) {
      cohReinterpretCard.style.display = "none";
      textoReinterpretacion.textContent = "";
    }
  };

  const enviarALaRed = () => {
    if (!listaIntegradas || indiceExperiencia >= reinterpretaciones.length) return;

    const reinterp = reinterpretaciones[indiceExperiencia];
    if (textoReinterpretacion) {
      textoReinterpretacion.textContent = reinterp;
    }
    if (cohReinterpretCard) {
      cohReinterpretCard.style.display = "block";
    }

    // Agregar al listado integrado
    const li = document.createElement("li");
    li.textContent = reinterp;
    listaIntegradas.appendChild(li);

    indiceExperiencia += 1;

    // Después de enviar, desactivar botón hasta nueva experiencia
    if (btnEnviarRed) btnEnviarRed.disabled = true;

    // Si ya se integraron todas, permitir pasar a la pregunta
    if (indiceExperiencia >= experiencias.length) {
      if (btnF2Next) btnF2Next.disabled = false;
      if (cohNivel1Estado) {
        cohNivel1Estado.textContent = "La red creció, pero su lógica central se mantuvo intacta.";
      }
    }
  };

  if (btnNuevaExperiencia) {
    btnNuevaExperiencia.addEventListener("click", mostrarExperiencia);
  }

  if (btnEnviarRed) {
    btnEnviarRed.addEventListener("click", enviarALaRed);
  }

  // Inicializar la primera experiencia
  if (textoNuevaExperiencia) {
    mostrarExperiencia();
  }

  if (btnF2Next) {
    btnF2Next.addEventListener("click", () => {
      goToPhase(3);
    });
  }

  // ============================================================
  // NIVEL 1 · PREGUNTA FUNCIONAL
  // ============================================================

  const questionOptions1 = document.querySelectorAll(
    '[data-phase="3"] .question-option'
  );
  const feedbackNivel1 = document.getElementById("feedbackNivel1");
  const teoriaNivel1 = document.getElementById("teoriaNivel1");
  const btnIrNivel2 = document.getElementById("btnIrNivel2");

  questionOptions1.forEach((btn) => {
    btn.addEventListener("click", () => {
      const esCorrecta = btn.dataset.correct === "true";
      // reset estilos
      questionOptions1.forEach((b) => {
        b.classList.remove("correct", "incorrect");
      });
      if (esCorrecta) {
        btn.classList.add("correct");
        if (feedbackNivel1) {
          feedbackNivel1.textContent =
            "Correcto: la red reorganiza todo para seguir siendo la misma.";
        }
        if (teoriaNivel1) teoriaNivel1.style.display = "block";
        if (btnIrNivel2) btnIrNivel2.disabled = false;
      } else {
        btn.classList.add("incorrect");
        if (feedbackNivel1) {
          feedbackNivel1.textContent =
            "No exactamente. Observa cómo nada rompió la lógica central de la red.";
        }
      }
    });
  });

  if (btnIrNivel2) {
    btnIrNivel2.addEventListener("click", () => {
      goToPhase(4);
    });
  }

  // ============================================================
  // NIVEL 2 · REACTIVACIÓN + YO NARRATIVO
  // ============================================================

  const btnF4Next = document.getElementById("btnF4Next");
  if (btnF4Next) {
    btnF4Next.addEventListener("click", () => {
      goToPhase(5);
    });
  }

  // ============================================================
  // NIVEL 2 · EXPERIENCIA AMBIGUA + ELECCIÓN
  // ============================================================

  const ventanaOpciones = document.querySelectorAll(".ventana-opcion");
  const btnConfirmarEleccion = document.getElementById("btnConfirmarEleccion");
  const feedbackEleccion = document.getElementById("feedbackEleccion");
  const cohReinterpretNivel2 = document.getElementById("cohReinterpretNivel2");
  const textoReinterpNivel2 = document.getElementById("textoReinterpNivel2");
  const yoNodeNivel2 = document.getElementById("yoNodeNivel2");
  const reglaNivel2 = document.getElementById("reglaNivel2");
  const btnF5Next = document.getElementById("btnF5Next");

  let opcionSeleccionada = null;
  const textoReinterpretacionAmbigua =
    "Esto era solo una calma antes del fracaso.";

  ventanaOpciones.forEach((btn) => {
    btn.addEventListener("click", () => {
      ventanaOpciones.forEach((b) => b.classList.remove("seleccionada"));
      btn.classList.add("seleccionada");
      opcionSeleccionada = btn.dataset.opcion;
      if (feedbackEleccion) feedbackEleccion.textContent = "";
    });
  });

  if (btnConfirmarEleccion) {
    btnConfirmarEleccion.addEventListener("click", () => {
      if (!opcionSeleccionada) {
        if (feedbackEleccion) {
          feedbackEleccion.textContent =
            "Elige primero una interpretación para la experiencia.";
        }
        return;
      }

      if (opcionSeleccionada === "coherente") {
        // Interpretación que mantiene la coherencia
        if (feedbackEleccion) {
          feedbackEleccion.textContent =
            "Esta interpretación mantiene intacta la coherencia del sistema.";
        }
        if (cohReinterpretNivel2 && textoReinterpNivel2) {
          cohReinterpretNivel2.style.display = "block";
          textoReinterpNivel2.textContent = textoReinterpretacionAmbigua;
        }
        if (yoNodeNivel2) {
          yoNodeNivel2.classList.add("iluminado");
        }
        if (reglaNivel2) {
          reglaNivel2.style.display = "block";
        }
        if (btnF5Next) {
          btnF5Next.disabled = false;
        }
      } else {
        // Interpretaciones que no mantienen coherencia patológica
        if (feedbackEleccion) {
          feedbackEleccion.textContent =
            "Esa interpretación no ayuda a mantener la red tal como está. Observa cuál opción protege más la coherencia.";
        }
      }
    });
  }

  if (btnF5Next) {
    btnF5Next.addEventListener("click", () => {
      goToPhase(6);
    });
  }

  // ============================================================
  // NIVEL 2 · PREGUNTA FUNCIONAL
  // ============================================================

  const questionOptions2 = document.querySelectorAll(
    '[data-phase="6"] .question-option'
  );
  const feedbackNivel2 = document.getElementById("feedbackNivel2");
  const teoriaNivel2 = document.getElementById("teoriaNivel2");
  const implicacionesNivel2 = document.getElementById("implicacionesNivel2");

  questionOptions2.forEach((btn) => {
    btn.addEventListener("click", () => {
      const esCorrecta = btn.dataset.correct === "true";
      // reset estilos
      questionOptions2.forEach((b) => {
        b.classList.remove("correct", "incorrect");
      });
      if (esCorrecta) {
        btn.classList.add("correct");
        if (feedbackNivel2) {
          feedbackNivel2.textContent =
            "Exacto: el sistema ya no solo se defiende, ahora genera reglas para mantenerse.";
        }
        if (teoriaNivel2) teoriaNivel2.style.display = "block";
        if (implicacionesNivel2) implicacionesNivel2.style.display = "block";
      } else {
        btn.classList.add("incorrect");
        if (feedbackNivel2) {
          feedbackNivel2.textContent =
            "No del todo. Observa cómo el yo narrativo produce reglas para mantener el sistema estable.";
        }
      }
    });
  });

  // ============================================================
  // REINICIAR LABORATORIO
  // ============================================================

  const btnReiniciarCoherencia = document.getElementById("btnReiniciarCoherencia");
  if (btnReiniciarCoherencia) {
    btnReiniciarCoherencia.addEventListener("click", () => {
      window.location.reload();
    });
  }
});
