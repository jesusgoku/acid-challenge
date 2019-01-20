import countriesAndCapitals from '../data/countries-and-capitals.json';


/**
 * Return country capital coordinates from country code
 *
 * @param {String} countryCode in ISO-3166-1 alpha-2, more info: https://es.wikipedia.org/wiki/ISO_3166-1
 *
 * @return {Object|null} with lat and lng properties
 */
export function getCountryCapitalCoords(countryCode) {
  let countryData = countryCode.toUpperCase() in countriesAndCapitals
    ? countriesAndCapitals[countryCode.toUpperCase()]
    : null;

  if (countryData) {
    const { CapitalLatitude: lat, CapitalLongitude: lng } = countryData;
    countryData = { lat, lng };
  }

  return countryData;
}


/**
 * Return country capital from country code
 *
 * @param {String} countryCode in ISO-3166-1 alpha-2, more info: https://es.wikipedia.org/wiki/ISO_3166-1
 *
 * @return {String|null} capital for country
 */
export function getCountryCapital(countryCode) {
  return countryCode.toUpperCase() in countriesAndCapitals
    ? countriesAndCapitals[countryCode.toUpperCase()].CapitalName
    : null;
}

