/* ================================
   Datos de los ejemplares
================================ */

const ejemplares = [
  { palabra: "limón", emoji: "🍋" },
  { palabra: "hamburguesa", emoji: "🍔" },
  { palabra: "estrella", emoji: "⭐" },
  { palabra: "perro", emoji: "🐕" }
];

const derivado = { palabra: "árbol", emoji: "🌳" };

const todasPalabras = ejemplares.map(e => e.palabra).concat(derivado.palabra);
const todosEmojis = ejemplares.map(e => e.emoji).concat(derivado.emoji);

/* Utilidad para mezclar arrays */
function barajar(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ======================================
   FASE 1 · PALABRA -> EMOJI
====================================== */

let indiceF1 = 0;
let f1Respondido = false;

const f1Titulo = document.getElementById("f1Titulo");
const f1FrasePapa = document.getElementById("f1FrasePapa");
const f1Instruccion = document.getElementById("f1Instruccion");
const f1Opciones = document.getElementById("f1Opciones");
const f1Feedback = document.getElementById("f1Feedback");

const btnF1Nuevo = document.getElementById("btnF1Nuevo");
const btnF1Siguiente = document.getElementById("btnF1Siguiente");
const f1Resumen = document.getElementById("f1Resumen");

function mostrarEjemploF1() {
  f1Respondido = false;
  btnF1Siguiente.disabled = true;
  f1Feedback.textContent = "";

  const ej = ejemplares[indiceF1];
  f1Titulo.textContent = `Ejemplo ${indiceF1 + 1} de ${ejemplares.length}`;
  f1FrasePapa.textContent = `Papá dice: «${ej.palabra}».`;
  f1Instruccion.textContent = "Haz clic en la imagen que corresponde a la palabra.";

  // 3 opciones: la correcta + 2 distractores
  const distractores = barajar(todosEmojis.filter(e => e !== ej.emoji)).slice(0, 2);
  const opciones = barajar([ej.emoji, ...distractores]);

  f1Opciones.innerHTML = "";
  opciones.forEach(emoji => {
    const btn = document.createElement("button");
    btn.className = "btn-opcion";
    btn.textContent = emoji;
    btn.addEventListener("click", () => manejarClickF1(btn, ej.emoji));
    f1Opciones.appendChild(btn);
  });
}

function manejarClickF1(boton, emojiCorrecto) {
  if (f1Respondido) return;
  f1Respondido = true;

  const botones = Array.from(f1Opciones.querySelectorAll(".btn-opcion"));
  botones.forEach(b => (b.disabled = true));

  if (boton.textContent === emojiCorrecto) {
    boton.classList.add("correcto");
    f1Feedback.textContent = "Correcto. El niño aprende que esta palabra «es» este objeto.";
  } else {
    boton.classList.add("incorrecto");
    const correctoBtn = botones.find(b => b.textContent === emojiCorrecto);
    if (correctoBtn) correctoBtn.classList.add("correcto");
    f1Feedback.textContent =
      "En este entrenamiento, papá refuerza la imagen correcta. La clave «es» se fortalece.";
  }

  btnF1Siguiente.disabled = false;
}

btnF1Nuevo.addEventListener("click", mostrarEjemploF1);

btnF1Siguiente.addEventListener("click", () => {
  indiceF1++;
  if (indiceF1 < ejemplares.length) {
    mostrarEjemploF1();
  } else {
    // Termina Fase 1
    f1Opciones.innerHTML = "";
    f1Feedback.textContent = "";
    btnF1Nuevo.disabled = true;
    btnF1Siguiente.disabled = true;
    f1Resumen.classList.remove("oculto");
  }
});

/* Ir a Fase 2 */
document.getElementById("btnIrFase2").addEventListener("click", () => {
  document.getElementById("fase1").classList.remove("fase-activa");
  document.getElementById("fase1").classList.add("oculto");
  document.getElementById("fase2").classList.add("fase-activa");
});

/* ======================================
   FASE 2 · EMOJI -> PALABRA
====================================== */

let indiceF2 = 0;
let f2Respondido = false;

const f2Titulo = document.getElementById("f2Titulo");
const f2FrasePapa = document.getElementById("f2FrasePapa");
const f2Instruccion = document.getElementById("f2Instruccion");
const f2EmojiGrande = document.getElementById("f2EmojiGrande");
const f2Opciones = document.getElementById("f2Opciones");
const f2Feedback = document.getElementById("f2Feedback");

const btnF2Nuevo = document.getElementById("btnF2Nuevo");
const btnF2Siguiente = document.getElementById("btnF2Siguiente");
const f2Resumen = document.getElementById("f2Resumen");

function mostrarEjemploF2() {
  f2Respondido = false;
  btnF2Siguiente.disabled = true;
  f2Feedback.textContent = "";

  const ej = ejemplares[indiceF2];
  f2Titulo.textContent = `Ejemplo ${indiceF2 + 1} de ${ejemplares.length}`;
  f2FrasePapa.textContent = `Papá muestra ${ej.emoji} y dice: «Esto es…»`;
  f2EmojiGrande.textContent = ej.emoji;
  f2Instruccion.textContent =
    "Haz clic en la palabra que completa correctamente la frase de papá.";

  const distractores = barajar(todasPalabras.filter(p => p !== ej.palabra)).slice(0, 2);
  const opciones = barajar([ej.palabra, ...distractores]);

  f2Opciones.innerHTML = "";
  opciones.forEach(palabra => {
    const btn = document.createElement("button");
    btn.className = "btn-opcion";
    btn.textContent = palabra;
    btn.addEventListener("click", () => manejarClickF2(btn, ej.palabra));
    f2Opciones.appendChild(btn);
  });
}

function manejarClickF2(boton, palabraCorrecta) {
  if (f2Respondido) return;
  f2Respondido = true;

  const botones = Array.from(f2Opciones.querySelectorAll(".btn-opcion"));
  botones.forEach(b => (b.disabled = true));

  if (boton.textContent === palabraCorrecta) {
    boton.classList.add("correcto");
    f2Feedback.textContent =
      "Correcto. El niño aprende que «esto es X» también forma parte de la misma clave «es».";
  } else {
    boton.classList.add("incorrecto");
    const correctoBtn = botones.find(b => b.textContent === palabraCorrecta);
    if (correctoBtn) correctoBtn.classList.add("correcto");
    f2Feedback.textContent =
      "Papá refuerza la palabra correcta. Así se consolida el patrón objeto ↔ palabra bajo «es».";
  }

  btnF2Siguiente.disabled = false;
}

btnF2Nuevo.addEventListener("click", mostrarEjemploF2);

btnF2Siguiente.addEventListener("click", () => {
  indiceF2++;
  if (indiceF2 < ejemplares.length) {
    mostrarEjemploF2();
  } else {
    // Termina Fase 2
    f2Opciones.innerHTML = "";
    f2Feedback.textContent = "";
    btnF2Nuevo.disabled = true;
    btnF2Siguiente.disabled = true;
    f2Resumen.classList.remove("oculto");
  }
});

/* Ir a Fase 3 */
document.getElementById("btnIrFase3").addEventListener("click", () => {
  document.getElementById("fase2").classList.remove("fase-activa");
  document.getElementById("fase2").classList.add("oculto");
  document.getElementById("fase3").classList.add("fase-activa");
});

/* ======================================
   FASE 3 · DERIVACIÓN ÁRBOL
====================================== */

const f3Opciones = document.getElementById("f3Opciones");
const f3Feedback = document.getElementById("f3Feedback");
const f3Resumen = document.getElementById("f3Resumen");
const btnF3Mostrar = document.getElementById("btnF3Mostrar");
const btnReiniciar = document.getElementById("btnReiniciar");

let f3Respondido = false;

btnF3Mostrar.addEventListener("click", () => {
  f3Respondido = false;
  f3Feedback.textContent = "";
  f3Resumen.classList.add("oculto");

  const distractores = barajar(todasPalabras.filter(p => p !== derivado.palabra)).slice(0, 2);
  const opciones = barajar([derivado.palabra, ...distractores]);

  f3Opciones.innerHTML = "";
  opciones.forEach(palabra => {
    const btn = document.createElement("button");
    btn.className = "btn-opcion";
    btn.textContent = palabra;
    btn.addEventListener("click", () => manejarClickF3(btn, derivado.palabra));
    f3Opciones.appendChild(btn);
  });
});

function manejarClickF3(boton, palabraCorrecta) {
  if (f3Respondido) return;
  f3Respondido = true;

  const botones = Array.from(f3Opciones.querySelectorAll(".btn-opcion"));
  botones.forEach(b => (b.disabled = true));

  if (boton.textContent === palabraCorrecta) {
    boton.classList.add("correcto");
    f3Feedback.textContent =
      "Correcto. Esta relación no se entrenó antes, pero se deriva gracias a la historia con «es».";
  } else {
    boton.classList.add("incorrecto");
    const correctoBtn = botones.find(b => b.textContent === palabraCorrecta);
    if (correctoBtn) correctoBtn.classList.add("correcto");
    f3Feedback.textContent =
      "En el modelo RFT, el niño terminaría respondiendo correctamente gracias a la clave «es» aprendida.";
  }

  f3Resumen.classList.remove("oculto");
}

/* Reiniciar laboratorio */
btnReiniciar.addEventListener("click", () => {
  window.location.reload();
});
