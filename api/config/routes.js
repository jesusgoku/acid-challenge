const express = require('express');

const forecast = require('../components/forecast/routes');

const router = express.Router();

router.use('/forecast', forecast);

module.exports = router;
