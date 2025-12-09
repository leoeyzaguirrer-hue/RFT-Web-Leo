// ============================================================
// LABORATORIO RFT · PLIANCE · TRACKING · AUGMENTING
// Control de modos, ensayos y preguntas finales
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // Utilidad: mostrar panel por id
  const panels = document.querySelectorAll(".lab-panel");

  const showPanel = (id) => {
    panels.forEach((p) => {
      p.classList.toggle("active", p.id === id);
    });
    const inner = document.querySelector(`#${id} .panel-inner`);
    if (inner) inner.scrollTop = 0;
  };

  // ------------------------------------------------------------
  // NAVEGACIÓN GENERAL
  // ------------------------------------------------------------

  const btnModoPliance = document.getElementById("btnModoPliance");
  const btnModoTracking = document.getElementById("btnModoTracking");
  const btnModoAugmenting = document.getElementById("btnModoAugmenting");

  const volverInicioPliance = document.getElementById("volverInicioPliance");
  const volverInicioTracking = document.getElementById("volverInicioTracking");
  const volverInicioAugmenting = document.getElementById("volverInicioAugmenting");

  if (btnModoPliance) {
    btnModoPliance.addEventListener("click", () => showPanel("panel-pliance"));
  }
  if (btnModoTracking) {
    btnModoTracking.addEventListener("click", () => showPanel("panel-tracking"));
  }
  if (btnModoAugmenting) {
    btnModoAugmenting.addEventListener("click", () => showPanel("panel-augmenting"));
  }

  if (volverInicioPliance) {
    volverInicioPliance.addEventListener("click", () => showPanel("panel-inicio"));
  }
  if (volverInicioTracking) {
    volverInicioTracking.addEventListener("click", () => showPanel("panel-inicio"));
  }
  if (volverInicioAugmenting) {
    volverInicioAugmenting.addEventListener("click", () => showPanel("panel-inicio"));
  }

  // Al inicio
  showPanel("panel-inicio");

  // ------------------------------------------------------------
  // MODO PLIANCE
  // ------------------------------------------------------------

  let plianceEnsayo = 1;
  let plianceObediencias = 0;

  const plianceEnsayoNum = document.getElementById("plianceEnsayoNum");
  const plianceObedienciasSpan = document.getElementById("plianceObediencias");
  const plianceMensajeInstructor = document.getElementById("plianceMensajeInstructor");
  const plianceContexto = document.getElementById("plianceContexto");
  const plianceAprobacion = document.getElementById("plianceAprobacion");
  const plianceResultadoReal = document.getElementById("plianceResultadoReal");
  const btnPlianceSiguiente = document.getElementById("btnPlianceSiguiente");
  const plianceMensajeFase = document.getElementById("plianceMensajeFase");
  const plianceCierre = document.getElementById("plianceCierre");
  const plianceFeedback = document.getElementById("plianceFeedback");
  const plianceTeoria = document.getElementById("plianceTeoria");

  const plianceCaminoBtns = document.querySelectorAll('#panel-pliance .camino-btn[data-camino]');

  const actualizarTextoPliancePorEnsayo = () => {
    if (!plianceEnsayoNum) return;
    plianceEnsayoNum.textContent = plianceEnsayo;

    // Determinar fase por rangos
    let fase;
    if (plianceEnsayo <= 2) fase = 1;
    else if (plianceEnsayo <= 4) fase = 2;
    else if (plianceEnsayo <= 6) fase = 3;
    else fase = 4;

    if (!plianceMensajeInstructor || !plianceContexto || !plianceMensajeFase) return;

    switch (fase) {
      case 1:
        plianceMensajeInstructor.textContent = "“Debes elegir el Camino B.”";
        plianceContexto.textContent =
          "Todavía no ves las recompensas reales. Solo sientes aprobación o desaprobación del instructor.";
        plianceMensajeFase.textContent =
          "Fase 1 · Se establece un historial básico de obediencia al Camino B.";
        break;
      case 2:
        plianceMensajeInstructor.textContent = "“Sigue eligiendo el Camino B.”";
        plianceContexto.textContent =
          "Ahora verás brevemente los resultados reales al final de cada ensayo.";
        plianceMensajeFase.textContent =
          "Fase 2 · A veces A da más puntos que B, pero la aprobación sigue ligada a obedecer.";
        break;
      case 3:
        plianceMensajeInstructor.textContent = "“Insisto: el Camino B es el que debes elegir.”";
        plianceContexto.textContent =
          "En esta fase, el Camino A da claramente mejores resultados, pero el instructor mantiene su orden.";
        plianceMensajeFase.textContent =
          "Fase 3 · El conflicto es abierto: la autoridad vs lo que realmente funciona.";
        break;
      case 4:
        plianceMensajeInstructor.textContent =
          "“Debes elegir el Camino B, aunque veas los resultados antes.”";
        plianceContexto.textContent =
          "Ahora verás las recompensas reales antes de elegir. Observa qué pesa más para ti.";
        plianceMensajeFase.textContent =
          "Fase 4 · Prueba final: si sigues obedeciendo, el control principal es social.";
        break;
    }

    // Limpiar mensajes de resultado/aprobación
    if (plianceAprobacion) plianceAprobacion.textContent = "";
    if (plianceResultadoReal) plianceResultadoReal.textContent = "";
    if (btnPlianceSiguiente) btnPlianceSiguiente.disabled = true;

    // Habilitar botones de caminos
    plianceCaminoBtns.forEach((btn) => (btn.disabled = false));
  };

  const manejarClickCaminoPliance = (camino) => {
    if (!plianceAprobacion || !plianceResultadoReal) return;

    // Todos los ensayos: aprobación solo por elegir B
    const obedece = camino === "B";
    if (obedece) {
      plianceObediencias++;
      if (plianceObedienciasSpan) {
        plianceObedienciasSpan.textContent = plianceObediencias;
      }
    }

    // Determinar fase
    let fase;
    if (plianceEnsayo <= 2) fase = 1;
    else if (plianceEnsayo <= 4) fase = 2;
    else if (plianceEnsayo <= 6) fase = 3;
    else fase = 4;

    // Mensaje de aprobación
    plianceAprobacion.innerHTML = obedece
      ? '<span class="icon">✔️</span> Aprobación social: “Bien, hiciste lo que te dije.”'
      : '<span class="icon">❌</span> Desaprobación: “Te desviaste de la regla.”';

    // Mensaje de resultados reales según fase
    switch (fase) {
      case 1:
        plianceResultadoReal.textContent =
          "Por ahora, los resultados reales están ocultos: solo importa la reacción del instructor.";
        break;
      case 2:
        plianceResultadoReal.textContent =
          "En este ensayo, el Camino A dio más puntos reales que B, pero la aprobación siguió ligada a obedecer la orden.";
        break;
      case 3:
        plianceResultadoReal.textContent =
          "Aquí, el Camino A te habría dado claramente muchos más puntos que B. Sin embargo, la aprobación sigue condicionada a obedecer.";
        break;
      case 4:
        plianceResultadoReal.textContent =
          "Has visto las recompensas reales antes de elegir. Si sigues eligiendo B, lo haces principalmente por la respuesta del instructor.";
        break;
    }

    // Desactivar caminos hasta pasar al siguiente ensayo
    plianceCaminoBtns.forEach((btn) => (btn.disabled = true));
    if (btnPlianceSiguiente) btnPlianceSiguiente.disabled = false;
  };

  plianceCaminoBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const camino = btn.dataset.camino;
      manejarClickCaminoPliance(camino);
    });
  });

  if (btnPlianceSiguiente) {
    btnPlianceSiguiente.addEventListener("click", () => {
      if (plianceEnsayo < 8) {
        plianceEnsayo++;
        actualizarTextoPliancePorEnsayo();
      } else {
        // Terminar Pliance, mostrar cierre
        if (plianceCierre) plianceCierre.style.display = "block";
        const inner = document.querySelector("#panel-pliance .panel-inner");
        if (inner) inner.scrollTop = inner.scrollHeight;
        if (btnPlianceSiguiente) btnPlianceSiguiente.disabled = true;
        plianceCaminoBtns.forEach((btn) => (btn.disabled = true));
      }
    });
  }

  // Pregunta final Pliance
  const plianceOptions = document.querySelectorAll("#plianceCierre .question-option");
  plianceOptions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const esCorrecta = btn.dataset.correct === "true";
      plianceOptions.forEach((b) => b.classList.remove("correct", "incorrect"));
      if (esCorrecta) {
        btn.classList.add("correct");
        if (plianceFeedback) {
          plianceFeedback.textContent =
            "Exacto: en pliance la conducta se guía por aprobación o desaprobación social.";
        }
        if (plianceTeoria) plianceTeoria.style.display = "block";
      } else {
        btn.classList.add("incorrect");
        if (plianceFeedback) {
          plianceFeedback.textContent =
            "Observa que el instructor controlaba tu elección aunque no siempre fuera el mejor camino en el mundo real.";
        }
      }
    });
  });

  // Inicializar Pliance
  if (plianceEnsayoNum) {
    actualizarTextoPliancePorEnsayo();
  }

  // ------------------------------------------------------------
  // MODO TRACKING
  // ------------------------------------------------------------

  let trackingEnsayo = 1;
  let trackingPuntos = 0;

  const trackingEnsayoNum = document.getElementById("trackingEnsayoNum");
  const trackingPuntosSpan = document.getElementById("trackingPuntos");
  const trackingMensajeAmbiente = document.getElementById("trackingMensajeAmbiente");
  const trackingReglaVisible = document.getElementById("trackingReglaVisible");
  const trackingResultado = document.getElementById("trackingResultado");
  const btnTrackingSiguiente = document.getElementById("btnTrackingSiguiente");
  const trackingMensajeFase = document.getElementById("trackingMensajeFase");

  const trackingCaminoBtns = document.querySelectorAll(
    '#panel-tracking .camino-btn[data-modo="tracking"]'
  );

  const actualizarTextoTracking = () => {
    if (!trackingEnsayoNum) return;
    trackingEnsayoNum.textContent = trackingEnsayo;
    if (trackingPuntosSpan) trackingPuntosSpan.textContent = trackingPuntos;

    if (!trackingMensajeAmbiente || !trackingReglaVisible || !trackingMensajeFase) return;

    let fase;
    if (trackingEnsayo <= 2) fase = 1;
    else if (trackingEnsayo <= 4) fase = 2;
    else if (trackingEnsayo <= 6) fase = 3;
    else fase = 4;

    switch (fase) {
      case 1:
        trackingMensajeAmbiente.textContent =
          "No hay reglas explícitas. Explora libremente las opciones y observa los puntos que recibes.";
        trackingReglaVisible.textContent =
          "Fase 1 · Solo muestreo de contingencias: tu tarea es ver qué suele ocurrir con cada camino.";
        trackingMensajeFase.textContent =
          "Fase 1 · Exploras las contingencias sin reglas dadas.";
        break;
      case 2:
        trackingMensajeAmbiente.textContent =
          "Ahora aparece una regla descriptiva sobre el ambiente.";
        trackingReglaVisible.textContent =
          "Regla: “Hasta ahora, el Camino C suele dar mejores resultados.”";
        trackingMensajeFase.textContent =
          "Fase 2 · La regla describe el patrón real: observa si ajustas tu conducta.";
        break;
      case 3:
        trackingMensajeAmbiente.textContent =
          "Aparecen excepciones: a veces C no será el mejor camino.";
        trackingReglaVisible.textContent =
          "El ambiente cambia: el Camino B puede dar más puntos en algunos ensayos.";
        trackingMensajeFase.textContent =
          "Fase 3 · Se prueba tu flexibilidad para ajustar la regla a la evidencia.";
        break;
      case 4:
        trackingMensajeAmbiente.textContent =
          "El patrón vuelve a estabilizarse: C tiende a ser el mejor camino otra vez.";
        trackingReglaVisible.textContent =
          "Observa si mantienes una relación flexible con la regla y con las contingencias.";
        trackingMensajeFase.textContent =
          "Fase 4 · Se consolida el aprendizaje por correspondencia con el ambiente.";
        break;
    }

    if (trackingResultado) trackingResultado.textContent = "";
    if (btnTrackingSiguiente) btnTrackingSiguiente.disabled = true;
    trackingCaminoBtns.forEach((btn) => (btn.disabled = false));
  };

  const manejarClickCaminoTracking = (camino) => {
    if (!trackingResultado) return;

    let fase;
    if (trackingEnsayo <= 2) fase = 1;
    else if (trackingEnsayo <= 4) fase = 2;
    else if (trackingEnsayo <= 6) fase = 3;
    else fase = 4;

    let puntosObtenidos = 0;
    let descripcion = "";

    switch (fase) {
      case 1:
        // Exploración: A bajo, B variable, C alto (promedio)
        if (camino === "A") {
          puntosObtenidos = 1;
          descripcion = "Camino A dio pocos puntos en este ensayo.";
        } else if (camino === "B") {
          puntosObtenidos = 2;
          descripcion = "Camino B dio un resultado intermedio.";
        } else {
          puntosObtenidos = 4;
          descripcion = "Camino C dio más puntos en este ensayo.";
        }
        break;
      case 2:
        // Regla: C suele ser mejor
        if (camino === "C") {
          puntosObtenidos = 4;
          descripcion = "Elegiste C: el patrón se confirma, obtuviste más puntos.";
        } else if (camino === "B") {
          puntosObtenidos = 2;
          descripcion =
            "Elegiste B: obtuviste menos puntos que si hubieras seguido la regla descriptiva.";
        } else {
          puntosObtenidos = 1;
          descripcion = "Elegiste A: sigue siendo el camino menos ventajoso.";
        }
        break;
      case 3:
        // Excepciones: una vez B da más
        if (camino === "C") {
          puntosObtenidos = 1;
          descripcion =
            "Esta vez C dio pocos puntos: el ambiente no siempre sigue exactamente la regla.";
        } else if (camino === "B") {
          puntosObtenidos = 4;
          descripcion =
            "Aquí B dio más puntos: una excepción real a la regla general sobre C.";
        } else {
          puntosObtenidos = 2;
          descripcion = "A dio un resultado intermedio.";
        }
        break;
      case 4:
        // Se reestabiliza: C vuelve a ser mejor
        if (camino === "C") {
          puntosObtenidos = 4;
          descripcion =
            "C vuelve a ser el mejor camino: la regla general vuelve a ajustarse al ambiente.";
        } else if (camino === "B") {
          puntosObtenidos = 2;
          descripcion = "B dio un resultado intermedio.";
        } else {
          puntosObtenidos = 1;
          descripcion = "A dio el resultado más bajo.";
        }
        break;
    }

    trackingPuntos += puntosObtenidos;
    if (trackingPuntosSpan) trackingPuntosSpan.textContent = trackingPuntos;

    trackingResultado.textContent =
      descripcion + " Has obtenido " + puntosObtenidos + " puntos en este ensayo.";

    trackingCaminoBtns.forEach((btn) => (btn.disabled = true));
    if (btnTrackingSiguiente) btnTrackingSiguiente.disabled = false;
  };

  trackingCaminoBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const camino = btn.dataset.camino;
      manejarClickCaminoTracking(camino);
    });
  });

  if (btnTrackingSiguiente) {
    btnTrackingSiguiente.addEventListener("click", () => {
      if (trackingEnsayo < 8) {
        trackingEnsayo++;
        actualizarTextoTracking();
      } else {
        const trackingCierre = document.getElementById("trackingCierre");
        if (trackingCierre) trackingCierre.style.display = "block";
        const inner = document.querySelector("#panel-tracking .panel-inner");
        if (inner) inner.scrollTop = inner.scrollHeight;
        trackingCaminoBtns.forEach((btn) => (btn.disabled = true));
        btnTrackingSiguiente.disabled = true;
      }
    });
  }

  const trackingOptions = document.querySelectorAll("#trackingCierre .question-option");
  const trackingFeedback = document.getElementById("trackingFeedback");
  const trackingTeoria = document.getElementById("trackingTeoria");

  trackingOptions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const esCorrecta = btn.dataset.correct === "true";
      trackingOptions.forEach((b) => b.classList.remove("correct", "incorrect"));
      if (esCorrecta) {
        btn.classList.add("correct");
        if (trackingFeedback) {
          trackingFeedback.textContent =
            "Correcto: en tracking, la conducta se guía por lo que realmente funciona en el ambiente.";
        }
        if (trackingTeoria) trackingTeoria.style.display = "block";
      } else {
        btn.classList.add("incorrect");
        if (trackingFeedback) {
          trackingFeedback.textContent =
            "Piensa en cómo fuiste ajustando tus elecciones según los puntos obtenidos, no según una autoridad.";
        }
      }
    });
  });

  if (trackingEnsayoNum) {
    actualizarTextoTracking();
  }

  // ------------------------------------------------------------
  // MODO AUGMENTING
  // ------------------------------------------------------------

  let augmentingEnsayo = 1;
  let augmentingPuntos = 0;
  let valorActivado = false; // se activa en fase 2 en adelante

  const augmentingEnsayoNum = document.getElementById("augmentingEnsayoNum");
  const augmentingPuntosSpan = document.getElementById("augmentingPuntos");
  const augmentingMensaje = document.getElementById("augmentingMensaje");
  const augmentingValorVisible = document.getElementById("augmentingValorVisible");
  const augmentingResultado = document.getElementById("augmentingResultado");
  const btnAugmentingSiguiente = document.getElementById("btnAugmentingSiguiente");
  const augmentingMensajeFase = document.getElementById("augmentingMensajeFase");

  const augmentingCaminoBtns = document.querySelectorAll(
    '#panel-augmenting .camino-btn[data-modo="augmenting"]'
  );

  const actualizarTextoAugmenting = () => {
    if (!augmentingEnsayoNum) return;
    augmentingEnsayoNum.textContent = augmentingEnsayo;
    if (augmentingPuntosSpan) augmentingPuntosSpan.textContent = augmentingPuntos;

    if (!augmentingMensaje || !augmentingValorVisible || !augmentingMensajeFase) return;

    let fase;
    if (augmentingEnsayo <= 2) fase = 1;
    else if (augmentingEnsayo <= 4) fase = 2;
    else if (augmentingEnsayo <= 6) fase = 3;
    else fase = 4;

    switch (fase) {
      case 1:
        valorActivado = false;
        augmentingMensaje.textContent =
          "Los tres caminos dan recompensas objetivas similares. No hay todavía un sentido especial asociado a ninguno.";
        augmentingValorVisible.textContent =
          "Fase 1 · Línea base: eliges principalmente por curiosidad o azar.";
        augmentingMensajeFase.textContent =
          "Fase 1 · No hay un valor diferenciado: observa cómo eliges cuando todo parece equivalente.";
        break;
      case 2:
        valorActivado = true;
        augmentingMensaje.textContent =
          "Aparece una regla de valor: “Si eliges el Camino A, ayudas a alguien importante para ti.”";
        augmentingValorVisible.textContent =
          "Esta regla no cambia los puntos, pero cambia el sentido que A puede tener para ti.";
        augmentingMensajeFase.textContent =
          "Fase 2 · Observa si comienzas a elegir A por su significado, aunque no dé más puntos.";
        break;
      case 3:
        valorActivado = true;
        augmentingMensaje.textContent =
          "Ahora el Camino A mantiene su valor, pero puede dar menos puntos que otros.";
        augmentingValorVisible.textContent =
          "Se introduce un costo: seguir el valor puede implicar menor recompensa inmediata.";
        augmentingMensajeFase.textContent =
          "Fase 3 · Se prueba si el valor se mantiene incluso cuando el costo aumenta.";
        break;
      case 4:
        valorActivado = true;
        augmentingMensaje.textContent =
          "Las diferencias objetivas entre caminos son máximas. El Camino A sigue siendo el valioso.";
        augmentingValorVisible.textContent =
          "Aquí se ve con máxima claridad: elegir por valor vs elegir solo por puntos.";
        augmentingMensajeFase.textContent =
          "Fase 4 · Observa qué pesa más para tu conducta: el valor o la ganancia inmediata.";
        break;
    }

    if (augmentingResultado) augmentingResultado.textContent = "";
    if (btnAugmentingSiguiente) btnAugmentingSiguiente.disabled = true;
    augmentingCaminoBtns.forEach((btn) => (btn.disabled = false));
  };

  const manejarClickCaminoAugmenting = (camino) => {
    if (!augmentingResultado) return;

    let fase;
    if (augmentingEnsayo <= 2) fase = 1;
    else if (augmentingEnsayo <= 4) fase = 2;
    else if (augmentingEnsayo <= 6) fase = 3;
    else fase = 4;

    let puntosObtenidos = 0;
    let descripcion = "";
    let valorTexto = "";

    switch (fase) {
      case 1:
        // Igualdad aproximada
        puntosObtenidos = 2;
        descripcion = "En esta línea base, todos los caminos dan puntos similares.";
        break;
      case 2:
        // Todos dan mismo puntaje, A tiene valor
        puntosObtenidos = 2;
        descripcion = "Todos los caminos siguen dando los mismos puntos.";
        if (camino === "A") {
          valorTexto = "Has elegido A, el camino que “ayuda a alguien importante para ti”.";
        } else {
          valorTexto =
            "Has elegido un camino sin valor especial, aunque la regla te presentó A como significativo.";
        }
        break;
      case 3:
        // A da menos puntos, pero tiene valor
        if (camino === "A") {
          puntosObtenidos = 1;
          descripcion = "El Camino A da menos puntos en este ensayo.";
          valorTexto = "Sin embargo, sigue siendo el camino con sentido valioso.";
        } else if (camino === "C") {
          puntosObtenidos = 4;
          descripcion = "El Camino C da muchos puntos, pero no tiene valor emocional asociado.";
        } else {
          puntosObtenidos = 2;
          descripcion = "El Camino B da un resultado intermedio.";
        }
        break;
      case 4:
        // Diferencia máxima
        if (camino === "A") {
          puntosObtenidos = 1;
          descripcion =
            "El Camino A vuelve a dar menos puntos que el resto en este ensayo.";
          valorTexto =
            "Aun así, sigues eligiendo el camino que conecta con algo importante para ti.";
        } else if (camino === "C") {
          puntosObtenidos = 5;
          descripcion = "El Camino C da la mayor cantidad de puntos.";
          valorTexto =
            "Elegir C maximiza la ganancia inmediata, pero deja de lado el camino valioso (A).";
        } else {
          puntosObtenidos = 2;
          descripcion = "El Camino B da un resultado moderado.";
        }
        break;
    }

    augmentingPuntos += puntosObtenidos;
    if (augmentingPuntosSpan) augmentingPuntosSpan.textContent = augmentingPuntos;

    augmentingResultado.textContent =
      descripcion +
      " Has obtenido " +
      puntosObtenidos +
      " puntos en este ensayo." +
      (valorTexto ? " " + valorTexto : "");

    augmentingCaminoBtns.forEach((btn) => (btn.disabled = true));
    if (btnAugmentingSiguiente) btnAugmentingSiguiente.disabled = false;
  };

  augmentingCaminoBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const camino = btn.dataset.camino;
      manejarClickCaminoAugmenting(camino);
    });
  });

  if (btnAugmentingSiguiente) {
    btnAugmentingSiguiente.addEventListener("click", () => {
      if (augmentingEnsayo < 8) {
        augmentingEnsayo++;
        actualizarTextoAugmenting();
      } else {
        const augmentingCierre = document.getElementById("augmentingCierre");
        if (augmentingCierre) augmentingCierre.style.display = "block";
        const inner = document.querySelector("#panel-augmenting .panel-inner");
        if (inner) inner.scrollTop = inner.scrollHeight;
        augmentingCaminoBtns.forEach((btn) => (btn.disabled = true));
        btnAugmentingSiguiente.disabled = true;
      }
    });
  }

  const augmentingOptions = document.querySelectorAll("#augmentingCierre .question-option");
  const augmentingFeedback = document.getElementById("augmentingFeedback");
  const augmentingTeoria = document.getElementById("augmentingTeoria");

  augmentingOptions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const esCorrecta = btn.dataset.correct === "true";
      augmentingOptions.forEach((b) => b.classList.remove("correct", "incorrect"));
      if (esCorrecta) {
        btn.classList.add("correct");
        if (augmentingFeedback) {
          augmentingFeedback.textContent =
            "Correcto: en augmenting la conducta se mantiene por el valor que adquieren ciertas consecuencias, aun con costo.";
        }
        if (augmentingTeoria) augmentingTeoria.style.display = "block";
      } else {
        btn.classList.add("incorrect");
        if (augmentingFeedback) {
          augmentingFeedback.textContent =
            "Piensa en los ensayos donde elegiste el camino valioso aunque diera menos puntos.";
        }
      }
    });
  });

  if (augmentingEnsayoNum) {
    actualizarTextoAugmenting();
  }
});
