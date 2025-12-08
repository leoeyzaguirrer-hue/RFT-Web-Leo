const network = document.getElementById("network");
const btn = document.getElementById("btnIniciar");

const nodes = [];

function crearNodo(x, y) {
  const nodo = document.createElement("div");
  nodo.classList.add("node");
  nodo.style.left = x + "px";
  nodo.style.top = y + "px";

  network.appendChild(nodo);

  setTimeout(() => nodo.style.opacity = 1, 100);
  nodes.push({ el: nodo, x, y });

  if (nodes.length > 1) {
    conectarNodos(nodes[nodes.length - 2], nodes[nodes.length - 1]);
  }

  // Activación funcional del nodo
  setTimeout(() => nodo.classList.add("active"), 400);
}

function conectarNodos(n1, n2) {
  const dx = n2.x - n1.x;
  const dy = n2.y - n1.y;
  const distancia = Math.sqrt(dx*dx + dy*dy);
  const angulo = Math.atan2(dy, dx) * 180 / Math.PI;

  const linea = document.createElement("div");
  linea.classList.add("line");
  linea.style.width = distancia + "px";
  linea.style.left = n1.x + "px";
  linea.style.top = n1.y + "px";
  linea.style.transform = `rotate(${angulo}deg)`;

  network.appendChild(linea);

  setTimeout(() => linea.style.opacity = 1, 200);
}

// Secuencia de expansión relacional
function secuenciaInicial() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 3;

  setTimeout(() => crearNodo(centerX, centerY), 300);
  setTimeout(() => crearNodo(centerX - 90, centerY + 70), 900);
  setTimeout(() => crearNodo(centerX + 100, centerY + 70), 1600);
  setTimeout(() => crearNodo(centerX + 50, centerY - 90), 2300);
  setTimeout(() => crearNodo(centerX - 130, centerY - 70), 3000);
}

// Acción del botón
btn.addEventListener("click", () => {
  // Próximo paso real:
  // window.location.href = "pantalla-1-equivalencia.html";
  alert("Aquí se abrirá la Pantalla 1: Laboratorio de Equivalencia de Estímulos.");
});

// Inicializar
secuenciaInicial();
// ==============================
// NAVEGACIÓN A LOS LABORATORIOS
// ==============================

document.querySelectorAll(".btn-start").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-target");
    if (target) {
      window.location.href = target;
    }
  });
});
