import { Express } from 'express'
import Mongoose from '../server/index'
import config from '../config/index'
import error from '../error-handling'

const connect = (app: Express) => {
  console.log(`You are now connected to http://localhost:5002`)
  Mongoose()
  config(app)
  error(app)
}

export default connect
