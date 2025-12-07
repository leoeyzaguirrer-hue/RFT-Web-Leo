document.addEventListener("DOMContentLoaded", () => {

  const palabras = document.querySelectorAll(".p13-palabra");
  const dropZona = document.querySelector(".p13-drop-zona");

  const barra = document.getElementById("p13-barra-fisio");
  const impulso = document.getElementById("p13-impulso");

  const botonesResp = document.querySelectorAll(".p13-opciones button");
  const feedback = document.querySelector(".p13-feedback");
  const btnReset = document.querySelector(".p13-btn-reset");

  let palabraActual = null;
  let respuestaElegida = null;
  let estimuloElegido = null;

  const datos = {
    peligro: { fisio: 90, impulso: "Evitar", conducta: "evitar" },
    abrazo: { fisio: 25, impulso: "Acercarse", conducta: "acercarse" },
    examen: { fisio: 80, impulso: "Congelarse", conducta: "congelarse" },
    diagnostico: { fisio: 75, impulso: "Buscar ayuda", conducta: "buscar" },
    exito: { fisio: 40, impulso: "Acercarse", conducta: "acercarse" },
    fracaso: { fisio: 85, impulso: "Evitar", conducta: "evitar" }
  };

  palabras.forEach(p => {
    p.addEventListener("dragstart", e => {
      e.dataTransfer.setData("palabra", p.dataset.id);
    });
  });

  dropZona.addEventListener("dragover", e => e.preventDefault());

  dropZona.addEventListener("drop", e => {
    e.preventDefault();
    palabraActual = e.dataTransfer.getData("palabra");

    barra.style.width = datos[palabraActual].fisio + "%";
    impulso.textContent = datos[palabraActual].impulso;

    feedback.textContent = "Ahora selecciona la conducta más probable y si hubo estímulo físico.";
  });

  botonesResp.forEach(btn => {
    btn.addEventListener("click", () => {

      if (btn.dataset.id) {
        respuestaElegida = btn.dataset.id;
      }

      if (btn.dataset.estimulo) {
        estimuloElegido = btn.dataset.estimulo;
      }

      if (respuestaElegida && estimuloElegido && palabraActual) {

        const correctaConducta = datos[palabraActual].conducta === respuestaElegida;
        const correctoEstimulo = estimuloElegido === "no";

        if (correctaConducta && correctoEstimulo) {
          feedback.textContent =
            "Correcto: la palabra está funcionando como contexto relacional sin estímulo físico presente.";
          feedback.style.color = "#2a7c4f";
        } else {
          feedback.textContent =
            "Observa: no hubo estímulo físico. La reacción fue evocada por la red relacional de la palabra.";
          feedback.style.color = "#b83232";
        }
      }
    });
  });

  btnReset.addEventListener("click", () => {
    barra.style.width = "0%";
    impulso.textContent = "—";
    feedback.textContent = "";
    palabraActual = null;
    respuestaElegida = null;
    estimuloElegido = null;
  });

});
