document.addEventListener("DOMContentLoaded", () => {
  const tarjetas = document.querySelectorAll(".p20-card");
  const dropzone = document.getElementById("p20-dropzone");
  const herenciaBox = document.getElementById("p20-herencia");
  const preguntaBox = document.getElementById("p20-pregunta");
  const feedback = document.getElementById("p20-feedback");
  const reiniciar = document.getElementById("p20-reiniciar");
  const zonaEstimulos = document.getElementById("p20-estimulos");

  let tarjetaArrastrada = null;

  // DRAG START
  tarjetas.forEach(card => {
    card.addEventListener("dragstart", e => {
      tarjetaArrastrada = card;
    });
  });

  // PERMITIR DROP
  dropzone.addEventListener("dragover", e => {
    e.preventDefault();
    dropzone.classList.add("p20-activa");
  });

  dropzone.addEventListener("dragleave", () => {
    dropzone.classList.remove("p20-activa");
  });

  dropzone.addEventListener("drop", e => {
    e.preventDefault();
    dropzone.classList.remove("p20-activa");
    if (!tarjetaArrastrada) return;

    dropzone.textContent = "";
    dropzone.appendChild(tarjetaArrastrada);
    tarjetaArrastrada.setAttribute("draggable", "false");

    herenciaBox.innerHTML = `
      <strong>Funciones heredadas desde la red:</strong>
      <ul>
        <li>Evitación</li>
        <li>Retraimiento</li>
        <li>Autocrítica</li>
      </ul>
    `;

    preguntaBox.innerHTML = `
      <p><strong>¿Esta reacción se debe a:</strong></p>
      <div class="p19-opciones">
        <button data-resp="forma">La forma física del estímulo</button>
        <button data-resp="relacion">Su lugar en la red relacional</button>
      </div>
    `;

    const opciones = preguntaBox.querySelectorAll("button");

    opciones.forEach(btn => {
      btn.addEventListener("click", () => {
        if (btn.dataset.resp === "relacion") {
          feedback.textContent =
            "✅ Correcto. La función no se hereda por forma, sino por relación. Esto es transformación de funciones.";
        } else {
          feedback.textContent =
            "❌ Observa que la reacción ocurre aunque la forma física no tenga propiedades negativas en sí.";
        }
      });
    });

    tarjetaArrastrada = null;
  });

  // REINICIAR
  reiniciar.addEventListener("click", () => {
    herenciaBox.textContent = "";
    preguntaBox.textContent = "";
    feedback.textContent = "";
    dropzone.textContent = "Arrastra aquí un estímulo nuevo";

    document.querySelectorAll(".p20-card").forEach(card => {
      card.setAttribute("draggable", "true");
      zonaEstimulos.appendChild(card);
    });
  });
});
