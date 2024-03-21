import "../css/FormCity.css";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loading from "./Loading";
import Warning from "./Warning";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

function FormCity() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [temperature, setTemperature] = useState("");
  const [tempMax, setTempMax] = useState("");
  const [tempMin, setTempMin] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [description, setDescription] = useState("");
  const [showLoading, setShowLoading] = useState(true);
  const [warning, setWarning] = useState(null);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async function getCity(url) {
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod == 404) {
      setWarning(data.cod);
      setShowLoading(false);
    } else {
      console.log(data);
      setCity(data.name);
      setCountry(data.sys.country);
      setWeatherIcon(data.weather[0].icon);
      setTemperature(parseInt(data.main.temp));
      setTempMax(parseInt(data.main.temp_max));
      setTempMin(parseInt(data.main.temp_min));
      setWind(data.wind.speed);
      setDescription(capitalizeFirstLetter(data.weather[0].description));
      setHumidity(data.main.humidity);
      setShowLoading(false);
      setWarning(data.cod);
    }
  }

  useEffect(() => {
    setShowLoading(true);
    const searchWithQueryUrl = `${apiUrl}&q=${query}&appid=${apiKey}`;
    getCity(searchWithQueryUrl);
  }, [query]);

  return (
    <div id="form_city">
      {showLoading ? (
        <Loading />
      ) : (
        <>
          {warning != 200 ? (
            <Warning codRes={warning} />
          ) : (
            <>
              <h1 id="name_city">
                <i id="location_icon" className="fa-solid fa-location-dot"></i>
                {city}
                <img
                  id="country_flag"
                  src={`https://flagsapi.com/${country}/shiny/32.png`}
                ></img>
              </h1>
              <div id="temperature">
                <img
                  src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                />

                <div>
                  <p id="temperature_value">
                    {temperature}
                    <sup>°C</sup>
                  </p>
                  <p id="temperature_description">{description}</p>
                </div>
              </div>
              <div id="outher_infos">
                <div className="info">
                  <i
                    id="temp_max_icon"
                    className="fa-solid fa-temperature-high"
                  ></i>
                  <div>
                    <h2>Temp. max</h2>
                    <p>
                      {tempMax}
                      <sup>°C</sup>
                    </p>
                  </div>
                </div>
                <div className="info">
                  <i
                    id="temp_min_icon"
                    className="fa-solid fa-temperature-low"
                  ></i>
                  <div>
                    <h2>Temp. min</h2>
                    <p>
                      {tempMin}
                      <sup>°C</sup>
                    </p>
                  </div>
                </div>
                <div className="info">
                  <i id="humidity_icon" className="fa-solid fa-droplet"></i>
                  <div>
                    <h2>Humidade</h2>
                    <p>{humidity}%</p>
                  </div>
                </div>
                <div className="info">
                  <i id="wind_icon" className="fa-solid fa-wind"></i>
                  <div>
                    <h2>Vento</h2>
                    <p>{wind} KM/H</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default FormCity;
