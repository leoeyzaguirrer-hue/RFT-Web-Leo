/* ============================================================
   P2 · Unidad de Verdad — Lógica de Acordeones + Navegación
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* --- 1. ACORDEONES --- */
  document.querySelectorAll(".uv-accordion").forEach(btn => {

    btn.addEventListener("click", () => {
      const bloque = btn.dataset.bloque;
      const panel = document.querySelector(`.uv-accordion-panel[data-bloque="${bloque}"]`);
      const icon = btn.querySelector(".uv-accordion-icon");

      // Abrir/cerrar
      btn.classList.toggle("open");
      icon.classList.toggle("rot");
      panel.classList.toggle("open");
    });

  });

});
