import React from "react";
import "./Body.css";

const datas = {
  coord: { lon: -0.1257, lat: 51.5085 },
  weather: [
    { id: 804, main: "Clouds", description: "overcast clouds", icon: "04n" },
  ],
  base: "stations",
  main: {
    temp: 9.65,
    feels_like: 6.43,
    temp_min: 8.64,
    temp_max: 10.94,
    pressure: 1011,
    humidity: 83,
  },
  visibility: 10000,
  wind: { speed: 7.2, deg: 250 },
  clouds: { all: 100 },
  dt: 1703309499,
  sys: {
    type: 2,
    id: 2075535,
    country: "GB",
    sunrise: 1703318675,
    sunset: 1703346844,
  },
  timezone: 0,
  id: 2643743,
  name: "London",
  cod: 200,
};

const Body = ({ data, checker }) => {
  return data?.cod === "404" ? (
    <>
      <div className={`${data !== undefined && checker ? "height" : ""} body`}>
        <div className="body_top-row-error">
          <img src={require("./Images/404.png")} alt="" />
          <div>
            City Not Found <br />
            Search For Another
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className={`${data !== undefined && checker ? "height" : ""} body`}>
        <div className="body_top-row">
          <img
            src={
              data
                ? `https://openweathermap.org/img/wn/${data?.weather[0].icon}@4x.png`
                : ""
            }
            alt=""
          />
          <div className="weather-data">
            <div>
              {Math.round(data?.main.temp)}
              <span>°C</span>
            </div>
            <div className="weathername">{data?.weather[0].description}</div>
          </div>
          <div className="bottom-row">
            <div>
              <i className="fa-solid fa-temperature-arrow-down"></i>
              <div>
                <div>{Math.round(data?.main.temp_min)}°C</div>
                <div>Min</div>
              </div>
            </div>
            <div className="real-feel">
              <div>
                <div>{Math.round(data?.main.feels_like)}°C</div>
                <div>Real Feel</div>
              </div>
            </div>
            <div>
              <i className="fa-solid fa-temperature-arrow-up"></i>
              <div>
                <div>{Math.round(data?.main.temp_max)}°C</div>
                <div>Max</div>
              </div>
            </div>
          </div>
          <div className="bottom-row">
            <div>
              <i className="fa-solid fa-water"></i>
              <div>
                <div>{data?.main.humidity}%</div>
                <div>Humidity</div>
              </div>
            </div>
            <div>
              <i className="fa-solid fa-wind"></i>
              <div>
                <div>{Math.round(data?.wind.speed)}Km/h</div>
                <div>Wind Speed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;
