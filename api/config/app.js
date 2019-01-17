import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import routes from './routes';
import { handleErrors } from '../middlewares/errors';


const app = express();

app.use(helmet());
app.use(cors());

app.use('/', routes);

app.use(handleErrors);

export default app;
