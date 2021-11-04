// Create an empty variable for the city history
var cityHistory = [];

// Create variable that select elements on the HTML file
var cityInput = document.querySelector("#cityInput");
var citySubmit = document.querySelector("#citySubmit");
var currentWeather = document.querySelector("#currentWeather");
var forecast = document.querySelector("#forecast");

// Display stored history

// Create a function to convert temperature to Farenheit
function convertFarenheit(temperature) {
    return ((temperature - 273.15) * 9 / 5 + 32).toFixed()
}



// Create a function to fetch data from weather API and append specific data
function fetchData() {
    var cityName = cityInput.value;
    var apiKey = "462736f7423dc6ea90662fdc8ba4ec01"
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey;

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
            var nameDate = document.createElement("p");
            nameDate.id = "nameDate";
            nameDate.textContent = cityName + " " + today + " ";
            currentWeather.appendChild(nameDate);
            
            // Append weather icon
            var currentIcon = document.createElement("img");
            currentIcon.src = iconUrl;
            nameDate.appendChild(currentIcon);

            // Append temperature in farenheit
            var currentTemp = document.createElement("p");
            currentTemp.textContent = "Current temperature: " + convertFarenheit(weatherData.main.temp) + " \u00B0F";
            currentWeather.appendChild(currentTemp);

            // Append humidity
            var currentHumidity = document.createElement("p");
            currentHumidity.textContent = "Humidity: " + weatherData.main.humidity + "%";
            currentWeather.appendChild(currentHumidity);

            // Append wind speed
            var currentWind = document.createElement("p");
            currentWind.textContent = "Wind speed: " + weatherData.wind.speed + " MPH";
            currentWeather.appendChild(currentWind);

            // Create a function to get UV index
            // Create variables for longitude and latitude
            var longitude = weatherData.coord.lon;
            var latitude = weatherData.coord.lat;
            // fetch UV index data
            var UVUrl = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + latitude + "&lon=" + longitude;
            fetch(UVUrl)
                .then(function (response) {
                    return response.json()
                })
                .then(function(UVData) {
                    console.log(UVData);

                    // append UV index with span to allow color change
                    var currentUV = document.createElement("p");
                    currentUV.textContent = "UVI: ";
                    currentWeather.appendChild(currentUV);

                    spanUVI = document.createElement("span");
                    spanUVI.textContent = UVData.value;
                    if (UVData.value <= 2) {
                        spanUVI.className += "btn btn-outline-success";
                    };
                    if (UVData.value > 2 && UVData.value <= 5) {
                        spanUVI.className += "btn btn-outline-warning";
                    };
                    if (UVData.value > 5) {
                        spanUVI.className += "btn btn-outline-danger";
                    };
                    currentUV.appendChild(spanUVI);
                });
            
            // fetch forecast data
            var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;
            fetch(forecastUrl)
                .then(function (response) {
                    return response.json()
                })
                .then(function(forecastData) {
                    console.log(forecastData);

                    // Create a for loop for data
                    for (i = 0; i < 5; i++) {
                        // Create the cards for each forecast day
                        var forecastCard = document.createElement("div");
                        forecastCard.className += "card";
                        forecast.appendChild(forecastCard);

                        // Append dates of 5 day forecast
                        var forecastDate = document.createElement("p")
                        forecastDate.textContent = moment().add(i + 1, "days").format("MMMM Do, YYYY");
                        forecastCard.appendChild(forecastDate);

                        // Append icons of 5 day forecast
                        var iconForecast = forecastData.list[i].weather[0].icon;
                        var iconForecastUrl = "http://openweathermap.org/img/w/" + iconForecast + ".png"
                        var forecastIcon = document.createElement("img");
                        forecastIcon.src = iconForecastUrl;
                        forecastCard.appendChild(forecastIcon);

                        // Append temperature
                        var forecastTemperature = document.createElement("p");
                        forecastTemperature.textContent = "Temperature: " + convertFarenheit(forecastData.list[i].main.temp) + " \u00B0F";
                        forecastCard.appendChild(forecastTemperature);

                        // Append humidity
                        var forecastHumidity = document.createElement("p");
                        forecastHumidity.textContent = "Humidity: " + forecastData.list[i].main.humidity + "%"
                        forecastCard.appendChild(forecastHumidity);

                        // Append wind speed
                    }
                })
            
})
};

// Create a click listener to get city from input value
citySubmit.addEventListener("click", fetchData);