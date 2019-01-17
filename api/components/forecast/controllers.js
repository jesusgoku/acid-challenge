import forecast from '../../services/forecast';


export function getForecast(req, res) {
  const { lat, lng } = req.params;

  forecast
    .getCurrentForecast(lat, lng)
    .then(data => res.json(data))
  ;
}

export function getTimeMachine(req, res) {
  const { lat, lng, time } = req.params;

  forecast
    .getTimeMachine(lat, lng, time)
    .then(data => res.json(data))
  ;
}
