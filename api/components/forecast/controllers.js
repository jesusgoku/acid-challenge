import forecast from '../../services/forecast';


export function getForecast(req, res, next) {
  const { lat, lng } = req.params;

  forecast
    .getCurrentForecast(lat, lng)
    .then(data => res.json(data))
    .catch(next)
  ;
}

export function getTimeMachine(req, res, next) {
  const { lat, lng, time } = req.params;

  forecast
    .getTimeMachine(lat, lng, time)
    .then(data => res.json(data))
    .catch(next)
  ;
}
