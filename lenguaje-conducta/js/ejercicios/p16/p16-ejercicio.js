// ============================================================
// P16 · DERIVADOR DE RELACIONES OCULTAS
// ============================================================
document.addEventListener("DOMContentLoaded", () => {

  const faseTexto = document.getElementById("p16-fase-texto");

  const fase1 = document.querySelector(".p16-fase-1");
  const fase2 = document.querySelector(".p16-fase-2");
  const fase3 = document.querySelector(".p16-fase-3");

  const lineaAB = document.getElementById("linea-AB");
  const lineaBC = document.getElementById("linea-BC");
  const lineaAC = document.getElementById("linea-AC");

  const fbF1 = document.getElementById("p16-feedback-f1");
  const fbF2 = document.getElementById("p16-feedback-f2");
  const fbFinal = document.getElementById("p16-feedback-final");

  const botonesEntreno = document.querySelectorAll(".p16-btn-entreno");
  const botonesDeriva = document.querySelectorAll(".p16-btn-deriva");
  const btnReset = document.getElementById("p16-btn-reset");

  let entrenadoAB = false;
  let entrenadoBC = false;
  let derivadoAC = false;

  // ---------------------------------------------------------
  // FASE 1 · ENTRENAMIENTO
  // ---------------------------------------------------------
  botonesEntreno.forEach(btn => {
    btn.addEventListener("click", () => {
      const tipo = btn.dataset.rela;

      if (tipo === "AB") {
        entrenadoAB = true;
        lineaAB.style.background = "#2a7c4f";
        fbF1.textContent = "Relación A → B entrenada por reforzamiento.";
      }

      if (tipo === "BC") {
        entrenadoBC = true;
        lineaBC.style.background = "#2a7c4f";
        fbF1.textContent = "Relación B → C entrenada por reforzamiento.";
      }

      if (entrenadoAB && entrenadoBC) {
        setTimeout(() => {
          fase1.style.display = "none";
          fase2.style.display = "block";
          faseTexto.textContent = "Fase 2 · Derivación";
        }, 800);
      }
    });
  });

  // ---------------------------------------------------------
  // FASE 2 · DERIVACIÓN
  // ---------------------------------------------------------
  botonesDeriva.forEach(btn => {
    btn.addEventListener("click", () => {
      const r = btn.dataset.respuesta;

      if (r === "si") {
        fbF2.textContent =
          "Correcto. Aunque A → C nunca fue entrenada directamente, el organismo puede derivarla por la red relacional.";
        diagnosticarDerivacion();
      } else {
        fbF2.textContent =
          "Aunque no haya entrenamiento directo, el sistema relacional permite que esta relación se derive igualmente.";
        diagnosticarDerivacion();
      }
    });
  });

  function diagnosticarDerivacion() {
    derivadoAC = true;

    lineaAC.style.opacity = 1;

    setTimeout(() => {
      fase2.style.display = "none";
      fase3.style.display = "block";
      faseTexto.textContent = "Aplicación clínica";
      fbFinal.textContent =
        "Este mismo principio explica cómo una palabra puede adquirir funciones conductuales intensas sin que cada conexión haya sido directamente entrenada.";
    }, 1000);
  }

  // ---------------------------------------------------------
  // REINICIO
  // ---------------------------------------------------------
  btnReset.addEventListener("click", () => {
    entrenadoAB = false;
    entrenadoBC = false;
    derivadoAC = false;

    lineaAB.style.background = "#ddd";
    lineaBC.style.background = "#ddd";
    lineaAC.style.opacity = 0;

    faseTexto.textContent = "Fase 1 · Entrenamiento directo";

    fase1.style.display = "block";
    fase2.style.display = "none";
    fase3.style.display = "none";

    fbF1.textContent = "";
    fbF2.textContent = "";
    fbFinal.textContent = "";
  });

});
