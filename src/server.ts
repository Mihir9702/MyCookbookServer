/************************************************************************************
 *                              Set basic express settings                          *
 ***********************************************************************************/

import express, { Express } from 'express';
import Mongoose from '@server/index'

const app: Express = express();

import 'dotenv/config'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

/************************************************************************************
 *                                      Routes                                      *
 ***********************************************************************************/

import apiRouter from '@routes/api.routes';
app.use('/api', apiRouter);

/************************************************************************************
 *                                       Port                                       *
 ***********************************************************************************/

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`You are now connected to http://localhost:${PORT}`)
  Mongoose()
})

export default app;