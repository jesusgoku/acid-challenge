import React from 'react';
import PropTypes from 'prop-types';

import './ForecastBox.css';

function ForecastBox({ country, capital, temperature, icon }) {
  return (<div className="ForecastBox">
    <p className="ForecastBox__country">{ country }</p>
    <p className="ForecastBox__capital">{ capital }</p>
    <p className="ForecastBox__temperature">{ temperature }º C</p>
    { icon && <i className={`ForecastBox__icon wi wi-forecast-io-${icon}`}></i>}
  </div>);
}

ForecastBox.propTypes = {
  country: PropTypes.string.isRequired,
  capital: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
  icon: PropTypes.string,
};

export default ForecastBox;
