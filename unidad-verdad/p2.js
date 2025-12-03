// p2.js · Unidad Verdad · Lección 1
// Control básico de acordeones y progreso por bloque

document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".uv-accordion");
  const panels = document.querySelectorAll(".uv-accordion-panel");
  const icons = document.querySelectorAll(".uv-accordion-icon");
  const dots = document.querySelectorAll(".uv-bloque-dot");

  if (!accordions.length) return;

  accordions.forEach((accordion) => {
    accordion.addEventListener("click", () => {
      const bloque = accordion.getAttribute("data-bloque");
      const panel = document.querySelector(
        `.uv-accordion-panel[data-bloque="${bloque}"]`
      );
      const icon = accordion.querySelector(".uv-accordion-icon");

      const estabaAbierto = panel.classList.contains("abierto");

      // Cerrar todo
      panels.forEach((p) => p.classList.remove("abierto"));
      accordions.forEach((a) => a.classList.remove("abierto"));
      icons.forEach((i) => i.classList.remove("rotado"));

      if (!estabaAbierto) {
        // Abrir solo el bloque clicado
        panel.classList.add("abierto");
        accordion.classList.add("abierto");
        if (icon) icon.classList.add("rotado");

        // Actualizar puntos de progreso
        dots.forEach((d) => {
          const n = d.getAttribute("data-bloque");
          d.classList.toggle("activo", n === bloque);
        });
      } else {
        // Si se vuelve a hacer clic en el mismo, lo cerramos todo
        // y dejamos el punto de progreso como estaba (no lo apagamos)
      }
    });
  });
});
