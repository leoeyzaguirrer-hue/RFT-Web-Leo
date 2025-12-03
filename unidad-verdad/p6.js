// p6.js · Unidad Verdad · Lección 6
// Control universal de acordeones y progreso

document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".uv-accordion");
  const panels = document.querySelectorAll(".uv-accordion-panel");
  const icons = document.querySelectorAll(".uv-accordion-icon");
  const dots = document.querySelectorAll(".uv-bloque-dot");

  if (!accordions.length) return;

  // Activación diferida de ejercicios (cuando existan)
  accordions.forEach((accordion) => {
    accordion.addEventListener("click", () => {
      const bloque = accordion.getAttribute("data-bloque");

      // Si existe una función de inicialización del bloque X, la ejecutamos.
      const nombreFuncion = `initEjercicioBloque${bloque}UV`;
      if (typeof window[nombreFuncion] === "function") {
        window[nombreFuncion](); // Inicializa solo cuando se abre
      }
    });
  });

  // Lógica del acordeón (universal)
  accordions.forEach((accordion) => {
    accordion.addEventListener("click", () => {

      const bloque = accordion.getAttribute("data-bloque");
      const panel = document.querySelector(
        `.uv-accordion-panel[data-bloque="${bloque}"]`
      );
      const icon = accordion.querySelector(".uv-accordion-icon");

      const estabaAbierto = panel.classList.contains("abierto");

      // Cerrar todos
      panels.forEach((p) => p.classList.remove("abierto"));
      accordions.forEach((a) => a.classList.remove("abierto"));
      icons.forEach((i) => i.classList.remove("rotado"));

      // Si NO estaba abierto, abrirlo
      if (!estabaAbierto) {
        panel.classList.add("abierto");
        accordion.classList.add("abierto");
        if (icon) icon.classList.add("rotado");

        // Actualizar puntos de progreso
        dots.forEach((d) => {
          const n = d.getAttribute("data-bloque");
          d.classList.toggle("activo", n === bloque);
        });
      }
    });
  });
});
