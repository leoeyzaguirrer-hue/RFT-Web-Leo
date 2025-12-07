// ============================================================
// P10 · ORQUESTADOR DE MANDOS SOCIALES
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  const cont = document.querySelector(".p10-ejercicio-container");
  if (!cont) return;

  // -------- INTENCIÓN --------
  const intCards = document.querySelectorAll(".p10-int-card");
  const fbInt = document.querySelector(".p10-feedback-int");
  let intSeleccionada = null;

  intCards.forEach(card => {
    card.addEventListener("click", () => {
      intCards.forEach(c => c.classList.remove("p10-selected"));
      card.classList.add("p10-selected");
      intSeleccionada = card.dataset.id;
      fbInt.textContent = "Intención seleccionada: " + card.textContent;
      fbInt.style.color = "#2a7c4f";

      document.querySelector(".p10-fase-mando").style.display = "block";
    });
  });

  // -------- CONSTRUCCIÓN DEL MANDO --------

  const dropZones = document.querySelectorAll(".p10-drop-zone");
  const tarjetas = document.querySelectorAll(".p10-tarjeta");
  const fbMando = document.querySelector(".p10-feedback-mando");
  const btnEvalMando = document.querySelector(".p10-btn-evaluar-mando");

  let armado = { inicio: null, accion: null, objeto: null };

  tarjetas.forEach(t => {
    t.addEventListener("dragstart", e => {
      e.dataTransfer.setData("tipo", t.dataset.tipo);
      e.dataTransfer.setData("texto", t.textContent);
    });
  });

  dropZones.forEach(zone => {
    zone.addEventListener("dragover", e => e.preventDefault());

    zone.addEventListener("drop", e => {
      e.preventDefault();
      const tipo = e.dataTransfer.getData("tipo");
      const texto = e.dataTransfer.getData("texto");

      if (zone.dataset.slot !== tipo) {
        zone.classList.add("p10-drop-error");
        setTimeout(() => zone.classList.remove("p10-drop-error"), 900);
        return;
      }

      armado[tipo] = texto;
      zone.textContent = texto;
      zone.classList.add("p10-drop-ok");
    });
  });

  // Validación de mando
  btnEvalMando.addEventListener("click", () => {

    if (!armado.inicio || !armado.accion || !armado.objeto) {
      fbMando.textContent = "Debes completar las tres partes del mando.";
      fbMando.style.color = "#b83232";
      return;
    }

    fbMando.textContent = "Mando construido. Ahora selecciona un personaje.";
    fbMando.style.color = "#2a7c4f";

    document.querySelector(".p10-fase-personaje").style.display = "block";
  });

  // -------- PERSONAJES --------

  const personajes = document.querySelectorAll(".p10-p-card");
  const fbPers = document.querySelector(".p10-feedback-personaje");
  const msgFinal = document.querySelector(".p10-mensaje-final");

  personajes.forEach(p => {
    p.addEventListener("click", () => {
      personajes.forEach(px => px.classList.remove("p10-active"));
      p.classList.add("p10-active");

      const estado = p.dataset.estado;
      const mandoClaro = armado.inicio && armado.accion && armado.objeto;

      let funcionó = false;
      let razon = "";

      if (estado === "apurado") {
        funcionó = armado.inicio.includes("Pásame") || armado.inicio.includes("¿Podrías?");
        razon = funcionó
          ? "El mando fue breve y claro, adecuado para alguien apurado."
          : "La persona apurada necesita un mando claro y directo.";
      }

      if (estado === "cansado") {
        funcionó = armado.inicio.includes("Ayúdame") || armado.inicio.includes("Necesito");
        razon = funcionó
          ? "El tono suave o cooperativo funciona mejor con alguien cansado."
          : "El estado cansado responde mal a mandos bruscos.";
      }

      if (estado === "distraido") {
        funcionó = armado.accion.includes("traigas") || armado.accion.includes("abras");
        razon = funcionó
          ? "Acciones concretas ayudan a personas distraídas."
          : "Necesita acciones muy específicas para coordinar conducta.";
      }

      if (estado === "atento") {
        funcionó = true;
        razon = "La persona atenta responde bien a cualquier mando bien formado.";
      }

      fbPers.textContent = razon;
      fbPers.style.color = funcionó ? "#2a7c4f" : "#b83232";

      if (funcionó) {
        msgFinal.textContent =
          "Has visto cómo un mando coordina intención + formulación + estado del otro. Pedir reorganiza el mundo social, no solo nombra objetos.";
      }
    });
  });

  // -------- REINICIO --------

  document.querySelector(".p10-btn-reset").addEventListener("click", () => {

    // Intención
    intSeleccionada = null;
    intCards.forEach(c => c.classList.remove("p10-selected"));
    fbInt.textContent = "";

    // Mando
    armado = { inicio: null, accion: null, objeto: null };
    dropZones.forEach(z => {
      z.textContent = z.dataset.slot.charAt(0).toUpperCase() + z.dataset.slot.slice(1);
      z.classList.remove("p10-drop-ok","p10-drop-error");
    });
    fbMando.textContent = "";

    // Personajes
    personajes.forEach(p => p.classList.remove("p10-active"));
    fbPers.textContent = "";
    msgFinal.textContent = "";

    // Fases visibles
    document.querySelector(".p10-fase-mando").style.display = "none";
    document.querySelector(".p10-fase-personaje").style.display = "none";
  });

});
