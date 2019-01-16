function getForecast(req, res) {
  res.json({
    data: 'getForecast',
  });
}

function getCurrentForecast(req, res) {
  res.json({
    data: 'getCurrentForecast',
  });
}

module.exports = {
  getForecast,
  getCurrentForecast,
};
