/* ============================================================
   EJERCICIO P14 · DETECTOR DE REGLAS VIVAS
=============================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const reglas = document.querySelectorAll(".p14-tarjeta");
  const avatar = document.getElementById("p14-avatar");
  const accion = document.getElementById("p14-accion");
  const mapa = document.getElementById("p14-mapa-zone");
  const nodos = document.querySelectorAll(".p14-nodo");
  const resetBtn = document.getElementById("p14-reset");
  const historia = document.getElementById("p14-historia");
  const historiaTexto = document.getElementById("p14-historia-texto");
  const feedback = document.getElementById("p14-feedback");

  const barInner = document.getElementById("p14-bar-inner");
  const scoreSpan = document.getElementById("p14-score");

  let score = 0;
  let reglasAplicadas = 0;

  /* -----------------------------
     ACTUALIZAR MEDIDOR
  ----------------------------- */

  function actualizarMedidor() {
    if (score < 0) score = 0;
    if (score > 100) score = 100;

    scoreSpan.textContent = `${score}%`;
    barInner.style.width = `${score}%`;

    if (score < 35) {
      barInner.style.background = "#d9534f";
    } else if (score < 70) {
      barInner.style.background = "#f0ad4e";
    } else {
      barInner.style.background = "#5cb85c";
    }
  }

  actualizarMedidor();

  /* -----------------------------
     APLICAR UNA REGLA
  ----------------------------- */

  reglas.forEach(r => {
    r.addEventListener("dragstart", () => {
      r.classList.add("p14-dragging");
    });

    r.addEventListener("dragend", () => {
      r.classList.remove("p14-dragging");
    });
  });

  const avatarZone = document.getElementById("p14-avatar-zone");

  avatarZone.addEventListener("dragover", e => {
    e.preventDefault();
  });

  avatarZone.addEventListener("drop", (e) => {
    e.preventDefault();

    const regla = document.querySelector(".p14-dragging");
    if (!regla) return;

    const tipo = regla.dataset.tipo;

    reglasAplicadas++;
    regla.classList.add("usada");
    regla.setAttribute("draggable", "false");

    /* -------------------------
       REGLA RÍGIDA
    -------------------------- */
    if (tipo === "rigida") {
      avatar.style.transform = "translateX(-25px)";
      avatar.textContent = "😟";
      accion.textContent = "Evita";
      score -= 15;

      mapa.classList.remove("flexible", "ambiguo");
      mapa.classList.add("rigido");

      nodos.forEach(n => {
        n.style.background = "#d65a5a";
        n.style.transform = "scale(0.9)";
      });

      feedback.textContent = "Esta regla aumenta evitación y rigidez.";
    }

    /* -------------------------
       REGLA FLEXIBLE
    -------------------------- */
    if (tipo === "flexible") {
      avatar.style.transform = "translateX(25px)";
      avatar.textContent = "✨";
      accion.textContent = "Avanza hacia un valor";
      score += 20;

      mapa.classList.remove("rigido", "ambiguo");
      mapa.classList.add("flexible");

      nodos.forEach(n => {
        n.style.background = "#7bcf85";
        n.style.transform = "scale(1.2)";
      });

      feedback.textContent = "Esta regla abre espacio para acción valiosa.";
    }

    /* -------------------------
       CASO MIXTO (2 reglas)
    -------------------------- */

    if (reglasAplicadas === 2 && score >= 20 && score <= 60) {
      mapa.classList.remove("rigido", "flexible");
      mapa.classList.add("ambiguo");

      accion.textContent = "Explora con duda";
      avatar.textContent = "😐";
      feedback.textContent = "Las reglas aplicadas generan ambivalencia.";
    }

    /* -------------------------
       MOSTRAR MINI-HISTORIA
    -------------------------- */
    if (reglasAplicadas === 3) {
      historia.classList.remove("oculto");

      if (score < 30) {
        historiaTexto.textContent =
          "El personaje queda atrapado en evitación. Las reglas aplicadas refuerzan alejamiento del valor.";
      } else if (score < 70) {
        historiaTexto.textContent =
          "El personaje avanza un poco, pero sigue alternando entre evitación y compromiso.";
      } else {
        historiaTexto.textContent =
          "El personaje se mueve con claridad hacia su objetivo valioso gracias a reglas flexibles.";
      }
    }

    actualizarMedidor();
  });

  /* -------------------------
     REINICIO
  -------------------------- */

  resetBtn.addEventListener("click", () => {
    reglasAplicadas = 0;
    score = 0;

    avatar.textContent = "🙂";
    avatar.style.transform = "translateX(0)";
    accion.textContent = "—";

    reglas.forEach(r => {
      r.classList.remove("usada");
      r.setAttribute("draggable", "true");
    });

    mapa.classList.remove("rigido", "flexible", "ambiguo");
    nodos.forEach(n => {
      n.style.background = "#bfc7cd";
      n.style.transform = "scale(1)";
    });

    historia.classList.add("oculto");
    feedback.textContent = "Aplica tres reglas para ver cómo evoluciona la conducta del avatar.";

    actualizarMedidor();
  });

});
