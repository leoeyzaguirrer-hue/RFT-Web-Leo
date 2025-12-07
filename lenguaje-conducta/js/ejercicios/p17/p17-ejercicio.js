const tarjetas = document.querySelectorAll(".p17-card");
const meta = document.getElementById("p17-meta");
const respuesta = document.getElementById("p17-respuesta");
const nube = document.getElementById("p17-nube");
const feedback = document.getElementById("p17-feedback");
const reiniciar = document.getElementById("p17-reiniciar");

let contadorCorrectos = 0;

tarjetas.forEach(card => {
  card.addEventListener("dragstart", e => {
    e.dataTransfer.setData("clase", card.dataset.clase);
    e.dataTransfer.setData("texto", card.innerText);
  });
});

meta.addEventListener("dragover", e => e.preventDefault());

meta.addEventListener("drop", e => {
  e.preventDefault();

  const clase = e.dataTransfer.getData("clase");
  const texto = e.dataTransfer.getData("texto");

  if (clase === "manzana") {
    contadorCorrectos++;
    respuesta.innerText = "Respuesta evocada: salivar / acercarse";
    nube.innerText = `Elementos integrados: ${contadorCorrectos}`;
    feedback.innerText = "✔ Estímulo funcionalmente correcto.";
  } else {
    feedback.innerText = "✘ Observa la función evocada, no la forma.";
    meta.classList.add("p17-error");
    setTimeout(() => meta.classList.remove("p17-error"), 300);
  }

  if (contadorCorrectos === 3) {
    feedback.innerText = "✅ Clase funcional MANZANA organizada correctamente.";
    respuesta.innerText = "Clase establecida: múltiples formatos → misma función";
  }
});

reiniciar.addEventListener("click", () => {
  contadorCorrectos = 0;
  respuesta.innerText = "Esperando estímulos...";
  nube.innerText = "Clase en formación...";
  feedback.innerText = "";
});
