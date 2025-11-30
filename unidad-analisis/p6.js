// p6.js
document.addEventListener("DOMContentLoaded", () => {
  const buttons = Array.from(document.querySelectorAll(".p6-tab-button"));
  const panels = Array.from(document.querySelectorAll(".p6-tab-panel"));

  if (!buttons.length || !panels.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-tab-target");
      if (!targetId) return;

      // Desactivar todos los botones y paneles
      buttons.forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      panels.forEach((panel) => {
        panel.classList.remove("is-active");
      });

      // Activar el botón y panel seleccionados
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");

      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add("is-active");
      }
    });
  });
});
