import React, { useState } from "react";
import axios from "axios";

const weatherApiBase = `https://api.openweathermap.org/data/2.5/weather?`;

const fetchData = async (city) => {
  const { data } = await axios.get(
    weatherApiBase +
      `q=${city}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`
  );
  return data.weather[0];
};

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const iconUrl = `http://openweathermap.org/img/w/${weatherData?.icon}.png`;

  const handleChange = (event) => {
    setCity(event.target.value.toLowerCase());
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const weatherInfo = await fetchData(city);
      setWeatherData(weatherInfo);
      setError(null); // Clear error when successful
    } catch (error) {
      setError("City not found");
      setWeatherData(null);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          className='border border-blue-400 rounded-sm px-2 '
          type='text'
          placeholder='Enter city: London'
          onChange={handleChange}
        />
      </form>

      <section>
        {error ? <p>{error}</p> : null}
        {weatherData && !error ? (
          <div className='flex align-middle'>
            <div className='flex align-middle '>
              <img src={iconUrl} alt='icon' />
            </div>
            <div className='flex flex-col'>
              <p>{weatherData.main}</p>
              <p>{weatherData.description}</p>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
};

export default App;
