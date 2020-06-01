import React, { Component } from "react";

import "./App.css";
import Form from "./Form";
import Result from "./Result";
require("dotenv").config();

const WeatherKey = process.env.REACT_APP_OPEN_WEATHER_MAP;
const LocationKey = process.env.REACT_APP_LOCATION_IQ;

class App extends Component {
  state = {
    value: "",
    date: "",
    city: "",
    sunrise: "",
    sunset: "",
    temp: "",
    pressure: "",
    wind: "",
    weather: "",
    error: false,
  };

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      fetch(
        `https://us1.locationiq.com/v1/reverse.php?key=${LocationKey}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
      )
        .then((response) => {
          if (response.ok) {
            return response;
          }
          throw Error("Not found");
        })
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            value: data.address.city,
          });
        })
        .catch((error) => {
          this.setState({
            error: true,
          });
        });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.value.length < 3) {
      return;
    }

    if (prevState.value !== this.state.value) {
      const API = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${WeatherKey}&units=metric`;
      fetch(API)
        .then((response) => {
          if (response.ok) {
            return response;
          }
          throw Error("Not found:" + this.state.value);
        })
        .then((response) => response.json())
        .then((data) => {
          const time = new Date().toLocaleString();
          this.setState((prevState) => ({
            date: time,
            city: prevState.value,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            temp: data.main.temp,
            pressure: data.main.pressure,
            wind: data.wind.speed,
            weather: data.weather[0].main,
            error: false,
          }));
        })
        .catch((error) => {
          this.setState((prevState) => ({
            error: true,
            city: prevState.value,
          }));
        });
    }
  }

  render() {
    return (
      <div className="App">
        <Form value={this.state.value} change={this.handleInputChange} />
        <Result weather={this.state} />
      </div>
    );
  }
}

export default App;
