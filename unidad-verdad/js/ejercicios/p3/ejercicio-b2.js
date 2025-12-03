document.addEventListener("DOMContentLoaded", () => {

  const cards = document.querySelectorAll(".coh-card");
  const slots = document.querySelectorAll(".slot");
  const claridadBar = document.getElementById("claridad-bar");
  const utilidadBar = document.getElementById("utilidad-bar");
  const btnEvaluar = document.getElementById("btn-evaluar-b2");
  const feedback = document.getElementById("coh-feedback");

  let claridad = 0;
  let utilidad = 5; // casi no sube (crítica RFT)
  let placed = 0;

  cards.forEach(card => {
    card.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", card.textContent);
      e.dataTransfer.setData("card-id", card.textContent);
      card.classList.add("dragging");
    });

    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
    });
  });

  slots.forEach(slot => {
    slot.addEventListener("dragover", e => {
      e.preventDefault();
      slot.classList.add("over");
    });

    slot.addEventListener("dragleave", () => {
      slot.classList.remove("over");
    });

    slot.addEventListener("drop", e => {
      const dragging = document.querySelector(".dragging");
      slot.classList.remove("over");

      if (!dragging) return;

      slot.textContent = dragging.textContent;
      slot.classList.add("filled");

      placed++;

      // Actualiza claridad
      claridad = Math.min(claridad + 12, 100);
      claridadBar.style.width = claridad + "%";

      // Actualiza utilidad SOLO si data-correct = 1
      if (dragging.dataset.correct === "1") {
        utilidad = Math.min(utilidad + 3, 30);
      } else {
        utilidad = Math.max(utilidad - 5, 0);
      }
      utilidadBar.style.width = utilidad + "%";

      // Marcar tarjeta
      dragging.style.opacity = "0.4";
      dragging.draggable = false;
    });
  });


  // Evaluación final
  btnEvaluar.addEventListener("click", () => {
    if (utilidad < 15) {
      feedback.innerHTML =
        "🔍 <strong>Coherente sí… pero no útil clínicamente.</strong><br>La coherencia ordena, pero no necesariamente transforma.";
    } else {
      feedback.innerHTML =
        "✨ <strong>Tienes una teoría coherente… pero aún debes evaluar si orienta acción clínica.</strong>";
    }
  });

});
// ========================
// BOTÓN REINTENTAR EJERCICIO
// ========================
document.getElementById("btn-reintentar-b2").addEventListener("click", () => {

  // Reset de barras
  claridad = 0;
  utilidad = 0;
  claridadBar.style.width = "0%";
  utilidadBar.style.width = "0%";

  // Reset visual
  document.querySelectorAll(".slot").forEach(slot => {
    slot.innerHTML = "";
  });

  // Devolver tarjetas a su contenedor
  cohTarjetas.innerHTML = "";
  tarjetas.forEach(t => {
    t.style.opacity = "1";
    t.style.pointerEvents = "auto";
    cohTarjetas.appendChild(t);
  });

  // Reset feedback
  document.getElementById("coh-feedback").innerHTML = "";

  // Reset máquina
  document.querySelectorAll(".eng").forEach(e => {
    e.style.transform = "rotate(0deg)";
  });
});
