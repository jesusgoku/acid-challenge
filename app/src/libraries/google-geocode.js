import axios from 'axios';


export default class GoogleGeocode {
  constructor(apiKey, format = 'json') {
    this.baseURL = 'https://maps.googleapis.com/maps/api/geocode';
    this.format = format;
    this.apiKey = apiKey;
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
      headers,
      baseURL: this.baseURL,
      params: {
        key: this.apiKey,
        ...params,
      },
      ...restOptions,
    };

    return axios(requestOptions)
      .then(res => res.data)
    ;
  }

  getReverseGeocodingCountry(lat, lng, params = {}) {
    return this.getReverseGeocoding(lat, lng, {
      result_type: 'country',
      ...params,
    });
  }

  getReverseGeocoding(lat, lng, params = {}) {
    return this.request({
      url: `/${this.format}`,
      params: {
        latlng: `${lat},${lng}`,
        ...params,
      },
    });
  }
}
