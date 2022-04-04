import express from 'express';

import 'dotenv/config';
import 'express-async-errors';

import errorHandler from './middlewares/errorHandler';
import router from './routes';

const app = express();

app.use(express.json());

app.use(router);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('🔥 Server is running at http://localhost:3000');
});
