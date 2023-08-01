var apiKey = "f68e4f6cffb069c26fec9c4450b3ac2d";
var citySearch = 'Denver';
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ citySearch +"&appid=" +apiKey;

// document.querySelector("city-selection");
var requestUrl = apiUrl

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    // data.coord.lat and data.coord.lon will contain the latitude and longitude
  });