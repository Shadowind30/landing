const dateElement = document.querySelector("#date-placeholder");
const timeElement = document.querySelector("#time-placeholder");
const input = document.querySelector("#text-field");
const title = document.querySelector("#title");
const tab = document.querySelector("#titulo-tab");
const subtitle = document.querySelector("#subtitle");
const langButton = document.querySelector("#lang-button");
const tempPlaceHolder = document.querySelector("#temp");

let txtUsuario = "";
let msgDia = "Buenos Dias";
let msgTarde = "Buenas Tardes";
let msgNoche = "Buenas Noches";
let msgSitios = "Quieres visitar algun sitio frecuente?";
let txtIdioma = "ESP";
let txtName = "Nombre";
let currentBG = "#000";

let idioma = localStorage.idioma ? localStorage.idioma : getBrowserLang();
let hora = 0;
let nombre = getName();

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

function updateTemplate() {
  nombre = getName();
  subtitle.innerText = msgSitios;
  langButton.innerText = txtIdioma;
  input.placeholder = txtName;
}

function getHourArray() {
  let horaPunto = moment().format("LT").toLowerCase().split("");
  if (horaPunto[1] === ":") {
    horaPunto.unshift("0");
  }
  horaPunto[3] = "0";
  horaPunto[4] = "0";
  horaPunto = horaPunto.join("");
  return horaPunto;
}

// #region Recursividad

let expected = Date.now() + 1000;

function step() {
  hora = formatHour(getHourArray());
  updateFecha();
  cambioCont();
  const dt = Date.now() - expected;
  expected += 1000;
  setTimeout(step, Math.max(0, 1000 - dt));
}

function cambioCont() {
  let currentTitle = title.innerText;
  let newTitle;
  if (hora >= 19 || hora < 6) {
    newTitle = msgNoche + ", " + nombre;
    changeBg("img/noche.webp");
  }

  if (hora >= 6 && hora < 12) {
    newTitle = msgDia + ", " + nombre;
    changeBg("img/dia.webp");
  }

  if (hora >= 12 && hora < 19) {
    newTitle = msgTarde + ", " + nombre;
    changeBg("img/tarde.jpg");
  }

  if (currentTitle === newTitle) return;

  title.innerText = newTitle;
  tab.innerText = newTitle;
}

function updateFecha() {
  dateElement.innerText = moment().format("dddd") + " " + moment().format("LL");
  timeElement.innerText = moment().format("LTS").padStart(11, "0");
}

setTimeout(step, 1000);

// #endregion

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
  txtUsuario = ls.idioma === "es" ? "Usuario" : "User";
  return !ls.nombre ? txtUsuario : ls.nombre;
}

function changeName() {
  localStorage.setItem("nombre", input.value);
  nombre = getName();
}

function changeBg(newBG) {
  if (currentBG === newBG) return;
  currentBG = newBG;
  document.documentElement.style.setProperty("--imagen", `url(${newBG}`);
}

function setLocale() {
  switch (idioma) {
    case "en":
      moment.locale("EN-US");
      break;
    case "es":
      moment.locale("ES-DO");
      break;
    default:
      moment.locale("EN-US");
      break;
  }
  localStorage.idioma = idioma;
}

function getBrowserLang() {
  const nav = window.navigator;
  const fullLang =
    (Array.isArray(nav.languages) && nav.languages.length
      ? nav.languages[0]
      : nav.language || nav.userLanguage) || "en";

  return fullLang.slice(0, 2).toLowerCase();
}

console.log(getBrowserLang());

function changeLang() {
  localStorage.setItem("idioma", idioma === "en" ? "es" : "en");
  idioma = localStorage.idioma;
  changeText();
  setLocale();
}

const setENTexts = () => {
  txtUsuario = "User";
  msgDia = "Good Morning";
  msgTarde = "Good Afternoon";
  msgNoche = "Good Night";
  msgSitios = "Do you wanna go somewhere?";
  txtIdioma = "ENG";
  txtName = "Name";
};

const setESTexts = () => {
  txtUsuario = "Usuario";
  msgDia = "Buenos Dias";
  msgTarde = "Buenas Tardes";
  msgNoche = "Buenas Noches";
  msgSitios = "¿Quieres visitar algun sitio frecuente?";
  txtIdioma = "ESP";
  txtName = "Nombre";
};

function changeText() {
  switch (localStorage.idioma) {
    case "en":
      setENTexts();
      break;
    case "es":
      setESTexts();
      break;
    default:
      setENTexts();
      break;
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
  tempPlaceHolder.innerText = data.main.temp + " °C";
}

function addSitio(data) {
  let container = document.getElementById("shortcuts");
  data.forEach((element) => {
    const sitio = `     <div class="shortcut-item">
      <img onclick="openSite('${element.url}')" src="${element.img}" alt="${element.title}">
</div>`;
    container.innerHTML += sitio;
  });
}

function openSite(url) {
  window.open(url, "_blank");
}

addSitio(sites);
getLocation();
