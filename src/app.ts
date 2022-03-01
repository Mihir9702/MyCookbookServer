// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
import 'dotenv/config'

// ℹ️ Connects to the database
import './server'

// Handles http requests (express is node js framework)
import express, { Application } from 'express'

const app: Application = express()

// Adding user to req.session
import User from './@types/user'

declare module 'express-session' {
  interface SessionData {
    user: User
  }
}

declare module 'express' {
  interface Request {
    user: User
  }
}

// Handle Errors
import error from './error-handling'
error(app)

export default app