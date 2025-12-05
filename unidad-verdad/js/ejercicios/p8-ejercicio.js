/* ============================================================
   EJERCICIO P8 · LABORATORIO DE FORMULACIÓN VIVA
   Lógica drag-drop + avatar reactivo + autocorrección
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const tarjetas = document.querySelectorAll(".p8-tarjeta");
  const avatar = document.getElementById("p8-avatar");
  const estado = document.getElementById("p8-estado");
  const panel = document.getElementById("p8-panel");
  const feedback = document.getElementById("p8-feedback");
  const reiniciarBtn = document.getElementById("p8-reiniciar");
  const dropzone = document.getElementById("p8-avatar-dropzone");

  /* Datos de clasificación */
  const FUNCIONAL = ["evitacion", "alivio", "contexto", "accion"];
  const NO_FUNCIONAL = ["defecto", "estatico"];

  tarjetas.forEach(t => {
    t.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", t.dataset.tipo);
    });
  });

  /* Zona donde se suelta la tarjeta */
  dropzone.addEventListener("dragover", e => e.preventDefault());

  dropzone.addEventListener("drop", e => {
    e.preventDefault();
    const tipo = e.dataTransfer.getData("text/plain");
    evaluarTarjeta(tipo);
  });

  /* ============================================================
     LÓGICA DE EVALUACIÓN
  ============================================================ */
  function evaluarTarjeta(tipo) {
    feedback.style.display = "block";

    if (NO_FUNCIONAL.includes(tipo)) {
      avatar.textContent = "😕";
      estado.textContent = "La formulación no guía intervención.";
      panel.style.display = "none";

      feedback.textContent = "Describir no es intervenir. Ajusta la hipótesis.";
      feedback.className = "p8-feedback error";
      return;
    }

    if (FUNCIONAL.includes(tipo)) {
      avatar.textContent = "🙂";
      estado.textContent = "La conceptualización abre posibilidades.";

      panel.style.display = "block";
      feedback.textContent =
        "Vas en dirección contextual, pero prueba encontrar una formulación aún más accionable.";
      feedback.className = "p8-feedback mid";

      /* Si es la formulación que sugiere acción → éxito */
      if (tipo === "accion") {
        avatar.textContent = "⭐";
        estado.textContent =
          "Formulación viva: genera acción clara.";
        feedback.textContent =
          "Has construido una formulación verdadera en sentido contextual.";
        feedback.className = "p8-feedback ok";
      }

      return;
    }
  }

  /* ============================================================
     BOTÓN REINICIAR
  ============================================================ */
  reiniciarBtn.addEventListener("click", () => {
    avatar.textContent = "😐";
    estado.textContent = "Arrastra una tarjeta para comenzar.";
    panel.style.display = "none";
    feedback.style.display = "none";
  });
});
