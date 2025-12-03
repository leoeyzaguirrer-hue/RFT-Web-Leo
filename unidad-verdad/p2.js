document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".uv-accordion");

  accordions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const bloque = btn.dataset.bloque;
      const panel = document.querySelector(`.uv-accordion-panel[data-bloque="${bloque}"]`);
      const icon = btn.querySelector(".uv-accordion-icon");

      const isOpen = panel.classList.contains("open");

      // Cerrar todos
      document.querySelectorAll(".uv-accordion-panel").forEach(p => p.classList.remove("open"));
      document.querySelectorAll(".uv-accordion-icon").forEach(i => i.classList.remove("rot"));
      document.querySelectorAll(".uv-accordion").forEach(a => a.classList.remove("open"));

      // Abrir el que corresponde
      if (!isOpen) {
        panel.classList.add("open");
        icon.classList.add("rot");
        btn.classList.add("open");
      }
    });
  });
});
