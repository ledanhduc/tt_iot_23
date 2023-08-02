const apiKey = "2bb5c13c302737b658da7f4907b1a168";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?lang=vi&units=metric&q=";
// const defaultCity = "Ho Chi Minh City"; 
const defaultCity = "thu duc"; 
 
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon =document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
 
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".w_temp").innerHTML = Math.round(data.main.temp) + "°C"
        document.querySelector(".w_humi").innerHTML = data.main.humidity + "%";
        document.querySelector(".w_wind").innerHTML = data.wind.speed + " km/h";

        if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "img/clouds.png";
        }
        else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "img/clear.png";
        }
        else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "img/rain.png";
        }
        else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "img/drizzle.png";
        }
        else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "img/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
        
    }
}

checkWeather(defaultCity);

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
        checkWeather(searchBox.value);
    }
});