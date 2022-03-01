import 'dotenv/config'
import jwt from 'express-jwt'
import tokenFromHeaders from './tokenFromHeaders'

const auth = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'payload',
  getToken: tokenFromHeaders
})

export default auth

