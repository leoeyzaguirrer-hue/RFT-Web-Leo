const intro = document.getElementById("intro");
const trial = document.getElementById("trial");
const faseD = document.getElementById("faseD");

const startBtn = document.getElementById("startBtn");
const startD = document.getElementById("startD");

const sampleBox = document.getElementById("sample");
const choicesGrid = document.getElementById("choices");
const feedback = document.getElementById("feedback");

const phaseLabel = document.getElementById("phaseLabel");
const trialCounter = document.getElementById("trialCounter");

const reflex = document.getElementById("reflex");
const sim = document.getElementById("sim");
const trans = document.getElementById("trans");
const equiv = document.getElementById("equiv");

const A = ["🔵", "🔴", "🟢"];
const B = ["UNO", "DOS", "TRES"];
const C = ["⭐", "❤️", "🌙"];
const D = ["✴️", "🔺", "🟪"];

const AB = { "🔵": "UNO", "🔴": "DOS", "🟢": "TRES" };
const BC = { "UNO": "⭐", "DOS": "❤️", "TRES": "🌙" };
const CD = { "⭐": "✴️", "❤️": "🔺", "🌙": "🟪" };

let phase = "AB";
let index = 0;

startBtn.onclick = () => {
  intro.classList.remove("active");
  trial.classList.add("active");
  runTrial();
};

function runTrial() {
  feedback.textContent = "";
  phaseLabel.textContent = phase;
  trialCounter.textContent = `Ensayo ${index + 1}`;

  let sample, correct, pool;

  if (phase === "AB") {
    sample = A[index % 3];
    correct = AB[sample];
    pool = B;
  } else if (phase === "BC") {
    sample = B[index % 3];
    correct = BC[sample];
    pool = C;
  } else {
    faseD.classList.add("active");
    trial.classList.remove("active");
    return;
  }

  sampleBox.textContent = sample;
  renderChoices(pool, correct);
}

function renderChoices(pool, correct) {
  choicesGrid.innerHTML = "";
  const shuffled = [...pool].sort(() => Math.random() - 0.5);

  shuffled.forEach(item => {
    const div = document.createElement("div");
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
      sim.textContent = "Simetría ✅";
      phase = "BC";
      index = 0;
    } 
    else if (index === 6 && phase === "BC") {
      trans.textContent = "Transitividad ✅";
      equiv.textContent = "Equivalencia ✅";
      phase = "D";
    }

    setTimeout(runTrial, 600);
  } else {
    feedback.textContent = "❌ Incorrecto";
  }
}

startD.onclick = () => {
  alert("Con una sola relación CD, toda la clase se amplía por transferencia de funciones.");
};
