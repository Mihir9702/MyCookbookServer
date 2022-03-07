import express, { Express } from 'express'
const app: Express = express()

import logger from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger('dev'))
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:8080',
  })
)

import indexRouter from './routes/index.routes'
app.use('/', indexRouter)

export default app
