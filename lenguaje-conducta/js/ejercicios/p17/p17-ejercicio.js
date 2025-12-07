const tarjetas = document.querySelectorAll(".p17-card");
const meta = document.getElementById("p17-meta");
const respuesta = document.getElementById("p17-respuesta");
const nube = document.getElementById("p17-nube");
const feedback = document.getElementById("p17-feedback");
const reiniciar = document.getElementById("p17-reiniciar");

let contadorCorrectos = 0;

// DRAG START
tarjetas.forEach(card => {
  card.addEventListener("dragstart", e => {
    e.dataTransfer.setData("clase", card.dataset.clase);
    e.dataTransfer.setData("texto", card.innerText);
  });
});

// PERMITIR DROP EN MANZANA
meta.addEventListener("dragover", e => e.preventDefault());

// PERMITIR DROP EN RESPUESTA DEL ORGANISMO (ESTO FALTABA)
respuesta.addEventListener("dragover", e => e.preventDefault());

// DROP SOBRE MANZANA
meta.addEventListener("drop", e => {
  e.preventDefault();
  procesarDrop(e);
});

// DROP SOBRE RESPUESTA DEL ORGANISMO
respuesta.addEventListener("drop", e => {
  e.preventDefault();
  procesarDrop(e);
});

function procesarDrop(e) {
  const clase = e.dataTransfer.getData("clase");

  if (clase === "manzana") {
    contadorCorrectos++;
    respuesta.innerText = "Respuesta evocada: salivar / acercarse";
    nube.innerText = `Elementos integrados: ${contadorCorrectos}`;
    feedback.innerText = "✔ Estímulo funcionalmente correcto.";
  } else {
    feedback.innerText = "✘ Observa la función evocada, no la forma.";
  }

  if (contadorCorrectos === 3) {
    feedback.innerText = "✅ Clase funcional MANZANA organizada correctamente.";
    respuesta.innerText = "Clase establecida: múltiples formatos → misma función";
  }
}

// BOTÓN REINICIO
reiniciar.addEventListener("click", () => {
  contadorCorrectos = 0;
  respuesta.innerText = "Esperando estímulos...";
  nube.innerText = "Clase en formación...";
  feedback.innerText = "";
});
