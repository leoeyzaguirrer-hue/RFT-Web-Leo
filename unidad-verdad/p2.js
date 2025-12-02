document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".uv-accordion");

  accordions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const bloque = btn.dataset.bloque;
      const panel = document.getElementById(`panel-${bloque}`);
      const icon = btn.querySelector(".uv-accordion-icon");

      const isOpen = panel.classList.contains("open");

      document.querySelectorAll(".uv-accordion-panel").forEach(p => p.classList.remove("open"));
      document.querySelectorAll(".uv-accordion-icon").forEach(i => i.classList.remove("rot"));

      if (!isOpen) {
        panel.classList.add("open");
        icon.classList.add("rot");
      }
    });
  });
});
