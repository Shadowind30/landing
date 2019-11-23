moment.locale("ES-DO");

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
    document.documentElement.style.setProperty('--imagen', 'url("img/noche.jpg")');
}

if (hora >=6 && hora<12){
    titulo.innerHTML = 'Buenos dias' + ' ' + nombre;
    document.documentElement.style.setProperty('--imagen', 'url("img/dia.jpg")');
}

if (hora >=12 && hora<19){
    titulo.innerHTML = 'Buenas tardes' + ' ' + nombre;
    document.documentElement.style.setProperty('--imagen', 'url("img/tarde.jpg")');   
}

tab.innerHTML = titulo.innerHTML;

},1000);



setInterval(function updateFecha() {
  fecha.innerHTML = moment().format('dddd')+ ' ' + moment()
  .format('LL') + ' ' + moment().format('LTS');
},1000);


function formatoHora(hora){
    let nHora = 0;
    switch(hora){
        case "12:00 am" : nHora = 0;
        break;
        case "01:00 am" : nHora = 1;
        break;
        case "02:00 am" : nHora = 2;
        break;
        case "03:00 am" : nHora = 3;
        break;
        case "04:00 am" : nHora = 4;
        break;
        case "05:00 am" : nHora = 5;
        break;
        case "06:00 am" : nHora = 6;
        break;
        case "07:00 am" : nHora = 7;
        break;
        case "08:00 am" : nHora = 8;
        break;
        case "09:00 am" : nHora = 9;
        break;
        case "10:00 am" : nHora = 10;
        break;
        case "11:00 am" : nHora = 11;
        break;
        case "12:00 pm" : nHora = 12;
        break;
        case "01:00 pm" : nHora = 13;
        break;
        case "02:00 pm" : nHora = 14;
        break;
        case "03:00 pm" : nHora = 15;
        break;
        case "04:00 pm" : nHora = 16;
        break;
        case "05:00 pm" : nHora = 17;
        break;
        case "06:00 pm" : nHora = 18;
        break;
        case "07:00 pm" : nHora = 19;
        break;
        case "08:00 pm" : nHora = 20;
        break;
        case "09:00 pm" : nHora = 21;
        break;
        case "10:00 pm" : nHora = 22;
        break;
        case "11:00 pm" : nHora = 23;
        break;
        default: nHora = 0;

    }

    return nHora;
}

function cambiarNombre(){
  localStorage.setItem('nombre',  cajaTexto.value);
  nombre = localStorage.nombre;
}
