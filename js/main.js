/* =======================================================
   SISTEMA CENTRAL DE NAVEGACIÓN (8 PANTALLAS)
   Opción B — Avanzado con sistema de progreso
   ======================================================= */

let currentScreen = 1;          // Pantalla actual
const totalScreens = 8;         // Número total de pantallas por submódulo

document.addEventListener("DOMContentLoaded", () => {
    console.log("Sistema cargado: Unidad de Análisis");

    loadScreens();       // Crea las pantallas internas
    showScreen(1);       // Muestra la primera pantalla
    setupNavigation();   // Activa botones anterior/siguiente
});


/* =======================================================
   CREA LAS 8 PANTALLAS DINÁMICAMENTE
   ======================================================= */

function loadScreens() {
    const app = document.getElementById("app");

    for (let i = 1; i <= totalScreens; i++) {
        const screen = document.createElement("section");
        screen.id = `screen-${i}`;
        screen.classList.add("screen");
        screen.style.display = "none";

        // Placeholder simple (luego lo llenamos pantalla por pantalla)
        screen.innerHTML = `
            <div class="screen-content">
                <h2>Pantalla ${i} (vacía)</h2>
                <p>Contenido pendiente de completar.</p>
            </div>
        `;

        app.appendChild(screen);
    }

    // Crear barra de navegación
    createNavigationBar();
}



/* =======================================================
   MOSTRAR PANTALLA ACTUAL
   ======================================================= */

function showScreen(num) {
    currentScreen = num;

    document.querySelectorAll(".screen").forEach((sc, i) => {
        sc.style.display = i + 1 === num ? "block" : "none";
    });

    updateNavButtons();
    animateScreen(num);

    console.log(`Mostrando pantalla ${num}`);
}



/* =======================================================
   BOTONES ANTERIOR / SIGUIENTE
   ======================================================= */

function createNavigationBar() {
    const nav = document.createElement("div");
    nav.classList.add("nav-buttons");

    nav.innerHTML = `
        <button id="btn-prev" class="btn-secondary">Anterior</button>
        <button id="btn-next" class="btn-primary">Siguiente</button>
    `;

    document.getElementById("app").appendChild(nav);
}


function setupNavigation() {
    document.getElementById("btn-prev").addEventListener("click", () => {
        if (currentScreen > 1) showScreen(currentScreen - 1);
    });

    document.getElementById("btn-next").addEventListener("click", () => {
        if (currentScreen < totalScreens) showScreen(currentScreen + 1);
    });
}



/* =======================================================
   CONTROLAR VISIBILIDAD DE BOTONES
   ======================================================= */

function updateNavButtons() {
    const prev = document.getElementById("btn-prev");
    const next = document.getElementById("btn-next");

    prev.style.visibility = currentScreen === 1 ? "hidden" : "visible";
    next.style.visibility = currentScreen === totalScreens ? "hidden" : "visible";
}



/* =======================================================
   ANIMACIÓN DE ENTRADA DE PANTALLAS
   ======================================================= */

function animateScreen(num) {
    const screen = document.getElementById(`screen-${num}`);
    screen.classList.remove("fade-in");
    void screen.offsetWidth; // reinicia animación
    screen.classList.add("fade-in");
}
