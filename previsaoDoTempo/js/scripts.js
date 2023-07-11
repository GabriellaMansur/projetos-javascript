// fbe37eab2cc6efa7796cb94f3775206b não é bom mostar isso no github, usar .end (não sei o que é isso)


// Variáveis e seleção de elementoa
const apiKey  = "fbe37eab2cc6efa7796cb94f3775206b";
const apiCountryURL = "https://flagsapi.com/BR/flat/64.png";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");




// Funções
const getWeatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    return data
};





const showWeatherData = async (city) => {
    const data =  await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${weather[0].icon}.png`)
    countryElement.setAttribute("src", apiCountryURL + data.sys.country);
    humidityElement.innerText = `${data.menu.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;
};





//Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityInput.value;
    showWeatherData(city);
});


//pare 48 min