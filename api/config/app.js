import express from 'express';

import routes from './routes';
import { handleErrors } from '../middlewares/errors';


const app = express();

app.use('/', routes);

app.use(handleErrors);

export default app;
