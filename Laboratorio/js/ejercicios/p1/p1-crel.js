const STIM = ["◎","◇","▢"];

const BLOQUES = [
  {
    nombre: "IGUAL",
    clave: "ES IGUAL A",
    pares: [[0,0],[1,1],[2,2]]
  },
  {
    nombre: "OPUESTO",
    clave: "ES OPUESTO A",
    pares: [[0,1],[1,0],[2,2]]
  },
  {
    nombre: "PARTE",
    clave: "ES PARTE DE",
    pares: [[0,2]]
  }
];

let bloque = 0;
let ensayo = 0;

const ctx = document.getElementById("crelContextLabel");
const sample = document.getElementById("crelSample");
const choices = document.querySelectorAll(".crel-choice");
const feedback = document.getElementById("crelFeedback");
const progress = document.getElementById("crelProgress");
const nextBtn = document.getElementById("crelNext");
const restartBtn = document.getElementById("crelRestart");

const mapOverlay = document.getElementById("crelMapOverlay");
const mapTitle = document.getElementById("crelMapTitle");
const mapText = document.getElementById("crelMapText");
const colA = document.getElementById("crelColA");
const colB = document.getElementById("crelColB");
const mapBtn = document.getElementById("crelMapBtn");

const endOverlay = document.getElementById("crelEndOverlay");
const toFase2 = document.getElementById("crelToFase2");

function mostrarMapa() {
  const B = BLOQUES[bloque];
  ctx.textContent = B.clave;
  mapTitle.textContent = `Clave: ${B.clave}`;
  mapText.textContent = `Relaciones activas en el bloque ${B.nombre}`;
  colA.innerHTML = "";
  colB.innerHTML = "";
  B.pares.forEach(p => {
    colA.innerHTML += `<div>${STIM[p[0]]}</div>`;
    colB.innerHTML += `<div>${STIM[p[1]]}</div>`;
  });
  mapOverlay.style.display = "flex";
}

function iniciarEnsayo() {
  const B = BLOQUES[bloque];
  const par = B.pares[ensayo % B.pares.length];
  sample.textContent = STIM[par[0]];
  const orden = [0,1,2].sort(()=>Math.random()-0.5);
  choices.forEach((btn,i)=>{
    btn.dataset.idx = orden[i];
    btn.querySelector("span").textContent = STIM[orden[i]];
  });
  progress.textContent = `Bloque ${bloque+1} · Ensayo ${ensayo+1}`;
  feedback.textContent = "Selecciona según la clave.";
  nextBtn.disabled = true;
}

choices.forEach(btn=>{
  btn.addEventListener("click",()=>{
    const B = BLOQUES[bloque];
    const par = B.pares[ensayo % B.pares.length];
    const correcto = par[1];
    if(parseInt(btn.dataset.idx)==correcto){
      feedback.textContent = "✔ Correcto";
    } else {
      feedback.textContent = "✖ Incorrecto";
    }
    nextBtn.disabled = false;
  });
});

nextBtn.onclick = ()=>{
  ensayo++;
  if(ensayo >= BLOQUES[bloque].pares.length){
    bloque++;
    ensayo = 0;
    if(bloque >= BLOQUES.length){
      endOverlay.style.display = "flex";
      return;
    }
    mostrarMapa();
    return;
  }
  iniciarEnsayo();
};

restartBtn.onclick = ()=>{
  bloque = 0;
  ensayo = 0;
  mostrarMapa();
};

mapBtn.onclick = ()=>{
  mapOverlay.style.display = "none";
  iniciarEnsayo();
};

toFase2.onclick = ()=>{
  window.location.href = "pantalla-2-cfunc.html";
};

mostrarMapa();
