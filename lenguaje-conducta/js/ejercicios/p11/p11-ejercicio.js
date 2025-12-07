// ============================================================
// P11 · PROYECTOR DE FUTURO CONDUCTUAL
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  const cont = document.querySelector(".p11-ejercicio-container");
  if (!cont) return;

  // ------------------- ELEMENTOS -------------------
  const reglas = document.querySelectorAll(".p11-regla");
  const dropZone = document.querySelector(".p11-drop-zone");
  const fbR1 = document.querySelector(".p11-feedback-r1");

  const faseFuncion = document.querySelector(".p11-fase-funcion");
  const faseAlternativa = document.querySelector(".p11-fase-alternativa");

  const funciones = document.querySelectorAll(".p11-f-card");
  const fbR2 = document.querySelector(".p11-feedback-r2");

  const alternativas = document.querySelectorAll(".p11-a-card");
  const fbR3 = document.querySelector(".p11-feedback-r3");

  const msgFinal = document.querySelector(".p11-mensaje-final");
  const btnReset = document.querySelector(".p11-btn-reset");

  // ------------------- DATOS -------------------

  const reglaFunciones = {
    "estudio-malo": "acercarse-valores",
    "rechazo": "buscar-aprobacion",
    "practica": "acercarse-valores",
    "no-error": "mantener-identidad"
  };

  let reglaActual = null;

  // ------------------- FASE 1 · ARRASTRAR -------------------

  reglas.forEach(r => {
    r.addEventListener("dragstart", e => {
      e.dataTransfer.setData("regla-id", r.dataset.id);
      e.dataTransfer.setData("texto", r.textContent);
    });
  });

  dropZone.addEventListener("dragover", e => e.preventDefault());

  dropZone.addEventListener("drop", e => {
    e.preventDefault();

    const id = e.dataTransfer.getData("regla-id");
    const txt = e.dataTransfer.getData("texto");

    reglaActual = id;
    dropZone.textContent = txt;
    dropZone.classList.add("p11-drop-ok");

    fbR1.textContent =
      "Observa cómo esta regla organiza conducta entre pasado, presente y futuro.";
    fbR1.style.color = "#2a7c4f";

    // Mostrar siguiente fase
    faseFuncion.style.display = "block";
  });

  // ------------------- FASE 2 · FUNCIÓN -------------------

  funciones.forEach(f => {
    f.addEventListener("click", () => {

      funciones.forEach(x => x.classList.remove("p11-selected"));
      f.classList.add("p11-selected");

      const correcto = f.dataset.id === reglaFunciones[reglaActual];

      if (correcto) {
        fbR2.textContent =
          "Correcto: la función real de esta regla coordina cómo responderás mañana.";
        fbR2.style.color = "#2a7c4f";

        faseAlternativa.style.display = "block";

      } else {
        fbR2.textContent =
          "Esa no es la función principal. Observa qué conducta futura organiza.";
        fbR2.style.color = "#b83232";
      }
    });
  });

  // ------------------- FASE 3 · ALTERNATIVA -------------------

  alternativas.forEach(a => {
    a.addEventListener("click", () => {

      alternativas.forEach(x => x.classList.remove("p11-selected"));
      a.classList.add("p11-selected");

      fbR3.textContent =
        "Has creado una alternativa flexible que proyecta consecuencias valiosas.";
      fbR3.style.color = "#2a7c4f";

      msgFinal.textContent =
        "Las reglas no describen: proyectan contingencias a futuro. Transformarlas altera cómo el organismo responde mañana incluso sin contacto directo con la situación.";
    });
  });

  // ------------------- REINICIO -------------------

  btnReset.addEventListener("click", () => {

    dropZone.textContent = "Suelta aquí la regla";
    dropZone.classList.remove("p11-drop-ok","p11-drop-error");

    fbR1.textContent = "";
    fbR2.textContent = "";
    fbR3.textContent = "";

    funciones.forEach(f => f.classList.remove("p11-selected"));
    alternativas.forEach(a => a.classList.remove("p11-selected"));

    faseFuncion.style.display = "none";
    faseAlternativa.style.display = "none";

    msgFinal.textContent = "";
    reglaActual = null;
  });

});
