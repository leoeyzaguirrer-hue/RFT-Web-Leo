// ============================================================
// P12 · MAPA EXPANDIBLE DE EPISODIOS VERBALES
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  const cont = document.querySelector(".p12-ejercicio-container");
  if (!cont) return;

  const opciones = document.querySelectorAll(".p12-opcion");
  const btnGenerar = document.querySelector(".p12-btn-generar");
  const feedbackOp = document.querySelector(".p12-feedback-op");

  const faseMapa = document.querySelector(".p12-fase-mapa");
  const mapa = document.querySelector(".p12-mapa");
  const feedbackMapa = document.querySelector(".p12-feedback-mapa");
  const msgFinal = document.querySelector(".p12-mensaje-final");

  const btnReset = document.querySelector(".p12-btn-reset");

  // ---------------- DATOS ----------------

  const funciones = {
    // tactos
    "dificil": "amenaza",
    "importante": "valor",
    "imposible": "evitacion",

    // mandos
    "estudiar-juntos": "acercamiento",
    "explicar-tema": "apoyo",
    "solo": "retiro",

    // reglas
    "fracaso": "rigidez",
    "bloques": "flexibilidad",
    "inutil": "evitacion"
  };

  // ---------------- SELECCIÓN ----------------

  opciones.forEach(op => {
    op.addEventListener("click", () => {
      if (op.classList.contains("p12-tact")) {
        document.querySelectorAll(".p12-tact").forEach(x => x.classList.remove("p12-selected"));
      }
      if (op.classList.contains("p12-mand")) {
        document.querySelectorAll(".p12-mand").forEach(x => x.classList.remove("p12-selected"));
      }
      if (op.classList.contains("p12-regla")) {
        document.querySelectorAll(".p12-regla").forEach(x => x.classList.remove("p12-selected"));
      }
      op.classList.add("p12-selected");
    });
  });

  // ---------------- GENERAR RED ----------------

  btnGenerar.addEventListener("click", () => {

    const tact = document.querySelector(".p12-tact.p12-selected");
    const mando = document.querySelector(".p12-mand.p12-selected");
    const regla = document.querySelector(".p12-regla.p12-selected");

    if (!tact || !mando || !regla) {
      feedbackOp.textContent = "Selecciona un tacto, un pedido y una regla.";
      feedbackOp.style.color = "#b83232";
      return;
    }

    feedbackOp.textContent = "";
    faseMapa.style.display = "block";
    mapa.innerHTML = "";
    feedbackMapa.textContent = "";

    // Crear nodos
    const nodos = [
      { txt: `Nombrar: ${tact.textContent}`, f: funciones[tact.dataset.id] },
      { txt: `Pedir: ${mando.textContent}`, f: funciones[mando.dataset.id] },
      { txt: `Regla: ${regla.textContent}`, f: funciones[regla.dataset.id] }
    ];

    nodos.forEach(n => {
      const nodo = document.createElement("div");
      nodo.classList.add("p12-nodo");
      nodo.textContent = `${n.txt} (${n.f})`;
      mapa.appendChild(nodo);
    });

    // Nodo final
    const final = document.createElement("div");
    final.classList.add("p12-nodo", "p12-nodo-final");

    // Clasificación de la red
    const fset = nodos.map(n => n.f);

    if (fset.includes("evitacion") && fset.includes("rigidez")) {
      final.textContent = "Red disfuncional → Evitación + Rigidez";
      feedbackMapa.textContent = "Tendencia a evitación: revisa la regla seleccionada.";
      feedbackMapa.style.color = "#b83232";

    } else if (fset.includes("flexibilidad") || fset.includes("valor") || fset.includes("acercamiento")) {
      final.textContent = "Red funcional → Flexibilidad + Acción valiosa";
      feedbackMapa.textContent = "La red promueve acercamiento y acción con sentido.";
      feedbackMapa.style.color = "#2a7c4f";

    } else {
      final.textContent = "Red mixta → Funciones contradictorias";
      feedbackMapa.textContent = "Observa cómo ciertos actos promueven valor y otros evitan.";
      feedbackMapa.style.color = "#d47a00";
    }

    mapa.appendChild(final);

    msgFinal.textContent =
      "Los episodios verbales mezclan nombrar, pedir y reglas. Cada elección transforma la red completa. Esto prepara el camino para equivalencia y marcos relacionales.";

  });

  // ---------------- REINICIAR ----------------

  btnReset.addEventListener("click", () => {

    opciones.forEach(op => op.classList.remove("p12-selected"));
    mapa.innerHTML = "";
    feedbackOp.textContent = "";
    feedbackMapa.textContent = "";
    msgFinal.textContent = "";
    faseMapa.style.display = "none";
  });

});
