function main() {
  //Capitalizes First letter of every word
  function capitalizer(name) {
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
    return capitalized;
  }
  // Function #1 that uses axios response after the apiUrl is built
  function showWeather(response) {
    document.querySelector(
      "#description"
    ).innerHTML = `${response.data.weather[0].main}`;
    document.querySelector(".temperature").innerHTML = `${Math.round(
      response.data.main.temp
    )}`;
    document
      .querySelector(".weather-icon")
      .setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
    document.querySelector("#humidity").innerHTML = `Humidity: ${Math.round(
      response.data.main.humidity
    )}%`;
    document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
      response.data.wind.speed
    )} km/h`;
  }

  // Setting Current Day and Time
  let currentDate = new Date();
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  document.querySelector(".currentDate").innerHTML = `${
    weekDays[currentDate.getDay()]
  }    ${currentDate.getHours()}:${currentDate.getMinutes()}`;

  //Default Api Url at page start
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "e450bc345a80a08ada69fd5c714d871d";
  let unit = "metric";
  let cityName = "New York";

  //Generated Api Url Using search bar for city
  document
    .querySelector(".form-floating")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      if (document.querySelector("#floatingInput").value.length === 0) {
        alert("Please type a city name !!");
      } else {
        cityName = document.querySelector("#floatingInput").value;
      }
      let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
      let apiKey = "e450bc345a80a08ada69fd5c714d871d";
      let unit = "metric";
      document.querySelector("h1").innerHTML = capitalizer(cityName);
      let apiUrl = `${apiEndpoint}?q=${cityName}&appid=${apiKey}&units=${unit}`;
      axios.get(apiUrl).then(showWeather);
    });

  //Generated Api Url  Using Current Location Button an event listener
  function showCity(response) {
    document.querySelector("h1").innerHTML = response.data.name;
  }
  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiKey = "e450bc345a80a08ada69fd5c714d871d";
    let unit = "metric";
    let apiUrl = `${apiEndpoint}?lat=${lat.toFixed(2)}&lon=${lon.toFixed(
      2
    )}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(showWeather);
    axios.get(apiUrl).then(showCity);
  }
  document
    .querySelector("#current-button")
    .addEventListener("click", (event) => {
      navigator.geolocation.getCurrentPosition(showPosition);
    });

  //Default Page Loading view
  document.querySelector("h1").innerHTML = cityName;
  let apiUrl = `${apiEndpoint}?q=${cityName}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
}
main();
