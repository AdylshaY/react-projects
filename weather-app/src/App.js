import React, { useState, useEffect } from "react";
import "./App.css"

function App() {

  const apiKey = "";  // Enter your API Key here.
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");
  const [iconCode, setIconCode] = useState("");
  let iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  const [date, setDate] = useState(new Date());

  function Clock() {
    const [date, setDate] = useState(new Date());

    function refreshClock() {
      setDate(new Date());
    }
    useEffect(() => {
      const timerId = setInterval(refreshClock, 1000);
      return function cleanup() {
        clearInterval(timerId);
      };
    }, []);
    return (
      <span>
        {date.toLocaleTimeString()}
      </span>
    );
  }


  const getWeatherData = (event) => {
    if (event.key == "Enter") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          setWeatherData(data)
          setCity("")
          setIconCode(data.weather[0].icon)
        })
    }
  }

  return (
    <div className="center">
      <h1>Weather App</h1>
      <input
        className="input"
        placeholder="Enter a city name."
        onChange={e => setCity(e.target.value)}
        value={city}
        onKeyPress={getWeatherData}
      />
      <hr className="color-hr" />

      {typeof weatherData.main === "undefined" ? (
        <div>
          {weatherData.cod === "404" ? (
            <p>City not found.</p>
          ) : (
            <p>Welcome to weather app. Enter in a city to get the weather of.</p>

          )}
        </div>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              {weatherData.name}, {weatherData.sys.country}
            </div>
            <div className="col-sm-6">
              <Clock />
            </div>
            <div className="col-sm-6">
              <div className="temp">
                {Math.round(weatherData.main.temp)}°C
              </div>
              <div className="description">
                <img src={iconUrl} alt="Weather Icon" />
                {weatherData.weather[0].main}
              </div>
            </div>
            <div className="col-sm-6 mt-5">
              <div>
                Humidity: %{weatherData.main.humidity}
              </div>
              <div>
                Wind: {weatherData.wind.speed} m/s
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
