// ============================================================
// BLOQUE 4 · MODULADOR DE INTERVENCIONES VERBALES
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  let intervencionActual = null;

  const faseFunc = document.querySelector(".p8-fase-funcion");
  const faseAcc = document.querySelector(".p8-fase-accion");

  const fbFunc = document.querySelector(".p8-feedback-func");
  const fbAcc = document.querySelector(".p8-feedback-accion");
  const msgFinal = document.querySelector(".p8-mensaje-final");
  const btnReset = document.querySelector(".p8-btn-reset");

  // ============================================================
  // FASE 1 — SELECCIÓN DE INTERVENCIÓN
  // ============================================================

  document.querySelectorAll(".p8-inter").forEach(btn => {
    btn.addEventListener("click", () => {

      intervencionActual = {
        func: btn.dataset.func,
        accion: btn.dataset.accion,
        texto: btn.textContent.trim()
      };

      faseFunc.style.display = "block";
      fbFunc.textContent = "";
      fbAcc.textContent = "";
      msgFinal.textContent = "";
    });
  });

  // ============================================================
  // FASE 2 — FUNCIÓN DERIVADA
  // ============================================================

  document.querySelectorAll(".p8-func").forEach(el => {
    el.addEventListener("click", () => {

      if (el.dataset.id === intervencionActual.func) {
        fbFunc.textContent = "Correcto: la intervención genera esa función verbal.";
        fbFunc.style.color = "#2a7c4f";
        faseAcc.style.display = "block";
      } else {
        fbFunc.textContent = "La metáfora puede sonar hermosa, pero la función es clave.";
        fbFunc.style.color = "#b83232";
      }
    });
  });

  // ============================================================
  // FASE 3 — ACCIÓN DERIVADA
  // ============================================================

  document.querySelectorAll(".p8-acc").forEach(el => {
    el.addEventListener("click", () => {

      if (el.dataset.id === intervencionActual.accion) {
        fbAcc.textContent = "Correcto: la acción deriva coherentemente de la función verbal.";
        fbAcc.style.color = "#2a7c4f";

        msgFinal.textContent =
          "No tratamos con contenidos, sino con funciones verbales que modifican la acción.";

      } else {
        fbAcc.textContent = "Observa qué conducta facilita realmente la función activada.";
        fbAcc.style.color = "#b83232";
      }
    });
  });

  // ============================================================
  // REINICIO
  // ============================================================

  btnReset.addEventListener("click", () => {
    intervencionActual = null;
    faseFunc.style.display = "none";
    faseAcc.style.display = "none";
    fbFunc.textContent = "";
    fbAcc.textContent = "";
    msgFinal.textContent = "";
  });
});
