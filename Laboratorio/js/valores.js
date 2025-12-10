const zonas = {
  valor: document.getElementById("zonaValor"),
  direccion: document.getElementById("zonaDirecciones"),
  accion: document.getElementById("zonaAcciones")
};

const panelValores = document.getElementById("panelValores");
const panelDirecciones = document.getElementById("panelDirecciones");
const panelAcciones = document.getElementById("panelAcciones");

const btnSiguiente = document.getElementById("btnSiguiente");
const mensaje = document.getElementById("mensajeCentral");

let fase = 0;
let valorActivo = null;

document.querySelectorAll(".tarjeta").forEach(t => {
  t.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text", t.textContent);
    e.dataTransfer.effectAllowed = "move";
  });
});

Object.values(zonas).forEach(zona => {
  zona.addEventListener("dragover", e => e.preventDefault());
  zona.addEventListener("drop", e => {
    e.preventDefault();
    const texto = e.dataTransfer.getData("text");
    zona.textContent = texto;

    if (zona === zonas.valor) {
      valorActivo = texto;
      zonas.valor.classList.remove("oculto");
      btnSiguiente.disabled = false;
      mensaje.textContent = "Valor activado. Avanza a direcciones.";
    }

    if (zona === zonas.direccion) {
      btnSiguiente.disabled = false;
      mensaje.textContent = "Dirección organizada. Avanza a acciones.";
    }

    if (zona === zonas.accion) {
      btnSiguiente.disabled = false;
      mensaje.textContent = "Acción transformada por el valor.";
    }
  });
});

btnSiguiente.addEventListener("click", () => {
  if (fase === 0) {
    zonas.valor.classList.remove("oculto");
    panelValores.classList.remove("activo");
    panelDirecciones.classList.add("activo");
    zonas.direccion.classList.remove("oculto");
    mensaje.textContent = "Ahora organiza direcciones.";
    btnSiguiente.disabled = true;
    fase = 1;
  } else if (fase === 1) {
    panelDirecciones.classList.remove("activo");
    panelAcciones.classList.add("activo");
    zonas.accion.classList.remove("oculto");
    mensaje.textContent = "Ahora observa la transformación de acciones.";
    btnSiguiente.disabled = true;
    fase = 2;
  } else if (fase === 2) {
    document.getElementById("modalFinal").classList.remove("oculto");
  }
});

document.getElementById("cerrarModal").addEventListener("click", () => {
  document.getElementById("modalFinal").classList.add("oculto");
});

document.getElementById("btnReiniciar").addEventListener("click", () => {
  location.reload();
});
