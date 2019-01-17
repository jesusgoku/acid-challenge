import forecast from '../../services/forecast';
import retry from '../../utils/retry';


export function getForecast(req, res, next) {
  const { lat, lng } = req.params;

  retry(() => forecast.getCurrentForecast(lat, lng))
    .then(data => res.json(data))
    .catch(next)
  ;
}

export function getTimeMachine(req, res, next) {
  const { lat, lng, time } = req.params;

  retry(() => forecast.getTimeMachine(lat, lng, time))
    .then(data => res.json(data))
    .catch(next)
  ;
}
