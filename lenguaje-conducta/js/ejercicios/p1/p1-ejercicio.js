// ============================================================
// P1 · EJERCICIO BLOQUE 1 · ESCÁNER DE CONDUCTAS LINGÜÍSTICAS
// Lógica local: drag & drop + funciones A–C
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const cardsPool = document.querySelector(".p1-cards-pool");
  const cards = Array.from(document.querySelectorAll(".p1-card"));
  const dropZones = Array.from(document.querySelectorAll(".p1-drop-zone"));

  const btnCheckClasificacion = document.querySelector(
    ".p1-btn-check-clasificacion"
  );
  const btnReset = document.querySelector(".p1-btn-reset");
  const feedbackFase1 = document.querySelector(".p1-feedback-fase1");

  const faseFunciones = document.querySelector(".p1-fase-funciones");
  const btnCheckFunciones = document.querySelector(".p1-btn-check-funciones");
  const feedbackFase2 = document.querySelector(".p1-feedback-fase2");
  const mensajeFinal = document.querySelector(".p1-mensaje-final");

  // Definimos la clave correcta para la Fase 1
  const claveTopografias = {
    c1: "abierta",
    c2: "abierta",
    c3: "abierta",
    c4: "encubierta",
    c5: "encubierta",
    c6: "abierta",
  };

  // Clave para funciones A–C (selecciones correctas)
  const claveFunciones = {
    // valorAntecedente, valorConsecuencia
    c1: { A: "presion", C: "alivio" }, // Decir "no puedo más"
    c2: { A: "presion", C: "organizacion" }, // Escribir mensaje pidiendo ayuda
    c3: { A: "recordatorio", C: "organizacion" }, // Anotar tarea
    c4: { A: "evaluacion", C: "evitacion" }, // Mover labios sin sonido
    c5: { A: "evaluacion", C: "alivio" }, // Pensar "soy un desastre"
    c6: { A: "evaluacion", C: "evitacion" }, // Ícono de silencio
  };

  // ------------------------------------------------------------
  // FASE 1 · Drag & Drop
  // ------------------------------------------------------------

  cards.forEach((card) => {
    card.addEventListener("dragstart", handleDragStart);
    card.addEventListener("dragend", handleDragEnd);
  });

  dropZones.forEach((zone) => {
    zone.addEventListener("dragover", handleDragOver);
    zone.addEventListener("dragleave", handleDragLeave);
    zone.addEventListener("drop", handleDrop);
  });

  function handleDragStart(e) {
    const card = e.target;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", card.dataset.cardId);
    // Guardamos un atributo para saber que se está arrastrando
    card.classList.remove("p1-card-error");
  }

  function handleDragEnd() {
    // Nada especial aquí por ahora
  }

  function handleDragOver(e) {
    e.preventDefault();
    const zone = e.currentTarget;
    zone.classList.add("p1-drop-over");
    e.dataTransfer.dropEffect = "move";
  }

  function handleDragLeave(e) {
    const zone = e.currentTarget;
    zone.classList.remove("p1-drop-over");
  }

  function handleDrop(e) {
    e.preventDefault();
    const zone = e.currentTarget;
    zone.classList.remove("p1-drop-over");

    const cardId = e.dataTransfer.getData("text/plain");
    if (!cardId) return;

    const card = cards.find((c) => c.dataset.cardId === cardId);
    if (!card) return;

    const tipoCorrecto = claveTopografias[cardId];
    const tipoZona = zone.dataset.acepta;

    if (tipoCorrecto === tipoZona) {
      // Colocar tarjeta en zona correcta
      card.classList.remove("p1-card-error");
      card.classList.add("p1-card-correcta");
      zone.querySelector(".p1-drop-content").appendChild(card);
      feedbackFase1.textContent = "";
      comprobarSiTodoClasificado();
    } else {
      // Error: vibración + volver al pool
      card.classList.add("p1-card-error");
      setTimeout(() => {
        card.classList.remove("p1-card-error");
      }, 260);
      cardsPool.appendChild(card);
      feedbackFase1.textContent =
        "Revisa: lo importante es si la conducta es observable o no, no si es ‘más interna’ o ‘más grave’.";
    }
  }

  function comprobarSiTodoClasificado() {
    const total = cards.length;
    let enZonas = 0;

    dropZones.forEach((zone) => {
      const zonaCards = zone.querySelectorAll(".p1-card");
      enZonas += zonaCards.length;
    });

    if (enZonas === total) {
      // Todas las tarjetas están colocadas; verificamos si todas son correctas
      const todasCorrectas = cards.every((card) =>
        card.classList.contains("p1-card-correcta")
      );

      if (todasCorrectas) {
        feedbackFase1.textContent =
          "Bien: estás tratando ‘pensar’, ‘hablar’ y ‘anotar’ como variaciones topográficas dentro de la misma clase de conducta verbal.";
        // Mostramos la fase 2
        faseFunciones.classList.remove("p1-fase-oculta");
      } else {
        feedbackFase1.textContent =
          "Algunas tarjetas están en la zona incorrecta. Recuerda: abierta = observable; encubierta = no observable, pero sigue siendo conducta.";
      }
    }
  }

  // También permitimos un botón para comprobar sin haber arrastrado todas
  if (btnCheckClasificacion) {
    btnCheckClasificacion.addEventListener("click", () => {
      comprobarSiTodoClasificado();
    });
  }

  // Botón de reinicio
  if (btnReset) {
    btnReset.addEventListener("click", () => {
      // Devolver todas las tarjetas al pool inicial
      cards.forEach((card) => {
        card.classList.remove("p1-card-correcta", "p1-card-error");
        cardsPool.appendChild(card);
      });

      // Limpiar zonas
      dropZones.forEach((zone) => {
        zone.classList.remove("p1-drop-over");
      });

      // Ocultar fase 2 y limpiar feedback
      faseFunciones.classList.add("p1-fase-oculta");
      feedbackFase1.textContent = "";
      feedbackFase2.textContent = "";
      mensajeFinal.textContent = "";

      // Reset de selects y estilos de filas
      const filas = document.querySelectorAll(".p1-fila-funcion");
      filas.forEach((fila) => {
        fila.classList.remove("p1-ok", "p1-error");
        const selects = fila.querySelectorAll("select");
        selects.forEach((sel) => {
          sel.value = "";
        });
      });
    });
  }

  // ------------------------------------------------------------
  // FASE 2 · Revisión de funciones A–C
  // ------------------------------------------------------------

  if (btnCheckFunciones) {
    btnCheckFunciones.addEventListener("click", () => {
      const filas = Array.from(document.querySelectorAll(".p1-fila-funcion"));
      let todasCorrectas = true;
      let algunaRespuesta = false;

      filas.forEach((fila) => {
        const cardId = fila.dataset.cardId;
        const selectA = fila.querySelector(".p1-select-antecedente");
        const selectC = fila.querySelector(".p1-select-consecuencia");

        fila.classList.remove("p1-ok", "p1-error");

        const valorA = selectA ? selectA.value : "";
        const valorC = selectC ? selectC.value : "";

        if (valorA || valorC) {
          algunaRespuesta = true;
        }

        const clave = claveFunciones[cardId];
        if (!clave) return;

        if (valorA === clave.A && valorC === clave.C) {
          fila.classList.add("p1-ok");
        } else {
          if (valorA || valorC) {
            fila.classList.add("p1-error");
            todasCorrectas = false;
          } else {
            todasCorrectas = false;
          }
        }
      });

      if (!algunaRespuesta) {
        feedbackFase2.textContent =
          "Primero selecciona al menos un antecedente y una consecuencia antes de revisar.";
        mensajeFinal.textContent = "";
        return;
      }

      if (todasCorrectas) {
        feedbackFase2.textContent =
          "Las combinaciones A–C elegidas son coherentes con la función de cada conducta.";
        mensajeFinal.textContent =
          "El lenguaje es conducta: observable y encubierta. Lo relevante no es su ‘interioridad’, sino su función en un análisis A–B–C que nos permita predecir e influir en patrones de acción.";
      } else {
        feedbackFase2.textContent =
          "Algunas combinaciones A–C no encajan del todo. Revisa si el antecedente realmente evoca la conducta y si la consecuencia aumenta la probabilidad de que vuelva a ocurrir.";
        mensajeFinal.textContent = "";
      }
    });
  }
});
