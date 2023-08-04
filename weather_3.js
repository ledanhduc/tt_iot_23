const apiKey = "2bb5c13c302737b658da7f4907b1a168";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?lang=vi&units=metric&q=";

const searchBox = document.querySelector(".search input");
const weatherIcon = document.querySelector(".weather-icon");

let lct = JSON.parse(localStorage.getItem("lct")) || "thu duc";
let intervalId;

const intervalTime = 6 * 60 * 1000; // 6 phút ~ 10 lần/h

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      const data = await response.json();

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".w_temp").innerHTML = Math.round(data.main.temp) + "°c"
      document.querySelector(".w_humi").innerHTML = data.main.humidity + "%";
      document.querySelector(".w_wind").innerHTML = data.wind.speed + " km/h";
      weatherIcon.src = `img_weather/${data.weather[0].icon}.svg`;

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }
  } catch (error) {
    console.log(error);
  }
  console.log(localStorage.getItem('lct'));
}

searchBox.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    checkWeather(searchBox.value);
    localStorage.setItem("lct", JSON.stringify(searchBox.value));
    searchBox.value = "";
    lct = JSON.parse(localStorage.getItem("lct")) || "thu duc";
  }
});

checkWeather(lct);
intervalId = setInterval(() => {
  checkWeather(lct);
}, intervalTime);

