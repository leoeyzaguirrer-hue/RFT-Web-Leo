// p2.js · Conducta Privada · Lección 1
// Acordeones nativos + animación suave + sin dependencias del módulo Verdad

document.addEventListener("DOMContentLoaded", () => {

  /* ============================================================
     ACORDEONES <details> — Comportamiento mejorado
     ============================================================ */
  const accordions = document.querySelectorAll("details.uv-accordion");

  accordions.forEach((acc) => {
    const summary = acc.querySelector("summary");

    summary.addEventListener("click", (e) => {
      // si estaba abierto, agregamos la clase "closing" para animación suave
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


  /* ============================================================
     NAV SUPERIOR (si se quiere resaltar el punto activo)
     Se puede ampliar cuando haya progreso real entre pantallas.
     ============================================================ */

  const dots = document.querySelectorAll(".dot");
  if (dots.length) {
    // Por ahora solo marcamos el primero como activo (p2)
    dots[0].classList.add("active");
  }

  
  /* ============================================================
     PREPARACIÓN PARA FUTUROS EJERCICIOS
     Esta función no hace nada en p2, pero permite que luego
     podamos activar ejercicios igual que en el módulo Verdad.
     ============================================================ */
  if (typeof initEjercicioConductaPrivada === "function") {
    initEjercicioConductaPrivada();
  }

});
