// p4.js · Unidad Verdad · Lección 3
// Control de acordeones y progreso + activación de actividades por bloque

document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".uv-accordion");
  const panels = document.querySelectorAll(".uv-accordion-panel");
  const icons = document.querySelectorAll(".uv-accordion-icon");
  const dots = document.querySelectorAll(".uv-bloque-dot");

  if (!accordions.length) return;

  // -------------------------------------------------------------------------
  // ACTIVACIÓN AUTOMÁTICA DE ACTIVIDADES AL ABRIR CADA BLOQUE
  // (Solo si existieran esas funciones)
  // -------------------------------------------------------------------------

  const triggerActividad = (bloque) => {
    switch (bloque) {
      case "1":
        if (typeof initEjercicioBloque1UV === "function") initEjercicioBloque1UV();
        break;
      case "2":
        if (typeof initEjercicioBloque2UV === "function") initEjercicioBloque2UV();
        break;
      case "3":
        if (typeof initEjercicioBloque3UV === "function") initEjercicioBloque3UV();
        break;
      case "4":
        if (typeof initEjercicioBloque4UV === "function") initEjercicioBloque4UV();
        break;
    }
  };

  // -------------------------------------------------------------------------
  // FUNCIONAMIENTO GENERAL DE LOS ACORDEONES
  // -------------------------------------------------------------------------

  accordions.forEach((accordion) => {
    accordion.addEventListener("click", () => {
      const bloque = accordion.getAttribute("data-bloque");
      const panel = document.querySelector(`.uv-accordion-panel[data-bloque="${bloque}"]`);
      const icon = accordion.querySelector(".uv-accordion-icon");

      const estabaAbierto = panel.classList.contains("abierto");

      // Cerrar todo
      panels.forEach((p) => p.classList.remove("abierto"));
      accordions.forEach((a) => a.classList.remove("abierto"));
      icons.forEach((i) => i.classList.remove("rotado"));

      if (!estabaAbierto) {
        // Abrir nuevo
        panel.classList.add("abierto");
        accordion.classList.add("abierto");
        if (icon) icon.classList.add("rotado");

        // Actualizar puntos de progreso
        dots.forEach((d) => {
          const n = d.getAttribute("data-bloque");
          d.classList.toggle("activo", n === bloque);
        });

        // Lanzar actividad del bloque
        triggerActividad(bloque);
      }
    });
  });
});
