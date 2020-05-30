import React from "react";

const Result = (props) => {
  const { error, city, sunrise, sunset, pressure, wind, temp } = props.weather;
  return error ? (
    <p>Not found {city}</p>
  ) : (
    <div>
      <h3>Weather for: {city}</h3>
      <p>Temperature: {temp}</p>
      <p>Pressure: {pressure}</p>
      <p>Wind: {wind}</p>
      <p>Sunrise: {sunrise}</p>
      <p>Sunset: {sunset}</p>
    </div>
  );
};

export default Result;
