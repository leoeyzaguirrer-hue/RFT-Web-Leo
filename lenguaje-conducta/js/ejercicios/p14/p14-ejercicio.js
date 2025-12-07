document.addEventListener("DOMContentLoaded", () => {

  const palabraSpan = document.getElementById("p14-palabra-actual");
  const figuras = document.querySelectorAll(".p14-figura");
  const barra = document.getElementById("p14-barra");
  const feedback = document.querySelector(".p14-feedback");

  const btnFase = document.querySelector(".p14-btn-fase");
  const btnReset = document.querySelector(".p14-btn-reset");

  const relaciones = {
    ZUG: "azul",
    MIP: "rojo",
    TAV: "amarillo"
  };

  const orden = ["ZUG", "MIP", "TAV"];
  let indice = 0;
  let nivel = 0;
  let enPrueba = false;

  function actualizarPalabra() {
    palabraSpan.textContent = orden[indice];
  }

  function manejarSeleccion(figura) {
    const palabra = orden[indice];
    const correcta = relaciones[palabra];

    if (!enPrueba) {

      if (figura === correcta) {
        feedback.textContent = "Correcto: se refuerza la relación.";
        feedback.style.color = "#2a7c4f";
        nivel += 15;
        barra.style.width = nivel + "%";

        indice++;
        if (indice < orden.length) {
          setTimeout(actualizarPalabra, 700);
        } else {
          feedback.textContent =
            "Fase de entrenamiento completada. Has construido la relación.";
        }

      } else {
        feedback.textContent =
          "Respuesta incorrecta. Observa la figura correcta.";
        feedback.style.color = "#b83232";
      }

    } else {

      if (figura === relaciones[palabra]) {
        feedback.textContent =
          "Correcto: este símbolo ahora funciona como estímulo.";
        feedback.style.color = "#2a7c4f";
      } else {
        feedback.textContent =
          "Aún no se ha consolidado la historia de reforzamiento.";
        feedback.style.color = "#b83232";
      }

    }
  }

  figuras.forEach(btn => {
    btn.addEventListener("click", () => {
      manejarSeleccion(btn.dataset.id);
    });
  });

  btnFase.addEventListener("click", () => {
    enPrueba = true;
    indice = 0;
    nivel = 70;
    barra.style.width = nivel + "%";
    feedback.textContent =
      "Ahora estás en fase de prueba: no recibirás refuerzo directo.";
  });

  btnReset.addEventListener("click", () => {
    indice = 0;
    nivel = 0;
    enPrueba = false;
    barra.style.width = "0%";
    feedback.textContent = "";
    actualizarPalabra();
  });

  actualizarPalabra();

});
