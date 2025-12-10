const zonas = {
  valor: document.getElementById("zonaValor"),
  direccion: document.getElementById("zonaDirecciones"),
  accion: document.getElementById("zonaAcciones")
};

const panelValores = document.getElementById("panelValores");
const panelDirecciones = document.getElementById("panelDirecciones");
const panelAcciones = document.getElementById("panelAcciones");

const mensaje = document.getElementById("mensajeCentral");
const btnSiguiente = document.getElementById("btnSiguiente");

let fase = 0;

document.querySelectorAll(".tarjeta").forEach(t => {
  t.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text", t.textContent);
  });
});

Object.values(zonas).forEach(zona => {
  zona.addEventListener("dragover", e => e.preventDefault());

  zona.addEventListener("drop", e => {
    e.preventDefault();
    const texto = e.dataTransfer.getData("text");
    zona.textContent = texto;

    btnSiguiente.disabled = false;

    if (fase === 0) mensaje.textContent = "Valor activado. Avanza a direcciones.";
    if (fase === 1) mensaje.textContent = "Dirección organizada. Avanza a acciones.";
    if (fase === 2) mensaje.textContent = "Acción transformada. Avanza al cierre.";
  });
});

btnSiguiente.addEventListener("click", () => {
  if (fase === 0) {
    zonas.valor.classList.remove("oculto");
    zonas.direccion.classList.remove("oculto");
    panelValores.classList.remove("activo");
    panelDirecciones.classList.add("activo");
    btnSiguiente.disabled = true;
    fase = 1;
  } 
  else if (fase === 1) {
    zonas.accion.classList.remove("oculto");
    panelDirecciones.classList.remove("activo");
    panelAcciones.classList.add("activo");
    btnSiguiente.disabled = true;
    fase = 2;
  } 
  else if (fase === 2) {
    document.getElementById("modalFinal").classList.remove("oculto");
  }
});

document.getElementById("cerrarModal").addEventListener("click", () => {
  document.getElementById("modalFinal").classList.add("oculto");
});

document.getElementById("btnReiniciar").addEventListener("click", () => {
  location.reload();
});
