// main.js
document.addEventListener("DOMContentLoaded", () => {
    console.log("RFT Web cargada correctamente");

    // Inicializar UI
    if (typeof initUI === "function") initUI();

    // Inicializar animaciones
    if (typeof initAnimations === "function") initAnimations();

    // Cargar módulo inicial (portada)
    loadPage("home");
});

/**
 * Carga una pantalla desde /pages/
 */
function loadPage(pageName) {
    fetch(`./pages/${pageName}.html`)
        .then(res => res.text())
        .then(html => {
            document.querySelector("#app").innerHTML = html;
            console.log(`Página cargada: ${pageName}`);

            // Reaplicar animaciones y UI tras cargar cada módulo
            if (typeof initUI === "function") initUI();
            if (typeof initAnimations === "function") initAnimations();
        })
        .catch(err => console.error("Error cargando página:", err));
}

