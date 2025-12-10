// ----- UTILIDADES BÁSICAS -----
const panelValores = document.getElementById("panelValores");
const panelDirecciones = document.getElementById("panelDirecciones");
const panelAcciones = document.getElementById("panelAcciones");

const mensaje = document.getElementById("mensajeCentral");
const btnSiguiente = document.getElementById("btnSiguiente");
const btnReiniciar = document.getElementById("btnReiniciar");

const slotValor = document.getElementById("slotValor");
const zonaDirecciones = document.getElementById("zonaDirecciones");
const zonaAcciones = document.getElementById("zonaAcciones");

const nivelDirecciones = document.getElementById("nivelDirecciones");
const nivelAcciones = document.getElementById("nivelAcciones");

let fase = 1;
let valorActivo = null;
let tarjetaValorEnSlot = null;

// ----- CLASIFICAR TARJETAS POR TIPO (según panel de origen) -----
const tarjetas = document.querySelectorAll(".tarjeta.draggable");

tarjetas.forEach((card) => {
  const bloqueId = card.closest(".bloque").id;
  if (bloqueId === "panelValores") {
    card.dataset.type = "valor";
  } else if (bloqueId === "panelDirecciones") {
    card.dataset.type = "direccion";
  } else if (bloqueId === "panelAcciones") {
    card.dataset.type = "accion";
  }
});

// ----- EVENTOS DE DRAG & DROP PARA TARJETAS -----
tarjetas.forEach((card) => {
  card.addEventListener("dragstart", (e) => {
    card.classList.add("dragging");
    // necesario para que algunos navegadores permitan el drop
    e.dataTransfer.setData("text/plain", "");
  });

  card.addEventListener("dragend", () => {
    card.classList.remove("dragging");
  });
});

// ----- ZONAS DE DROP -----
const dropzones = document.querySelectorAll(".dropzone");

dropzones.forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
    zone.classList.add("dropzone-over");
  });

  zone.addEventListener("dragleave", () => {
    zone.classList.remove("dropzone-over");
  });

  zone.addEventListener("drop", (e) => {
    e.preventDefault();
    zone.classList.remove("dropzone-over");

    const card = document.querySelector(".tarjeta.dragging");
    if (!card) return;

    const tipo = card.dataset.type;
    const zona = zone.dataset.zone;

    if (zona === "valor") {
      manejarDropValor(card, zone, tipo);
    } else if (zona === "direcciones") {
      manejarDropDireccion(card, zone, tipo);
    } else if (zona === "acciones") {
      manejarDropAccion(card, zone, tipo);
    }
  });
});

// ----- MANEJO DE DROP: VALOR -----
function manejarDropValor(card, zone, tipo) {
  if (tipo !== "valor") {
    mostrarMensaje("En el vértice superior solo van VALORES, no direcciones ni acciones.");
    marcarError(card);
    return;
  }

  // Si ya había un valor, lo devolvemos al panel de valores
  if (tarjetaValorEnSlot && tarjetaValorEnSlot !== card) {
    const contenedorValores = panelValores.querySelector(".tarjetas");
    contenedorValores.appendChild(tarjetaValorEnSlot);
  }

  zone.textContent = "";
  zone.appendChild(card);
  tarjetaValorEnSlot = card;
  valorActivo = card.textContent.trim();

  card.classList.remove("dragging");

  mostrarMensaje(
    `Has activado el valor “${valorActivo}”. Desde ahora, las direcciones y acciones cambiarán de significado.`
  );

  // Activamos visualmente niveles inferiores
  nivelDirecciones.classList.add("nivel-activo");
  panelDirecciones.classList.add("activo");
  fase = 1;
}

// ----- MANEJO DE DROP: DIRECCIÓN -----
function manejarDropDireccion(card, zone, tipo) {
  if (!valorActivo) {
    mostrarMensaje("Primero activa un VALOR antes de organizar direcciones.");
    marcarError(card);
    return;
  }

  if (tipo !== "direccion") {
    mostrarMensaje("Aquí solo van DIRECCIONES de vida, no valores ni acciones.");
    marcarError(card);
    return;
  }

  const texto = card.textContent.trim();
  const incoherentes = ["Evitar", "Desentenderse"];

  if (incoherentes.includes(texto)) {
    mostrarMensaje("Esta dirección no coordina jerárquicamente con el valor activo.");
    marcarError(card);
    return;
  }

  // Dirección aceptada
  zone.appendChild(card);
  card.classList.add("direccion-activa");
  card.classList.remove("dragging");

  mostrarMensaje(
    `La dirección “${texto}” coordina con el valor “${valorActivo}”. Empieza a organizar un estilo de responder.`
  );

  nivelAcciones.classList.add("nivel-activo");
  panelAcciones.classList.add("activo");
  fase = 2;
}

// ----- MANEJO DE DROP: ACCIÓN -----
function manejarDropAccion(card, zone, tipo) {
  if (!valorActivo) {
    mostrarMensaje("Primero activa un VALOR y al menos una DIRECCIÓN antes de colocar acciones.");
    marcarError(card);
    return;
  }

  if (tipo !== "accion") {
    mostrarMensaje("En este nivel solo se colocan ACCIONES concretas.");
    marcarError(card);
    return;
  }

  zone.appendChild(card);
  card.classList.add("accion-transformada");
  card.classList.remove("dragging");

  mostrarMensaje(
    `La acción “${card.textContent.trim()}” ha cambiado de función por estar subordinada al valor “${valorActivo}”.`
  );

  fase = 3;
}

// ----- MENSAJES Y ERRORES -----
function mostrarMensaje(texto) {
  mensaje.textContent = texto;
}

function marcarError(card) {
  card.classList.add("tarjeta-error");
  setTimeout(() => card.classList.remove("tarjeta-error"), 400);
}

// ----- BOTONES -----
btnSiguiente.addEventListener("click", () => {
  if (fase === 1) {
    mostrarMensaje(
      "Ahora observa qué direcciones de vida se subordinan al valor y cuáles son incoherentes."
    );
  } else if (fase === 2) {
    mostrarMensaje(
      "Coloca acciones concretas y nota cómo su función cambia al estar bajo el valor."
    );
  } else if (fase === 3) {
    mostrarMensaje(
      "En clínica, trabajar con valores implica mantener la dirección aun con malestar presente."
    );
  } else {
    mostrarMensaje(
      "Puedes seguir probando combinaciones de direcciones y acciones bajo el mismo valor."
    );
  }
});

btnReiniciar.addEventListener("click", () => {
  window.location.reload();
});
