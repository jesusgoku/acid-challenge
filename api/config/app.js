import express from 'express';
import helmet from 'helmet';

import routes from './routes';
import { handleErrors } from '../middlewares/errors';


const app = express();

app.use(helmet());

app.use('/', routes);

app.use(handleErrors);

export default app;
