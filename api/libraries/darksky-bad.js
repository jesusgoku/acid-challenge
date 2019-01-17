import DarkSky from './darksky';


/**
 * DarkSky API wrapper with artificial fail factor
 *
 * @author Jesus Urrutia <jesus.urrutia@gmail.com>
 */
export default class DarkSkyBad extends DarkSky {
  constructor(apiKey) {
    super(apiKey);

    this.FAIL_FACTOR = 0.1;
  }

  request(options) {
    return Math.random() <= this.FAIL_FACTOR
      ? Promise.reject(new Error('Request failed'))
      : super.request(options);
  }
}
