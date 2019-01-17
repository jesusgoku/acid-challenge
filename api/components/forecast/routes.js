import express from 'express';

import { getForecast, getTimeMachine } from './controllers';


const router = express.Router();

router.get('/:lat,:lng', getForecast);
router.get('/:lat,:lng,:time', getTimeMachine);

export default router;
