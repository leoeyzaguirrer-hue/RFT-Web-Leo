// ============================================================
// EJERCICIOS DEL MÓDULO · P5 (Hablante/Oyente) + P6 (Autodiálogo)
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  // =============================
  // ---------- VARIABLES ----------
  // =============================

  const mensajeFinal = document.querySelector(".p6-mensaje-final");
  const btnReset = document.querySelector(".p6-btn-reset");

  const globoExt = document.querySelector(".p6-globo-externo");
  const globoInt = document.querySelector(".p6-globo-interno");

  let fraseSeleccionada = null;


  // ============================================================
  // FASE 1 — SELECCIÓN DE FRASE
  // ============================================================

  document.querySelectorAll(".p6-frase").forEach(frase => {
    frase.addEventListener("click", () => {

      fraseSeleccionada = {
        texto: frase.textContent.trim(),
        relacionCorrecta: frase.dataset.rel,
        accionCorrecta: frase.dataset.accion
      };

      // Mostrar globos
      globoExt.textContent = fraseSeleccionada.texto;
      globoInt.textContent = interpretarFrase(fraseSeleccionada.relacionCorrecta);

      // Mostrar siguiente fase
      document.getElementById("p6-fase-relacion").style.display = "block";
    });
  });


  // ============================================================
  // FASE 2 — RELACIÓN VERBAL
  // ============================================================

  document.querySelectorAll(".p6-rel").forEach(rel => {
    rel.addEventListener("click", () => {

      const feedback = document.querySelector(".p6-feedback-rel");

      if (rel.dataset.id === fraseSeleccionada.relacionCorrecta) {
        feedback.textContent = "Correcto: relación verbal identificada.";
        feedback.style.color = "#2a7c4f";
        document.getElementById("p6-fase-accion").style.display = "block";
      } else {
        feedback.textContent = "Esa relación no corresponde con el control verbal.";
        feedback.style.color = "#b83232";
      }
    });
  });


  // ============================================================
  // FASE 3 — ACCIÓN DERIVADA
  // ============================================================

  document.querySelectorAll(".p6-accion").forEach(act => {
    act.addEventListener("click", () => {

      const feedback = document.querySelector(".p6-feedback-accion");

      if (act.dataset.id === fraseSeleccionada.accionCorrecta) {
        feedback.textContent = "Correcto: acción derivada coherente.";
        feedback.style.color = "#2a7c4f";

        mensajeFinal.textContent =
          "El autodiálogo funciona porque eres hablante y oyente simultáneamente. Las relaciones activadas cambian la conducta.";

      } else {
        feedback.textContent = "Esa acción no se corresponde con la relación verbal activada.";
        feedback.style.color = "#b83232";
      }
    });
  });


  // ============================================================
  // REINICIAR
  // ============================================================

  btnReset.addEventListener("click", () => {

    fraseSeleccionada = null;

    globoExt.textContent = "";
    globoInt.textContent = "";

    mensajeFinal.textContent = "";

    document.querySelector(".p6-feedback-rel").textContent = "";
    document.querySelector(".p6-feedback-accion").textContent = "";

    document.getElementById("p6-fase-relacion").style.display = "none";
    document.getElementById("p6-fase-accion").style.display = "none";
  });


  // ============================================================
  // FUNCIÓN AUXILIAR — INTERPRETACIÓN
  // ============================================================

  function interpretarFrase(rel) {
    switch (rel) {
      case "amenaza": return "Esto es peligroso → tensión aumentada.";
      case "fracaso": return "Esto saldrá mal → autocastigo anticipado.";
      case "posibilidad": return "Hay oportunidad → activación y energía.";
      case "riesgo": return "Puedo manejarlo → regulación flexible.";
      default: return "";
    }
  }

});
