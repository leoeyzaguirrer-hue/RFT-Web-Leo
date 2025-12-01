/* ============================================================
   p2.js · LECCIÓN 1 · Unidad de Verdad
   Control de acordeones (múltiples abiertos permitidos)
   Diseño premium compatible con style-unidad-verdad.css
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initAccordion();
});

/* ------------------------------------------------------------
   FUNCIÓN PRINCIPAL: INICIALIZAR ACORDEONES
------------------------------------------------------------ */
function initAccordion() {
  const items = document.querySelectorAll(".uv-accordion-item");

  items.forEach((item) => {
    const header = item.querySelector(".uv-accordion-header");
    const body = item.querySelector(".uv-accordion-body");

    header.addEventListener("click", () => {
      toggleAccordion(item, body);
    });
  });
}

/* ------------------------------------------------------------
   ABRIR / CERRAR ACORDEÓN INDIVIDUAL
   (permite múltiples abiertos simultáneamente)
------------------------------------------------------------ */
function toggleAccordion(item, body) {
  const isOpen = item.classList.contains("is-open");

  if (isOpen) {
    closeAccordion(item, body);
  } else {
    openAccordion(item, body);
  }
}

/* ------------------------------------------------------------
   ABRIR UN ACORDEÓN
------------------------------------------------------------ */
function openAccordion(item, body) {
  item.classList.add("is-open");
  body.style.maxHeight = body.scrollHeight + "px";
}

/* ------------------------------------------------------------
   CERRAR UN ACORDEÓN
------------------------------------------------------------ */
function closeAccordion(item, body) {
  item.classList.remove("is-open");
  body.style.maxHeight = null;
}
