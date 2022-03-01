// Main framework of Nodejs to create api
import express, { Express } from 'express'

// Environment variables
import 'dotenv/config'

import logger from 'morgan'

import cookieParser from 'cookie-parser'

// Cross Origin Resource Sharing | Only allow server to accept form requests from the same domain
import cors from 'cors'

// Middleware configuration
const app = (app: Express) => {

  // Server on cloud uses a proxy
  app.set("trust proxy", 1)

  // controls a very specific header to pass headers from the frontend
  app.use(
    cors({
      credentials: true,
      origin: process.env.ORIGIN,
    })
  )

}

export default app