import cors from 'cors';
import express from 'express';

import 'express-async-errors';

import routes from './routes';
import errorMiddleware from './middleware/errorMiddleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorMiddleware);

export default app;
