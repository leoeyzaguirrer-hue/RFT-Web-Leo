/* ============================================================
   EJERCICIO P8 · SIMULADOR DE FORMULACIÓN VIVA
=============================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const tarjetas = document.querySelectorAll(".p8-tarjeta");
  const avatarZone = document.getElementById("p8-avatar-zone");
  const avatar = document.getElementById("p8-avatar");
  const estado = document.getElementById("p8-estado");
  const accionesPanel = document.getElementById("p8-acciones");
  const accionesLista = document.getElementById("p8-lista-acciones");
  const resetBtn = document.getElementById("p8-reset");

  /* -----------------------
     Acciones según tipo
  ------------------------*/

  const accionesFuncionales = [
    "Explorar el contexto de la conducta.",
    "Intervención basada en valores.",
    "Desplazar el control verbal mediante defusión."
  ];

  const accionesAccionables = [
    "Aplicar exposición con prevención de respuesta.",
    "Establecer una agenda según valores.",
    "Ejercicio de flexibilidad psicológica dirigido."
  ];

  /* -----------------------
     Drag & Drop
  ------------------------*/

  tarjetas.forEach(t => {
    t.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("tipo", t.dataset.tipo);
    });
  });

  avatarZone.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  avatarZone.addEventListener("drop", (e) => {
    const tipo = e.dataTransfer.getData("tipo");
    aplicarFormulacion(tipo);
  });

  /* -----------------------
     Lógica de aplicación
  ------------------------*/

  function aplicarFormulacion(tipo) {

    accionesPanel.style.display = "none";
    accionesLista.innerHTML = "";

    switch (tipo) {

      case "representacional":
        avatar.textContent = "😕";
        estado.textContent =
          "Esta descripción no orienta acción. Intenta otra formulación.";
        break;

      case "estatica":
        avatar.textContent = "😕";
        estado.textContent =
          "Una explicación fija no sirve para cambiar conducta. Busca análisis funcional.";
        break;

      case "funcional-incompleta":
        avatar.textContent = "😐";
        estado.textContent =
          "Comprendes parte de la función, pero aún no puedes intervenir. Ajusta tu hipótesis.";
        break;

      case "funcional":
        avatar.textContent = "🙂";
        estado.textContent =
          "Has construido una formulación funcional. Ya puedes intervenir.";
        mostrarAcciones(accionesFuncionales);
        break;

      case "accionable":
        avatar.textContent = "😀";
        estado.textContent =
          "Has creado una formulación viva que guía acción inmediata.";
        mostrarAcciones(accionesAccionables);
        break;
    }
  }

  /* -----------------------
     Mostrar acciones
  ------------------------*/

  function mostrarAcciones(lista) {
    accionesPanel.style.display = "block";
    lista.forEach(a => {
      const li = document.createElement("li");
      li.textContent = a;
      accionesLista.appendChild(li);
    });
  }

  /* -----------------------
     Reiniciar
  ------------------------*/

  resetBtn.addEventListener("click", () => {
    avatar.textContent = "😐";
    estado.textContent = "Arrastra una tarjeta al consultante para comenzar.";
    accionesPanel.style.display = "none";
    accionesLista.innerHTML = "";
  });

});
