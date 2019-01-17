import { getAsync } from '../services/cache';


export function forecastCache(req, res, next) {
  const { lat, lng } = req.params;

  const key = `forecast_cache_${lat}_${lng}`;

  getAsync(key)
    .then(data => {
      if (data) {
        res.send(JSON.parse(data));
      } else {
        next();
      }
    })
    .catch(next)
  ;
}
