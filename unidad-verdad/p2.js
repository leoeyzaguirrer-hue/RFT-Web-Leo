/* ============================================================
   MÓDULO UNIDAD DE VERDAD · P2.js
   Acordeón premium + microinteracciones suaves
   Compatible 100% con HTML y CSS actual
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  console.log("P2.js cargado correctamente — Unidad de Verdad");

  initAccordion();
  initExerciseHover();
});

/* ============================================================
   ACORDEÓN PREMIUM
============================================================ */

function initAccordion() {
  const items = document.querySelectorAll(".uv-accordion-item");

  items.forEach((item) => {
    const header = item.querySelector(".uv-accordion-header");
    const body = item.querySelector(".uv-accordion-body");

    header.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      // Cierra todos los demás
      document.querySelectorAll(".uv-accordion-item.is-open").forEach((openItem) => {
        if (openItem !== item) {
          const openBody = openItem.querySelector(".uv-accordion-body");
          openBody.style.maxHeight = null;
          openItem.classList.remove("is-open");
        }
      });

      // Alterna el item actual
      if (isOpen) {
        body.style.maxHeight = null;
        item.classList.remove("is-open");
      } else {
        body.style.maxHeight = body.scrollHeight + "px";
        item.classList.add("is-open");
      }
    });
  });
}

/* ============================================================
   MICROINTERACCIONES PARA EJERCICIOS
   (Iconos + feedback suave en hover)
============================================================ */

function initExerciseHover() {
  const exercises = document.querySelectorAll(".uv-exercise");

  exercises.forEach((ex) => {
    ex.addEventListener("mouseenter", () => {
      ex.style.transform = "translateY(-3px)";
      ex.style.transition = "0.25s ease";
      ex.style.boxShadow = "0 12px 26px rgba(10, 35, 64, 0.18)";
    });

    ex.addEventListener("mouseleave", () => {
      ex.style.transform = "translateY(0)";
      ex.style.boxShadow = "none";
    });
  });
}
