// ============================================================
// P15 · TRADUCTOR DE ZUG A LA VIDA REAL
// ============================================================
document.addEventListener("DOMContentLoaded", () => {

  const casos = [
    {
      simbolo: "ZUG",
      mundoId: "marca",
      funcionId: "orgullo",
      tipo: "derivada",
      explicacionMundo:
        "ZUG funciona como una marca: un símbolo gráfico que, tras muchos emparejamientos, evoca estatus, pertenencia o rechazo.",
      explicacionFuncion:
        "Muchas marcas activan orgullo o estatus cuando se asocian a éxito, pertenencia o prestigio social.",
      explicacionTipo:
        "La reacción no viene del logo en sí, sino de la historia de emparejamientos verbales. Es una reacción derivada."
    },
    {
      simbolo: "MIP",
      mundoId: "fracaso",
      funcionId: "verguenza",
      tipo: "derivada",
      explicacionMundo:
        "MIP se parece funcionalmente a la etiqueta “FRACASO”: una palabra que resume muchas experiencias de evaluación negativa.",
      explicacionFuncion:
        "“FRACASO” suele evocar vergüenza y retraimiento, más allá de la situación concreta.",
      explicacionTipo:
        "Lo que duele no es el estímulo físico, sino la red de historias y reglas asociadas a esa etiqueta. Es derivado."
    },
    {
      simbolo: "TAV",
      mundoId: "diagnostico",
      funcionId: "evitacion",
      tipo: "derivada",
      explicacionMundo:
        "TAV funciona como un diagnóstico clínico: un término técnico que se empareja con pronósticos, imágenes y reglas sociales.",
      explicacionFuncion:
        "Muchos diagnósticos activan evitación (de consulta, de hablar del tema, de exponerse) más que acción flexible.",
      explicacionTipo:
        "La reacción se apoya en historias verbales, no en la etiqueta impresa en sí. Es respuesta derivada."
    }
  ];

  // Elementos base
  const casoNumeroSpan = document.getElementById("p15-caso-numero");
  const simboloActualSpan = document.getElementById("p15-simbolo-actual");

  const paso1Feedback = document.getElementById("p15-feedback-1");
  const paso2Feedback = document.getElementById("p15-feedback-2");
  const paso3Feedback = document.getElementById("p15-feedback-3");
  const resumenDiv = document.getElementById("p15-resumen");

  const btnSiguiente = document.getElementById("p15-btn-siguiente");
  const btnReset = document.getElementById("p15-btn-reset");

  const paso2 = document.querySelector(".p15-paso-2");
  const paso3 = document.querySelector(".p15-paso-3");

  const botonesMundo = document.querySelectorAll(".p15-opcion-mundo");
  const botonesFuncion = document.querySelectorAll(".p15-opcion-funcion");
  const botonesTipo = document.querySelectorAll(".p15-opcion-tipo");

  let indiceCaso = 0;
  let paso1Completado = false;
  let paso2Completado = false;
  let casosCompletados = 0;

  // --------------------------------------------------------
  // Utilidades
  // --------------------------------------------------------

  function limpiarClasesBotones(nodeList) {
    nodeList.forEach(btn => {
      btn.classList.remove("p15-opcion-correcta", "p15-opcion-incorrecta");
    });
  }

  function cargarCaso() {
    const caso = casos[indiceCaso];

    casoNumeroSpan.textContent = `Caso ${indiceCaso + 1} de ${casos.length}`;
    simboloActualSpan.textContent = caso.simbolo;

    paso1Feedback.textContent = "";
    paso2Feedback.textContent = "";
    paso3Feedback.textContent = "";
    resumenDiv.textContent = "";

    limpiarClasesBotones(botonesMundo);
    limpiarClasesBotones(botonesFuncion);
    limpiarClasesBotones(botonesTipo);

    paso2.style.opacity = 0.4;
    paso3.style.opacity = 0.4;
    paso2.style.pointerEvents = "none";
    paso3.style.pointerEvents = "none";

    paso1Completado = false;
    paso2Completado = false;
    btnSiguiente.disabled = true;
  }

  function finalizarEjercicio() {
    resumenDiv.textContent =
      "Has traducido los símbolos de laboratorio a ejemplos cotidianos de marcas, etiquetas y diagnósticos. " +
      "Las reacciones de vergüenza, orgullo o evitación se explican mejor como producto de redes relacionales derivadas, " +
      "no como verdades internas del consultante.";
  }

  // --------------------------------------------------------
  // Paso 1
  // --------------------------------------------------------
  botonesMundo.forEach(btn => {
    btn.addEventListener("click", () => {
      const caso = casos[indiceCaso];
      if (paso1Completado) return;

      limpiarClasesBotones(botonesMundo);

      if (btn.dataset.id === caso.mundoId) {
        btn.classList.add("p15-opcion-correcta");
        paso1Feedback.textContent = caso.explicacionMundo;
        paso1Feedback.style.color = "#2a7c4f";
        paso1Completado = true;

        // habilitar paso 2
        paso2.style.opacity = 1;
        paso2.style.pointerEvents = "auto";
      } else {
        btn.classList.add("p15-opcion-incorrecta");
        paso1Feedback.textContent =
          "Esa opción también puede ser relevante, pero no es el ejemplo central de este caso. Piensa en cómo el símbolo funciona en redes sociales o clínicas.";
        paso1Feedback.style.color = "#b83232";
      }
    });
  });

  // --------------------------------------------------------
  // Paso 2
  // --------------------------------------------------------
  botonesFuncion.forEach(btn => {
    btn.addEventListener("click", () => {
      const caso = casos[indiceCaso];
      if (!paso1Completado || paso2Completado) return;

      limpiarClasesBotones(botonesFuncion);

      if (btn.dataset.id === caso.funcionId) {
        btn.classList.add("p15-opcion-correcta");
        paso2Feedback.textContent = caso.explicacionFuncion;
        paso2Feedback.style.color = "#2a7c4f";
        paso2Completado = true;

        // habilitar paso 3
        paso3.style.opacity = 1;
        paso3.style.pointerEvents = "auto";
      } else {
        btn.classList.add("p15-opcion-incorrecta");
        paso2Feedback.textContent =
          "Esa función puede aparecer, pero no es la más típica en este ejemplo. Observa si el estímulo tiende a contraer o ampliar el repertorio.";
        paso2Feedback.style.color = "#b83232";
      }
    });
  });

  // --------------------------------------------------------
  // Paso 3
  // --------------------------------------------------------
  botonesTipo.forEach(btn => {
    btn.addEventListener("click", () => {
      const caso = casos[indiceCaso];
      if (!paso2Completado) return;

      limpiarClasesBotones(botonesTipo);

      if (btn.dataset.id === caso.tipo) {
        btn.classList.add("p15-opcion-correcta");
        paso3Feedback.textContent = caso.explicacionTipo;
        paso3Feedback.style.color = "#2a7c4f";

        btnSiguiente.disabled = false;
      } else {
        btn.classList.add("p15-opcion-incorrecta");
        paso3Feedback.textContent =
          "Piensa si la reacción podría ocurrir aun sin el estímulo físico presente, solo con la palabra o la etiqueta en mente. Eso indica respuesta derivada.";
        paso3Feedback.style.color = "#b83232";
      }
    });
  });

  // --------------------------------------------------------
  // Botón siguiente
  // --------------------------------------------------------
  btnSiguiente.addEventListener("click", () => {
    casosCompletados++;

    if (indiceCaso < casos.length - 1) {
      indiceCaso++;
      cargarCaso();
    } else {
      btnSiguiente.disabled = true;
      finalizarEjercicio();
    }
  });

  // --------------------------------------------------------
  // Botón reinicio
  // --------------------------------------------------------
  btnReset.addEventListener("click", () => {
    indiceCaso = 0;
    casosCompletados = 0;
    cargarCaso();
  });

  // Inicio
  cargarCaso();

});
