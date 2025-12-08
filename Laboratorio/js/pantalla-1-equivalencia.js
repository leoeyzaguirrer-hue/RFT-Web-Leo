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
      setTimeout(pasarAFase3, 1800);
    }

  } else {
    feedback.textContent = "❌ Incorrecto";
  }
}
/* ============================
   TRANSICIÓN AUTOMÁTICA A FASE 3
============================ */
function pasarAFase3() {
  document.getElementById("fase2").classList.remove("activa");
  document.getElementById("fase3").classList.add("activa");

  setTimeout(pasarAFase4, 3500);
}

/* ============================
   FASE 4 — SIMETRÍA B–C
============================ */
const ensayosF4 = [
  { muestra: "UNO", correcto: "⭐", opciones: ["⭐", "🌙", "❤️"] },
  { muestra: "DOS", correcto: "❤️", opciones: ["🌙", "❤️", "⭐"] },
  { muestra: "TRES", correcto: "🌙", opciones: ["❤️", "⭐", "🌙"] },

  { muestra: "⭐", correcto: "UNO", opciones: ["DOS", "UNO", "TRES"] },
  { muestra: "❤️", correcto: "DOS", opciones: ["UNO", "TRES", "DOS"] },
  { muestra: "🌙", correcto: "TRES", opciones: ["TRES", "UNO", "DOS"] }
];

let ensayoF4 = 0;
const tarjetaF4 = document.getElementById("tarjetaF4");
const comparacionesF4 = document.getElementById("comparacionesF4");
const feedbackF4 = document.getElementById("feedbackF4");

function pasarAFase4() {
  document.getElementById("fase3").classList.remove("activa");
  document.getElementById("fase4").classList.add("activa");
  cargarEnsayoF4();
}

function cargarEnsayoF4() {
  const ensayo = ensayosF4[ensayoF4];
  tarjetaF4.textContent = ensayo.muestra;
  comparacionesF4.innerHTML = "";
  feedbackF4.textContent = "";

  ensayo.opciones.forEach(opcion => {
    const btn = document.createElement("button");
    btn.className = "boton-comparacion";
    btn.textContent = opcion;
    btn.onclick = () => verificarF4(opcion, ensayo.correcto);
    comparacionesF4.appendChild(btn);
  });
}

function verificarF4(seleccion, correcto) {
  contadorGlobal++;
  contadorSpan.textContent = contadorGlobal;

  if (seleccion === correcto) {
    feedbackF4.textContent = "✅ Correcto";
    ensayoF4++;

    if (ensayoF4 < ensayosF4.length) {
      setTimeout(cargarEnsayoF4, 1000);
    } else {
      feedbackF4.textContent = "🎉 Felicitaciones, esto es SIMETRÍA";
      setTimeout(pasarAFase5, 900);
    }

  } else {
    feedbackF4.textContent = "❌ Incorrecto";
  }
}
function irAFase4() {
  document.getElementById("fase3").classList.remove("activa");
  document.getElementById("fase4").classList.add("activa");
}
/* ============================
   FASE 5 · TRANSITIVIDAD A–C
============================ */
const ensayosF5 = [
  { muestra: "🔵", correcto: "⭐", opciones: ["⭐", "🌙", "❤️"] },
  { muestra: "🟢", correcto: "🌙", opciones: ["❤️", "🌙", "⭐"] },
  { muestra: "🔴", correcto: "❤️", opciones: ["🌙", "⭐", "❤️"] },

  { muestra: "⭐", correcto: "🔵", opciones: ["🟢", "🔵", "🔴"] }
];

let ensayoF5 = 0;

function pasarAFase5() {
  document.getElementById("fase4").classList.remove("activa");
  document.getElementById("fase5").classList.add("activa");
  cargarEnsayoF5();
}

function cargarEnsayoF5() {
  const ensayo = ensayosF5[ensayoF5];
  document.getElementById("tarjetaF5").textContent = ensayo.muestra;
  const cont = document.getElementById("comparacionesF5");
  cont.innerHTML = "";
  document.getElementById("feedbackF5").textContent = "";

  ensayo.opciones.forEach(op => {
    const btn = document.createElement("button");
    btn.className = "boton-comparacion";
    btn.textContent = op;
    btn.onclick = () => verificarF5(op, ensayo.correcto);
    cont.appendChild(btn);
  });
}

function verificarF5(sel, correcto) {
  contadorGlobal++;
  contadorSpan.textContent = contadorGlobal;

  if (sel === correcto) {
    document.getElementById("feedbackF5").textContent = "✅ Correcto";
    ensayoF5++;

    if (ensayoF5 < ensayosF5.length) {
      setTimeout(cargarEnsayoF5, 900);
    } else {
      document.getElementById("feedbackF5").textContent =
        "🎉 Excelente, esto es TRANSITIVIDAD";
      setTimeout(() => {
        document.getElementById("fase5").classList.remove("activa");
        document.getElementById("fase6").classList.add("activa");
      }, 1200);
    }
  } else {
    document.getElementById("feedbackF5").textContent = "❌ Incorrecto";
  }
}

/* ============================
   FASE 7 · SIMETRÍA C–D
============================ */
const ensayosF7 = [
  { muestra: "⭐", correcto: "🔺", opciones: ["🔺", "🟪", "🟧"] },
  { muestra: "❤️", correcto: "🟧", opciones: ["🟪", "🟧", "🔺"] },
  { muestra: "🌙", correcto: "🟪", opciones: ["🟧", "🟪", "🔺"] }
];

let ensayoF7 = 0;

function irAFase7() {
  document.getElementById("fase6").classList.remove("activa");
  document.getElementById("fase7").classList.add("activa");
  cargarEnsayoF7();
}

function cargarEnsayoF7() {
  const e = ensayosF7[ensayoF7];
  document.getElementById("tarjetaF7").textContent = e.muestra;
  const cont = document.getElementById("comparacionesF7");
  cont.innerHTML = "";
  document.getElementById("feedbackF7").textContent = "";

  e.opciones.forEach(op => {
    const btn = document.createElement("button");
    btn.className = "boton-comparacion";
    btn.textContent = op;
    btn.onclick = () => verificarF7(op, e.correcto);
    cont.appendChild(btn);
  });
}

function verificarF7(sel, correcto) {
  contadorGlobal++;
  contadorSpan.textContent = contadorGlobal;

  if (sel === correcto) {
    document.getElementById("feedbackF7").textContent = "✅ Correcto";
    ensayoF7++;

    if (ensayoF7 < ensayosF7.length) {
      setTimeout(cargarEnsayoF7, 900);
    } else {
      document.getElementById("fase7").classList.remove("activa");
      document.getElementById("fase8").classList.add("activa");
      cargarEnsayoF8();
    }
  } else {
    document.getElementById("feedbackF7").textContent = "❌ Incorrecto";
  }
}
