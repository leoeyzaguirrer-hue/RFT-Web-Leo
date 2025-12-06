// ============================================================
// EJERCICIO P3 · GENERADOR DE RELACIONES ARBITRARIAS
// A → B (arrastre y selección) + derivación automática B → C
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  const svg = document.querySelector(".p3-svg");
  const palabras = document.querySelectorAll(".p3-item-A");
  const emociones = document.querySelectorAll(".p3-item-B");
  const conductas = document.querySelectorAll(".p3-item-C");
  const resultado = document.querySelector(".p3-resultado");
  const btnReset = document.querySelector(".p3-btn-reset");

  // Derivaciones automáticas (B → C)
  const derivaciones = {
    estres: "prepararse",
    alivio: "acercarse",
    miedo: "evitar",
    logro: "acercarse"
  };

  let enlacesAB = {};
  let enlacesBC = {};
  let reformulaciones = 0;

  // Selección de emociones
  emociones.forEach((emo) => {
    emo.addEventListener("click", () => {
      emociones.forEach(e => e.classList.remove("p3-seleccionada"));
      emo.classList.add("p3-seleccionada");
    });
  });

  // Click en palabra A → se crea vínculo A–B si hay una emoción seleccionada
  palabras.forEach((pal) => {
    pal.addEventListener("click", () => {
      const emo = document.querySelector(".p3-item-B.p3-seleccionada");
      if (!emo) return;

      const idA = pal.dataset.id;
      const idB = emo.dataset.id;

      enlacesAB[idA] = idB;

      dibujarLineaAB(pal, emo);

      // Derivación automática a C
      const idC = derivaciones[idB];
      const nodoC = document.querySelector(`.p3-item-C[data-id="${idC}"]`);

      enlacesBC[idA] = idC;
      dibujarLineaBC(emo, nodoC);

      verificarProgreso();
    });
  });

  // ----------------------------------------------------------
  // DIBUJAR LÍNEAS
  // ----------------------------------------------------------

  function posCentro(el) {
    const r = el.getBoundingClientRect();
    return {
      x: r.left + r.width / 2 + window.scrollX,
      y: r.top + r.height / 2 + window.scrollY
    };
  }

  function dibujarLineaAB(a, b) {
    const p1 = posCentro(a);
    const p2 = posCentro(b);

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.classList.add("p3-linea-AB");
    line.setAttribute("x1", p1.x);
    line.setAttribute("y1", p1.y);
    line.setAttribute("x2", p2.x);
    line.setAttribute("y2", p2.y);

    svg.appendChild(line);
  }

  function dibujarLineaBC(b, c) {
    const p1 = posCentro(b);
    const p2 = posCentro(c);

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.classList.add("p3-linea-BC");
    line.setAttribute("x1", p1.x);
    line.setAttribute("y1", p1.y);
    line.setAttribute("x2", p2.x);
    line.setAttribute("y2", p2.y);

    svg.appendChild(line);
  }

  // ----------------------------------------------------------
  // VERIFICAR PROGRESO
  // ----------------------------------------------------------

  function verificarProgreso() {
    const total = Object.keys(enlacesAB).length;

    if (total >= 3) {
      resultado.textContent =
        "Has modificado funciones lingüísticas. El lenguaje es red de relaciones aprendidas.";
    }
  }

  // ----------------------------------------------------------
  // REINICIAR
  // ----------------------------------------------------------

  btnReset.addEventListener("click", () => {
    enlacesAB = {};
    enlacesBC = {};
    reformulaciones = 0;

    svg.innerHTML = "";
    resultado.textContent = "";

    emociones.forEach(e => e.classList.remove("p3-seleccionada"));
  });

});
