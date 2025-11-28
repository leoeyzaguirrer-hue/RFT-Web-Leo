/* =======================================================
   SISTEMA DE UI — Botones, toggles, etc.
   ======================================================= */

function initUI() {
    console.log("UI Inicializada");
}


/* Mostrar/ocultar elementos */
function show(el) { el.style.display = "block"; }
function hide(el) { el.style.display = "none"; }


/* Activar/desactivar botones */
function enable(btn) { btn.disabled = false; }
function disable(btn) { btn.disabled = true; }


/* Mensajes internos */
function alertBox(msg) {
    alert(msg);
}



/* =======================================================
   ACORDEÓN DE MÓDULOS (AGREGADO)
   ======================================================= */

/**
 * Abre/cierra los submódulos dentro de un módulo.
 * Se activa cuando haces clic en un módulo completo.
 */
function toggleSubmodulo(modulo) {
    const content = modulo.querySelector('.submodulos');
    content.classList.toggle('open');
}

/**
 * (Opcional) Estilo visual más suave al pasar el mouse.
 * No rompe nada si no existe la clase en CSS.
 */
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".modulo-header").forEach(header => {
        header.addEventListener("mouseover", () => {
            header.classList.add("hover-modulo");
        });

        header.addEventListener("mouseout", () => {
            header.classList.remove("hover-modulo");
        });
    });
});
