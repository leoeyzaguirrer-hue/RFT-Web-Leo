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
