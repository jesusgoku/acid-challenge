import forecast from '../../services/forecast';
import retry from '../../utils/retry';


export function getForecast(req, res, next) {
  const { lat, lng } = req.params;
  const params = req.query;


  retry(() => forecast.getCurrentForecast(lat, lng, params))
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
