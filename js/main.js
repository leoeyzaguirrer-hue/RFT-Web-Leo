/* =======================================================
   SISTEMA CENTRAL DE NAVEGACIÓN (8 PANTALLAS)
   Opción B — Avanzado con sistema de progreso
   ======================================================= */

let currentScreen = 1;
const totalScreens = 8;

document.addEventListener("DOMContentLoaded", () => {
    console.log("Sistema cargado: Unidad de Análisis");

    createPremiumScreens();       // Crea las pantallas base
    loadPortadaUnidadAnalisis();  // Inserta contenido en Pantalla 1
    showScreen(1);                // Muestra Pantalla 1
    setupNavigation();            // Activa botones
});


/* =======================================================
   MOSTRAR PANTALLA ACTUAL
   ======================================================= */

function showScreen(num) {
    currentScreen = num;

    document.querySelectorAll(".screen").forEach((sc, i) => {
        sc.style.display = (i + 1 === num) ? "block" : "none";
    });

    updateNavButtons();
    animateScreen(num);
}



/* =======================================================
   BARRA DE NAVEGACIÓN PREMIUM
   ======================================================= */

function createNavigationBar() {
    const nav = document.createElement("div");
    nav.classList.add("nav-buttons");

    nav.innerHTML = `
        <button id="btn-prev" class="btn-ghost">Anterior</button>
        <button id="btn-next" class="btn-gold">Siguiente</button>
    `;

    document.getElementById("app").appendChild(nav);
}

function setupNavigation() {
    document.getElementById("app").addEventListener("click", (e) => {

        if (e.target.id === "btn-prev" && currentScreen > 1) {
            showScreen(currentScreen - 1);
        }

        if (e.target.id === "btn-next" && currentScreen < totalScreens) {
            showScreen(currentScreen + 1);
        }

    });
}



/* =======================================================
   CONTROL DE VISIBILIDAD
   ======================================================= */

function updateNavButtons() {
    const prev = document.getElementById("btn-prev");
    const next = document.getElementById("btn-next");

    if (!prev || !next) return;

    prev.style.visibility = currentScreen === 1 ? "hidden" : "visible";
    next.style.visibility = currentScreen === totalScreens ? "hidden" : "visible";
}



/* =======================================================
   ANIMACIÓN DE ENTRADA
   ======================================================= */

function animateScreen(num) {
    const screen = document.getElementById(`screen-${num}`);
    if (!screen) return;

    screen.classList.remove("fade-in");
    void screen.offsetWidth;
    screen.classList.add("fade-in");
}



/* =======================================================
   CREAR 8 PANTALLAS PREMIUM VACÍAS
   ======================================================= */

function createPremiumScreens() {
    const app = document.getElementById("app");
    app.innerHTML = "";

    for (let i = 1; i <= totalScreens; i++) {
        const section = document.createElement("section");
        section.id = `screen-${i}`;
        section.className = "screen premium-screen";
        section.style.display = "none";

        section.innerHTML = `
            <div class="screen-grid">

                <div class="screen-left">
                    <div class="screen-box">
                        <h2 class="screen-title">Pantalla ${i}</h2>
                        <p class="screen-desc">Contenido pendiente.</p>
                    </div>
                </div>

                <div class="screen-right">
                    <div class="screen-panel">
                        <div class="panel-placeholder"></div>
                    </div>
                </div>

            </div>
        `;

        app.appendChild(section);
    }

    createNavigationBar();
}



/* =======================================================
   PANTALLA 1 — PORTADA PREMIUM DEL SUBMÓDULO
   ======================================================= */

function loadPortadaUnidadAnalisis() {

    const p1 = document.getElementById("screen-1");

    p1.innerHTML = `
        <div class="screen-grid fade-in">

            <!-- IZQUIERDA -->
            <div class="screen-left">
                <div class="screen-box">

                    <h1 class="screen-title" style="font-size:58px; line-height:1.2;">
                        UNIDAD DE ANÁLISIS:<br>CONDUCTA EN CONTEXTO
                    </h1>

                    <h3 class="screen-desc" style="color:#FDBF12; font-size:28px; margin-bottom:30px;">
                        Cómo analizamos la conducta desde el contextualismo funcional
                    </h3>

                   <p class="screen-desc" style="font-size:18px;">
                        Este submódulo resuelve un problema frecuente:
                        analizar pensamientos o emociones sin considerar
                        <strong>las condiciones ambientales</strong> que les dan función.
                    </p>

                    <p class="screen-desc" style="font-size:17px; opacity:0.8;">
                        Aquí aprenderás por qué la unidad de análisis no es “la mente”,
                        sino la <strong>relación funcional entre acción y contexto</strong>.
                    </p>

                    <button class="btn-gold" 
                            style="margin-top:30px;" 
                            onclick="showScreen(2)">
                        Comenzar
                    </button>

                </div>
            </div>

            <!-- DERECHA -->
            <div class="screen-right">
                <div class="screen-panel" style="text-align:center;">
                    <img src="../assets/icons/hex-gold-back.png"
                         style="width:220px; opacity:0.9; filter:drop-shadow(0 0 12px rgba(253,191,18,0.6));">
                </div>
            </div>

        </div>
    `;
}
<script>
function toggleModulo(element) {
    const card = element.parentElement;
    card.classList.toggle("open");
}
</script>
