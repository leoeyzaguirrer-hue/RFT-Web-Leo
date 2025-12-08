let fase = 1;
let contador = 0;
let estimuloActual = "TA";

const estimulo = document.getElementById("estimuloMuestra");
const feedback = document.getElementById("feedback");
const contadorSpan = document.getElementById("contador");
const btnEnsayo = document.getElementById("btnEnsayo");
const btnContinuar = document.getElementById("btnContinuar");
const titulo = document.getElementById("tituloFase");
const subtitulo = document.getElementById("subtituloFase");
const teoria = document.getElementById("teoria");
const tarjetas = document.querySelectorAll(".tarjeta");

const clavesFase1 = {
  "TA": "CUADRADO",
  "KE": "CIRCULO"
};

btnEnsayo.addEventListener("click", () => {
  estimuloActual = estimuloActual === "TA" ? "KE" : "TA";
  estimulo.textContent = estimuloActual;
  feedback.textContent = "—";
});

tarjetas.forEach(tarjeta => {
  tarjeta.addEventListener("click", () => {
    if (fase === 1) {
      let correcto = clavesFase1[estimuloActual] === tarjeta.dataset.respuesta;
      if (correcto) {
        feedback.textContent = "✔";
        contador++;
        contadorSpan.textContent = contador;
        if (contador >= 5) btnContinuar.classList.remove("oculto");
      } else {
        feedback.textContent = "❌";
      }
    }

    if (fase === 2) {
      if (tarjeta.dataset.respuesta === "FIGURA-X") {
        feedback.textContent = "✔ RESPUESTA DERIVADA";
      } else {
        feedback.textContent = "❌";
      }
    }
  });
});

btnContinuar.addEventListener("click", () => {
  fase = 2;

  titulo.textContent = "FASE 2 · COORDINACIÓN RELACIONAL";
  subtitulo.textContent = "Aparece la RRAA";

  estimulo.textContent = "TA";

  teoria.textContent = "Aquí aparece la Respuesta Relacional Arbitrariamente Aplicable (RRAA). El alumno debe derivar TA = FIGURA-X sin entrenamiento directo.";

  btnContinuar.classList.add("oculto");
  contadorSpan.textContent = "—";

  tarjetas[2].classList.remove("oculto");
});
