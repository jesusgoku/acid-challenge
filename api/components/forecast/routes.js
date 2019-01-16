import express from 'express';

import { getForecast, getCurrentForecast } from './controllers';


const router = express.Router();

router.get('/', getForecast);
router.get('/current', getCurrentForecast);

export default router;
