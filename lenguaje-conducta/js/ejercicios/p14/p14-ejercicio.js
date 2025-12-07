document.addEventListener("DOMContentLoaded", () => {

  const F1 = document.querySelector(".p14-fase-1");
  const F2 = document.querySelector(".p14-fase-2");
  const F3 = document.querySelector(".p14-fase-3");

  const simboloActual = document.querySelector(".p14-simbolo-actual");
  const simbolosPrueba = document.querySelector(".p14-simbolos-prueba");
  const palabraTransferencia = document.querySelector(".p14-palabra-transferencia");

  const fb1 = document.querySelector(".p14-feedback-f1");
  const fb2 = document.querySelector(".p14-feedback-f2");
  const fb3 = document.querySelector(".p14-feedback-f3");
  const msgFinal = document.querySelector(".p14-mensaje-final");

  const barra = document.querySelector(".p14-historia-progreso");
  const nivel = document.querySelector(".p14-historia-nivel");

  const btnReset = document.querySelector(".p14-btn-reset");

  const relaciones = {
    ZUG: "azul",
    MIP: "rojo",
    TAV: "amarillo"
  };

  const funciones = {
    azul: "peligro",
    rojo: "seguro",
    amarillo: "neutro"
  };

  const ordenSimbolos = Object.keys(relaciones);
  let indiceF1 = 0;
  let aciertosF2 = 0;
  let indiceF3 = 0;

  function actualizarHistoria(porcentaje, texto) {
    barra.style.width = porcentaje + "%";
    nivel.textContent = texto;
  }

  function cargarFase1() {
    simboloActual.textContent = ordenSimbolos[indiceF1];
    fb1.textContent = "";
  }

  document.querySelectorAll(".p14-fase-1 button").forEach(btn => {
    btn.addEventListener("click", () => {
      const simbolo = ordenSimbolos[indiceF1];
      const correcto = relaciones[simbolo];
      if (btn.dataset.fig === correcto) {
        indiceF1++;
        actualizarHistoria((indiceF1 / 3) * 100, "Entrenando");
        fb1.textContent = `Correcto: has establecido la relación ${simbolo} → ${correcto}.`;

        if (indiceF1 < ordenSimbolos.length) {
          setTimeout(cargarFase1, 800);
        } else {
          actualizarHistoria(100, "Alta");
          setTimeout(() => {
            F1.style.display = "none";
            F2.style.display = "block";
            simbolosPrueba.textContent = ordenSimbolos.join(" · ");
          }, 1200);
        }
      } else {
        fb1.textContent = "Respuesta incorrecta. Observa la relación que estás construyendo.";
      }
    });
  });

  document.querySelectorAll(".p14-fase-2 button").forEach(btn => {
    btn.addEventListener("click", () => {
      aciertosF2++;
      if (aciertosF2 >= 3) {
        F2.style.display = "none";
        F3.style.display = "block";
        cargarTransferencia();
      } else {
        fb2.textContent = "Sigue respondiendo sin retroalimentación directa.";
      }
    });
  });

  function cargarTransferencia() {
    const simbolos = [...ordenSimbolos];
    simbolos.sort(() => Math.random() - 0.5);
    palabraTransferencia.textContent = simbolos[indiceF3];
    fb3.textContent = "";
  }

  document.querySelectorAll(".p14-funciones-opciones button").forEach(btn => {
    btn.addEventListener("click", () => {
      const simbolo = palabraTransferencia.textContent;
      const figura = relaciones[simbolo];
      const funCorrecta = funciones[figura];

      if (btn.dataset.fun === funCorrecta) {
        fb3.textContent = "Correcto: la palabra heredó la función por su lugar en la red relacional.";
        indiceF3++;

        if (indiceF3 < 3) {
          setTimeout(cargarTransferencia, 900);
        } else {
          msgFinal.textContent =
            "Has vivido la transferencia de función: un símbolo sin significado ahora evoca funciones emocionales por su lugar en una red relacional.";
        }
      } else {
        fb3.textContent = "Observa la relación entrenada previamente entre símbolo y figura.";
      }
    });
  });

  btnReset.addEventListener("click", () => {
    indiceF1 = 0;
    indiceF3 = 0;
    aciertosF2 = 0;
    actualizarHistoria(0, "Baja");

    F1.style.display = "block";
    F2.style.display = "none";
    F3.style.display = "none";

    fb1.textContent = "";
    fb2.textContent = "";
    fb3.textContent = "";
    msgFinal.textContent = "";

    cargarFase1();
  });

  cargarFase1();

});
