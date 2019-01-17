import forecast from '../../services/forecast';
import retry from '../../utils/retry';
import cache from '../../services/cache';


export function getForecast(req, res, next) {
  const { lat, lng } = req.params;
  const params = req.query;


  retry(() => forecast.getCurrentForecast(lat, lng, params))
    .then(data => {
      const key = `forecast_cache_${lat}_${lng}`;
      cache.setex(key, 3600, JSON.stringify(data));

      return data;
    })
    .then(data => res.json(data))
    .catch(next)
  ;
}

export function getTimeMachine(req, res, next) {
  const { lat, lng, time } = req.params;
  const params = req.query;

  retry(() => forecast.getTimeMachine(lat, lng, time, params))
    .then(data => res.json(data))
    .catch(next)
  ;
}
