let fecha = document.querySelector("#fecha-placeholder");
let cajaTexto = document.querySelector("#text-field");
let titulo = document.querySelector("#titulo");
let tab = document.querySelector("#titulo-tab");

let hora = 0;
let nombre = '';

validarNombre();

setInterval(function cambioCont() {
if (hora >=19 || hora<6) {
    titulo.innerHTML = "Buenas noches"+" "+nombre;
    tab.innerHTML = "Buenas noches"+" "+nombre;
    document.documentElement.style.setProperty('--imagen', 'url("img/noche.jpg")');
}

if (hora >=6 && hora<12){
    titulo.innerHTML = "Buenos dias"+" "+nombre;
    tab.innerHTML = "Buenas dias"+" "+nombre;
    document.documentElement.style.setProperty('--imagen', 'url("img/dia.jpg")');
}

if (hora >=12 && hora<19){
    titulo.innerHTML = "Buenas tardes"+" "+nombre;
    tab.innerHTML = "Buenas tardes"+" "+nombre;
    document.documentElement.style.setProperty('--imagen', 'url("img/tarde.jpg")');   
}

},1000);

moment.locale("ES-DO");

setInterval(function updateFecha() {
  fecha.innerHTML = moment().format('dddd')+" "+moment().format('LL')+" "+moment().format('LTS');
},1000)


function formatoHora(hora){
    switch(hora){
        case "12:00 am" : return 0;
        break;
        case "01:00 am" : return 1;
        break;
        case "02:00 am" : return 2;
        break;
        case "03:00 am" : return 3;
        break;
        case "04:00 am" : return 4;
        break;
        case "05:00 am" : return 5;
        break;
        case "06:00 am" : return 6;
        break;
        case "07:00 am" : return 7;
        break;
        case "08:00 am" : return 8;
        break;
        case "09:00 am" : return 9;
        break;
        case "10:00 am" : return 10;
        break;
        case "11:00 am" : return 11;
        break;
        case "12:00 pm" : return 12;
        break;
        case "01:00 pm" : return 13;
        break;
        case "02:00 pm" : return 14;
        break;
        case "03:00 pm" : return 15;
        break;
        case "04:00 pm" : return 16;
        break;
        case "05:00 pm" : return 17;
        break;
        case "06:00 pm" : return 18;
        break;
        case "07:00 pm" : return 19;
        break;
        case "08:00 pm" : return 20;
        break;
        case "09:00 pm" : return 21;
        break;
        case "10:00 pm" : return 22;
        break;
        case "11:00 pm" : return 23;
        break;

    }
}

var horaPunto = moment().format("LT").toLowerCase().split("")

if (horaPunto[1]==":"){
    horaPunto.unshift("0");
}

horaPunto[3]="0";
horaPunto[4]="0";

horaPunto = horaPunto.join('');
console.log(horaPunto);
setInterval(function punto(){
   
},1000)

hora = formatoHora(horaPunto);

console.clear();

function cambiarNombre(){
    localStorage.setItem('nombre',  cajaTexto.value);
    nombre=localStorage.nombre;
}

function validarNombre(){
    nombre = localStorage.nombre === undefined ? 'Usuario' : localStorage.nombre;

}