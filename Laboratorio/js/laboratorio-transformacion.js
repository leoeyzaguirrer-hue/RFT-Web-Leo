// ============================================================
// LABORATORIO RFT · TRANSFORMACIÓN DE FUNCIONES · LÓGICA
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // --------- Utilidad básica para cambiar de fase ----------
  const phases = document.querySelectorAll(".lab-phase");

  const goToPhase = (num) => {
    phases.forEach((ph) => {
      ph.classList.toggle("active", ph.dataset.phase === String(num));
    });
    const activeInner = document.querySelector(".lab-phase.active .phase-inner");
    if (activeInner) activeInner.scrollTop = 0;
  };

  // ============================================================
  // FASE 1 -> FASE 2
  // ============================================================

  const btnF1Next = document.getElementById("btnF1Next");
  if (btnF1Next) {
    btnF1Next.addEventListener("click", () => {
      goToPhase(2);
    });
  }

  // ============================================================
  // FASE 2 · Funciones de la Naranja
  // ============================================================

  const listaFunciones = document.getElementById("listaFunciones");
  const btnAgregarFuncion = document.getElementById("btnAgregarFuncion");
  const btnF2Next = document.getElementById("btnF2Next");

  const funcionesNaranja = [
    "Sabor dulce",
    "Sabor ácido",
    "Olor dulce cítrico",
    "Color naranja intenso",
    "Textura rugosa de la cáscara",
    "Textura húmeda y blanda de la pulpa",
    "Jugosidad",
    "Produce ganas de comer"
  ];

  let indiceFuncion = 0;

  const agregarSiguienteFuncion = () => {
    if (!listaFunciones || indiceFuncion >= funcionesNaranja.length) return;

    const li = document.createElement("li");
    li.textContent = funcionesNaranja[indiceFuncion];
    listaFunciones.appendChild(li);
    indiceFuncion += 1;

    // Cuando se hayan agregado todas las funciones
    if (indiceFuncion >= funcionesNaranja.length) {
      if (btnAgregarFuncion) {
        btnAgregarFuncion.disabled = true;
      }
      if (btnF2Next) {
        btnF2Next.disabled = false;
      }
    }
  };

  if (btnAgregarFuncion) {
    btnAgregarFuncion.addEventListener("click", agregarSiguienteFuncion);
  }

  if (btnF2Next) {
    btnF2Next.addEventListener("click", () => {
      goToPhase(3);
    });
  }

  // ============================================================
  // FASE 3 · Coordinación “Un ZATRAX es una NARANJA”
  // ============================================================

  const btnF3Next = document.getElementById("btnF3Next");
  if (btnF3Next) {
    btnF3Next.addEventListener("click", () => {
      goToPhase(4);
    });
  }

  // ============================================================
  // FASE 4 · Transformación de funciones en ZATRAX
  // ============================================================

  const listaEfectos = document.getElementById("listaEfectos");
  const btnMostrarEfecto = document.getElementById("btnMostrarEfecto");
  const btnReiniciar = document.getElementById("btnReiniciar");
  const textoExplicacion = document.getElementById("textoExplicacion");

  const efectosZatrax = [
    { emoji: "🤤", texto: "Salivación" },
    { emoji: "❄️👄", texto: "Sensación de frescura en la boca" },
    { emoji: "🔥🍽️", texto: "Deseo de comer" },
    { emoji: "😝💥", texto: "Sensación ácida lingual" }
  ];

  let indiceEfecto = 0;

  const mostrarSiguienteEfecto = () => {
    if (!listaEfectos || indiceEfecto >= efectosZatrax.length) return;

    const efecto = efectosZatrax[indiceEfecto];
    const li = document.createElement("li");

    const spanEmoji = document.createElement("span");
    spanEmoji.className = "efecto-emoji";
    spanEmoji.textContent = efecto.emoji;

    const spanTexto = document.createElement("span");
    spanTexto.textContent = efecto.texto;

    li.appendChild(spanEmoji);
    li.appendChild(spanTexto);

    listaEfectos.appendChild(li);
    indiceEfecto += 1;

    // Cuando se hayan mostrado todos los efectos
    if (indiceEfecto >= efectosZatrax.length) {
      if (btnMostrarEfecto) {
        btnMostrarEfecto.disabled = true;
      }
      if (textoExplicacion) {
        textoExplicacion.style.display = "block";
      }
    }
  };

  if (btnMostrarEfecto) {
    btnMostrarEfecto.addEventListener("click", mostrarSiguienteEfecto);
  }

  // ============================================================
  // REINICIAR LABORATORIO
  // ============================================================

  if (btnReiniciar) {
    btnReiniciar.addEventListener("click", () => {
      window.location.reload();
    });
  }
});
