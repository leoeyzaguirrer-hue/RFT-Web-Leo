let fase = 1;
let valorActivo = null;
let direcciones = [];

const valores = ["Aprender","Contribuir","Estar presente","Cuidar"];
const direccionesPorValor = {
  Aprender:["Practicar","Explorar","Estudiar"],
  Contribuir:["Ayudar","Enseñar","Apoyar"],
  "Estar presente":["Escuchar","Acompañar","Compartir"],
  Cuidar:["Proteger","Atender","Validar"]
};

const accionesPorDireccion = {
  Escuchar:["Apagar el celular","No interrumpir","Parafrasear"],
  Acompañar:["Acompañar a dormir","Permanecer cerca","Validar emoción"],
  Compartir:["Hablar","Jugar juntos","Contar experiencias"],
  Practicar:["Repetir ejercicios","Simular","Corregir errores"],
  Ayudar:["Apoyar en tareas","Orientar","Resolver juntos"]
};

const titulo = document.getElementById("tituloFase");
const contenedor = document.getElementById("contenedorTarjetas");

function cargarValores() {
  titulo.textContent = "FASE 1 · ELIGE UN VALOR";
  contenedor.innerHTML = "";
  valores.forEach(v=>{
    const t=document.createElement("div");
    t.className="tarjeta";
    t.textContent=v;
    t.onclick=()=>activarValor(v);
    contenedor.appendChild(t);
  });
}

function activarValor(v){
  valorActivo=v;
  document.getElementById("piramideValor").textContent=v;
}

function cargarDirecciones(){
  titulo.textContent="FASE 2 · ELIGE 3 DIRECCIONES";
  contenedor.innerHTML="";
  direcciones=[];
  direccionesPorValor[valorActivo].forEach(d=>{
    const t=document.createElement("div");
    t.className="tarjeta";
    t.textContent=d;
    t.onclick=()=>agregarDireccion(d);
    contenedor.appendChild(t);
  });
}

function agregarDireccion(d){
  if(direcciones.length<3){
    direcciones.push(d);
    document.getElementById("dir"+direcciones.length).textContent=d;
  }
}

function cargarAcciones(){
  titulo.textContent="FASE 3 · ACCIONES CONCRETAS";
  contenedor.innerHTML="";
  document.getElementById("zonaAcciones").innerHTML="";
  direcciones.forEach(d=>{
    accionesPorDireccion[d]?.forEach(a=>{
      const t=document.createElement("div");
      t.className="tarjeta";
      t.textContent=a;
      t.onclick=()=>agregarAccion(a);
      contenedor.appendChild(t);
    });
  });
}

function agregarAccion(a){
  const el=document.createElement("div");
  el.className="accion";
  el.textContent=a;
  document.getElementById("zonaAcciones").appendChild(el);
}

document.getElementById("siguiente").onclick=()=>{
  if(fase===1 && valorActivo){
    fase=2; cargarDirecciones();
  }else if(fase===2 && direcciones.length===3){
    fase=3; cargarAcciones();
  }
};

document.getElementById("reiniciar").onclick=()=>location.reload();

cargarValores();
