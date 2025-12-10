const questions = [
  { q: "¿Quién eres tú?", opts: ["Yo","Tú"], correct: 0 },
  { q: "¿Dónde estás ahora?", opts: ["Aquí","Allá"], correct: 0 },
  { q: "¿Qué momento es hoy?", opts: ["Ahora","Entonces"], correct: 0 },
  { q: "¿Dónde estuviste ayer?", opts: ["Aquí","Allá"], correct: 1 },
  { q: "¿Quién eres ahora?", opts: ["La misma persona","Alguien distinto"], correct: 0 }
];

let index = 0;
let clarity = 0;

const adultQuestion = document.getElementById("adultQuestion");
const answerOptions = document.getElementById("answerOptions");
const claridadLabel = document.getElementById("claridadLabel");
const nextButton = document.getElementById("nextButton");
const resetButton = document.getElementById("resetButton");
const deicticContainer = document.getElementById("deicticContainer");
const childFace = document.getElementById("childFace");
const finalOverlay = document.getElementById("finalOverlay");

function render() {
  adultQuestion.textContent = questions[index].q;
  answerOptions.innerHTML = "";
  nextButton.disabled = true;

  questions[index].opts.forEach((opt,i)=>{
    const b = document.createElement("button");
    b.textContent = opt;
    b.className = "fy-answer-button";
    b.onclick = ()=>handle(i);
    answerOptions.appendChild(b);
  });
}

function handle(i){
  if(i===questions[index].correct){
    clarity += 20;
    claridadLabel.textContent = clarity+"%";

    if(clarity>=20){
      deicticContainer.classList.add("fy-visible");
    }
    if(clarity>=60){
      childFace.classList.add("fy-face-clear");
    }

    nextButton.disabled=false;
  }
}

nextButton.onclick=()=>{
  if(index<questions.length-1){
    index++;
    render();
  } else {
    finalOverlay.classList.add("active");
  }
};

resetButton.onclick=()=>location.reload();

render();
