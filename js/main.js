/* =======================================================
   SISTEMA CENTRAL DE NAVEGACIÓN (8 PANTALLAS)
   Opción B — Avanzado con sistema de progreso
   ======================================================= */

let currentScreen = 1;          // Pantalla actual
const totalScreens = 8;         // Número total de pantallas por submódulo

document.addEventListener("DOMContentLoaded", () => {
    console.log("Sistema cargado: Unidad de Análisis");

    createPremiumScreens();       // Crea las pantallas internas
    showScreen(1);                // Muestra la primera pantalla
    setupNavigation();            // Activa botones anterior/siguiente
});


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
    <button id="btn-prev" class="btn-ghost">Anterior</button>
    <button id="btn-next" class="btn-gold">Siguiente</button>
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



/* =======================================================
   CREAR PANTALLAS PREMIUM (estructura visual)
   ======================================================= */

function createPremiumScreens() {
    const app = document.getElementById("app");
    app.innerHTML = "";

    for (let i = 1; i <= totalScreens; i++) {

        const section = document.createElement("section");
        section.id = `screen-${i}`;
        section.className = "screen premium-screen";
        section.style.display = "none";

        /* ============================================
           PANTALLA 1 — PORTADA DEL CURSO RFT
        ============================================ */
        if (i === 1) {

            section.innerHTML = `
                <div class="portada-rft">

                    <!-- LOGO SUPERIOR -->
                    <div class="logo-superior">
                        <img src="assets/logo/logo-main.png" class="logo-main">
                    </div>

                    <!-- ICONO HEXAGONAL -->
                    <div class="hexagon-icon">
                        <img src="assets/icons/hexagon-gold.svg">
                    </div>

                    <!-- TÍTULO -->
                    <h1 class="titulo-portada">TEORÍA DEL MARCO RELACIONAL (RFT)</h1>

                    <!-- SUBTÍTULO -->
                    <h2 class="subtitulo-portada">Un mapa funcional del comportamiento verbal</h2>

                    <!-- PREGUNTA -->
                    <p class="pregunta-portada">
                        ¿Cómo surge el significado y cómo transforma nuestra conducta en contexto?
                    </p>

                    <!-- INTRODUCCIÓN -->
                    <p class="intro-portada">
                        El lenguaje humano no es solo un sistema para describir el mundo, sino una forma 
                        de actuar que transforma nuestra experiencia y regulación psicológica. La Teoría 
                        del Marco Relacional ofrece un modelo funcional para comprender cómo las 
                        relaciones simbólicas generan patrones de conducta, sufrimiento y flexibilidad.
                    </p>

                    <!-- MÓDULOS -->
                    <div class="modulos-container">

                        <div class="modulo acordeon" onclick="toggleSubmodulo(this)">
                            <div class="modulo-header">⬡ Filosofía Contextual</div>
                            <div class="submodulos">
                                <button>Contextualismo Funcional</button>
                                <button>Unidad de Análisis</button>
                                <button>Verdad como lo que Funciona</button>
                                <button>Conducta Privada ≠ Mente</button>
                                <button>Lenguaje como Conducta</button>
                            </div>
                        </div>

                        <div class="modulo acordeon" onclick="toggleSubmodulo(this)">
                            <div class="modulo-header">⬡ Ciencia del Lenguaje</div>
                            <div class="submodulos">
                                <button>Equivalencia de Estímulos</button>
                                <button>Aprendizaje Relacional</button>
                                <button>Enmarques</button>
                                <button>Transformación de Funciones</button>
                            </div>
                        </div>

                        <div class="modulo acordeon" onclick="toggleSubmodulo(this)">
                            <div class="modulo-header">⬡ Procesos Clínicos</div>
                            <div class="submodulos">
                                <button>Fusión</button>
                                <button>Yo como Contexto</button>
                                <button>Reglas vs Contingencias</button>
                                <button>Evitación y Regulación</button>
                            </div>
                        </div>

                        <div class="modulo acordeon" onclick="toggleSubmodulo(this)">
                            <div class="modulo-header">⬡ Actuares Clínicos</div>
                            <div class="submodulos">
                                <button>ACT como Aplicación Relacional</button>
                                <button>Ejercicios desde ACT & RFT</button>
                            </div>
                        </div>

                        <div class="modulo acordeon" onclick="toggleSubmodulo(this)">
                            <div class="modulo-header">⬡ Recursos</div>
                            <div class="submodulos">
                                <button>Experimentos Interactivos</button>
                                <button>Biblioteca de Conceptos</button>
                            </div>
                        </div>

                    </div>

                    <!-- BOTÓN PRINCIPAL -->
                    <button class="btn-premium btn-primario iniciar-viaje">
                        Iniciar Viaje
                    </button>

                    <!-- AUTORÍA -->
                    <p class="creditos-portada">
                        Diseño por Leo Eyzaguirre — Plataforma RFT/ACT
                    </p>

                </div>
            `;

        } else {

            /* ============================================
               DEMÁS PANTALLAS (vacías por ahora)
            ============================================ */
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
                            <div class="panel-placeholder">
                            </div>
                        </div>
                    </div>

                </div>
            `;
        }

        app.appendChild(section);
    }

    createNavigationBar();
}
