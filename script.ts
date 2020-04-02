const fecha = document.querySelector('#fecha-placeholder');
const cajaTexto = document.querySelector('#text-field') as HTMLInputElement;
const titulo = document.querySelector('#titulo');
const tab = document.querySelector('#titulo-tab');
const textoSitio = document.querySelector('#texto-sitios');
const btnIdioma = document.querySelector('#idioma');
// @ts-ignore
const Moment = moment;

let txtUsuario : string = '';
let msgDia : string = 'Buenos Dias';
let msgTarde : string = 'Buenas Tardes';
let msgNoche : string = 'Buenas Noches';
let msgSitios : string = 'Quieres visitar algun sitio frecuente?';
let msgAlerta : string = 'El campo no puede estar vacio';
let txtIdioma : string = 'ESP';

let idioma : any = localStorage.idioma === undefined ? 'ESP' : localStorage.idioma;
let hora : number = 0;
let nombre : string = cargarNombre();
let horaPunto : number = 0;
let horaPuntoArr : string[] = Moment().format("LT").toLowerCase().split('');

setLocale();
if (localStorage.nombre !== 'undefined' && localStorage.nombre !== '') {
  cajaTexto.value = nombre;
}

if (horaPuntoArr[1] === ':'){
    horaPuntoArr.unshift('0');
}

function actualizarHTML(){
nombre = cargarNombre();
textoSitio.innerHTML = msgSitios;
btnIdioma.innerHTML = txtIdioma;
}

horaPuntoArr[3] = '0';
horaPuntoArr[4] = '0';
horaPunto = Number(horaPuntoArr.join(''));
hora = formatoHora(horaPuntoArr);

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
  fecha.innerHTML = Moment().format('dddd')+ ' ' + Moment()
  .format('LL') + ' ' + Moment().format('LTS');
},1000);


function formatoHora(hora : string[]){

    let nHora = Number(hora[0] + hora[1]);
    if (nHora !== 12){
    nHora = hora.includes('a') ? nHora : nHora + 12;
    }
    else {
    nHora = hora.includes('p') ? 12 : 0;
    }
    return nHora;
}

function cargarNombre(){
  const ls = localStorage;
  txtUsuario = (ls.idioma === 'ESP' ? 'Usuario' : 'User');
  return ((ls.nombre === 'undefined' || ls.nombre === '' ) ? txtUsuario : ls.nombre);
}


function cambiarNombre(){
  localStorage.setItem('nombre',  cajaTexto.value);
  nombre = cargarNombre();
}

function cambiarFondo(fondoUrl : string){
  document.documentElement.style.setProperty('--imagen',`url(${fondoUrl}`);
}


function setLocale(){
  if(idioma === 'ENG'){
    Moment.locale('EN-US');
  }
  else{
    Moment.locale('ES-DO');
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
  }
  else{
    txtUsuario = 'Usuario';
    msgDia = 'Buenos Dias';
    msgTarde = 'Buenas Tardes';
    msgNoche = 'Buenas Noches';
    msgSitios = 'Quieres visitar algun sitio frecuente?';
    msgAlerta = 'El campo no puede estar vacio';
    txtIdioma = 'ESP';
  }
  actualizarHTML();

}

cambiarTexto();
