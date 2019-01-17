import express from 'express';

import { getForecast, getTimeMachine } from './controllers';
import { forecastCache } from '../../middlewares/cache';


const router = express.Router();

router.get('/:lat,:lng', forecastCache, getForecast);
router.get('/:lat,:lng,:time', getTimeMachine);

export default router;
