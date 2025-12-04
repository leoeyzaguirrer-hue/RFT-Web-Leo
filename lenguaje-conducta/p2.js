/* ============================================================
   SISTEMA DE ACORDEONES PREMIUM — LENGUAJE COMO CONDUCTA
   (Funciona para Bloque 1, 2, 3 y 4)
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  
  // Selecciona todos los botones de acordeón
  const acordeones = document.querySelectorAll(".uv-accordion");

  acordeones.forEach(acordeon => {
    acordeon.addEventListener("click", () => {

      // 1. Alterna estado visual del botón
      acordeon.classList.toggle("activo");

      // 2. Panel asociado (siempre es el siguiente elemento)
      const panel = acordeon.nextElementSibling;

      // 3. Abrir/cerrar de forma suave
      if (panel.classList.contains("activo")) {
        panel.classList.remove("activo");
      } else {
        panel.classList.add("activo");
      }

    });
  });

});
