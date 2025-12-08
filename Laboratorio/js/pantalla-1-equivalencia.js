const intro = document.getElementById("intro");
const trial = document.getElementById("trial");
const faseDIntro = document.getElementById("faseDIntro");
const trialD = document.getElementById("trialD");
const finalScreen = document.getElementById("final");

const startBtn = document.getElementById("startBtn");
const startD = document.getElementById("startD");

const sampleBox = document.getElementById("sample");
const choicesGrid = document.getElementById("choices");
const feedback = document.getElementById("feedback");

const sampleD = document.getElementById("sampleD");
const choicesD = document.getElementById("choicesD");
const feedbackD = document.getElementById("feedbackD");

const phaseLabel = document.getElementById("phaseLabel");
const trialCounter = document.getElementById("trialCounter");

const sim = document.getElementById("sim");
const trans = document.getElementById("trans");
const equiv = document.getElementById("equiv");

const A = ["🔵", "🔴", "🟢"];
const B = ["UNO", "DOS", "TRES"];
const C = ["⭐", "❤️", "🌙"];
const D = ["🔺", "🟧", "🟪"];

const AB = { "🔵": "UNO", "🔴": "DOS", "🟢": "TRES" };
const BC = { "UNO": "⭐", "DOS": "❤️", "TRES": "🌙" };

let phase = "AB";
let index = 0;

startBtn.onclick = () => {
  intro.classList.remove("active");
  trial.classList.add("active");
  runTrial();
};

function runTrial() {
  let sample, correct, pool;

  if (phase === "AB") {
    phaseLabel.textContent = "Entrenamiento AB";
    sample = A[index % 3];
    correct = AB[sample];
    pool = B;
  } else {
    phaseLabel.textContent = "Entrenamiento BC";
    sample = B[index % 3];
    correct = BC[sample];
    pool = C;
  }

  sampleBox.textContent = sample;
  trialCounter.textContent = `Ensayo ${index + 1}`;
  feedback.textContent = "";

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
    index++;
    feedback.textContent = "✅ Correcto";

    if (index === 6 && phase === "AB") {
      sim.textContent = "Simetría ✅";
      phase = "BC";
      index = 0;
    } else if (index === 6 && phase === "BC") {
      trans.textContent = "Transitividad ✅";
      equiv.textContent = "Equivalencia ✅";
      trial.classList.remove("active");
      faseDIntro.classList.add("active");
      return;
    }

    setTimeout(runTrial, 600);
  } else {
    feedback.textContent = "❌ Incorrecto";
  }
}

startD.onclick = () => {
  faseDIntro.classList.remove("active");
  trialD.classList.add("active");
  runTrialD();
};

let indexD = 0;
const pairsD = [
  ["🔺", "🔵"], ["🔵", "🔺"],
  ["🟧", "UNO"], ["UNO", "🟧"]
];

function runTrialD() {
  const pair = pairsD[indexD % pairsD.length];
  sampleD.textContent = pair[0];
  feedbackD.textContent = "";
  choicesD.innerHTML = "";

  let pool = [...A, ...B, ...D];

  pool.sort(() => Math.random() - 0.5).slice(0, 3).forEach(item => {
    const div = document.createElement("div");
    div.className = "choice";
    div.textContent = item;
    div.onclick = () => {
      if (item === pair[1]) {
        feedbackD.textContent = "✅ Derivado correctamente";
        indexD++;
        if (indexD === pairsD.length) {
          trialD.classList.remove("active");
          finalScreen.classList.add("active");
        } else {
          setTimeout(runTrialD, 700);
        }
      } else {
        feedbackD.textContent = "❌ Incorrecto";
      }
    };
    choicesD.appendChild(div);
  });
}
