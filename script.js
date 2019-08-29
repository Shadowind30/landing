let fecha = document.querySelector("#fecha-placeholder");
let hora = parseInt(moment().format("h"));
let nombre = "Carlos";

let titulo = document.querySelector("#titulo")

if ((hora >=19 && hora<23) || (hora >=0 && hora<6)) {
    titulo.innerHTML = "Buenas noches"+" "+nombre;
    document.documentElement.style.setProperty('--imagen', 'url("img/noche.jpg")');
}

if (hora >=6 && hora<12){
    titulo.innerHTML = "Buenos dias"+" "+nombre;
    document.documentElement.style.setProperty('--imagen', 'url("img/dia.jpg")');    
}

if (hora >=12 && hora<19){
    titulo.innerHTML = "Buenas tardes"+" "+nombre;
    document.documentElement.style.setProperty('--imagen', 'url("img/tarde.jpg")');    
}

moment.locale("ES-DO");

setInterval(function updateFecha() {
  fecha.innerHTML = moment().format('dddd')+" "+moment().format('LL')+" "+moment().format('LTS');
},1000)

