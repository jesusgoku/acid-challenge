/**
 * @author Jesús Urrutia <jesus.urrutia@gmail.com>
 *
 * Service for consume Dark Sky API
 *
 * For more documentation about API visit:
 * https://darksky.net/dev/docs
 */

import axios from 'axios';


/**
 * Set default options for axios request
 *
 * @param {Object} options user options for axios request
 * @return {Promise}
 */
function request(options) {
  const {
    data = {},
    params = {},
    headers = {},
    ...restOptions,
  } = options;

  const axiosOptions = {
    baseURL: `${process.env.DARK_SKY_API_KEY}/${process.env.DARK_SKY_API_KEY}`,
    data: {...data},

    headers: {
      Accept: 'application/json',
      ...headers,
    },

    params: {
      units: 'auto',
      language: 'en',
      ...params,
    },

    ...restOptions,
  };

  if (Object.keys(data).length) {
    axiosOptions.data = {...data};
  }

  return axios(axiosOptions)
    .then(extractDataFromResponse)
  ;
}

/**
 * Extract data from response object
 *
 * @param {Object} res axios response object
 * @return {Object}
 */
function extractDataFromResponse(res) {
  return res.data;
}

/**
 * Return current weather conditions
 *
 * @param {Number} lat float number with latitude for obtain weather
 * @param {Number} lng float number with longitude for obtain weather
 * @param {Object} params extra params for query string
 *
 * @return {Promise}
 */
export function getForecast(lat, lng, params = {}) {
  return request({
    params,
    url: `/${lat},${lng}`,
  });
}

/**
 * Return forecast for a specific time
 *
 * @param {Number} lat float number with latitude for obtain weather
 * @param {Number} lng float number with longitude for obtain weather
 * @param {Number|String} time integer as unix time or string formatted as ISO8601
 * @param {Object} params extra params for query string
 *
 * @return {Promise}
 */
export function getTimeMachine(lat, lng, time, params = {}) {
  return request({
    params,
    url: `/${lat},${lng},${time}`,
  });
}

/**
 * Return current forecast without another information
 *
 * @param {Number} lat float number with latitude for obtain weather
 * @param {Number} lng float number with longitude for obtain weather
 * @param {Object} params extra params for query string
 *
 * @return {Promise}
 */
export function getCurrentForecast(lat, lng, params = {}) {
  return getForecast(lat, lng, {
    exclude: ['minutely', 'hourly' , 'daily', 'alerts', 'flags'].join(','),
    ...params,
  });
}
