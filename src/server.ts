/************************************************************************************
 *                               Express Server App                                 *
 ***********************************************************************************/

import 'dotenv/config'

import express, { Express } from 'express'
const app: Express = express();

import server from './config/index'

import Mongoose from './server/index'

import error from './error-handling'

import morgan from 'morgan'


// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// All routes are pathed from /api
import indexRouter from './routes/index.routes'
app.use('/', indexRouter)

app.listen(process.env.PORT, () => {
  console.log(`You are now connected to http://localhost:${process.env.PORT}`)
  Mongoose()
  server(app)
  error(app)
})
export default app