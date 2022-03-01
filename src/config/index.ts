// Main framework of Nodejs to create api
import express, { Express } from 'express'

// Environment variables
import 'dotenv/config'

// Responsible for the messages you see in the terminal as requests are coming in
import logger from 'morgan'

// Needed when we deal with cookies (we will when dealing with authentication)
import cookieParser from 'cookie-parser'

// Needed to accept from requests from 'the outside'. CORS stands for cross origin resource sharing
// unless the request if from the same domain, by default express wont accept POST requests
import cors from 'cors'

// Middleware configuration
const app = (app: Express) => {
  // Because this is a server that will accept requests from outside and it will be hosted ona server with a `proxy`, express needs to know that it should trust that setting.
  // Services like heroku use something called a proxy and you need to add this to your server
  app.set("trust proxy", 1)

  // controls a very specific header to pass headers from the frontend
  // ! please configure the cors `origin` key so that you can accept the requests wherever they might be coming from
  app.use(
    cors({
      credentials: true,
      origin: process.env.ORIGIN || "http://localhost:3000",
    })
  )

  // In development environment the app logs
  app.use(logger("dev"))
  // To have access to `body` property in the request
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())

}

export default app