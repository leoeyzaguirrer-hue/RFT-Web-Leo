// p7.js · Conducta Privada · Lección 6 (Cierre)

document.addEventListener("DOMContentLoaded", () => {

  /* ACORDEONES */
  const accordions = document.querySelectorAll("details.uv-accordion");

  accordions.forEach((acc) => {
    const summary = acc.querySelector("summary");

    summary.addEventListener("click", (e) => {
      if (acc.open) {
        acc.classList.add("closing");
        setTimeout(() => {
          acc.open = false;
          acc.classList.remove("closing");
        }, 180);
        e.preventDefault();
      }
    });
  });

  /* PUNTITOS DE PROGRESO */
  const dots = document.querySelectorAll(".dot");
  if (dots.length) dots[0].classList.add("active");

});
