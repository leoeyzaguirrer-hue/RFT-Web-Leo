const intro = document.getElementById("intro");
const trial = document.getElementById("trial");
const btnStart = document.getElementById("btnStart");

const sampleBox = document.getElementById("sample");
const choicesGrid = document.getElementById("choices");
const feedback = document.getElementById("feedback");

const trialPhase = document.getElementById("trialPhase");
const trialCount = document.getElementById("trialCount");

const A = ["🔵", "🔴", "🟢"];
const B = ["UNO", "DOS", "TRES"];
const C = ["⭐", "❤️", "🌙"];

let phase = "AB";
let index = 0;

const relationsAB = {
  "🔵": "UNO",
  "🔴": "DOS",
  "🟢": "TRES"
};

const relationsBC = {
  "UNO": "⭐",
  "DOS": "❤️",
  "TRES": "🌙"
};

btnStart.onclick = () => {
  intro.classList.remove("active");
  trial.classList.add("active");
  runTrial();
};

function runTrial() {
  feedback.textContent = "";
  trialPhase.textContent = phase === "AB" ? "Entrenamiento AB" : phase === "BC" ? "Entrenamiento BC" : "Pruebas";
  trialCount.textContent = `Ensayo ${index + 1}`;

  sampleBox.textContent = phase === "AB" ? A[index % 3] :
                          phase === "BC" ? B[index % 3] :
                          A[index % 3];

  let correct =
    phase === "AB" ? relationsAB[sampleBox.textContent] :
    phase === "BC" ? relationsBC[sampleBox.textContent] :
    relationsBC[relationsAB[sampleBox.textContent]];

  let pool = phase === "AB" ? B : phase === "BC" ? C : C.slice();

  renderChoices(pool, correct);
}

function renderChoices(pool, correct) {
  choicesGrid.innerHTML = "";

  let shuffled = [...pool].sort(() => Math.random() - 0.5);

  shuffled.forEach(item => {
    let div = document.createElement("div");
    div.className = "choice";
    div.textContent = item;

    div.onclick = () => evaluate(item, correct);
    choicesGrid.appendChild(div);
  });
}

function evaluate(selected, correct) {
  if (selected === correct) {
    feedback.textContent = "✅ Respuesta correcta";
    index++;

    if (index === 6 && phase === "AB") {
      phase = "BC";
      index = 0;
    }
    else if (index === 6 && phase === "BC") {
      phase = "TEST";
      index = 0;
    }

    setTimeout(runTrial, 800);
  } else {
    feedback.textContent = "❌ Incorrecto, intenta nuevamente";
  }
}
