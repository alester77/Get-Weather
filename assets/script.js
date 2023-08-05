var apiKey = "f68e4f6cffb069c26fec9c4450b3ac2d";

// Element references
var searchButton = document.getElementById("search-city-btn");
var clearStorageButton = document.getElementById("clear-storage-btn");
var searchInput = document.getElementById("search-input");
var searchHistory = document.getElementById("search-history");
var currentInfo = document.getElementById("current-display");
var currentIcon = document.getElementById("current-icon");
var currentTemp = document.getElementById("temp-display");
var currentWind = document.getElementById("wind-display");
var currentHumidity = document.getElementById("humidity-display");
var currentDay = dayjs().format('MMM D, YYYY');

// Load search history from local storage
var searchHistoryArray = JSON.parse(localStorage.getItem("searchHistory")) || [];

// Function to update the search history display
function updateSearchHistoryDisplay() {
  searchHistory.innerHTML = ""; // Clear the current search history display
  searchHistoryArray.forEach(function(city) {
    var li = document.createElement("li");
    li.textContent = city;
    li.addEventListener('click', function() {
      searchCity(city);
    });
    searchHistory.appendChild(li);
  });
}

updateSearchHistoryDisplay();

function searchCity(citySearch) {
  if (!citySearch) {
    citySearch = searchInput.value;
  }
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ citySearch +"&appid=" +apiKey +"&units=imperial";

  fetch(apiUrl)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error: ' + response.statusText);
    }
  })
  .then(function (data) {
    console.log(data);
    
    // display icon
    var iconUrl = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    var iconImg = document.createElement('img')
    iconImg.src = iconUrl;
    currentIcon.appendChild(iconImg);

    currentInfo.textContent = data.name + " on " +currentDay; 
    currentTemp.textContent = "Temp: " + data.main.temp + "°F";
    currentWind.textContent = "Wind: " +data.wind.speed +" mph";
    currentHumidity.textContent = "Humidity: " + data.main.humidity + "%";

    // Add the searched city to the search history array if it's not already in there
    if (!searchHistoryArray.includes(citySearch)) {
      searchHistoryArray.push(citySearch);
      // Save the updated search history array to local storage
      localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArray));
      // Update the search history display
      updateSearchHistoryDisplay();
    }
  })
  .catch(function (error) {
    console.error('There was an issue with fetching the weather data:', error);
  });
}

searchButton.addEventListener('click', function() {
  searchCity();
});

clearStorageButton.addEventListener('click', function() {
  localStorage.removeItem("searchHistory");
  searchHistoryArray = [];
  updateSearchHistoryDisplay();
});