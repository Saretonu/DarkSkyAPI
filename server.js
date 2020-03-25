//const request = require("request");

const form = document.querySelector('#weather-form');
const refreshBut = document.querySelector('#refresh');
const cityInput = document.querySelector('#city');
const temperatureInput = document.querySelector('#temperature');
const descriptionInput = document.querySelector('#description');

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
let coord1 = 59.53661100000001;
let coord2 = 24.7949199;
const apiUrl = `${proxyUrl}https://api.darksky.net/forecast/6be91782c2d92a9f1b4cb20400216687/${coord1},${coord2}`;

//1. The app displays: city name, the temperature in Celcius, the weather description (currently -> summary in json)

loadEventListeners();

function loadEventListeners(){
  refreshBut.addEventListener('click', updateWeather);
  document.addEventListener("DOMContentLoaded", updateWeather);
} 

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
  
function showPosition(position) {
    coord1 = position.coords.latitude;
    coord2 = position.coords.longitude;
}

/*function updateWeather(){
    getLocation();
    request(apiUrl, function(error, response, body){
        console.log("Server status code ", response.statusCode);
        
        let data = JSON.parse(response.body);

        cityInput.value = data.currently.timezone;
        temperatureInput.value = data.currently.temperature;
        descriptionInput.value = data.currently.summary;
    });  
}*/

function updateWeather(){
  getLocation();
  var request = new XMLHttpRequest()
  request.open('GET', apiUrl, true)
  request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    console.log("data",data);
    if (request.status >= 200 && request.status < 400) {
      cityInput.value = data.timezone;
      temperatureInput.value = TemperatureFtoC(data.currently.temperature);
      descriptionInput.value = data.currently.summary;
    } else {
      const errorMessage = document.createElement('marquee')
      errorMessage.textContent = `Gah, it's not working!`
      app.appendChild(errorMessage)
    }
  }
  request.send();
}

function TemperatureFtoC(tempF){
  let temp1 = tempF -32;
  return Math.round((temp1 / 1.8) * 10) / 10.0;
}
