const tarjetas = document.querySelectorAll(".p17-card");
const respuesta = document.getElementById("p17-respuesta");
const nube = document.getElementById("p17-nube");
const feedback = document.getElementById("p17-feedback");
const reiniciar = document.getElementById("p17-reiniciar");

let contadorCorrectos = 0;
let tarjetaArrastrada = null;

// DRAG START
tarjetas.forEach(card => {
  card.addEventListener("dragstart", e => {
    tarjetaArrastrada = card;
    e.dataTransfer.setData("clase", card.dataset.clase);
  });
});

// PERMITIR DROP EN "Respuesta del organismo"
respuesta.addEventListener("dragover", e => e.preventDefault());

// DROP EN "Respuesta del organismo"
respuesta.addEventListener("drop", e => {
  e.preventDefault();
  if (!tarjetaArrastrada) return;

  const clase = tarjetaArrastrada.dataset.clase;

  if (clase === "manzana" && !tarjetaArrastrada.classList.contains("p17-colocada")) {
    contadorCorrectos++;

    // Convertimos la caja en contenedor de tarjetas
    if (contadorCorrectos === 1) {
      respuesta.innerText = "";
    }

    tarjetaArrastrada.classList.add("p17-colocada");
    tarjetaArrastrada.setAttribute("draggable", "false");
    respuesta.appendChild(tarjetaArrastrada);

    feedback.innerText = "✔ Estímulo funcionalmente correcto.";
    nube.innerText = `Elementos integrados: ${contadorCorrectos}`;
  } else {
    feedback.innerText = "✘ Observa la función evocada, no la forma.";
  }

  if (contadorCorrectos === 3) {
    feedback.innerText = "✅ Clase funcional MANZANA organizada correctamente.";
  }

  tarjetaArrastrada = null;
});

// BOTÓN REINICIO
reiniciar.addEventListener("click", () => {
  contadorCorrectos = 0;
  feedback.innerText = "";
  nube.innerText = "Clase en formación...";
  respuesta.innerText = "Esperando estímulos...";

  // Devolver tarjetas a la zona de estímulos y reactivar drag
  const zonaEstimulos = document.getElementById("p17-estimulos");
  document.querySelectorAll(".p17-card").forEach(card => {
    card.classList.remove("p17-colocada");
    card.setAttribute("draggable", "true");
    zonaEstimulos.appendChild(card);
  });
});
