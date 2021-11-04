// Create an empty variable for the city history
var cityHistory = [];

// Create variable that select elements on the HTML file
var cityInput = document.querySelector("#cityInput");
var citySubmit = document.querySelector("#citySubmit");
var currentWeather = document.querySelector("#currentWeather")

// Display stored history

// Create a function to convert temperature to Farenheit
function convertFarenheit(temperature) {
    return ((temperature - 273.15) * 9 / 5 + 32).toFixed()
}

// Create a function to fetch data from weather API and append specific data
function fetchData() {
    var cityName = cityInput.value;
    var apiKey = "462736f7423dc6ea90662fdc8ba4ec01"
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey

    fetch(requestUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function(weatherData) {
            console.log(weatherData)

            var today = moment().format("MMMM Do, YYYY");
            console.log(today);
            var icon = weatherData.weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";

            // Append the city's name and current date
            var nameDate = document.createElement("p")
            nameDate.id = "nameDate"
            nameDate.textContent = cityName + " " + today + " ";
            currentWeather.appendChild(nameDate);
            
            // Append weather icon
            var currentIcon = document.createElement("img");
            currentIcon.src = iconUrl;
            nameDate.appendChild(currentIcon);

            // Append temperature in farenheit
            var currentTemp = convertFarenheit(weatherData.main.temp);
            

        })

    
};

// Create a click listener to get city from input value
citySubmit.addEventListener("click", fetchData)