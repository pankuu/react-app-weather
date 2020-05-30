import React from "react";
import "./Result.css";

const Result = (props) => {
  const {
    error,
    city,
    sunrise,
    sunset,
    pressure,
    wind,
    temp,
    date,
  } = props.weather;

  let content = null;

  if (!error && city) {
    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();
    content = (
      <>
        <p>
          Date: <strong>{date}</strong>
        </p>
        <p>
          Weather for: <strong>{city}</strong>
        </p>
        <p>
          Temperature: <strong>{temp} &#176;C</strong>
        </p>
        <p>
          Pressure: <strong>{pressure} hPa</strong>
        </p>
        <p>
          Wind: <strong>{wind} m/s</strong>
        </p>
        <p>
          Sunrise: <strong>{sunriseTime}</strong>
        </p>
        <p>
          Sunset: <strong>{sunsetTime}</strong>
        </p>
      </>
    );
  }

  return (
    <div className="result">{error ? <p>Not found {city}</p> : content}</div>
  );
};

export default Result;
