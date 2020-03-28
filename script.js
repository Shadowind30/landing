const fecha = document.querySelector('#fecha-placeholder');
const cajaTexto = document.querySelector('#text-field');
const titulo = document.querySelector('#titulo');
const tab = document.querySelector('#titulo-tab');
const textoSitio = document.querySelector('#texto-sitios');
const btnIdioma = document.querySelector('#idioma');

let txtUsuario = 'Usuario';
let msgDia = 'Buenos Dias';
let msgTarde = 'Buenas Tardes';
let msgNoche = 'Buenas Noches';
let msgSitios = 'Quieres visitar algun sitio frecuente?';
let msgAlerta = 'El campo no puede estar vacio';
let txtIdioma = 'ESP';
let txtCambioNombre = 'Cambiar Nombre';

let idioma = localStorage.idioma === undefined ? 'ESP' : localStorage.idioma;
let hora = 0;
let nombre = localStorage.nombre === undefined ? txtUsuario : localStorage.nombre;

let horaPunto = moment().format("LT").toLowerCase().split('');

setLocale();
cajaTexto.value = nombre;

if (horaPunto[1] === ':'){
    horaPunto.unshift('0');
}

function actualizarHTML(){
textoSitio.innerHTML = msgSitios;
btnIdioma.innerHTML = txtIdioma;
}

horaPunto[3] = '0';
horaPunto[4] = '0';
horaPunto = horaPunto.join('');
hora = formatoHora(horaPunto);

setInterval(function cambioCont() {
if (hora >= 19 || hora < 6) {
    titulo.innerHTML = msgNoche + ' ' + nombre;
    cambiarFondo('img/noche.webp');
}

if (hora >=6 && hora<12){
    titulo.innerHTML = msgDia + ' ' + nombre;
    cambiarFondo('img/dia.webp');
}

if (hora >=12 && hora<19){
    titulo.innerHTML = msgTarde + ' ' + nombre;
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
    localStorage.setItem('nombre',  cajaTexto.value);
    nombre = localStorage.nombre;
}

function cambiarFondo(fondoUrl){
  document.documentElement.style.setProperty('--imagen',`url(${fondoUrl}`);
}

function CambioAlerta(){
  alerta.style.display = alerta.style.display === 'block' ? 'none' : 'block';
}

function setLocale(){
  if(idioma === 'ENG'){
    moment.locale('EN-US');
  }
  else{
    moment.locale('ES-DO');
  }
}

function cambiarIdioma(){

  localStorage.setItem('idioma', (idioma === 'ESP' ? 'ENG' : 'ESP'));
  idioma = localStorage.idioma;
  cambiarTexto();

  setLocale()
}

function cambiarTexto(){
  if (localStorage.idioma === 'ENG' ){
    txtUsuario = 'User'
    msgDia = 'Good Morning';
    msgTarde = 'Good Afternoon';
    msgNoche = 'Good Night';
    msgSitios = 'Do you wanna go somewhere?';
    msgAlerta = 'Field cannot be empty';
    txtIdioma = 'ENG';
    txtCambioNombre = 'Change Name';
  }
  else{
    txtUsuario = 'Usuario';
    msgDia = 'Buenos Dias';
    msgTarde = 'Buenas Tardes';
    msgNoche = 'Buenas Noches';
    msgSitios = 'Quieres visitar algun sitio frecuente?';
    msgAlerta = 'El campo no puede estar vacio';
    txtIdioma = 'ESP';
    txtCambioNombre = 'Cambiar Nombre';
  }
  actualizarHTML();

}

cambiarTexto();
