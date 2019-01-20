import forecastService from './forecast';
import googleGeocodeService from './google-geocode';
import { getCountryCapital, getCountryCapitalCoords } from './country-capital';

/**
 * Get country capital forecast from any coords on country
 *
 * If imposible determine coords of capital, return forecast for input coords
 *
 * @param {Number} lat any latitude on country area for forecast
 * @param {Number} lng any longitude on country area for forecast
 *
 * @return {Object} object with forecast for capital of country in coords
 */
export function getCountryCapitalForecastFromAnyCountryCoords(lat, lng) {
  return googleGeocodeService
    .getReverseGeocodingCountry(lat, lng)

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
          : forecastService.getCurrentForecast(lat, lng),
      ]);
    })
    .then(([{ country, capital }, forecast]) => {
      const { temperature, icon } = forecast.currently;

      return { temperature, icon, country, capital };
    })
  ;
}
