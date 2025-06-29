const apiKey = "458997eb2cb309af49b0446aac6d02e8";
async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) {
    alert("Please enter a city name!");
    return;
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod !== 200) {
      document.getElementById("weatherInfo").innerHTML = `<p>City not found. Try again!</p>`;
      return;
    }
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const condition = data.weather[0].main;
    document.getElementById("weatherInfo").innerHTML = `
      <h2>${city}</h2>
      <p>🌡️ Temperature: ${temp} °C</p>
      <p>💧 Humidity: ${humidity}%</p>
      <p>☁️ Weather: ${condition}</p>
    `;
    changeBackground(condition);
  } catch (error) {
    console.error(error);
    alert("Failed to fetch weather data.");
  }
}
function changeBackground(condition) {
  let imageName = "default.gif";
  if (condition === "Clear") imageName = "clear.gif";
  else if (condition === "Rain") imageName = "rain.gif";
  else if (condition === "Clouds") imageName = "clouds.gif";
  document.body.style.backgroundImage = `url('images/${imageName}')`;
}
