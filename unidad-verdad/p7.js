// p7.js · Unidad Verdad · Lección 7
// Control universal de acordeones y progreso

document.addEventListener("DOMContentLoaded", () => {

  const accordions = document.querySelectorAll(".uv-accordion");
  const panels = document.querySelectorAll(".uv-accordion-panel");
  const dots = document.querySelectorAll(".uv-bloque-dot");

  if (!accordions.length) return;

  accordions.forEach((accordion) => {
    accordion.addEventListener("click", () => {

      const bloque = accordion.getAttribute("data-bloque");
      const panel = document.querySelector(`.uv-accordion-panel[data-bloque="${bloque}"]`);

      const estabaAbierto = panel.classList.contains("abierto");

      // Cerrar todos
      panels.forEach((p) => p.classList.remove("abierto"));
      accordions.forEach((a) => a.classList.remove("abierto"));
      document.querySelectorAll(".uv-accordion-icon").forEach((i) => i.classList.remove("rotado"));

      if (!estabaAbierto) {
        // Abrir el seleccionado
        panel.classList.add("abierto");
        accordion.classList.add("abierto");

        const icon = accordion.querySelector(".uv-accordion-icon");
        if (icon) icon.classList.add("rotado");

        // Activar punto de progreso
        dots.forEach((d) => {
          const n = d.getAttribute("data-bloque");
          d.classList.toggle("activo", n === bloque);
        });
      }
    });
  });

});
