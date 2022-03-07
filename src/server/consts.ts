import 'dotenv/config'

export const MONGO_URI =
  process.env.MONGO_LOCAL ||
  process.env.MONGO_URI ||
  'mongodb://localhost/my-cookbook-server'

export const PORT = process.env.PORT || 5002
