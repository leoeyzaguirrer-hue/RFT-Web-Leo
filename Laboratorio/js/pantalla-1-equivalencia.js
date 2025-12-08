let contadorGlobal = 0;
const contadorSpan = document.getElementById("contadorGlobal");

function irAFase2() {
  document.getElementById("fase1").classList.remove("activa");
  document.getElementById("fase2").classList.add("activa");
  cargarEnsayo();
}

const ensayos = [
  { muestra: "🔵", correcto: "UNO", opciones: ["UNO", "DOS", "TRES"] },
  { muestra: "🟢", correcto: "TRES", opciones: ["DOS", "TRES", "UNO"] },
  { muestra: "🔴", correcto: "DOS", opciones: ["TRES", "UNO", "DOS"] },
  { muestra: "UNO", correcto: "🔵", opciones: ["🟢", "🔵", "🔴"] },
  { muestra: "DOS", correcto: "🔴", opciones: ["🔴", "🟢", "🔵"] },
  { muestra: "TRES", correcto: "🟢", opciones: ["🔵", "🟢", "🔴"] }
];

let ensayoActual = 0;

const tarjeta = document.getElementById("tarjetaMuestra");
const comparacionesDiv = document.getElementById("comparaciones");
const feedback = document.getElementById("feedback");

function cargarEnsayo() {
  const ensayo = ensayos[ensayoActual];
  tarjeta.textContent = ensayo.muestra;
  comparacionesDiv.innerHTML = "";
  feedback.textContent = "";

  ensayo.opciones.forEach(opcion => {
    const btn = document.createElement("button");
    btn.className = "boton-comparacion";
    btn.textContent = opcion;
    btn.onclick = () => verificarRespuesta(opcion, ensayo.correcto);
    comparacionesDiv.appendChild(btn);
  });
}

function verificarRespuesta(seleccion, correcto) {
  contadorGlobal++;
  contadorSpan.textContent = contadorGlobal;

  if (seleccion === correcto) {
    feedback.textContent = "✅ Correcto";
    ensayoActual++;

    if (ensayoActual < ensayos.length) {
      setTimeout(cargarEnsayo, 1000);
    } else {
      feedback.textContent = "🎉 Felicitaciones, esto es SIMETRÍA";
    }

  } else {
    feedback.textContent = "❌ Incorrecto";
  }
}
