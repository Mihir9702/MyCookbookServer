import mongoose from 'mongoose'
import { MONGO_URI } from './consts'

const Mongoose = () => {

  mongoose
    .connect(MONGO_URI)
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(e => console.error('Error connecting to mongo: ', e))

}

export default Mongoose