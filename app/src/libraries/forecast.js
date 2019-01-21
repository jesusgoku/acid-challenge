import axios from 'axios';

export default class Forecast {
  constructor() {
    this.baseURL = process.env.REACT_APP_FORECAST_API_BASE_URL;
  }

  request(options) {
    const {
      url,
      params = {},
      headers = {},
      ...restOptions
    } = options;

    const requestOptions = {
      url,
      params,
      headers,
      baseURL: `${this.baseURL}`,
      ...restOptions,
    };

    return axios(requestOptions)
      .then(res => res.data)
    ;
  }

  getCurrentForecast(lat, lng) {
    return this.request({
      url: `/forecast/${lat},${lng}`,
    });
  }
}
