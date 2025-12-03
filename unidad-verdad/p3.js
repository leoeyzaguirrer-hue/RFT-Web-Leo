// p3.js · Unidad Verdad · Lección 2
// Control de acordeones y progreso por bloque (idéntico a p2.js pero adaptado)

document.addEventListener("DOMContentLoaded", () => {

  const accordions = document.querySelectorAll(".uv-accordion");
  const panels = document.querySelectorAll(".uv-accordion-panel");
  const icons = document.querySelectorAll(".uv-accordion-icon");
  const dots = document.querySelectorAll(".uv-bloque-dot");

  if (!accordions.length) return;

  // ================================
  // INICIALIZACIÓN DE EJERCICIOS
  // ================================

  // Bloque 1 — si existe su inicializador
  if (typeof initEjercicioBloque1UV_P3 === "function") {
    initEjercicioBloque1UV_P3();
  }

  // Bloque 2 — se activa al abrir su acordeón
  const bloque2 = document.querySelector('[data-bloque="2"]');
  if (bloque2) {
    bloque2.addEventListener("click", () => {
      if (typeof initEjercicioBloque2UV_P3 === "function") {
        initEjercicioBloque2UV_P3();
      }
    });
  }

  // Bloque 3 — opcional si luego quieres ejercicios
  const bloque3 = document.querySelector('[data-bloque="3"]');
  if (bloque3) {
    bloque3.addEventListener("click", () => {
      if (typeof initEjercicioBloque3UV_P3 === "function") {
        initEjercicioBloque3UV_P3();
      }
    });
  }

  // Bloque 4 — opcional igualmente
  const bloque4 = document.querySelector('[data-bloque="4"]');
  if (bloque4) {
    bloque4.addEventListener("click", () => {
      if (typeof initEjercicioBloque4UV_P3 === "function") {
        initEjercicioBloque4UV_P3();
      }
    });
  }

  // ================================
  // COMPORTAMIENTO DEL ACORDEÓN
  // ================================
  accordions.forEach((accordion) => {
    accordion.addEventListener("click", () => {
      const bloque = accordion.getAttribute("data-bloque");
      const panel = document.querySelector(`.uv-accordion-panel[data-bloque="${bloque}"]`);
      const icon = accordion.querySelector(".uv-accordion-icon");

      const estabaAbierto = panel.classList.contains("abierto");

      // Cerrar todo primero
      panels.forEach((p) => p.classList.remove("abierto"));
      accordions.forEach((a) => a.classList.remove("abierto"));
      icons.forEach((i) => i.classList.remove("rotado"));

      // Si no estaba abierto → abrirlo
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
