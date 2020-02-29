moment.locale("ES-DO");

const alerta = document.querySelector('#alerta');
const fecha = document.querySelector('#fecha-placeholder');
const cajaTexto = document.querySelector('#text-field');
const titulo = document.querySelector('#titulo');
const tab = document.querySelector('#titulo-tab');

let hora = 0;
let nombre = localStorage.nombre === undefined ? 'Usuario' : localStorage.nombre;
let horaPunto = moment().format("LT").toLowerCase().split('');

if (horaPunto[1] === ':'){
    horaPunto.unshift('0');
}

horaPunto[3] = '0';
horaPunto[4] = '0';
horaPunto = horaPunto.join('');
hora = formatoHora(horaPunto);

setInterval(function cambioCont() {
if (hora >= 19 || hora < 6) {
    titulo.innerHTML = 'Buenas noches' + ' ' + nombre;
    cambiarFondo('img/noche.webp');
}

if (hora >=6 && hora<12){
    titulo.innerHTML = 'Buenos dias' + ' ' + nombre;
    cambiarFondo('img/dia.webp');
}

if (hora >=12 && hora<19){
    titulo.innerHTML = 'Buenas tardes' + ' ' + nombre;
    cambiarFondo('img/tarde.jpg');
}

tab.innerHTML = titulo.innerHTML;

},1000);

setInterval(function updateFecha() {
  fecha.innerHTML = moment().format('dddd')+ ' ' + moment()
  .format('LL') + ' ' + moment().format('LTS');
},1000);


function formatoHora(hora){
    let nHora = Number(hora[0] + hora[1]);
    if (nHora !== 12){
    nHora = hora.includes('a') ? nHora : nHora + 12;
    }
    else {
    nHora = hora.includes('p') ? 12 : 0;
    }
    return nHora;
}

function cambiarNombre(){
  if (cajaTexto.value === localStorage.nombre) return;

  if(cajaTexto.value !== ''){
    localStorage.setItem('nombre',  cajaTexto.value);
    nombre = localStorage.nombre;
    alerta.style.display = 'none';
  } else {
      alerta.style.display = 'block';
  }

}

function cambiarFondo(fondoUrl){
  document.documentElement.style.setProperty('--imagen',`url(${fondoUrl}`);
}

function CambioAlerta(){
  alerta.style.display = alerta.style.display === 'block' ? 'none' : 'block';
}
