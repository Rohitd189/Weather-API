const apiKey = "914bf0d1ed228b0a377fcc033bc40498"; // Replace with your own key

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherCard = document.getElementById("weatherCard");
const sky = document.querySelector(".sky");
const rain = document.querySelector(".rain");
const sun = document.querySelector(".sun");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    alert("Please enter a city name!");
    return;
  }
  getWeather(city);
});

function getWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
      if (data.cod === "404") {
        alert("City not found!");
        return;
      }

      // Display weather info
      document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById("temp").textContent = `${data.main.temp}°C`;
      document.getElementById("desc").textContent = data.weather[0].description;
      document.getElementById("humidity").textContent = `💧 ${data.main.humidity}%`;
      document.getElementById("wind").textContent = `💨 ${data.wind.speed} m/s`;

      const iconCode = data.weather[0].icon;
      document.getElementById("icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      weatherCard.style.display = "block";

      updateBackground(data.weather[0].main);
    })
    .catch(() => {
      alert("Something went wrong. Please try again.");
    });
}

function updateBackground(condition) {
  rain.style.display = "none";
  sun.style.display = "block";
  sky.style.background = "linear-gradient(to bottom, #74b9ff, #a29bfe)";

  if (condition.includes("Rain")) {
    rain.style.display = "block";
    sky.style.background = "linear-gradient(to bottom, #636e72, #2d3436)";
  } else if (condition.includes("Cloud")) {
    sky.style.background = "linear-gradient(to bottom, #b2bec3, #636e72)";
  } else if (condition.includes("Clear")) {
    sky.style.background = "linear-gradient(to bottom, #74b9ff, #ffeaa7)";
  } else if (condition.includes("Snow")) {
    sky.style.background = "linear-gradient(to bottom, #dfe6e9, #b2bec3)";
  }
}



