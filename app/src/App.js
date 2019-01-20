import React, { Component } from 'react';
import './App.css';
import ForecastBox from './components/ForecastBox';
import Map from './components/Map';
import Modal from './components/Modal';

import { getCountryCapitalForecastFromAnyCountryCoords } from './services/country-capital-forecast';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      forecastBoxProps: {
        country: 'Chile',
        capital: 'Santiago',
        temperature: 29,
        icon: 'clear-night',
      },
    };

    this.apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    this.options = {
      center: { lat: -33.45, lng: -70.666667 },
      zoom: 4,
      minZoom: 4,
      maxZoom: 4,
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
    };

    this.handleToggleModal = this.handleToggleModal.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
  }

  handleToggleModal() {
    this.setState(currentState => ({
      modalOpen: !currentState.modalOpen,
    }));
  }

  handleMapClick(e) {
    const { latLng } = e;
    const coords = { lat: latLng.lat(), lng: latLng.lng() };

    return getCountryCapitalForecastFromAnyCountryCoords(coords.lat, coords.lng)
      .then(forecastBoxProps => this.setState({ forecastBoxProps }))
      .then(() => { this.handleToggleModal(); })
    ;
  }

  render() {
    const { modalOpen, forecastBoxProps } = this.state;

    return (
      <div className="App">
        <Map apiKey={this.apiKey} options={this.options} onClick={this.handleMapClick}></Map>
        {/* <button onClick={this.handleMapClick}>Open</button> */}

        <Modal
          open={modalOpen}
          onClose={this.handleToggleModal}>
          <ForecastBox {...forecastBoxProps}></ForecastBox>
        </Modal>
      </div>
    );
  }
}

export default App;
