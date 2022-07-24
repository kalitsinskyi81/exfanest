import 'module-alias/register';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';

import connectToMongo from '@mongo/connect';

import logger from './logger';
import router from './router';
// import errorHandler from './errorHandler';

connectToMongo();

const app = express();
const PORT = 4000;

/* Parse the request */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Logging income requests */
app.use((req, res, next) => {
  logger.info(`[${req.method} - ${req.path}]`);
  next();
});

/* Rules */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
    return res.status(200).json({});
  }
  next();
});

/* Routes */
app.use('/api', router);

/* Error handling */
// app.use(errorHandler); // TODO need to implement common errorHandler handler
app.use((req, res) => {
  return res.status(404).json({
    message: 'not found'
  });
});

/* Create the server */
const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`Server running on ${PORT}`);
});
