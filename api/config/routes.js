import express from 'express';

import forecast from '../components/forecast/routes';

const router = express.Router();

router.use('/forecast', forecast);

export default router;
