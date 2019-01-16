const express = require('express');

const controllers = require('./controllers');


const router = express.Router();

router.get('/', controllers.getForecast);
router.get('/current', controllers.getCurrentForecast);

module.exports = router;
