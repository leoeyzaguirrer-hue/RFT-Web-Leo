/* ============================================================
   P19 · SIMULADOR DE EVENTOS PRIVADOS
   Lógica completa con arrastre, caminar, función vs contenido,
   overlay, reinicio y velocidad variable.
=============================================================== */

const pensamientos = [
  "💭 Soy un fracaso.",
  "💭 Hago todo mal.",
  "💭 No puedo hablar sin que salga mal."
];

const escenarios = [
  "Hablar honestamente con la pareja",
  "Postular al nuevo trabajo",
  "Pedir disculpas",
  "Decir algo importante"
];

// ELEMENTOS
const pensamiento = document.getElementById("p19-pensamiento");
const pensamientoTexto = document.getElementById("p19-pensamiento-texto");
const panelContenido = document.getElementById("p19-contenido");
const panelFuncion = document.getElementById("p19-funcion");
const subopciones = document.getElementById("p19-subopciones");
const mensaje = document.getElementById("p19-mensaje");
const escenario = document.getElementById("p19-escenario");
const overlay = document.getElementById("p19-overlay");
const overlayBtn = document.getElementById("p19-overlay-btn");
const panelFinal = document.getElementById("p19-panel-final");
const reiniciarBtn = document.getElementById("p19-reiniciar");

const avatar = document.querySelector(".p19-avatar");
let avatarContainer = document.querySelector(".p19-avatar-container");

let xPosAvatar = 0;
let aciertosFuncion = 0;
let intentos = 0;
let overlayMostrado = false;

// Inicializar
function p19_iniciar() {
  pensamientoTexto.textContent = pensamientos[Math.floor(Math.random()*pensamientos.length)];
  escenario.textContent = escenarios[Math.floor(Math.random()*escenarios.length)];
  mensaje.textContent = "";
  subopciones.style.display = "none";
  xPosAvatar = 0;
  aciertosFuncion = 0;
  intentos = 0;
  overlayMostrado = false;

  avatar.style.transform = `translateX(0px)`;
  panelFinal.style.display = "none";
}

p19_iniciar();

// DRAG & DROP
pensamiento.addEventListener("dragstart", (e)=>{
  e.dataTransfer.setData("text/plain","pensamiento");
});

panelContenido.addEventListener("dragover",(e)=>e.preventDefault());
panelFuncion.addEventListener("dragover",(e)=>e.preventDefault());

panelContenido.addEventListener("drop",()=>{
  intentos++;

  // retroceso sutil
  xPosAvatar -= 8;
  avatar.style.transform = `translateX(${xPosAvatar}px)`;

  mensaje.textContent = "Hablar del contenido no cambia la función.";
  subopciones.style.display = "none";

  // pensamiento crece
  pensamiento.style.transform = "scale(1.15)";
  setTimeout(()=>pensamiento.style.transform="scale(1)",300);

  // mostrar overlay después de 2 intentos
  if (intentos >= 2 && !overlayMostrado) {
    overlay.style.display = "flex";
    overlayMostrado = true;
  }
});

panelFuncion.addEventListener("drop",()=>{
  intentos++;
  aciertosFuncion++;
  mensaje.textContent = "Has cambiado la función, no el contenido.";

  // mostrar subopciones
  subopciones.style.display = "flex";

  // pensamiento se hace más pequeño
  pensamiento.style.transform = "scale(0.85)";
  setTimeout(()=>pensamiento.style.transform="scale(1)",300);

  // avatar camina con velocidad variable
  let velocidad = 1400; // primer acierto
  if (aciertosFuncion === 2) velocidad = 1000;
  if (aciertosFuncion >= 3) velocidad = 700;

  avatar.classList.add("p19-caminar");
  xPosAvatar += 40;

  avatar.style.transition = `transform ${velocidad}ms ease`;
  avatar.style.transform = `translateX(${xPosAvatar}px)`;

  setTimeout(()=>avatar.classList.remove("p19-caminar"),velocidad);

  if (aciertosFuncion >= 3) {
    setTimeout(()=>{
      panelFinal.style.display = "block";
      mensaje.textContent = "";
    }, 800);
  }
});

// Subopciones funcionales
document.querySelectorAll(".p19-sub-btn").forEach(btn=>{
  btn.addEventListener("click",(e)=>{
    const accion = e.target.dataset.accion;
    mensaje.textContent = `Aplicaste ${accion}. La función del pensamiento cambió.`;
  });
});

// Overlay
overlayBtn.addEventListener("click",()=>{
  overlay.style.display = "none";
});

// Reinicio
reiniciarBtn.addEventListener("click",()=>{
  p19_iniciar();
});
