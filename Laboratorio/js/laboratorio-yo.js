// ===============================
// UTILIDAD: CAMBIO DE FASE
// ===============================
const fases = Array.from(document.querySelectorAll(".fase"));
const faseLabel = document.getElementById("faseLabel");
const faseProgress = document.getElementById("faseProgress");
const yoContainer = document.getElementById("yoContainer");

let faseActual = 1;

function actualizarIndicador()() {
  const etiquetas = {
    1: "Fase 1 · Yo–Tú",
    2: "Fase 2 · Construcción del punto Yo",
    3: "Fase 3 · Perspectiva espacial aquí–allá",
    4: "Fase 4 · Yo a través del tiempo",
    5: "Fase 5 · Selfing sano vs problemático",
    6: "Fase 6 · Integración final"
  };
  faseLabel.textContent = etiquetas[faseActual] || `Fase ${faseActual}`;
  faseProgress.textContent = `${faseActual} / 6`;
}

function irAFase(n) {
  faseActual = n;
  fases.forEach((f, idx) => {
    f.classList.toggle("activa", idx === n - 1);
  });
  actualizarIndicador();
}

// ===============================
// CONTROL DE NIVEL DEL YO
// ===============================
let nivelYo = 0; // 0 a 3

function subirNivelYo(pasos = 1) {
  nivelYo = Math.min(3, nivelYo + pasos);
  yoContainer.classList.remove("nivel-0", "nivel-1", "nivel-2", "nivel-3");
  yoContainer.classList.add(`nivel-${nivelYo}`);
  // pequeño pulso
  yoContainer.style.transform = "translateY(-3px) scale(1.02)";
  setTimeout(() => {
    yoContainer.style.transform = nivelYo === 3 ? "translateY(-4px)" : "translateY(0)";
  }, 180);
}

// ===============================
// FASE 1 · DRAG & DROP
// ===============================
(function fase1DragDrop() {
  const dragMiedo = document.getElementById("dragMiedo");
  const dropTargets = document.querySelectorAll(".drop-target");
  const feedback = document.getElementById("fase1Feedback");
  const btnNext = document.getElementById("btnFase1Next");

  if (!dragMiedo) return;

  dragMiedo.addEventListener("dragstart", (e) => {
    dragMiedo.classList.add("dragging");
    e.dataTransfer.setData("text/plain", dragMiedo.id);
  });

  dragMiedo.addEventListener("dragend", () => {
    dragMiedo.classList.remove("dragging");
  });

  dropTargets.forEach((target) => {
    target.addEventListener("dragover", (e) => {
      e.preventDefault();
      target.classList.add("over");
    });
    target.addEventListener("dragleave", () => {
      target.classList.remove("over");
    });
    target.addEventListener("drop", (e) => {
      e.preventDefault();
      target.classList.remove("over");

      const role = target.getAttribute("data-role");
      if (role === "yo") {
        feedback.textContent =
          "Correcto: el miedo es tu experiencia. El yo es quién la vive, no la emoción misma.";
        feedback.style.color = "#22724a";
        dragMiedo.style.opacity = "0.3";
        dragMiedo.setAttribute("draggable", "false");
        btnNext.disabled = false;
        subirNivelYo(1);
      } else {
        feedback.textContent =
          "En este ejemplo, la frase describe tu experiencia, no la de otra persona. Vuelve a intentarlo.";
        feedback.style.color = "#9b1d1d";
      }
    });
  });

  // Botón continuar a fase 2
  btnNext.addEventListener("click", () => {
    irAFase(2);
  });
})();

// ===============================
// FASE 2 · PREGUNTAS DEÍCTICAS
// ===============================
const preguntas = [
  { pregunta: "¿Quién eres?", respuesta: "Yo soy el que está dentro de este contenedor." },
  { pregunta: "¿Quién soy yo (la figura que pregunta)?", respuesta: "Tú eres la otra persona, fuera de mí." },
  { pregunta: "¿Dónde estás ahora?", respuesta: "Estoy aquí." },
  { pregunta: "¿Dónde estoy yo (la otra persona)?", respuesta: "Tú estás allá." },
  { pregunta: "¿Qué día es hoy para ti?", respuesta: "Hoy es el momento presente: ahora." },
  { pregunta: "¿Qué día fue ayer para ti?", respuesta: "Ayer fue antes; ya pasó." },
  { pregunta: "¿Dónde estabas ayer?", respuesta: "Ayer estaba en otro lugar, pero seguía siendo yo." },
  { pregunta: "¿Quién eres ahora, después de todo esto?", respuesta: "Sigo siendo yo, aunque cambien el tiempo y las experiencias." }
];

(function fase2Preguntas() {
  const preguntaTexto = document.getElementById("preguntaTexto");
  const respuestaTexto = document.getElementById("respuestaTexto");
  const btnResponder = document.getElementById("btnResponder");
  const feedback = document.getElementById("fase2Feedback");
  const contadorPregunta = document.getElementById("contadorPregunta");
  const totalPreguntas = document.getElementById("totalPreguntas");
  const btnNext = document.getElementById("btnFase2Next");

  if (!preguntaTexto) return;

  let indice = 0;
  totalPreguntas.textContent = preguntas.length.toString();
  actualizarPregunta();

  function actualizarPregunta() {
    const p = preguntas[indice];
    preguntaTexto.textContent = p.pregunta;
    respuestaTexto.textContent = "(Pulsa “Responder” para ver la respuesta)";
    feedback.textContent = "";
    contadorPregunta.textContent = (indice + 1).toString();
  }

  btnResponder.addEventListener("click", () => {
    const p = preguntas[indice];
    respuestaTexto.textContent = p.respuesta;
    feedback.textContent = "Esta respuesta estabiliza el punto “yo” como lugar de observación.";
    feedback.style.color = "#22724a";

    // Subir nivel de yo progresivamente
    if (indice === 1 || indice === 3) {
      subirNivelYo(1);
    } else if (indice === 6) {
      subirNivelYo(1);
    }

    setTimeout(() => {
      indice++;
      if (indice < preguntas.length) {
        actualizarPregunta();
      } else {
        feedback.textContent =
          "Has completado la secuencia: el punto Yo quedó definido como posición estable en persona, espacio y tiempo.";
        btnNext.disabled = false;
      }
    }, 900);
  });

  btnNext.addEventListener("click", () => {
    irAFase(3);
  });
})();

// ===============================
// FASE 3 · AQUÍ–ALLÁ
// ===============================
(function fase3AquiAlla() {
  const opciones = document.querySelectorAll("#fase3 .btn-opcion");
  const feedback = document.getElementById("fase3Feedback");
  const btnNext = document.getElementById("btnFase3Next");

  if (!feedback) return;

  opciones.forEach((btn) => {
    btn.addEventListener("click", () => {
      const correcta = btn.getAttribute("data-correcta") === "true";
      opciones.forEach((b) => b.classList.remove("correcta", "incorrecta"));
      btn.classList.add(correcta ? "correcta" : "incorrecta");

      if (correcta) {
        feedback.textContent =
          "Exacto: el yo se ubica como el que está aquí, diferenciado de la otra persona que está allá.";
        feedback.style.color = "#22724a";
        btnNext.disabled = false;
      } else {
        feedback.textContent =
          "En el marco deíctico, “aquí” marca tu posición y “allá” la de la otra persona. Vuelve a intentarlo.";
        feedback.style.color = "#9b1d1d";
      }
    });
  });

  btnNext.addEventListener("click", () => {
    irAFase(4);
  });
})();

// ===============================
// FASE 4 · AHORA–ANTES
// ===============================
(function fase4Tiempo() {
  const opciones = document.querySelectorAll("#fase4 .timeline-opcion");
  const btnVerificar = document.getElementById("btnVerificarTimeline");
  const feedback = document.getElementById("fase4Feedback");
  const btnNext = document.getElementById("btnFase4Next");

  if (!btnVerificar) return;

  let seleccionAntes = null;
  let seleccionAhora = null;

  opciones.forEach((op) => {
    op.addEventListener("click", () => {
      const texto = op.textContent || "";
      if (texto.includes("Ayer")) {
        // asignar a antes
        opciones.forEach((o) => o.classList.remove("seleccionada-antes"));
        op.classList.add("seleccionada-antes");
        seleccionAntes = op;
      } else {
        opciones.forEach((o) => o.classList.remove("seleccionada-ahora"));
        op.classList.add("seleccionada-ahora");
        seleccionAhora = op;
      }
    });
  });

  btnVerificar.addEventListener("click", () => {
    if (!seleccionAntes || !seleccionAhora) {
      feedback.textContent = "Primero asigna cada frase a ANTES o AHORA.";
      feedback.style.color = "#9b1d1d";
      return;
    }

    const okAntes = seleccionAntes.getAttribute("data-tiempo-correcto") === "antes";
    const okAhora = seleccionAhora.getAttribute("data-tiempo-correcto") === "ahora";

    if (okAntes && okAhora) {
      feedback.textContent =
        "Correcto: el miedo pertenece a antes; el yo que observa sigue aquí aho
