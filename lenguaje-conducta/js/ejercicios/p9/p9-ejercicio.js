// ============================================================
// P9 · LABORATORIO DE TACTS EXPANDIBLES
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  const contEj = document.querySelector(".p9-ejercicio-container");
  if (!contEj) return; // seguridad

  // ------------------ Elementos base ------------------

  const historiaNivel = document.querySelector(".p9-historia-nivel");

  const fase1 = document.querySelector(".p9-fase-1");
  const fase2 = document.querySelector(".p9-fase-2");
  const fase3 = document.querySelector(".p9-fase-3");

  const objetoNombre = document.querySelector(".p9-objeto-nombre");
  const dropZona = document.querySelector(".p9-drop-zona");
  const etiqueta = document.querySelector(".p9-etiqueta");
  const fbF1 = document.querySelector(".p9-feedback-f1");

  const gridF2 = document.querySelector(".p9-sillas-grid");
  const btnEvalF2 = document.querySelector(".p9-btn-evaluar-f2");
  const fbF2 = document.querySelector(".p9-feedback-f2");

  const promptContexto = document.querySelector(".p9-prompt-contexto");
  const btnNuevaConsigna = document.querySelector(".p9-btn-nueva-consigna");
  const gridContexto = document.querySelector(".p9-sillas-contexto");
  const fbF3 = document.querySelector(".p9-feedback-f3");
  const msgFinal = document.querySelector(".p9-mensaje-final");

  const btnReset = document.querySelector(".p9-btn-reset");

  // ------------------ Datos ------------------

  const fase1Items = [
    { desc: "Silla simple de madera", esSilla: true },
    { desc: "Banquito sin respaldo", esSilla: false },
    { desc: "Sillón grande de living", esSilla: false }
  ];

  let indiceF1 = 0;

  const sillas = [
    { id: "examen",    texto: "Silla plástica del aula de exámenes", esSilla: true,  tags: ["examen"] },
    { id: "escritorio",texto: "Silla acolchada de escritorio",        esSilla: true,  tags: ["escritorio","comoda"] },
    { id: "vieja",     texto: "Silla de madera vieja",                esSilla: true,  tags: ["vieja"] },
    { id: "roja",      texto: "Silla roja del comedor",               esSilla: true,  tags: [] },
    { id: "metal",     texto: "Silla metálica del laboratorio",       esSilla: true,  tags: [] },
    { id: "banquito",  texto: "Banquito sin respaldo",                esSilla: false, tags: [] },
    { id: "taburete",  texto: "Taburete alto de bar",                 esSilla: false, tags: [] },
    { id: "sofa",      texto: "Sofá grande de la sala",               esSilla: false, tags: [] }
  ];

  const contextos = [
    { id: "examen",    prompt: "Selecciona la silla del examen.",    target: "examen" },
    { id: "comoda",    prompt: "Selecciona la silla cómoda.",        target: "escritorio" },
    { id: "vieja",     prompt: "Selecciona la silla vieja.",         target: "vieja" },
    { id: "escritorio",prompt: "Selecciona la silla del escritorio.",target: "escritorio" }
  ];

  let contextoActual = null;
  let aciertosF3 = 0;

  // ====================================================
  // FASE 1 · NOMBRAR BÁSICO
  // ====================================================

  function cargarFase1() {
    const item = fase1Items[indiceF1];
    objetoNombre.textContent = item.desc;
    fbF1.textContent = "";
    dropZona.classList.remove("p9-drop-ok", "p9-drop-error");
  }

  // Drag & drop de etiqueta "silla"
  etiqueta.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", "silla");
  });

  dropZona.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  dropZona.addEventListener("drop", (e) => {
    e.preventDefault();
    manejarDropF1();
  });

  function manejarDropF1() {
    const actual = fase1Items[indiceF1];

    if (actual.esSilla) {
      fbF1.textContent = "Correcto: tu tacto se expande a nuevas topografías.";
      fbF1.style.color = "#2a7c4f";
      dropZona.classList.add("p9-drop-ok");
      dropZona.classList.remove("p9-drop-error");
      avanzarFase1();
    } else {
      fbF1.textContent = "Esa topografía no coincide con tu historia de reforzamiento de 'silla'.";
      fbF1.style.color = "#b83232";
      dropZona.classList.add("p9-drop-error");
      dropZona.classList.remove("p9-drop-ok");
    }
  }

  function avanzarFase1() {
    indiceF1++;
    if (indiceF1 < fase1Items.length) {
      setTimeout(cargarFase1, 900);
    } else {
      // Subimos historia de reforzamiento simbólicamente
      historiaNivel.textContent = "Media";
      historiaNivel.style.color = "#d47a00";

      // Pasar a Fase 2
      fase2.style.display = "block";
      cargarFase2();
    }
  }

  cargarFase1();

  // ====================================================
  // FASE 2 · MÚLTIPLES EJEMPLARES
  // ====================================================

  function cargarFase2() {
    gridF2.innerHTML = "";
    fbF2.textContent = "";

    sillas.forEach((s) => {
      const card = document.createElement("div");
      card.classList.add("p9-silla-card");
      card.textContent = s.texto;
      card.dataset.id = s.id;
      card.addEventListener("click", () => {
        card.classList.toggle("p9-seleccionada");
      });
      gridF2.appendChild(card);
    });
  }

  btnEvalF2.addEventListener("click", () => {
    const seleccionadas = Array.from(
      document.querySelectorAll(".p9-silla-card.p9-seleccionada")
    ).map((c) => c.dataset.id);

    const idsSillas = sillas.filter((s) => s.esSilla).map((s) => s.id);

    const incorrectas = seleccionadas.filter(
      (id) => !idsSillas.includes(id)
    );
    const omitidas = idsSillas.filter((id) => !seleccionadas.includes(id));

    if (incorrectas.length === 0 && omitidas.length === 0) {
      fbF2.textContent =
        "Correcto: tu clase funcional de 'silla' se ha expandido mediante múltiples ejemplares.";
      fbF2.style.color = "#2a7c4f";

      historiaNivel.textContent = "Alta";
      historiaNivel.style.color = "#2a7c4f";

      // Habilitar Fase 3
      fase3.style.display = "block";
      cargarFase3();
    } else {
      fbF2.textContent =
        "Tu selección aún no coincide con la clase funcional completa. Observa qué ejemplares comparten función, no solo forma.";
      fbF2.style.color = "#b83232";
    }
  });

  // ====================================================
  // FASE 3 · CONTEXTUALIZACIÓN
  // ====================================================

  function cargarFase3() {
    gridContexto.innerHTML = "";
    fbF3.textContent = "";
    aciertosF3 = 0;

    // Mostrar solo las sillas verdaderas como opciones de contexto
    sillas.filter((s) => s.esSilla).forEach((s) => {
      const card = document.createElement("div");
      card.classList.add("p9-silla-contexto");
      card.textContent = s.texto;
      card.dataset.id = s.id;
      card.addEventListener("click", () => manejarClickContexto(card));
      gridContexto.appendChild(card);
    });
  }

  function nuevaConsigna() {
    fbF3.textContent = "";
    contextoActual =
      contextos[Math.floor(Math.random() * contextos.length)];
    promptContexto.textContent = contextoActual.prompt;
  }

  btnNuevaConsigna.addEventListener("click", () => {
    nuevaConsigna();
  });

  function manejarClickContexto(card) {
    if (!contextoActual) {
      fbF3.textContent = "Primero pide una consigna contextual.";
      fbF3.style.color = "#b83232";
      return;
    }

    const id = card.dataset.id;

    if (id === contextoActual.target) {
      fbF3.textContent =
        "Correcto: respondes a la relación contextual (examen, cómoda, vieja, escritorio).";
      fbF3.style.color = "#2a7c4f";
      aciertosF3++;

      if (aciertosF3 >= 2) {
        msgFinal.textContent =
          "Has visto cómo nombrar construye clases funcionales y cómo el contexto (examen, comodidad, historia) transforma qué 'silla' es relevante. Nombrar es acción social, no simple etiquetado mental.";
      } else {
        setTimeout(nuevaConsigna, 900);
      }

    } else {
      fbF3.textContent =
        "Esa opción no encaja con la relación contextual solicitada. Observa la función, no solo la topografía.";
      fbF3.style.color = "#b83232";
    }
  }

  // ====================================================
  // REINICIAR TODO
  // ====================================================

  btnReset.addEventListener("click", () => {
    indiceF1 = 0;
    aciertosF3 = 0;
    historiaNivel.textContent = "Baja";
    historiaNivel.style.color = "#b85c00";

    fase2.style.display = "none";
    fase3.style.display = "none";

    contextos.actual = null;
    promptContexto.textContent =
      "Haz clic en “Nueva consigna” para recibir una situación contextual.";
    fbF1.textContent = "";
    fbF2.textContent = "";
    fbF3.textContent = "";
    msgFinal.textContent = "";

    cargarFase1();
    cargarFase2();
  });

});
