// p2.js · Conducta Privada · Lección 1

document.addEventListener("DOMContentLoaded", () => {

  /* ============================================================
     ACORDEONES <details> con animación suave
  ============================================================ */
  document.querySelectorAll("details.uv-accordion").forEach((acc) => {

    acc.addEventListener("toggle", () => {
      if (acc.open) {
        // apertura → fade suave
        const panel = acc.querySelector(".uv-bloque-texto");
        panel.style.animation = "fadeDown 0.25s ease";
      }
    });

  });

  /* ============================================================
     PROGRESO (puntitos)
  ============================================================ */

  const dots = document.querySelectorAll(".dot");
  if (dots.length > 0) dots[0].classList.add("active");

});
