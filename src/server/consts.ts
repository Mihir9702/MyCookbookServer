import 'dotenv/config'

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/my-cookbook-server"

export default MONGO_URI
