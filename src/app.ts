import express, { Express } from 'express'
const app: Express = express()


import indexRouter from './routes/index.routes'
app.use('/', indexRouter)

export default app