/* ============================
   SISTEMA DINÁMICO DE MÓDULOS ACT–RFT
   Carga contenido desde un JSON según la URL
============================ */

async function cargarModulo() {

    // 1) Leer parámetro de la URL
    const params = new URLSearchParams(window.location.search);
    const tema = params.get("tema");

    if (!tema) {
        document.getElementById("contenedor-modulo").innerHTML =
            "<h1>Error</h1><p>No se especificó ningún tema en la URL.</p>";
        return;
    }

    // 2) Cargar el archivo JSON correspondiente
    const url = `data/${tema}.json`;

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        construirModulo(datos);

    } catch (error) {
        document.getElementById("contenedor-modulo").innerHTML =
            `<h1>Error</h1><p>No se pudo cargar el módulo: ${tema}</p>`;
    }
}

function construirModulo(json) {

    const contenedor = document.getElementById("contenedor-modulo");
    contenedor.innerHTML = "";

    // Título principal del módulo
    const titulo = document.createElement("h1");
    titulo.textContent = json.titulo;
    contenedor.appendChild(titulo);

    // Secciones internas
    json.secciones.forEach(sec => {

        const tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta";

        const h2 = document.createElement("h2");
        h2.textContent = sec.titulo;
        tarjeta.appendChild(h2);

        const p = document.createElement("p");
        p.textContent = sec.texto;
        tarjeta.appendChild(p);

        contenedor.appendChild(tarjeta);
    });
}

cargarModulo();
