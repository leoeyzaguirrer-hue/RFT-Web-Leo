// p5.js · Unidad Verdad · Lección 4
// Control universal de acordeones y progreso por bloque (compatible con TODAS las pantallas)

document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".uv-accordion");
  const panels = document.querySelectorAll(".uv-accordion-panel");
  const icons = document.querySelectorAll(".uv-accordion-icon");
  const dots = document.querySelectorAll(".uv-bloque-dot");

  if (!accordions.length) return;

  // ============================================
  //  ACTIVACIÓN AUTOMÁTICA DE EJERCICIOS (si existen)
  // ============================================

  // Bloque 1
  if (typeof initEjercicioBloque1UV === "function") {
    const b1 = document.querySelector('[data-bloque="1"].uv-accordion');
    if (b1) {
      b1.addEventListener("click", () => {
        initEjercicioBloque1UV();
      });
    }
  }

  // Bloque 2
  if (typeof initEjercicioBloque2UV === "function") {
    const b2 = document.querySelector('[data-bloque="2"].uv-accordion');
    if (b2) {
      b2.addEventListener("click", () => {
        initEjercicioBloque2UV();
      });
    }
  }

  // Bloque 3
  if (typeof initEjercicioBloque3UV === "function") {
    const b3 = document.querySelector('[data-bloque="3"].uv-accordion');
    if (b3) {
      b3.addEventListener("click", () => {
        initEjercicioBloque3UV();
      });
    }
  }

  // Bloque 4
  if (typeof initEjercicioBloque4UV === "function") {
    const b4 = document.querySelector('[data-bloque="4"].uv-accordion');
    if (b4) {
      b4.addEventListener("click", () => {
        initEjercicioBloque4UV();
      });
    }
  }

  // ============================================
  // SISTEMA DE ACORDEONES
  // ============================================

  accordions.forEach((accordion) => {
    accordion.addEventListener("click", () => {
      const bloque = accordion.getAttribute("data-bloque");
      const panel = document.querySelector(`.uv-accordion-panel[data-bloque="${bloque}"]`);
      const icon = accordion.querySelector(".uv-accordion-icon");

      const estabaAbierto = panel.classList.contains("abierto");

      // Cerrar todos
      panels.forEach((p) => p.classList.remove("abierto"));
      accordions.forEach((a) => a.classList.remove("abierto"));
      icons.forEach((i) => i.classList.remove("rotado"));

      // Reabrir si estaba cerrado
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
