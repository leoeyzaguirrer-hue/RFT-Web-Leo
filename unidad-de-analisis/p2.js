// ===============================================
//  P2 · ACORDEONES PREMIUM AZUL+DORADO
// ===============================================

document.addEventListener("DOMContentLoaded", () => {

  const headers = document.querySelectorAll(".ua-acc-header");

  headers.forEach(header => {
    header.addEventListener("click", () => {

      const panel = header.nextElementSibling;
      const icon = header.querySelector(".ua-acc-icon");

      // Si el panel ya está abierto
      if (panel.classList.contains("open")) {
        panel.style.maxHeight = null;
        panel.classList.remove("open");
        icon.classList.remove("rotated");
        return;
      }

      // Cerrar todos los demás
      document.querySelectorAll(".ua-acc-panel").forEach(p => {
        p.style.maxHeight = null;
        p.classList.remove("open");
      });
      document.querySelectorAll(".ua-acc-icon").forEach(i => {
        i.classList.remove("rotated");
      });

      // Abrir el panel actual
      panel.classList.add("open");
      panel.style.maxHeight = panel.scrollHeight + "px";
      icon.classList.add("rotated");
    });
  });
});
