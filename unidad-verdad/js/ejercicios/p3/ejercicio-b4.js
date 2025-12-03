document.addEventListener("DOMContentLoaded", () => {

  const zonas = document.querySelectorAll(".zona");
  const modal = document.getElementById("mapa-modal");
  const modalTitulo = document.getElementById("modal-titulo");
  const modalEjemplo = document.getElementById("modal-ejemplo");
  const modalSupuesto = document.getElementById("modal-supuesto");
  const modalLimitacion = document.getElementById("modal-limitacion");
  const modalClose = document.getElementById("modal-close");

  const panelCentral = document.getElementById("mapa-panel-central");
  const btnReiniciar = document.getElementById("mapa-reiniciar");

  let visitadas = {
    corresp: false,
    coher: false,
    mec: false
  };

  // Contenido de cada zona
  const datos = {
    corresp: {
      titulo: "🏛️ Correspondencia",
      ejemplo: "Ejemplo clínico: “Depresión causada por un fallo serotoninérgico.”",
      supuesto: "Supuesto: La teoría refleja una realidad interna.",
      limitacion: "Limitación: No siempre indica qué hacer en terapia."
    },
    coher: {
      titulo: "📚 Coherencia",
      ejemplo: "Ejemplo: “La conducta encaja en la etapa 3 del desarrollo.”",
      supuesto: "Supuesto: Verdadero = integrarse en el sistema teórico.",
      limitacion: "Limitación: Ordena, pero no transforma clínicamente."
    },
    mec: {
      titulo: "⚙️ Mecanicismo",
      ejemplo: "Ejemplo: “Sesgo cognitivo produce evitación.”",
      supuesto: "Supuesto: La conducta es causada por engranajes internos.",
      limitacion: "Limitación: No capta variación contextual en vivo."
    }
  };

  // Abrir modal al hacer clic en una zona
  zonas.forEach(z => {
    z.addEventListener("click", () => {
      const tipo = z.dataset.zona;
      const info = datos[tipo];

      modalTitulo.textContent = info.titulo;
      modalEjemplo.textContent = info.ejemplo;
      modalSupuesto.textContent = info.supuesto;
      modalLimitacion.textContent = info.limitacion;

      modal.classList.remove("oculto");
      z.classList.add("visitada");
      visitadas[tipo] = true;

      revisarDesbloqueo();
    });
  });

  // Cerrar modal
  modalClose.addEventListener("click", () => modal.classList.add("oculto"));

  // Desbloqueo de panel central
  function revisarDesbloqueo() {
    if (visitadas.corresp && visitadas.coher && visitadas.mec) {
      panelCentral.classList.remove("oculto");
    }
  }

  // Reiniciar mapa
  btnReiniciar.addEventListener("click", () => {
    modal.classList.add("oculto");
    panelCentral.classList.add("oculto");

    zonas.forEach(z => z.classList.remove("visitada"));

    visitadas = {
      corresp: false,
      coher: false,
      mec: false
    };
  });

});
