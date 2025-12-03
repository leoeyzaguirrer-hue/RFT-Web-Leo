/* ============================================================
   EJERCICIO P3 · BLOQUE 1 · LABORATORIO DE CORRESPONDENCIA
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.querySelector("#ej-p3-b1");
  if (!contenedor) return;

  contenedor.innerHTML = crearHTML();

  inicializarDragDrop();
});

/* HTML dinámico */
function crearHTML() {
  return `
    <div class="ej-lab-container">

      <!-- TARJETAS -->
      <div class="ej-tarjetas">
        ${crearTarjeta("🧠 Tiene un déficit en el control inhibitorio.", "mecanismo")}
        ${crearTarjeta("🎭 Su rasgo evitativo explica su conducta actual.", "dudoso")}
        ${crearTarjeta("🩻 Una disfunción neuroquímica mantiene el patrón ansioso.", "mecanismo")}
        ${crearTarjeta("🧩 La creencia nuclear distorsiona la percepción.", "dudoso")}
        ${crearTarjeta("🧬 Su predisposición genética explica la reactividad.", "mecanismo")}
        ${crearTarjeta("📦 Su estructura interna está dañada.", "ninguna")}
        ${crearTarjeta("💭 Sus esquemas profundos causan la conducta.", "dudoso")}
      </div>

      <!-- DESTINOS -->
      <div class="ej-destinos">
        <div class="ej-dropzone" data-dest="mecanismo">🎯 Coincide con un mecanismo interno claro</div>
        <div class="ej-dropzone" data-dest="dudoso">⚠️ Correspondencia dudosa</div>
        <div class="ej-dropzone" data-dest="ninguna">🚫 No indica qué hacer en terapia</div>
      </div>

    </div>

    <button class="ej-evaluar-btn">Evaluar Correspondencia</button>
    <div class="ej-feedback"></div>
  `;
}

function crearTarjeta(texto, respuestaCorrecta) {
  return `<div class="ej-tarjeta" draggable="true" data-correcta="${respuestaCorrecta}">${texto}</div>`;
}

/* LÓGICA DRAG & DROP */
function inicializarDragDrop() {
  const tarjetas = document.querySelectorAll(".ej-tarjeta");
  const zonas = document.querySelectorAll(".ej-dropzone");
  const feedback = document.querySelector(".ej-feedback");

  tarjetas.forEach((t) => {
    t.addEventListener("dragstart", () => {
      t.classList.add("arrastrando");
    });
    t.addEventListener("dragend", () => {
      t.classList.remove("arrastrando");
    });
  });

  zonas.forEach((zona) => {
    zona.addEventListener("dragover", (e) => {
      e.preventDefault();
      zona.classList.add("activo");
    });
    zona.addEventListener("dragleave", () => zona.classList.remove("activo"));

    zona.addEventListener("drop", () => {
      const tarjeta = document.querySelector(".arrastrando");
      if (!tarjeta) return;

      zona.appendChild(tarjeta);
      zona.classList.remove("activo");
    });
  });

  document.querySelector(".ej-evaluar-btn").addEventListener("click", () => {
    let correctas = 0;
    let total = 0;

    zonas.forEach((zona) => {
      const esperado = zona.getAttribute("data-dest");
      zona.querySelectorAll(".ej-tarjeta").forEach((tarjeta) => {
        total++;
        const real = tarjeta.getAttribute("data-correcta");

        if (real === esperado) {
          tarjeta.style.borderColor = "green";
          tarjeta.style.boxShadow = "0 0 6px rgba(0,150,0,0.6)";
          correctas++;
        } else {
          tarjeta.style.borderColor = "red";
          tarjeta.style.boxShadow = "0 0 6px rgba(255,0,0,0.6)";
        }
      });
    });

    if (correctas >= total * 0.6) {
      feedback.textContent =
        "✨ La explicación captura mecanismos internos… pero recuerda: puede no guiar la acción clínica.";
    } else {
      feedback.textContent =
        "❌ La verdad como correspondencia describe, pero no siempre indica qué hacer ahora.";
    }
  });
}
