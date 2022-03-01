import { Express } from 'express'
import Mongoose from '../server/index'

import config from '../config/index'

import error from '../error-handling'

const connect = (app: Express) => {
  console.log(`You are now connected to ${process.env.ORIGIN}`)
  Mongoose()
  config(app)
  error(app)
}

export default connect