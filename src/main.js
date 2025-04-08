import "./style.css";

let id = "6cb12a1174af13c67f41863352114b6a";
let url =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" + id;

const main = document.querySelector("main");
const form = document.querySelector("form");
const valueSearch = document.getElementById("valueSearch");
const weatherImg = document.getElementById("weatherImg");
const city = document.getElementById("city");
const temperature = document.getElementById("temperature");
const flag = document.getElementById("flag");
const description = document.querySelector(".description");
const cloud = document.querySelector(".cloud");
const humidity = document.querySelector(".humidity");
const pressure = document.querySelector(".pressure");

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (valueSearch != "") {
    searchWeather();
  }
});

const searchWeather = async () => {
  try {
    let response = await fetch(url + "&q=" + valueSearch.value);
    let data = await response.json();

    if (data.cod === 200) {
      city.innerHTML = data.name;
      flag.src = `https://flagsapi.com/${data.sys.country}/flat/32.png`;

      weatherImg.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
      temperature.innerHTML = Math.floor(data.main.temp);
      description.innerHTML = data.weather[0].description;

      cloud.innerHTML = data.clouds.all + "%";
      humidity.innerHTML = data.main.humidity + "%";
      pressure.innerHTML = data.main.pressure + "hPa";
    } else {
      main.classList.add("error");
      main.style.border = "2px solid red";
      form.style.border = "2px solid red";

      setTimeout(() => {
        main.classList.remove("error");
        main.style.border = "none";
        form.style.border = "1px solid #5553";
      }, 1000);
    }
  } catch (error) {
    console.error("Error:", error);
  }

  valueSearch.value = "";
};

const initial = () => {
  valueSearch.value = "mumbai";
  searchWeather();
};

initial();
