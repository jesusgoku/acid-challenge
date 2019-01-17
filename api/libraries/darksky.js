import axios from 'axios';


/**
 * Dark Sky API wrapper
 *
 * For more documentation about API visit:
 * https://darksky.net/dev/docs
 *
 * @author Jesús Urrutia <jesus.urrutia@gmail.com>
 */
export default class DarkSky {
  constructor(apiKey) {
    this.baseURL = 'https://api.darksky.net/forecast';
    this.apiKey = apiKey;
  }

  /**
   * Set default options for axios request
   *
   * @param {Object} options user options for axios request
   * @return {Promise}
   */
  request(options) {
    const {
      data = {},
      params = {},
      headers = {},
      ...restOptions
    } = options;

    const axiosOptions = {
      baseURL: `${this.baseURL}/${this.apiKey}`,
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
      .then(this.extractDataFromResponse)
    ;
  }

  /**
   * Extract data from response object
   *
   * @param {Object} res axios response object
   * @return {Object}
   */
  extractDataFromResponse(res) {
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
  getForecast(lat, lng, params = {}) {
    return this.request({
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
  getTimeMachine(lat, lng, time, params = {}) {
    return this.request({
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
  getCurrentForecast(lat, lng, params = {}) {
    return this.getForecast(lat, lng, {
      exclude: ['minutely', 'hourly' , 'daily', 'alerts', 'flags'].join(','),
      ...params,
    });
  }
}


