// ============================================================
// EJERCICIO P2 · SIMULADOR DE FUNCIONES DEL ENUNCIADO
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  const escenarios = {
    examen: {
      titulo: "🧪 Examen de la universidad",
      funcionCorrecta: "evitacion",
      consecuencia: "Alivio momentáneo (evitación)."
    },
    sesion: {
      titulo: "💬 Sesión terapéutica",
      funcionCorrecta: "ayuda",
      consecuencia: "Acceso a recursos (pedir ayuda)."
    }
  };

  const botonesContexto = document.querySelectorAll(".p2-btn-contexto");
  const escenarioBox = document.querySelector(".p2-escenario");
  const tituloEscenario = document.querySelector(".p2-escenario-titulo");
  const feedbackFuncion = document.querySelector(".p2-feedback-funcion");
  const consecuenciaBox = document.querySelector(".p2-consecuencia");
  const mensajeFinal = document.querySelector(".p2-mensaje-final");
  const avatar = document.querySelector(".p2-avatar");
  const monitorBar = document.querySelector(".p2-monitor-bar");
  const cardsFuncion = document.querySelectorAll(".p2-funcion-card");
  const btnReset = document.querySelector(".p2-btn-reset");

  let contextoSeleccionado = null;
  let resultados = { examen: false, sesion: false };

  // Activar contexto
  botonesContexto.forEach((btn) => {
    btn.addEventListener("click", () => {
      contextoSeleccionado = btn.dataset.contexto;
      const data = escenarios[contextoSeleccionado];

      escenarioBox.classList.remove("p2-escenario-oculto");
      tituloEscenario.textContent = data.titulo;

      feedbackFuncion.textContent = "";
      consecuenciaBox.textContent = "";

      // Reset visual
      cardsFuncion.forEach(card => {
        card.classList.remove("p2-correcta", "p2-incorrecta");
      });
    });
  });

  // Selección de función
  cardsFuncion.forEach((card) => {
    card.addEventListener("click", () => {
      if (!contextoSeleccionado) return;

      const seleccion = card.dataset.funcion;
      const clave = escenarios[contextoSeleccionado].funcionCorrecta;

      // Reset visual de las tarjetas
      cardsFuncion.forEach(c => c.classList.remove("p2-correcta", "p2-incorrecta"));

      if (seleccion === clave) {
        card.classList.add("p2-correcta");
        feedbackFuncion.textContent = "Correcto: la función del enunciado depende del contexto.";

        consecuenciaBox.textContent = "Consecuencia: " + escenarios[contextoSeleccionado].consecuencia;

        resultados[contextoSeleccionado] = true;

        avatar.style.filter = "brightness(1)";
      } else {
        card.classList.add("p2-incorrecta");
        feedbackFuncion.textContent = "Revisa: no es el contenido, sino la función lo que cambia.";
        consecuenciaBox.textContent = "";
        avatar.style.filter = "grayscale(0.4)";
      }

      verificarFinal();
    });
  });

  function verificarFinal() {
    if (resultados.examen && resultados.sesion) {
      mensajeFinal.textContent =
        "La topografía es la misma. La función cambia todo. El lenguaje es conducta operante dentro de A–B–C.";
    }
  }

  // Reiniciar ejercicio
  btnReset.addEventListener("click", () => {
    contextoSeleccionado = null;
    resultados = { examen: false, sesion: false };
    escenarioBox.classList.add("p2-escenario-oculto");

    feedbackFuncion.textContent = "";
    consecuenciaBox.textContent = "";
    mensajeFinal.textContent = "";

    cardsFuncion.forEach(card => {
      card.classList.remove("p2-correcta", "p2-incorrecta");
    });

    avatar.style.filter = "brightness(1)";
  });

});
