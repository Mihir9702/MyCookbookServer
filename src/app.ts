import express, { Express } from 'express'
const app = express()

import cookieParser from 'cookie-parser';

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

import indexRouter from './routes/index.routes'
app.use('/', indexRouter)

export default app