const fecha = document.querySelector("#fecha-placeholder");
const input = document.querySelector("#text-field");
const titulo = document.querySelector("#titulo");
const tab = document.querySelector("#titulo-tab");
const textoSitio = document.querySelector("#texto-sitios");
const btnIdioma = document.querySelector("#idioma");
const tempPlaceHolder = document.querySelector("#temp");

let txtUsuario = "";
let msgDia = "Buenos Dias";
let msgTarde = "Buenas Tardes";
let msgNoche = "Buenas Noches";
let msgSitios = "Quieres visitar algun sitio frecuente?";
let txtIdioma = "ESP";

let idioma = !!localStorage.idioma ? localStorage.idioma : "ESP";
let hora = 0;
let nombre = getName();

let horaPunto = moment().format("LT").toLowerCase().split("");

const sites = [
  {
    url: "https://www.youtube.com/",
    img: "img/yt.webp",
    title: "YouTube",
  },
  {
    url: "https://web.whatsapp.com",
    img: "img/ws.webp",
    title: "Whatsapp Web",
  },
  {
    url: "https://trello.com/es",
    img: "img/trl.webp",
    title: "Trello",
  },
  {
    url: "https://2conv.com/es",
    img: "img/2c.webp",
    title: "2Conv",
  },
  {
    url: "https://github.com",
    img: "img/git.webp",
    title: "GitHub",
  },
];

setLocale();
if (!!localStorage.nombre) {
  input.value = nombre;
}

if (horaPunto[1] === ":") {
  horaPunto.unshift("0");
}

function updateTemplate() {
  nombre = getName();
  textoSitio.innerText = msgSitios;
  btnIdioma.innerText = txtIdioma;
}

horaPunto[3] = "0";
horaPunto[4] = "0";
horaPunto = horaPunto.join("");
hora = formatHour(horaPunto);

setInterval(function cambioCont() {
  if (hora >= 19 || hora < 6) {
    titulo.innerHTML = msgNoche + " " + nombre;
    changeBg("img/noche.webp");
  }

  if (hora >= 6 && hora < 12) {
    titulo.innerHTML = msgDia + " " + nombre;
    changeBg("img/dia.webp");
  }

  if (hora >= 12 && hora < 19) {
    titulo.innerHTML = msgTarde + " " + nombre;
    changeBg("img/tarde.jpg");
  }

  tab.innerHTML = titulo.innerHTML;
}, 1000);

setInterval(function updateFecha() {
  fecha.innerHTML =
    moment().format("dddd") +
    " " +
    moment().format("LL") +
    " " +
    moment().format("LTS");
}, 1000);

function formatHour(hora) {
  let nHora = Number(hora[0] + hora[1]);
  if (nHora !== 12) {
    nHora = hora.includes("a") ? nHora : nHora + 12;
  } else {
    nHora = hora.includes("p") ? 12 : 0;
  }
  return nHora;
}

function getName() {
  const ls = localStorage;
  txtUsuario = ls.idioma === "ESP" ? "Usuario" : "User";
  return !ls.nombre ? txtUsuario : ls.nombre;
}

function changeName() {
  localStorage.setItem("nombre", input.value);
  nombre = getName();
}

function changeBg(fondoUrl) {
  document.documentElement.style.setProperty("--imagen", `url(${fondoUrl}`);
}

function setLocale() {
  if (idioma === "ENG") {
    moment.locale("EN-US");
  } else {
    moment.locale("ES-DO");
  }
  localStorage.idioma = idioma;
}

function changeLang() {
  localStorage.setItem("idioma", idioma === "ESP" ? "ENG" : "ESP");
  idioma = localStorage.idioma;
  changeText();

  setLocale();
}

function changeText() {
  if (localStorage.idioma === "ENG") {
    txtUsuario = "User";
    msgDia = "Good Morning";
    msgTarde = "Good Afternoon";
    msgNoche = "Good Night";
    msgSitios = "Do you wanna go somewhere?";
    msgAlerta = "Field cannot be empty";
    txtIdioma = "ENG";
  } else {
    txtUsuario = "Usuario";
    msgDia = "Buenos Dias";
    msgTarde = "Buenas Tardes";
    msgNoche = "Buenas Noches";
    msgSitios = "¿Quieres visitar algun sitio frecuente?";
    msgAlerta = "El campo no puede estar vacio";
    txtIdioma = "ESP";
  }
  updateTemplate();
}

changeText();

function getLocation() {
  let position = null;
  navigator.geolocation.getCurrentPosition((pos) => {
    position = {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    };
    getWeather(position.latitude, position.longitude);
  });

  return position;
}
async function getWeather(latitude, longitude) {
  let res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,daily&units=metric&appid=d2d6b67ea1453a77081c16c2d1b80cee`
  );
  let data = await res.json();
  //console.log(data.current.temp)
  tempPlaceHolder.innerText = data.current.temp + " °C";
}

function addSitio(data) {
  data.forEach((element) => {
    const sitio = `     <div>
  <a class='sitio' href="${element.url}"  target="_blank">
      <img src="${element.img}" alt="${element.title}">
  </a>
</div>`;
    let container = document.getElementById("cont-2");
    container.innerHTML += sitio;
  });
}

addSitio(sites);
getLocation();
