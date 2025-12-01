// p8.js — Lógica del Quiz final del módulo

document.addEventListener("DOMContentLoaded", () => {

  const quizButtons = document.querySelectorAll(".ua-quiz-btn");
  const resultBox = document.getElementById("ua-quiz-result");
  const resetBtn = document.getElementById("ua-quiz-reset");

  let score = 0;
  let answered = 0;

  quizButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("ua-correct") || btn.classList.contains("ua-wrong")) {
        return; // evitar doble click
      }

      const correct = btn.dataset.correct === "true";
      answered++;

      if (correct) {
        btn.classList.add("ua-correct");
        score++;
      } else {
        btn.classList.add("ua-wrong");
      }

      if (answered >= 4) {
        if (score === 4) {
          resultBox.textContent = "Excelente. Integraste todos los conceptos del módulo.";
          resultBox.classList.add("ua-result-good");
        } else {
          resultBox.textContent = "Puedes reforzar algunos conceptos. Reintenta el quiz.";
          resultBox.classList.add("ua-result-bad");
        }
      }
    });
  });

  // Reiniciar quiz
  resetBtn.addEventListener("click", () => {
    score = 0;
    answered = 0;
    resultBox.textContent = "";
    resultBox.classList.remove("ua-result-good", "ua-result-bad");

    quizButtons.forEach(btn => {
      btn.classList.remove("ua-correct", "ua-wrong");
    });
  });

});
document.querySelectorAll(".ua-acc-header").forEach(btn => {
    btn.addEventListener("click", () => {
        const panel = btn.nextElementSibling;
        btn.classList.toggle("active");
        panel.classList.toggle("open");
    });
});
