let faseActual = 0;
const fases = document.querySelectorAll('.fase');
const btnSiguiente = document.getElementById('siguiente');
const btnReiniciar = document.getElementById('reiniciar');

let valorSeleccionado = "";
let direccionesCorrectas = 0;

function mostrarFase(n) {
  fases.forEach(f => f.classList.remove('activa'));
  fases[n].classList.add('activa');
}

btnSiguiente.addEventListener('click', () => {
  if (faseActual < fases.length - 1) {
    faseActual++;
    mostrarFase(faseActual);
  }
});

btnReiniciar.addEventListener('click', () => {
  location.reload();
});

document.querySelectorAll('.tarjeta').forEach(tarjeta => {
  tarjeta.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text', e.target.textContent);
    e.dataTransfer.setData('correcta', e.target.dataset.correcta || "true");
    e.dataTransfer.setData('tipo', e.target.classList.contains('direccion') ? 'direccion' :
      e.target.classList.contains('accion') ? 'accion' : 'valor');
  });
});

function activarDrop(zona, callback) {
  zona.addEventListener('dragover', e => e.preventDefault());
  zona.addEventListener('drop', e => {
    e.preventDefault();
    callback(e);
  });
}

activarDrop(document.getElementById('zonaValor'), e => {
  valorSeleccionado = e.dataTransfer.getData('text');
  e.target.textContent = valorSeleccionado;
  document.getElementById('valorFijo').textContent = valorSeleccionado;
  document.getElementById('valorFinal').textContent = valorSeleccionado;
});

activarDrop(document.getElementById('zonaDireccion'), e => {
  const correcta = e.dataTransfer.getData('correcta') === "true";
  if (correcta) {
    direccionesCorrectas++;
    document.getElementById('direccionFinal').textContent =
      e.dataTransfer.getData('text');
  } else {
    alert("Esta dirección no coordina con el valor activo.");
  }
});

activarDrop(document.getElementById('zonaAccion'), e => {
  e.target.textContent = e.dataTransfer.getData('text');
  e.target.classList.add('correcta');
});

document.getElementById('btnValor').addEventListener('click', () => {
  document.getElementById('resultadoFinal').textContent =
    "Elegiste el valor: la coherencia sigue presente, pero la dirección de tu conducta cambia.";
});

document.getElementById('btnCoherencia').addEventListener('click', () => {
  document.getElementById('resultadoFinal').textContent =
    "Elegiste la coherencia: el malestar dirige nuevamente tu acción.";
});

mostrarFase(0);
