import React, { useState } from "react";
import axios from "axios";
import logo from "./logo.svg";

import "./App.css";

export default function App() {
  let [city, setCity] = useState("");
  let [loaded, setLoaded] = useState(false);
  let [weather, setWeather] = useState(null);

  function showWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = process.env.REACT_APP_TOKEN_OWM;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Enter a city" onChange={updateCity} />
      <input type="submit" value="Search" />
    </form>
  );

  if (loaded) {
    return (
      <div className="Weather">
        {form}
        <ul className="Weather">
          <li>
            Temperature:
            {Math.round(weather.temperature)}°C
          </li>
          <li>
            Humidity:
            {weather.humidity}%
          </li>
          <li>
            Wind:
            {Math.round(weather.wind)}km/h
          </li>

          <img src={weather.icon} alt="Weather icon" />
        </ul>
      </div>
    );
  } else {
    return (
      <div className="Weather">
        <h1>Weather App</h1>

        {form}
      </div>
    );
  }
}
