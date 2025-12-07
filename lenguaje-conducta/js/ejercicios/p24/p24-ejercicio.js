document.addEventListener("DOMContentLoaded", () => {

  const trainBtns = document.querySelectorAll(".p24-train");
  const testBtns = document.querySelectorAll(".p24-test");
  const feedback = document.getElementById("p24-feedback");
  const cierre = document.getElementById("p24-cierre");
  const reiniciar = document.getElementById("p24-reiniciar");

  const nodos = {
    A: document.getElementById("nodoA"),
    B: document.getElementById("nodoB"),
    C: document.getElementById("nodoC"),
    D: document.getElementById("nodoD")
  };

  const entrenadas = new Set();

  trainBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const rel = btn.dataset.rel;
      entrenadas.add(rel);
      btn.disabled = true;

      nodos[rel[0]].classList.add("p24-activo");
      nodos[rel[1]].classList.add("p24-activo");

      feedback.textContent = `✔ Relación ${rel[0]} → ${rel[1]} entrenada.`;
      cierre.textContent = "";
    });
  });

  testBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const test = btn.dataset.test;

      let correcta = false;
      let tipo = "";

      if (test === "AC" && entrenadas.has("AB") && entrenadas.has("BC")) {
        correcta = true;
        tipo = "Transitividad";
      }
      if (test === "BD" && entrenadas.has("BC") && entrenadas.has("CD")) {
        correcta = true;
        tipo = "Transitividad";
      }
      if (test === "AD" && entrenadas.has("AB") && entrenadas.has("BC") && entrenadas.has("CD")) {
        correcta = true;
        tipo = "Equivalencia";
      }
      if (test === "DA" && entrenadas.has("AB")) {
        correcta = true;
        tipo = "Simetría";
      }

      if (correcta) {
        feedback.textContent = `✅ Correcto. Relación derivada por ${tipo}.`;
        cierre.textContent =
          "Así es como el organismo genera relaciones nuevas sin entrenamiento directo. " +
          "Este es el núcleo de la equivalencia de estímulos y el puente formal hacia la RFT.";
      } else {
        feedback.textContent =
          "❌ Aún no se puede derivar esta relación. Observa qué relaciones has entrenado.";
        cierre.textContent = "";
      }
    });
  });

  reiniciar.addEventListener("click", () => {
    entrenadas.clear();
    trainBtns.forEach(b => (b.disabled = false));
    testBtns.forEach(b => (b.disabled = false));
    Object.values(nodos).forEach(n => n.classList.remove("p24-activo"));
    feedback.textContent = "";
    cierre.textContent = "";
  });

});
