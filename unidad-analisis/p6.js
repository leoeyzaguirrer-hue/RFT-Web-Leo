// p6.js — versión simplificada solo para acordeones

document.addEventListener("DOMContentLoaded", () => {
  const headers = document.querySelectorAll(".ua-acc-header");

  headers.forEach(header => {
    header.addEventListener("click", () => {
      const panel = header.nextElementSibling;
      const icon = header.querySelector(".ua-acc-icon");

      panel.classList.toggle("ua-open");
      icon.classList.toggle("ua-rotated");
    });
  });
});
