// ============================================================
// EJERCICIO P4 · DESESTABILIZADOR DE LA CAJA MENTAL
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  const cards = document.querySelectorAll(".p4-card");
  const zonaAccion = document.querySelector(".p4-zona-accion");
  const zonaMentalista = document.querySelector(".p4-zona-mentalista");
  const caja = document.querySelector(".p4-caja-mental");
  const panelFunciones = document.querySelector(".p4-panel-funciones");
  const mensajeFinal = document.querySelector(".p4-mensaje-final");
  const btnReset = document.querySelector(".p4-btn-reset");

  let correctas = 0;

  const funcionesSugeridas = {
    miedo:    { A: "Antecedente: estímulo evocador (amenaza percibida).", C: "Consecuencia: reducción de tensión." },
    agresivo: { A: "Antecedente: frustración momentánea.",               C: "Consecuencia: evitación de conflicto." },
    murmurar: { A: "Antecedente: situación evaluativa.",                 C: "Consecuencia: autorregulación encubierta." },
    nopuedo:  { A: "Antecedente: presión o demanda.",                    C: "Consecuencia: alivio inmediato." },
    telefono: { A: "Antecedente: señal social (llamada entrante).",      C: "Consecuencia: evitación del contacto." },
    reloj:    { A: "Antecedente: estímulo temporal.",                    C: "Consecuencia: aumento de preocupación." }
  };

  cards.forEach(card => {
    card.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", card.dataset.id);
    });
  });

  // ZONA ACCIÓN
  zonaAccion.addEventListener("dragover", e => e.preventDefault());
  zonaAccion.addEventListener("drop", e => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const card = document.querySelector(`.p4-card[data-id="${id}"]`);

    card.classList.remove("p4-error");
    card.classList.add("p4-correcta");

    zonaAccion.appendChild(card);

    const f = funcionesSugeridas[id];
    panelFunciones.innerHTML =
      `<strong>Clasificado como acción:</strong><br>${f.A}<br>${f.C}`;

    correctas++;
    checkCaja();
  });

  // ZONA MENTALISTA
  zonaMentalista.addEventListener("dragover", e => e.preventDefault());
  zonaMentalista.addEventListener("drop", e => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const card = document.querySelector(`.p4-card[data-id="${id}"]`);

    card.classList.remove("p4-correcta");
    card.classList.add("p4-error");

    zonaMentalista.appendChild(card);

    caja.classList.add("p4-error");

    panelFunciones.textContent =
      "Has tratado lenguaje como algo 'dentro'. Revisa: es acción del organismo.";

    mensajeFinal.textContent = "";
  });

  function checkCaja() {
    if (correctas >= 6) {
      caja.classList.add("p4-caja-rota");
      mensajeFinal.textContent =
        "El lenguaje no vive dentro de la mente. Vive en lo que hacemos: abierto o encubierto, siempre conducta.";
    }
  }

  btnReset.addEventListener("click", () => {
    correctas = 0;

    mensajeFinal.textContent = "";
    panelFunciones.textContent = "";

    caja.classList.remove("p4-error", "p4-caja-rota");

    const tarjetas = document.querySelector(".p4-tarjetas");
    cards.forEach(c => {
      c.classList.remove("p4-error", "p4-correcta");
      tarjetas.appendChild(c);
    });
  });

});
