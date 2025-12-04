// p2.js · Conducta Privada · Lección 1

document.addEventListener("DOMContentLoaded", () => {

  /* ============================================================
     ACORDEONES <details> — Comportamiento suave y estable
  ============================================================ */
  const accordions = document.querySelectorAll("details.uv-accordion");

  accordions.forEach((acc) => {
    const summary = acc.querySelector("summary");

    summary.addEventListener("click", (e) => {
      if (acc.open) {
        // cerrar con animación
        acc.classList.add("closing");
        e.preventDefault();

        setTimeout(() => {
          acc.removeAttribute("open");
          acc.classList.remove("closing");
        }, 200);

      } else {
        // abrir normal
        acc.setAttribute("open", "");
      }
    });
  });

  /* ============================================================
     PROGRESO SUPERIOR
  ============================================================ */
  const dots = document.querySelectorAll(".dot");
  if (dots.length) dots[0].classList.add("active");

});
