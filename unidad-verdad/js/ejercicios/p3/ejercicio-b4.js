document.addEventListener("DOMContentLoaded", () => {

  const zonas = document.querySelectorAll(".zona");
  const modal = document.getElementById("modal-criterio");
  const panel = document.getElementById("panel-pragmatismo");
  const btnReiniciar = document.getElementById("btn-reiniciar-mapa");

  let orden = [];
  let visitadas = {
    corresp: false,
    coher: false,
    mec: false
  };

  const modalTitulo = document.getElementById("modal-titulo");
  const modalEjemplo = document.getElementById("modal-ejemplo");
  const modalSupuesto = document.getElementById("modal-supuesto");
  const modalLimitacion = document.getElementById("modal-limitacion");
  const modalCerrar = document.getElementById("modal-cerrar");
  const ordenTexto = document.getElementById("orden-exploracion");

  const datos = {
    corresp: {
      titulo: "🏛️ Correspondencia",
      ejemplo: "“Depresión causada por un fallo serotoninérgico.”",
      supuesto: "La teoría refleja una realidad interna preexistente.",
      limitacion: "No siempre indica qué hacer clínicamente."
    },
    coher: {
      titulo: "📚 Coherencia",
      ejemplo: "“El comportamiento encaja en la etapa 3 del desarrollo.”",
      supuesto: "Verdadero = integrarse en el sistema teórico.",
      limitacion: "Ordena la narrativa, pero no guía acción."
    },
    mec: {
      titulo: "⚙️ Mecanicismo",
      ejemplo: "“Sesgo cognitivo produce evitación.”",
      supuesto: "Conducta causada por engranajes internos.",
      limitacion: "No capta la variación contextual."
    }
  };

  zonas.forEach(z => {
    z.addEventListener("click", () => {
      const tipo = z.dataset.zona;
      const info = datos[tipo];

      modalTitulo.textContent = info.titulo;
      modalEjemplo.textContent = info.ejemplo;
      modalSupuesto.textContent = info.supuesto;
      modalLimitacion.textContent = info.limitacion;
      modal.classList.remove("oculto");

      if (!visitadas[tipo]) {
        visitadas[tipo] = true;
        orden.push(info.titulo);
      }

      z.classList.add("visitada");
      revisarDesbloqueo();
    });
  });

  modalCerrar.addEventListener("click", () => modal.classList.add("oculto"));

  function revisarDesbloqueo() {
    if (visitadas.corresp && visitadas.coher && visitadas.mec) {
      panel.style.display = "block";
      ordenTexto.textContent = "Orden de exploración: " + orden.join(" → ");
    }
  }

  btnReiniciar.addEventListener("click", () => {
    modal.classList.add("oculto");
    panel.style.display = "none";

    zonas.forEach(z => z.classList.remove("visitada"));
    orden = [];
    visitadas = { corresp: false, coher: false, mec: false };
  });

});
