import React, { Component } from 'react';
import './App.css';
import ForecastBox from './components/ForecastBox';
import Map from './components/Map';
import Modal from './components/Modal';

import forecastService from './services/forecast';
import googleGeocodeService from './services/google-geocode';
import { getCountryCapital, getCountryCapitalCoords } from './services/country-capital';



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
      zoom: 3,
      minZoom: 3,
      maxZoom: 3,
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

    googleGeocodeService
      .getReverseGeocodingCountry(coords.lat, coords.lng)
      .then(geocodeData => {
        const countryComponent = geocodeData.status === 'OK'
          ? geocodeData.results.find(i => i.types[0] === 'country').address_components[0]
          : null;

        let country = 'N/A';
        let capital = 'N/A';
        let capitalCoords = null;

        if (countryComponent) {
          const { long_name: countryName, short_name: countryCode } = countryComponent;
          country = countryName;
          capital = getCountryCapital(countryCode) || 'N/A';
          capitalCoords = getCountryCapitalCoords(countryCode);
        }

        return { country, capital, capitalCoords };
      })
      .then(({ country, capital, capitalCoords }) => {

        return Promise.all([
          Promise.resolve({ country, capital }),
          capitalCoords
            ? forecastService.getCurrentForecast(capitalCoords.lat, capitalCoords.lng)
            : forecastService.getCurrentForecast(coords.lat, coords.lng),
        ]);
      })
      .then(([{ country, capital }, forecast]) => {
        const { temperature, icon } = forecast.currently;

        return { temperature, icon, country, capital };
      })
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
