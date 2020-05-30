import React, { Component } from "react";

import "./App.css";
import Form from "./Form";
import Result from "./Result";
const APIKey = "cab76c76bc09f5a7054d70423d3c98c1";
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
    error: false,
  };

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleCitySubmit = (e) => {
    e.preventDefault();
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIKey}&units=metric`;

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
          error: false,
        }));
      })
      .catch((error) => {
        this.setState((prevState) => ({
          error: true,
          city: prevState.value,
        }));
      });
  };

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <Form
          value={this.state.value}
          change={this.handleInputChange}
          submit={this.handleCitySubmit}
        />
        <Result weather={this.state} />
      </div>
    );
  }
}

export default App;
