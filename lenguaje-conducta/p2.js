document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     ACORDEONES CON ANIMACIÓN
  =============================== */
  document.querySelectorAll("details.uv-accordion").forEach(acc => {
    acc.addEventListener("toggle", () => {
      if (!acc.open) {
        acc.classList.add("closing");
        setTimeout(() => acc.classList.remove("closing"), 250);
      }
    });
  });

  /* ===============================
     PROGRESO DE LECCIÓN
  =============================== */
  const dots = document.querySelectorAll(".uv-progress .dot");
  dots[0].classList.add("active");
});
