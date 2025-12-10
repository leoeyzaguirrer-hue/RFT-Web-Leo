let fase = 1;

const panelValores = document.getElementById("panelValores");
const panelDirecciones = document.getElementById("panelDirecciones");
const panelAcciones = document.getElementById("panelAcciones");

const mensaje = document.getElementById("mensajeCentral");

const btnSiguiente = document.getElementById("btnSiguiente");
const btnReiniciar = document.getElementById("btnReiniciar");

btnSiguiente.addEventListener("click", () => {
  if (fase === 1) {
    panelValores.classList.remove("activo");
    panelDirecciones.classList.add("activo");
    mensaje.innerText = "El valor activo ahora organiza direcciones.";
    fase = 2;
  } else if (fase === 2) {
    panelDirecciones.classList.remove("activo");
    panelAcciones.classList.add("activo");
    mensaje.innerText = "Las acciones cambian su función bajo el valor.";
    fase = 3;
  } else if (fase === 3) {
    mensaje.innerText = "El sistema de valores compite con la coherencia.";
    fase = 4;
  }
});

btnReiniciar.addEventListener("click", () => {
  location.reload();
});
